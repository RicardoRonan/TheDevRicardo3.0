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
          <a 
            v-if="project.githubLink && project.githubLink !== 'N/A'"
            :href="project.githubLink"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center px-6 py-3 border border-theme text-theme font-pixelify font-semibold rounded-lg hover:bg-theme hover:text-theme-light transition-all duration-300 ease-out hover:scale-105"
          >
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { preventBodyScroll, restoreBodyScroll, forceRestoreBodyScroll } from '../utils/scrollPrevention.js'

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
