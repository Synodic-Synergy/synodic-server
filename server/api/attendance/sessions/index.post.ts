import { defineEventHandler, createError, readBody } from 'h3';
import { attendanceSessionStore } from '~/utils/stores/attendanceStore';
import { userStore } from '~/utils/stores/userStore';
import { authService } from '~/utils/auth';
import type { AttendanceSession } from '~/types/attendance';

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

    // Only staff and admin can create attendance sessions
    if (user.role === 'student') {
      throw createError({ statusCode: 403, message: 'Forbidden: Students cannot create attendance sessions' });
    }

    // Read request body
    const body = await readBody(event) as any;
    const { courseId, lessonId } = body;

    // Validate required fields
    if (!courseId) {
      throw createError({ statusCode: 400, message: 'Missing required field: courseId' });
    }

    // Check if there's already an active session for this course
    const activeSession = await attendanceSessionStore.getActiveSession(courseId);
    if (activeSession) {
      throw createError({ statusCode: 400, message: 'There is already an active attendance session for this course' });
    }

    // Create session data
    const sessionData = {
      courseId,
      lessonId,
      teacherId: user.id,
      date: new Date(),
      startTime: new Date().toISOString(),
      isActive: true,
      records: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Create session
    const session = await attendanceSessionStore.create(sessionData);

    return {
      success: true,
      data: session,
      message: 'Attendance session created successfully'
    };
  } catch (error: any) {
    console.error('Error creating attendance session:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to create attendance session'
    });
  }
});