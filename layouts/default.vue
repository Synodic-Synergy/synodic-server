<template>
  <div class="min-h-screen bg-dark-primary">
    <nav class="bg-dark-secondary border-b border-dark-border px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <NuxtLink to="/" class="flex items-center">
            <span class="text-orange-500 font-bold text-xl">Synodic</span>
            <span class="text-text-primary font-bold text-xl ml-1">Synergy</span>
          </NuxtLink>
        </div>
        <div class="flex items-center">
          <template v-if="!authStore.initialized">
            <div class="animate-pulse h-6 w-24 bg-dark-border rounded"></div>
          </template>
          <template v-else-if="authStore.isAuthenticated">
            <span class="text-text-secondary mr-4">{{ authStore.user?.email }}</span>
            <button @click="handleLogout" class="btn-secondary">
              Sign Out
            </button>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="btn-primary">
              Sign In
            </NuxtLink>
          </template>
        </div>
      </div>
    </nav>

    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

onMounted(async () => {
  if (process.client) {
    console.log('[LAYOUT] Initializing auth store...');
    await authStore.initialize();
  }
});

const handleLogout = async () => {
  try {
    await $fetch('/api/auth/logout');
    authStore.clearAuth();
    await navigateTo('/login');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
</script> 