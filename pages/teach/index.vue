<template>
  <div class="space-y-8">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-text-primary">Staff Dashboard</h1>
      <div class="text-text-secondary">
        Welcome back, {{ authStore.user?.firstName }}
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-dark-secondary p-4 rounded-lg border border-dark-border">
        <h3 class="text-text-secondary text-sm">Active Courses</h3>
        <p class="text-2xl font-bold text-text-primary">{{ courses.length }}</p>
      </div>
      <div class="bg-dark-secondary p-4 rounded-lg border border-dark-border">
        <h3 class="text-text-secondary text-sm">Pending Assessments</h3>
        <p class="text-2xl font-bold text-text-primary">{{ pendingAssessments.length }}</p>
      </div>
      <div class="bg-dark-secondary p-4 rounded-lg border border-dark-border">
        <h3 class="text-text-secondary text-sm">Active Notices</h3>
        <p class="text-2xl font-bold text-text-primary">{{ activeNotices.length }}</p>
      </div>
      <div class="bg-dark-secondary p-4 rounded-lg border border-dark-border">
        <h3 class="text-text-secondary text-sm">Today's Classes</h3>
        <p class="text-2xl font-bold text-text-primary">{{ todayClasses.length }}</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Courses Section -->
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold text-text-primary">Your Courses</h2>
          <div class="flex gap-2">
            <NuxtLink to="/teach/courses" class="text-orange-500 hover:text-orange-400">
              View All
            </NuxtLink>
            <NuxtLink to="/teach/courses/new" class="btn-primary">
              New Course
            </NuxtLink>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-4">
          <div v-for="course in recentCourses" :key="course.id" 
               class="bg-dark-secondary p-4 rounded-lg border border-dark-border hover:border-orange-500 transition-colors">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-semibold text-text-primary">{{ course.title }}</h3>
                <p class="text-text-secondary text-sm mt-1">{{ course.description }}</p>
              </div>
              <span class="text-text-secondary text-sm">{{ course.studentCount }} students</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Notices Section -->
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold text-text-primary">Recent Notices</h2>
          <div class="flex gap-2">
            <NuxtLink to="/teach/notices" class="text-orange-500 hover:text-orange-400">
              View All
            </NuxtLink>
            <NuxtLink to="/teach/notices/new" class="btn-primary">
              New Notice
            </NuxtLink>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-4">
          <div v-for="notice in recentNotices" :key="notice.id"
               class="bg-dark-secondary p-4 rounded-lg border border-dark-border">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-semibold text-text-primary">{{ notice.title }}</h3>
                <p class="text-text-secondary text-sm mt-1">{{ notice.content }}</p>
              </div>
              <span :class="[
                'px-2 py-1 rounded text-xs',
                notice.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                notice.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-green-500/20 text-green-400'
              ]">
                {{ notice.priority }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Upcoming Assessments -->
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold text-text-primary">Upcoming Assessments</h2>
          <div class="flex gap-2">
            <NuxtLink to="/teach/assessments" class="text-orange-500 hover:text-orange-400">
              View All
            </NuxtLink>
            <NuxtLink to="/teach/assessments/new" class="btn-primary">
              New Assessment
            </NuxtLink>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-4">
          <div v-for="assessment in upcomingAssessments" :key="assessment.id"
               class="bg-dark-secondary p-4 rounded-lg border border-dark-border">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-semibold text-text-primary">{{ assessment.title }}</h3>
                <p class="text-text-secondary text-sm mt-1">Due: {{ formatDate(assessment.dueDate) }}</p>
              </div>
              <span class="text-text-secondary text-sm">{{ assessment.submissionCount }} submissions</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Today's Classes -->
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold text-text-primary">Today's Classes</h2>
          <NuxtLink to="/teach/attendance" class="text-orange-500 hover:text-orange-400">
            View Attendance
          </NuxtLink>
        </div>
        <div class="grid grid-cols-1 gap-4">
          <div v-for="classItem in todayClasses" :key="classItem.id"
               class="bg-dark-secondary p-4 rounded-lg border border-dark-border">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-semibold text-text-primary">{{ classItem.courseTitle }}</h3>
                <p class="text-text-secondary text-sm mt-1">{{ classItem.time }}</p>
              </div>
              <div class="text-right">
                <span class="text-text-secondary text-sm block">{{ classItem.room }}</span>
                <span class="text-text-secondary text-sm">{{ classItem.attendanceCount }} students</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
import { ref, onMounted } from 'vue';
import type { Course, Notice, Assessment, Schedule } from '~/types/dashboard';

const authStore = useAuthStore();

// Mock data - replace with actual API calls
const courses = ref<Course[]>([]);
const pendingAssessments = ref<Assessment[]>([]);
const activeNotices = ref<Notice[]>([]);
const todayClasses = ref<Schedule[]>([]);
const recentCourses = ref<Course[]>([]);
const recentNotices = ref<Notice[]>([]);
const upcomingAssessments = ref<Assessment[]>([]);

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

onMounted(async () => {
  // TODO: Replace with actual API calls
  // const response = await $fetch<DashboardData>('/api/teach/dashboard');
  // courses.value = response.courses;
  // pendingAssessments.value = response.pendingAssessments;
  // activeNotices.value = response.activeNotices;
  // todayClasses.value = response.todayClasses;
  // recentCourses.value = response.recentCourses;
  // recentNotices.value = response.recentNotices;
  // upcomingAssessments.value = response.upcomingAssessments;
});
</script> 