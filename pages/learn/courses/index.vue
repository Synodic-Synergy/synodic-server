<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
    </div>

    <div class="relative z-10 container mx-auto px-4 py-8">
      <!-- Header Section -->
      <MotionCard 
        class="mb-8 bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-xl border border-gray-600/30"
        :initial="{ opacity: 0, y: -20 }"
        :enter="{ opacity: 1, y: 0 }"
        :transition="{ duration: 600 }"
      >
        <div class="p-8 text-center">
          <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
            My Learning Journey
          </h1>
          <p class="text-gray-300 text-lg max-w-2xl mx-auto">
            Explore your enrolled courses and track your academic progress
          </p>
        </div>
      </MotionCard>

      <!-- Loading State -->
      <MotionCard 
        v-if="courseStore.loading" 
        class="text-center py-16 bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-xl border border-gray-600/30"
        :initial="{ opacity: 0, scale: 0.9 }"
        :enter="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 500 }"
      >
        <div class="inline-flex items-center px-6 py-3 font-semibold text-lg shadow-lg rounded-xl text-white bg-gradient-to-r from-orange-500 to-red-500">
          <svg class="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading your courses...
        </div>
      </MotionCard>

      <!-- Empty State -->
      <MotionCard 
        v-else-if="courseStore.myCourses.length === 0" 
        class="text-center py-16 bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-xl border border-gray-600/30"
        :initial="{ opacity: 0, scale: 0.9 }"
        :enter="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 500 }"
      >
        <div class="mb-6">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-4">
            <svg class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-2">No courses enrolled yet</h3>
          <p class="text-gray-300 text-lg max-w-md mx-auto">
            Start your learning journey by enrolling in your first course
          </p>
        </div>
        <MotionButton 
          class="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-xl font-semibold text-lg"
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
          :transition="{ duration: 500, delay: 200 }"
        >
          Browse Available Courses
        </MotionButton>
      </MotionCard>

      <!-- Courses Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MotionCard 
          v-for="(course, index) in courseStore.myCourses" 
          :key="course.id" 
          class="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-xl border border-gray-600/30 hover:border-orange-500/50 transition-all duration-300 group"
          :initial="{ opacity: 0, y: 50, scale: 0.9 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          :transition="{ duration: 600, delay: index * 100 }"
          :hover="{ y: -5, scale: 1.02 }"
        >
          <div class="p-6">
            <!-- Course Header -->
            <div class="mb-4">
              <div class="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">
                {{ course.title }}
              </h3>
              <p class="text-gray-300 text-sm leading-relaxed">
                {{ course.description }}
              </p>
            </div>

            <!-- Progress Bar -->
            <div class="mb-4">
              <div class="flex justify-between items-center mb-2">
                <span class="text-gray-300 text-sm font-medium">Progress</span>
                <span class="text-orange-400 text-sm font-bold">0%</span>
              </div>
              <div class="w-full bg-gray-700 rounded-full h-2">
                <div class="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500" style="width: 0%"></div>
              </div>
            </div>

            <!-- Course Actions -->
            <div class="flex justify-between items-center">
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span class="text-green-400 text-sm font-medium">Active</span>
              </div>
              <MotionButton 
                :to="`/learn/courses/${course.id}`"
                class="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300"
                :hover="{ scale: 1.05 }"
                :tap="{ scale: 0.95 }"
              >
                View Course
              </MotionButton>
            </div>
          </div>
        </MotionCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useCourseStore } from '~/stores/courseStore';

definePageMeta({ layout: 'learn' });

const courseStore = useCourseStore();

onMounted(() => {
  courseStore.fetchCourses();
});
</script> 