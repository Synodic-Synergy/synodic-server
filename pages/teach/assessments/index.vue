<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
    </div>

    <div class="relative z-10 container mx-auto px-4 py-8">
      <!-- Header Section -->
      <MotionCard 
        class="mb-8 bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-xl border border-gray-600/30"
        :initial="{ opacity: 0, y: -20 }"
        :enter="{ opacity: 1, y: 0 }"
        :transition="{ duration: 600 }"
      >
        <div class="p-8">
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                Assessments
              </h1>
              <p class="text-gray-300 text-lg">
                Create and manage student assessments and assignments
              </p>
            </div>
            <button
              @click="$router.push('/teach/assessments/new')"
              class="flex items-center bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Assessment
            </button>
          </div>
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
        <div class="inline-flex items-center px-6 py-3 font-semibold text-lg shadow-lg rounded-xl text-white bg-gradient-to-r from-indigo-500 to-cyan-500">
          <svg class="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading assessments...
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
          <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full mb-4">
            <svg class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-2">No assessments yet</h3>
          <p class="text-gray-300 text-lg max-w-md mx-auto">
            Start by creating your first assessment for your students
          </p>
        </div>
        <button
          @click="$router.push('/teach/assessments/new')"
          class="bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          Create First Assessment
        </button>
      </MotionCard>

      <!-- Assessments List -->
      <div v-else class="space-y-6">
        <MotionCard 
          v-for="(assessment, index) in assessmentStore.assessments" 
          :key="assessment.id"
          class="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-xl border border-gray-600/30 hover:border-indigo-500/50 transition-all duration-300 group"
          :initial="{ opacity: 0, y: 50, scale: 0.9 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          :transition="{ duration: 600, delay: index * 100 }"
          :hover="{ y: -5, scale: 1.01 }"
        >
          <div class="p-6">
            <div class="flex justify-between items-start">
              <div class="flex items-center flex-1">
                <!-- Assessment Icon -->
                <div class="w-12 h-12 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                
                <!-- Assessment Info -->
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-300 mb-2">
                    {{ assessment.title }}
                  </h3>
                  <p class="text-gray-300 text-sm mb-3">
                    Due: {{ formatDate(typeof assessment.dueDate === 'string' ? assessment.dueDate : assessment.dueDate.toISOString()) }}
                  </p>
                  
                  <!-- Assessment Stats -->
                  <div class="flex items-center space-x-6">
                    <div class="flex items-center space-x-2">
                      <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span class="text-gray-300 text-sm">Active</span>
                    </div>
                    <div class="flex items-center space-x-2">
                      <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span class="text-gray-300 text-sm">0 submissions</span>
                    </div>
                    <div class="flex items-center space-x-2">
                      <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span class="text-gray-300 text-sm">Max Score: 100</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Action Buttons with navigation -->
              <div class="flex flex-col space-y-2 ml-4">
                <button
                  @click="$router.push(`/teach/assessments/${assessment.id}`)"
                  class="bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  Edit Assessment
                </button>
                <button
                  @click="$router.push(`/teach/assessments/${assessment.id}/submissions`)"
                  class="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  View Submissions
                </button>
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

definePageMeta({ layout: 'teach' });

const assessmentStore = useAssessmentStore();

onMounted(() => {
  assessmentStore.fetchTeachAssessments();
});

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};
</script> 