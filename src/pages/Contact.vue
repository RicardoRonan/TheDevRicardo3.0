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
      <!-- Hero Section -->
        <section class="pt-24 py-16 md:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img src="https://i.postimg.cc/gcTX6gv4/3.png" alt="Contact" class="w-24 h-24  object-cover portfolio-icon flex justify-center items-center mx-auto mb-4">
          <h1 class="font-pixelify font-bold text-4xl md:text-6xl mb-6 text-theme">
            Get In Touch
          </h1>
          <p class="font-pixelify text-lg md:text-xl text-theme max-w-2xl mx-auto">
            Let's work together to bring your ideas to life
          </p>
        </div>
      </section>

      <!-- Contact Form Section -->
      <section class="pt-24 pb-16 md:py-24 bg-theme">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <!-- Contact Info -->
            <div>
              <h2 class="font-pixelify font-bold text-3xl mb-6 text-theme">Contact Information</h2>
              <div class="space-y-6">
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-accent-red rounded-full flex items-center justify-center mr-4">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-pixelify font-semibold text-theme">Email</h3>
                    <p class="font-pixelify text-theme">ricardoronanm@gmail.com</p>
                  </div>
                </div>
                
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-accent-red rounded-full flex items-center justify-center mr-4">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-pixelify font-semibold text-theme">Phone</h3>
                    <p class="font-pixelify text-theme">0762834237</p>
                  </div>
                </div>
                
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-accent-red rounded-full flex items-center justify-center mr-4">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-pixelify font-semibold text-theme">Location</h3>
                    <p class="font-pixelify text-theme">Cape Town, South Africa</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Contact Form -->
            <div class="w-full">
              <h2 class="font-pixelify font-bold text-3xl mb-6">Send a Message</h2>
              <form action="https://formspree.io/f/mnqwedov" method="POST" class="contact-form space-y-6 w-full">
                <div>
                  <label class="block font-pixelify font-semibold mb-2 text-theme">Name</label>
                  <input 
                    type="text" 
                    name="name"
                    class="w-full px-4 py-2 bg-theme-light border border-theme rounded-lg text-theme placeholder-theme-secondary focus:ring-2 focus:ring-accent-red focus:border-accent-red focus:outline-none transition-all duration-200"
                    style="width: 100%; box-sizing: border-box;"
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div>
                  <label class="block font-pixelify font-semibold mb-2 text-theme">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    class="w-full px-4 py-2 bg-theme-light border border-theme rounded-lg text-theme placeholder-theme-secondary focus:ring-2 focus:ring-accent-red focus:border-accent-red focus:outline-none transition-all duration-200"
                    style="width: 100%; box-sizing: border-box;"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label class="block font-pixelify font-semibold mb-2 text-theme">Message</label>
                  <textarea 
                    name="message"
                    rows="5"
                    class="w-full px-4 py-2 bg-theme-light border border-theme rounded-lg text-theme placeholder-theme-secondary focus:ring-2 focus:ring-accent-red focus:border-accent-red focus:outline-none transition-all duration-200 resize-vertical"
                    style="width: 100%; box-sizing: border-box;"
                    placeholder="Tell me about your project..."
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  class="w-full bg-accent-red text-white font-pixelify font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>
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
  name: 'Contact',
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
