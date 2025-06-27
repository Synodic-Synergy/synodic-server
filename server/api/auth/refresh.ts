import { defineEventHandler, readBody, createError } from 'h3';
import type { RefreshRequest, AuthResponse } from '~/types/auth';
import { authService, SECURITY_CONFIG, RATE_LIMIT_CONFIG } from '~/utils/auth';
import { userStore } from '~/utils/stores/userStore';
import { sessionStore } from '~/utils/stores/sessionStore';

export default defineEventHandler(async (event): Promise<AuthResponse> => {
  try {
    const body = await readBody<RefreshRequest>(event);
    
    // Input validation
    if (!body.refreshToken) {
      throw createError({
        statusCode: 400,
        message: 'Refresh token is required'
      });
    }

    // Rate limiting
    const clientIP = authService.getClientIP(event);
    const rateLimitKey = `refresh:${clientIP}`;
    const rateLimit = authService.checkRateLimit(rateLimitKey, RATE_LIMIT_CONFIG.refresh);

    if (rateLimit.remaining <= 0) {
      throw createError({
        statusCode: 429,
        message: 'Too many refresh attempts. Please try again later.'
      });
    }

    // Verify refresh token
    let tokenPayload;
    try {
      tokenPayload = await authService.verifyRefreshToken(body.refreshToken);
    } catch (error) {
      throw createError({
        statusCode: 401,
        message: 'Invalid refresh token'
      });
    }

    // Find session
    const hashedToken = authService.hashToken(body.refreshToken);
    const session = await sessionStore.findByRefreshToken(hashedToken);
    
    if (!session || !session.isActive) {
      throw createError({
        statusCode: 401,
        message: 'Invalid or expired session'
      });
    }

    // Check if session is expired
    if (session.expiresAt < new Date()) {
      await sessionStore.deactivateSession(session.id);
      throw createError({
        statusCode: 401,
        message: 'Session expired'
      });
    }

    // Verify session belongs to token user
    if (session.userId !== tokenPayload.userId) {
      await sessionStore.deactivateSession(session.id);
      throw createError({
        statusCode: 401,
        message: 'Session mismatch'
      });
    }

    // Find user
    const user = await userStore.findById(tokenPayload.userId);
    if (!user) {
      await sessionStore.deactivateSession(session.id);
      throw createError({
        statusCode: 401,
        message: 'User not found'
      });
    }

    // Generate new tokens
    const newSessionId = authService.generateSessionId();
    const newAccessToken = await authService.generateAccessToken(user, newSessionId);
    const newRefreshToken = await authService.generateRefreshToken(user, newSessionId);

    // Deactivate old session
    await sessionStore.deactivateSession(session.id);

    // Create new session
    const newSession = await sessionStore.createSession({
      userId: user.id,
      refreshToken: authService.hashToken(newRefreshToken),
      userAgent: authService.getUserAgent(event),
      ipAddress: clientIP,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      isActive: true
    });

    // Set new cookies
    authService.setAuthCookies(event, {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      expiresAt: Date.now() + SECURITY_CONFIG.sessionTimeout
    });

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
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        expiresAt: Date.now() + SECURITY_CONFIG.sessionTimeout
      },
      permissions: authService.getPermissions(user.role)
    };

    return response;

  } catch (error: any) {
    if (error.statusCode) {
      throw error;
    }

    console.error('Refresh token error:', error);
    throw createError({
      statusCode: 500,
      message: 'Internal server error'
    });
  }
}); 