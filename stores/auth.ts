import { defineStore } from 'pinia';
import type { User } from '~/types/user';

interface AuthState {
  user: Omit<User, 'password'> | null;
  initialized: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    initialized: false
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    isAdmin: (state) => state.user?.role === 'admin',
    isStaff: (state) => state.user?.role === 'staff',
    isStudent: (state) => state.user?.role === 'student'
  },

  actions: {
    setAuth(auth: { user: Omit<User, 'password'> }) {
      this.user = auth.user;
    },

    clearAuth() {
      this.user = null;
    },

    async initialize() {
      if (this.initialized) {
        console.log('[STORE] Already initialized');
        return;
      }

      if (!process.client) {
        console.log('[STORE] Skipping initialization on server');
        return;
      }
      
      try {
        console.log('[STORE] Calling /api/auth/me...');
        const response = await $fetch('/api/auth/me', {
          onResponseError: (error) => {
            console.error('[STORE] API Error:', error.response?.status, error.response?._data);
          }
        });
        this.setAuth(response);
        console.log('[STORE] User set:', response.user);
      } catch (error: any) {
        console.error('[STORE] Error during initialization:', error.message);
        this.clearAuth();
      } finally {
        this.initialized = true;
        console.log('[STORE] Initialization complete');
      }
    }
  }
}); 