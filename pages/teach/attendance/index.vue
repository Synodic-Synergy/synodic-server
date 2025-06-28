<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
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
          <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">
            Attendance Tracking
          </h1>
          <p class="text-gray-300 text-lg max-w-2xl mx-auto">
            Monitor and manage student attendance across your courses
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
        <div class="inline-flex items-center px-6 py-3 font-semibold text-lg shadow-lg rounded-xl text-white bg-gradient-to-r from-amber-500 to-yellow-500">
          <svg class="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading attendance records...
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
          <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mb-4">
            <svg class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-2">No attendance records</h3>
          <p class="text-gray-300 text-lg max-w-md mx-auto">
            Attendance records will appear here when you start tracking
          </p>
        </div>
        <MotionButton 
          class="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-8 py-3 rounded-xl font-semibold text-lg"
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
          :transition="{ duration: 500, delay: 200 }"
          :hover="{ scale: 1.05 }"
          :tap="{ scale: 0.95 }"
        >
          Start Tracking
        </MotionButton>
      </MotionCard>

      <!-- Attendance Records -->
      <div v-else class="space-y-8">
        <MotionCard 
          v-for="(record, index) in attendanceStore.attendanceRecords" 
          :key="record.id"
          class="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-xl border border-gray-600/30 hover:border-amber-500/50 transition-all duration-300 group"
          :initial="{ opacity: 0, y: 50, scale: 0.9 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          :transition="{ duration: 600, delay: index * 100 }"
          :hover="{ y: -5, scale: 1.01 }"
        >
          <div class="p-6">
            <!-- Record Header -->
            <div class="flex justify-between items-start mb-6">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-white group-hover:text-amber-400 transition-colors duration-300">
                    {{ courseStore.courseById(record.courseId)?.title || 'N/A' }}
                  </h3>
                  <p class="text-gray-300 text-sm">
                    {{ formatDate(record.date) }}
                  </p>
                </div>
              </div>
              <div class="text-right">
                <span class="text-gray-400 text-sm">Taken by:</span>
                <p class="text-white font-semibold">{{ record.takenBy }}</p>
              </div>
            </div>

            <!-- Attendance Stats -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div class="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-lg border border-green-500/30">
                <div class="flex items-center justify-between">
                  <span class="text-green-400 text-sm font-medium">Present</span>
                  <span class="text-green-400 text-lg font-bold">
                    {{ record.students.filter(s => s.status === 'present').length }}
                  </span>
                </div>
              </div>
              <div class="bg-gradient-to-r from-red-500/20 to-pink-500/20 p-4 rounded-lg border border-red-500/30">
                <div class="flex items-center justify-between">
                  <span class="text-red-400 text-sm font-medium">Absent</span>
                  <span class="text-red-400 text-lg font-bold">
                    {{ record.students.filter(s => s.status === 'absent').length }}
                  </span>
                </div>
              </div>
              <div class="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-4 rounded-lg border border-yellow-500/30">
                <div class="flex items-center justify-between">
                  <span class="text-yellow-400 text-sm font-medium">Late</span>
                  <span class="text-yellow-400 text-lg font-bold">
                    {{ record.students.filter(s => s.status === 'late').length }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Student List -->
            <div class="space-y-3">
              <h4 class="text-lg font-semibold text-white mb-4">Student Attendance</h4>
              <div 
                v-for="student in record.students" 
                :key="student.studentId"
                class="flex items-center justify-between p-4 rounded-lg bg-gray-700/30 border border-gray-600/30 hover:border-amber-500/30 transition-all duration-300"
              >
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center mr-3">
                    <span class="text-white text-sm font-semibold">
                      {{ student.studentName.charAt(0).toUpperCase() }}
                    </span>
                  </div>
                  <span class="text-white font-medium">{{ student.studentName }}</span>
                </div>
                <span :class="[
                  'px-3 py-1 rounded-full text-xs font-semibold',
                  student.status === 'present' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                  student.status === 'absent' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                  'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                ]">
                  {{ student.status }}
                </span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-600/30">
              <MotionButton 
                class="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300"
                :hover="{ scale: 1.05 }"
                :tap="{ scale: 0.95 }"
              >
                Edit Record
              </MotionButton>
              <MotionButton 
                class="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300"
                :hover="{ scale: 1.05 }"
                :tap="{ scale: 0.95 }"
              >
                Export Report
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
import { useAttendanceStore } from '~/stores/attendanceStore';
import { useCourseStore } from '~/stores/courseStore';

definePageMeta({ layout: 'teach' });

const attendanceStore = useAttendanceStore();
const courseStore = useCourseStore();

onMounted(() => {
  attendanceStore.fetchTeachAttendance();
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