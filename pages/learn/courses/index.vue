<template>
  <div class="space-y-8">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-text-primary">My Courses</h1>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="course in courses" :key="course.id" 
           class="bg-dark-secondary p-6 rounded-lg border border-dark-border hover:border-orange-500 transition-colors">
        <h3 class="font-semibold text-text-primary">{{ course.title }}</h3>
        <p class="text-text-secondary text-sm mt-2">{{ course.description }}</p>
        <div class="mt-4 flex justify-between items-center">
          <span class="text-text-secondary text-sm">Progress: 0%</span>
          <NuxtLink :to="`/learn/courses/${course.id}`" class="text-orange-500 hover:text-orange-400">
            View Course
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Course } from '~/types/dashboard';

const courses = ref<Course[]>([]);
</script> 