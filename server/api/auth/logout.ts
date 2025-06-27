import { defineEventHandler, createError } from 'h3';
import { authService } from '~/utils/auth';
import { sessionStore } from '~/utils/stores/sessionStore';

export default defineEventHandler(async (event) => {
  try {
    // Extract tokens from cookies
    const { accessToken, refreshToken } = authService.extractTokensFromCookies(event);
    
    if (refreshToken) {
      try {
        // Verify refresh token to get session ID
        const tokenPayload = await authService.verifyRefreshToken(refreshToken);
        const hashedToken = authService.hashToken(refreshToken);
        
        // Find and deactivate session
        const session = await sessionStore.findByRefreshToken(hashedToken);
        if (session && session.userId === tokenPayload.userId) {
          await sessionStore.deactivateSession(session.id);
        }
      } catch (error) {
        // Token is invalid, but we still want to clear cookies
        console.warn('Invalid refresh token during logout:', error);
      }
    }

    // Clear all cookies
    authService.clearAuthCookies(event);

    return { 
      success: true,
      message: 'Successfully logged out'
    };

  } catch (error: any) {
    console.error('Logout error:', error);
    
    // Even if there's an error, clear cookies
    authService.clearAuthCookies(event);
    
    return { 
      success: true,
      message: 'Successfully logged out'
    };
  }
}); 