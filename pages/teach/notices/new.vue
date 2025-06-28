<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
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
                to="/teach/notices"
                class="mr-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white p-2 rounded-lg"
                :hover="{ scale: 1.05 }"
                :tap="{ scale: 0.95 }"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </MotionButton>
              <div>
                <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 bg-clip-text text-transparent mb-2">
                  Create New Notice
                </h1>
                <p class="text-gray-300 text-lg">
                  Share important announcements with your students
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
            <!-- Notice Title -->
            <div class="space-y-3">
              <label for="title" class="block text-lg font-semibold text-white">
                Notice Title
              </label>
              <input 
                type="text" 
                id="title" 
                v-model="title" 
                required
                placeholder="Enter notice title..."
                class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
              >
            </div>

            <!-- Notice Content -->
            <div class="space-y-3">
              <label for="content" class="block text-lg font-semibold text-white">
                Notice Content
              </label>
              <textarea 
                id="content" 
                v-model="content" 
                rows="6" 
                required
                placeholder="Write your announcement content here..."
                class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 resize-none"
              ></textarea>
            </div>

            <!-- Additional Fields -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-3">
                <label for="priority" class="block text-lg font-semibold text-white">
                  Priority Level
                </label>
                <select 
                  id="priority" 
                  v-model="priority"
                  class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>

              <div class="space-y-3">
                <label for="category" class="block text-lg font-semibold text-white">
                  Category
                </label>
                <select 
                  id="category"
                  class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="general">General</option>
                  <option value="academic">Academic</option>
                  <option value="event">Event</option>
                  <option value="reminder">Reminder</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <!-- Target Audience -->
            <div class="space-y-3">
              <label class="block text-lg font-semibold text-white">
                Target Audience
              </label>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label class="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" checked class="w-4 h-4 text-emerald-500 bg-gray-700 border-gray-600 rounded focus:ring-emerald-500 focus:ring-2">
                  <span class="text-gray-300">All Students</span>
                </label>
                <label class="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" class="w-4 h-4 text-emerald-500 bg-gray-700 border-gray-600 rounded focus:ring-emerald-500 focus:ring-2">
                  <span class="text-gray-300">Specific Course</span>
                </label>
                <label class="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" class="w-4 h-4 text-emerald-500 bg-gray-700 border-gray-600 rounded focus:ring-emerald-500 focus:ring-2">
                  <span class="text-gray-300">Staff Only</span>
                </label>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-end gap-4 pt-6">
              <MotionButton 
                to="/teach/notices"
                class="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300"
                :hover="{ scale: 1.05 }"
                :tap="{ scale: 0.95 }"
              >
                Cancel
              </MotionButton>
              <MotionButton 
                type="submit"
                :disabled="isSubmitting"
                class="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300"
                :hover="{ scale: 1.05 }"
                :tap="{ scale: 0.95 }"
              >
                <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isSubmitting ? 'Creating Notice...' : 'Create Notice' }}
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
import { useNoticeStore } from '~/stores/noticeStore';

definePageMeta({ layout: 'teach' });

const noticeStore = useNoticeStore();
const title = ref('');
const content = ref('');
const priority = ref<'low' | 'medium' | 'high'>('low');
const isSubmitting = ref(false);

const handleSubmit = async () => {
  try {
    isSubmitting.value = true;
    await noticeStore.createNotice({
      title: title.value,
      content: content.value,
      priority: priority.value
    });
    await navigateTo('/teach/notices');
  } catch (error) {
    console.error('Failed to create notice:', error);
  } finally {
    isSubmitting.value = false;
  }
};
</script> 