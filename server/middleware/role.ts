import { defineEventHandler, createError } from 'h3';
import type { UserRole } from '~/types/user';
import type { AuthContext } from '~/types/auth';

export default defineEventHandler((event) => {
  // Only apply to API routes
  if (!event.path.startsWith('/api/')) {
    return;
  }

  // Skip auth for public routes
  const publicRoutes = [
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/register-admin',
    '/api/auth/refresh',
    '/api/auth/me',
    '/api/auth/logout'
  ];
  
  const isPublicRoute = publicRoutes.some(route => {
    return event.path === route || event.path.startsWith(route + '/');
  });

  if (isPublicRoute) {
    return;
  }

  const auth = event.context.auth as AuthContext;
  if (!auth) {
    throw createError({
      statusCode: 401,
      message: 'Authentication required'
    });
  }

  // Role-based route protection
  const roleRoutes: Record<UserRole, string[]> = {
    admin: [
      '/api/admin',
      '/api/users',
      '/api/system'
    ],
    staff: [
      '/api/teach',
      '/api/courses',
      '/api/assessments',
      '/api/notices',
      '/api/attendance'
    ],
    student: [
      '/api/learn',
      '/api/courses',
      '/api/assessments',
      '/api/notices',
      '/api/timetable'
    ]
  };

  // Check if user has access to the current route
  const userRole = auth.role as UserRole;
  const allowedRoutes = roleRoutes[userRole] || [];
  
  // Admin has access to everything
  if (userRole === 'admin') {
    return;
  }

  // Check if current path matches allowed routes for user role
  const hasAccess = allowedRoutes.some((route: string) => 
    event.path.startsWith(route)
  );

  if (!hasAccess) {
    throw createError({
      statusCode: 403,
      message: 'Insufficient permissions'
    });
  }
}); 