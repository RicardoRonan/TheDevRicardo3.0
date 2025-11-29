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
      <!-- Header Section -->
      <section class="pt-24 pt-16 md:pt-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <img src="https://i.postimg.cc/52xz48sW/resources.png" alt="Blog" class="w-24 h-24 object-cover portfolio-icon flex justify-center items-center mx-auto mb-4"></img>
            <h1 class="font-pixelify font-bold text-4xl md:text-5xl text-theme mb-4">
              Blog
            </h1>
            <p class="font-pixelify text-lg text-theme max-w-2xl mx-auto mb-8">
              Thoughts, tutorials, and insights about web development and technology
            </p>
          </div>
        </div>
      </section>

      <!-- Blog Posts Section -->
      <section class="py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Community Message -->
          <div class="text-center py-12 md:py-16">
            <h3 class="font-pixelify font-bold text-xl md:text-2xl text-theme mb-4">View My Blogs</h3>
            <p class="font-pixelify text-theme/75 text-sm md:text-base max-w-2xl mx-auto mb-6">
              You can view my blogs on a digital community made for developers where I share my thoughts, insights, and experiences about web development and technology.
            </p>
            <a 
              href="https://themetastack.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              class="inline-flex items-center px-6 py-3 bg-accent-red text-white font-pixelify font-semibold rounded-lg hover:bg-accent-red/80 transition-all duration-300 transform hover:scale-105"
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

