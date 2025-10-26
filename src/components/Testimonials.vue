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
      <!-- Testimonials Section -->
      <section class="pt-24 py-16 md:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <img src="https://i.postimg.cc/W4PYLCw4/testimonials.png" alt="Testimonials" class="w-24 h-24 mx-auto mb-4">
            <h1 class="font-pixelify font-bold text-4xl md:text-5xl text-theme mb-4">
              Testimonials
            </h1>
            <p class="font-pixelify text-lg text-theme max-w-2xl mx-auto">
              What clients and colleagues say about my work
            </p>
          </div>
          
          <!-- Testimonials Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              v-for="(testimonial, index) in testimonials" 
              :key="testimonial.id"
              class=" rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-theme-light"
              :style="{ 'animation-delay': `${index * 100}ms` }"
            >
              <!-- Quote Icon -->
              <div class="mb-4">
                <svg class="w-8 h-8 text-accent-red" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>
              
              <!-- Testimonial Text -->
              <blockquote class="text-theme font-pixelify text-base mb-6 leading-relaxed">
                "{{ testimonial.testimonial }}"
              </blockquote>
              
              <!-- Author Info -->
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <img 
                    :src="testimonial.pixelImg" 
                    :alt="testimonial.name"
                    class="w-12 h-12 rounded-full object-cover border-2 border-theme"
                    @error="handleImageError($event, testimonial)"
                    @load="handleImageLoad($event, testimonial)"
                    loading="lazy"
                  >
                  <!-- Fallback placeholder if both images fail -->
                  <div 
                    v-if="!testimonial.imageLoaded" 
                    class="w-12 h-12 rounded-full border-2 border-theme bg-theme-light flex items-center justify-center text-theme font-pixelify text-xs"
                  >
                    {{ testimonial.name.charAt(0) }}
                  </div>
                </div>
                <div class="ml-4">
                  <div class="font-pixelify font-semibold text-theme">
                    {{ testimonial.name }}
                  </div>
                  <div class="font-pixelify text-sm text-accent-red">
                    {{ testimonial.role }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Call to Action -->
          <div class="text-center mt-16">
            <div class="bg-theme-light border border-theme rounded-2xl p-8 max-w-4xl mx-auto">
              <h2 class="font-pixelify font-bold text-2xl md:text-3xl text-theme mb-4">
                Ready to work together?
              </h2>
              <p class="font-pixelify text-lg text-theme mb-6">
                Let's discuss your project and see how I can help bring your vision to life.
              </p>
              <router-link 
                to="/contact"
                class="inline-flex items-center px-8 py-3 bg-accent-red text-white font-pixelify font-semibold rounded-lg hover:bg-accent-red/80 transition-colors duration-200"
              >
                Get In Touch
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </section>
    </main>
    
    <Footer />
    
    <!-- Image Loading Popup -->
    <SimpleRetroLoading 
      v-if="showImageLoading"
      :duration="1200"
      :loading-message="'Loading testimonials...'"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import NavBar from './NavBar.vue'
import Footer from './Footer.vue'
import SimpleRetroLoading from './SimpleRetroLoading.vue'

export default {
  name: 'Testimonials',
  components: {
    NavBar,
    Footer,
    SimpleRetroLoading
  },
  setup() {
    const showContent = ref(false)
    const showImageLoading = ref(false)
    
    const testimonials = ref([
      {
        id: 1,
        name: "Fatima Galant",
        pixelImg: "https://i.postimg.cc/F155LSvx/1658336859156.png",
        img: "https://i.postimg.cc/CMG5NXwh/Fatima-1-1.jpg",
        testimonial:
          " Ricardo is a hard-working, talented and authentic individual who always goes above and beyond to achieve the best results possible. His good vibes and positivity is contagious.",
        role: "Colleague",
        imageLoaded: false,
      },
      {
        id: 2,
        name: "Ashton Abrahams",
        pixelImg: "https://i.postimg.cc/T1gtLGbW/1658339507305-1.png",
        img: "https://i.postimg.cc/yd8rWw6V/Ashton-4.jpg",
        testimonial:
          "Ricardo is a dedicated individual who never stops improving, he is a team player and a valuable asset to any team",
        role: "Colleague",
        imageLoaded: false,
      },
      {
        id: 3,
        name: "Natheerah Abrahams",
        pixelImg: "https://i.postimg.cc/bw0SK1wc/1658338391828.png",
        img: "https://i.postimg.cc/FFkPYbgX/Natheerah-3-1.jpg",
        testimonial:
          "Ricardo Moses has a winning attitude and is always willin  g to learns new things. He is always willing to extend a helping hand to assist others.",
        role: "Colleague",
        imageLoaded: false,
      },
      {
        id: 4,
        name: "Carla Amy Lawrence",
        pixelImg: "https://i.postimg.cc/d0H2xG5Q/1658339669009.png",
        img: "https://i.postimg.cc/q7SjMgFG/Carla.png",
        testimonial:
          " It has been a pleasure to have Ricardo Ronan Moses as my colleague. He is an outstanding web developer.His professionalism and effort can be seen in all projects he has worked on.I would highly recommend Ricardo as an addition to any team or company.",
        role: "Colleague",
        imageLoaded: false,
      },
      {
        id: 5,
        name: "Jason Wandrag",
        pixelImg: "https://i.postimg.cc/Mp4R0zHX/1658339743203.png",
        img: "https://i.postimg.cc/5NbpthsD/Jason.jpg",
        testimonial:
          "Out of all the people I have engaged with, Ricardo is one of the most creative I have come across. He is very skilled in creating visual pieces, which will definitely push him to be a great frontend developer. ",
        role: "Lecturer",
        imageLoaded: false,
      },
      {
        id: 6,
        name: "Najmah Japtha",
        pixelImg: "https://i.postimg.cc/W4Fzsr21/1658342993413.png",
        img: "https://i.postimg.cc/Y9G3ZgpH/IMG-20220720-WA0022.jpg",
        testimonial:
          " RICARDO is a well-adjusted young man with a positive attitude who always tried hard to do his best at his schoolwork. A glance through his high school record will reveal a learner who applied himself in an attempt to gain success in his studies. ",
        role: "Former Teacher",
        imageLoaded: false,
      },
      {
        id: 7,
        name: "Aaliyah Jardien",
        pixelImg: "https://i.postimg.cc/m2nhJ8s5/1658343772237.png",
        img: "https://i.postimg.cc/HnMpPScC/IMG-20220720-WA0026.jpg",
        testimonial:
          "Ricardo thrives in creative environments & works well with others. He would be a great asset to any team.",
        role: "Junior Developer",
        imageLoaded: false,
      },
      {
        id: 8,
        name: "Uzair Damonse",
        pixelImg: "https://i.postimg.cc/KvGswDNB/1658344828431.png",
        img: "https://i.postimg.cc/nh4XLLLt/IMG-20220720-211835.jpg",
        testimonial:
          "Ricardo is a person that improves the environment around him with his positivity and pure presence. His ability in both styling his application and the functionality is astronomically good and in my opinion, is one of the best when comes to mobile responsiveness. With all of this in mind, I truly believe he is an excellent candidate for a software development role.",
        role: "Colleague",
        imageLoaded: false,
      },
    ])

    const handleImageError = (event, testimonial) => {
      console.error(`Failed to load image for ${testimonial.name}:`, testimonial.pixelImg)
      // Fallback to regular image if pixel image fails
      if (event.target.src === testimonial.pixelImg) {
        event.target.src = testimonial.img
      } else {
        // Both images failed, show placeholder
        testimonial.imageLoaded = false
        event.target.style.display = 'none'
      }
    }

    const handleImageLoad = (event, testimonial) => {
      console.log('Image loaded successfully:', event.target.src)
      testimonial.imageLoaded = true
    }

    onMounted(() => {
      // Show loading for images
      showImageLoading.value = true
      
      // Trigger fade-in animation after component mounts
      setTimeout(() => {
        showContent.value = true
        // Hide loading after content is ready
        setTimeout(() => {
          showImageLoading.value = false
        }, 1200)
      }, 100)
    })

    return {
      showContent,
      showImageLoading,
      testimonials,
      handleImageError,
      handleImageLoad
    }
  }
}
</script>

<style scoped>
/* Animation for testimonial cards */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.bg-theme-light {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}
</style>
