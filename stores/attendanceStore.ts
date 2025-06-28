import { defineStore } from 'pinia';
import type { AttendanceRecord, AttendanceSession, AttendanceStats } from '~/types/attendance';

interface AttendanceState {
  attendanceRecords: AttendanceRecord[];
  attendanceSessions: AttendanceSession[];
  currentSession: AttendanceSession | null;
  loading: boolean;
  error: string | null;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const useAttendanceStore = defineStore('attendance', {
  state: (): AttendanceState => ({
    attendanceRecords: [],
    attendanceSessions: [],
    currentSession: null,
    loading: false,
    error: null
  }),

  getters: {
    recordsByCourse: (state) => (courseId: string) => 
      state.attendanceRecords.filter(record => record.courseId === courseId),
    recordsByStudent: (state) => (studentId: string) => 
      state.attendanceRecords.filter(record => record.studentId === studentId),
    sessionsByCourse: (state) => (courseId: string) => 
      state.attendanceSessions.filter(session => session.courseId === courseId),
    activeSessions: (state) => 
      state.attendanceSessions.filter(session => session.isActive)
  },

  actions: {
    async fetchAttendanceRecords() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await $fetch<ApiResponse<AttendanceRecord[]>>('/api/attendance/records');
        if (response.success) {
          this.attendanceRecords = response.data;
        } else {
          throw new Error('Failed to fetch attendance records');
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch attendance records';
        console.error('Error fetching attendance records:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchAttendanceSessions() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await $fetch<ApiResponse<AttendanceSession[]>>('/api/attendance/sessions');
        if (response.success) {
          this.attendanceSessions = response.data;
        } else {
          throw new Error('Failed to fetch attendance sessions');
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch attendance sessions';
        console.error('Error fetching attendance sessions:', error);
      } finally {
        this.loading = false;
      }
    },

    async createAttendanceSession(sessionData: Partial<AttendanceSession>) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await $fetch<ApiResponse<AttendanceSession>>('/api/attendance/sessions', {
          method: 'POST',
          body: sessionData
        });
        
        if (response.success) {
          this.attendanceSessions.push(response.data);
          this.currentSession = response.data;
          return response.data;
        } else {
          throw new Error('Failed to create attendance session');
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to create attendance session';
        console.error('Error creating attendance session:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async markAttendance(recordData: Partial<AttendanceRecord>) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await $fetch<ApiResponse<AttendanceRecord>>('/api/attendance/records', {
          method: 'POST',
          body: recordData
        });
        
        if (response.success) {
          this.attendanceRecords.push(response.data);
          return response.data;
        } else {
          throw new Error('Failed to mark attendance');
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to mark attendance';
        console.error('Error marking attendance:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateAttendanceRecord(id: string, recordData: Partial<AttendanceRecord>) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await $fetch<ApiResponse<AttendanceRecord>>(`/api/attendance/records/${id}`, {
          method: 'PUT',
          body: recordData
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

    async endAttendanceSession(sessionId: string) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await $fetch<ApiResponse<AttendanceSession>>(`/api/attendance/sessions/${sessionId}/end`, {
          method: 'PUT'
        });
        
        if (response.success) {
          const index = this.attendanceSessions.findIndex(session => session.id === sessionId);
          if (index !== -1) {
            this.attendanceSessions[index] = response.data;
          }
          if (this.currentSession?.id === sessionId) {
            this.currentSession = response.data;
          }
          return response.data;
        } else {
          throw new Error('Failed to end attendance session');
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to end attendance session';
        console.error('Error ending attendance session:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async getAttendanceStats(courseId: string, studentId: string) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await $fetch<ApiResponse<AttendanceStats>>(`/api/attendance/stats/${courseId}/${studentId}`);
        if (response.success) {
          return response.data;
        } else {
          throw new Error('Failed to fetch attendance stats');
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch attendance stats';
        console.error('Error fetching attendance stats:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    setCurrentSession(session: AttendanceSession | null) {
      this.currentSession = session;
    },

    clearError() {
      this.error = null;
    }
  }
}); 