import { defineEventHandler, createError } from 'h3';
import { jwtVerify } from 'jose';
import type { UserRole } from '~/types/user';

export default defineEventHandler(async (event) => {
  // Skip auth for public routes and pages
  const publicRoutes = [
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/register-admin',
    '/api/auth/me',
    '/',
    '/login',
    '/index',
    '/__nuxt_error'  // Add error page to public routes
  ];
  
  // Check if the current path is in public routes
  const isPublicRoute = publicRoutes.some(route => {
    const isMatch = event.path === route || 
                   event.path.startsWith(route + '/') ||
                   event.path.startsWith('/__nuxt');  // Allow all Nuxt internal routes
    return isMatch;
  });

  if (isPublicRoute) {
    return;
  }

  // For API routes, require authentication
  if (event.path.startsWith('/api/')) {
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
      const config = useRuntimeConfig();
      const secret = new TextEncoder().encode(config.jwtSecret);
      const { payload } = await jwtVerify(token, secret);
      
      // Add user info to event context
      event.context.auth = {
        userId: payload.sub,
        role: payload.role as UserRole
      };
    } catch (error) {
      throw createError({
        statusCode: 401,
        message: 'Unauthorized - Invalid token'
      });
    }
  }
}); 