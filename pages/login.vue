<template>
  <div class="min-h-[80vh] flex items-center justify-center">
    <div v-if="!authStore.initialized" class="card w-full max-w-md animate-fade-in">
      <div class="flex items-center justify-center h-32">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    </div>
    <div v-else class="card w-full max-w-md animate-fade-in">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold mb-2">
          <span class="text-orange-500">Welcome</span>
          <span class="text-text-primary"> Back</span>
        </h1>
        <p class="text-text-secondary">
          Sign in to access your account
        </p>
      </div>

      <LoginForm />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';
import LoginForm from '~/components/auth/LoginForm.vue';

const authStore = useAuthStore();
const router = useRouter();

// Redirect if already authenticated
watch(() => authStore.initialized, (initialized) => {
  if (initialized && authStore.isAuthenticated) {
    if (authStore.isAdmin || authStore.isStaff) {
      router.push('/teach');
    } else {
      router.push('/learn');
    }
  }
}, { immediate: true });
</script> 