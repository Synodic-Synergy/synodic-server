<template>
  <div class="min-h-[80vh] flex items-center justify-center">
    <div class="card w-full max-w-md animate-fade-in">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold mb-2">
          <span class="text-orange-500">Admin</span>
          <span class="text-text-primary"> Setup</span>
        </h1>
        <p class="text-text-secondary">
          Create the first admin account for your system
        </p>
      </div>

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
          <label for="firstName" class="block text-sm font-medium text-text-secondary mb-1">
            First Name
          </label>
          <input
            id="firstName"
            v-model="firstName"
            type="text"
            required
            class="input w-full"
            placeholder="Enter your first name"
          />
        </div>

        <div>
          <label for="lastName" class="block text-sm font-medium text-text-secondary mb-1">
            Last Name
          </label>
          <input
            id="lastName"
            v-model="lastName"
            type="text"
            required
            class="input w-full"
            placeholder="Enter your last name"
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

        <div>
          <label for="setupKey" class="block text-sm font-medium text-text-secondary mb-1">
            Setup Key
          </label>
          <input
            id="setupKey"
            v-model="setupKey"
            type="password"
            required
            class="input w-full"
            placeholder="Enter the setup key"
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
            Creating account...
          </span>
          <span v-else>Create Admin Account</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const firstName = ref('');
const lastName = ref('');
const setupKey = ref('');
const loading = ref(false);
const error = ref('');

const authStore = useAuthStore();
const router = useRouter();

const handleSubmit = async () => {
  loading.value = true;
  error.value = '';

  try {
    const response = await $fetch('/api/auth/register-admin', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value,
        setupKey: setupKey.value
      }
    });

    authStore.setAuth(response);
    router.push('/teach');
  } catch (e: any) {
    error.value = e.data?.message || 'An error occurred during registration';
  } finally {
    loading.value = false;
  }
};
</script> 