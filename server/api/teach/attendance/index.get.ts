import { defineEventHandler, createError } from 'h3';
import { attendanceRecordStore } from '~/utils/stores/attendanceStore';
import { courseStore } from '~/utils/stores/courseStore';
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

    // Only staff and admin can access attendance
    if (user.role !== 'staff' && user.role !== 'admin') {
      throw createError({
        statusCode: 403,
        message: 'Forbidden: Only staff and admin can access attendance'
      });
    }

    let attendanceRecords: any[] = [];

    // Get attendance based on user role
    if (user.role === 'admin') {
      // Admin can see all attendance records
      attendanceRecords = await attendanceRecordStore.find({});
    } else if (user.role === 'staff') {
      // Staff can see attendance for their courses
      const teacherCourses = await courseStore.findByTeacher(user.id);
      const courseIds = teacherCourses.map(course => course.id);
      
      for (const courseId of courseIds) {
        const courseAttendance = await attendanceRecordStore.findByCourse(courseId);
        attendanceRecords.push(...courseAttendance);
      }
    }

    // Get course names for attendance records
    const courseIds = [...new Set(attendanceRecords.map(record => record.courseId))];
    const courses = await courseStore.find({});
    const courseMap = new Map(courses.map(course => [course.id, course]));

    attendanceRecords = attendanceRecords.map(record => ({
      ...record,
      courseName: courseMap.get(record.courseId)?.title || 'Unknown Course'
    }));

    return {
      success: true,
      data: attendanceRecords
    };
  } catch (error: any) {
    console.error('Error fetching attendance:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch attendance'
    });
  }
}); 