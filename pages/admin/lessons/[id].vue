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
            <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400 bg-clip-text text-transparent mb-2">Lesson Details</h1>
            <p class="text-gray-300 text-lg">Admin view of lesson information</p>
          </div>
          <MotionButton to="/admin/lessons" class="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white px-6 py-3 rounded-xl font-semibold" :hover="{ scale: 1.05 }" :tap="{ scale: 0.95 }">Back to Lessons</MotionButton>
        </div>
      </MotionCard>
      <MotionCard class="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-xl border border-gray-600/30" :initial="{ opacity: 0, y: 50 }" :enter="{ opacity: 1, y: 0 }" :transition="{ duration: 600, delay: 200 }">
        <div class="p-8 space-y-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-2">Title</label>
              <p class="text-white text-lg">{{ lesson?.title }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-2">Course</label>
              <p class="text-white text-lg">{{ lesson?.courseName }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-2">Teacher</label>
              <p class="text-white text-lg">{{ lesson?.teacherName }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-2">Order</label>
              <p class="text-white text-lg">{{ lesson?.order }}</p>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">Description</label>
            <p class="text-gray-300 leading-relaxed">{{ lesson?.description }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">Content</label>
            <div class="bg-gray-900/50 p-4 rounded-lg">
              <p class="text-gray-300">{{ lesson?.content || 'No content available' }}</p>
            </div>
          </div>
          <div class="flex justify-end gap-4 pt-6">
            <MotionButton to="/admin/lessons" class="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white px-6 py-3 rounded-xl font-semibold" :hover="{ scale: 1.05 }" :tap="{ scale: 0.95 }">Back</MotionButton>
            <MotionButton @click="editLesson" class="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300" :hover="{ scale: 1.05 }" :tap="{ scale: 0.95 }">Edit Lesson</MotionButton>
          </div>
        </div>
      </MotionCard>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
const lesson = ref<any>(null); // TODO: Fetch real lesson
const editLesson = () => { /* TODO: Navigate to edit page */ };
onMounted(() => { /* TODO: Load lesson data */ });
</script> 