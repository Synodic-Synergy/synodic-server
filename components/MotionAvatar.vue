<template>
  <div
    ref="motionRef"
    :class="[
      'inline-block rounded-full border-2 border-orange-400 bg-dark-secondary/60 shadow-md overflow-hidden',
      sizeClass,
      $attrs.class
    ]"
    v-bind="$attrs"
  >
    <img :src="src" :alt="alt" :class="['object-cover w-full h-full', sizeClass]" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  size: { type: String, default: 'md' }
})

const motionRef = ref<HTMLElement>()

const sizeClass = computed(() => {
  if (props.size === 'sm') return 'w-8 h-8';
  if (props.size === 'lg') return 'w-16 h-16';
  return 'w-12 h-12';
})

onMounted(async () => {
  await nextTick()
  
  if (motionRef.value) {
    try {
      // Apply initial state
      motionRef.value.style.opacity = '0'
      motionRef.value.style.transform = 'scale(0.8)'
      
      // Animate in
      setTimeout(() => {
        if (motionRef.value) {
          motionRef.value.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
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
  transform: scale(1.08);
  box-shadow: 0 2px 8px 0 rgba(99,102,241,0.25);
}
</style> 