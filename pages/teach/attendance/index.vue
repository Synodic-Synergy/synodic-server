<template>
  <div class="space-y-8">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-text-primary">Attendance</h1>
    </div>
    <div class="grid grid-cols-1 gap-8">
      <div v-for="classItem in classes" :key="classItem.id"
           class="bg-dark-secondary p-6 rounded-lg border border-dark-border">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="font-semibold text-text-primary">{{ classItem.courseTitle }}</h3>
            <p class="text-text-secondary text-sm mt-1">{{ classItem.time }}</p>
          </div>
          <span class="text-text-secondary text-sm">{{ classItem.room }}</span>
        </div>
        <div class="space-y-4">
          <div v-for="student in classItem.students" :key="student.id"
               class="flex items-center justify-between p-2 rounded bg-dark-primary">
            <span class="text-text-primary">{{ student.name }}</span>
            <div class="flex gap-2">
              <button class="px-3 py-1 rounded bg-green-500/20 text-green-400 hover:bg-green-500/30">
                Present
              </button>
              <button class="px-3 py-1 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30">
                Absent
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Student {
  id: string;
  name: string;
}

interface Class {
  id: string;
  courseTitle: string;
  time: string;
  room: string;
  students: Student[];
}

const classes = ref<Class[]>([]);
</script> 