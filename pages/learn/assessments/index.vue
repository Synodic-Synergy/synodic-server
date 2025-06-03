<template>
  <div class="space-y-8">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-text-primary">My Assessments</h1>
    </div>
    <div class="grid grid-cols-1 gap-4">
      <div v-for="assessment in assessments" :key="assessment.id"
           class="bg-dark-secondary p-6 rounded-lg border border-dark-border">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-semibold text-text-primary">{{ assessment.title }}</h3>
            <p class="text-text-secondary text-sm mt-2">Due: {{ formatDate(assessment.dueDate) }}</p>
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
import { ref } from 'vue';
import type { Assessment } from '~/types/dashboard';

const assessments = ref<Assessment[]>([]);

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};
</script> 