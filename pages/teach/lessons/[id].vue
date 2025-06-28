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
            <p class="text-gray-300 text-lg">View or edit this lesson</p>
          </div>
        </div>
      </MotionCard>
      <MotionCard class="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-xl border border-gray-600/30" :initial="{ opacity: 0, y: 50 }" :enter="{ opacity: 1, y: 0 }" :transition="{ duration: 600, delay: 200 }">
        <div class="p-8">
          <form @submit.prevent="handleSave" class="space-y-8">
            <div class="space-y-3">
              <label for="title" class="block text-lg font-semibold text-white">Lesson Title</label>
              <input id="title" v-model="title" required class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300" />
            </div>
            <div class="space-y-3">
              <label for="description" class="block text-lg font-semibold text-white">Lesson Description</label>
              <textarea id="description" v-model="description" rows="4" required class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"></textarea>
            </div>
            <div class="space-y-3">
              <label for="content" class="block text-lg font-semibold text-white">Lesson Content (Markdown)</label>
              <textarea id="content" v-model="content" rows="8" required class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"></textarea>
            </div>
            <div class="flex justify-end gap-4 pt-6">
              <MotionButton to="/teach/lessons" class="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300" :hover="{ scale: 1.05 }" :tap="{ scale: 0.95 }">Back</MotionButton>
              <MotionButton type="submit" :disabled="isSaving" class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300" :hover="{ scale: 1.05 }" :tap="{ scale: 0.95 }">
                {{ isSaving ? 'Saving...' : 'Save Changes' }}
              </MotionButton>
            </div>
          </form>
        </div>
      </MotionCard>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLessonStore } from '~/stores/lessonStore';
const route = useRoute();
const router = useRouter();
const lessonStore = useLessonStore();
const isSaving = ref(false);
const title = ref('');
const description = ref('');
const content = ref('');

const loadLesson = async () => {
  const id = route.params.id as string;
  await lessonStore.fetchLesson(id);
  if (lessonStore.currentLesson) {
    title.value = lessonStore.currentLesson.title;
    description.value = lessonStore.currentLesson.description;
    content.value = lessonStore.currentLesson.content;
  }
};

const handleSave = async () => {
  try {
    isSaving.value = true;
    const id = route.params.id as string;
    await lessonStore.updateLesson(id, {
      title: title.value,
      description: description.value,
      content: content.value
    });
    await loadLesson();
  } catch (error) {
    console.error('Failed to save lesson:', error);
  } finally {
    isSaving.value = false;
  }
};

onMounted(loadLesson);
</script> 