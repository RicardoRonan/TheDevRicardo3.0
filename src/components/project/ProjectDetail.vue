<template>
  <div 
    class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300 ease-out"
    :class="isVisible ? 'opacity-100' : 'opacity-0'"
    @click="closeModal"
  >
    <div 
      class="bg-theme rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transition-all duration-300 ease-out transform"
      :class="isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'"
      @click.stop
    >
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-theme">
        <h2 class="font-pixelify font-bold text-2xl text-theme">{{ project.title }}</h2>
        <button 
          @click="closeModal"
          class="p-2 hover:bg-theme-light rounded-lg transition-colors duration-200"
        >
          <img 
            src="https://i.postimg.cc/gjrQHQKK/close-button.png" 
            alt="Close" 
            class="w-6 h-6"
          />
        </button>
      </div>
      
      <!-- Content -->
      <div class="p-6">
        <!-- Project Image -->
        <div class="mb-6">
          <img 
            :src="project.img" 
            :alt="project.title"
            class="w-full h-64 md:h-80 object-cover rounded-lg"
          />
        </div>
        
        <!-- Project Info -->
        <div class="mb-6">
          <p class="font-pixelify text-lg text-theme mb-4 opacity-75">
            {{ project.company }}
          </p>
          <p class="font-pixelify text-base text-theme leading-relaxed">
            {{ project.description }}
          </p>
        </div>
        
        <!-- Tech Stack -->
        <div class="mb-6">
          <h3 class="font-pixelify font-semibold text-lg text-theme mb-3">Technologies Used</h3>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="tech in project.tech" 
              :key="tech"
              class="px-3 py-1 bg-theme-light text-theme text-sm font-pixelify rounded-lg"
            >
              {{ tech }}
            </span>
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-3">
          <a 
            v-if="project.liveLink && project.liveLink !== 'N/A'"
            :href="project.liveLink"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center px-6 py-3 bg-accent-red text-white font-pixelify font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 ease-out hover:scale-105"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
            View Live Demo
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { preventBodyScroll, restoreBodyScroll, forceRestoreBodyScroll } from '../../utils/scrollPrevention.js'

export default {
  name: 'ProjectDetail',
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const isVisible = ref(false)

    // Watch for modal visibility changes
    watch(isVisible, (isOpen) => {
      if (isOpen) {
        preventBodyScroll()
      } else {
        restoreBodyScroll()
      }
    })

    const closeModal = () => {
      isVisible.value = false
      // Wait for animation to complete before emitting close
      setTimeout(() => {
        emit('close')
      }, 300)
    }

    onMounted(() => {
      // Trigger animation after component mounts
      setTimeout(() => {
        isVisible.value = true
      }, 10)
    })

    // Cleanup on component unmount
    onUnmounted(() => {
      forceRestoreBodyScroll()
    })

    return {
      isVisible,
      closeModal
    }
  }
}
</script>
