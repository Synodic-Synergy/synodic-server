import { defineEventHandler, createError } from 'h3';
import { lessonStore } from '~/utils/stores/lessonStore';
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

    const query = event.context.query;
    const { courseId, teacherId, status } = query;

    let lessons;
    
    if (courseId) {
      lessons = await lessonStore.findByCourse(courseId as string);
    } else if (teacherId) {
      lessons = await lessonStore.findByTeacher(teacherId as string);
    } else if (status) {
      lessons = await lessonStore.findByStatus(status as any);
    } else {
      lessons = await lessonStore.find({});
    }

    // Filter lessons based on user role
    if (user.role === 'student') {
      // Students can only see published lessons for courses they're enrolled in
      // TODO: Filter by enrolled courses
      lessons = lessons.filter(lesson => lesson.status === 'published');
    } else if (user.role === 'staff') {
      // Staff can see their own lessons and published lessons
      lessons = lessons.filter(lesson => 
        lesson.teacherId === user.id || lesson.status === 'published'
      );
    }
    // Admins can see all lessons

    return {
      success: true,
      data: lessons
    };
  } catch (error: any) {
    console.error('Error fetching lessons:', error);
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to fetch lessons'
    });
  }
}); 