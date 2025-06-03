import { defineEventHandler, createError } from 'h3';
import { jwtVerify } from 'jose';
import { userStore } from '~/utils/stores/userStore';
import type { AuthResponse } from '~/types/user';

export default defineEventHandler(async (event) => {
  const cookies = event.node.req.headers.cookie;
  const token = cookies?.split(';')
    .find((c: string) => c.trim().startsWith('auth_token='))
    ?.split('=')[1];

  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized - No token provided'
    });
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    const user = await userStore.findById(payload.sub as string);
    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Unauthorized - User not found'
      });
    }

    const response: AuthResponse = {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    };

    return response;
  } catch (error) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized - Invalid token'
    });
  }
}); 