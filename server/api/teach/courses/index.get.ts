import { defineEventHandler, createError } from 'h3';
import { courseStore } from '~/utils/stores/courseStore';
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

    // Only staff and admin can access teach courses
    if (user.role !== 'staff' && user.role !== 'admin') {
      throw createError({
        statusCode: 403,
        message: 'Forbidden: Only staff and admin can access teach courses'
      });
    }

    let courses: any[] = [];

    // Get courses based on user role
    if (user.role === 'admin') {
      // Admin can see all courses
      courses = await courseStore.find({});
    } else if (user.role === 'staff') {
      // Staff can see their own courses
      courses = await courseStore.findByTeacher(user.id);
    }

    return {
      success: true,
      data: courses
    };
  } catch (error: any) {
    console.error('Error fetching courses:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch courses'
    });
  }
}); 