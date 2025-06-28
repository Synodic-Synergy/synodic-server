<template>
  <div class="min-h-screen w-full bg-gradient-to-br from-dark-primary via-dark-secondary to-orange-900/30 relative overflow-hidden flex items-center justify-center">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
    </div>

    <!-- Loading State -->
    <MotionCard v-if="!authStore.initialized" class="w-full max-w-md p-8 text-center">
      <div class="flex items-center justify-center h-32">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
      </div>
      <p class="text-text-secondary mt-4">Initializing...</p>
    </MotionCard>

    <!-- Login Form -->
    <MotionCard v-else class="w-full max-w-md p-8 bg-dark-secondary/90 backdrop-blur-xl shadow-2xl">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold mb-3">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Welcome</span>
          <span class="text-text-primary"> Back</span>
        </h1>
        <p class="text-text-secondary text-lg">
          Sign in to access your account
        </p>
      </div>

      <LoginForm />
    </MotionCard>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';
import LoginForm from '~/components/auth/LoginForm.vue';
import MotionCard from '~/components/MotionCard.vue';

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