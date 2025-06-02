<template>
  <div class="bg-white">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span class="block">Welcome to</span>
          <span class="block text-indigo-600">Synodic Synergy</span>
        </h1>
        <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          An open-source, self-hostable education management system that empowers both students and teachers.
        </p>
        <div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div class="rounded-md shadow">
            <NuxtLink
              to="/login"
              class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
            >
              Get started
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-gray-50">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                For Students
              </h3>
              <div class="mt-2 max-w-xl text-sm text-gray-500">
                <p>Access your courses, submit assignments, and track your progress all in one place.</p>
              </div>
              <div class="mt-5">
                <NuxtLink
                  to="/learn"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                >
                  Go to Learn
                </NuxtLink>
              </div>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                For Teachers
              </h3>
              <div class="mt-2 max-w-xl text-sm text-gray-500">
                <p>Manage courses, create assessments, and track student progress efficiently.</p>
              </div>
              <div class="mt-5">
                <NuxtLink
                  to="/teach"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                >
                  Go to Teach
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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