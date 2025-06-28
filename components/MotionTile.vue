<template>
  <div
    ref="motionRef"
    :class="[
      'relative aspect-square bg-gradient-to-br from-dark-secondary/80 to-orange-500/10 backdrop-blur-lg border border-dark-border rounded-2xl shadow-lg transition-all duration-300 overflow-hidden flex flex-col',
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
      motionRef.value.style.transform = 'scale(0.9)'
      
      // Animate in
      setTimeout(() => {
        if (motionRef.value) {
          motionRef.value.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          motionRef.value.style.opacity = '1'
          motionRef.value.style.transform = 'scale(1)'
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
  transform: scale(1.04);
  box-shadow: 0 6px 24px 0 rgba(255, 140, 0, 0.15);
}

/* Active/tap effects */
div:active {
  transform: scale(0.97);
}
</style> 