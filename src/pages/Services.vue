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
      <!-- Hero Section with Image -->
      <section class="pt-24 pt-16 md:pt-24 pb-8 md:pb-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-8 md:mb-12">
            <img src="https://i.postimg.cc/wx5zZ0w6/services.png" alt="Services" class="w-24 h-24 object-cover portfolio-icon flex justify-center items-center mx-auto mb-4"></img>
            <h1 class="font-pixelify font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-theme mb-4 md:mb-6 leading-tight">
              FROM IDEA TO LAUNCH — I AM WITH YOU ALL THE WAY
            </h1>
          </div>
          <!-- Hero Image Placeholder -->
          <div class="w-full h-64 md:h-96 lg:h-[500px] bg-theme-light rounded-xl border border-theme overflow-hidden mb-8">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80" 
              alt="Design workspace" 
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <!-- Four Steps Section -->
      <section class="py-12 md:py-16 bg-theme-light">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-8 md:mb-12">
            <h2 class="font-pixelify font-bold text-2xl sm:text-3xl md:text-4xl text-theme mb-4">
              FOUR STEPS — ALL THE WAY OR AS FAR AS YOU WANT
            </h2>
            <p class="font-pixelify text-base md:text-lg text-theme max-w-3xl mx-auto">
              From initial concept to final delivery, I guide you through every stage of the design process. Choose the services you need, or let me handle everything from start to finish.
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div 
              v-for="(service, index) in mainServices" 
              :key="index"
              class="bg-theme rounded-xl p-6 border border-theme hover:border-accent-red transition-all duration-300"
            >
              <div class="text-4xl md:text-5xl font-pixelify font-bold text-accent-red mb-4">
                {{ String(index + 1).padStart(2, '0') }}
              </div>
              <h3 class="font-pixelify font-bold text-lg md:text-xl text-theme mb-3">
                {{ service.title }}
              </h3>
              <p class="font-pixelify text-sm md:text-base text-theme opacity-75">
                {{ service.description }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Alternating Service Detail Sections -->
      <section class="py-12 md:py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Service 01: Logo Design -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-16 md:mb-24">
            <div class="order-2 lg:order-1">
              <h2 class="font-pixelify font-bold text-2xl md:text-3xl lg:text-4xl text-theme mb-4">
                01. LOGO DESIGN
              </h2>
              <p class="font-pixelify text-base md:text-lg text-theme mb-6 opacity-90">
                Timeless, versatile Canva-made logos that capture your brand's personality. From initial concepts to final delivery, I create logos that work across all platforms and mediums.
              </p>
              <div class="mb-6">
                <h3 class="font-pixelify font-semibold text-lg text-theme mb-3">Includes:</h3>
                <ul class="space-y-2">
                  <li class="font-pixelify text-sm md:text-base text-theme flex items-start">
                    <span class="text-accent-red mr-2">•</span>
                    <span>Primary logo + variations (horizontal, icon-only, etc.)</span>
                  </li>
                  <li class="font-pixelify text-sm md:text-base text-theme flex items-start">
                    <span class="text-accent-red mr-2">•</span>
                    <span>Brand guidelines (colors, fonts, usage rules)</span>
                  </li>
                  <li class="font-pixelify text-sm md:text-base text-theme flex items-start">
                    <span class="text-accent-red mr-2">•</span>
                    <span>Multiple concepts & unlimited revisions</span>
                  </li>
                  <li class="font-pixelify text-sm md:text-base text-theme flex items-start">
                    <span class="text-accent-red mr-2">•</span>
                    <span>Final files in all formats (AI, PNG, SVG, PDF, etc.)</span>
                  </li>
                </ul>
              </div>
              <div class="flex flex-wrap gap-4">
                <span class="font-pixelify font-semibold text-accent-red text-lg">Price varies to your specific needs</span>
                <router-link 
                  to="/contact"
                  class="inline-flex items-center px-4 py-2 bg-accent-red text-white font-pixelify font-semibold rounded-lg hover:bg-accent-red/80 transition-all duration-300"
                >
                  Book a meeting
                  <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </router-link>
              </div>
            </div>
            <div class="order-1 lg:order-2">
              <div class="w-full h-64 md:h-80 lg:h-96 bg-theme-light rounded-xl border border-theme overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80" 
                  alt="Logo design process" 
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <!-- Service 02: Business Cards -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-16 md:mb-24">
            <div>
              <div class="w-full h-64 md:h-80 lg:h-96 bg-theme-light rounded-xl border border-theme overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80" 
                  alt="Business cards design" 
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h2 class="font-pixelify font-bold text-2xl md:text-3xl lg:text-4xl text-theme mb-4">
                02. BUSINESS CARDS & PRINT-READY DESIGN
              </h2>
              <p class="font-pixelify text-base md:text-lg text-theme mb-6 opacity-90">
                Stand-out business cards that make a memorable first impression. Professional print-ready designs that reflect your brand's quality and attention to detail.
              </p>
              <div class="mb-6">
                <h3 class="font-pixelify font-semibold text-lg text-theme mb-3">Includes:</h3>
                <ul class="space-y-2">
                  <li class="font-pixelify text-sm md:text-base text-theme flex items-start">
                    <span class="text-accent-red mr-2">•</span>
                    <span>Double-sided custom design</span>
                  </li>
                  <li class="font-pixelify text-sm md:text-base text-theme flex items-start">
                    <span class="text-accent-red mr-2">•</span>
                    <span>Multiple concepts</span>
                  </li>
                  <li class="font-pixelify text-sm md:text-base text-theme flex items-start">
                    <span class="text-accent-red mr-2">•</span>
                    <span>Print-ready files + bleed setup</span>
                  </li>
                  <li class="font-pixelify text-sm md:text-base text-theme flex items-start">
                    <span class="text-accent-red mr-2">•</span>
                    <span>Recommendations for paper, finishes & printers</span>
                  </li>
                </ul>
                <p class="font-pixelify text-sm md:text-base text-theme mt-4 opacity-75">
                  (Add-ons: foil stamping, letterpress, die-cut designs)
                </p>
              </div>
              <div class="flex flex-wrap gap-4">
                <span class="font-pixelify font-semibold text-accent-red text-lg">Price varies to your specific needs</span>
                <router-link 
                  to="/contact"
                  class="inline-flex items-center px-4 py-2 bg-accent-red text-white font-pixelify font-semibold rounded-lg hover:bg-accent-red/80 transition-all duration-300"
                >
                  Read more
                  <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </router-link>
              </div>
            </div>
          </div>

          <!-- Service 03: Posters & Marketing -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-16 md:mb-24">
            <div class="order-2 lg:order-1">
              <h2 class="font-pixelify font-bold text-2xl md:text-3xl lg:text-4xl text-theme mb-4">
                03. POSTERS & MARKETING MATERIALS
              </h2>
              <p class="font-pixelify text-base md:text-lg text-theme mb-6 opacity-90">
                Eye-catching Canva-made posters, flyers, banners, and social media graphics. Perfect for events, promotions, product launches, or brand campaigns.
              </p>
              <div class="mb-6">
                <h3 class="font-pixelify font-semibold text-lg text-theme mb-3">Includes:</h3>
                <ul class="space-y-2">
                  <li class="font-pixelify text-sm md:text-base text-theme flex items-start">
                    <span class="text-accent-red mr-2">•</span>
                    <span>Custom illustration or photo-based designs</span>
                  </li>
                  <li class="font-pixelify text-sm md:text-base text-theme flex items-start">
                    <span class="text-accent-red mr-2">•</span>
                    <span>Multiple sizes & formats</span>
                  </li>
                  <li class="font-pixelify text-sm md:text-base text-theme flex items-start">
                    <span class="text-accent-red mr-2">•</span>
                    <span>Print + digital versions</span>
                  </li>
                  <li class="font-pixelify text-sm md:text-base text-theme flex items-start">
                    <span class="text-accent-red mr-2">•</span>
                    <span>Fast turnaround options</span>
                  </li>
                </ul>
              </div>
              <div class="flex flex-wrap gap-4">
                <span class="font-pixelify font-semibold text-accent-red text-lg">Price varies to your specific needs</span>
                <router-link 
                  to="/contact"
                  class="inline-flex items-center px-4 py-2 bg-accent-red text-white font-pixelify font-semibold rounded-lg hover:bg-accent-red/80 transition-all duration-300"
                >
                  Book an appointment
                  <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </router-link>
              </div>
            </div>
            <div class="order-1 lg:order-2">
              <div class="w-full h-64 md:h-80 lg:h-96 bg-theme-light rounded-xl border border-theme overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80" 
                  alt="Poster design" 
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <!-- Service 04: Website Design -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-16 md:mb-24">
            <div>
              <div class="w-full h-64 md:h-80 lg:h-96 bg-theme-light rounded-xl border border-theme overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80" 
                  alt="Website design" 
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h2 class="font-pixelify font-bold text-2xl md:text-3xl lg:text-4xl text-theme mb-4">
                04. WEBSITE DESIGN & DEVELOPMENT
              </h2>
              <p class="font-pixelify text-base md:text-lg text-theme mb-6 opacity-90">
                Beautiful, fast, and mobile-friendly websites that convert visitors into customers. Custom designs built on modern platforms with full CMS capabilities.
              </p>
              <div class="mb-6">
                <h3 class="font-pixelify font-semibold text-lg text-theme mb-3">Includes:</h3>
                <ul class="space-y-2">
                  <li class="font-pixelify text-sm md:text-base text-theme flex items-start">
                    <span class="text-accent-red mr-2">•</span>
                    <span>Custom design (no templates)</span>
                  </li>
                  <li class="font-pixelify text-sm md:text-base text-theme flex items-start">
                    <span class="text-accent-red mr-2">•</span>
                    <span>Responsive across all devices</span>
                  </li>
                  <li class="font-pixelify text-sm md:text-base text-theme flex items-start">
                    <span class="text-accent-red mr-2">•</span>
                    <span>Built on Webflow, WordPress, or Framer (your choice)</span>
                  </li>
                  <li class="font-pixelify text-sm md:text-base text-theme flex items-start">
                    <span class="text-accent-red mr-2">•</span>
                    <span>Basic SEO setup</span>
                  </li>
                  <li class="font-pixelify text-sm md:text-base text-theme flex items-start">
                    <span class="text-accent-red mr-2">•</span>
                    <span>CMS so you can update content yourself</span>
                  </li>
                  <li class="font-pixelify text-sm md:text-base text-theme flex items-start">
                    <span class="text-accent-red mr-2">•</span>
                    <span>2 weeks of post-launch support</span>
                  </li>
                </ul>
              </div>
              <div class="flex flex-wrap gap-4">
                <span class="font-pixelify font-semibold text-accent-red text-lg">Price varies to your specific needs</span>
                <router-link 
                  to="/contact"
                  class="inline-flex items-center px-4 py-2 bg-accent-red text-white font-pixelify font-semibold rounded-lg hover:bg-accent-red/80 transition-all duration-300"
                >
                  Read more
                  <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- How It Works Section -->
      <section class="py-12 md:py-16 bg-theme-light">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="font-pixelify font-bold text-3xl md:text-4xl text-theme mb-4">
              HOW IT WORKS
            </h2>
            <p class="font-pixelify text-base md:text-lg text-theme max-w-2xl mx-auto">
              A simple, collaborative process to bring your vision to life
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
            <div 
              v-for="(step, index) in processSteps" 
              :key="index"
              class="text-center"
            >
              <div class="w-16 h-16 md:w-20 md:h-20 bg-accent-red rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="font-pixelify font-bold text-white text-2xl md:text-3xl">{{ index + 1 }}</span>
              </div>
              <h3 class="font-pixelify font-bold text-lg md:text-xl text-theme mb-2">
                {{ step.title }}
              </h3>
              <p class="font-pixelify text-sm md:text-base text-theme opacity-75">
                {{ step.description }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQs Section -->
      <section class="py-12 md:py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h2 class="font-pixelify font-bold text-3xl md:text-4xl text-theme mb-4">
                FAQs
              </h2>
              <p class="font-pixelify text-base md:text-lg text-theme mb-6">
                Do you have questions about my services?
              </p>
              <router-link 
                to="/contact"
                class="inline-flex items-center px-6 py-3 bg-accent-red text-white font-pixelify font-semibold rounded-lg hover:bg-accent-red/80 transition-all duration-300"
              >
                Browse FAQs
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </router-link>
            </div>
            <div>
              <div 
                v-for="(faq, index) in faqs" 
                :key="index"
                class="mb-4 border-b border-theme pb-4"
              >
                <button
                  @click="toggleFAQ(index)"
                  class="w-full text-left flex items-center justify-between font-pixelify font-bold text-lg text-theme hover:text-accent-red transition-colors"
                >
                  <span>{{ faq.question }}</span>
                  <svg 
                    class="w-5 h-5 transform transition-transform"
                    :class="{ 'rotate-180': openFAQs[index] }"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div 
                  v-show="openFAQs[index]"
                  class="mt-2 font-pixelify text-sm md:text-base text-theme opacity-75"
                >
                  {{ faq.answer }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Final CTA Section -->
      <section class="py-16 md:py-24 bg-theme-light">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="font-pixelify font-bold text-3xl md:text-4xl lg:text-5xl text-theme mb-6">
            BOOK AN APPOINTMENT TO START YOUR JOURNEY OF CHANGE
          </h2>
          <p class="font-pixelify text-base md:text-lg text-theme mb-8 max-w-2xl mx-auto">
            Let's discuss the challenges you are facing and how I can help you bring your vision to life.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <router-link 
              to="/contact"
              class="inline-flex items-center px-8 py-4 bg-accent-red text-white font-pixelify font-semibold text-lg rounded-lg hover:bg-accent-red/80 transition-all duration-300 transform hover:scale-105"
            >
              Book a meeting
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </router-link>
            <p class="font-pixelify text-theme opacity-75">
              or email: <a href="mailto:ricardoronanm@gmail.com" class="text-accent-red hover:underline">ricardoronanm@gmail.com</a>
            </p>
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
  name: 'Services',
  components: {
    NavBar,
    Footer
  },
  setup() {
    const showContent = ref(false)
    const openFAQs = ref({})

    const mainServices = ref([
      {
        title: 'LOGO DESIGN',
        description: 'Timeless, versatile logos that capture your brand\'s personality.'
      },
      {
        title: 'PRINT & MARKETING',
        description: 'Business cards, posters, and marketing materials that make an impact.'
      },
      {
        title: 'WEBSITE DESIGN',
        description: 'Beautiful, fast, and mobile-friendly websites that convert.'
      },
      {
        title: 'PROJECT FOLLOW-UP',
        description: 'Ongoing support and refinements to ensure your success.'
      }
    ])

    const processSteps = ref([
      {
        title: 'Discovery Call',
        description: 'I talk with you about your brand, goals, and vision.'
      },
      {
        title: 'Research & Moodboard',
        description: 'I study your industry and create a direction.'
      },
      {
        title: 'Design Concepts',
        description: 'You get 2–3 strong options to choose from.'
      },
      {
        title: 'Refinement',
        description: 'I polish the chosen direction with your feedback.'
      },
      {
        title: 'Delivery',
        description: 'You receive all final files and assets, ready to use.'
      }
    ])

    const faqs = ref([
      {
        question: 'How long does a typical project take?',
        answer: 'Project timelines vary based on scope. Logo design typically takes 2-3 weeks, while website projects can take 4-8 weeks depending on complexity.'
      },
      {
        question: 'Do you offer revisions?',
        answer: 'Yes! All packages include unlimited revisions during the design phase to ensure you\'re completely happy with the final result.'
      },
      {
        question: 'What file formats do I receive?',
        answer: 'You\'ll receive all necessary file formats including AI, PNG, SVG, PDF, and more, depending on the project type.'
      },
      {
        question: 'Can I use the designs commercially?',
        answer: 'Absolutely! Once the project is complete and paid for, you own full commercial rights to all designs.'
      }
    ])

    const toggleFAQ = (index) => {
      openFAQs.value[index] = !openFAQs.value[index]
    }

    onMounted(() => {
      // Trigger fade-in animation after component mounts
      setTimeout(() => {
        showContent.value = true
      }, 100)
    })

    return {
      showContent,
      mainServices,
      processSteps,
      faqs,
      openFAQs,
      toggleFAQ
    }
  }
}
</script>
