<template>
  <div class="space-y-8">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-text-primary">Timetable</h1>
    </div>
    <div class="bg-dark-secondary p-6 rounded-lg border border-dark-border">
      <div class="grid grid-cols-1 gap-4">
        <div v-for="schedule in schedules" :key="schedule.id"
             class="flex justify-between items-center p-4 rounded bg-dark-primary">
          <div>
            <h3 class="font-semibold text-text-primary">{{ schedule.courseTitle }}</h3>
            <p class="text-text-secondary text-sm mt-1">{{ schedule.time }}</p>
          </div>
          <span class="text-text-secondary text-sm">{{ schedule.room }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Schedule } from '~/types/dashboard';

const schedules = ref<Schedule[]>([]);
</script> 