export default defineNuxtRouteMiddleware((to) => {
  // Skip auth for public routes and pages
  const publicRoutes = [
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/register-admin',
    '/',
    '/login',
    '/index'
  ];
  
  // Check if the current path is in public routes
  const isPublicRoute = publicRoutes.some(route => {
    return to.path === route || to.path.startsWith(route + '/');
  });

  if (isPublicRoute) {
    return;
  }

  // For API routes, let the server middleware handle it
  if (to.path.startsWith('/api/')) {
    return;
  }

  // Check for auth token in localStorage
  const token = localStorage.getItem('auth_token');
  if (!token) {
    return navigateTo('/login');
  }
}); 