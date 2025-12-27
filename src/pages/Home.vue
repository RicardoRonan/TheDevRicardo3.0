<template>
  <div class="bg-theme">
    <!-- Intro Animation -->
    <IntroAnimation />
    
    <!-- Navigation - always visible and functional -->
    <NavBar />
    
    <!-- Main Content - fades in smoothly -->
    <main 
      class="transition-all duration-1000 ease-out relative"
      :class="{ 
        'opacity-100': showContent,
        'opacity-0': !showContent 
      }"
    >
      <!-- Hero Section -->
      <Hero />
      
      <!-- Overview Section -->
      <section class="py-8 md:py-12 flex justify-center items-center" style="padding-top: 6rem;">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12 sm:mb-16 px-4">
            <h2 class="font-pixelify font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-theme mb-4">
             Check out some of my pages
            </h2>
            <p class="font-pixelify text-base sm:text-lg text-theme max-w-2xl mx-auto">
              Explore my work, learn about my journey, and discover the technologies I work with
            </p>
          </div>
          
          <!-- Navigation Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
            <!-- About Card -->
            <router-link 
              to="/about"
              class="group bg-theme rounded-2xl p-4 sm:p-6 border border-theme hover:border-accent-red transition-all duration-300 ease-out bg-theme-light"
            >
              <div class="text-center">
                 <div class="flex justify-center mb-4"><img src="https://i.postimg.cc/wjbp1VTd/icons-3.png" alt="About Me" class="w-24 h-24  object-cover portfolio-icon"></div>
                <h3 class="font-pixelify font-bold text-xl sm:text-2xl text-theme mb-2 group-hover:text-accent-red transition-colors dura tion-300">
                  About Me
                </h3>
                <p class="font-pixelify text-sm sm:text-base text-theme mb-4 leading-relaxed">
                  Learn about my journey, passion for development, and the story behind my work
                </p>
                <div class="inline-flex items-center text-accent-red font-pixelify font-semibold">
                  Learn More
                  <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </router-link>

            <!-- Projects Card -->
            <router-link 
              to="/projects"
              class="group bg-theme rounded-2xl p-4 sm:p-6 border border-theme hover:border-accent-red transition-all duration-300 ease-out bg-theme-light"
            >
              <div class="text-center">
                 <div class="flex justify-center mb-4"><img src="https://i.postimg.cc/wjL2Sxyv/pc.png" alt="Projects" class="w-24 h-24  object-cover portfolio-icon"></div>
                <h3 class="font-pixelify font-bold text-xl sm:text-2xl text-theme mb-2 group-hover:text-accent-red transition-colors duration-300">
                  My Projects
                </h3>
                <p class="font-pixelify text-sm sm:text-base text-theme mb-4 leading-relaxed">
                  Browse through my portfolio of client work, personal projects, and tech assessments
                </p>
                <div class="inline-flex items-center text-accent-red font-pixelify font-semibold">
                  View Projects
                  <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </router-link>

            <!-- Contact Card -->
            <router-link 
              to="/contact"
              class="group bg-theme rounded-2xl p-4 sm:p-6 border border-theme hover:border-accent-red transition-all duration-300 ease-out bg-theme-light"
            >
              <div class="text-center">
                 <div class="flex justify-center mb-4"><img src="https://i.postimg.cc/gcTX6gv4/3.png" alt="Contact" class="w-24 h-24  object-cover portfolio-icon"></div>
                <h3 class="font-pixelify font-bold text-xl sm:text-2xl text-theme mb-2 group-hover:text-accent-red transition-colors duration-300">
                  Get In Touch
                </h3>
                <p class="font-pixelify text-sm sm:text-base text-theme mb-4 leading-relaxed">
                  Ready to work together? Let's discuss your next project
                </p>
                <div class="inline-flex items-center text-accent-red font-pixelify font-semibold">
                  Contact Me
                  <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </section>
    </main>
    
    <!-- Footer -->
    <div class="relative z-10">
      <Footer />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import NavBar from '../components/layout/NavBar.vue'
import Hero from '../components/Hero.vue'
import Footer from '../components/layout/Footer.vue'
import IntroAnimation from '../components/IntroAnimation.vue'

export default {
  name: 'Portfolio',
  components: {
    NavBar,
    Hero,
    Footer,
    IntroAnimation
  },
  setup() {
    const showContent = ref(false)

    const testIntro = () => {
      // Clear session storage to allow intro to show again
      sessionStorage.removeItem('introShown')
      // Reload the page to trigger intro
      window.location.reload()
    }

    onMounted(() => {
      // Always show content immediately - let intro animation handle its own visibility
      showContent.value = true
    })

    return {
      showContent,
      testIntro
    }
  }
}
</script>
