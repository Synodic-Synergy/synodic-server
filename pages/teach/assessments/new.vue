<template>
  <div class="space-y-8">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-text-primary">New Assessment</h1>
    </div>
    <div class="bg-dark-secondary p-6 rounded-lg border border-dark-border">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label for="title" class="block text-sm font-medium text-text-primary">Title</label>
          <input type="text" id="title" v-model="title" required
                 class="mt-1 block w-full rounded-md bg-dark-primary border-dark-border text-text-primary">
        </div>
        <div>
          <label for="description" class="block text-sm font-medium text-text-primary">Description</label>
          <textarea id="description" v-model="description" rows="4" required
                    class="mt-1 block w-full rounded-md bg-dark-primary border-dark-border text-text-primary"></textarea>
        </div>
        <div>
          <label for="dueDate" class="block text-sm font-medium text-text-primary">Due Date</label>
          <input type="datetime-local" id="dueDate" v-model="dueDate" required
                 class="mt-1 block w-full rounded-md bg-dark-primary border-dark-border text-text-primary">
        </div>
        <div class="flex justify-end gap-4">
          <NuxtLink to="/teach/assessments" class="btn-secondary">
            Cancel
          </NuxtLink>
          <button type="submit" class="btn-primary" :disabled="isSubmitting">
            {{ isSubmitting ? 'Creating...' : 'Create Assessment' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const title = ref('');
const description = ref('');
const dueDate = ref('');
const isSubmitting = ref(false);

const handleSubmit = async () => {
  try {
    isSubmitting.value = true;
    await $fetch('/api/teach/assessments', {
      method: 'POST',
      body: {
        title: title.value,
        description: description.value,
        dueDate: dueDate.value
      }
    });
    await navigateTo('/teach/assessments');
  } catch (error) {
    console.error('Failed to create assessment:', error);
  } finally {
    isSubmitting.value = false;
  }
};
</script> 