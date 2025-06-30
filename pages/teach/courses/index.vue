<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
    </div>

    <div class="relative z-10 container mx-auto px-4 py-8">
      <!-- Header Section -->
      <MotionCard 
        class="mb-8 bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-xl border border-gray-600/30"
        :initial="{ opacity: 0, y: -20 }"
        :enter="{ opacity: 1, y: 0 }"
        :transition="{ duration: 600 }"
      >
        <div class="p-8">
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400 bg-clip-text text-transparent mb-2">
                My Courses
              </h1>
              <p class="text-gray-300 text-lg">
                Manage your teaching courses and student progress
              </p>
            </div>
            <button
              @click="$router.push('/teach/courses/new')"
              class="flex items-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Course
            </button>
          </div>
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
        <div class="inline-flex items-center px-6 py-3 font-semibold text-lg shadow-lg rounded-xl text-white bg-gradient-to-r from-purple-500 to-pink-500">
          <svg class="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading your courses...
        </div>
      </MotionCard>

      <!-- Empty State -->
      <MotionCard 
        v-else-if="courseStore.activeCourses.length === 0" 
        class="text-center py-16 bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-xl border border-gray-600/30"
        :initial="{ opacity: 0, scale: 0.9 }"
        :enter="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 500 }"
      >
        <div class="mb-6">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
            <svg class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-2">No courses yet</h3>
          <p class="text-gray-300 text-lg max-w-md mx-auto">
            Start by creating your first course to begin teaching
          </p>
        </div>
        <button
          @click="$router.push('/teach/courses/new')"
          class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
        >
          Create First Course
        </button>
      </MotionCard>

      <!-- Courses List -->
      <div v-else class="space-y-6">
        <MotionCard 
          v-for="(course, index) in courseStore.activeCourses" 
          :key="course.id"
          class="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-xl border border-gray-600/30 hover:border-purple-500/50 transition-all duration-300 group"
          :initial="{ opacity: 0, y: 50, scale: 0.9 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          :transition="{ duration: 600, delay: index * 100 }"
          :hover="{ y: -5, scale: 1.01 }"
        >
          <div class="p-6">
            <div class="flex justify-between items-start">
              <div class="flex items-center flex-1">
                <!-- Course Icon -->
                <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                
                <!-- Course Info -->
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300 mb-2">
                    {{ course.title }}
                  </h3>
                  <p class="text-gray-300 text-sm leading-relaxed mb-3">
                    {{ course.description }}
                  </p>
                  
                  <!-- Course Stats -->
                  <div class="flex items-center space-x-6">
                    <div class="flex items-center space-x-2">
                      <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span class="text-gray-300 text-sm">{{ course.studentCount }} students</span>
                    </div>
                    <div class="flex items-center space-x-2">
                      <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span class="text-gray-300 text-sm">Active</span>
                    </div>
                    <div class="flex items-center space-x-2">
                      <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span class="text-gray-300 text-sm">Published</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Action Buttons with navigation -->
              <div class="flex flex-col gap-2 ml-4">
                <button
                  @click="$router.push(`/teach/courses/${course.id}`)"
                  class="px-6 py-2 rounded-xl font-semibold text-base border-2 border-pink-400 bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-200"
                >
                  Edit Course
                </button>
                <button
                  @click="$router.push(`/teach/courses/${course.id}/students`)"
                  class="px-6 py-2 rounded-xl font-semibold text-base border-2 border-gray-600 bg-gradient-to-r from-gray-700 to-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
                >
                  View Students
                </button>
              </div>
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

definePageMeta({ layout: 'teach' });

const courseStore = useCourseStore();

onMounted(() => {
  courseStore.fetchCourses();
});
</script> 