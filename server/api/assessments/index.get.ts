import { defineEventHandler, createError } from 'h3';
import { assessmentStore } from '~/utils/stores/assessmentStore';
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

    let assessments: any[] = [];

    // Get assessments based on user role
    if (user.role === 'admin') {
      // Admin can see all assessments
      assessments = await assessmentStore.find({});
    } else if (user.role === 'staff') {
      // Staff can see assessments for their courses
      const teacherCourses = await courseStore.findByTeacher(user.id);
      const courseIds = teacherCourses.map(course => course.id);
      
      for (const courseId of courseIds) {
        const courseAssessments = await assessmentStore.findByCourse(courseId);
        assessments.push(...courseAssessments);
      }
    } else if (user.role === 'student') {
      // Students can see published assessments for their courses
      const studentCourses = await courseStore.findByStudent(user.id);
      const courseIds = studentCourses.map(course => course.id);
      
      for (const courseId of courseIds) {
        const courseAssessments = await assessmentStore.findByCourse(courseId);
        assessments.push(...courseAssessments);
      }
      
      // Filter to only published assessments
      assessments = assessments.filter(assessment => assessment.status === 'published');
    }

    // Get course names for assessments
    const courseIds = [...new Set(assessments.map(assessment => assessment.courseId))];
    const courses = await courseStore.find({});
    const courseMap = new Map(courses.map(course => [course.id, course]));

    assessments = assessments.map(assessment => ({
      ...assessment,
      courseName: courseMap.get(assessment.courseId)?.title || 'Unknown Course'
    }));

    return {
      success: true,
      data: assessments
    };
  } catch (error: any) {
    console.error('Error fetching assessments:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch assessments'
    });
  }
}); 