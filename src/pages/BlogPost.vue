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
      <!-- Breadcrumb -->
      <section class="pt-24 py-4">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav class="flex items-center space-x-2 text-sm font-pixelify text-theme/75">
            <router-link to="/" class="hover:text-accent-red transition-colors">Home</router-link>
            <span>></span>
            <router-link to="/blog" class="hover:text-accent-red transition-colors">Blog</router-link>
            <span>></span>
            <span class="text-theme">{{ post?.title }}</span>
          </nav>
        </div>
      </section>

      <!-- Article Header -->
      <section class="py-8">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-8">
            <!-- Category and AI Badge -->
            <div class="flex items-center justify-center gap-2 mb-4">
              <span class="px-3 py-1 bg-accent-red text-white text-sm font-pixelify rounded-full">
                {{ post?.category }}
              </span>
              <RssBadge v-if="post?.isAiGenerated" />
            </div>

            <!-- Title -->
            <h1 class="font-pixelify font-bold text-3xl md:text-4xl lg:text-5xl text-theme mb-4 leading-tight">
              {{ post?.title }}
            </h1>

            <!-- Excerpt -->
            <p class="font-pixelify text-lg text-theme/75 mb-6 max-w-3xl mx-auto">
              {{ post?.excerpt }}
            </p>

            <!-- Meta Information -->
            <div class="flex items-center justify-center gap-4 text-sm text-theme/60 font-pixelify mb-8">
              <span>{{ post?.author }}</span>
              <span>•</span>
              <span>{{ formatDate(post?.date) }}</span>
              <span>•</span>
              <span>{{ post?.readingTime }}</span>
            </div>

            <!-- Cover Image -->
            <div class="relative mb-8">
              <img 
                :src="post?.coverImage" 
                :alt="post?.title"
                class="w-full h-64 md:h-80 lg:h-96 object-cover rounded-xl border border-theme"
                loading="lazy"
              />
              <!-- Decorative Elements -->
              <div class="absolute -top-2 -right-2 w-8 h-8 bg-accent-red rounded-full opacity-20"></div>
              <div class="absolute -bottom-2 -left-2 w-6 h-6 bg-accent-red rounded-full opacity-30"></div>
            </div>

            <!-- Share Buttons -->
            <ShareButtons :post="post" />
          </div>
        </div>
      </section>

      <!-- Article Content -->
      <section class="py-8">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <!-- Table of Contents (Desktop) -->
            <div class="hidden lg:block lg:col-span-1">
              <div class="sticky top-24">
                <div class="p-4 bg-theme-light rounded-lg border border-theme">
                  <h3 class="font-pixelify font-bold text-lg text-theme mb-3">Table of Contents</h3>
                  <nav class="space-y-1">
                    <a 
                      v-for="heading in tableOfContents" 
                      :key="heading.id"
                      :href="`#${heading.id}`"
                      :class="[
                        'block text-sm font-pixelify hover:text-accent-red transition-colors',
                        heading.level === 2 ? 'ml-0' : 'ml-4'
                      ]"
                    >
                      {{ heading.title }}
                    </a>
                  </nav>
                </div>
              </div>
            </div>

            <!-- Main Content -->
            <div class="lg:col-span-3">
              <article class="prose prose-lg max-w-none">
                <div 
                  class="blog-content"
                  v-html="parsedContent"
                ></div>
              </article>

              <!-- Tags -->
              <div class="mt-8 pt-8 border-t border-theme">
                <h3 class="font-pixelify font-bold text-lg text-theme mb-4">Tags</h3>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="tag in post?.tags" 
                    :key="tag"
                    class="px-3 py-1 bg-theme-light text-theme text-sm font-pixelify rounded-full border border-theme hover:border-accent-red hover:text-accent-red transition-colors cursor-pointer"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>

              <!-- Author Info -->
              <div class="mt-8 p-6 bg-theme-light rounded-lg border border-theme">
                <div class="flex items-start gap-4">
                  <div class="w-16 h-16 bg-accent-red rounded-full flex items-center justify-center text-white font-pixelify font-bold text-xl">
                    {{ post?.author?.charAt(0) }}
                  </div>
                  <div class="flex-1">
                    <h4 class="font-pixelify font-bold text-xl text-theme mb-2">{{ post?.author }}</h4>
                    <p class="font-pixelify text-theme/75 mb-2">Web Developer & Tech Enthusiast</p>
                    <p class="font-pixelify text-sm text-theme/75">
                      Published on {{ formatDate(post?.date) }} • {{ post?.readingTime }}
                    </p>
                    <div v-if="post?.isAiGenerated" class="mt-2">
                      <p class="font-pixelify text-xs text-theme/60">
                        This article was generated using AI based on RSS feed content.
                      </p>
                      <a 
                        v-if="post?.sourceUrl" 
                        :href="post.sourceUrl" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="font-pixelify text-xs text-accent-red hover:underline"
                      >
                        View original source →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Related Posts -->
      <section class="py-12 bg-theme-light">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RelatedPosts :related-posts="relatedPosts" />
        </div>
      </section>

      <!-- Navigation -->
      <section class="py-8">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center">
            <!-- Previous Post -->
            <div v-if="previousPost" class="flex-1">
              <router-link 
                :to="`/blog/${previousPost.slug}`"
                class="group flex items-center gap-3 p-4 bg-theme-light rounded-lg border border-theme hover:border-accent-red transition-all duration-300"
              >
                <svg class="w-5 h-5 text-theme group-hover:text-accent-red transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                <div>
                  <p class="font-pixelify text-sm text-theme/60">Previous</p>
                  <p class="font-pixelify font-semibold text-theme group-hover:text-accent-red transition-colors line-clamp-1">
                    {{ previousPost.title }}
                  </p>
                </div>
              </router-link>
            </div>

            <!-- Back to Blog -->
            <div class="flex-1 text-center">
              <router-link 
                to="/blog"
                class="inline-flex items-center gap-2 px-6 py-3 bg-accent-red text-white rounded-lg hover:bg-accent-red/80 transition-colors font-pixelify font-semibold"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Back to Blog
              </router-link>
            </div>

            <!-- Next Post -->
            <div v-if="nextPost" class="flex-1">
              <router-link 
                :to="`/blog/${nextPost.slug}`"
                class="group flex items-center gap-3 p-4 bg-theme-light rounded-lg border border-theme hover:border-accent-red transition-all duration-300"
              >
                <div class="text-right">
                  <p class="font-pixelify text-sm text-theme/60">Next</p>
                  <p class="font-pixelify font-semibold text-theme group-hover:text-accent-red transition-colors line-clamp-1">
                    {{ nextPost.title }}
                  </p>
                </div>
                <svg class="w-5 h-5 text-theme group-hover:text-accent-red transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </router-link>
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
import { useRoute } from 'vue-router'
import NavBar from '../components/layout/NavBar.vue'
import Footer from '../components/layout/Footer.vue'
import BlogContent from '../components/blog/BlogContent.vue'
import RelatedPosts from '../components/blog/RelatedPosts.vue'
import ShareButtons from '../components/blog/ShareButtons.vue'
import RssBadge from '../components/blog/RssBadge.vue'
// import BlogSEO from '../components/blog/BlogSEO.vue'
import { useBlog } from '../composables/useBlog.js'

export default {
  name: 'BlogPost',
  components: {
    NavBar,
    Footer,
    BlogContent,
    RelatedPosts,
    ShareButtons,
    RssBadge,
    // BlogSEO
  },
  setup() {
    const route = useRoute()
    const showContent = ref(false)
    const post = ref(null)
    const allPosts = ref([])

    const { 
      loadBlogPosts, 
      getPostBySlug, 
      getRelatedPosts, 
      parseMarkdown, 
      extractTableOfContents 
    } = useBlog()

    // Load data on mount
    onMounted(async () => {
      await loadBlogPosts()
      loadPost()
      
      setTimeout(() => {
        showContent.value = true
      }, 100)
    })

    // Watch for route changes
    watch(() => route.params.slug, () => {
      loadPost()
    })

    const loadPost = () => {
      const slug = route.params.slug
      post.value = getPostBySlug(slug)
      
      if (!post.value) {
        // Handle 404 - redirect to blog list
        window.location.href = '/blog'
      }
    }

    // Parse markdown content
    const parsedContent = computed(() => {
      if (!post.value?.content) return ''
      return parseMarkdown(post.value.content)
    })

    // Extract table of contents
    const tableOfContents = computed(() => {
      if (!post.value?.content) return []
      return extractTableOfContents(post.value.content)
    })

    // Related posts
    const relatedPosts = computed(() => {
      if (!post.value) return []
      return getRelatedPosts(post.value, 3)
    })

    // Navigation posts
    const currentIndex = computed(() => {
      return allPosts.value.findIndex(p => p.slug === post.value?.slug)
    })

    const previousPost = computed(() => {
      const index = currentIndex.value
      return index > 0 ? allPosts.value[index - 1] : null
    })

    const nextPost = computed(() => {
      const index = currentIndex.value
      return index < allPosts.value.length - 1 ? allPosts.value[index + 1] : null
    })

    const formatDate = (dateString) => {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    return {
      showContent,
      post,
      parsedContent,
      tableOfContents,
      relatedPosts,
      previousPost,
      nextPost,
      formatDate
    }
  }
}
</script>

<style scoped>
.blog-content {
  @apply text-theme;
}

.blog-content :deep(h1),
.blog-content :deep(h2),
.blog-content :deep(h3),
.blog-content :deep(h4),
.blog-content :deep(h5),
.blog-content :deep(h6) {
  @apply font-pixelify font-bold text-theme mt-8 mb-4;
}

.blog-content :deep(h1) {
  @apply text-3xl;
}

.blog-content :deep(h2) {
  @apply text-2xl;
}

.blog-content :deep(h3) {
  @apply text-xl;
}

.blog-content :deep(p) {
  @apply font-pixelify text-theme leading-relaxed mb-4;
  opacity: 0.9;
}

.blog-content :deep(code) {
  @apply bg-theme-light px-2 py-1 rounded text-sm font-mono text-accent-red;
}

.blog-content :deep(pre) {
  @apply bg-theme-light p-4 rounded-lg overflow-x-auto my-4;
}

.blog-content :deep(pre code) {
  @apply bg-transparent p-0 text-theme;
}

.blog-content :deep(blockquote) {
  @apply border-l-4 border-accent-red pl-4 italic text-theme my-4;
  opacity: 0.75;
}

.blog-content :deep(ul),
.blog-content :deep(ol) {
  @apply my-4 pl-6;
}

.blog-content :deep(li) {
  @apply font-pixelify text-theme mb-2;
  opacity: 0.9;
}

.blog-content :deep(a) {
  @apply text-accent-red hover:underline;
}

.blog-content :deep(img) {
  @apply rounded-lg my-4 max-w-full h-auto;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
