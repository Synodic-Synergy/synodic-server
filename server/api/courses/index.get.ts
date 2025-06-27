import { defineEventHandler, createError } from 'h3';
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

    let courses: any[] = [];

    // Get courses based on user role
    if (user.role === 'admin') {
      // Admin can see all courses
      courses = await courseStore.find({});
    } else if (user.role === 'staff') {
      // Staff can see their own courses
      courses = await courseStore.findByTeacher(user.id);
    } else if (user.role === 'student') {
      // Students can see their enrolled courses
      courses = await courseStore.findByStudent(user.id);
    }

    // Get teacher names for courses
    const teacherIds = [...new Set(courses.map(course => course.teacherId))];
    const teachers = await userStore.find({});
    const teacherMap = new Map(teachers
      .filter(teacher => teacherIds.includes(teacher.id))
      .map(teacher => [teacher.id, teacher]));

    courses = courses.map(course => ({
      ...course,
      teacherName: teacherMap.get(course.teacherId) ? 
        `${teacherMap.get(course.teacherId)!.firstName} ${teacherMap.get(course.teacherId)!.lastName}` : 
        'Unknown Teacher'
    }));

    return {
      success: true,
      data: courses
    };
  } catch (error: any) {
    console.error('Error fetching courses:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch courses'
    });
  }
}); 