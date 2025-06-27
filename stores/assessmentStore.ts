import { defineStore } from 'pinia';
import type { Assessment } from '~/types/assessment';

interface AssessmentState {
  assessments: Assessment[];
  loading: boolean;
  error: string | null;
  currentAssessment: Assessment | null;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const useAssessmentStore = defineStore('assessment', {
  state: (): AssessmentState => ({
    assessments: [],
    loading: false,
    error: null,
    currentAssessment: null
  }),

  getters: {
    publishedAssessments: (state) => state.assessments.filter(assessment => assessment.status === 'published'),
    draftAssessments: (state) => state.assessments.filter(assessment => assessment.status === 'draft'),
    upcomingAssessments: (state) => {
      const now = new Date();
      return state.assessments.filter(assessment => 
        assessment.status === 'published' && new Date(assessment.dueDate) > now
      );
    },
    overdueAssessments: (state) => {
      const now = new Date();
      return state.assessments.filter(assessment => 
        assessment.status === 'published' && new Date(assessment.dueDate) < now
      );
    },
    assessmentById: (state) => (id: string) => state.assessments.find(assessment => assessment.id === id),
    assessmentsByCourse: (state) => (courseId: string) => 
      state.assessments.filter(assessment => assessment.courseId === courseId)
  },

  actions: {
    async fetchAssessments() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await $fetch<ApiResponse<Assessment[]>>('/api/assessments');
        if (response.success) {
          this.assessments = response.data;
        } else {
          throw new Error('Failed to fetch assessments');
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch assessments';
        console.error('Error fetching assessments:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchTeachAssessments() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await $fetch<ApiResponse<Assessment[]>>('/api/teach/assessments');
        if (response.success) {
          this.assessments = response.data;
        } else {
          throw new Error('Failed to fetch assessments');
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch assessments';
        console.error('Error fetching teach assessments:', error);
      } finally {
        this.loading = false;
      }
    },

    async createAssessment(assessmentData: Partial<Assessment>) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await $fetch<ApiResponse<Assessment>>('/api/teach/assessments', {
          method: 'POST',
          body: assessmentData
        });
        
        if (response.success) {
          this.assessments.push(response.data);
          return response.data;
        } else {
          throw new Error('Failed to create assessment');
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to create assessment';
        console.error('Error creating assessment:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateAssessment(id: string, assessmentData: Partial<Assessment>) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await $fetch<ApiResponse<Assessment>>(`/api/teach/assessments/${id}`, {
          method: 'PUT',
          body: assessmentData
        });
        
        if (response.success) {
          const index = this.assessments.findIndex(assessment => assessment.id === id);
          if (index !== -1) {
            this.assessments[index] = response.data;
          }
          return response.data;
        } else {
          throw new Error('Failed to update assessment');
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to update assessment';
        console.error('Error updating assessment:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteAssessment(id: string) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await $fetch<ApiResponse<void>>(`/api/teach/assessments/${id}`, {
          method: 'DELETE'
        });
        
        if (response.success) {
          this.assessments = this.assessments.filter(assessment => assessment.id !== id);
        } else {
          throw new Error('Failed to delete assessment');
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to delete assessment';
        console.error('Error deleting assessment:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async publishAssessment(id: string) {
      return this.updateAssessment(id, { status: 'published' });
    },

    async unpublishAssessment(id: string) {
      return this.updateAssessment(id, { status: 'draft' });
    },

    setCurrentAssessment(assessment: Assessment | null) {
      this.currentAssessment = assessment;
    },

    clearError() {
      this.error = null;
    }
  }
}); 