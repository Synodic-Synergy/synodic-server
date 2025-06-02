<template>
  <div class="min-h-[80vh] flex items-center justify-center">
    <div class="card w-full max-w-md animate-fade-in">
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

const authStore = useAuthStore();
const router = useRouter();

// Redirect if already authenticated
onMounted(() => {
  if (authStore.isAuthenticated) {
    if (authStore.isAdmin || authStore.isStaff) {
      router.push('/teach');
    } else {
      router.push('/learn');
    }
  }
});
</script> 