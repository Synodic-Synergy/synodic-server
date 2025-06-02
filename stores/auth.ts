import { defineStore } from 'pinia';
import type { User } from '~/types/user';

interface AuthState {
  user: Omit<User, 'password'> | null;
  token: string | null;
  refreshToken: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    refreshToken: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'admin',
    isStaff: (state) => state.user?.role === 'staff',
    isStudent: (state) => state.user?.role === 'student'
  },

  actions: {
    setAuth(auth: { user: Omit<User, 'password'>; token: string; refreshToken: string }) {
      this.user = auth.user;
      this.token = auth.token;
      this.refreshToken = auth.refreshToken;

      // Store in localStorage for persistence
      localStorage.setItem('auth', JSON.stringify(auth));
    },

    clearAuth() {
      this.user = null;
      this.token = null;
      this.refreshToken = null;
      localStorage.removeItem('auth');
    },

    initialize() {
      const stored = localStorage.getItem('auth');
      if (stored) {
        const auth = JSON.parse(stored);
        this.setAuth(auth);
      }
    }
  }
}); 