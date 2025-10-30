import { ref, computed } from 'vue'
import matter from 'gray-matter'
import { marked } from 'marked'

export function useBlog() {
  const posts = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  // Configure marked for better rendering
  marked.setOptions({
    breaks: true,
    gfm: true,
    headerIds: true,
    mangle: false
  })

  const loadBlogPosts = async () => {
    isLoading.value = true
    error.value = null

    try {
      // In a real app, you'd fetch these from your API or file system
      // For now, we'll simulate loading posts
      const samplePosts = [
        {
          slug: 'welcome-to-my-blog',
          title: 'Welcome to My Blog',
          excerpt: 'This is my first blog post where I share my thoughts on web development and technology.',
          date: '2024-01-15',
          author: 'Ricardo Moses',
          tags: ['personal', 'introduction'],
          coverImage: 'https://i.postimg.cc/52xz48sW/resources.png',
          isAiGenerated: false,
          category: 'Personal',
          readingTime: '3 min read',
          content: `# Welcome to My Blog

This is my first blog post! I'm excited to share my journey in web development with you.

## What You Can Expect

- Technical tutorials
- Project showcases
- Industry insights
- Personal experiences

Thanks for reading!`
        },
        {
          slug: 'vue-3-composition-api-guide',
          title: 'Vue 3 Composition API: A Complete Guide',
          excerpt: 'Learn how to use Vue 3\'s Composition API to build more maintainable and reusable components.',
          date: '2024-01-10',
          author: 'Ricardo Moses',
          tags: ['vue', 'javascript', 'tutorial'],
          coverImage: 'https://i.postimg.cc/52xz48sW/resources.png',
          isAiGenerated: false,
          category: 'Tutorial',
          readingTime: '8 min read',
          content: `# Vue 3 Composition API: A Complete Guide

The Composition API is one of the most exciting features in Vue 3. Let's explore how to use it effectively.

## What is the Composition API?

The Composition API is a new way to write Vue components that provides better logic reuse and type inference.

\`\`\`javascript
import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)
    
    onMounted(() => {
      console.log('Component mounted!')
    })
    
    return {
      count,
      doubleCount
    }
  }
}
\`\`\`

## Benefits

- Better TypeScript support
- Improved code organization
- Easier testing
- Better performance

The Composition API makes Vue components more flexible and maintainable.`
        }
      ]

      posts.value = samplePosts.sort((a, b) => new Date(b.date) - new Date(a.date))

    } catch (err) {
      error.value = err.message
      console.error('Error loading blog posts:', err)
    } finally {
      isLoading.value = false
    }
  }

  const getPostBySlug = (slug) => {
    return posts.value.find(post => post.slug === slug)
  }

  const getPostsByCategory = (category) => {
    return posts.value.filter(post => post.category === category)
  }

  const getPostsByTag = (tag) => {
    return posts.value.filter(post => post.tags.includes(tag))
  }

  const searchPosts = (query) => {
    const searchTerm = query.toLowerCase()
    return posts.value.filter(post => 
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    )
  }

  const getRelatedPosts = (currentPost, limit = 3) => {
    return posts.value
      .filter(post => 
        post.slug !== currentPost.slug &&
        post.tags.some(tag => currentPost.tags.includes(tag))
      )
      .slice(0, limit)
  }

  const getAllTags = computed(() => {
    const allTags = posts.value.flatMap(post => post.tags)
    return [...new Set(allTags)].sort()
  })

  const getAllCategories = computed(() => {
    const allCategories = posts.value.map(post => post.category)
    return [...new Set(allCategories)].sort()
  })

  const parseMarkdown = (content) => {
    return marked(content)
  }

  const extractTableOfContents = (content) => {
    const headings = []
    const lines = content.split('\n')
    
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
  }

  const estimateReadingTime = (content) => {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    const minutes = Math.ceil(wordCount / wordsPerMinute)
    return `${minutes} min read`
  }

  return {
    posts,
    isLoading,
    error,
    loadBlogPosts,
    getPostBySlug,
    getPostsByCategory,
    getPostsByTag,
    searchPosts,
    getRelatedPosts,
    getAllTags,
    getAllCategories,
    parseMarkdown,
    extractTableOfContents,
    estimateReadingTime
  }
}
