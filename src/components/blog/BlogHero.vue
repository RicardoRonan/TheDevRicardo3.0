<template>
  <section class="relative overflow-hidden mb-12">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute inset-0 bg-grid-pattern"></div>
    </div>

    <!-- Content -->
    <div class="relative bg-theme-light rounded-2xl border-2 border-theme p-8 md:p-12">
      <!-- Masthead -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center gap-2 mb-4">
          <div class="w-2 h-2 bg-accent-red rounded-full animate-pulse"></div>
          <span class="font-pixelify text-sm text-theme/60">LIVE</span>
          <div class="w-2 h-2 bg-accent-red rounded-full animate-pulse"></div>
        </div>
        <h1 class="font-pixelify font-bold text-4xl md:text-6xl text-theme mb-2">
          BLOG
        </h1>
        <div class="flex items-center justify-center gap-4 text-sm text-theme/60 font-pixelify">
          <span>{{ formatDate(new Date()) }}</span>
          <span>•</span>
          <span>{{ totalPosts }} Articles</span>
          <span>•</span>
          <span>Tech News & Tutorials</span>
        </div>
      </div>

      <!-- Featured Post -->
      <div v-if="featuredPost" class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <!-- Featured Content -->
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 bg-accent-red text-white text-sm font-pixelify rounded-full">
              FEATURED
            </span>
            <RssBadge v-if="featuredPost.isAiGenerated" />
          </div>
          
          <h2 class="font-pixelify font-bold text-2xl md:text-3xl text-theme leading-tight">
            {{ featuredPost.title }}
          </h2>
          
          <p class="font-pixelify text-theme/75 text-lg leading-relaxed">
            {{ featuredPost.excerpt }}
          </p>
          
          <div class="flex items-center gap-4 text-sm text-theme/60 font-pixelify">
            <span>{{ featuredPost.author }}</span>
            <span>•</span>
            <span>{{ formatDate(featuredPost.date) }}</span>
            <span>•</span>
            <span>{{ featuredPost.readingTime }}</span>
          </div>
          
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="tag in featuredPost.tags.slice(0, 3)" 
              :key="tag"
              class="px-3 py-1 bg-theme/10 text-theme text-sm font-pixelify rounded-full"
            >
              {{ tag }}
            </span>
          </div>
          
          <router-link 
            :to="`/blog/${featuredPost.slug}`"
            class="inline-flex items-center text-accent-red font-pixelify font-semibold hover:underline group"
          >
            Read Full Article
            <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </router-link>
        </div>

        <!-- Featured Image -->
        <div class="relative">
          <img 
            :src="featuredPost.coverImage" 
            :alt="featuredPost.title"
            class="w-full h-64 md:h-80 object-cover rounded-xl border border-theme"
            loading="lazy"
          />
          <!-- Decorative Elements -->
          <div class="absolute -top-2 -right-2 w-8 h-8 bg-accent-red rounded-full opacity-20"></div>
          <div class="absolute -bottom-2 -left-2 w-6 h-6 bg-accent-red rounded-full opacity-30"></div>
        </div>
      </div>

      <!-- No Featured Post -->
      <div v-else class="text-center py-12">
        <div class="text-6xl mb-4">📝</div>
        <h2 class="font-pixelify font-bold text-2xl text-theme mb-2">No Featured Post</h2>
        <p class="font-pixelify text-theme/75">Check back soon for featured content!</p>
      </div>
    </div>
  </section>
</template>

<script>
import RssBadge from './RssBadge.vue'

export default {
  name: 'BlogHero',
  components: {
    RssBadge
  },
  props: {
    featuredPost: {
      type: Object,
      default: null
    },
    totalPosts: {
      type: Number,
      default: 0
    }
  },
  methods: {
    formatDate(date) {
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }
}
</script>

<style scoped>
.bg-grid-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 20 0 L 0 0 0 20' fill='none' stroke='%23000' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E");
}
</style>
