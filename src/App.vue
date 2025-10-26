<template>
  <div id="app">
    <!-- Intro Animation (only on home page) -->
    <IntroAnimation v-if="isHomePage" />
    
    <!-- Main App Content -->
    <router-view />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import IntroAnimation from './components/IntroAnimation.vue'

export default {
  name: 'App',
  components: {
    IntroAnimation
  },
  setup() {
    const route = useRoute()
    
    const isHomePage = computed(() => route.path === '/')
    
    return {
      isHomePage
    }
  }
}
</script>
