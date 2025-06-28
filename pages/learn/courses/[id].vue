<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
    </div>

    <div class="relative z-10 container mx-auto px-4 py-8">
      <!-- Header Section -->
      <MotionCard 
        class="mb-8 bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-xl border border-gray-600/30"
        :initial="{ opacity: 0, y: -20 }"
        :enter="{ opacity: 1, y: 0 }"
        :transition="{ duration: 600 }"
      >
        <div class="p-8">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <MotionButton 
                to="/learn/courses"
                class="mr-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white p-2 rounded-lg"
                :hover="{ scale: 1.05 }"
                :tap="{ scale: 0.95 }"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </MotionButton>
              <div>
                <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400 bg-clip-text text-transparent mb-2">
                  {{ course?.title || 'Loading Course...' }}
                </h1>
                <p class="text-gray-300 text-lg">
                  Learn and grow with interactive lessons
                </p>
              </div>
            </div>
            <div class="flex gap-4">
              <MotionButton 
                v-if="!isEnrolled"
                @click="enrollInCourse"
                :disabled="enrolling"
                class="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold"
                :hover="{ scale: 1.05 }"
                :tap="{ scale: 0.95 }"
              >
                {{ enrolling ? 'Enrolling...' : 'Enroll Now' }}
              </MotionButton>
              <MotionButton 
                v-else
                to="/learn/assessments"
                class="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold"
                :hover="{ scale: 1.05 }"
                :tap="{ scale: 0.95 }"
              >
                View Assessments
              </MotionButton>
            </div>
          </div>
        </div>
      </MotionCard>

      <!-- Course Information -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Course Details -->
        <MotionCard 
          class="lg:col-span-2 bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-xl border border-gray-600/30"
          :initial="{ opacity: 0, x: -50 }"
          :enter="{ opacity: 1, x: 0 }"
          :transition="{ duration: 600, delay: 200 }"
        >
          <div class="p-8">
            <h2 class="text-2xl font-bold text-white mb-6">Course Overview</h2>
            
            <div class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-2">Category</label>
                  <p class="text-white text-lg capitalize">{{ course?.category }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-2">Difficulty Level</label>
                  <p class="text-white text-lg capitalize">{{ course?.level }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-2">Teacher</label>
                  <p class="text-white text-lg">{{ course?.teacherName }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-2">Students Enrolled</label>
                  <p class="text-white text-lg">{{ course?.studentCount || 0 }} / {{ course?.maxStudents }}</p>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-400 mb-2">Description</label>
                <p class="text-gray-300 leading-relaxed">{{ course?.description }}</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-400 mb-2">Course Content</label>
                <div class="bg-gray-900/50 p-4 rounded-lg">
                  <p class="text-gray-300">{{ course?.content || 'No content available' }}</p>
                </div>
              </div>
            </div>
          </div>
        </MotionCard>

        <!-- Progress & Stats -->
        <MotionCard 
          class="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-xl border border-gray-600/30"
          :initial="{ opacity: 0, x: 50 }"
          :enter="{ opacity: 1, x: 0 }"
          :transition="{ duration: 600, delay: 400 }"
        >
          <div class="p-8">
            <h2 class="text-2xl font-bold text-white mb-6">Your Progress</h2>
            
            <div class="space-y-6">
              <div class="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-xl border border-purple-500/30">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-purple-300 text-sm">Overall Progress</p>
                  <p class="text-white text-lg font-bold">{{ progress?.overallProgress || 0 }}%</p>
                </div>
                <div class="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                    :style="{ width: `${progress?.overallProgress || 0}%` }"
                  ></div>
                </div>
              </div>

              <div class="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-4 rounded-xl border border-blue-500/30">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-blue-300 text-sm">Lessons Completed</p>
                    <p class="text-white text-2xl font-bold">{{ progress?.completedLessons?.length || 0 }}</p>
                  </div>
                  <div class="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <svg class="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div class="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-xl border border-green-500/30">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-green-300 text-sm">Assignments Done</p>
                    <p class="text-white text-2xl font-bold">{{ progress?.completedAssignments?.length || 0 }}</p>
                  </div>
                  <div class="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                    <svg class="w-6 h-6 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div class="bg-gradient-to-r from-orange-500/20 to-red-500/20 p-4 rounded-xl border border-orange-500/30">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-orange-300 text-sm">Last Accessed</p>
                    <p class="text-white text-sm">{{ formatDate(progress?.lastAccessed) }}</p>
                  </div>
                  <div class="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                    <svg class="w-6 h-6 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="mt-8 space-y-4">
              <MotionButton 
                to="/learn/assessments"
                class="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-4 py-3 rounded-xl font-semibold"
                :hover="{ scale: 1.05 }"
                :tap="{ scale: 0.95 }"
              >
                View Assessments
              </MotionButton>
              <MotionButton 
                to="/learn/timetable"
                class="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-4 py-3 rounded-xl font-semibold"
                :hover="{ scale: 1.05 }"
                :tap="{ scale: 0.95 }"
              >
                Check Schedule
              </MotionButton>
            </div>
          </div>
        </MotionCard>
      </div>

      <!-- Lessons Section -->
      <MotionCard 
        class="mt-8 bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-xl border border-gray-600/30"
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0 }"
        :transition="{ duration: 600, delay: 600 }"
      >
        <div class="p-8">
          <h2 class="text-2xl font-bold text-white mb-6">Course Lessons</h2>

          <div v-if="lessons && lessons.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MotionTile 
              v-for="lesson in lessons" 
              :key="lesson.id"
              class="bg-gradient-to-br from-gray-700/50 to-gray-600/50 backdrop-blur-xl border border-gray-500/30 p-6 rounded-xl hover:border-purple-500/50 transition-all duration-300 cursor-pointer"
              :hover="{ scale: 1.02, y: -5 }"
              @click="openLesson(lesson)"
            >
              <div class="flex items-start justify-between mb-4">
                <h3 class="text-lg font-semibold text-white">{{ lesson.title }}</h3>
                <div class="flex items-center gap-2">
                  <span class="text-xs text-gray-400 bg-gray-600/50 px-2 py-1 rounded-full">
                    Lesson {{ lesson.order }}
                  </span>
                  <div v-if="isLessonCompleted(lesson.id)" class="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <svg class="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <p class="text-gray-300 text-sm mb-4 line-clamp-3">{{ lesson.description }}</p>
              <div class="flex items-center justify-between text-xs text-gray-400">
                <span>{{ formatDate(lesson.createdAt) }}</span>
                <span class="text-purple-400">Click to view</span>
              </div>
            </MotionTile>
          </div>

          <div v-else class="text-center py-12">
            <div class="w-16 h-16 bg-gray-600/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">No Lessons Available</h3>
            <p class="text-gray-400">Lessons will be added by your teacher soon</p>
          </div>
        </div>
      </MotionCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCourseStore } from '~/stores/courseStore';
import type { Course, CourseProgress } from '~/types/course';

definePageMeta({ layout: 'learn' });

const route = useRoute();
const courseStore = useCourseStore();

const course = ref<Course | null>(null);
const lessons = ref<any[]>([]);
const progress = ref<CourseProgress | null>(null);
const isEnrolled = ref(false);
const enrolling = ref(false);

onMounted(async () => {
  const courseId = route.params.id as string;
  await loadCourse(courseId);
  await loadLessons(courseId);
  await loadProgress(courseId);
  checkEnrollment(courseId);
});

const loadCourse = async (courseId: string) => {
  try {
    const courseData = await courseStore.fetchCourse(courseId);
    course.value = courseData;
  } catch (error) {
    console.error('Error loading course:', error);
  }
};

const loadLessons = async (courseId: string) => {
  try {
    // TODO: Implement lesson fetching
    lessons.value = [];
  } catch (error) {
    console.error('Error loading lessons:', error);
  }
};

const loadProgress = async (courseId: string) => {
  try {
    // TODO: Implement progress fetching
    progress.value = {
      courseId,
      studentId: '', // TODO: Get from auth
      completedLessons: [],
      completedAssignments: [],
      overallProgress: 0,
      lastAccessed: new Date()
    };
  } catch (error) {
    console.error('Error loading progress:', error);
  }
};

const checkEnrollment = async (courseId: string) => {
  try {
    // TODO: Check if student is enrolled
    isEnrolled.value = false;
  } catch (error) {
    console.error('Error checking enrollment:', error);
  }
};

const enrollInCourse = async () => {
  try {
    enrolling.value = true;
    const courseId = route.params.id as string;
    // TODO: Implement enrollment
    console.log('Enrolling in course:', courseId);
    isEnrolled.value = true;
  } catch (error) {
    console.error('Error enrolling in course:', error);
  } finally {
    enrolling.value = false;
  }
};

const openLesson = (lesson: any) => {
  // TODO: Navigate to lesson detail page
  console.log('Opening lesson:', lesson.id);
};

const isLessonCompleted = (lessonId: string) => {
  return progress.value?.completedLessons?.includes(lessonId) || false;
};

const formatDate = (date: Date | string | null | undefined) => {
  if (!date) return 'Never';
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'Never';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(d);
};
</script> 