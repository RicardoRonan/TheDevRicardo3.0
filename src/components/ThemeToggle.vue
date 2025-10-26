<template>
  <button 
    @click="toggleTheme"
    class="p-2 text-theme hover:text-accent-red transition-all duration-200 rounded-lg hover:bg-theme-light focus:outline-none focus:ring-2 focus:ring-accent-red focus:ring-offset-2"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <!-- Moon icon for dark mode (shows when in light mode) -->
    <svg v-if="!isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
    </svg>
    <!-- Sun icon for light mode (shows when in dark mode) -->
    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
    </svg>
  </button>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'ThemeToggle',
  setup() {
    const isDark = ref(false)

    const toggleTheme = () => {
      isDark.value = !isDark.value
      const body = document.body
      
      if (isDark.value) {
        body.setAttribute('data-color-scheme', 'dark')
        localStorage.setItem('theme', 'dark')
        console.log('Switched to dark mode')
      } else {
        body.setAttribute('data-color-scheme', 'light')
        localStorage.setItem('theme', 'light')
        console.log('Switched to light mode')
      }
      
      // Force a re-render to ensure theme changes are applied
      setTimeout(() => {
        document.documentElement.style.colorScheme = isDark.value ? 'dark' : 'light'
      }, 50)
    }

    onMounted(() => {
      // Check for saved theme preference or default to light mode
      const savedTheme = localStorage.getItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      
      console.log('ThemeToggle mounted:', { savedTheme, prefersDark })
      
      if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        isDark.value = true
        document.body.setAttribute('data-color-scheme', 'dark')
        document.documentElement.style.colorScheme = 'dark'
        console.log('Initialized to dark mode')
      } else {
        isDark.value = false
        document.body.setAttribute('data-color-scheme', 'light')
        document.documentElement.style.colorScheme = 'light'
        console.log('Initialized to light mode')
      }
    })

    return {
      isDark,
      toggleTheme
    }
  }
}
</script>
