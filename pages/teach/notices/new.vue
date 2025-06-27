<template>
  <div class="space-y-8">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-text-primary">New Notice</h1>
    </div>
    <div class="bg-dark-secondary p-6 rounded-lg border border-dark-border">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label for="title" class="block text-sm font-medium text-text-primary">Title</label>
          <input type="text" id="title" v-model="title" required
                 class="mt-1 block w-full rounded-md bg-dark-primary border-dark-border text-text-primary">
        </div>
        <div>
          <label for="content" class="block text-sm font-medium text-text-primary">Content</label>
          <textarea id="content" v-model="content" rows="4" required
                    class="mt-1 block w-full rounded-md bg-dark-primary border-dark-border text-text-primary"></textarea>
        </div>
        <div>
          <label for="priority" class="block text-sm font-medium text-text-primary">Priority</label>
          <select id="priority" v-model="priority"
                  class="mt-1 block w-full rounded-md bg-dark-primary border-dark-border text-text-primary">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div class="flex justify-end gap-4">
          <NuxtLink to="/teach/notices" class="btn-secondary">
            Cancel
          </NuxtLink>
          <button type="submit" class="btn-primary" :disabled="isSubmitting">
            {{ isSubmitting ? 'Creating...' : 'Create Notice' }}
          </button>
        </div>
      </form>
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