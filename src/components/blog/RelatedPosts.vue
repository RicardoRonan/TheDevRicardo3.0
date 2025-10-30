<template>
  <section v-if="relatedPosts.length > 0" class="mt-12">
    <h3 class="font-pixelify font-bold text-2xl text-theme mb-6">Related Articles</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <article 
        v-for="post in relatedPosts" 
        :key="post.slug"
        class="bg-theme-light rounded-lg border border-theme hover:border-accent-red transition-all duration-300 hover:shadow-lg group overflow-hidden"
      >
        <!-- Cover Image -->
        <div class="relative overflow-hidden">
          <img 
            :src="post.coverImage" 
            :alt="post.title"
            class="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div class="absolute top-2 left-2">
            <span class="px-2 py-1 bg-accent-red text-white text-xs font-pixelify rounded-full">
              {{ post.category }}
            </span>
          </div>
          <RssBadge v-if="post.isAiGenerated" class="absolute top-2 right-2" />
        </div>

        <!-- Content -->
        <div class="p-4">
          <h4 class="font-pixelify font-bold text-lg text-theme group-hover:text-accent-red transition-colors mb-2 line-clamp-2">
            {{ post.title }}
          </h4>
          
          <p class="font-pixelify text-sm text-theme/75 mb-3 line-clamp-2">
            {{ post.excerpt }}
          </p>
          
          <div class="flex items-center justify-between text-xs text-theme/60 mb-3">
            <span class="font-pixelify">{{ formatDate(post.date) }}</span>
            <span class="font-pixelify">{{ post.readingTime }}</span>
          </div>
          
          <router-link 
            :to="`/blog/${post.slug}`"
            class="inline-flex items-center text-accent-red font-pixelify font-semibold text-sm hover:underline group-hover:text-accent-red/80 transition-colors"
          >
            Read More
            <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </router-link>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
import RssBadge from './RssBadge.vue'

export default {
  name: 'RelatedPosts',
  components: {
    RssBadge
  },
  props: {
    relatedPosts: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
