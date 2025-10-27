<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 transition-opacity duration-300"
    @click="closeModal"
  >
    <!-- Modal Content -->
    <div 
      class="relative bg-theme-light rounded-2xl p-6 max-w-md w-full mx-4 transform transition-all duration-300 scale-100"
      @click.stop
    >
      <!-- Close Button -->
      <button 
        @click="closeModal"
        class="absolute top-4 right-4 text-theme hover:text-accent-red transition-colors duration-200"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      
      <!-- Testimonial Image -->
      <div class="mb-4 flex justify-center">
        <img 
          :src="testimonial?.img" 
          :alt="testimonial?.name"
          class="w-64 h-64 object-cover rounded-lg border-2 border-theme"
          @error="handleImageError"
        >
      </div>
      
      <!-- Testimonial Info -->
      <div class="text-center">
        <h3 class="font-pixelify font-bold text-xl text-theme mb-2">
          {{ testimonial?.name }}
        </h3>
        <p class="font-pixelify text-sm text-accent-red mb-4">
          {{ testimonial?.role }}
        </p>
        <blockquote class="font-pixelify text-sm text-theme italic leading-relaxed">
          "{{ testimonial?.testimonial }}"
        </blockquote>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, onUnmounted } from 'vue'

export default {
  name: 'TestimonialModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    testimonial: {
      type: Object,
      default: null
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const closeModal = () => {
      emit('close')
    }

    const handleImageError = (event) => {
      console.error('Failed to load modal image:', event.target.src)
      // You could set a fallback image here if needed
    }

    // Close modal on Escape key
    const handleKeydown = (event) => {
      if (event.key === 'Escape') {
        closeModal()
      }
    }

    watch(() => props.isOpen, (isOpen) => {
      if (isOpen) {
        document.addEventListener('keydown', handleKeydown)
        // Prevent body scroll
        document.body.style.overflow = 'hidden'
        document.body.style.position = 'fixed'
        document.body.style.width = '100%'
        document.body.style.top = `-${window.scrollY}px`
      } else {
        document.removeEventListener('keydown', handleKeydown)
        // Restore body scroll
        const scrollY = document.body.style.top
        document.body.style.overflow = 'auto'
        document.body.style.position = ''
        document.body.style.width = ''
        document.body.style.top = ''
        if (scrollY) {
          window.scrollTo(0, parseInt(scrollY || '0') * -1)
        }
      }
    })

    // Cleanup on component unmount
    onUnmounted(() => {
      document.removeEventListener('keydown', handleKeydown)
      // Ensure scroll is restored if component unmounts while modal is open
      document.body.style.overflow = 'auto'
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
    })

    return {
      closeModal,
      handleImageError
    }
  }
}
</script>

<style scoped>
/* Ensure modal appears above everything */
.fixed {
  z-index: 9999;
}
</style>
