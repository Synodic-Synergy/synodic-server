<template>
  <div class="min-h-screen flex items-center justify-center bg-dark-primary">
    <div class="text-center space-y-6">
      <div class="text-6xl text-orange-500">🔒</div>
      <h1 class="text-3xl font-bold text-text-primary">Access Denied</h1>
      <p class="text-text-secondary max-w-md">
        You don't have permission to access this page. Please contact your administrator if you believe this is an error.
      </p>
      <div class="space-x-4">
        <button @click="goBack" class="btn-secondary">
          Go Back
        </button>
        <button @click="goHome" class="btn-primary">
          Go Home
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.back();
};

const goHome = () => {
  router.push('/');
};
</script> 