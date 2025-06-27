<template>
  <div class="space-y-8">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-text-primary">Notices</h1>
      <NuxtLink to="/teach/notices/new" class="btn-primary">
        New Notice
      </NuxtLink>
    </div>
    <div v-if="noticeStore.loading" class="flex justify-center">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
    </div>
    <div v-else-if="noticeStore.notices.length === 0" class="text-center text-text-secondary py-8">
      No notices found.
    </div>
    <div v-else class="grid grid-cols-1 gap-4">
      <div v-for="notice in noticeStore.notices" :key="notice.id"
           class="bg-dark-secondary p-4 rounded-lg border border-dark-border">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-semibold text-text-primary">{{ notice.title }}</h3>
            <p class="text-text-secondary text-sm mt-1">{{ notice.content }}</p>
          </div>
          <span :class="[
            'px-2 py-1 rounded text-xs',
            notice.priority === 'high' ? 'bg-red-500/20 text-red-400' :
            notice.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-green-500/20 text-green-400'
          ]">
            {{ notice.priority }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useNoticeStore } from '~/stores/noticeStore';

definePageMeta({ layout: 'teach' });

const noticeStore = useNoticeStore();

onMounted(() => {
  noticeStore.fetchTeachNotices();
});
</script> 