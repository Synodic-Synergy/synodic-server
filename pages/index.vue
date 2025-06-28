<template>
  <div class="min-h-screen w-full bg-gradient-to-br from-dark-primary via-dark-secondary to-orange-900/30 relative overflow-x-hidden">
    <!-- Animated Blurred Background SVGs -->
    <div class="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
      <svg class="absolute top-0 left-0 w-1/2 h-96 opacity-30 blur-2xl" viewBox="0 0 400 400">
        <circle cx="200" cy="200" r="200" fill="#f59e42" fill-opacity="0.2" />
      </svg>
      <svg class="absolute bottom-0 right-0 w-1/3 h-80 opacity-40 blur-3xl" viewBox="0 0 400 400">
        <rect x="0" y="0" width="400" height="400" rx="200" fill="#6366f1" fill-opacity="0.18" />
      </svg>
    </div>

    <!-- Hero Section -->
    <section class="relative z-10 flex flex-col items-center justify-center py-24 w-full">
      <MotionCard class="w-full max-w-3xl mx-auto p-12 flex flex-col items-center text-center bg-dark-secondary/80 shadow-2xl">
        <h1 class="text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-200 to-white animate-gradient-x">
          Welcome to <span class="text-orange-500 drop-shadow-lg">Synodic Synergy</span>
        </h1>
        <p class="mt-6 text-xl text-text-secondary max-w-2xl mx-auto animate-fade-in">
          Your school's integrated learning management system. Access your courses, assignments, and resources all in one place.
        </p>
        <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <MotionButton color="orange" size="lg" @click="$router.push('/login')">
            <span class="font-bold tracking-wide">Sign In</span>
          </MotionButton>
          <MotionButton color="gray" size="lg" @click="$router.push('/learn/courses')">
            <span class="font-bold tracking-wide">Browse Courses</span>
          </MotionButton>
        </div>
      </MotionCard>
    </section>

    <!-- Quick Access Section -->
    <section class="relative z-10 py-20 w-full">
      <div class="w-full max-w-7xl mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-2xl md:text-3xl font-bold text-orange-400 tracking-wide uppercase animate-fade-in">Quick Access</h2>
          <p class="mt-2 text-4xl font-extrabold tracking-tight text-text-primary animate-fade-in">Everything you need</p>
          <p class="mt-4 max-w-2xl text-xl text-text-secondary mx-auto animate-fade-in">Access your learning resources and stay connected with your education journey.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          <MotionCard class="flex flex-col items-center justify-center p-8 cursor-pointer group hover:scale-105">
            <div class="flex items-center justify-center h-16 w-16 rounded-full bg-orange-500/80 text-white mb-4 group-hover:scale-110 transition-transform">
              <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-text-primary mb-2">Courses</h3>
            <p class="text-base text-text-secondary">Access your course materials, assignments, and resources.</p>
          </MotionCard>
          <MotionCard class="flex flex-col items-center justify-center p-8 cursor-pointer group hover:scale-105">
            <div class="flex items-center justify-center h-16 w-16 rounded-full bg-orange-500/80 text-white mb-4 group-hover:scale-110 transition-transform">
              <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-text-primary mb-2">Assignments</h3>
            <p class="text-base text-text-secondary">View and submit your assignments, track your progress.</p>
          </MotionCard>
          <MotionCard class="flex flex-col items-center justify-center p-8 cursor-pointer group hover:scale-105">
            <div class="flex items-center justify-center h-16 w-16 rounded-full bg-orange-500/80 text-white mb-4 group-hover:scale-110 transition-transform">
              <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-text-primary mb-2">Schedule</h3>
            <p class="text-base text-text-secondary">View your class schedule and important dates.</p>
          </MotionCard>
          <MotionCard class="flex flex-col items-center justify-center p-8 cursor-pointer group hover:scale-105">
            <div class="flex items-center justify-center h-16 w-16 rounded-full bg-orange-500/80 text-white mb-4 group-hover:scale-110 transition-transform">
              <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-text-primary mb-2">Notifications</h3>
            <p class="text-base text-text-secondary">Stay updated with important announcements and alerts.</p>
          </MotionCard>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import MotionCard from '~/components/MotionCard.vue'
import MotionButton from '~/components/MotionButton.vue'

definePageMeta({
  layout: 'default'
});
</script> 