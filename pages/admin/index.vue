<template>
  <div class="min-h-screen bg-dark-primary">
    <!-- Header -->
    <div class="bg-dark-secondary border-b border-dark-border">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-3xl font-bold text-text-primary">
              Admin Dashboard
            </h1>
            <p class="mt-1 text-sm text-text-secondary">
              System administration and user management
            </p>
          </div>
          <div class="flex items-center space-x-4">
            <NuxtLink
              to="/admin/users/new"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
            >
              <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add User
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
                <p class="text-xs text-text-secondary">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- System Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-dark-secondary border border-dark-border rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-text-secondary truncate">
                    Total Users
                  </dt>
                  <dd class="text-lg font-medium text-text-primary">
                    {{ systemStats.totalUsers }}
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-text-secondary truncate">
                    Active Courses
                  </dt>
                  <dd class="text-lg font-medium text-text-primary">
                    {{ systemStats.activeCourses }}
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
                    {{ systemStats.pendingReviews }}
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
                    System Health
                  </dt>
                  <dd class="text-lg font-medium text-text-primary">
                    {{ systemStats.systemHealth }}%
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
              to="/admin/users/new"
              class="flex items-center p-4 border border-dark-border rounded-lg hover:bg-dark-primary transition-colors"
            >
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-text-primary">Add User</p>
                <p class="text-xs text-text-secondary">Create new account</p>
              </div>
            </NuxtLink>

            <NuxtLink
              to="/admin/courses"
              class="flex items-center p-4 border border-dark-border rounded-lg hover:bg-dark-primary transition-colors"
            >
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-text-primary">Manage Courses</p>
                <p class="text-xs text-text-secondary">View all courses</p>
              </div>
            </NuxtLink>

            <NuxtLink
              to="/admin/reports"
              class="flex items-center p-4 border border-dark-border rounded-lg hover:bg-dark-primary transition-colors"
            >
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-text-primary">View Reports</p>
                <p class="text-xs text-text-secondary">System analytics</p>
              </div>
            </NuxtLink>

            <NuxtLink
              to="/admin/settings"
              class="flex items-center p-4 border border-dark-border rounded-lg hover:bg-dark-primary transition-colors"
            >
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-text-primary">System Settings</p>
                <p class="text-xs text-text-secondary">Configure system</p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- User Management and System Overview -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Recent Users -->
        <div class="bg-dark-secondary border border-dark-border rounded-lg">
          <div class="px-6 py-4 border-b border-dark-border flex justify-between items-center">
            <h3 class="text-lg font-medium text-text-primary">Recent Users</h3>
            <NuxtLink
              to="/admin/users"
              class="text-sm text-orange-500 hover:text-orange-400"
            >
              View all
            </NuxtLink>
          </div>
          <div class="p-6">
            <div v-if="recentUsers.length === 0" class="text-center py-8">
              <svg class="mx-auto h-12 w-12 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 class="mt-2 text-sm font-medium text-text-primary">No users yet</h3>
              <p class="mt-1 text-sm text-text-secondary">
                Start by adding the first user to the system.
              </p>
            </div>
            <div v-else class="space-y-4">
              <div
                v-for="user in recentUsers"
                :key="user.id"
                class="flex items-center justify-between p-4 border border-dark-border rounded-lg"
              >
                <div class="flex items-center space-x-3">
                  <img
                    class="h-8 w-8 rounded-full"
                    :src="`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=6366f1&color=fff`"
                    :alt="`${user.firstName} ${user.lastName}`"
                  />
                  <div>
                    <p class="text-sm font-medium text-text-primary">
                      {{ user.firstName }} {{ user.lastName }}
                    </p>
                    <p class="text-xs text-text-secondary">{{ user.email }}</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <span
                    :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      user.role === 'admin' ? 'bg-red-900 text-red-200' :
                      user.role === 'staff' ? 'bg-blue-900 text-blue-200' :
                      'bg-green-900 text-green-200'
                    ]"
                  >
                    {{ user.role }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- System Activity -->
        <div class="bg-dark-secondary border border-dark-border rounded-lg">
          <div class="px-6 py-4 border-b border-dark-border">
            <h3 class="text-lg font-medium text-text-primary">System Activity</h3>
          </div>
          <div class="p-6">
            <div v-if="systemActivity.length === 0" class="text-center py-8">
              <svg class="mx-auto h-12 w-12 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h3 class="mt-2 text-sm font-medium text-text-primary">No recent activity</h3>
              <p class="mt-1 text-sm text-text-secondary">
                System activity will appear here.
              </p>
            </div>
            <div v-else class="space-y-4">
              <div
                v-for="activity in systemActivity"
                :key="activity.id"
                class="flex items-start space-x-3"
              >
                <div class="flex-shrink-0">
                  <div class="h-8 w-8 rounded-full bg-blue-900 flex items-center justify-center">
                    <svg class="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
      </div>

      <!-- All Courses Overview -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-text-primary">All Courses</h2>
          <NuxtLink
            to="/admin/courses"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
          >
            Manage Courses
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

        <div v-else-if="courseStore.courses.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-text-primary">No courses yet</h3>
          <p class="mt-1 text-sm text-text-secondary">
            Teachers can create courses once they're added to the system.
          </p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="course in courseStore.courses.slice(0, 6)"
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
                <span>{{ course.teacherName }}</span>
                <span>{{ course.studentCount }} students</span>
              </div>
              <div class="flex items-center justify-between">
                <NuxtLink
                  :to="`/admin/courses/${course.id}`"
                  class="text-orange-500 hover:text-orange-400 text-sm font-medium"
                >
                  View Details
                </NuxtLink>
                <div class="flex space-x-2">
                  <span class="text-xs text-text-secondary">{{ course.category }}</span>
                  <span class="text-xs text-text-secondary">{{ course.level }}</span>
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
import { useAdminStore } from '~/stores/adminStore';

// Page metadata
definePageMeta({
  layout: 'default'
});

// Stores
const authStore = useAuthStore();
const courseStore = useCourseStore();
const adminStore = useAdminStore();

// Computed
const user = computed(() => authStore.user);
const systemStats = computed(() => adminStore.systemStats);
const recentUsers = computed(() => adminStore.recentUsers);
const systemActivity = computed(() => adminStore.systemActivity);

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
  await Promise.all([
    courseStore.fetchCourses(),
    adminStore.fetchSystemStats(),
    adminStore.fetchRecentUsers(),
    adminStore.fetchSystemActivity()
  ]);
});
</script> 