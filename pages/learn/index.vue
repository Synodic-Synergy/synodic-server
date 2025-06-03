<template>
  <div class="space-y-8">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-text-primary">Student Dashboard</h1>
      <div class="text-text-secondary">
        Welcome back, {{ authStore.user?.firstName }}
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-dark-secondary p-4 rounded-lg border border-dark-border">
        <h3 class="text-text-secondary text-sm">Active Courses</h3>
        <p class="text-2xl font-bold text-text-primary">{{ courses.length }}</p>
      </div>
      <div class="bg-dark-secondary p-4 rounded-lg border border-dark-border">
        <h3 class="text-text-secondary text-sm">Pending Assessments</h3>
        <p class="text-2xl font-bold text-text-primary">{{ pendingAssessments.length }}</p>
      </div>
      <div class="bg-dark-secondary p-4 rounded-lg border border-dark-border">
        <h3 class="text-text-secondary text-sm">New Notices</h3>
        <p class="text-2xl font-bold text-text-primary">{{ newNotices.length }}</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Courses Section -->
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold text-text-primary">Your Courses</h2>
          <NuxtLink to="/learn/courses" class="text-orange-500 hover:text-orange-400">
            View All
          </NuxtLink>
        </div>
        <div class="grid grid-cols-1 gap-4">
          <div v-for="course in recentCourses" :key="course.id" 
               class="bg-dark-secondary p-4 rounded-lg border border-dark-border hover:border-orange-500 transition-colors">
            <h3 class="font-semibold text-text-primary">{{ course.title }}</h3>
            <p class="text-text-secondary text-sm mt-1">{{ course.description }}</p>
          </div>
        </div>
      </div>

      <!-- Notices Section -->
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold text-text-primary">Recent Notices</h2>
          <NuxtLink to="/learn/notices" class="text-orange-500 hover:text-orange-400">
            View All
          </NuxtLink>
        </div>
        <div class="grid grid-cols-1 gap-4">
          <div v-for="notice in recentNotices" :key="notice.id"
               class="bg-dark-secondary p-4 rounded-lg border border-dark-border">
            <div class="flex justify-between items-start">
              <h3 class="font-semibold text-text-primary">{{ notice.title }}</h3>
              <span :class="[
                'px-2 py-1 rounded text-xs',
                notice.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                notice.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-green-500/20 text-green-400'
              ]">
                {{ notice.priority }}
              </span>
            </div>
            <p class="text-text-secondary text-sm mt-1">{{ notice.content }}</p>
          </div>
        </div>
      </div>

      <!-- Upcoming Assessments -->
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold text-text-primary">Upcoming Assessments</h2>
          <NuxtLink to="/learn/assessments" class="text-orange-500 hover:text-orange-400">
            View All
          </NuxtLink>
        </div>
        <div class="grid grid-cols-1 gap-4">
          <div v-for="assessment in upcomingAssessments" :key="assessment.id"
               class="bg-dark-secondary p-4 rounded-lg border border-dark-border">
            <h3 class="font-semibold text-text-primary">{{ assessment.title }}</h3>
            <p class="text-text-secondary text-sm mt-1">Due: {{ formatDate(assessment.dueDate) }}</p>
          </div>
        </div>
      </div>

      <!-- Today's Schedule -->
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold text-text-primary">Today's Schedule</h2>
          <NuxtLink to="/learn/timetable" class="text-orange-500 hover:text-orange-400">
            View Full Schedule
          </NuxtLink>
        </div>
        <div class="grid grid-cols-1 gap-4">
          <div v-for="schedule in todaySchedule" :key="schedule.id"
               class="bg-dark-secondary p-4 rounded-lg border border-dark-border">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-semibold text-text-primary">{{ schedule.courseTitle }}</h3>
                <p class="text-text-secondary text-sm mt-1">{{ schedule.time }}</p>
              </div>
              <span class="text-text-secondary text-sm">{{ schedule.room }}</span>
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
const newNotices = ref<Notice[]>([]);
const recentCourses = ref<Course[]>([]);
const recentNotices = ref<Notice[]>([]);
const upcomingAssessments = ref<Assessment[]>([]);
const todaySchedule = ref<Schedule[]>([]);

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

onMounted(async () => {
  // TODO: Replace with actual API calls
  // const response = await $fetch<DashboardData>('/api/learn/dashboard');
  // courses.value = response.courses;
  // pendingAssessments.value = response.pendingAssessments;
  // newNotices.value = response.newNotices;
  // recentCourses.value = response.recentCourses;
  // recentNotices.value = response.recentNotices;
  // upcomingAssessments.value = response.upcomingAssessments;
  // todaySchedule.value = response.todaySchedule;
});
</script> 