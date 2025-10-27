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
            <img src="https://i.postimg.cc/52xz48sW/resources.png" alt="Resources" class="w-24 h-24 object-cover portfolio-icon flex justify-center items-center mx-auto mb-4"></img>
            <h1 class="font-pixelify font-bold text-4xl md:text-5xl text-theme mb-4">
              Resources
            </h1>
            <p class="font-pixelify text-lg text-theme max-w-2xl mx-auto mb-8">
              A curated collection of tools, guides, and resources to help you succeed
            </p>
          </div>
        </div>
        
        <!-- Full Width Search Bar -->
        <div class="w-full px-4 sm:px-6 lg:px-8 mb-6 md:mb-8">
          <div class="relative max-w-4xl mx-auto">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search resources..."
              id="search-resources"
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

      <!-- Resources Grid Section -->
      <section class="py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Results Counter -->
          <div class="mb-6 md:mb-8">
            <p class="font-pixelify text-theme/75 text-center text-sm md:text-base">
              Showing {{ filteredResources.length }} of {{ allResources.length }} resources
            </p>
          </div>

          <!-- Resources List -->
          <div v-if="filteredResources.length > 0" class="max-w-5xl mx-auto">
            <div class="space-y-4 md:space-y-6">
              <div 
                v-for="resource in filteredResources" 
                :key="resource.name" 
                class="bg-theme-light rounded-xl p-4 md:p-6 border border-theme hover:border-accent-red transition-all duration-300 hover:shadow-lg group h-auto md:h-32"
              >
                <!-- Mobile Layout -->
                <div class="block md:hidden">
                  <div class="flex items-start justify-between mb-3">
                    <h3 class="font-pixelify font-bold text-lg text-theme group-hover:text-accent-red transition-colors flex-1 pr-2">{{ resource.name }}</h3>
                    <div class="flex flex-col items-end gap-1 flex-shrink-0">
                      <span class="px-2 py-1 bg-theme/10 text-theme text-xs font-pixelify rounded-full">{{ resource.type }}</span>
                      <span v-if="resource.format" class="text-xs text-theme/60 font-pixelify text-right">{{ resource.format }}</span>
                    </div>
                  </div>
                  <p class="font-pixelify text-sm text-theme opacity-75 mb-3">{{ resource.category }}</p>
                  <p class="font-pixelify text-sm text-theme leading-relaxed mb-4 line-clamp-3">{{ resource.description }}</p>
                  <a 
                    :href="resource.link" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="inline-flex items-center text-accent-red font-pixelify font-semibold text-sm hover:underline group-hover:text-accent-red/80 transition-colors px-3 py-2 rounded-lg hover:bg-accent-red/10 w-full justify-center"
                  >
                    {{ resource.type === 'Download' ? 'Download' : 'Visit' }}
                    <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                  </a>
                </div>

                <!-- Desktop Layout -->
                <div class="hidden md:block">
                  <div class="flex items-start justify-between gap-6">
                    <div class="flex items-start flex-1 gap-6">
                      <div class="flex-1 min-w-0">
                        <div class="flex items-start justify-between mb-3">
                          <h3 class="font-pixelify font-bold text-xl text-theme group-hover:text-accent-red transition-colors">{{ resource.name }}</h3>
                          <div class="flex items-center gap-3 ml-6 flex-shrink-0">
                            <span class="px-3 py-1 bg-theme/10 text-theme text-xs font-pixelify rounded-full">{{ resource.type }}</span>
                            <span v-if="resource.format" class="text-xs text-theme/60 font-pixelify">{{ resource.format }}</span>
                          </div>
                        </div>
                        <p class="font-pixelify text-sm text-theme opacity-75 mb-3">{{ resource.category }}</p>
                        <p class="font-pixelify text-base text-theme leading-relaxed">{{ resource.description }}</p>
                      </div>
                    </div>
                    <div class="flex-shrink-0">
                      <a 
                        :href="resource.link" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="inline-flex items-center text-accent-red font-pixelify font-semibold text-sm hover:underline group-hover:text-accent-red/80 transition-colors px-4 py-2 rounded-lg hover:bg-accent-red/10"
                      >
                        {{ resource.type === 'Download' ? 'Download' : 'Visit' }}
                        <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
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
            <h3 class="font-pixelify font-bold text-xl md:text-2xl text-theme mb-2">No resources found</h3>
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
  name: 'Resources',
  components: {
    NavBar,
    Footer
  },
  setup() {
    const showContent = ref(false)
    const searchQuery = ref('')
    const selectedCategory = ref('All')
    const showBackToTop = ref(false)

    // Unified resources data structure
    const allResources = ref([
      // Development Tools
      {
        name: 'VS Code',
        category: 'Development Tools',
        type: 'Tool',
        description: 'My go-to code editor with amazing extensions and customization options.',
        icon: '💻',
        link: 'https://code.visualstudio.com/',
        format: 'Desktop App'
      },
      {
        name: 'GitHub',
        category: 'Development Tools',
        type: 'Tool',
        description: 'Essential for version control, collaboration, and open source development.',
        icon: '🐙',
        link: 'https://github.com/',
        format: 'Web Platform'
      },
      {
        name: 'Postman',
        category: 'Development Tools',
        type: 'Tool',
        description: 'Powerful tool for testing APIs and building API documentation.',
        icon: '📮',
        link: 'https://postman.com/',
        format: 'Desktop App'
      },
      {
        name: 'Docker',
        category: 'Development Tools',
        type: 'Tool',
        description: 'Containerization platform that simplifies deployment and scaling.',
        icon: '🐳',
        link: 'https://docker.com/',
        format: 'Desktop App'
      },
      
      // Design Tools
      {
        name: 'Figma',
        category: 'Design Tools',
        type: 'Tool',
        description: 'Collaborative design tool for creating beautiful user interfaces and prototypes.',
        icon: '🎨',
        link: 'https://figma.com/',
        format: 'Web App'
      },
      {
        name: 'Coolors',
        category: 'Design Tools',
        type: 'Tool',
        description: 'Generate beautiful color palettes and explore color schemes.',
        icon: '🌈',
        link: 'https://coolors.co/',
        format: 'Web App'
      },
      {
        name: 'Unsplash',
        category: 'Design Tools',
        type: 'Resource',
        description: 'Beautiful, free stock photos for your projects.',
        icon: '📸',
        link: 'https://unsplash.com/',
        format: 'Web Platform'
      },
      {
        name: 'Font Awesome',
        category: 'Design Tools',
        type: 'Resource',
        description: 'The world\'s most popular icon set and toolkit.',
        icon: '⭐',
        link: 'https://fontawesome.com/',
        format: 'Web Service'
      },

      // Learning Resources
      {
        name: 'MDN Web Docs',
        category: 'Learning Resources',
        type: 'Documentation',
        description: 'The ultimate resource for web development documentation.',
        icon: '📚',
        link: 'https://developer.mozilla.org/',
        format: 'Web Documentation'
      },
      {
        name: 'Vue.js Docs',
        category: 'Learning Resources',
        type: 'Documentation',
        description: 'Official documentation for the Vue.js framework.',
        icon: '🟢',
        link: 'https://vuejs.org/',
        format: 'Web Documentation'
      },
      {
        name: 'Tailwind CSS',
        category: 'Learning Resources',
        type: 'Documentation',
        description: 'Utility-first CSS framework for rapid UI development.',
        icon: '🎨',
        link: 'https://tailwindcss.com/',
        format: 'Web Documentation'
      },
      {
        name: 'CSS Tricks',
        category: 'Learning Resources',
        type: 'Tutorial',
        description: 'Amazing CSS tutorials, tips, and tricks.',
        icon: '💡',
        link: 'https://css-tricks.com/',
        format: 'Web Tutorial'
      },

      // Community & Inspiration
      {
        name: 'Dribbble',
        category: 'Community & Inspiration',
        type: 'Platform',
        description: 'Discover amazing design work and get inspired by creative professionals.',
        icon: '🏀',
        link: 'https://dribbble.com/',
        format: 'Web Platform'
      },
      {
        name: 'CodePen',
        category: 'Community & Inspiration',
        type: 'Platform',
        description: 'Online code editor for HTML, CSS, and JavaScript with live preview.',
        icon: '✏️',
        link: 'https://codepen.io/',
        format: 'Web Platform'
      },
      {
        name: 'Stack Overflow',
        category: 'Community & Inspiration',
        type: 'Platform',
        description: 'Where developers ask questions and share knowledge.',
        icon: '❓',
        link: 'https://stackoverflow.com/',
        format: 'Web Platform'
      },
      {
        name: 'Dev.to',
        category: 'Community & Inspiration',
        type: 'Platform',
        description: 'A community of developers sharing knowledge and experiences.',
        icon: '👥',
        link: 'https://dev.to/',
        format: 'Web Platform'
      },

      // Productivity
      {
        name: 'Notion',
        category: 'Productivity',
        type: 'Tool',
        description: 'All-in-one workspace for notes, docs, and project management.',
        icon: '📝',
        link: 'https://notion.so/',
        format: 'Web App'
      },
      {
        name: 'Can I Use',
        category: 'Productivity',
        type: 'Tool',
        description: 'Check browser support for CSS and JavaScript features.',
        icon: '🌐',
        link: 'https://caniuse.com/',
        format: 'Web Tool'
      }
    ])

    // Categories for filtering
    const categories = computed(() => {
      const cats = ['All', ...new Set(allResources.value.map(resource => resource.category))]
      return cats
    })

    // Filtered resources based on search and category
    const filteredResources = computed(() => {
      let filtered = allResources.value

      // Filter by category
      if (selectedCategory.value !== 'All') {
        filtered = filtered.filter(resource => resource.category === selectedCategory.value)
      }

      // Filter by search query
      if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(resource => 
          resource.name.toLowerCase().includes(query) ||
          resource.description.toLowerCase().includes(query) ||
          resource.category.toLowerCase().includes(query) ||
          resource.type.toLowerCase().includes(query)
        )
      }

      return filtered
    })

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
      allResources,
      filteredResources,
      scrollToTop
    }
  }
}
</script>
<style scoped>
#search-resources {
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