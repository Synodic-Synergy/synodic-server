<template>
  <div>
    <LoginForm />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

// Redirect if already authenticated
if (authStore.isAuthenticated) {
  if (authStore.isAdmin || authStore.isStaff) {
    router.push('/teach');
  } else {
    router.push('/learn');
  }
}
</script> 