<template>
  <div 
    v-if="showIntro"
    class="fixed inset-0 z-[9999] flex items-center justify-center bg-theme backdrop-blur-md"
    :class="{ 'fade-out': isTransitioning }"
    style="background-color: var(--bg-fill);"
  >
    <div class="text-center">
      <!-- HI Animation - appears first on its own -->
      <div 
        class="mb-8"
        :class="{ 'animate-pop': showHi }"
      >
        <h1 class="font-pixelify font-bold text-6xl md:text-8xl text-accent-red">
          HI
        </h1>
      </div>
      
      <!-- Welcome Message - appears after HI -->
      <div 
        class="opacity-0 transition-opacity duration-1000"
        :class="{ 'opacity-100': showWelcome }"
      >
        <p class="font-pixelify text-xl md:text-3xl text-theme max-w-2xl mx-auto leading-relaxed">
          I'm Ricardo Moses, welcome to my portfolio
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { preventBodyScroll, restoreBodyScroll, forceRestoreBodyScroll } from '../utils/scrollPrevention.js'

export default {
  name: 'IntroAnimation',
  setup() {
    const route = useRoute()
    const showIntro = ref(false)
    const showHi = ref(false)
    const showWelcome = ref(false)
    const isTransitioning = ref(false)

    // Watch for intro visibility changes
    watch(showIntro, (isOpen) => {
      if (isOpen) {
        preventBodyScroll()
      } else {
        restoreBodyScroll()
      }
    })

    onMounted(() => {
      // Only show intro on home page
      const isHomePage = route.path === '/'
      
      // Check if intro has been shown in this session
      const hasShownIntro = sessionStorage.getItem('introShown')
      
      console.log('IntroAnimation mounted:', { hasHomePage: isHomePage, hasShownIntro })
      
      // Show intro only if on home page and not shown before in this session
      if (isHomePage && !hasShownIntro) {
        console.log('Showing intro animation on home page')
        showIntro.value = true
        sessionStorage.setItem('introShown', 'true')
        
        // Debug: Log when intro is shown
        console.log('Intro should be visible now')
        
        // HI appears first on its own
        setTimeout(() => {
          showHi.value = true
        }, 300)
        
        // Welcome message appears after HI
        setTimeout(() => {
          showWelcome.value = true
        }, 2000)
        
        // Start transition to main content
        setTimeout(() => {
          isTransitioning.value = true
        }, 4000)
        
        // Hide intro completely
        setTimeout(() => {
          showIntro.value = false
        }, 4500)
      } else {
        console.log('Intro not shown - either not home page or already shown in this session')
      }
    })

    // Cleanup function to reset intro state when component unmounts
    onUnmounted(() => {
      // Restore body scroll
      restoreBodyScroll()
      // Reset all animation states
      showIntro.value = false
      showHi.value = false
      showWelcome.value = false
      isTransitioning.value = false
    })

    // Cleanup on component unmount
    onUnmounted(() => {
      forceRestoreBodyScroll()
    })

    return {
      showIntro,
      showHi,
      showWelcome,
      isTransitioning
    }
  }
}
</script>

<style scoped>
@keyframes pop {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-pop {
  animation: pop 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

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
