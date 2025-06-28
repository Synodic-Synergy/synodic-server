<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
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
          <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-4">
            My Assessments
          </h1>
          <p class="text-gray-300 text-lg max-w-2xl mx-auto">
            Track your assignments, deadlines, and academic progress
          </p>
        </div>
      </MotionCard>

      <!-- Loading State -->
      <MotionCard 
        v-if="assessmentStore.loading" 
        class="text-center py-16 bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-xl border border-gray-600/30"
        :initial="{ opacity: 0, scale: 0.9 }"
        :enter="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 500 }"
      >
        <div class="inline-flex items-center px-6 py-3 font-semibold text-lg shadow-lg rounded-xl text-white bg-gradient-to-r from-red-500 to-orange-500">
          <svg class="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading your assessments...
        </div>
      </MotionCard>

      <!-- Empty State -->
      <MotionCard 
        v-else-if="assessmentStore.assessments.length === 0" 
        class="text-center py-16 bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-xl border border-gray-600/30"
        :initial="{ opacity: 0, scale: 0.9 }"
        :enter="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 500 }"
      >
        <div class="mb-6">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mb-4">
            <svg class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-2">No assessments found</h3>
          <p class="text-gray-300 text-lg max-w-md mx-auto">
            You have no assessments assigned yet. Check back later!
          </p>
        </div>
        <MotionButton 
          class="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-8 py-3 rounded-xl font-semibold text-lg"
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
          :transition="{ duration: 500, delay: 200 }"
        >
          Check for Updates
        </MotionButton>
      </MotionCard>

      <!-- Assessments List -->
      <div v-else class="space-y-6">
        <MotionCard 
          v-for="(assessment, index) in assessmentStore.assessments" 
          :key="assessment.id" 
          class="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-xl border border-gray-600/30 hover:border-red-500/50 transition-all duration-300 group"
          :initial="{ opacity: 0, x: -50, scale: 0.9 }"
          :enter="{ opacity: 1, x: 0, scale: 1 }"
          :transition="{ duration: 600, delay: index * 100 }"
          :hover="{ x: 5, scale: 1.01 }"
        >
          <div class="p-6">
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <!-- Assessment Header -->
                <div class="flex items-center mb-3">
                  <div class="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-white group-hover:text-red-400 transition-colors duration-300">
                      {{ assessment.title }}
                    </h3>
                    <p class="text-gray-300 text-sm">
                      Due: {{ formatDate(typeof assessment.dueDate === 'string' ? assessment.dueDate : assessment.dueDate.toISOString()) }}
                    </p>
                  </div>
                </div>

                <!-- Assessment Details -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span class="text-gray-300 text-sm">Status: Pending</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span class="text-gray-300 text-sm">Type: Assignment</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span class="text-gray-300 text-sm">Max Score: 100</span>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col space-y-2 ml-4">
                <MotionButton 
                  class="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-300"
                  :hover="{ scale: 1.05 }"
                  :tap="{ scale: 0.95 }"
                >
                  Submit
                </MotionButton>
                <MotionButton 
                  class="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-300"
                  :hover="{ scale: 1.05 }"
                  :tap="{ scale: 0.95 }"
                >
                  View Details
                </MotionButton>
              </div>
            </div>
          </div>
        </MotionCard>
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