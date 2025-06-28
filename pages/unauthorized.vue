<template>
  <div class="min-h-screen w-full bg-gradient-to-br from-dark-primary via-dark-secondary to-red-900/30 relative overflow-hidden flex items-center justify-center">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
    </div>

    <!-- Main Content -->
    <MotionCard class="w-full max-w-md p-12 text-center bg-dark-secondary/90 backdrop-blur-xl shadow-2xl">
      <div class="text-8xl mb-6 animate-bounce">🔒</div>
      <h1 class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-600 mb-4">
        Access Denied
      </h1>
      <p class="text-text-secondary text-lg mb-8 max-w-sm mx-auto">
        You don't have permission to access this page. Please contact your administrator if you believe this is an error.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <MotionButton color="gray" size="lg" @click="goBack">
          <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Go Back
        </MotionButton>
        <MotionButton color="orange" size="lg" @click="goHome">
          <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Go Home
        </MotionButton>
      </div>
    </MotionCard>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import MotionCard from '~/components/MotionCard.vue';
import MotionButton from '~/components/MotionButton.vue';

const router = useRouter();

const goBack = () => {
  router.back();
};

const goHome = () => {
  router.push('/');
};
</script> 