import { defineStore } from 'pinia';
import type { Notice } from '~/types/notice';

interface NoticeState {
  notices: Notice[];
  loading: boolean;
  error: string | null;
  currentNotice: Notice | null;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const useNoticeStore = defineStore('notice', {
  state: (): NoticeState => ({
    notices: [],
    loading: false,
    error: null,
    currentNotice: null
  }),

  getters: {
    activeNotices: (state) => state.notices.filter(notice => notice.isActive),
    pinnedNotices: (state) => state.notices.filter(notice => notice.isPinned),
    noticesByCategory: (state) => (category: string) => 
      state.notices.filter(notice => notice.category === category),
    noticesByPriority: (state) => (priority: string) => 
      state.notices.filter(notice => notice.priority === priority),
    urgentNotices: (state) => state.notices.filter(notice => notice.priority === 'urgent'),
    highPriorityNotices: (state) => state.notices.filter(notice => notice.priority === 'high')
  },

  actions: {
    async fetchNotices() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await $fetch<ApiResponse<Notice[]>>('/api/notices');
        if (response.success) {
          this.notices = response.data;
        } else {
          throw new Error('Failed to fetch notices');
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch notices';
        console.error('Error fetching notices:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchTeachNotices() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await $fetch<ApiResponse<Notice[]>>('/api/teach/notices');
        if (response.success) {
          this.notices = response.data;
        } else {
          throw new Error('Failed to fetch notices');
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch notices';
        console.error('Error fetching teach notices:', error);
      } finally {
        this.loading = false;
      }
    },

    async createNotice(noticeData: Partial<Notice>) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await $fetch<ApiResponse<Notice>>('/api/teach/notices', {
          method: 'POST',
          body: noticeData
        });
        
        if (response.success) {
          this.notices.push(response.data);
          return response.data;
        } else {
          throw new Error('Failed to create notice');
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to create notice';
        console.error('Error creating notice:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateNotice(id: string, noticeData: Partial<Notice>) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await $fetch<ApiResponse<Notice>>(`/api/teach/notices/${id}`, {
          method: 'PUT',
          body: noticeData
        });
        
        if (response.success) {
          const index = this.notices.findIndex(notice => notice.id === id);
          if (index !== -1) {
            this.notices[index] = response.data;
          }
          return response.data;
        } else {
          throw new Error('Failed to update notice');
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to update notice';
        console.error('Error updating notice:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteNotice(id: string) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await $fetch<ApiResponse<void>>(`/api/teach/notices/${id}`, {
          method: 'DELETE'
        });
        
        if (response.success) {
          this.notices = this.notices.filter(notice => notice.id !== id);
        } else {
          throw new Error('Failed to delete notice');
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to delete notice';
        console.error('Error deleting notice:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async togglePin(id: string) {
      const notice = this.notices.find(n => n.id === id);
      if (notice) {
        return this.updateNotice(id, { isPinned: !notice.isPinned });
      }
    },

    async toggleActive(id: string) {
      const notice = this.notices.find(n => n.id === id);
      if (notice) {
        return this.updateNotice(id, { isActive: !notice.isActive });
      }
    },

    setCurrentNotice(notice: Notice | null) {
      this.currentNotice = notice;
    },

    clearError() {
      this.error = null;
    }
  }
});