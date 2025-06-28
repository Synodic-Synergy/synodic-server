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
            <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400 bg-clip-text text-transparent mb-2">Lesson</h1>
            <p class="text-gray-300 text-lg">Read and complete this lesson</p>
          </div>
        </div>
      </MotionCard>
      <MotionCard class="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-xl border border-gray-600/30" :initial="{ opacity: 0, y: 50 }" :enter="{ opacity: 1, y: 0 }" :transition="{ duration: 600, delay: 200 }">
        <div class="p-8 space-y-8">
          <div>
            <h2 class="text-2xl font-bold text-white mb-2">{{ title }}</h2>
            <p class="text-gray-400 mb-4">{{ description }}</p>
            <div class="prose prose-invert max-w-none" v-html="contentHtml"></div>
          </div>
          <div class="flex justify-end gap-4 pt-6">
            <MotionButton to="/learn/lessons" class="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300" :hover="{ scale: 1.05 }" :tap="{ scale: 0.95 }">Back</MotionButton>
            <MotionButton @click="markComplete" class="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300" :hover="{ scale: 1.05 }" :tap="{ scale: 0.95 }">Mark Complete</MotionButton>
          </div>
        </div>
      </MotionCard>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useLessonStore } from '~/stores/lessonStore';
const route = useRoute();
const lessonStore = useLessonStore();
const title = ref('');
const description = ref('');
const content = ref('');
const contentHtml = ref('');

const loadLesson = async () => {
  const id = route.params.id as string;
  await lessonStore.fetchLesson(id);
  if (lessonStore.currentLesson) {
    title.value = lessonStore.currentLesson.title;
    description.value = lessonStore.currentLesson.description;
    content.value = lessonStore.currentLesson.content;
    // Optionally render markdown to HTML here
    contentHtml.value = lessonStore.currentLesson.content;
  }
};

const markComplete = async () => {
  if (lessonStore.currentLesson) {
    await lessonStore.markLessonComplete(lessonStore.currentLesson.id, 'CURRENT_STUDENT_ID'); // Replace with real student ID
  }
};

onMounted(loadLesson);
</script> 