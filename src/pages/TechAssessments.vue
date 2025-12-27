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
            <img src="https://i.postimg.cc/52xz48sW/resources.png" alt="Tech Assessments" class="w-24 h-24 object-cover portfolio-icon flex justify-center items-center mx-auto mb-4"></img>
            <h1 class="font-pixelify font-bold text-4xl md:text-5xl text-theme mb-4">
              Tech Assessments
            </h1>
            <p class="font-pixelify text-lg text-theme max-w-2xl mx-auto mb-8">
              A collection of technical assessments and coding challenges I've completed
            </p>
          </div>
        </div>
        
        <!-- Full Width Search Bar -->
        <div class="w-full px-4 sm:px-6 lg:px-8 mb-6 md:mb-8">
          <div class="relative max-w-4xl mx-auto">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search assessments..."
              id="search-assessments"
              class="w-full px-4 py-3 pl-12 pr-4 bg-theme-light border border-theme rounded-lg focus:border-accent-red focus:outline-none transition-colors duration-300 font-pixelify text-theme placeholder-theme/60 text-sm md:text-base"
            />
            <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-theme/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>

        <!-- Category Filters -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-wrap justify-center gap-2 mb-6 md:mb-8">
            <button
              v-for="category in categories"
              :key="category"
              @click="selectedCategory = category"
              :class="[
                'px-3 py-2 md:px-4 rounded-full font-pixelify text-xs md:text-sm transition-all duration-300 whitespace-nowrap',
                selectedCategory === category
                  ? 'bg-accent-red text-white'
                  : 'bg-theme-light text-theme hover:bg-theme hover:text-theme-light border border-theme'
              ]"
            >
              {{ category }}
            </button>
          </div>
        </div>
      </section>

      <!-- Assessments Grid Section -->
      <section class="py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Results Counter -->
          <div class="mb-6 md:mb-8">
            <p class="font-pixelify text-theme/75 text-center text-sm md:text-base">
              Showing {{ filteredAssessments.length }} of {{ allAssessments.length }} assessments
            </p>
          </div>

          <!-- Assessments List -->
          <div v-if="filteredAssessments.length > 0" class="max-w-5xl mx-auto">
            <div class="space-y-4 md:space-y-6">
              <div 
                v-for="assessment in filteredAssessments" 
                :key="assessment.id" 
                class="bg-theme-light rounded-xl p-4 md:p-6 border border-theme hover:border-accent-red transition-all duration-300 hover:shadow-lg group"
              >
                <!-- Mobile Layout -->
                <div class="block md:hidden">
                  <div class="flex items-start justify-between mb-3">
                    <h3 class="font-pixelify font-bold text-lg text-theme group-hover:text-accent-red transition-colors flex-1 pr-2">{{ assessment.title }}</h3>
                    <div class="flex flex-col items-end gap-1 flex-shrink-0">
                      <span class="px-2 py-1 bg-theme/10 text-theme text-xs font-pixelify rounded-full">{{ assessment.company }}</span>
                      <span v-if="assessment.status" :class="getStatusClass(assessment.status)" class="px-2 py-1 text-xs font-pixelify rounded-full">{{ assessment.status }}</span>
                    </div>
                  </div>
                  <p class="font-pixelify text-sm text-theme opacity-75 mb-3">{{ assessment.category }}</p>
                  <p class="font-pixelify text-sm text-theme leading-relaxed mb-3 line-clamp-3">{{ assessment.description }}</p>
                  <div class="flex flex-wrap gap-2 mb-3">
                    <span v-for="tech in assessment.tech" :key="tech" class="px-2 py-1 bg-theme/20 text-theme text-xs font-pixelify rounded">
                      {{ tech }}
                    </span>
                  </div>
                  <div v-if="assessment.date" class="text-xs text-theme/60 font-pixelify mb-4">
                    Completed: {{ formatDate(assessment.date) }}
                  </div>
                  <div class="flex gap-2">
                    <a 
                      v-if="assessment.link" 
                      :href="assessment.link" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      class="inline-flex items-center text-accent-red font-pixelify font-semibold text-sm hover:underline group-hover:text-accent-red/80 transition-colors px-3 py-2 rounded-lg hover:bg-accent-red/10 flex-1 justify-center"
                    >
                      View Details
                      <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                    </a>
                    <a 
                      v-if="assessment.githubLink" 
                      :href="assessment.githubLink" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      class="inline-flex items-center text-theme font-pixelify font-semibold text-sm hover:text-accent-red transition-colors px-3 py-2 rounded-lg hover:bg-theme border border-theme"
                    >
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  </div>
                </div>

                <!-- Desktop Layout -->
                <div class="hidden md:block">
                  <div class="flex items-start justify-between gap-6">
                    <div class="flex items-start flex-1 gap-6">
                      <div class="flex-1 min-w-0">
                        <div class="flex items-start justify-between mb-3">
                          <h3 class="font-pixelify font-bold text-xl text-theme group-hover:text-accent-red transition-colors">{{ assessment.title }}</h3>
                          <div class="flex items-center gap-3 ml-6 flex-shrink-0">
                            <span class="px-3 py-1 bg-theme/10 text-theme text-xs font-pixelify rounded-full">{{ assessment.company }}</span>
                            <span v-if="assessment.status" :class="getStatusClass(assessment.status)" class="px-3 py-1 text-xs font-pixelify rounded-full">{{ assessment.status }}</span>
                          </div>
                        </div>
                        <p class="font-pixelify text-sm text-theme opacity-75 mb-3">{{ assessment.category }}</p>
                        <p class="font-pixelify text-base text-theme leading-relaxed mb-3">{{ assessment.description }}</p>
                        <div class="flex flex-wrap gap-2 mb-3">
                          <span v-for="tech in assessment.tech" :key="tech" class="px-2 py-1 bg-theme/20 text-theme text-xs font-pixelify rounded">
                            {{ tech }}
                          </span>
                        </div>
                        <div v-if="assessment.date" class="text-xs text-theme/60 font-pixelify">
                          Completed: {{ formatDate(assessment.date) }}
                        </div>
                      </div>
                    </div>
                    <div class="flex-shrink-0 flex flex-col gap-2">
                      <a 
                        v-if="assessment.link" 
                        :href="assessment.link" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="inline-flex items-center text-accent-red font-pixelify font-semibold text-sm hover:underline group-hover:text-accent-red/80 transition-colors px-4 py-2 rounded-lg hover:bg-accent-red/10 whitespace-nowrap"
                      >
                        View Details
                        <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                      </a>
                      <a 
                        v-if="assessment.githubLink" 
                        :href="assessment.githubLink" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="inline-flex items-center justify-center text-theme font-pixelify font-semibold text-sm hover:text-accent-red transition-colors px-4 py-2 rounded-lg hover:bg-theme border border-theme"
                      >
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- No Results -->
          <div v-else class="text-center py-12 md:py-16">
            <div class="text-4xl md:text-6xl mb-4">🔍</div>
            <h3 class="font-pixelify font-bold text-xl md:text-2xl text-theme mb-2">No assessments found</h3>
            <p class="font-pixelify text-theme/75 text-sm md:text-base">Try adjusting your search or filter criteria</p>
          </div>
        </div>
      </section>

      <!-- Back to Top Button -->
      <button
        v-show="showBackToTop"
        @click="scrollToTop"
        class="fixed bottom-8 right-8 bg-accent-red text-white p-3 rounded-full shadow-lg hover:bg-accent-red/80 transition-all duration-300 z-50"
        aria-label="Back to top"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
      </button>
    </main>
    
    <Footer />
  </div>
</template>

<script>
import { ref, onMounted, computed, onUnmounted } from 'vue'
import NavBar from '../components/layout/NavBar.vue'
import Footer from '../components/layout/Footer.vue'

export default {
  name: 'TechAssessments',
  components: {
    NavBar,
    Footer
  },
  setup() {
    const showContent = ref(false)
    const searchQuery = ref('')
    const selectedCategory = ref('All')
    const showBackToTop = ref(false)

    // Tech assessments data structure
    const allAssessments = ref([
      // Add your tech assessments here
      // Example structure:
      // {
      //   id: 1,
      //   title: 'Assessment Title',
      //   company: 'Company Name',
      //   category: 'Frontend',
      //   description: 'Description of the assessment',
      //   tech: ['Vue.js', 'JavaScript', 'CSS'],
      //   date: '2024-01-15',
      //   status: 'Completed',
      //   link: 'https://example.com',
      //   githubLink: 'https://github.com/example'
      // }
    ])

    // Categories for filtering
    const categories = computed(() => {
      const cats = ['All', ...new Set(allAssessments.value.map(assessment => assessment.category))]
      return cats
    })

    // Filtered assessments based on search and category
    const filteredAssessments = computed(() => {
      let filtered = allAssessments.value

      // Filter by category
      if (selectedCategory.value !== 'All') {
        filtered = filtered.filter(assessment => assessment.category === selectedCategory.value)
      }

      // Filter by search query
      if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(assessment => 
          assessment.title.toLowerCase().includes(query) ||
          assessment.description.toLowerCase().includes(query) ||
          assessment.company.toLowerCase().includes(query) ||
          assessment.category.toLowerCase().includes(query) ||
          assessment.tech.some(tech => tech.toLowerCase().includes(query))
        )
      }

      return filtered
    })

    // Format date
    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    }

    // Get status badge class
    const getStatusClass = (status) => {
      const statusLower = status.toLowerCase()
      if (statusLower === 'completed' || statusLower === 'passed') {
        return 'bg-green-500/20 text-green-500'
      } else if (statusLower === 'in progress' || statusLower === 'pending') {
        return 'bg-yellow-500/20 text-yellow-500'
      } else {
        return 'bg-theme/10 text-theme'
      }
    }

    // Back to top functionality
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    const handleScroll = () => {
      showBackToTop.value = window.scrollY > 300
    }

    onMounted(() => {
      // Trigger fade-in animation after component mounts
      setTimeout(() => {
        showContent.value = true
      }, 100)

      // Add scroll listener for back to top button
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      showContent,
      searchQuery,
      selectedCategory,
      showBackToTop,
      categories,
      allAssessments,
      filteredAssessments,
      formatDate,
      getStatusClass,
      scrollToTop
    }
  }
}
</script>

<style scoped>
#search-assessments {
  width: 100%;
}

/* Line clamp utility for mobile text truncation */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
