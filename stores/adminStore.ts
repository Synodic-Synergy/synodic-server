import { defineStore } from 'pinia';
import type { User } from '~/types/user';

interface AdminState {
  users: User[];
  loading: boolean;
  error: string | null;
  systemStats: {
    totalUsers: number;
    activeCourses: number;
    pendingReviews: number;
    systemHealth: number;
  };
  recentUsers: User[];
  systemActivity: Array<{
    id: string;
    title: string;
    description: string;
    timestamp: Date;
  }>;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface SystemStats {
  totalUsers: number;
  activeCourses: number;
  pendingReviews: number;
  systemHealth: number;
}

export const useAdminStore = defineStore('admin', {
  state: (): AdminState => ({
    users: [],
    loading: false,
    error: null,
    systemStats: {
      totalUsers: 0,
      activeCourses: 0,
      pendingReviews: 0,
      systemHealth: 0
    },
    recentUsers: [],
    systemActivity: []
  }),

  getters: {
    activeUsers: (state) => state.users.filter(user => (user.status || 'active') === 'active'),
    inactiveUsers: (state) => state.users.filter(user => (user.status || 'active') === 'inactive'),
    usersByRole: (state) => (role: string) => state.users.filter(user => user.role === role),
    userById: (state) => (id: string) => state.users.find(user => user.id === id)
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

    async createUser(userData: Partial<User> & { password: string }) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await $fetch<ApiResponse<User>>('/api/admin/users', {
          method: 'POST',
          body: userData
        });
        
        if (response.success) {
          this.users.push(response.data);
          return response.data;
        } else {
          throw new Error('Failed to create user');
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to create user';
        console.error('Error creating user:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateUser(id: string, userData: Partial<User>) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await $fetch<ApiResponse<User>>(`/api/admin/users/${id}`, {
          method: 'PUT',
          body: userData
        });
        
        if (response.success) {
          const index = this.users.findIndex(user => user.id === id);
          if (index !== -1) {
            this.users[index] = { ...this.users[index], ...response.data };
          }
          return response.data;
        } else {
          throw new Error('Failed to update user');
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to update user';
        console.error('Error updating user:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteUser(id: string) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await $fetch<ApiResponse<void>>(`/api/admin/users/${id}`, {
          method: 'DELETE'
        });
        
        if (response.success) {
          this.users = this.users.filter(user => user.id !== id);
        } else {
          throw new Error('Failed to delete user');
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to delete user';
        console.error('Error deleting user:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchSystemStats() {
      try {
        const response = await $fetch<ApiResponse<SystemStats>>('/api/admin/stats');
        if (response.success) {
          this.systemStats = response.data;
        } else {
          throw new Error('Failed to fetch system stats');
        }
      } catch (error: any) {
        console.error('Error fetching system stats:', error);
        // Use fallback stats
        this.systemStats = {
          totalUsers: this.users.length,
          activeCourses: 0,
          pendingReviews: 0,
          systemHealth: 95
        };
      }
    },

    async fetchRecentUsers() {
      try {
        const response = await $fetch<ApiResponse<User[]>>('/api/admin/users/recent');
        if (response.success) {
          this.recentUsers = response.data;
        } else {
          // Fallback to last 5 users
          this.recentUsers = this.users.slice(-5);
        }
      } catch (error: any) {
        console.error('Error fetching recent users:', error);
        // Fallback to last 5 users
        this.recentUsers = this.users.slice(-5);
      }
    },

    async fetchSystemActivity() {
      try {
        const response = await $fetch<ApiResponse<Array<{
          id: string;
          title: string;
          description: string;
          timestamp: Date;
        }>>>('/api/admin/activity');
        if (response.success) {
          this.systemActivity = response.data;
        } else {
          // Generate mock activity based on recent users
          this.systemActivity = this.recentUsers.slice(0, 3).map((user, index) => ({
            id: `activity-${index}`,
            title: 'New user registered',
            description: `${user.firstName} ${user.lastName} created a new ${user.role} account`,
            timestamp: new Date(Date.now() - (index + 1) * 60 * 60 * 1000)
          }));
        }
      } catch (error: any) {
        console.error('Error fetching system activity:', error);
        // Generate mock activity
        this.systemActivity = this.recentUsers.slice(0, 3).map((user, index) => ({
          id: `activity-${index}`,
          title: 'New user registered',
          description: `${user.firstName} ${user.lastName} created a new ${user.role} account`,
          timestamp: new Date(Date.now() - (index + 1) * 60 * 60 * 1000)
        }));
      }
    },

    clearError() {
      this.error = null;
    }
  }
}); 