<template>
  <div class="space-y-8">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-text-primary">Assessments</h1>
      <NuxtLink to="/teach/assessments/new" class="btn-primary">
        New Assessment
      </NuxtLink>
    </div>
    <div v-if="isLoading" class="flex justify-center">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
    </div>
    <div v-else class="grid grid-cols-1 gap-4">
      <div v-for="assessment in assessments" :key="assessment.id"
           class="bg-dark-secondary p-4 rounded-lg border border-dark-border">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-semibold text-text-primary">{{ assessment.title }}</h3>
            <p class="text-text-secondary text-sm mt-1">Due: {{ formatDate(assessment.dueDate) }}</p>
          </div>
          <span class="text-text-secondary text-sm">{{ assessment.submissionCount }} submissions</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Assessment } from '~/types/dashboard';

const assessments = ref<Assessment[]>([]);
const isLoading = ref(true);

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

onMounted(async () => {
  try {
    const response = await $fetch<Assessment[]>('/api/teach/assessments');
    assessments.value = response;
  } catch (error) {
    console.error('Failed to fetch assessments:', error);
  } finally {
    isLoading.value = false;
  }
});
</script> 