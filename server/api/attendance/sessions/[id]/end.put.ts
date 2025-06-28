import { defineEventHandler, createError } from 'h3';
import { attendanceSessionStore } from '~/utils/stores/attendanceStore';
import { userStore } from '~/utils/stores/userStore';
import { authService } from '~/utils/auth';

export default defineEventHandler(async (event) => {
  try {
    // Extract session ID from params
    const id = event.context.params?.id;
    if (!id) {
      throw createError({ statusCode: 400, message: 'Missing session ID' });
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

    // Only staff and admin can end attendance sessions
    if (user.role === 'student') {
      throw createError({ statusCode: 403, message: 'Forbidden: Students cannot end attendance sessions' });
    }

    // Find session
    const session = await attendanceSessionStore.findOne({ id });
    if (!session) {
      throw createError({ statusCode: 404, message: 'Attendance session not found' });
    }

    // Check if user has permission to end this session
    if (user.role === 'staff' && session.teacherId !== user.id) {
      throw createError({ statusCode: 403, message: 'Forbidden: Not your attendance session' });
    }

    // End session
    const endedSession = await attendanceSessionStore.endSession(id);

    return {
      success: true,
      data: endedSession,
      message: 'Attendance session ended successfully'
    };
  } catch (error: any) {
    console.error('Error ending attendance session:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to end attendance session'
    });
  }
}); 