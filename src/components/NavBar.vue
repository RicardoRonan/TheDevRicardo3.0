<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-theme text-theme h-14 md:h-16 border-b border-theme w-full" @click.self="closeMobileMenu" style="pointer-events: auto;">
    <div class="w-full px-4 sm:px-6 lg:px-8 h-full">
      <div class="flex items-center justify-between h-full w-full">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <router-link to="/" class="block">
            <h1 class="font-pixelify font-bold text-xl text-theme hover:text-accent-red transition-colors duration-150 cursor-pointer">
              TheDevRicardo
            </h1>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:block">
          <div class="flex items-center space-x-8">
            <router-link 
              to="/" 
              class="text-theme hover:text-accent-red transition-colors duration-150 font-pixelify relative"
              :class="{ 'text-accent-red': $route.path === '/' }"
            >
              Home
              <span v-if="$route.path === '/'" class="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-red"></span>
            </router-link>
            <router-link 
              to="/about" 
              class="text-theme hover:text-accent-red transition-colors duration-150 font-pixelify relative"
              :class="{ 'text-accent-red': $route.path === '/about' }"
            >
              About
              <span v-if="$route.path === '/about'" class="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-red"></span>
            </router-link>
            <router-link 
              to="/projects" 
              class="text-theme hover:text-accent-red transition-colors duration-150 font-pixelify relative"
              :class="{ 'text-accent-red': $route.path === '/projects' }"
            >
              Projects
              <span v-if="$route.path === '/projects'" class="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-red"></span>
            </router-link>
            <!-- Resources Dropdown -->
            <div class="relative group">
              <button class="text-theme hover:text-accent-red transition-colors duration-150 font-pixelify relative flex items-center">
                Resources
                <svg class="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              <!-- Invisible bridge to prevent hover gap -->
              <div class="absolute top-full left-0 right-0 h-2 bg-transparent"></div>
              
              <!-- Dropdown Menu -->
              <div class="absolute top-full left-0 w-48 bg-theme border border-theme rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div class="py-2">
                  <router-link 
                    to="/resources"
                    class="block px-4 py-2 text-theme hover:bg-theme-light hover:text-accent-red transition-colors duration-150 font-pixelify"
                  >
                    All Resources
                  </router-link>
                  <div class="border-t border-theme my-1"></div>
                  <router-link 
                    to="/testimonials"
                    class="block px-4 py-2 text-theme hover:bg-theme-light hover:text-accent-red transition-colors duration-150 font-pixelify"
                  >
                    Testimonials
                  </router-link>
                </div>
              </div>
            </div>
            
            <router-link 
              to="/contact" 
              class="text-theme hover:text-accent-red transition-colors duration-150 font-pixelify relative"
              :class="{ 'text-accent-red': $route.path === '/contact' }"
            >
              Contact
              <span v-if="$route.path === '/contact'" class="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-red"></span>
            </router-link>
            <!-- Theme Toggle -->
            <ThemeToggle />
            
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center justify-end min-w-0 flex-shrink-0">
          <!-- Hamburger Menu Button -->
          <button 
            @click="toggleMobileMenu"
            class="p-2 text-theme hover:text-accent-red transition-colors duration-150 flex-shrink-0"
            :aria-expanded="isMobileMenuOpen"
            aria-label="Toggle mobile menu"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
              <path v-else stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu Backdrop -->
      <div 
        v-if="isMobileMenuOpen"
        @click="closeMobileMenu"
        class="md:hidden fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 transition-opacity duration-300 ease-in-out"
        :class="isMobileMenuOpen ? 'opacity-100' : 'opacity-0'"
      ></div>

      <!-- Mobile Navigation Menu -->
      <div 
        v-if="isMobileMenuOpen"
        class="md:hidden fixed top-14 left-0 right-0 bg-theme border-t border-theme shadow-lg z-50 transform transition-all duration-300 ease-in-out"
        :class="isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'"
      >
        <div class="px-4 py-6 space-y-4">
          <router-link 
            to="/" 
            @click="closeMobileMenu"
            class="block text-theme hover:text-accent-red transition-all duration-300 ease-out font-pixelify py-3 px-2 relative rounded-lg hover:bg-theme-light transform"
            :class="{ 'text-accent-red bg-theme-light': $route.path === '/', 'translate-x-0 opacity-100': isMobileMenuOpen, 'translate-x-4 opacity-0': !isMobileMenuOpen }"
            :style="{ 'transition-delay': '0.1s' }"
          >
            Home
            <span v-if="$route.path === '/'" class="absolute left-0 top-0 bottom-0 w-1 bg-accent-red rounded-r"></span>
          </router-link>
          <router-link 
            to="/about" 
            @click="closeMobileMenu"
            class="block text-theme hover:text-accent-red transition-all duration-300 ease-out font-pixelify py-3 px-2 relative rounded-lg hover:bg-theme-light transform"
            :class="{ 'text-accent-red bg-theme-light': $route.path === '/about', 'translate-x-0 opacity-100': isMobileMenuOpen, 'translate-x-4 opacity-0': !isMobileMenuOpen }"
            :style="{ 'transition-delay': '0.15s' }"
          >
            About
            <span v-if="$route.path === '/about'" class="absolute left-0 top-0 bottom-0 w-1 bg-accent-red rounded-r"></span>
          </router-link>
          <router-link 
            to="/projects" 
            @click="closeMobileMenu"
            class="block text-theme hover:text-accent-red transition-all duration-300 ease-out font-pixelify py-3 px-2 relative rounded-lg hover:bg-theme-light transform"
            :class="{ 'text-accent-red bg-theme-light': $route.path === '/projects', 'translate-x-0 opacity-100': isMobileMenuOpen, 'translate-x-4 opacity-0': !isMobileMenuOpen }"
            :style="{ 'transition-delay': '0.2s' }"
          >
            Projects
            <span v-if="$route.path === '/projects'" class="absolute left-0 top-0 bottom-0 w-1 bg-accent-red rounded-r"></span>
          </router-link>
          <router-link 
            to="/resources" 
            @click="closeMobileMenu"
            class="block text-theme hover:text-accent-red transition-all duration-300 ease-out font-pixelify py-3 px-2 relative rounded-lg hover:bg-theme-light transform"
            :class="{ 'text-accent-red bg-theme-light': $route.path === '/resources', 'translate-x-0 opacity-100': isMobileMenuOpen, 'translate-x-4 opacity-0': !isMobileMenuOpen }"
            :style="{ 'transition-delay': '0.25s' }"
          >
            Resources
            <span v-if="$route.path === '/resources'" class="absolute left-0 top-0 bottom-0 w-1 bg-accent-red rounded-r"></span>
          </router-link>
          <router-link 
            to="/testimonials" 
            @click="closeMobileMenu"
            class="block text-theme hover:text-accent-red transition-all duration-300 ease-out font-pixelify py-3 px-2 relative rounded-lg hover:bg-theme-light transform"
            :class="{ 'text-accent-red bg-theme-light': $route.path === '/testimonials', 'translate-x-0 opacity-100': isMobileMenuOpen, 'translate-x-4 opacity-0': !isMobileMenuOpen }"
            :style="{ 'transition-delay': '0.275s' }"
          >
            Testimonials
            <span v-if="$route.path === '/testimonials'" class="absolute left-0 top-0 bottom-0 w-1 bg-accent-red rounded-r"></span>
          </router-link>
          <router-link 
            to="/contact" 
            @click="closeMobileMenu"
            class="block text-theme hover:text-accent-red transition-all duration-300 ease-out font-pixelify py-3 px-2 relative rounded-lg hover:bg-theme-light transform"
            :class="{ 'text-accent-red bg-theme-light': $route.path === '/contact', 'translate-x-0 opacity-100': isMobileMenuOpen, 'translate-x-4 opacity-0': !isMobileMenuOpen }"
            :style="{ 'transition-delay': '0.325s' }"
          >
            Contact
            <span v-if="$route.path === '/contact'" class="absolute left-0 top-0 bottom-0 w-1 bg-accent-red rounded-r"></span>
          </router-link>
          
          <!-- Theme Toggle for Mobile -->
          <div class="pt-4 border-t border-theme transform transition-all duration-300 ease-out"
               :class="{ 'translate-x-0 opacity-100': isMobileMenuOpen, 'translate-x-4 opacity-0': !isMobileMenuOpen }"
               :style="{ 'transition-delay': '0.375s' }">
            <div class="flex items-center justify-between">
              <span class="font-pixelify text-theme">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import ThemeToggle from './ThemeToggle.vue'
import { preventBodyScroll, restoreBodyScroll, forceRestoreBodyScroll } from '../utils/scrollPrevention.js'

export default {
  name: 'NavBar',
  components: {
    ThemeToggle
  },
  setup() {
    const route = useRoute()
    const isMobileMenuOpen = ref(false)

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value
    }

    const closeMobileMenu = () => {
      isMobileMenuOpen.value = false
    }

    // Watch for mobile menu state changes
    watch(isMobileMenuOpen, (isOpen) => {
      if (isOpen) {
        preventBodyScroll()
      } else {
        restoreBodyScroll()
      }
    })

    // Close mobile menu when route changes
    watch(route, () => {
      closeMobileMenu()
    })

    // Close mobile menu on escape key
    const handleKeydown = (event) => {
      if (event.key === 'Escape' && isMobileMenuOpen.value) {
        closeMobileMenu()
      }
    }

    // Add event listener for escape key
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeydown)
    }

    // Cleanup on component unmount
    onUnmounted(() => {
      restoreBodyScroll()
      if (typeof window !== 'undefined') {
        window.removeEventListener('keydown', handleKeydown)
      }
    })

    return {
      isMobileMenuOpen,
      toggleMobileMenu,
      closeMobileMenu
    }
  }
}
</script>
