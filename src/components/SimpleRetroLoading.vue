<template>
  <div 
    v-if="showLoading"
    class="fixed inset-0 z-[9999] flex items-center justify-center popup-loader-overlay"
    :class="{ 'fade-out': isTransitioning }"
  >
    <!-- Popup Dialog Container -->
    <div class="popup-loader-dialog">
      <!-- Simple Retro Loading Screen -->
      <div class="text-center p-8">
        <!-- Loading Text -->
        <h1 class="font-pixelify font-bold text-3xl sm:text-4xl md:text-6xl mb-8 tracking-wider retro-loading-text">
          LOADING
        </h1>
        
        <!-- Retro Loading Bar -->
        <div class="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto px-4">
          <!-- Loading Bar Frame -->
          <div class="retro-loading-frame p-2">
            <!-- Loading Bar Background -->
            <div class="retro-loading-bg-bar h-8 relative overflow-hidden">
              <!-- Loading Blocks -->
              <div 
                class="absolute top-0 left-0 h-full transition-all duration-300 ease-out retro-loading-progress"
                :style="{ width: progress + '%' }"
              >
                <!-- Pixelated blocks effect -->
                <div class="h-full retro-loading-progress" style="background-image: repeating-linear-gradient(90deg, transparent 0px, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 4px);"></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Loading Message -->
        <div class="mt-6 px-4">
          <p class="font-pixelify text-base sm:text-lg retro-loading-subtext">
            {{ loadingMessage }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'SimpleRetroLoading',
  props: {
    duration: {
      type: Number,
      default: 2000 // 2 seconds default
    },
    autoStart: {
      type: Boolean,
      default: true
    },
    loadingMessage: {
      type: String,
      default: 'Loading content...'
    }
  },
  emits: ['complete'],
  setup(props, { emit }) {
    const showLoading = ref(false)
    const isTransitioning = ref(false)
    const progress = ref(0)
    let loadingInterval = null

    const startLoading = () => {
      showLoading.value = true
      progress.value = 0
      
      const increment = 100 / (props.duration / 30) // Update every 30ms
      
      loadingInterval = setInterval(() => {
        progress.value += increment
        
        if (progress.value >= 100) {
          progress.value = 100
          clearInterval(loadingInterval)
          
          // Start transition
          setTimeout(() => {
            isTransitioning.value = true
            
            // Hide after transition
            setTimeout(() => {
              showLoading.value = false
              isTransitioning.value = false
              emit('complete')
            }, 500)
          }, 300)
        }
      }, 30)
    }

    const stopLoading = () => {
      if (loadingInterval) {
        clearInterval(loadingInterval)
      }
      isTransitioning.value = true
      
      setTimeout(() => {
        showLoading.value = false
        isTransitioning.value = false
        emit('complete')
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
      showLoading,
      isTransitioning,
      progress,
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

/* Popup loader overlay with blur */
.popup-loader-overlay {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: all 0.3s ease;
}

/* Popup dialog container */
.popup-loader-dialog {
  background-color: var(--bg-fill);
  border: 4px solid var(--bg-fill-invert);
  border-radius: 16px;
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 95%;
  margin: 1rem;
  animation: popupSlideIn 0.3s ease-out;
  transition: all 0.3s ease;
}

/* Popup slide-in animation */
@keyframes popupSlideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Theme-aware loading text */
.retro-loading-text {
  color: var(--bg-fill-invert);
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
