import { defineEventHandler, createError, readBody } from 'h3';
import { lessonStore } from '~/utils/stores/lessonStore';
import { userStore } from '~/utils/stores/userStore';
import { authService } from '~/utils/auth';
import type { Lesson } from '~/types/lesson';

export default defineEventHandler(async (event) => {
  try {
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

    // Only staff and admin can create lessons
    if (user.role === 'student') {
      throw createError({ statusCode: 403, message: 'Forbidden: Students cannot create lessons' });
    }

    // Read request body
    const body = await readBody(event) as any;
    const { courseId, title, description, content, order, status, estimatedDuration, resources } = body;

    // Validate required fields
    if (!courseId || !title || !description) {
      throw createError({ statusCode: 400, message: 'Missing required fields: courseId, title, description' });
    }

    // Get next order if not provided
    let lessonOrder = order;
    if (!lessonOrder) {
      lessonOrder = await lessonStore.getNextOrder(courseId);
    }

    // Create lesson data
    const lessonData = {
      courseId,
      title,
      description,
      content: content || '',
      order: lessonOrder,
      teacherId: user.id,
      teacherName: `${user.firstName} ${user.lastName}`,
      status: status || 'draft',
      estimatedDuration: estimatedDuration || 60,
      resources: resources || [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Create lesson
    const lesson = await lessonStore.create(lessonData);

    return {
      success: true,
      data: lesson,
      message: 'Lesson created successfully'
    };
  } catch (error: any) {
    console.error('Error creating lesson:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to create lesson'
    });
  }
}); 