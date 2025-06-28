<template>
  <div class="min-h-screen w-full bg-gradient-to-br from-dark-primary via-dark-secondary to-orange-900/20 relative overflow-x-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 left-0 w-1/3 h-1/3 bg-orange-500/5 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-0 w-1/4 h-1/4 bg-blue-500/5 rounded-full blur-3xl"></div>
    </div>

    <!-- Header -->
    <MotionCard class="w-full bg-dark-secondary/80 backdrop-blur-lg border-b border-dark-border mb-8">
      <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Teaching Dashboard
            </h1>
            <p class="mt-2 text-lg text-text-secondary">
              Manage your courses, students, and assessments
            </p>
          </div>
          <div class="flex items-center space-x-4">
            <MotionButton color="orange" size="lg" @click="$router.push('/teach/courses/new')">
              <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Course
            </MotionButton>
            <div class="flex items-center space-x-3">
              <MotionAvatar
                :src="`https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=6366f1&color=fff`"
                :alt="`${user?.firstName} ${user?.lastName}`"
                size="md"
              />
              <div class="hidden md:block">
                <p class="text-sm font-medium text-text-primary">
                  {{ user?.firstName }} {{ user?.lastName }}
                </p>
                <p class="text-xs text-text-secondary">Teacher</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MotionCard>

    <!-- Main Content -->
    <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <MotionCard class="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <svg class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-text-secondary">Active Courses</p>
              <p class="text-2xl font-bold text-text-primary">{{ courseStore.activeCourses.length }}</p>
            </div>
          </div>
        </MotionCard>

        <MotionCard class="p-6 bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <svg class="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-text-secondary">Total Students</p>
              <p class="text-2xl font-bold text-text-primary">{{ totalStudents }}</p>
            </div>
          </div>
        </MotionCard>

        <MotionCard class="p-6 bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border-yellow-500/20">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="h-12 w-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <svg class="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-text-secondary">Pending Reviews</p>
              <p class="text-2xl font-bold text-text-primary">{{ pendingReviews }}</p>
            </div>
          </div>
        </MotionCard>

        <MotionCard class="p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                <svg class="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-text-secondary">Average Grade</p>
              <p class="text-2xl font-bold text-text-primary">{{ averageGrade }}%</p>
            </div>
          </div>
        </MotionCard>
      </div>

      <!-- Quick Actions -->
      <MotionCard class="bg-dark-secondary/80 backdrop-blur-lg mb-8">
        <div class="px-6 py-4 border-b border-dark-border">
          <h3 class="text-xl font-semibold text-text-primary">Quick Actions</h3>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MotionCard 
              class="p-4 cursor-pointer hover:scale-105 transition-transform bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20"
              @click="$router.push('/teach/courses/new')"
            >
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <svg class="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-text-primary">Create Course</p>
                  <p class="text-xs text-text-secondary">Start a new course</p>
                </div>
              </div>
            </MotionCard>

            <MotionCard 
              class="p-4 cursor-pointer hover:scale-105 transition-transform bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20"
              @click="$router.push('/teach/assessments/new')"
            >
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg class="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-text-primary">Create Assessment</p>
                  <p class="text-xs text-text-secondary">Add quiz or assignment</p>
                </div>
              </div>
            </MotionCard>

            <MotionCard 
              class="p-4 cursor-pointer hover:scale-105 transition-transform bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border-yellow-500/20"
              @click="$router.push('/teach/attendance')"
            >
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="h-10 w-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <svg class="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-text-primary">Take Attendance</p>
                  <p class="text-xs text-text-secondary">Mark student attendance</p>
                </div>
              </div>
            </MotionCard>

            <MotionCard 
              class="p-4 cursor-pointer hover:scale-105 transition-transform bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20"
              @click="$router.push('/teach/notices/new')"
            >
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <svg class="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                  </div>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-text-primary">Post Notice</p>
                  <p class="text-xs text-text-secondary">Announce to students</p>
                </div>
              </div>
            </MotionCard>
          </div>
        </div>
      </MotionCard>

      <!-- Recent Activity and Upcoming -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Recent Activity -->
        <MotionCard class="bg-dark-secondary/80 backdrop-blur-lg">
          <div class="px-6 py-4 border-b border-dark-border">
            <h3 class="text-xl font-semibold text-text-primary">Recent Activity</h3>
          </div>
          <div class="p-6">
            <div v-if="recentActivity.length === 0" class="text-center py-12">
              <div class="h-16 w-16 rounded-full bg-text-secondary/10 flex items-center justify-center mx-auto mb-4">
                <svg class="h-8 w-8 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 class="text-lg font-medium text-text-primary mb-2">No recent activity</h3>
              <p class="text-text-secondary">
                Start by creating a course or posting a notice.
              </p>
            </div>
            <div v-else class="space-y-4">
              <div
                v-for="activity in recentActivity"
                :key="activity.id"
                class="flex items-start space-x-4 p-4 rounded-lg hover:bg-dark-primary/50 transition-colors"
              >
                <div class="flex-shrink-0">
                  <div class="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <svg class="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-text-primary mb-1">
                    {{ activity.title }}
                  </p>
                  <p class="text-sm text-text-secondary mb-1">
                    {{ activity.description }}
                  </p>
                  <p class="text-xs text-text-secondary">
                    {{ formatDate(activity.timestamp) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </MotionCard>

        <!-- Upcoming Deadlines -->
        <MotionCard class="bg-dark-secondary/80 backdrop-blur-lg">
          <div class="px-6 py-4 border-b border-dark-border">
            <h3 class="text-xl font-semibold text-text-primary">Upcoming Deadlines</h3>
          </div>
          <div class="p-6">
            <div v-if="upcomingDeadlines.length === 0" class="text-center py-12">
              <div class="h-16 w-16 rounded-full bg-text-secondary/10 flex items-center justify-center mx-auto mb-4">
                <svg class="h-8 w-8 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 class="text-lg font-medium text-text-primary mb-2">No upcoming deadlines</h3>
              <p class="text-text-secondary">
                All assessments are up to date!
              </p>
            </div>
            <div v-else class="space-y-4">
              <div
                v-for="deadline in upcomingDeadlines"
                :key="deadline.id"
                class="flex items-start space-x-4 p-4 rounded-lg hover:bg-dark-primary/50 transition-colors"
              >
                <div class="flex-shrink-0">
                  <div class="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center">
                    <svg class="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-text-primary mb-1">
                    {{ deadline.title }}
                  </p>
                  <p class="text-sm text-text-secondary mb-1">
                    {{ deadline.course }}
                  </p>
                  <p class="text-xs text-red-400 font-medium">
                    Due {{ formatDate(deadline.dueDate) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </MotionCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
import { useCourseStore } from '~/stores/courseStore';
import { useAssessmentStore } from '~/stores/assessmentStore';
import MotionCard from '~/components/MotionCard.vue';
import MotionButton from '~/components/MotionButton.vue';
import MotionAvatar from '~/components/MotionAvatar.vue';

definePageMeta({
  layout: 'teach'
});

const authStore = useAuthStore();
const courseStore = useCourseStore();
const assessmentStore = useAssessmentStore();

const user = computed(() => authStore.user);

// Computed properties for dashboard data
const totalStudents = computed(() => {
  return courseStore.activeCourses.reduce((total, course) => total + (course.studentCount || 0), 0);
});

const pendingReviews = computed(() => {
  // Mock data - replace with real API call
  return 8;
});

const averageGrade = computed(() => {
  // Mock data - replace with real API call
  return 82;
});

const recentActivity = computed(() => {
  // Mock data - replace with real API call
  return [
    {
      id: 1,
      title: 'Course created',
      description: 'Advanced Mathematics 301',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: 2,
      title: 'Assessment graded',
      description: 'Calculus Quiz - 15 submissions',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000)
    }
  ];
});

const upcomingDeadlines = computed(() => {
  // Mock data - replace with real API call
  return [
    {
      id: 1,
      title: 'Final Project Review',
      course: 'Computer Science 201',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    },
    {
      id: 2,
      title: 'Research Paper Grading',
      course: 'Physics 101',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
  ];
});

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Load data on mount
onMounted(async () => {
  await Promise.all([
    courseStore.fetchCourses(),
    assessmentStore.fetchAssessments()
  ]);
});
</script> 