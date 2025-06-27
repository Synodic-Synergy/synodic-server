<template>
  <div class="min-h-screen bg-dark-primary">
    <!-- Header -->
    <div class="bg-dark-secondary border-b border-dark-border">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-3xl font-bold text-text-primary">
              Teaching Dashboard
            </h1>
            <p class="mt-1 text-sm text-text-secondary">
              Manage your courses, students, and assessments
            </p>
          </div>
          <div class="flex items-center space-x-4">
            <NuxtLink
              to="/teach/courses/new"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
            >
              <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Course
            </NuxtLink>
            <div class="flex items-center space-x-3">
              <img
                class="h-8 w-8 rounded-full"
                :src="`https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=6366f1&color=fff`"
                :alt="`${user?.firstName} ${user?.lastName}`"
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
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-dark-secondary border border-dark-border rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-text-secondary truncate">
                    Active Courses
                  </dt>
                  <dd class="text-lg font-medium text-text-primary">
                    {{ courseStore.activeCourses.length }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-dark-secondary border border-dark-border rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-text-secondary truncate">
                    Total Students
                  </dt>
                  <dd class="text-lg font-medium text-text-primary">
                    {{ totalStudents }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-dark-secondary border border-dark-border rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-text-secondary truncate">
                    Pending Reviews
                  </dt>
                  <dd class="text-lg font-medium text-text-primary">
                    {{ pendingReviews }}
                  </dd>
                </dl>
        </div>
      </div>
          </div>
        </div>
        <div class="bg-dark-secondary border border-dark-border rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-text-secondary truncate">
                    Average Grade
                  </dt>
                  <dd class="text-lg font-medium text-text-primary">
                    {{ averageGrade }}%
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-dark-secondary border border-dark-border rounded-lg mb-8">
        <div class="px-6 py-4 border-b border-dark-border">
          <h3 class="text-lg font-medium text-text-primary">Quick Actions</h3>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <NuxtLink
              to="/teach/courses/new"
              class="flex items-center p-4 border border-dark-border rounded-lg hover:bg-dark-primary transition-colors"
            >
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-text-primary">Create Course</p>
                <p class="text-xs text-text-secondary">Start a new course</p>
              </div>
            </NuxtLink>

            <NuxtLink
              to="/teach/assessments/new"
              class="flex items-center p-4 border border-dark-border rounded-lg hover:bg-dark-primary transition-colors"
            >
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-text-primary">Create Assessment</p>
                <p class="text-xs text-text-secondary">Add quiz or assignment</p>
              </div>
            </NuxtLink>

            <NuxtLink
              to="/teach/attendance"
              class="flex items-center p-4 border border-dark-border rounded-lg hover:bg-dark-primary transition-colors"
            >
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-text-primary">Take Attendance</p>
                <p class="text-xs text-text-secondary">Mark student attendance</p>
              </div>
            </NuxtLink>

            <NuxtLink
              to="/teach/notices/new"
              class="flex items-center p-4 border border-dark-border rounded-lg hover:bg-dark-primary transition-colors"
            >
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-text-primary">Post Notice</p>
                <p class="text-xs text-text-secondary">Announce to students</p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Recent Activity and Pending Reviews -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Recent Activity -->
        <div class="bg-dark-secondary border border-dark-border rounded-lg">
          <div class="px-6 py-4 border-b border-dark-border">
            <h3 class="text-lg font-medium text-text-primary">Recent Activity</h3>
          </div>
          <div class="p-6">
            <div v-if="recentActivity.length === 0" class="text-center py-8">
              <svg class="mx-auto h-12 w-12 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 class="mt-2 text-sm font-medium text-text-primary">No recent activity</h3>
              <p class="mt-1 text-sm text-text-secondary">
                Start by creating a course or posting a notice.
              </p>
            </div>
            <div v-else class="space-y-4">
              <div
                v-for="activity in recentActivity"
                :key="activity.id"
                class="flex items-start space-x-3"
              >
                <div class="flex-shrink-0">
                  <div class="h-8 w-8 rounded-full bg-blue-900 flex items-center justify-center">
                    <svg class="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-text-primary">
                    {{ activity.title }}
                  </p>
                  <p class="text-sm text-text-secondary">
                    {{ activity.description }}
                  </p>
                  <p class="text-xs text-text-secondary">
                    {{ formatDate(activity.timestamp) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pending Reviews -->
        <div class="bg-dark-secondary border border-dark-border rounded-lg">
          <div class="px-6 py-4 border-b border-dark-border">
            <h3 class="text-lg font-medium text-text-primary">Pending Reviews</h3>
          </div>
          <div class="p-6">
            <div v-if="pendingReviewsList.length === 0" class="text-center py-8">
              <svg class="mx-auto h-12 w-12 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 class="mt-2 text-sm font-medium text-text-primary">No pending reviews</h3>
              <p class="mt-1 text-sm text-text-secondary">
                All submissions have been reviewed!
              </p>
            </div>
            <div v-else class="space-y-4">
              <div
                v-for="review in pendingReviewsList"
                :key="review.id"
                class="flex items-center justify-between p-4 border border-dark-border rounded-lg"
              >
                <div class="flex-1">
                  <h4 class="text-sm font-medium text-text-primary">
                    {{ review.title }}
                  </h4>
                  <p class="text-sm text-text-secondary">
                    {{ review.studentName }} - {{ review.courseName }}
                  </p>
                  <p class="text-xs text-text-secondary">
                    Submitted {{ formatDate(review.submittedAt) }}
                  </p>
                </div>
                <NuxtLink
                  :to="`/teach/assessments/${review.assessmentId}/submissions/${review.id}`"
                  class="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 dark:text-blue-300 dark:bg-blue-900 dark:hover:bg-blue-800"
                >
                  Review
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- My Courses -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-text-primary">My Courses</h2>
          <NuxtLink
            to="/teach/courses"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
          >
            View All Courses
          </NuxtLink>
        </div>

        <div v-if="courseStore.loading" class="text-center py-12">
          <div class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-orange-500 hover:bg-orange-400 transition ease-in-out duration-150 cursor-not-allowed">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading courses...
          </div>
        </div>

        <div v-else-if="courseStore.activeCourses.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-text-primary">No courses yet</h3>
          <p class="mt-1 text-sm text-text-secondary">
            Get started by creating your first course.
          </p>
          <div class="mt-6">
            <NuxtLink
              to="/teach/courses/new"
              class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
            >
              Create Course
            </NuxtLink>
          </div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="course in courseStore.activeCourses.slice(0, 6)"
            :key="course.id"
            class="bg-dark-secondary border border-dark-border rounded-lg overflow-hidden hover:border-orange-500 transition-colors"
          >
            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-medium text-text-primary truncate">
                  {{ course.title }}
                </h3>
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    course.status === 'active' ? 'bg-green-900 text-green-200' :
                    course.status === 'draft' ? 'bg-yellow-900 text-yellow-200' :
                    'bg-gray-900 text-gray-200'
                  ]"
                >
                  {{ course.status }}
                </span>
              </div>
              <p class="text-sm text-text-secondary mb-4 line-clamp-2">
                {{ course.description }}
              </p>
              <div class="flex items-center justify-between text-sm text-text-secondary mb-4">
                <span>{{ course.studentCount }} students</span>
                <span>{{ course.category }}</span>
              </div>
              <div class="flex items-center justify-between">
                <NuxtLink
                  :to="`/teach/courses/${course.id}`"
                  class="text-orange-500 hover:text-orange-400 text-sm font-medium"
                >
                  Manage Course
                </NuxtLink>
                <div class="flex space-x-2">
                  <NuxtLink
                    :to="`/teach/courses/${course.id}/students`"
                    class="text-text-secondary hover:text-text-primary text-sm"
                  >
                    Students
                  </NuxtLink>
                  <NuxtLink
                    :to="`/teach/courses/${course.id}/assessments`"
                    class="text-text-secondary hover:text-text-primary text-sm"
                  >
                    Assessments
                  </NuxtLink>
                </div>
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
import { useCourseStore } from '~/stores/courseStore';

// Page metadata
definePageMeta({
  layout: 'teach'
});

// Stores
const authStore = useAuthStore();
const courseStore = useCourseStore();

// Computed
const user = computed(() => authStore.user);
const totalStudents = computed(() => {
  return courseStore.activeCourses.reduce((total, course) => total + course.studentCount, 0);
});
const pendingReviews = ref(8); // Placeholder
const averageGrade = ref(82); // Placeholder

// Mock data for demonstration
const recentActivity = ref([
  {
    id: '1',
    title: 'New student enrolled',
    description: 'John Doe enrolled in "Web Development" course',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  },
  {
    id: '2',
    title: 'Assignment submitted',
    description: '5 new submissions for "Final Project"',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
  }
]);

const pendingReviewsList = ref([
  {
    id: '1',
    title: 'Final Project Submission',
    studentName: 'John Doe',
    courseName: 'Web Development',
    assessmentId: 'assess-1',
    submittedAt: new Date(Date.now() - 3 * 60 * 60 * 1000) // 3 hours ago
  },
  {
    id: '2',
    title: 'Quiz: Chapter 5',
    studentName: 'Jane Smith',
    courseName: 'Data Structures',
    assessmentId: 'assess-2',
    submittedAt: new Date(Date.now() - 6 * 60 * 60 * 1000) // 6 hours ago
  }
]);

// Methods
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Lifecycle
onMounted(async () => {
  await courseStore.fetchCourses();
});
</script> 