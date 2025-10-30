<template>
  <div class="prose prose-lg max-w-none">
    <!-- Table of Contents -->
    <div v-if="tableOfContents.length > 0" class="mb-8 p-4 bg-theme-light rounded-lg border border-theme">
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

    <!-- Blog Content -->
    <div 
      class="blog-content"
      v-html="parsedContent"
    ></div>

    <!-- Author Info -->
    <div class="mt-12 p-6 bg-theme-light rounded-lg border border-theme">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 bg-accent-red rounded-full flex items-center justify-center text-white font-pixelify font-bold text-lg">
          {{ post.author.charAt(0) }}
        </div>
        <div class="flex-1">
          <h4 class="font-pixelify font-bold text-lg text-theme mb-1">{{ post.author }}</h4>
          <p class="font-pixelify text-sm text-theme/75 mb-2">Web Developer & Tech Enthusiast</p>
          <p class="font-pixelify text-sm text-theme/75">
            Published on {{ formatDate(post.date) }} • {{ post.readingTime }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'BlogContent',
  props: {
    post: {
      type: Object,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const parsedContent = computed(() => {
      // This would normally use a markdown parser
      // For now, we'll return the content as-is
      return props.content
    })

    const tableOfContents = computed(() => {
      const headings = []
      const lines = props.content.split('\n')
      
      lines.forEach((line, index) => {
        const match = line.match(/^(#{1,6})\s+(.+)$/)
        if (match) {
          const level = match[1].length
          const title = match[2]
          const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
          
          headings.push({
            level,
            title,
            id,
            line: index
          })
        }
      })
      
      return headings
    })

    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    return {
      parsedContent,
      tableOfContents,
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

.blog-content :deep(table) {
  @apply w-full border-collapse border border-theme my-4;
}

.blog-content :deep(th),
.blog-content :deep(td) {
  @apply border border-theme p-2 text-left;
}

.blog-content :deep(th) {
  @apply bg-theme-light font-pixelify font-bold;
}
</style>
