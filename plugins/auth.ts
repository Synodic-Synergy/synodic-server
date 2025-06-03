import { useAuthStore } from '~/stores/auth';

export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();
 
  // Initialize auth store
  await authStore.initialize();
}); 