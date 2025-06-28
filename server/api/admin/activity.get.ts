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

    // Only admin can access system activity
    if (user.role !== 'admin') {
      throw createError({
        statusCode: 403,
        message: 'Forbidden: Only admin can access system activity'
      });
    }

    // Get recent users and courses
    const allUsers = await userStore.find({});
    const allCourses = await courseStore.find({});

    // Sort by creation date (newest first)
    const sortedUsers = allUsers.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    const sortedCourses = allCourses.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Generate activity feed
    const activities: Array<{
      id: string;
      title: string;
      description: string;
      timestamp: Date;
    }> = [];

    // Add recent user registrations
    sortedUsers.slice(0, 3).forEach((user, index) => {
      activities.push({
        id: `user-${user.id}`,
        title: 'New user registered',
        description: `${user.firstName} ${user.lastName} created a new ${user.role} account`,
        timestamp: new Date(user.createdAt)
      });
    });

    // Add recent course creations
    sortedCourses.slice(0, 2).forEach((course, index) => {
      activities.push({
        id: `course-${course.id}`,
        title: 'Course created',
        description: `"${course.title}" course was created`,
        timestamp: new Date(course.createdAt)
      });
    });

    // Sort all activities by timestamp (newest first) and take the most recent 5
    const sortedActivities = activities.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ).slice(0, 5);

    return {
      success: true,
      data: sortedActivities
    };
  } catch (error: any) {
    console.error('Error fetching system activity:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch system activity'
    });
  }
}); 