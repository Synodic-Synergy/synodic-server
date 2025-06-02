<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <div class="relative overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div class="sm:text-center lg:text-left">
              <h1 class="text-4xl tracking-tight font-extrabold text-text-primary sm:text-5xl md:text-6xl">
                <span class="block">Welcome to</span>
                <span class="block text-orange-500">Synodic Synergy</span>
              </h1>
              <p class="mt-3 text-base text-text-secondary sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Your school's integrated learning management system. Access your courses, assignments, and resources all in one place.
              </p>
              <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div class="rounded-md shadow">
                  <NuxtLink to="/login" class="btn-primary w-full flex items-center justify-center px-8 py-3 text-base font-medium md:py-4 md:text-lg md:px-10">
                    Sign In
                  </NuxtLink>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>

    <!-- Quick Access Section -->
    <div class="py-12 bg-dark-secondary">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2 class="text-base text-orange-500 font-semibold tracking-wide uppercase">Quick Access</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-text-primary sm:text-4xl">
            Everything you need
          </p>
          <p class="mt-4 max-w-2xl text-xl text-text-secondary lg:mx-auto">
            Access your learning resources and stay connected with your education journey.
          </p>
        </div>

        <div class="mt-10">
          <div class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div class="card">
              <div class="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div class="mt-5">
                <h3 class="text-lg leading-6 font-medium text-text-primary">Courses</h3>
                <p class="mt-2 text-base text-text-secondary">
                  Access your course materials, assignments, and resources.
                </p>
              </div>
            </div>

            <div class="card">
              <div class="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div class="mt-5">
                <h3 class="text-lg leading-6 font-medium text-text-primary">Assignments</h3>
                <p class="mt-2 text-base text-text-secondary">
                  View and submit your assignments, track your progress.
                </p>
              </div>
            </div>

            <div class="card">
              <div class="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="mt-5">
                <h3 class="text-lg leading-6 font-medium text-text-primary">Schedule</h3>
                <p class="mt-2 text-base text-text-secondary">
                  View your class schedule and important dates.
                </p>
              </div>
            </div>

            <div class="card">
              <div class="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <div class="mt-5">
                <h3 class="text-lg leading-6 font-medium text-text-primary">Notifications</h3>
                <p class="mt-2 text-base text-text-secondary">
                  Stay updated with important announcements and alerts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
});
</script> 