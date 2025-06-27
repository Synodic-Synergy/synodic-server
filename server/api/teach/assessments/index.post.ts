import { defineEventHandler, readBody, createError } from 'h3';
import { assessmentStore } from '~/utils/stores/assessmentStore';
import { userStore } from '~/utils/stores/userStore';
import { authService } from '~/utils/auth';
import type { Assessment } from '~/types/assessment';

interface CreateAssessmentRequest {
  courseId: string;
  title: string;
  description: string;
  type: 'quiz' | 'assignment' | 'exam' | 'project';
  dueDate: string;
  maxScore: number;
  weight: number;
  instructions: string;
  allowLateSubmission: boolean;
  latePenalty: number;
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

    // Only staff and admin can create assessments
    if (user.role !== 'staff' && user.role !== 'admin') {
      throw createError({
        statusCode: 403,
        message: 'Forbidden: Only staff and admin can create assessments'
      });
    }

    const body = await readBody<CreateAssessmentRequest>(event);
    const {
      courseId,
      title,
      description,
      type,
      dueDate,
      maxScore,
      weight,
      instructions,
      allowLateSubmission,
      latePenalty
    } = body;

    // Validate required fields
    if (!courseId || !title || !description || !type || !dueDate || !maxScore || !weight) {
      throw createError({
        statusCode: 400,
        message: 'Missing required fields: courseId, title, description, type, dueDate, maxScore, weight'
      });
    }

    // Validate assessment type
    if (!['quiz', 'assignment', 'exam', 'project'].includes(type)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid assessment type'
      });
    }

    // Validate due date
    const dueDateObj = new Date(dueDate);
    if (isNaN(dueDateObj.getTime())) {
      throw createError({
        statusCode: 400,
        message: 'Invalid due date format'
      });
    }

    // Validate scores and weights
    if (maxScore <= 0 || weight <= 0 || weight > 100) {
      throw createError({
        statusCode: 400,
        message: 'Invalid maxScore or weight values'
      });
    }

    const assessment: Assessment = {
      id: crypto.randomUUID(),
      courseId,
      title,
      description,
      type,
      dueDate: dueDateObj,
      maxScore,
      weight,
      instructions: instructions || '',
      attachments: [],
      status: 'draft',
      allowLateSubmission: allowLateSubmission || false,
      latePenalty: latePenalty || 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const createdAssessment = await assessmentStore.create(assessment);

    return {
      success: true,
      data: createdAssessment
    };
  } catch (error: any) {
    console.error('Error creating assessment:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to create assessment'
    });
  }
}); 