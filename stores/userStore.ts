import { defineStore } from 'pinia';
import type { User } from '~/types/user';

interface UserState {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    users: [],
    currentUser: null,
    loading: false,
    error: null
  }),

  getters: {
    userById: (state) => (id: string) => state.users.find(user => user.id === id),
    usersByRole: (state) => (role: User['role']) => state.users.filter(user => user.role === role),
    students: (state) => state.users.filter(user => user.role === 'student'),
    staff: (state) => state.users.filter(user => user.role === 'staff'),
    admins: (state) => state.users.filter(user => user.role === 'admin')
  },

  actions: {
    async fetchUsers() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await $fetch<ApiResponse<User[]>>('/api/admin/users');
        if (response.success) {
          this.users = response.data;
        } else {
          throw new Error('Failed to fetch users');
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch users';
        console.error('Error fetching users:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchUser(id: string) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await $fetch<ApiResponse<User>>(`/api/admin/users/${id}`);
        if (response.success) {
          this.currentUser = response.data;
          return response.data;
        } else {
          throw new Error('Failed to fetch user');
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch user';
        console.error('Error fetching user:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    setCurrentUser(user: User | null) {
      this.currentUser = user;
    },

    clearError() {
      this.error = null;
    }
  }
}); 