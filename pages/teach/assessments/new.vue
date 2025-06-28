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
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <MotionButton 
                to="/teach/assessments"
                class="mr-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white p-2 rounded-lg"
                :hover="{ scale: 1.05 }"
                :tap="{ scale: 0.95 }"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </MotionButton>
              <div>
                <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  Create New Assessment
                </h1>
                <p class="text-gray-300 text-lg">
                  Design and schedule your next student assessment
                </p>
              </div>
            </div>
          </div>
        </div>
      </MotionCard>

      <!-- Form Section -->
      <MotionCard 
        class="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-xl border border-gray-600/30"
        :initial="{ opacity: 0, y: 50, scale: 0.9 }"
        :enter="{ opacity: 1, y: 0, scale: 1 }"
        :transition="{ duration: 600, delay: 200 }"
      >
        <div class="p-8">
          <form @submit.prevent="handleSubmit" class="space-y-8">
            <!-- Assessment Title -->
            <div class="space-y-3">
              <label for="title" class="block text-lg font-semibold text-white">
                Assessment Title
              </label>
              <input 
                type="text" 
                id="title" 
                v-model="title" 
                required
                placeholder="Enter assessment title..."
                class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
              >
            </div>

            <!-- Assessment Description -->
            <div class="space-y-3">
              <label for="description" class="block text-lg font-semibold text-white">
                Assessment Description
              </label>
              <textarea 
                id="description" 
                v-model="description" 
                rows="6" 
                required
                placeholder="Describe the assessment requirements and instructions..."
                class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 resize-none"
              ></textarea>
            </div>

            <!-- Due Date -->
            <div class="space-y-3">
              <label for="dueDate" class="block text-lg font-semibold text-white">
                Due Date & Time
              </label>
              <input 
                type="datetime-local" 
                id="dueDate" 
                v-model="dueDate" 
                required
                class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
              >
            </div>

            <!-- Additional Fields -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-3">
                <label for="maxScore" class="block text-lg font-semibold text-white">
                  Maximum Score
                </label>
                <input 
                  type="number" 
                  id="maxScore"
                  value="100"
                  min="1"
                  max="1000"
                  class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                >
              </div>

              <div class="space-y-3">
                <label for="type" class="block text-lg font-semibold text-white">
                  Assessment Type
                </label>
                <select 
                  id="type"
                  class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="assignment">Assignment</option>
                  <option value="quiz">Quiz</option>
                  <option value="exam">Exam</option>
                  <option value="project">Project</option>
                </select>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-end gap-4 pt-6">
              <MotionButton 
                to="/teach/assessments"
                class="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300"
                :hover="{ scale: 1.05 }"
                :tap="{ scale: 0.95 }"
              >
                Cancel
              </MotionButton>
              <MotionButton 
                type="submit"
                :disabled="isSubmitting"
                class="bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300"
                :hover="{ scale: 1.05 }"
                :tap="{ scale: 0.95 }"
              >
                <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isSubmitting ? 'Creating Assessment...' : 'Create Assessment' }}
              </MotionButton>
            </div>
          </form>
        </div>
      </MotionCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAssessmentStore } from '~/stores/assessmentStore';

definePageMeta({ layout: 'teach' });

const assessmentStore = useAssessmentStore();
const title = ref('');
const description = ref('');
const dueDate = ref('');
const isSubmitting = ref(false);

const handleSubmit = async () => {
  try {
    isSubmitting.value = true;
    await assessmentStore.createAssessment({
      title: title.value,
      description: description.value,
      dueDate: new Date(dueDate.value)
    });
    await navigateTo('/teach/assessments');
  } catch (error) {
    console.error('Failed to create assessment:', error);
  } finally {
    isSubmitting.value = false;
  }
};
</script> 