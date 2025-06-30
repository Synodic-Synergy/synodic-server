import { defineEventHandler, readBody, createError } from 'h3';
import { assessmentStore } from '~/utils/stores/assessmentStore';
import { authService } from '~/utils/auth';
import { userStore } from '~/utils/stores/userStore';
import type { Assessment } from '~/types/assessment';

export default defineEventHandler(async (event) => {
  try {
    // Auth: extract and verify JWT
    const { accessToken } = authService.extractTokensFromCookies(event);
    if (!accessToken) throw createError({ statusCode: 401, message: 'No access token provided' });
    let authContext;
    try {
      authContext = await authService.verifyAccessToken(accessToken);
    } catch (e) {
      throw createError({ statusCode: 401, message: 'Invalid access token' });
    }
    const user = await userStore.findById(authContext.userId);
    if (!user) throw createError({ statusCode: 401, message: 'User not found' });
    if (user.role !== 'staff' && user.role !== 'admin') {
      throw createError({ statusCode: 403, message: 'Forbidden: Only staff and admin can access this endpoint' });
    }

    // Get assessment ID from params
    const id = event.context.params?.id;
    if (!id) throw createError({ statusCode: 400, message: 'Missing assessment ID' });

    // Use event.node.req.method for HTTP method
    const method = event.node.req.method;

    // GET: Fetch assessment by ID
    if (method === 'GET') {
      const assessment = await assessmentStore.findOne({ id });
      if (!assessment) throw createError({ statusCode: 404, message: 'Assessment not found' });
      return { success: true, data: assessment };
    }

    // PUT: Update assessment by ID
    if (method === 'PUT') {
      const body = (await readBody(event)) as Partial<Assessment>;
      if (!body || typeof body !== 'object' || !body.title || !body.description || !body.dueDate) {
        throw createError({ statusCode: 400, message: 'Missing required fields' });
      }
      const updated = await assessmentStore.update(id, {
        ...body,
        updatedAt: new Date(),
      });
      if (!updated) throw createError({ statusCode: 404, message: 'Assessment not found' });
      return { success: true, data: updated };
    }

    // DELETE: Delete assessment by ID
    if (method === 'DELETE') {
      const deleted = await assessmentStore.delete(id);
      if (!deleted) throw createError({ statusCode: 404, message: 'Assessment not found' });
      return { success: true };
    }

    // Method not allowed
    throw createError({ statusCode: 405, message: 'Method not allowed' });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('Error in /api/teach/assessments/[id]:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal server error',
    });
  }
}); 