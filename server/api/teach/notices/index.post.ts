import { defineEventHandler, readBody, createError } from 'h3';
import { noticeStore } from '~/utils/stores/noticeStore';
import { userStore } from '~/utils/stores/userStore';
import { authService } from '~/utils/auth';
import type { Notice } from '~/types/notice';

interface CreateNoticeRequest {
  title: string;
  content: string;
  category: 'general' | 'academic' | 'event' | 'emergency' | 'reminder';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  targetAudience: 'all' | 'students' | 'staff' | 'admin' | 'specific';
  targetRoles?: string[];
  targetUsers?: string[];
  startDate: string;
  endDate: string;
  isPinned: boolean;
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

    // Only staff and admin can create notices
    if (user.role !== 'staff' && user.role !== 'admin') {
      throw createError({
        statusCode: 403,
        message: 'Forbidden: Only staff and admin can create notices'
      });
    }

    const body = await readBody<CreateNoticeRequest>(event);
    const {
      title,
      content,
      category,
      priority,
      targetAudience,
      targetRoles,
      targetUsers,
      startDate,
      endDate,
      isPinned
    } = body;

    // Validate required fields
    if (!title || !content || !category || !priority || !targetAudience || !startDate || !endDate) {
      throw createError({
        statusCode: 400,
        message: 'Missing required fields: title, content, category, priority, targetAudience, startDate, endDate'
      });
    }

    // Validate category
    if (!['general', 'academic', 'event', 'emergency', 'reminder'].includes(category)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid category'
      });
    }

    // Validate priority
    if (!['low', 'medium', 'high', 'urgent'].includes(priority)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid priority'
      });
    }

    // Validate target audience
    if (!['all', 'students', 'staff', 'admin', 'specific'].includes(targetAudience)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid target audience'
      });
    }

    // Validate dates
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
      throw createError({
        statusCode: 400,
        message: 'Invalid date format'
      });
    }

    if (startDateObj >= endDateObj) {
      throw createError({
        statusCode: 400,
        message: 'End date must be after start date'
      });
    }

    const notice: Notice = {
      id: crypto.randomUUID(),
      title,
      content,
      category,
      priority,
      authorId: user.id,
      authorName: `${user.firstName} ${user.lastName}`,
      targetAudience,
      targetRoles: targetRoles || [],
      targetUsers: targetUsers || [],
      startDate: startDateObj,
      endDate: endDateObj,
      isActive: true,
      isPinned: isPinned || false,
      attachments: [],
      readBy: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const createdNotice = await noticeStore.create(notice);

    return {
      success: true,
      data: createdNotice
    };
  } catch (error: any) {
    console.error('Error creating notice:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to create notice'
    });
  }
}); 