<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
    </div>
    <div class="relative z-10 container mx-auto px-4 py-8">
      <div class="mb-8 flex items-center gap-4">
        <button @click="$router.push('/teach/assessments')" class="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">Assessment Details</h1>
      </div>
      <div v-if="loading" class="text-center py-16">
        <span class="text-white text-lg">Loading assessment...</span>
      </div>
      <div v-else-if="error" class="text-center py-16">
        <span class="text-red-400 text-lg">{{ error }}</span>
      </div>
      <div v-else-if="assessment" class="max-w-2xl mx-auto">
        <form @submit.prevent="handleSave" class="space-y-8 bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-xl border border-gray-600/30 p-8 rounded-xl">
          <!-- Title -->
          <div class="space-y-2">
            <label for="title" class="block text-lg font-semibold text-white">Title</label>
            <input id="title" v-model="form.title" required class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300" />
          </div>
          <!-- Description -->
          <div class="space-y-2">
            <label for="description" class="block text-lg font-semibold text-white">Description</label>
            <textarea id="description" v-model="form.description" rows="4" required class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 resize-none"></textarea>
          </div>
          <!-- Type, Due Date, Max Score, Weight -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label for="type" class="block text-lg font-semibold text-white">Type</label>
              <select id="type" v-model="form.type" class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300">
                <option value="assignment">Assignment</option>
                <option value="quiz">Quiz</option>
                <option value="exam">Exam</option>
                <option value="project">Project</option>
              </select>
            </div>
            <div class="space-y-2">
              <label for="dueDate" class="block text-lg font-semibold text-white">Due Date</label>
              <input id="dueDate" type="datetime-local" v-model="form.dueDate" required class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300" />
            </div>
            <div class="space-y-2">
              <label for="maxScore" class="block text-lg font-semibold text-white">Max Score</label>
              <input id="maxScore" type="number" v-model.number="form.maxScore" min="1" max="1000" required class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300" />
            </div>
            <div class="space-y-2">
              <label for="weight" class="block text-lg font-semibold text-white">Weight (%)</label>
              <input id="weight" type="number" v-model.number="form.weight" min="1" max="100" required class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300" />
            </div>
          </div>
          <!-- Instructions -->
          <div class="space-y-2">
            <label for="instructions" class="block text-lg font-semibold text-white">Instructions</label>
            <textarea id="instructions" v-model="form.instructions" rows="3" class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 resize-none"></textarea>
          </div>
          <!-- Status, Allow Late, Late Penalty -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="block text-lg font-semibold text-white">Status</label>
              <span class="inline-block px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
                :class="form.status === 'published' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' : form.status === 'draft' ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' : 'bg-gradient-to-r from-gray-600 to-gray-700 text-white'">
                {{ form.status }}
              </span>
            </div>
            <div class="space-y-2">
              <label class="block text-lg font-semibold text-white">Allow Late Submission</label>
              <input type="checkbox" v-model="form.allowLateSubmission" class="w-5 h-5 text-indigo-500 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500 focus:ring-2" />
            </div>
            <div class="space-y-2">
              <label for="latePenalty" class="block text-lg font-semibold text-white">Late Penalty (%)</label>
              <input id="latePenalty" type="number" v-model.number="form.latePenalty" min="0" max="100" class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300" />
            </div>
          </div>
          <!-- Attachments (TODO) -->
          <div class="space-y-2">
            <label class="block text-lg font-semibold text-white">Attachments</label>
            <div class="text-gray-400 italic">TODO: Attachments management not implemented yet.</div>
          </div>
          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-4 pt-6">
            <button type="button" @click="handleDelete" class="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400">
              Delete
            </button>
            <button type="submit" :disabled="saving" class="bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400">
              {{ saving ? 'Saving...' : 'Save Changes' }}
            </button>
            <button v-if="form.status === 'draft'" type="button" @click="handlePublish" class="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400">
              Publish
            </button>
            <button v-if="form.status === 'published'" type="button" @click="handleUnpublish" class="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400">
              Unpublish
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAssessmentStore } from '~/stores/assessmentStore';
import type { Assessment } from '~/types/assessment';

definePageMeta({ layout: 'teach' });

const route = useRoute();
const router = useRouter();
const assessmentStore = useAssessmentStore();

const id = ref(route.params.id as string);
const loading = ref(true);
const error = ref('');
const saving = ref(false);
const assessment = ref<Assessment | null>(null);
const form = ref<any>({});

async function fetchAssessment() {
  loading.value = true;
  error.value = '';
  try {
    // Try to get from store first
    let found = assessmentStore.assessmentById(id.value);
    if (!found) {
      await assessmentStore.fetchTeachAssessments();
      found = assessmentStore.assessmentById(id.value);
    }
    if (!found) throw new Error('Assessment not found');
    assessment.value = found;
    // Copy fields for editing
    form.value = {
      ...found,
      dueDate: found.dueDate ? new Date(found.dueDate).toISOString().slice(0, 16) : '',
    };
  } catch (e: any) {
    error.value = e.message || 'Failed to load assessment';
  } finally {
    loading.value = false;
  }
}

onMounted(fetchAssessment);
watch(() => route.params.id, val => { id.value = val as string; fetchAssessment(); });

async function handleSave() {
  saving.value = true;
  error.value = '';
  try {
    const updateData = { ...form.value, dueDate: new Date(form.value.dueDate) };
    await assessmentStore.updateAssessment(id.value, updateData);
    await fetchAssessment();
    // Optionally show a success message
  } catch (e: any) {
    error.value = e.message || 'Failed to save changes';
  } finally {
    saving.value = false;
  }
}

async function handleDelete() {
  if (confirm('Are you sure you want to delete this assessment?')) {
    try {
      await assessmentStore.deleteAssessment(id.value);
      router.push('/teach/assessments');
    } catch (e: any) {
      error.value = e.message || 'Failed to delete assessment';
    }
  }
}

async function handlePublish() {
  try {
    await assessmentStore.publishAssessment(id.value);
    await fetchAssessment();
  } catch (e: any) {
    error.value = e.message || 'Failed to publish assessment';
  }
}

async function handleUnpublish() {
  try {
    await assessmentStore.unpublishAssessment(id.value);
    await fetchAssessment();
  } catch (e: any) {
    error.value = e.message || 'Failed to unpublish assessment';
  }
}
</script> 