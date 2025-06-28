<template>
  <button
    ref="motionRef"
    :class="[
      'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none',
      color === 'orange' ? 'bg-orange-500 hover:bg-orange-600 text-white' : '',
      color === 'blue' ? 'bg-blue-500 hover:bg-blue-600 text-white' : '',
      color === 'gray' ? 'bg-dark-secondary hover:bg-dark-primary text-text-primary' : '',
      size === 'lg' ? 'px-6 py-3 text-lg' : size === 'sm' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2 text-base',
      $attrs.class
    ]"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

const props = defineProps({
  color: { type: String, default: 'orange' },
  size: { type: String, default: 'base' }
})

const motionRef = ref<HTMLButtonElement>()

onMounted(async () => {
  await nextTick()
  
  if (motionRef.value) {
    try {
      // Apply initial state
      motionRef.value.style.opacity = '0'
      motionRef.value.style.transform = 'translateY(20px)'
      
      // Animate in
      setTimeout(() => {
        if (motionRef.value) {
          motionRef.value.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          motionRef.value.style.opacity = '1'
          motionRef.value.style.transform = 'translateY(0)'
        }
      }, 100)
    } catch (error) {
      console.warn('Motion animation failed:', error)
    }
  }
})
</script>

<style scoped>
/* Hover effects */
button:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 16px 0 rgba(255, 140, 0, 0.15);
}

/* Active/tap effects */
button:active {
  transform: scale(0.96);
}
</style> 