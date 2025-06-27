import { SignJWT, jwtVerify } from 'jose';
import { hash, compare, genSalt } from 'bcrypt';
import { randomBytes, createHash } from 'crypto';
import type { 
  AuthTokens, 
  AuthSession, 
  AuthContext, 
  SecurityConfig,
  LoginAttempt,
  RateLimitInfo 
} from '~/types/auth';
import type { User, UserRole } from '~/types/user';

// Security configuration
export const SECURITY_CONFIG: SecurityConfig = {
  maxLoginAttempts: 5,
  lockoutDuration: 15 * 60 * 1000, // 15 minutes
  passwordMinLength: 8,
  requireSpecialChars: true,
  sessionTimeout: 60 * 60 * 1000, // 1 hour
  refreshTokenRotation: true
};

// Rate limiting configuration
export const RATE_LIMIT_CONFIG = {
  login: { windowMs: 15 * 60 * 1000, maxRequests: 5 }, // 5 attempts per 15 minutes
  register: { windowMs: 60 * 60 * 1000, maxRequests: 3 }, // 3 attempts per hour
  refresh: { windowMs: 60 * 1000, maxRequests: 10 }, // 10 attempts per minute
  passwordReset: { windowMs: 60 * 60 * 1000, maxRequests: 3 } // 3 attempts per hour
};

// In-memory rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export class AuthService {
  private static instance: AuthService;
  private jwtSecret: Uint8Array;

  private constructor() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET environment variable is required');
    }
    this.jwtSecret = new TextEncoder().encode(secret);
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Token generation
  async generateAccessToken(user: User, sessionId: string): Promise<string> {
    const payload = {
      sub: user.id,
      role: user.role,
      sessionId,
      type: 'access',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (SECURITY_CONFIG.sessionTimeout / 1000)
    };

    return new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(`${SECURITY_CONFIG.sessionTimeout / 1000}s`)
      .sign(this.jwtSecret);
  }

  async generateRefreshToken(user: User, sessionId: string): Promise<string> {
    const payload = {
      sub: user.id,
      sessionId,
      type: 'refresh',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) // 7 days
    };

    return new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(this.jwtSecret);
  }

  // Token verification
  async verifyAccessToken(token: string): Promise<AuthContext> {
    try {
      const { payload } = await jwtVerify(token, this.jwtSecret);
      
      if (payload.type !== 'access') {
        throw new Error('Invalid token type');
      }

      return {
        userId: payload.sub as string,
        role: payload.role as UserRole,
        sessionId: payload.sessionId as string,
        permissions: this.getPermissions(payload.role as UserRole)
      };
    } catch (error) {
      throw new Error('Invalid access token');
    }
  }

  async verifyRefreshToken(token: string): Promise<{ userId: string; sessionId: string }> {
    try {
      const { payload } = await jwtVerify(token, this.jwtSecret);
      
      if (payload.type !== 'refresh') {
        throw new Error('Invalid token type');
      }

      return {
        userId: payload.sub as string,
        sessionId: payload.sessionId as string
      };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  // Password utilities
  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(12);
    return hash(password, salt);
  }

  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
  }

  validatePassword(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (password.length < SECURITY_CONFIG.passwordMinLength) {
      errors.push(`Password must be at least ${SECURITY_CONFIG.passwordMinLength} characters long`);
    }

    if (SECURITY_CONFIG.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Session management
  generateSessionId(): string {
    return randomBytes(32).toString('hex');
  }

  // Rate limiting
  checkRateLimit(key: string, config: { windowMs: number; maxRequests: number }): RateLimitInfo {
    const now = Date.now();
    const record = rateLimitStore.get(key);

    if (!record || now > record.resetTime) {
      // First request or window expired
      rateLimitStore.set(key, {
        count: 1,
        resetTime: now + config.windowMs
      });

      return {
        remaining: config.maxRequests - 1,
        resetTime: now + config.windowMs,
        limit: config.maxRequests
      };
    }

    if (record.count >= config.maxRequests) {
      return {
        remaining: 0,
        resetTime: record.resetTime,
        limit: config.maxRequests
      };
    }

    // Increment count
    record.count++;
    rateLimitStore.set(key, record);

    return {
      remaining: config.maxRequests - record.count,
      resetTime: record.resetTime,
      limit: config.maxRequests
    };
  }

  // IP address extraction
  getClientIP(event: any): string {
    const forwarded = event.node.req.headers['x-forwarded-for'];
    const realIP = event.node.req.headers['x-real-ip'];
    const connectionIP = event.node.req.connection?.remoteAddress;
    const socketIP = event.node.req.socket?.remoteAddress;

    if (forwarded) {
      return forwarded.split(',')[0].trim();
    }
    if (realIP) {
      return realIP;
    }
    if (connectionIP) {
      return connectionIP;
    }
    if (socketIP) {
      return socketIP;
    }

    return 'unknown';
  }

  // User agent extraction
  getUserAgent(event: any): string {
    return event.node.req.headers['user-agent'] || 'unknown';
  }

  // Permission system
  getPermissions(role: UserRole): string[] {
    const permissions = {
      admin: [
        'user:read', 'user:write', 'user:delete',
        'course:read', 'course:write', 'course:delete',
        'assessment:read', 'assessment:write', 'assessment:delete',
        'notice:read', 'notice:write', 'notice:delete',
        'system:admin'
      ],
      staff: [
        'user:read',
        'course:read', 'course:write',
        'assessment:read', 'assessment:write',
        'notice:read', 'notice:write',
        'attendance:read', 'attendance:write'
      ],
      student: [
        'course:read',
        'assessment:read',
        'notice:read',
        'timetable:read'
      ]
    };

    return permissions[role] || [];
  }

  // Security utilities
  generateSecureToken(): string {
    return randomBytes(32).toString('hex');
  }

  hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  // Cookie utilities
  setAuthCookies(event: any, tokens: AuthTokens, rememberMe: boolean = false): void {
    const isProduction = process.env.NODE_ENV === 'production';
    const maxAge = rememberMe ? 7 * 24 * 60 * 60 : 60 * 60; // 7 days or 1 hour

    const accessCookie = `access_token=${tokens.accessToken}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=Strict${isProduction ? '; Secure' : ''}`;
    const refreshCookie = `refresh_token=${tokens.refreshToken}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Strict${isProduction ? '; Secure' : ''}`;

    event.node.res.setHeader('Set-Cookie', [accessCookie, refreshCookie]);
  }

  clearAuthCookies(event: any): void {
    const isProduction = process.env.NODE_ENV === 'production';
    
    const accessCookie = `access_token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict${isProduction ? '; Secure' : ''}`;
    const refreshCookie = `refresh_token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict${isProduction ? '; Secure' : ''}`;

    event.node.res.setHeader('Set-Cookie', [accessCookie, refreshCookie]);
  }

  extractTokensFromCookies(event: any): { accessToken?: string; refreshToken?: string } {
    const cookies = event.node.req.headers.cookie;
    if (!cookies) return {};

    const cookieMap = new Map();
    cookies.split(';').forEach((cookie: string) => {
      const [name, value] = cookie.trim().split('=');
      if (name && value) {
        cookieMap.set(name, value);
      }
    });

    return {
      accessToken: cookieMap.get('access_token'),
      refreshToken: cookieMap.get('refresh_token')
    };
  }
}

// Export singleton instance
export const authService = AuthService.getInstance(); 