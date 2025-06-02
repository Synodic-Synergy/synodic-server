import { defineEventHandler, getRequestHeader, createError } from 'h3';
import { jwtVerify } from 'jose';
import type { UserRole } from '~/types/user';

export default defineEventHandler(async (event) => {
  // Skip auth for public routes and pages
  const publicRoutes = [
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/register-admin',
    '/',
    '/login',
    '/index'
  ];
  
  // Log the current path for debugging
  console.log('Current path:', event.path);
  
  // Check if the current path is in public routes
  const isPublicRoute = publicRoutes.some(route => {
    const isMatch = event.path === route || 
                   event.path.startsWith(route + '/') ||
                   event.path === route + '.html' ||
                   event.path === route + '.json';
    console.log(`Checking route ${route} against ${event.path}: ${isMatch}`);
    return isMatch;
  });

  if (isPublicRoute) {
    console.log('Skipping auth for public route:', event.path);
    return;
  }

  const authHeader = getRequestHeader(event, 'authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized - No token provided'
    });
  }

  const token = authHeader.split(' ')[1];
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
}); 