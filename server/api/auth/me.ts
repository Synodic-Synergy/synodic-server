import { defineEventHandler, createError } from 'h3';
import type { AuthResponse } from '~/types/auth';
import { authService } from '~/utils/auth';
import { userStore } from '~/utils/stores/userStore';
import { sessionStore } from '~/utils/stores/sessionStore';

export default defineEventHandler(async (event): Promise<AuthResponse> => {
  try {
    // Extract tokens from cookies
    const { accessToken, refreshToken } = authService.extractTokensFromCookies(event);
    
    if (!accessToken) {
      throw createError({
        statusCode: 401,
        message: 'No access token provided'
      });
    }

    // Verify access token
    let authContext;
    try {
      authContext = await authService.verifyAccessToken(accessToken);
    } catch (error) {
      // If access token is invalid, try refresh token
      if (refreshToken) {
        try {
          const refreshResult = await $fetch('/api/auth/refresh', {
            method: 'POST',
            body: { refreshToken }
          });
          return refreshResult as AuthResponse;
        } catch (refreshError) {
          throw createError({
            statusCode: 401,
            message: 'Invalid or expired tokens'
          });
        }
      } else {
        throw createError({
          statusCode: 401,
          message: 'Invalid access token'
        });
      }
    }

    // TEMPORARILY DISABLED: Verify session is still active
    // const session = await sessionStore.findBySessionId(authContext.sessionId);
    // if (!session || !session.isActive) {
    //   throw createError({
    //     statusCode: 401,
    //     message: 'Session is no longer active'
    //   });
    // }

    // Find user
    const user = await userStore.findById(authContext.userId);
    if (!user) {
      // TEMPORARILY DISABLED: await sessionStore.deactivateSession(authContext.sessionId);
      throw createError({
        statusCode: 401,
        message: 'User not found'
      });
    }

    // TEMPORARILY DISABLED: Update session activity
    // await sessionStore.updateSessionActivity(authContext.sessionId);

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
        refreshToken: refreshToken || '',
        expiresAt: Date.now() + (60 * 60 * 1000) // 1 hour from now
      },
      permissions: authContext.permissions
    };

    return response;

  } catch (error: any) {
    if (error.statusCode) {
      throw error;
    }

    console.error('Me endpoint error:', error);
    throw createError({
      statusCode: 500,
      message: 'Internal server error'
    });
  }
}); 