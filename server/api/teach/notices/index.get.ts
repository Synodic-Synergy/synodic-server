import { defineEventHandler, createError } from 'h3';
import { noticeStore } from '~/utils/stores/noticeStore';
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

    // Only staff and admin can access teach notices
    if (user.role !== 'staff' && user.role !== 'admin') {
      throw createError({
        statusCode: 403,
        message: 'Forbidden: Only staff and admin can access teach notices'
      });
    }

    let notices: any[] = [];

    // Get notices based on user role
    if (user.role === 'admin') {
      // Admin can see all notices
      notices = await noticeStore.find({});
    } else if (user.role === 'staff') {
      // Staff can see notices they created or notices for staff
      const allNotices = await noticeStore.find({});
      notices = allNotices.filter(notice => 
        notice.authorId === user.id || 
        notice.targetAudience === 'all' || 
        notice.targetAudience === 'staff' ||
        (notice.targetRoles && notice.targetRoles.includes('staff'))
      );
    }

    // Sort by creation date (newest first)
    notices.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return {
      success: true,
      data: notices
    };
  } catch (error: any) {
    console.error('Error fetching notices:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch notices'
    });
  }
}); 