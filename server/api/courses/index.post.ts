import { defineEventHandler, readBody, createError } from 'h3';
import { courseStore } from '~/utils/stores/courseStore';
import { userStore } from '~/utils/stores/userStore';
import { authService } from '~/utils/auth';
import type { Course, CourseSchedule } from '~/types/course';

interface CreateCourseRequest {
  title: string;
  description: string;
  content: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  maxStudents: number;
  schedule: {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    room: string;
    type: 'lecture' | 'lab' | 'discussion' | 'exam';
  }[];
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

    // Only staff and admin can create courses
    if (user.role !== 'staff' && user.role !== 'admin') {
      throw createError({
        statusCode: 403,
        message: 'Forbidden: Only staff and admin can create courses'
      });
    }

    const body = await readBody<CreateCourseRequest>(event);
    const {
      title,
      description,
      content,
      category,
      level,
      maxStudents,
      schedule
    } = body;

    // Validate required fields
    if (!title || !description || !category || !level || !maxStudents) {
      throw createError({
        statusCode: 400,
        message: 'Missing required fields: title, description, category, level, maxStudents'
      });
    }

    // Validate level
    if (!['beginner', 'intermediate', 'advanced'].includes(level)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid level'
      });
    }

    // Validate max students
    if (maxStudents <= 0) {
      throw createError({
        statusCode: 400,
        message: 'Max students must be greater than 0'
      });
    }

    // Validate schedule
    const validScheduleTypes = ['lecture', 'lab', 'discussion', 'exam'];
    for (const scheduleItem of schedule || []) {
      if (scheduleItem.dayOfWeek < 0 || scheduleItem.dayOfWeek > 6) {
        throw createError({
          statusCode: 400,
          message: 'Invalid day of week (must be 0-6)'
        });
      }
      if (!validScheduleTypes.includes(scheduleItem.type)) {
        throw createError({
          statusCode: 400,
          message: `Invalid schedule type: ${scheduleItem.type}`
        });
      }
    }

    const courseSchedule: CourseSchedule[] = (schedule || []).map(item => ({
      id: crypto.randomUUID(),
      dayOfWeek: item.dayOfWeek,
      startTime: item.startTime,
      endTime: item.endTime,
      room: item.room,
      type: item.type
    }));

    const course: Course = {
      id: crypto.randomUUID(),
      title,
      description,
      content: content || '',
      teacherId: user.id,
      teacherName: `${user.firstName} ${user.lastName}`,
      students: [],
      studentCount: 0,
      resources: [],
      schedule: courseSchedule,
      status: 'active',
      category,
      level,
      maxStudents,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const createdCourse = await courseStore.create(course);

    return {
      success: true,
      data: createdCourse
    };
  } catch (error: any) {
    console.error('Error creating course:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to create course'
    });
  }
}); 