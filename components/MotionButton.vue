<template>
  <component
    :is="to ? 'NuxtLink' : 'button'"
    ref="motionRef"
    :to="to"
    :type="type"
    :disabled="disabled"
    :class="[
      'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none cursor-pointer',
      color === 'orange' ? 'bg-orange-500 hover:bg-orange-600 text-white' : '',
      color === 'blue' ? 'bg-blue-500 hover:bg-blue-600 text-white' : '',
      color === 'gray' ? 'bg-dark-secondary hover:bg-dark-primary text-text-primary' : '',
      color === 'green' ? 'bg-green-500 hover:bg-green-600 text-white' : '',
      color === 'purple' ? 'bg-purple-500 hover:bg-purple-600 text-white' : '',
      color === 'red' ? 'bg-red-500 hover:bg-red-600 text-white' : '',
      size === 'lg' ? 'px-6 py-3 text-lg' : size === 'sm' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2 text-base',
      disabled ? 'opacity-50 cursor-not-allowed' : '',
      $attrs.class
    ]"
    v-bind="$attrs"
    @click="handleClick"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

const props = defineProps({
  color: { type: String, default: 'orange' },
  size: { type: String, default: 'base' },
  to: { type: String, default: '' },
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const motionRef = ref<HTMLElement>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}

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
button:hover,
a:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 16px 0 rgba(255, 140, 0, 0.15);
}

/* Active/tap effects */
button:active,
a:active {
  transform: scale(0.96);
}

/* Disabled state */
button:disabled,
a:disabled {
  transform: none !important;
  box-shadow: none !important;
}
</style> 