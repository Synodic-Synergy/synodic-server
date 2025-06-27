import { defineStore } from 'pinia';
import type { Attendance, AttendanceRecord } from '~/types/attendance';

interface AttendanceState {
  attendanceRecords: Attendance[];
  loading: boolean;
  error: string | null;
  currentRecord: Attendance | null;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const useAttendanceStore = defineStore('attendance', {
  state: (): AttendanceState => ({
    attendanceRecords: [],
    loading: false,
    error: null,
    currentRecord: null
  }),

  getters: {
    attendanceByCourse: (state) => (courseId: string) => 
      state.attendanceRecords.filter(record => record.courseId === courseId),
    attendanceByDate: (state) => (date: Date) => 
      state.attendanceRecords.filter(record => 
        record.date.toDateString() === date.toDateString()
      ),
    recentAttendance: (state) => {
      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return state.attendanceRecords.filter(record => record.date >= oneWeekAgo);
    }
  },

  actions: {
    async fetchAttendance() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await $fetch<ApiResponse<Attendance[]>>('/api/attendance');
        if (response.success) {
          this.attendanceRecords = response.data;
        } else {
          throw new Error('Failed to fetch attendance');
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch attendance';
        console.error('Error fetching attendance:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchTeachAttendance() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await $fetch<ApiResponse<Attendance[]>>('/api/teach/attendance');
        if (response.success) {
          this.attendanceRecords = response.data;
        } else {
          throw new Error('Failed to fetch attendance');
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch attendance';
        console.error('Error fetching teach attendance:', error);
      } finally {
        this.loading = false;
      }
    },

    async createAttendance(attendanceData: Partial<Attendance>) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await $fetch<ApiResponse<Attendance>>('/api/teach/attendance', {
          method: 'POST',
          body: attendanceData
        });
        
        if (response.success) {
          this.attendanceRecords.push(response.data);
          return response.data;
        } else {
          throw new Error('Failed to create attendance record');
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to create attendance record';
        console.error('Error creating attendance record:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateAttendance(id: string, attendanceData: Partial<Attendance>) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await $fetch<ApiResponse<Attendance>>(`/api/teach/attendance/${id}`, {
          method: 'PUT',
          body: attendanceData
        });
        
        if (response.success) {
          const index = this.attendanceRecords.findIndex(record => record.id === id);
          if (index !== -1) {
            this.attendanceRecords[index] = response.data;
          }
          return response.data;
        } else {
          throw new Error('Failed to update attendance record');
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to update attendance record';
        console.error('Error updating attendance record:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteAttendance(id: string) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await $fetch<ApiResponse<void>>(`/api/teach/attendance/${id}`, {
          method: 'DELETE'
        });
        
        if (response.success) {
          this.attendanceRecords = this.attendanceRecords.filter(record => record.id !== id);
        } else {
          throw new Error('Failed to delete attendance record');
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to delete attendance record';
        console.error('Error deleting attendance record:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    setCurrentRecord(record: Attendance | null) {
      this.currentRecord = record;
    },

    clearError() {
      this.error = null;
    }
  }
}); 