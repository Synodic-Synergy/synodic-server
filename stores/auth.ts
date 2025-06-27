import { defineStore } from 'pinia';
import type { User } from '~/types/user';
import type { AuthResponse, AuthTokens } from '~/types/auth';

interface AuthState {
  user: Omit<User, 'password'> | null;
  tokens: AuthTokens | null;
  permissions: string[];
  initialized: boolean;
  loading: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    tokens: null,
    permissions: [],
    initialized: false,
    loading: false
  }),

  getters: {
    isAuthenticated: (state) => !!state.user && !!state.tokens,
    isAdmin: (state) => state.user?.role === 'admin',
    isStaff: (state) => state.user?.role === 'staff',
    isStudent: (state) => state.user?.role === 'student',
    hasPermission: (state) => (permission: string) => state.permissions.includes(permission),
    canAccess: (state) => (resource: string, action: string) => {
      const permission = `${resource}:${action}`;
      return state.permissions.includes(permission) || state.user?.role === 'admin';
    }
  },

  actions: {
    setAuth(auth: AuthResponse) {
      this.user = auth.user;
      this.tokens = auth.tokens;
      this.permissions = auth.permissions;
    },

    clearAuth() {
      this.user = null;
      this.tokens = null;
      this.permissions = [];
    },

    async login(credentials: { email: string; password: string; rememberMe?: boolean }) {
      this.loading = true;
      try {
        const response = await $fetch<AuthResponse>('/api/auth/login', {
          method: 'POST',
          body: credentials
        });
        
        this.setAuth(response);
        return response;
      } catch (error: any) {
        console.error('Login error:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      this.loading = true;
      try {
        await $fetch('/api/auth/logout', {
          method: 'POST'
        });
        this.clearAuth();
      } catch (error: any) {
        console.error('Logout error:', error);
        // Clear auth even if logout fails
        this.clearAuth();
      } finally {
        this.loading = false;
      }
    },

    async refresh() {
      if (!this.tokens?.refreshToken) {
        throw new Error('No refresh token available');
      }

      try {
        const response = await $fetch<AuthResponse>('/api/auth/refresh', {
          method: 'POST',
          body: { refreshToken: this.tokens.refreshToken }
        });
        
        this.setAuth(response);
        return response;
      } catch (error: any) {
        console.error('Refresh error:', error);
        this.clearAuth();
        throw error;
      }
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
        const response = await $fetch<AuthResponse>('/api/auth/me', {
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
    },

    // Permission checking methods
    canRead(resource: string): boolean {
      return this.hasPermission(`${resource}:read`) || this.isAdmin;
    },

    canWrite(resource: string): boolean {
      return this.hasPermission(`${resource}:write`) || this.isAdmin;
    },

    canDelete(resource: string): boolean {
      return this.hasPermission(`${resource}:delete`) || this.isAdmin;
    },

    canManage(resource: string): boolean {
      return this.hasPermission(`${resource}:manage`) || this.isAdmin;
    },

    // Role checking methods
    isRole(role: string): boolean {
      return this.user?.role === role;
    },

    hasAnyRole(roles: string[]): boolean {
      return roles.includes(this.user?.role || '');
    },

    // Token utilities
    getAccessToken(): string | null {
      return this.tokens?.accessToken || null;
    },

    isTokenExpired(): boolean {
      if (!this.tokens?.expiresAt) return true;
      return Date.now() > this.tokens.expiresAt;
    },

    // Session utilities
    async getSessionStats() {
      if (!this.user) return null;
      
      try {
        return await $fetch(`/api/auth/sessions/stats`, {
          method: 'GET'
        });
      } catch (error) {
        console.error('Failed to get session stats:', error);
        return null;
      }
    },

    async revokeAllSessions() {
      if (!this.user) return false;
      
      try {
        await $fetch('/api/auth/sessions/revoke-all', {
          method: 'POST'
        });
        return true;
      } catch (error) {
        console.error('Failed to revoke sessions:', error);
        return false;
      }
    }
  }
}); 