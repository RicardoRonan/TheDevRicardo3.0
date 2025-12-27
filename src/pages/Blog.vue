<template>
  <div class="min-h-screen bg-theme">
    <NavBar />
    
    <!-- Main Content - fades in smoothly -->
    <main 
      class="transition-all duration-1000 ease-out relative"
      :class="{ 
        'opacity-100': showContent,
        'opacity-0': !showContent 
      }"
    >
      <!-- Main Focus Section -->
      <section class="pt-24 py-16 md:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <img src="https://i.postimg.cc/52xz48sW/resources.png" alt="Blog" class="w-24 h-24 mx-auto mb-4">
            <h1 class="font-pixelify font-bold text-4xl md:text-5xl text-theme mb-4">
              My Blogs Live on
            </h1>
            <h2 class="font-pixelify font-bold text-3xl md:text-4xl text-accent-red mb-4">
              The Meta Stack
            </h2>
            <p class="font-pixelify text-lg text-theme max-w-2xl mx-auto mb-8">
              A digital community for developers where I share my thoughts, insights, and experiences about web development and technology
            </p>
            <a 
              href="https://themetastack.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              class="inline-flex items-center px-6 py-3 bg-accent-red text-white font-pixelify font-semibold rounded-lg hover:bg-accent-red/90 transition-all duration-300"
            >
              Visit The Meta Stack
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
          </div>
        </div>
      </section>
    </main>
    
    <Footer />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import NavBar from '../components/layout/NavBar.vue'
import Footer from '../components/layout/Footer.vue'

export default {
  name: 'Blog',
  components: {
    NavBar,
    Footer
  },
  setup() {
    const showContent = ref(false)

    onMounted(() => {
      // Trigger fade-in animation after component mounts
      setTimeout(() => {
        showContent.value = true
      }, 100)
    })

    return {
      showContent
    }
  }
}
</script>

