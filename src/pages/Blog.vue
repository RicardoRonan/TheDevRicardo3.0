<template>
  <div class="min-h-screen bg-theme">
    <NavBar />
    
    <!-- Main Content -->
    <main 
      class="transition-all duration-1000 ease-out relative"
      :class="{ 
        'opacity-100': showContent,
        'opacity-0': !showContent 
      }"
    >
      <!-- Hero Section -->
      <section class="pt-24 py-16 md:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogHero 
            :featured-post="featuredPost"
            :total-posts="allPosts.length"
          />
        </div>
      </section>

      <!-- Search and Filters -->
      <section class="py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Search Bar -->
          <div class="relative max-w-2xl mx-auto mb-8">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search articles..."
              class="w-full px-4 py-3 pl-12 pr-4 bg-theme-light border border-theme rounded-lg focus:border-accent-red focus:outline-none transition-colors duration-300 font-pixelify text-theme placeholder-theme/60"
            />
            <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-theme/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>

          <!-- Category Filters -->
          <div class="flex flex-wrap justify-center gap-2 mb-8">
            <button
              v-for="category in categories"
              :key="category"
              @click="selectedCategory = category"
              :class="[
                'px-4 py-2 rounded-full font-pixelify text-sm transition-all duration-300',
                selectedCategory === category
                  ? 'bg-accent-red text-white'
                  : 'bg-theme-light text-theme hover:bg-theme hover:text-theme-light border border-theme'
              ]"
            >
              {{ category }}
            </button>
          </div>

          <!-- Sort Options -->
          <div class="flex justify-center mb-8">
            <select 
              v-model="sortBy"
              class="px-4 py-2 bg-theme-light border border-theme rounded-lg focus:border-accent-red focus:outline-none font-pixelify text-theme"
            >
              <option value="date">Latest First</option>
              <option value="title">Alphabetical</option>
              <option value="readingTime">Reading Time</option>
            </select>
          </div>
        </div>
      </section>

      <!-- Breaking Tech News Section (RSS Feed) -->
      <section v-if="rssPosts.length > 0" class="py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-8">
            <h2 class="font-pixelify font-bold text-3xl text-theme mb-2">Breaking Tech News</h2>
            <p class="font-pixelify text-theme/75">Latest updates from the tech world</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <BlogCard 
              v-for="post in rssPosts.slice(0, 6)" 
              :key="post.slug"
              :post="post"
            />
          </div>
        </div>
      </section>

      <!-- All Posts Section -->
      <section class="py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Results Counter -->
          <div class="mb-8 text-center">
            <p class="font-pixelify text-theme/75">
              Showing {{ filteredPosts.length }} of {{ allPosts.length }} articles
            </p>
          </div>

          <!-- Posts Grid -->
          <div v-if="filteredPosts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BlogCard 
              v-for="post in paginatedPosts" 
              :key="post.slug"
              :post="post"
            />
          </div>

          <!-- No Results -->
          <div v-else class="text-center py-12">
            <div class="text-6xl mb-4">🔍</div>
            <h3 class="font-pixelify font-bold text-2xl text-theme mb-2">No articles found</h3>
            <p class="font-pixelify text-theme/75">Try adjusting your search or filter criteria</p>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="flex justify-center mt-12">
            <div class="flex items-center gap-2">
              <button 
                @click="currentPage = Math.max(1, currentPage - 1)"
                :disabled="currentPage === 1"
                class="px-3 py-2 bg-theme-light border border-theme rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-theme hover:text-theme-light transition-colors font-pixelify"
              >
                Previous
              </button>
              
              <span 
                v-for="page in visiblePages" 
                :key="page"
                @click="currentPage = page"
                :class="[
                  'px-3 py-2 rounded-lg font-pixelify cursor-pointer transition-colors',
                  page === currentPage
                    ? 'bg-accent-red text-white'
                    : 'bg-theme-light text-theme hover:bg-theme hover:text-theme-light'
                ]"
              >
                {{ page }}
              </span>
              
              <button 
                @click="currentPage = Math.min(totalPages, currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="px-3 py-2 bg-theme-light border border-theme rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-theme hover:text-theme-light transition-colors font-pixelify"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
    
    <Footer />
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import NavBar from '../components/layout/NavBar.vue'
import Footer from '../components/layout/Footer.vue'
import BlogHero from '../components/blog/BlogHero.vue'
import BlogCard from '../components/blog/BlogCard.vue'
import { useBlog } from '../composables/useBlog.js'
import { useRssFeed } from '../composables/useRssFeed.js'

export default {
  name: 'Blog',
  components: {
    NavBar,
    Footer,
    BlogHero,
    BlogCard
  },
  setup() {
    const showContent = ref(false)
    const searchQuery = ref('')
    const selectedCategory = ref('All')
    const sortBy = ref('date')
    const currentPage = ref(1)
    const postsPerPage = 9

    const { 
      posts: allPosts, 
      isLoading: postsLoading, 
      loadBlogPosts, 
      searchPosts, 
      getAllCategories 
    } = useBlog()

    const { 
      rssItems, 
      isLoading: rssLoading, 
      fetchRssFeed, 
      loadFromCache 
    } = useRssFeed()

    // Load data on mount
    onMounted(async () => {
      await loadBlogPosts()
      loadFromCache() // Load cached RSS data first
      await fetchRssFeed() // Then try to fetch fresh data
      
      setTimeout(() => {
        showContent.value = true
      }, 100)
    })

    // Transform RSS items to blog post format
    const rssPosts = computed(() => {
      return rssItems.value.map(item => ({
        slug: item.guid || item.link.split('/').pop(),
        title: item.title,
        excerpt: item.description.substring(0, 150) + '...',
        date: item.pubDate,
        author: 'AI Generated',
        tags: ['tech-news', 'rss'],
        coverImage: 'https://i.postimg.cc/52xz48sW/resources.png',
        isAiGenerated: true,
        category: 'Tech Updates',
        readingTime: '3 min read',
        content: item.description,
        sourceUrl: item.link
      }))
    })

    // Categories for filtering
    const categories = computed(() => {
      const allCats = ['All', ...getAllCategories.value]
      const rssCats = ['Tech Updates']
      return [...new Set([...allCats, ...rssCats])]
    })

    // Featured post (latest post)
    const featuredPost = computed(() => {
      return allPosts.value[0] || null
    })

    // Filtered posts
    const filteredPosts = computed(() => {
      let posts = [...allPosts.value, ...rssPosts.value]

      // Filter by category
      if (selectedCategory.value !== 'All') {
        posts = posts.filter(post => post.category === selectedCategory.value)
      }

      // Filter by search query
      if (searchQuery.value.trim()) {
        posts = searchPosts(searchQuery.value)
      }

      // Sort posts
      posts.sort((a, b) => {
        switch (sortBy.value) {
          case 'title':
            return a.title.localeCompare(b.title)
          case 'readingTime':
            return parseInt(a.readingTime) - parseInt(b.readingTime)
          case 'date':
          default:
            return new Date(b.date) - new Date(a.date)
        }
      })

      return posts
    })

    // Pagination
    const totalPages = computed(() => Math.ceil(filteredPosts.value.length / postsPerPage))
    
    const paginatedPosts = computed(() => {
      const start = (currentPage.value - 1) * postsPerPage
      const end = start + postsPerPage
      return filteredPosts.value.slice(start, end)
    })

    const visiblePages = computed(() => {
      const pages = []
      const start = Math.max(1, currentPage.value - 2)
      const end = Math.min(totalPages.value, currentPage.value + 2)
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      return pages
    })

    // Reset pagination when filters change
    watch([searchQuery, selectedCategory, sortBy], () => {
      currentPage.value = 1
    })

    return {
      showContent,
      searchQuery,
      selectedCategory,
      sortBy,
      currentPage,
      allPosts,
      rssPosts,
      categories,
      featuredPost,
      filteredPosts,
      paginatedPosts,
      totalPages,
      visiblePages,
      postsLoading,
      rssLoading
    }
  }
}
</script>
