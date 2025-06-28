<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
    </div>
    <div class="relative z-10 container mx-auto px-4 py-8">
      <MotionCard class="mb-8 bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-xl border border-gray-600/30" :initial="{ opacity: 0, y: -20 }" :enter="{ opacity: 1, y: 0 }" :transition="{ duration: 600 }">
        <div class="p-8 flex items-center justify-between">
          <div>
            <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 via-pink-400 to-violet-400 bg-clip-text text-transparent mb-2">Attendance Overview</h1>
            <p class="text-gray-300 text-lg">View attendance records across all courses</p>
          </div>
        </div>
      </MotionCard>
      <MotionCard class="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-xl border border-gray-600/30" :initial="{ opacity: 0, y: 50 }" :enter="{ opacity: 1, y: 0 }" :transition="{ duration: 600, delay: 200 }">
        <div class="p-8">
          <div v-if="attendanceRecords.length" class="space-y-6">
            <div v-for="record in attendanceRecords" :key="record.id" class="bg-gray-700/40 rounded-xl px-6 py-4">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-semibold text-white">{{ record.courseName }}</h3>
                  <p class="text-gray-400">{{ record.studentName }} - {{ formatDate(record.date) }}</p>
                </div>
                <span :class="getStatusClass(record.status)" class="px-3 py-1 rounded-full text-sm font-semibold">
                  {{ record.status }}
                </span>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-12">
            <div class="w-16 h-16 bg-gray-600/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">No Attendance Records</h3>
            <p class="text-gray-400">No attendance records have been created yet.</p>
          </div>
        </div>
      </MotionCard>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
const attendanceRecords = ref<any[]>([]); // TODO: Fetch real attendance records
const getStatusClass = (status: string) => {
  switch (status) {
    case 'present': return 'bg-green-500/20 text-green-300 border border-green-500/30';
    case 'absent': return 'bg-red-500/20 text-red-300 border border-red-500/30';
    case 'late': return 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30';
    default: return 'bg-gray-500/20 text-gray-300 border border-gray-500/30';
  }
};
const formatDate = (date: Date | string | null | undefined) => {
  if (!date) return 'N/A';
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'N/A';
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(d);
};
onMounted(() => { /* TODO: Load attendance records */ });
</script> 