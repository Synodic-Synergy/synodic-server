<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div>
      <label for="email" class="block text-sm font-medium text-text-secondary mb-1">
        Email
      </label>
      <input
        id="email"
        v-model="email"
        type="email"
        required
        class="input w-full"
        placeholder="Enter your email"
      />
    </div>

    <div>
      <label for="password" class="block text-sm font-medium text-text-secondary mb-1">
        Password
      </label>
      <input
        id="password"
        v-model="password"
        type="password"
        required
        class="input w-full"
        placeholder="Enter your password"
      />
    </div>

    <div v-if="error" class="text-red-500 text-sm">
      {{ error }}
    </div>

    <button
      type="submit"
      class="btn-primary w-full"
      :disabled="loading"
    >
      <span v-if="loading" class="flex items-center justify-center">
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Signing in...
      </span>
      <span v-else>Sign In</span>
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');

const authStore = useAuthStore();
const router = useRouter();

const handleSubmit = async () => {
  loading.value = true;
  error.value = '';

  try {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value
      }
    });

    authStore.setAuth(response);
    
    // Redirect based on role
    if (authStore.isAdmin || authStore.isStaff) {
      router.push('/teach');
    } else {
      router.push('/learn');
    }
  } catch (e: any) {
    error.value = e.data?.message || 'An error occurred during login';
  } finally {
    loading.value = false;
  }
};
</script> 