<template>
  <div class="space-y-8">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-text-primary">Courses</h1>
      <NuxtLink to="/teach/courses/new" class="btn-primary">
        New Course
      </NuxtLink>
    </div>
    <div v-if="courseStore.loading" class="flex justify-center">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
    </div>
    <div v-else-if="courseStore.activeCourses.length === 0" class="text-center text-text-secondary py-8">
      No courses found.
    </div>
    <div v-else class="grid grid-cols-1 gap-4">
      <div v-for="course in courseStore.activeCourses" :key="course.id"
           class="bg-dark-secondary p-4 rounded-lg border border-dark-border hover:border-orange-500 transition-colors">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-semibold text-text-primary">{{ course.title }}</h3>
            <p class="text-text-secondary text-sm mt-1">{{ course.description }}</p>
          </div>
          <span class="text-text-secondary text-sm">{{ course.studentCount }} students</span>
        </div>
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