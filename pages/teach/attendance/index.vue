<template>
  <div class="space-y-8">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-text-primary">Attendance</h1>
    </div>
    <div v-if="attendanceStore.loading" class="flex justify-center">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
    </div>
    <div v-else-if="attendanceStore.attendanceRecords.length === 0" class="text-center text-text-secondary py-8">
      No attendance records found.
    </div>
    <div v-else class="grid grid-cols-1 gap-8">
      <div v-for="record in attendanceStore.attendanceRecords" :key="record.id"
           class="bg-dark-secondary p-6 rounded-lg border border-dark-border">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="font-semibold text-text-primary">{{ courseStore.courseById(record.courseId)?.title || 'N/A' }}</h3>
            <p class="text-text-secondary text-sm mt-1">{{ formatDate(record.date) }}</p>
          </div>
          <span class="text-text-secondary text-sm">Taken by: {{ record.takenBy }}</span>
        </div>
        <div class="space-y-4">
          <div v-for="student in record.students" :key="student.studentId"
               class="flex items-center justify-between p-2 rounded bg-dark-primary">
            <span class="text-text-primary">{{ student.studentName }}</span>
            <span class="text-text-secondary text-xs">Status: {{ student.status }}</span>
          </div>
        </div>
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