<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
    </div>
    <div class="relative z-10 container mx-auto px-4 py-8">
      <MotionCard class="mb-8 bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-xl border border-gray-600/30" :initial="{ opacity: 0, y: -20 }" :enter="{ opacity: 1, y: 0 }" :transition="{ duration: 600 }">
        <div class="p-8 flex items-center justify-between">
          <div>
            <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400 bg-clip-text text-transparent mb-2">All Lessons</h1>
            <p class="text-gray-300 text-lg">Manage all lessons across all courses</p>
          </div>
        </div>
      </MotionCard>
      <MotionCard class="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-xl border border-gray-600/30" :initial="{ opacity: 0, y: 50 }" :enter="{ opacity: 1, y: 0 }" :transition="{ duration: 600, delay: 200 }">
        <div class="p-8">
          <div v-if="lessons.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MotionTile v-for="lesson in lessons" :key="lesson.id" class="bg-gradient-to-br from-gray-700/50 to-gray-600/50 backdrop-blur-xl border border-gray-500/30 p-6 rounded-xl hover:border-purple-500/50 transition-all duration-300" :hover="{ scale: 1.02, y: -5 }">
              <div class="flex items-start justify-between mb-4">
                <h3 class="text-lg font-semibold text-white">{{ lesson.title }}</h3>
                <span class="text-xs text-gray-400 bg-gray-600/50 px-2 py-1 rounded-full">Lesson {{ lesson.order }}</span>
              </div>
              <p class="text-gray-300 text-sm mb-4 line-clamp-3">{{ lesson.description }}</p>
              <div class="flex items-center justify-between text-xs text-gray-400 mb-4">
                <span>{{ lesson.courseName }}</span>
                <span>{{ lesson.teacherName }}</span>
              </div>
              <div class="flex items-center justify-between text-xs text-gray-400">
                <span>{{ formatDate(lesson.createdAt) }}</span>
                <MotionButton :to="`/admin/lessons/${lesson.id}`" class="text-purple-400 hover:text-purple-300" :hover="{ scale: 1.1 }">View</MotionButton>
              </div>
            </MotionTile>
          </div>
          <div v-else class="text-center py-12">
            <div class="w-16 h-16 bg-gray-600/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">No Lessons Yet</h3>
            <p class="text-gray-400">No lessons have been created in the system yet.</p>
          </div>
        </div>
      </MotionCard>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
const lessons = ref<any[]>([]); // TODO: Fetch real lessons
const formatDate = (date: Date | string | null | undefined) => {
  if (!date) return 'N/A';
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'N/A';
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(d);
};
onMounted(() => { /* TODO: Load lessons */ });
</script> 