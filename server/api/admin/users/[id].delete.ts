import { defineEventHandler, createError } from 'h3';
import { userStore } from '~/utils/stores/userStore';
import { authService } from '~/utils/auth';

export default defineEventHandler(async (event) => {
  try {
    // Extract tokens from cookies
    const { accessToken } = authService.extractTokensFromCookies(event);
    
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
      throw createError({
        statusCode: 401,
        message: 'Invalid access token'
      });
    }

    // Find user
    const user = await userStore.findById(authContext.userId);
    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'User not found'
      });
    }

    // Only admin can delete users
    if (user.role !== 'admin') {
      throw createError({
        statusCode: 403,
        message: 'Forbidden: Only admin can delete users'
      });
    }

    // Extract user ID from URL
    const urlParts = event.path.split('/');
    const userId = urlParts[urlParts.length - 1];
    if (!userId) {
      throw createError({
        statusCode: 400,
        message: 'User ID is required'
      });
    }

    // Prevent admin from deleting themselves
    if (userId === user.id) {
      throw createError({
        statusCode: 400,
        message: 'Cannot delete your own account'
      });
    }

    // Find the user to delete
    const userToDelete = await userStore.findById(userId);
    if (!userToDelete) {
      throw createError({
        statusCode: 404,
        message: 'User not found'
      });
    }

    // Delete user
    await userStore.delete(userId);

    return {
      success: true,
      message: 'User deleted successfully'
    };
  } catch (error: any) {
    console.error('Error deleting user:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to delete user'
    });
  }
}); 