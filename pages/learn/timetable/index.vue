<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
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
          <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent mb-4">
            My Schedule
          </h1>
          <p class="text-gray-300 text-lg max-w-2xl mx-auto">
            View your class schedule and upcoming sessions
          </p>
        </div>
      </MotionCard>

      <!-- Loading State -->
      <MotionCard 
        v-if="attendanceStore.loading" 
        class="text-center py-16 bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-xl border border-gray-600/30"
        :initial="{ opacity: 0, scale: 0.9 }"
        :enter="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 500 }"
      >
        <div class="inline-flex items-center px-6 py-3 font-semibold text-lg shadow-lg rounded-xl text-white bg-gradient-to-r from-green-500 to-teal-500">
          <svg class="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading your schedule...
        </div>
      </MotionCard>

      <!-- Empty State -->
      <MotionCard 
        v-else-if="attendanceStore.attendanceRecords.length === 0" 
        class="text-center py-16 bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-xl border border-gray-600/30"
        :initial="{ opacity: 0, scale: 0.9 }"
        :enter="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 500 }"
      >
        <div class="mb-6">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mb-4">
            <svg class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-2">No schedule available</h3>
          <p class="text-gray-300 text-lg max-w-md mx-auto">
            Your timetable will appear here when available
          </p>
        </div>
        <MotionButton 
          class="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-8 py-3 rounded-xl font-semibold text-lg"
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
          :transition="{ duration: 500, delay: 200 }"
        >
          Check Later
        </MotionButton>
      </MotionCard>

      <!-- Timetable Content -->
      <MotionCard 
        v-else
        class="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-xl border border-gray-600/30"
        :initial="{ opacity: 0, y: 50, scale: 0.9 }"
        :enter="{ opacity: 1, y: 0, scale: 1 }"
        :transition="{ duration: 600 }"
      >
        <div class="p-6">
          <!-- Week Navigation -->
          <div class="flex justify-between items-center mb-6">
            <MotionButton 
              class="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white px-4 py-2 rounded-lg font-semibold text-sm"
              :hover="{ scale: 1.05 }"
              :tap="{ scale: 0.95 }"
            >
              ← Previous Week
            </MotionButton>
            <h2 class="text-xl font-bold text-white">This Week</h2>
            <MotionButton 
              class="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white px-4 py-2 rounded-lg font-semibold text-sm"
              :hover="{ scale: 1.05 }"
              :tap="{ scale: 0.95 }"
            >
              Next Week →
            </MotionButton>
          </div>

          <!-- Schedule Grid -->
          <div class="grid grid-cols-1 gap-4">
            <MotionCard 
              v-for="(schedule, index) in attendanceStore.attendanceRecords" 
              :key="schedule.id" 
              class="bg-gradient-to-br from-gray-700/50 to-gray-600/50 backdrop-blur-xl border border-gray-500/30 hover:border-green-500/50 transition-all duration-300 group"
              :initial="{ opacity: 0, x: -50, scale: 0.9 }"
              :enter="{ opacity: 1, x: 0, scale: 1 }"
              :transition="{ duration: 600, delay: index * 100 }"
              :hover="{ x: 5, scale: 1.01 }"
            >
              <div class="p-4">
                <div class="flex justify-between items-center">
                  <div class="flex items-center">
                    <!-- Time Indicator -->
                    <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    
                    <!-- Course Info -->
                    <div>
                      <h3 class="text-lg font-bold text-white group-hover:text-green-400 transition-colors duration-300">
                        {{ courseStore.courseById(schedule.courseId)?.title || 'N/A' }}
                      </h3>
                      <p class="text-gray-300 text-sm">
                        {{ formatDate(schedule.date) }}
                      </p>
                      <div class="flex items-center space-x-4 mt-2">
                        <div class="flex items-center space-x-2">
                          <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span class="text-green-400 text-sm font-medium">Scheduled</span>
                        </div>
                        <div class="flex items-center space-x-2">
                          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span class="text-gray-400 text-sm">Room 101</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Status Badge -->
                  <div class="flex flex-col items-end space-y-2">
                    <span class="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg">
                      Upcoming
                    </span>
                    <MotionButton 
                      class="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300"
                      :hover="{ scale: 1.05 }"
                      :tap="{ scale: 0.95 }"
                    >
                      Join Class
                    </MotionButton>
                  </div>
                </div>
              </div>
            </MotionCard>
          </div>
        </div>
      </MotionCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAttendanceStore } from '~/stores/attendanceStore';
import { useCourseStore } from '~/stores/courseStore';

definePageMeta({ layout: 'learn' });

const attendanceStore = useAttendanceStore();
const courseStore = useCourseStore();

onMounted(() => {
  attendanceStore.fetchAttendanceRecords();
});

const formatDate = (date: Date | string) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
};
</script> 