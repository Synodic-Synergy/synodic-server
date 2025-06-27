<template>
  <div class="min-h-screen bg-dark-primary">
    <!-- Navigation -->
    <nav class="bg-dark-secondary border-b border-dark-border">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <NuxtLink to="/teach" class="text-xl font-bold text-text-primary">
              Synodic Teach
            </NuxtLink>
          </div>
          <div class="flex items-center space-x-4">
            <NuxtLink to="/teach/courses" class="text-text-secondary hover:text-text-primary">
              Courses
            </NuxtLink>
            <NuxtLink to="/teach/assessments" class="text-text-secondary hover:text-text-primary">
              Assessments
            </NuxtLink>
            <NuxtLink to="/teach/notices" class="text-text-secondary hover:text-text-primary">
              Notices
            </NuxtLink>
            <NuxtLink to="/teach/attendance" class="text-text-secondary hover:text-text-primary">
              Attendance
            </NuxtLink>
            <div class="flex items-center space-x-2">
              <span class="text-text-secondary">{{ authStore.user?.firstName }}</span>
              <button @click="logout" class="text-text-secondary hover:text-text-primary">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();

const logout = async () => {
  try {
    await authStore.logout();
    await navigateTo('/login');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
</script> 