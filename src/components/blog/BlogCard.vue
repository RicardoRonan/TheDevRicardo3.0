<template>
  <article 
    class="bg-theme-light rounded-xl border border-theme hover:border-accent-red transition-all duration-300 hover:shadow-lg group overflow-hidden"
    :class="cardClass"
  >
    <!-- Cover Image -->
    <div class="relative overflow-hidden">
      <img 
        :src="post.coverImage" 
        :alt="post.title"
        class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      <!-- Category Badge -->
      <div class="absolute top-3 left-3">
        <span class="px-2 py-1 bg-accent-red text-white text-xs font-pixelify rounded-full">
          {{ post.category }}
        </span>
      </div>
      <!-- AI Generated Badge -->
      <div v-if="post.isAiGenerated" class="absolute top-3 right-3">
        <RssBadge />
      </div>
    </div>

    <!-- Content -->
    <div class="p-4 md:p-6">
      <!-- Title -->
      <h3 class="font-pixelify font-bold text-lg md:text-xl text-theme group-hover:text-accent-red transition-colors mb-2 line-clamp-2">
        {{ post.title }}
      </h3>

      <!-- Excerpt -->
      <p class="font-pixelify text-sm text-theme/75 mb-4 line-clamp-3">
        {{ post.excerpt }}
      </p>

      <!-- Meta Information -->
      <div class="flex items-center justify-between text-xs text-theme/60 mb-4">
        <div class="flex items-center gap-2">
          <span class="font-pixelify">{{ post.author }}</span>
          <span>•</span>
          <span class="font-pixelify">{{ formatDate(post.date) }}</span>
        </div>
        <span class="font-pixelify">{{ post.readingTime }}</span>
      </div>

      <!-- Tags -->
      <div class="flex flex-wrap gap-1 mb-4">
        <span 
          v-for="tag in post.tags.slice(0, 3)" 
          :key="tag"
          class="px-2 py-1 bg-theme/10 text-theme text-xs font-pixelify rounded-full"
        >
          {{ tag }}
        </span>
        <span v-if="post.tags.length > 3" class="px-2 py-1 text-theme/60 text-xs font-pixelify">
          +{{ post.tags.length - 3 }}
        </span>
      </div>

      <!-- Read More Button -->
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
</template>

<script>
import RssBadge from './RssBadge.vue'

export default {
  name: 'BlogCard',
  components: {
    RssBadge
  },
  props: {
    post: {
      type: Object,
      required: true
    },
    cardClass: {
      type: String,
      default: ''
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

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
