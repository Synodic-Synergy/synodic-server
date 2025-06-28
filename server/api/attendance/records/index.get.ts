import { defineEventHandler, createError } from 'h3';
import { attendanceRecordStore } from '~/utils/stores/attendanceStore';
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
    const { courseId, studentId, date } = query;

    let records;
    
    if (courseId) {
      records = await attendanceRecordStore.findByCourse(courseId as string);
    } else if (studentId) {
      records = await attendanceRecordStore.findByStudent(studentId as string);
    } else if (date) {
      records = await attendanceRecordStore.findByDate(new Date(date as string));
    } else {
      records = await attendanceRecordStore.find({});
    }

    // Filter records based on user role
    if (user.role === 'student') {
      // Students can only see their own attendance records
      records = records.filter(record => record.studentId === user.id);
    } else if (user.role === 'staff') {
      // Staff can see records for courses they teach
      // TODO: Filter by courses they teach
    }
    // Admins can see all records

    return {
      success: true,
      data: records
    };
  } catch (error: any) {
    console.error('Error fetching attendance records:', error);
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to fetch attendance records'
    });
  }
}); 