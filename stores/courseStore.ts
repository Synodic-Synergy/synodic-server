import { defineStore } from 'pinia';
import type { Course } from '~/types/course';

interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
  currentCourse: Course | null;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const useCourseStore = defineStore('course', {
  state: (): CourseState => ({
    courses: [],
    loading: false,
    error: null,
    currentCourse: null
  }),

  getters: {
    activeCourses: (state) => state.courses.filter(course => course.status === 'active'),
    draftCourses: (state) => state.courses.filter(course => course.status === 'draft'),
    myCourses: (state) => state.courses.filter(course => course.status === 'active'),
    courseById: (state) => (id: string) => state.courses.find(course => course.id === id)
  },

  actions: {
    async fetchCourses() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await $fetch<ApiResponse<Course[]>>('/api/courses');
        if (response.success) {
          this.courses = response.data;
        } else {
          throw new Error('Failed to fetch courses');
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch courses';
        console.error('Error fetching courses:', error);
      } finally {
        this.loading = false;
      }
    },

    async createCourse(courseData: Partial<Course>) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await $fetch<ApiResponse<Course>>('/api/courses', {
          method: 'POST',
          body: courseData
        });
        
        if (response.success) {
          this.courses.push(response.data);
          return response.data;
        } else {
          throw new Error('Failed to create course');
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to create course';
        console.error('Error creating course:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateCourse(id: string, courseData: Partial<Course>) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await $fetch<ApiResponse<Course>>(`/api/courses/${id}`, {
          method: 'PUT',
          body: courseData
        });
        
        if (response.success) {
          const index = this.courses.findIndex(course => course.id === id);
          if (index !== -1) {
            this.courses[index] = response.data;
          }
          return response.data;
        } else {
          throw new Error('Failed to update course');
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to update course';
        console.error('Error updating course:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteCourse(id: string) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await $fetch<ApiResponse<void>>(`/api/courses/${id}`, {
          method: 'DELETE'
        });
        
        if (response.success) {
          this.courses = this.courses.filter(course => course.id !== id);
        } else {
          throw new Error('Failed to delete course');
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to delete course';
        console.error('Error deleting course:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    setCurrentCourse(course: Course | null) {
      this.currentCourse = course;
    },

    clearError() {
      this.error = null;
    },

    async fetchCourse(id: string) {
      this.loading = true;
      this.error = null;
      try {
        const response = await $fetch<ApiResponse<Course>>(`/api/courses/${id}`);
        if (response.success) {
          this.currentCourse = response.data;
          return response.data;
        } else {
          throw new Error('Failed to fetch course');
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch course';
        console.error('Error fetching course:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    }
  }
}); 