export default defineNuxtRouteMiddleware((to) => {
  // Only run on client side
  if (!process.client) return;

  const authStore = useAuthStore();
  
  // Wait for auth store to initialize if it hasn't yet
  if (!authStore.initialized) {
    // Don't block navigation during initialization
    return;
  }

  // Check if user is authenticated
  if (!authStore.isAuthenticated) {
    // Only redirect if trying to access protected routes
    if (to.path.startsWith('/learn') || to.path.startsWith('/teach') || to.path.startsWith('/admin')) {
      return navigateTo({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    }
    return;
  }

  // Check role-based access for specific routes
  const route = to.path;
  
  // Learn pages - only accessible by students and staff
  if (route.startsWith('/learn')) {
    if (!authStore.isStudent && !authStore.isStaff && !authStore.isAdmin) {
      return navigateTo('/unauthorized');
    }
  }

  // Teach pages - only accessible by staff and admin
  if (route.startsWith('/teach')) {
    if (!authStore.isStaff && !authStore.isAdmin) {
      return navigateTo('/unauthorized');
    }
  }

  // Admin pages - only accessible by admin
  if (route.startsWith('/admin')) {
    if (!authStore.isAdmin) {
      return navigateTo('/unauthorized');
    }
  }
}); 