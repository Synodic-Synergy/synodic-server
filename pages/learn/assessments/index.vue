<template>
  <div class="space-y-8">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-text-primary">My Assessments</h1>
    </div>
    <div v-if="assessmentStore.loading" class="text-center py-12">
      <div class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-blue-500 hover:bg-blue-400 transition ease-in-out duration-150 cursor-not-allowed">
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Loading assessments...
      </div>
    </div>
    <div v-else-if="assessmentStore.assessments.length === 0" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-text-primary">No assessments found</h3>
      <p class="mt-1 text-sm text-text-secondary">
        You have no assessments assigned yet.
      </p>
    </div>
    <div v-else class="grid grid-cols-1 gap-4">
      <div v-for="assessment in assessmentStore.assessments" :key="assessment.id" class="bg-dark-secondary p-6 rounded-lg border border-dark-border">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-semibold text-text-primary">{{ assessment.title }}</h3>
            <p class="text-text-secondary text-sm mt-2">Due: {{ formatDate(typeof assessment.dueDate === 'string' ? assessment.dueDate : assessment.dueDate.toISOString()) }}</p>
          </div>
          <div class="flex gap-2">
            <button class="px-4 py-2 rounded bg-orange-500/20 text-orange-400 hover:bg-orange-500/30">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAssessmentStore } from '~/stores/assessmentStore';

definePageMeta({ layout: 'learn' });

const assessmentStore = useAssessmentStore();

onMounted(() => {
  assessmentStore.fetchAssessments();
});

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};
</script> 