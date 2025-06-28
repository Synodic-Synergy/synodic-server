<template>
  <div
    ref="motionRef"
    :class="[
      'relative bg-dark-secondary/80 backdrop-blur-lg border border-dark-border rounded-xl shadow-lg transition-all duration-300 overflow-hidden',
      $attrs.class
    ]"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

const motionRef = ref<HTMLElement>()

onMounted(async () => {
  await nextTick()
  
  if (motionRef.value) {
    try {
      // Apply initial state
      motionRef.value.style.opacity = '0'
      motionRef.value.style.transform = 'translateY(40px) scale(0.95)'
      
      // Animate in
      setTimeout(() => {
        if (motionRef.value) {
          motionRef.value.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
          motionRef.value.style.opacity = '1'
          motionRef.value.style.transform = 'translateY(0) scale(1)'
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
div:hover {
  transform: scale(1.02) translateY(-2px);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

/* Active/tap effects */
div:active {
  transform: scale(0.98);
}
</style> 