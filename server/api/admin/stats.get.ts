import { defineEventHandler, createError } from 'h3';
import { userStore } from '~/utils/stores/userStore';
import { courseStore } from '~/utils/stores/courseStore';
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

    // Only admin can access system stats
    if (user.role !== 'admin') {
      throw createError({
        statusCode: 403,
        message: 'Forbidden: Only admin can access system stats'
      });
    }

    // Get all users and courses
    const users = await userStore.find({});
    const courses = await courseStore.find({});

    // Calculate stats
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.status !== 'inactive').length;
    const activeCourses = courses.filter(c => c.status === 'active').length;
    const pendingReviews = courses.filter(c => c.status === 'draft').length;
    
    // Calculate system health (simplified)
    const systemHealth = Math.min(100, Math.max(0, 
      100 - (totalUsers === 0 ? 0 : (totalUsers - activeUsers) / totalUsers * 20)
    ));

    return {
      success: true,
      data: {
        totalUsers,
        activeCourses,
        pendingReviews,
        systemHealth: Math.round(systemHealth)
      }
    };
  } catch (error: any) {
    console.error('Error fetching system stats:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch system stats'
    });
  }
}); 