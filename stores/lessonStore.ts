import { defineStore } from 'pinia';
import type { Lesson, LessonProgress } from '~/types/lesson';

interface LessonState {
  lessons: Lesson[];
  currentLesson: Lesson | null;
  loading: boolean;
  error: string | null;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const useLessonStore = defineStore('lesson', {
  state: (): LessonState => ({
    lessons: [],
    currentLesson: null,
    loading: false,
    error: null
  }),

  getters: {
    publishedLessons: (state) => state.lessons.filter(lesson => lesson.status === 'published'),
    draftLessons: (state) => state.lessons.filter(lesson => lesson.status === 'draft'),
    lessonById: (state) => (id: string) => state.lessons.find(lesson => lesson.id === id),
    lessonsByCourse: (state) => (courseId: string) => state.lessons.filter(lesson => lesson.courseId === courseId)
  },

  actions: {
    async fetchLessons() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await $fetch<ApiResponse<Lesson[]>>('/api/lessons');
        if (response.success) {
          this.lessons = response.data;
        } else {
          throw new Error('Failed to fetch lessons');
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch lessons';
        console.error('Error fetching lessons:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchLesson(id: string) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await $fetch<ApiResponse<Lesson>>(`/api/lessons/${id}`);
        if (response.success) {
          this.currentLesson = response.data;
          return response.data;
        } else {
          throw new Error('Failed to fetch lesson');
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch lesson';
        console.error('Error fetching lesson:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async createLesson(lessonData: Partial<Lesson>) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await $fetch<ApiResponse<Lesson>>('/api/lessons', {
          method: 'POST',
          body: lessonData
        });
        
        if (response.success) {
          this.lessons.push(response.data);
          return response.data;
        } else {
          throw new Error('Failed to create lesson');
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to create lesson';
        console.error('Error creating lesson:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateLesson(id: string, lessonData: Partial<Lesson>) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await $fetch<ApiResponse<Lesson>>(`/api/lessons/${id}`, {
          method: 'PUT',
          body: lessonData
        });
        
        if (response.success) {
          const index = this.lessons.findIndex(lesson => lesson.id === id);
          if (index !== -1) {
            this.lessons[index] = response.data;
          }
          if (this.currentLesson?.id === id) {
            this.currentLesson = response.data;
          }
          return response.data;
        } else {
          throw new Error('Failed to update lesson');
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to update lesson';
        console.error('Error updating lesson:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteLesson(id: string) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await $fetch<ApiResponse<void>>(`/api/lessons/${id}`, {
          method: 'DELETE'
        });
        
        if (response.success) {
          this.lessons = this.lessons.filter(lesson => lesson.id !== id);
          if (this.currentLesson?.id === id) {
            this.currentLesson = null;
          }
        } else {
          throw new Error('Failed to delete lesson');
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to delete lesson';
        console.error('Error deleting lesson:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async markLessonComplete(lessonId: string, studentId: string) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await $fetch<ApiResponse<LessonProgress>>(`/api/lessons/${lessonId}/complete`, {
          method: 'POST',
          body: { studentId }
        });
        
        if (response.success) {
          return response.data;
        } else {
          throw new Error('Failed to mark lesson complete');
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to mark lesson complete';
        console.error('Error marking lesson complete:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    setCurrentLesson(lesson: Lesson | null) {
      this.currentLesson = lesson;
    },

    clearError() {
      this.error = null;
    }
  }
}); 