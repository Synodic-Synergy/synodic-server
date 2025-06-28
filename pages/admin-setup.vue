<template>
  <div class="min-h-screen w-full bg-gradient-to-br from-dark-primary via-dark-secondary to-orange-900/30 relative overflow-hidden flex items-center justify-center">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
    </div>

    <!-- Main Content -->
    <MotionCard class="w-full max-w-md p-8 bg-dark-secondary/90 backdrop-blur-xl shadow-2xl">
      <div class="text-center mb-8">
        <div class="h-16 w-16 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-4">
          <svg class="h-8 w-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h1 class="text-4xl font-bold mb-3">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Admin</span>
          <span class="text-text-primary"> Setup</span>
        </h1>
        <p class="text-text-secondary text-lg">
          Create the first admin account for your system
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-text-secondary mb-2">
            Email
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="w-full px-4 py-3 bg-dark-primary/50 border border-dark-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label for="firstName" class="block text-sm font-medium text-text-secondary mb-2">
            First Name
          </label>
          <input
            id="firstName"
            v-model="firstName"
            type="text"
            required
            class="w-full px-4 py-3 bg-dark-primary/50 border border-dark-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            placeholder="Enter your first name"
          />
        </div>

        <div>
          <label for="lastName" class="block text-sm font-medium text-text-secondary mb-2">
            Last Name
          </label>
          <input
            id="lastName"
            v-model="lastName"
            type="text"
            required
            class="w-full px-4 py-3 bg-dark-primary/50 border border-dark-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            placeholder="Enter your last name"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-text-secondary mb-2">
            Password
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="w-full px-4 py-3 bg-dark-primary/50 border border-dark-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            placeholder="Enter your password"
          />
        </div>

        <div>
          <label for="setupKey" class="block text-sm font-medium text-text-secondary mb-2">
            Setup Key
          </label>
          <input
            id="setupKey"
            v-model="setupKey"
            type="password"
            required
            class="w-full px-4 py-3 bg-dark-primary/50 border border-dark-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            placeholder="Enter the setup key"
          />
        </div>

        <div v-if="error" class="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p class="text-red-400 text-sm">{{ error }}</p>
        </div>

        <MotionButton
          type="submit"
          color="orange"
          size="lg"
          class="w-full"
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
        </MotionButton>
      </form>
    </MotionCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';
import MotionCard from '~/components/MotionCard.vue';
import MotionButton from '~/components/MotionButton.vue';

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