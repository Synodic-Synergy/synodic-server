<template>
  <div class="min-h-screen bg-dark-primary">
    <!-- Header -->
    <div class="bg-dark-secondary border-b border-dark-border">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-3xl font-bold text-text-primary">User Management</h1>
            <p class="mt-1 text-sm text-text-secondary">
              Manage all users in the system
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
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Filters and Search -->
      <div class="bg-dark-secondary border border-dark-border rounded-lg mb-8">
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <!-- Search -->
            <div class="md:col-span-2">
              <label for="search" class="block text-sm font-medium text-text-secondary mb-2">
                Search Users
              </label>
              <div class="relative">
                <input
                  id="search"
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search by name or email..."
                  class="w-full pl-10 pr-4 py-2 border border-dark-border rounded-md focus:ring-orange-500 focus:border-orange-500 bg-dark-primary text-text-primary placeholder-text-secondary"
                />
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Role Filter -->
            <div>
              <label for="role-filter" class="block text-sm font-medium text-text-secondary mb-2">
                Role
              </label>
              <select
                id="role-filter"
                v-model="roleFilter"
                class="w-full px-3 py-2 border border-dark-border rounded-md focus:ring-orange-500 focus:border-orange-500 bg-dark-primary text-text-primary"
              >
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
                <option value="student">Student</option>
              </select>
            </div>

            <!-- Status Filter -->
            <div>
              <label for="status-filter" class="block text-sm font-medium text-text-secondary mb-2">
                Status
              </label>
              <select
                id="status-filter"
                v-model="statusFilter"
                class="w-full px-3 py-2 border border-dark-border rounded-md focus:ring-orange-500 focus:border-orange-500 bg-dark-primary text-text-primary"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Users Table -->
      <div class="bg-dark-secondary border border-dark-border rounded-lg overflow-hidden">
        <div class="px-6 py-4 border-b border-dark-border">
          <h3 class="text-lg font-medium text-text-primary">
            Users ({{ filteredUsers.length }})
          </h3>
        </div>

        <div v-if="loading" class="text-center py-12">
          <div class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-orange-500 hover:bg-orange-400 transition ease-in-out duration-150 cursor-not-allowed">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading users...
          </div>
        </div>

        <div v-else-if="filteredUsers.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-text-primary">No users found</h3>
          <p class="mt-1 text-sm text-text-secondary">
            {{ searchQuery || roleFilter || statusFilter ? 'Try adjusting your filters.' : 'Get started by adding the first user.' }}
          </p>
          <div v-if="!searchQuery && !roleFilter && !statusFilter" class="mt-6">
            <NuxtLink
              to="/admin/users/new"
              class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
            >
              Add User
            </NuxtLink>
          </div>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-dark-border">
            <thead class="bg-dark-primary">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  User
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Role
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Joined
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Last Login
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-dark-secondary divide-y divide-dark-border">
              <tr
                v-for="user in paginatedUsers"
                :key="user.id"
                class="hover:bg-dark-primary"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <img
                      class="h-10 w-10 rounded-full"
                      :src="`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=6366f1&color=fff`"
                      :alt="`${user.firstName} ${user.lastName}`"
                    />
                    <div class="ml-4">
                      <div class="text-sm font-medium text-text-primary">
                        {{ user.firstName }} {{ user.lastName }}
                      </div>
                      <div class="text-sm text-text-secondary">
                        {{ user.email }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
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
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      (user.status || 'active') === 'active' ? 'bg-green-900 text-green-200' :
                      'bg-gray-900 text-gray-200'
                    ]"
                  >
                    {{ user.status || 'active' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                  {{ formatDate(user.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                  Never
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end space-x-2">
                    <button
                      @click="editUser(user)"
                      class="text-orange-500 hover:text-orange-400"
                    >
                      Edit
                    </button>
                    <button
                      @click="toggleUserStatus(user)"
                      :class="[
                        (user.status || 'active') === 'active' ? 'text-red-500 hover:text-red-400' :
                        'text-green-500 hover:text-green-400'
                      ]"
                    >
                      {{ (user.status || 'active') === 'active' ? 'Deactivate' : 'Activate' }}
                    </button>
                    <button
                      @click="deleteUser(user)"
                      class="text-red-500 hover:text-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="filteredUsers.length > itemsPerPage" class="px-6 py-4 border-t border-dark-border">
          <div class="flex items-center justify-between">
            <div class="text-sm text-text-secondary">
              Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredUsers.length) }} of {{ filteredUsers.length }} results
            </div>
            <div class="flex space-x-2">
              <button
                @click="currentPage = Math.max(1, currentPage - 1)"
                :disabled="currentPage === 1"
                class="px-3 py-1 text-sm border border-dark-border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-primary text-text-primary"
              >
                Previous
              </button>
              <button
                @click="currentPage = Math.min(totalPages, currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="px-3 py-1 text-sm border border-dark-border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-primary text-text-primary"
              >
                Next
              </button>
            </div>
          </div>
        </div>
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
const searchQuery = ref('');
const roleFilter = ref('');
const statusFilter = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(10);

// Computed
const filteredUsers = computed(() => {
  return adminStore.users.filter(user => {
    const matchesSearch = !searchQuery.value || 
      user.firstName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase());
    
    const matchesRole = !roleFilter.value || user.role === roleFilter.value;
    const matchesStatus = !statusFilter.value || (user.status || 'active') === statusFilter.value;
    
    return matchesSearch && matchesRole && matchesStatus;
  });
});

const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage.value));

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredUsers.value.slice(start, end);
});

const loading = computed(() => adminStore.loading);

// Methods
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

const editUser = (user: any) => {
  navigateTo(`/admin/users/${user.id}/edit`);
};

const toggleUserStatus = async (user: any) => {
  try {
    const newStatus = (user.status || 'active') === 'active' ? 'inactive' : 'active';
    await adminStore.updateUser(user.id, { status: newStatus });
  } catch (error) {
    console.error('Error updating user status:', error);
  }
};

const deleteUser = async (user: any) => {
  if (confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) {
    try {
      await adminStore.deleteUser(user.id);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }
};

// Watch for filter changes to reset pagination
watch([searchQuery, roleFilter, statusFilter], () => {
  currentPage.value = 1;
});

// Lifecycle
onMounted(async () => {
  await adminStore.fetchUsers();
});
</script> 