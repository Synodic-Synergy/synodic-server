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

    // Only admin can access user management
    if (user.role !== 'admin') {
      throw createError({
        statusCode: 403,
        message: 'Forbidden: Only admin can access user management'
      });
    }

    // Get all users and sort by creation date (newest first)
    const allUsers = await userStore.find({});
    const sortedUsers = allUsers.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Get the 5 most recent users
    const recentUsers = sortedUsers.slice(0, 5);

    // Remove sensitive information
    const safeUsers = recentUsers.map(user => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      status: user.status || 'active',
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }));

    return {
      success: true,
      data: safeUsers
    };
  } catch (error: any) {
    console.error('Error fetching recent users:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch recent users'
    });
  }
}); 