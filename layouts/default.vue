<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <NuxtLink to="/" class="text-xl font-bold text-indigo-600">
                Synodic Synergy
              </NuxtLink>
            </div>
          </div>

          <div class="flex items-center">
            <template v-if="authStore.isAuthenticated">
              <div class="ml-3 relative">
                <div class="flex items-center space-x-4">
                  <span class="text-gray-700">
                    {{ authStore.user?.firstName }} {{ authStore.user?.lastName }}
                  </span>
                  <button
                    @click="handleLogout"
                    class="text-gray-700 hover:text-gray-900"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </template>
            <template v-else>
              <NuxtLink
                to="/login"
                class="text-gray-700 hover:text-gray-900"
              >
                Sign in
              </NuxtLink>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.clearAuth();
  router.push('/login');
};
</script> 