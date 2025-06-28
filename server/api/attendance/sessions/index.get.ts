import { defineEventHandler, createError } from 'h3';
import { attendanceSessionStore } from '~/utils/stores/attendanceStore';
import { userStore } from '~/utils/stores/userStore';
import { authService } from '~/utils/auth';

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

    const query = event.context.query;
    const { courseId } = query;

    let sessions: any[] = [];
    
    if (courseId) {
      sessions = await attendanceSessionStore.findByCourse(courseId as string);
    } else if (user.role === 'staff') {
      sessions = await attendanceSessionStore.findByTeacher(user.id);
    } else {
      sessions = await attendanceSessionStore.find({});
    }

    // Filter sessions based on user role
    if (user.role === 'student') {
      // Students can only see sessions for courses they're enrolled in
      // TODO: Filter by enrolled courses
      sessions = [];
    }
    // Staff and admin can see their sessions

    return {
      success: true,
      data: sessions
    };
  } catch (error: any) {
    console.error('Error fetching attendance sessions:', error);
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to fetch attendance sessions'
    });
  }
}); 