import { defineEventHandler, createError } from 'h3';
import type { UserRole } from '~/types/user';
import { authService } from '~/utils/auth';
import { sessionStore } from '~/utils/stores/sessionStore';

export default defineEventHandler(async (event) => {
  // Skip auth for public routes and pages
  const publicRoutes = [
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/register-admin',
    '/api/auth/refresh',
    '/api/auth/me',
    '/api/auth/logout',
    '/',
    '/login',
    '/index',
    '/admin-setup',
    '/__nuxt_error'
  ];
  
  // Check if the current path is in public routes
  const isPublicRoute = publicRoutes.some(route => {
    const isMatch = event.path === route || 
                   event.path.startsWith(route + '/') ||
                   event.path.startsWith('/__nuxt') ||
                   event.path.startsWith('/_nuxt');
    return isMatch;
  });

  if (isPublicRoute) {
    return;
  }

  // For API routes, require authentication
  if (event.path.startsWith('/api/')) {
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
            
            // Update cookies with new tokens
            const newTokens = (refreshResult as any).tokens;
            authService.setAuthCookies(event, newTokens);
            
            // Get auth context from new access token
            authContext = await authService.verifyAccessToken(newTokens.accessToken);
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

      // TEMPORARILY DISABLED: Check if session is expired
      // if (session.expiresAt < new Date()) {
      //   await sessionStore.deactivateSession(session.id);
      //   throw createError({
      //     statusCode: 401,
      //     message: 'Session expired'
      //   });
      // }

      // Add user info to event context
      event.context.auth = {
        userId: authContext.userId,
        role: authContext.role,
        sessionId: authContext.sessionId,
        permissions: authContext.permissions
      };

      // TEMPORARILY DISABLED: Update session activity
      // await sessionStore.updateSessionActivity(authContext.sessionId);

    } catch (error: any) {
      if (error.statusCode) {
        throw error;
      }

      console.error('Auth middleware error:', error);
      throw createError({
        statusCode: 401,
        message: 'Authentication failed'
      });
    }
  }
}); 