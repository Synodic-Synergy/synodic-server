<template>
  <div class="space-y-8">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-text-primary">New Course</h1>
    </div>
    <div class="bg-dark-secondary p-6 rounded-lg border border-dark-border">
      <form class="space-y-6">
        <div>
          <label for="title" class="block text-sm font-medium text-text-primary">Title</label>
          <input type="text" id="title" v-model="title" 
                 class="mt-1 block w-full rounded-md bg-dark-primary border-dark-border text-text-primary">
        </div>
        <div>
          <label for="description" class="block text-sm font-medium text-text-primary">Description</label>
          <textarea id="description" v-model="description" rows="4"
                    class="mt-1 block w-full rounded-md bg-dark-primary border-dark-border text-text-primary"></textarea>
        </div>
        <div class="flex justify-end gap-4">
          <NuxtLink to="/teach/courses" class="btn-secondary">
            Cancel
          </NuxtLink>
          <button type="submit" class="btn-primary">
            Create Course
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
</script> 