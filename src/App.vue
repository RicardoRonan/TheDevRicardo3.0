<template>
  <div id="app">
    <!-- Intro Animation (handles initial load) -->
    <IntroAnimation />
    
    <!-- Main App Content -->
    <router-view />
  </div>
</template>

<script>
import IntroAnimation from './components/IntroAnimation.vue'

export default {
  name: 'App',
  components: {
    IntroAnimation
  }
}
</script>
