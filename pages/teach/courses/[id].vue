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
                to="/teach/courses"
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
                  Course Management & Lesson Planning
                </p>
              </div>
            </div>
            <div class="flex gap-4">
              <MotionButton 
                @click="isEditing = !isEditing"
                class="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold"
                :hover="{ scale: 1.05 }"
                :tap="{ scale: 0.95 }"
              >
                {{ isEditing ? 'Cancel Edit' : 'Edit Course' }}
              </MotionButton>
              <MotionButton 
                to="/teach/courses/new"
                class="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold"
                :hover="{ scale: 1.05 }"
                :tap="{ scale: 0.95 }"
              >
                Add Lesson
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
            <h2 class="text-2xl font-bold text-white mb-6">Course Information</h2>
            
            <div v-if="!isEditing" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-2">Title</label>
                  <p class="text-white text-lg">{{ course?.title }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-2">Category</label>
                  <p class="text-white text-lg capitalize">{{ course?.category }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-2">Level</label>
                  <p class="text-white text-lg capitalize">{{ course?.level }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-2">Max Students</label>
                  <p class="text-white text-lg">{{ course?.maxStudents }}</p>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-400 mb-2">Description</label>
                <p class="text-gray-300 leading-relaxed">{{ course?.description }}</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-400 mb-2">Content</label>
                <div class="bg-gray-900/50 p-4 rounded-lg">
                  <p class="text-gray-300">{{ course?.content || 'No content available' }}</p>
                </div>
              </div>
            </div>

            <!-- Edit Form -->
            <form v-else @submit.prevent="saveCourse" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-2">Title</label>
                  <input 
                    v-model="editForm.title"
                    type="text"
                    class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-2">Category</label>
                  <select 
                    v-model="editForm.category"
                    class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="mathematics">Mathematics</option>
                    <option value="science">Science</option>
                    <option value="literature">Literature</option>
                    <option value="history">History</option>
                    <option value="technology">Technology</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-2">Level</label>
                  <select 
                    v-model="editForm.level"
                    class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-2">Max Students</label>
                  <input 
                    v-model="editForm.maxStudents"
                    type="number"
                    min="1"
                    class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-400 mb-2">Description</label>
                <textarea 
                  v-model="editForm.description"
                  rows="4"
                  class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                ></textarea>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-400 mb-2">Content</label>
                <textarea 
                  v-model="editForm.content"
                  rows="8"
                  class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder="Enter course content in markdown format..."
                ></textarea>
              </div>

              <div class="flex justify-end gap-4">
                <MotionButton 
                  @click="cancelEdit"
                  type="button"
                  class="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white px-6 py-3 rounded-xl font-semibold"
                  :hover="{ scale: 1.05 }"
                  :tap="{ scale: 0.95 }"
                >
                  Cancel
                </MotionButton>
                <MotionButton 
                  type="submit"
                  :disabled="isSaving"
                  class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold"
                  :hover="{ scale: 1.05 }"
                  :tap="{ scale: 0.95 }"
                >
                  {{ isSaving ? 'Saving...' : 'Save Changes' }}
                </MotionButton>
              </div>
            </form>
          </div>
        </MotionCard>

        <!-- Course Stats -->
        <MotionCard 
          class="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-xl border border-gray-600/30"
          :initial="{ opacity: 0, x: 50 }"
          :enter="{ opacity: 1, x: 0 }"
          :transition="{ duration: 600, delay: 400 }"
        >
          <div class="p-8">
            <h2 class="text-2xl font-bold text-white mb-6">Course Statistics</h2>
            
            <div class="space-y-6">
              <div class="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-4 rounded-xl border border-blue-500/30">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-blue-300 text-sm">Enrolled Students</p>
                    <p class="text-white text-2xl font-bold">{{ course?.studentCount || 0 }}</p>
                  </div>
                  <div class="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <svg class="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div class="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-xl border border-green-500/30">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-green-300 text-sm">Lessons Created</p>
                    <p class="text-white text-2xl font-bold">{{ lessons?.length || 0 }}</p>
                  </div>
                  <div class="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                    <svg class="w-6 h-6 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div class="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-xl border border-purple-500/30">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-purple-300 text-sm">Status</p>
                    <p class="text-white text-2xl font-bold capitalize">{{ course?.status || 'Draft' }}</p>
                  </div>
                  <div class="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <svg class="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="mt-8 space-y-4">
              <MotionButton 
                to="/teach/attendance"
                class="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-3 rounded-xl font-semibold"
                :hover="{ scale: 1.05 }"
                :tap="{ scale: 0.95 }"
              >
                Take Attendance
              </MotionButton>
              <MotionButton 
                to="/teach/assessments/new"
                class="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-4 py-3 rounded-xl font-semibold"
                :hover="{ scale: 1.05 }"
                :tap="{ scale: 0.95 }"
              >
                Create Assessment
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
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-white">Course Lessons</h2>
            <MotionButton 
              to="/teach/lessons/new"
              class="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold"
              :hover="{ scale: 1.05 }"
              :tap="{ scale: 0.95 }"
            >
              Add New Lesson
            </MotionButton>
          </div>

          <div v-if="lessons && lessons.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MotionTile 
              v-for="lesson in lessons" 
              :key="lesson.id"
              class="bg-gradient-to-br from-gray-700/50 to-gray-600/50 backdrop-blur-xl border border-gray-500/30 p-6 rounded-xl hover:border-purple-500/50 transition-all duration-300"
              :hover="{ scale: 1.02, y: -5 }"
            >
              <div class="flex items-start justify-between mb-4">
                <h3 class="text-lg font-semibold text-white">{{ lesson.title }}</h3>
                <span class="text-xs text-gray-400 bg-gray-600/50 px-2 py-1 rounded-full">
                  Lesson {{ lesson.order }}
                </span>
              </div>
              <p class="text-gray-300 text-sm mb-4 line-clamp-3">{{ lesson.description }}</p>
              <div class="flex items-center justify-between text-xs text-gray-400">
                <span>{{ formatDate(lesson.createdAt) }}</span>
                <div class="flex gap-2">
                  <MotionButton 
                    :to="`/teach/lessons/${lesson.id}`"
                    class="text-purple-400 hover:text-purple-300"
                    :hover="{ scale: 1.1 }"
                  >
                    Edit
                  </MotionButton>
                  <MotionButton 
                    @click="deleteLesson(lesson.id)"
                    class="text-red-400 hover:text-red-300"
                    :hover="{ scale: 1.1 }"
                  >
                    Delete
                  </MotionButton>
                </div>
              </div>
            </MotionTile>
          </div>

          <div v-else class="text-center py-12">
            <div class="w-16 h-16 bg-gray-600/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">No Lessons Yet</h3>
            <p class="text-gray-400 mb-6">Start building your course by adding the first lesson</p>
            <MotionButton 
              to="/teach/lessons/new"
              class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-semibold"
              :hover="{ scale: 1.05 }"
              :tap="{ scale: 0.95 }"
            >
              Create First Lesson
            </MotionButton>
          </div>
        </div>
      </MotionCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCourseStore } from '~/stores/courseStore';
import type { Course } from '~/types/course';

definePageMeta({ layout: 'teach' });

const route = useRoute();
const courseStore = useCourseStore();

const course = ref<Course | null>(null);
const lessons = ref<any[]>([]);
const isEditing = ref(false);
const isSaving = ref(false);

const editForm = ref({
  title: '',
  description: '',
  content: '',
  category: 'mathematics',
  level: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
  maxStudents: 30
});

onMounted(async () => {
  const courseId = route.params.id as string;
  await loadCourse(courseId);
  await loadLessons(courseId);
});

const loadCourse = async (courseId: string) => {
  try {
    const courseData = await courseStore.fetchCourse(courseId);
    course.value = courseData;
    
    // Initialize edit form
    editForm.value = {
      title: courseData.title,
      description: courseData.description,
      content: courseData.content,
      category: courseData.category,
      level: courseData.level,
      maxStudents: courseData.maxStudents
    };
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

const saveCourse = async () => {
  try {
    isSaving.value = true;
    const courseId = route.params.id as string;
    await courseStore.updateCourse(courseId, editForm.value);
    await loadCourse(courseId);
    isEditing.value = false;
  } catch (error) {
    console.error('Error saving course:', error);
  } finally {
    isSaving.value = false;
  }
};

const cancelEdit = () => {
  if (course.value) {
    editForm.value = {
      title: course.value.title,
      description: course.value.description,
      content: course.value.content,
      category: course.value.category,
      level: course.value.level,
      maxStudents: course.value.maxStudents
    };
  }
  isEditing.value = false;
};

const deleteLesson = async (lessonId: string) => {
  if (confirm('Are you sure you want to delete this lesson?')) {
    try {
      // TODO: Implement lesson deletion
      console.log('Deleting lesson:', lessonId);
    } catch (error) {
      console.error('Error deleting lesson:', error);
    }
  }
};

const formatDate = (date: Date | string | null | undefined) => {
  if (!date) return 'N/A';
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'N/A';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(d);
};
</script>