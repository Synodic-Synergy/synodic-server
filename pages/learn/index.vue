<template>
  <div class="min-h-screen bg-dark-primary">
    <!-- Header -->
    <div class="bg-dark-secondary border-b border-dark-border">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-3xl font-bold text-text-primary">
              Welcome back, {{ user?.firstName }}!
            </h1>
            <p class="mt-1 text-sm text-text-secondary">
              Here's what's happening with your courses today
            </p>
          </div>
          <div class="flex items-center space-x-4">
            <div class="relative">
              <button
                @click="showNotifications = !showNotifications"
                class="relative p-2 text-text-secondary hover:text-orange-500"
              >
                <span class="sr-only">View notifications</span>
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span
                  v-if="unreadNotifications > 0"
                  class="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                >
                  {{ unreadNotifications }}
                </span>
              </button>
            </div>
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
                <p class="text-xs text-text-secondary">Student</p>
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
                    {{ courseStore.myCourses.length }}
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-text-secondary truncate">
                    Completed Assignments
                  </dt>
                  <dd class="text-lg font-medium text-text-primary">
                    {{ completedAssignments }}
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-text-secondary truncate">
                    Pending Assignments
                  </dt>
                  <dd class="text-lg font-medium text-text-primary">
                    {{ pendingAssignments }}
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

      <!-- Recent Activity and Upcoming -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                Get started by enrolling in a course or completing an assignment.
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

        <!-- Upcoming Deadlines -->
        <div class="bg-dark-secondary border border-dark-border rounded-lg">
          <div class="px-6 py-4 border-b border-dark-border">
            <h3 class="text-lg font-medium text-text-primary">Upcoming Deadlines</h3>
          </div>
          <div class="p-6">
            <div v-if="upcomingDeadlines.length === 0" class="text-center py-8">
              <svg class="mx-auto h-12 w-12 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 class="mt-2 text-sm font-medium text-text-primary">No upcoming deadlines</h3>
              <p class="mt-1 text-sm text-text-secondary">
                You're all caught up! Check back later for new assignments.
              </p>
            </div>
            <div v-else class="space-y-4">
              <div
                v-for="deadline in upcomingDeadlines"
                :key="deadline.id"
                class="flex items-center justify-between p-4 border border-dark-border rounded-lg"
              >
                <div class="flex-1">
                  <h4 class="text-sm font-medium text-text-primary">
                    {{ deadline.title }}
                  </h4>
                  <p class="text-sm text-text-secondary">
                    {{ deadline.courseName }}
                  </p>
                  <p class="text-xs text-text-secondary">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900 text-blue-200">
                      Due
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- My Courses -->
      <div class="mt-8">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-text-primary">My Courses</h2>
          <NuxtLink
            to="/learn/courses"
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

        <div v-else-if="courseStore.myCourses.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-text-primary">No courses enrolled</h3>
          <p class="mt-1 text-sm text-text-secondary">
            Get started by enrolling in your first course.
          </p>
          <div class="mt-6">
            <NuxtLink
              to="/learn/courses"
              class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
            >
              Browse Courses
            </NuxtLink>
          </div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="course in courseStore.myCourses.slice(0, 6)"
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
                    course.level === 'beginner' ? 'bg-green-900 text-green-200' :
                    course.level === 'intermediate' ? 'bg-yellow-900 text-yellow-200' :
                    'bg-red-900 text-red-200'
                  ]"
                >
                  {{ course.level }}
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
                  :to="`/learn/courses/${course.id}`"
                  class="text-orange-500 hover:text-orange-400 text-sm font-medium"
                >
                  View Course
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
import { computed, ref, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useCourseStore } from '~/stores/courseStore';
import { useAssessmentStore } from '~/stores/assessmentStore';
import { useNoticeStore } from '~/stores/noticeStore';
import { useAttendanceStore } from '~/stores/attendanceStore';

// Page metadata
definePageMeta({
  layout: 'learn'
});

// Stores
const authStore = useAuthStore();
const courseStore = useCourseStore();
const assessmentStore = useAssessmentStore();
const noticeStore = useNoticeStore();
const attendanceStore = useAttendanceStore();

// Reactive data
const showNotifications = ref(false);

// Fetch all data on mount
onMounted(async () => {
  await Promise.all([
    courseStore.fetchCourses(),
    assessmentStore.fetchAssessments(),
    noticeStore.fetchNotices(),
    attendanceStore.fetchAttendance()
  ]);
});

// Dashboard stats
const completedAssignments = computed(() =>
  assessmentStore.assessments.filter(a => a.status === 'closed').length
);
const pendingAssignments = computed(() =>
  assessmentStore.assessments.filter(a => a.status === 'published').length
);
const averageGrade = computed(() => 0);
const recentActivity = computed(() => {
  const activities: { id: string; title: string; description: string; timestamp: Date }[] = [];
  assessmentStore.assessments.forEach(a => {
    activities.push({
      id: a.id,
      title: a.title,
      description: `Assessment: ${a.title}`,
      timestamp: new Date(a.updatedAt || a.createdAt)
    });
  });
  courseStore.myCourses.forEach(c => {
    activities.push({
      id: c.id,
      title: 'Course enrolled',
      description: `You enrolled in "${c.title}"`,
      timestamp: new Date(c.createdAt)
    });
  });
  return activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 5);
});
const upcomingDeadlines = computed(() => {
  return assessmentStore.assessments
    .filter(a => a.status === 'published' && new Date(a.dueDate) > new Date())
    .map(a => ({
      id: a.id,
      title: a.title,
      courseName: courseStore.courseById(a.courseId)?.title || '',
      dueDate: a.dueDate
    }))
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);
});
const courseProgress = computed(() => ({}));
const unreadNotifications = computed(() => 0); // If notifications are implemented, use real data

// Computed
const user = computed(() => authStore.user);

// Methods
const formatDate = (date: Date | string) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
};
</script> 