import { defineEventHandler, readBody, createError } from 'h3';
import { attendanceRecordStore } from '~/utils/stores/attendanceStore';
import { courseStore } from '~/utils/stores/courseStore';
import { userStore } from '~/utils/stores/userStore';
import { authService } from '~/utils/auth';
import type { AttendanceRecord } from '~/types/attendance';

interface CreateAttendanceRequest {
  courseId: string;
  date: string;
  students: {
    studentId: string;
    studentName: string;
    status: 'present' | 'absent' | 'late' | 'excused';
    notes?: string;
  }[];
  notes?: string;
}

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

    // Only staff and admin can create attendance records
    if (user.role !== 'staff' && user.role !== 'admin') {
      throw createError({
        statusCode: 403,
        message: 'Forbidden: Only staff and admin can create attendance records'
      });
    }

    const body = await readBody<CreateAttendanceRequest>(event);
    const { courseId, date, students, notes } = body;

    // Validate required fields
    if (!courseId || !date || !students || students.length === 0) {
      throw createError({
        statusCode: 400,
        message: 'Missing required fields: courseId, date, students'
      });
    }

    // Validate date
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      throw createError({
        statusCode: 400,
        message: 'Invalid date format'
      });
    }

    // Check if user is the teacher of this course (for staff)
    if (user.role === 'staff') {
      const teacherCourses = await courseStore.findByTeacher(user.id);
      const isTeacherOfCourse = teacherCourses.some(course => course.id === courseId);
      
      if (!isTeacherOfCourse) {
        throw createError({
          statusCode: 403,
          message: 'Forbidden: You can only create attendance for your own courses'
        });
      }
    }

    // Validate attendance status
    const validStatuses = ['present', 'absent', 'late', 'excused'];
    for (const student of students) {
      if (!validStatuses.includes(student.status)) {
        throw createError({
          statusCode: 400,
          message: `Invalid attendance status: ${student.status}`
        });
      }
    }

    // Create individual attendance records for each student
    const createdRecords: AttendanceRecord[] = [];
    
    for (const student of students) {
      const attendanceRecord: Omit<AttendanceRecord, 'id'> = {
        courseId,
        studentId: student.studentId,
        studentName: student.studentName,
        teacherId: user.id,
        teacherName: `${user.firstName} ${user.lastName}`,
        date: dateObj,
        status: student.status,
        notes: student.notes || '',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const createdRecord = await attendanceRecordStore.create(attendanceRecord);
      createdRecords.push(createdRecord);
    }

    return {
      success: true,
      data: createdRecords,
      message: `Created ${createdRecords.length} attendance records`
    };
  } catch (error: any) {
    console.error('Error creating attendance records:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to create attendance records'
    });
  }
}); 