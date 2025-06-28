<template>
  <div class="min-h-screen bg-dark-primary">
    <!-- Header -->
    <div class="bg-dark-secondary border-b border-dark-border">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-3xl font-bold text-text-primary">Add New User</h1>
            <p class="mt-1 text-sm text-text-secondary">
              Create a new user account
            </p>
          </div>
          <NuxtLink
            to="/admin/users"
            class="inline-flex items-center px-4 py-2 border border-dark-border text-sm font-medium rounded-md text-text-primary bg-dark-primary hover:bg-dark-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
          >
            Back to Users
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-dark-secondary border border-dark-border rounded-lg">
        <div class="px-6 py-4 border-b border-dark-border">
          <h2 class="text-lg font-medium text-text-primary">User Information</h2>
        </div>

        <form @submit.prevent="createUser" class="p-6 space-y-6">
          <!-- Personal Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="firstName" class="block text-sm font-medium text-text-secondary mb-2">
                First Name *
              </label>
              <input
                id="firstName"
                v-model="form.firstName"
                type="text"
                required
                class="w-full px-3 py-2 border border-dark-border rounded-md focus:ring-orange-500 focus:border-orange-500 bg-dark-primary text-text-primary placeholder-text-secondary"
                placeholder="Enter first name"
              />
            </div>

            <div>
              <label for="lastName" class="block text-sm font-medium text-text-secondary mb-2">
                Last Name *
              </label>
              <input
                id="lastName"
                v-model="form.lastName"
                type="text"
                required
                class="w-full px-3 py-2 border border-dark-border rounded-md focus:ring-orange-500 focus:border-orange-500 bg-dark-primary text-text-primary placeholder-text-secondary"
                placeholder="Enter last name"
              />
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-text-secondary mb-2">
              Email Address *
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full px-3 py-2 border border-dark-border rounded-md focus:ring-orange-500 focus:border-orange-500 bg-dark-primary text-text-primary placeholder-text-secondary"
              placeholder="Enter email address"
            />
          </div>

          <!-- Role and Status -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="role" class="block text-sm font-medium text-text-secondary mb-2">
                Role *
              </label>
              <select
                id="role"
                v-model="form.role"
                required
                class="w-full px-3 py-2 border border-dark-border rounded-md focus:ring-orange-500 focus:border-orange-500 bg-dark-primary text-text-primary"
              >
                <option value="">Select a role</option>
                <option value="admin">Administrator</option>
                <option value="staff">Staff/Teacher</option>
                <option value="student">Student</option>
              </select>
            </div>

            <div>
              <label for="status" class="block text-sm font-medium text-text-secondary mb-2">
                Status
              </label>
              <select
                id="status"
                v-model="form.status"
                class="w-full px-3 py-2 border border-dark-border rounded-md focus:ring-orange-500 focus:border-orange-500 bg-dark-primary text-text-primary"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <!-- Password -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="password" class="block text-sm font-medium text-text-secondary mb-2">
                Password *
              </label>
              <input
                id="password"
                v-model="form.password"
                type="password"
                required
                class="w-full px-3 py-2 border border-dark-border rounded-md focus:ring-orange-500 focus:border-orange-500 bg-dark-primary text-text-primary placeholder-text-secondary"
                placeholder="Enter password"
              />
              <p class="mt-1 text-xs text-text-secondary">
                Minimum 8 characters with uppercase, lowercase, number, and special character
              </p>
            </div>

            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-text-secondary mb-2">
                Confirm Password *
              </label>
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                type="password"
                required
                class="w-full px-3 py-2 border border-dark-border rounded-md focus:ring-orange-500 focus:border-orange-500 bg-dark-primary text-text-primary placeholder-text-secondary"
                placeholder="Confirm password"
              />
            </div>
          </div>

          <!-- Additional Information -->
          <div v-if="form.role === 'student'">
            <h3 class="text-md font-medium text-text-primary mb-4">Student Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="studentId" class="block text-sm font-medium text-text-secondary mb-2">
                  Student ID
                </label>
                <input
                  id="studentId"
                  v-model="form.studentId"
                  type="text"
                  class="w-full px-3 py-2 border border-dark-border rounded-md focus:ring-orange-500 focus:border-orange-500 bg-dark-primary text-text-primary placeholder-text-secondary"
                  placeholder="Enter student ID"
                />
              </div>

              <div>
                <label for="grade" class="block text-sm font-medium text-text-secondary mb-2">
                  Grade Level
                </label>
                <select
                  id="grade"
                  v-model="form.grade"
                  class="w-full px-3 py-2 border border-dark-border rounded-md focus:ring-orange-500 focus:border-orange-500 bg-dark-primary text-text-primary"
                >
                  <option value="">Select grade</option>
                  <option value="9">Grade 9</option>
                  <option value="10">Grade 10</option>
                  <option value="11">Grade 11</option>
                  <option value="12">Grade 12</option>
                </select>
              </div>
            </div>
          </div>

          <div v-if="form.role === 'staff'">
            <h3 class="text-md font-medium text-text-primary mb-4">Staff Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="department" class="block text-sm font-medium text-text-secondary mb-2">
                  Department
                </label>
                <input
                  id="department"
                  v-model="form.department"
                  type="text"
                  class="w-full px-3 py-2 border border-dark-border rounded-md focus:ring-orange-500 focus:border-orange-500 bg-dark-primary text-text-primary placeholder-text-secondary"
                  placeholder="Enter department"
                />
              </div>

              <div>
                <label for="position" class="block text-sm font-medium text-text-secondary mb-2">
                  Position
                </label>
                <input
                  id="position"
                  v-model="form.position"
                  type="text"
                  class="w-full px-3 py-2 border border-dark-border rounded-md focus:ring-orange-500 focus:border-orange-500 bg-dark-primary text-text-primary placeholder-text-secondary"
                  placeholder="Enter position"
                />
              </div>
            </div>
          </div>

          <!-- Error Messages -->
          <div v-if="errors.length > 0" class="bg-red-900/20 border border-red-800 rounded-md p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-200">
                  There were errors with your submission
                </h3>
                <div class="mt-2 text-sm text-red-300">
                  <ul class="list-disc pl-5 space-y-1">
                    <li v-for="error in errors" :key="error">{{ error }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Success Message -->
          <div v-if="success" class="bg-green-900/20 border border-green-800 rounded-md p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-green-200">
                  User created successfully!
                </h3>
                <div class="mt-2 text-sm text-green-300">
                  <p>The user account has been created and is ready to use.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end space-x-4">
            <NuxtLink
              to="/admin/users"
              class="px-4 py-2 border border-dark-border text-sm font-medium rounded-md text-text-primary bg-dark-primary hover:bg-dark-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
            >
              Cancel
            </NuxtLink>
            <button
              type="submit"
              :disabled="loading"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ loading ? 'Creating...' : 'Create User' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
import { useAdminStore } from '~/stores/adminStore';

// Page metadata
definePageMeta({
  layout: 'default'
});

// Stores
const authStore = useAuthStore();
const adminStore = useAdminStore();

// Reactive data
const loading = computed(() => adminStore.loading);
const success = ref(false);
const errors = ref<string[]>([]);

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  status: 'active',
  password: '',
  confirmPassword: '',
  studentId: '',
  grade: '',
  department: '',
  position: ''
});

// Methods
const validateForm = (): boolean => {
  errors.value = [];

  if (!form.value.firstName.trim()) {
    errors.value.push('First name is required');
  }

  if (!form.value.lastName.trim()) {
    errors.value.push('Last name is required');
  }

  if (!form.value.email.trim()) {
    errors.value.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.push('Please enter a valid email address');
  }

  if (!form.value.role) {
    errors.value.push('Role is required');
  }

  if (!form.value.password) {
    errors.value.push('Password is required');
  } else if (form.value.password.length < 8) {
    errors.value.push('Password must be at least 8 characters long');
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/.test(form.value.password)) {
    errors.value.push('Password must contain uppercase, lowercase, number, and special character');
  }

  if (form.value.password !== form.value.confirmPassword) {
    errors.value.push('Passwords do not match');
  }

  return errors.value.length === 0;
};

const createUser = async () => {
  if (!validateForm()) {
    return;
  }

  errors.value = [];

  try {
    const userData = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      role: form.value.role as 'admin' | 'staff' | 'student',
      status: form.value.status as 'active' | 'inactive',
      password: form.value.password,
      studentId: form.value.studentId,
      grade: form.value.grade,
      department: form.value.department,
      position: form.value.position
    };

    await adminStore.createUser(userData);

    success.value = true;
    
    // Reset form
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      status: 'active',
      password: '',
      confirmPassword: '',
      studentId: '',
      grade: '',
      department: '',
      position: ''
    };

    // Redirect after a delay
    setTimeout(() => {
      navigateTo('/admin/users');
    }, 2000);

  } catch (error: any) {
    errors.value.push(error.message || 'Failed to create user');
  }
};

// Watch for role changes to reset role-specific fields
watch(() => form.value.role, (newRole) => {
  if (newRole !== 'student') {
    form.value.studentId = '';
    form.value.grade = '';
  }
  if (newRole !== 'staff') {
    form.value.department = '';
    form.value.position = '';
  }
});
</script> 