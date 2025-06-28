import { defineEventHandler, createError } from 'h3';
import { lessonStore } from '~/utils/stores/lessonStore';
import { userStore } from '~/utils/stores/userStore';
import { authService } from '~/utils/auth';

export default defineEventHandler(async (event) => {
  try {
    // Extract lesson ID from params
    const id = event.context.params?.id;
    if (!id) {
      throw createError({ statusCode: 400, message: 'Missing lesson ID' });
    }

    // Extract tokens from cookies
    const { accessToken } = authService.extractTokensFromCookies(event);
    if (!accessToken) {
      throw createError({ statusCode: 401, message: 'No access token provided' });
    }

    // Verify access token
    let authContext;
    try {
      authContext = await authService.verifyAccessToken(accessToken);
    } catch (error) {
      throw createError({ statusCode: 401, message: 'Invalid access token' });
    }

    // Find user
    const user = await userStore.findById(authContext.userId);
    if (!user) {
      throw createError({ statusCode: 401, message: 'User not found' });
    }

    // Find lesson
    const lesson = await lessonStore.findOne({ id });
    if (!lesson) {
      throw createError({ statusCode: 404, message: 'Lesson not found' });
    }

    // Role-based access control
    if (user.role === 'student') {
      // Students can only see published lessons
      if (lesson.status !== 'published') {
        throw createError({ statusCode: 403, message: 'Forbidden: Lesson not published' });
      }
      // TODO: Check if student is enrolled in the course
    } else if (user.role === 'staff') {
      // Staff can see their own lessons and published lessons
      if (lesson.teacherId !== user.id && lesson.status !== 'published') {
        throw createError({ statusCode: 403, message: 'Forbidden: Not your lesson' });
      }
    }
    // Admin can view all lessons

    return {
      success: true,
      data: lesson
    };
  } catch (error: any) {
    console.error('Error fetching lesson:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to fetch lesson'
    });
  }
}); 