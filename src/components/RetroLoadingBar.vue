<template>
  <div 
    v-if="isLoading"
    class="fixed inset-0 z-[9999] flex items-center justify-center retro-loading-bg"
    :class="{ 'fade-out': isTransitioning }"
  >
    <!-- Retro PC Screen Frame -->
    <div class="relative w-full h-full max-w-4xl max-h-3xl mx-auto retro-screen-frame p-4">
      <!-- Screen Bezel -->
      <div class="absolute inset-0 retro-screen-bezel rounded-lg shadow-2xl">
        <!-- Purple accent lines on the sides -->
        <div class="absolute left-0 top-0 bottom-0 w-1 bg-purple-600"></div>
        <div class="absolute right-0 top-0 bottom-0 w-1 bg-purple-600"></div>
      </div>
      
      <!-- Screen Content -->
      <div class="relative z-10 retro-screen-content h-full rounded-lg flex flex-col items-center justify-center p-8">
        <!-- Loading Text -->
        <div class="mb-8">
          <h1 class="font-pixelify font-bold text-4xl md:text-6xl tracking-wider retro-loading-text">
            LOADING
          </h1>
        </div>
        
        <!-- Retro Loading Bar Container -->
        <div class="w-full max-w-md">
          <!-- Loading Bar Frame -->
          <div class="relative retro-loading-frame p-2">
            <!-- Loading Bar Background -->
            <div class="retro-loading-bg-bar h-8 relative overflow-hidden">
              <!-- Loading Blocks -->
              <div 
                class="absolute top-0 left-0 h-full transition-all duration-300 ease-out retro-loading-progress"
                :style="{ width: loadingProgress + '%' }"
              >
                <!-- Pixelated blocks effect -->
                <div class="h-full retro-loading-progress" style="background-image: repeating-linear-gradient(90deg, transparent 0px, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 4px);"></div>
              </div>
            </div>
          </div>
          
          <!-- Loading Percentage -->
          <div class="text-center mt-4">
            <span class="font-pixelify text-2xl retro-loading-text">
              {{ Math.round(loadingProgress) }}%
            </span>
          </div>
        </div>
        
        <!-- Retro Computer Text -->
        <div class="mt-8 text-center">
          <p class="font-pixelify text-lg retro-loading-subtext">
            Initializing system...
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'RetroLoadingBar',
  props: {
    duration: {
      type: Number,
      default: 3000 // 3 seconds default
    },
    autoStart: {
      type: Boolean,
      default: true
    }
  },
  emits: ['loading-complete'],
  setup(props, { emit }) {
    const isLoading = ref(false)
    const isTransitioning = ref(false)
    const loadingProgress = ref(0)
    let loadingInterval = null

    const startLoading = () => {
      isLoading.value = true
      loadingProgress.value = 0
      
      const increment = 100 / (props.duration / 50) // Update every 50ms
      
      loadingInterval = setInterval(() => {
        loadingProgress.value += increment
        
        if (loadingProgress.value >= 100) {
          loadingProgress.value = 100
          clearInterval(loadingInterval)
          
          // Wait a moment then start transition
          setTimeout(() => {
            isTransitioning.value = true
            
            // Emit completion event and hide after transition
            setTimeout(() => {
              isLoading.value = false
              isTransitioning.value = false
              emit('loading-complete')
            }, 500)
          }, 500)
        }
      }, 50)
    }

    const stopLoading = () => {
      if (loadingInterval) {
        clearInterval(loadingInterval)
      }
      isTransitioning.value = true
      
      setTimeout(() => {
        isLoading.value = false
        isTransitioning.value = false
        emit('loading-complete')
      }, 500)
    }

    onMounted(() => {
      if (props.autoStart) {
        startLoading()
      }
    })

    onUnmounted(() => {
      if (loadingInterval) {
        clearInterval(loadingInterval)
      }
    })

    return {
      isLoading,
      isTransitioning,
      loadingProgress,
      startLoading,
      stopLoading
    }
  }
}
</script>

<style scoped>
/* Pixelated font styling */
.font-pixelify {
  font-family: "Pixelify Sans", monospace;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  letter-spacing: 2px;
  line-height: 1.2;
}

/* Theme-aware loading background */
.retro-loading-bg {
  background-color: var(--bg-fill);
  transition: background-color 0.3s ease;
}

/* Theme-aware screen frame */
.retro-screen-frame {
  background-color: var(--card-border-color);
  transition: background-color 0.3s ease;
}

/* Theme-aware screen bezel */
.retro-screen-bezel {
  background-color: var(--bg-fill-invert);
  box-shadow: 
    0 0 20px rgba(0, 0, 0, 0.5),
    inset 0 0 20px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease;
}

/* Theme-aware screen content */
.retro-screen-content {
  background: linear-gradient(135deg, var(--bg-fill) 0%, var(--bg-light-override) 100%);
  transition: background 0.3s ease;
}

/* Theme-aware loading text */
.retro-loading-text {
  color: var(--bg-fill-invert);
  transition: color 0.3s ease;
}

/* Theme-aware loading subtext */
.retro-loading-subtext {
  color: var(--card-border-color);
  transition: color 0.3s ease;
}

/* Theme-aware loading frame */
.retro-loading-frame {
  background-color: var(--bg-fill);
  border: 4px solid var(--bg-fill-invert);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

/* Theme-aware loading bar background */
.retro-loading-bg-bar {
  background-color: var(--card-border-color);
  transition: background-color 0.3s ease;
}

/* Theme-aware loading progress */
.retro-loading-progress {
  background-color: #10b981; /* Keep green for retro feel */
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    inset 0 -1px 0 rgba(0, 0, 0, 0.2);
}

/* Dark mode specific adjustments */
body[data-color-scheme="dark"] .retro-loading-progress {
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    inset 0 -1px 0 rgba(0, 0, 0, 0.4);
}

/* Fade out animation */
.fade-out {
  animation: fadeOut 0.5s ease-out forwards;
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
