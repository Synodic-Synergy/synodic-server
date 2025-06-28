<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
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
          <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-4">
            Announcements
          </h1>
          <p class="text-gray-300 text-lg max-w-2xl mx-auto">
            Stay updated with the latest news and important announcements
          </p>
        </div>
      </MotionCard>

      <!-- Loading State -->
      <MotionCard 
        v-if="noticeStore.loading" 
        class="text-center py-16 bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-xl border border-gray-600/30"
        :initial="{ opacity: 0, scale: 0.9 }"
        :enter="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 500 }"
      >
        <div class="inline-flex items-center px-6 py-3 font-semibold text-lg shadow-lg rounded-xl text-white bg-gradient-to-r from-blue-500 to-purple-500">
          <svg class="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading announcements...
        </div>
      </MotionCard>

      <!-- Empty State -->
      <MotionCard 
        v-else-if="noticeStore.notices.length === 0" 
        class="text-center py-16 bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-xl border border-gray-600/30"
        :initial="{ opacity: 0, scale: 0.9 }"
        :enter="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 500 }"
      >
        <div class="mb-6">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4">
            <svg class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4 19h6v-2H4v2zM4 15h6v-2H4v2zM4 11h6V9H4v2zM4 7h6V5H4v2zM10 7h10V5H10v2zM10 11h10V9H10v2zM10 15h10v-2H10v2zM10 19h10v-2H10v2z" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-2">No announcements yet</h3>
          <p class="text-gray-300 text-lg max-w-md mx-auto">
            Check back later for important updates and news
          </p>
        </div>
        <MotionButton 
          class="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-xl font-semibold text-lg"
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
          :transition="{ duration: 500, delay: 200 }"
        >
          Refresh
        </MotionButton>
      </MotionCard>

      <!-- Notices List -->
      <div v-else class="space-y-6">
        <MotionCard 
          v-for="(notice, index) in noticeStore.notices" 
          :key="notice.id"
          class="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-xl border border-gray-600/30 hover:border-blue-500/50 transition-all duration-300 group"
          :initial="{ opacity: 0, y: 50, scale: 0.9 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          :transition="{ duration: 600, delay: index * 100 }"
          :hover="{ y: -5, scale: 1.01 }"
        >
          <div class="p-6">
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <!-- Notice Header -->
                <div class="flex items-center mb-3">
                  <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4 19h6v-2H4v2zM4 15h6v-2H4v2zM4 11h6V9H4v2zM4 7h6V5H4v2zM10 7h10V5H10v2zM10 11h10V9H10v2zM10 15h10v-2H10v2zM10 19h10v-2H10v2z" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 mb-1">
                      {{ notice.title }}
                    </h3>
                    <p class="text-gray-300 text-sm leading-relaxed">
                      {{ notice.content }}
                    </p>
                  </div>
                </div>

                <!-- Notice Metadata -->
                <div class="flex items-center justify-between mt-4">
                  <div class="flex items-center space-x-4">
                    <div class="flex items-center space-x-2">
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span class="text-gray-400 text-sm">Today</span>
                    </div>
                    <div class="flex items-center space-x-2">
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span class="text-gray-400 text-sm">All Students</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Priority Badge -->
              <div class="ml-4">
                <span :class="[
                  'px-3 py-1 rounded-full text-xs font-semibold shadow-lg',
                  notice.priority === 'high' ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white' :
                  notice.priority === 'medium' ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' :
                  'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                ]">
                  {{ notice.priority }}
                </span>
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
import { useNoticeStore } from '~/stores/noticeStore';

definePageMeta({ layout: 'learn' });

const noticeStore = useNoticeStore();

onMounted(() => {
  noticeStore.fetchNotices();
});
</script> 