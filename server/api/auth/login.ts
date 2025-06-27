import { defineEventHandler, readBody, createError } from 'h3';
import type { LoginRequest, AuthResponse, AuthError } from '~/types/auth';
import { authService, SECURITY_CONFIG, RATE_LIMIT_CONFIG } from '~/utils/auth';
import { userStore } from '~/utils/stores/userStore';
import { sessionStore } from '~/utils/stores/sessionStore';
import { loginAttemptStore } from '~/utils/stores/loginAttemptStore';

export default defineEventHandler(async (event): Promise<AuthResponse> => {
  try {
    const body = await readBody<LoginRequest>(event);
    
    // Input validation
    if (!body.email || !body.password) {
      throw createError({
        statusCode: 400,
        message: 'Email and password are required'
      });
    }

    // Rate limiting
    const clientIP = authService.getClientIP(event);
    const rateLimitKey = `login:${clientIP}`;
    const rateLimit = authService.checkRateLimit(rateLimitKey, RATE_LIMIT_CONFIG.login);

    if (rateLimit.remaining <= 0) {
      throw createError({
        statusCode: 429,
        message: `Too many login attempts. Please try again in ${Math.ceil((rateLimit.resetTime - Date.now()) / 1000 / 60)} minutes.`
      });
    }

    // Check if account is locked
    const accountLockStatus = await loginAttemptStore.isAccountLocked(
      body.email,
      SECURITY_CONFIG.maxLoginAttempts,
      SECURITY_CONFIG.lockoutDuration
    );

    if (accountLockStatus.isLocked) {
      const remainingMinutes = Math.ceil((accountLockStatus.remainingTime || 0) / 1000 / 60);
      throw createError({
        statusCode: 423,
        message: `Account is temporarily locked due to too many failed attempts. Please try again in ${remainingMinutes} minutes.`
      });
    }

    // Check if IP is blocked
    const ipBlockStatus = await loginAttemptStore.isIPBlocked(
      clientIP,
      SECURITY_CONFIG.maxLoginAttempts,
      SECURITY_CONFIG.lockoutDuration
    );

    if (ipBlockStatus.isBlocked) {
      const remainingMinutes = Math.ceil((ipBlockStatus.remainingTime || 0) / 1000 / 60);
      throw createError({
        statusCode: 423,
        message: `Too many failed attempts from this IP. Please try again in ${remainingMinutes} minutes.`
      });
    }

    // Find user
    const user = await userStore.findByEmail(body.email);
    if (!user) {
      await recordFailedAttempt(event, body.email, 'User not found');
      throw createError({
        statusCode: 401,
        message: 'Invalid credentials'
      });
    }

    // Verify password
    const isValidPassword = await authService.verifyPassword(body.password, user.password);
    if (!isValidPassword) {
      await recordFailedAttempt(event, body.email, 'Invalid password');
      throw createError({
        statusCode: 401,
        message: 'Invalid credentials'
      });
    }

    // Record successful attempt
    await recordSuccessfulAttempt(event, body.email);

    // Generate session
    const sessionId = authService.generateSessionId();
    const accessToken = await authService.generateAccessToken(user, sessionId);
    const refreshToken = await authService.generateRefreshToken(user, sessionId);

    // Create session record
    const session = await sessionStore.createSession({
      userId: user.id,
      refreshToken: authService.hashToken(refreshToken),
      userAgent: authService.getUserAgent(event),
      ipAddress: clientIP,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      isActive: true
    });

    // Set cookies
    authService.setAuthCookies(event, {
      accessToken,
      refreshToken,
      expiresAt: Date.now() + SECURITY_CONFIG.sessionTimeout
    }, body.rememberMe || false);

    // Return response
    const response: AuthResponse = {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      tokens: {
        accessToken,
        refreshToken,
        expiresAt: Date.now() + SECURITY_CONFIG.sessionTimeout
      },
      permissions: authService.getPermissions(user.role)
    };

    return response;

  } catch (error: any) {
    // Don't expose internal errors to client
    if (error.statusCode) {
      throw error;
    }

    console.error('Login error:', error);
    throw createError({
      statusCode: 500,
      message: 'Internal server error'
    });
  }
});

async function recordFailedAttempt(event: any, email: string, reason: string): Promise<void> {
  try {
    await loginAttemptStore.recordAttempt({
      email,
      ipAddress: authService.getClientIP(event),
      userAgent: authService.getUserAgent(event),
      success: false,
      failureReason: reason
    });
  } catch (error) {
    console.error('Failed to record login attempt:', error);
  }
}

async function recordSuccessfulAttempt(event: any, email: string): Promise<void> {
  try {
    await loginAttemptStore.recordAttempt({
      email,
      ipAddress: authService.getClientIP(event),
      userAgent: authService.getUserAgent(event),
      success: true
    });
  } catch (error) {
    console.error('Failed to record successful login attempt:', error);
  }
} 