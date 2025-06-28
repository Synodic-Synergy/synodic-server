import { defineEventHandler, createError } from 'h3';
import { courseStore } from '~/utils/stores/courseStore';
import { userStore } from '~/utils/stores/userStore';
import { authService } from '~/utils/auth';

export default defineEventHandler(async (event) => {
  try {
    // Extract course ID from params
    const id = event.context.params?.id;
    if (!id) {
      throw createError({ statusCode: 400, message: 'Missing course ID' });
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

    // Find course
    const course = await courseStore.findOne({ id });
    if (!course) {
      throw createError({ statusCode: 404, message: 'Course not found' });
    }

    // Role-based access: students must be enrolled, staff must be teacher, admin can view all
    if (user.role === 'student' && !course.students.includes(user.id)) {
      throw createError({ statusCode: 403, message: 'Forbidden: Not enrolled in this course' });
    }
    if (user.role === 'staff' && course.teacherId !== user.id) {
      throw createError({ statusCode: 403, message: 'Forbidden: Not your course' });
    }
    // Admin can view all

    // Attach teacher name
    const teacher = await userStore.findById(course.teacherId);
    const teacherName = teacher ? `${teacher.firstName} ${teacher.lastName}` : 'Unknown Teacher';
    course.teacherName = teacherName;

    return {
      success: true,
      data: course
    };
  } catch (error: any) {
    console.error('Error fetching course:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to fetch course'
    });
  }
}); 