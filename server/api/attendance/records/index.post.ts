import { defineEventHandler, createError, readBody } from 'h3';
import { attendanceRecordStore } from '~/utils/stores/attendanceStore';
import { userStore } from '~/utils/stores/userStore';
import { authService } from '~/utils/auth';
import type { AttendanceRecord } from '~/types/attendance';

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

    // Only staff and admin can mark attendance
    if (user.role === 'student') {
      throw createError({ statusCode: 403, message: 'Forbidden: Students cannot mark attendance' });
    }

    // Read request body
    const body = await readBody(event) as any;
    const { courseId, lessonId, studentId, status, notes } = body;

    // Validate required fields
    if (!courseId || !studentId || !status) {
      throw createError({ statusCode: 400, message: 'Missing required fields: courseId, studentId, status' });
    }

    // Get student name
    const student = await userStore.findById(studentId);
    if (!student) {
      throw createError({ statusCode: 400, message: 'Student not found' });
    }

    // Create attendance record
    const recordData = {
      courseId,
      lessonId,
      studentId,
      studentName: `${student.firstName} ${student.lastName}`,
      teacherId: user.id,
      teacherName: `${user.firstName} ${user.lastName}`,
      date: new Date(),
      status,
      notes: notes || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Create record
    const record = await attendanceRecordStore.create(recordData);

    return {
      success: true,
      data: record,
      message: 'Attendance marked successfully'
    };
  } catch (error: any) {
    console.error('Error marking attendance:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to mark attendance'
    });
  }
}); 