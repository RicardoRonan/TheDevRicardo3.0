<template>
  <article 
    ref="cardElement"
    class="bg-theme rounded-2xl overflow-hidden border border-theme transition-all duration-300 ease-out cursor-pointer hover:border-accent-red group"
    :class="[
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    ]"
    @click="viewProject"
  >
    <div class="p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-pixelify font-bold text-xl text-theme group-hover:text-accent-red transition-colors duration-300">
          {{ project.title }}
        </h3>
        <div class="flex items-center space-x-2">
          <svg class="w-4 h-4 text-theme group-hover:text-accent-red group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </div>
      
      <p class="font-pixelify text-sm text-theme mb-4 opacity-75">
        {{ project.company }}
      </p>
      
      <p class="font-pixelify text-base text-theme mb-4 leading-relaxed line-clamp-2">
        {{ project.description }}
      </p>
      
      <div class="flex items-center justify-between">
        <div class="flex space-x-3">
          <a 
            v-if="project.liveLink && project.liveLink !== 'N/A'"
            :href="project.liveLink"
            @click.stop
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center px-3 py-1 bg-accent-red text-white text-xs font-pixelify rounded-lg hover:bg-red-700 transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-105"
          >
            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
            Live
          </a>
        </div>
        <span class="text-xs text-theme opacity-50 font-pixelify group-hover:text-accent-red group-hover:opacity-100 transition-all duration-300">
          Click to view details
        </span>
      </div>
    </div>
  </article>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'ProjectListItem',
  props: {
    project: {
      type: Object,
      required: true
    },
    delay: {
      type: Number,
      default: 0
    }
  },
  emits: ['view-project'],
  setup(props, { emit }) {
    const cardElement = ref(null)
    const isVisible = ref(false)
    let observer = null

    const viewProject = () => {
      emit('view-project', props.project)
    }

    onMounted(() => {
      // Set up Intersection Observer for scroll animation
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Add delay for staggered animation
              setTimeout(() => {
                isVisible.value = true
              }, props.delay)
              observer.unobserve(entry.target)
            }
          })
        },
        {
          threshold: 0.15,
          rootMargin: '0px 0px -100px 0px'
        }
      )

      if (cardElement.value) {
        observer.observe(cardElement.value)
      }
    })

    onUnmounted(() => {
      if (observer && cardElement.value) {
        observer.unobserve(cardElement.value)
      }
    })

    return {
      cardElement,
      isVisible,
      viewProject
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
