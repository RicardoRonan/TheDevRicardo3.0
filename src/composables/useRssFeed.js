import { ref, computed } from 'vue'
import Parser from 'rss-parser'
import { useGroqAI } from './useGroqAI'

export function useRssFeed() {
  const rssItems = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  const lastFetch = ref(null)
  const { generateBlogPost, isLoading: isGenerating } = useGroqAI()

  // Sample RSS feed URL for testing (replace with your actual Google Alerts RSS URL)
  const RSS_URL = 'https://feeds.feedburner.com/TechCrunch/'

  const fetchRssFeed = async () => {
    isLoading.value = true
    error.value = null

    try {
      const parser = new Parser({
        customFields: {
          item: ['media:content', 'media:thumbnail']
        }
      })

      const feed = await parser.parseURL(RSS_URL)
      
      // Transform RSS items to our format
      const transformedItems = feed.items.map(item => ({
        title: item.title,
        description: item.contentSnippet || item.content || '',
        link: item.link,
        pubDate: item.pubDate,
        guid: item.guid,
        categories: item.categories || [],
        media: item['media:content'] || item['media:thumbnail'] || null
      }))

      rssItems.value = transformedItems
      lastFetch.value = new Date().toISOString()

      // Store in localStorage for caching
      localStorage.setItem('rss_feed_data', JSON.stringify({
        items: transformedItems,
        lastFetch: lastFetch.value
      }))

    } catch (err) {
      error.value = err.message
      console.error('Error fetching RSS feed:', err)
      
      // Try to load from cache if available
      const cached = localStorage.getItem('rss_feed_data')
      if (cached) {
        const { items, lastFetch: cachedFetch } = JSON.parse(cached)
        rssItems.value = items
        lastFetch.value = cachedFetch
      }
    } finally {
      isLoading.value = false
    }
  }

  const generateBlogFromRss = async (rssItem) => {
    try {
      const blogData = await generateBlogPost(rssItem)
      
      // Create a slug from the title
      const slug = blogData.frontmatter.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
        .substring(0, 50)

      return {
        slug,
        ...blogData,
        rssSource: rssItem
      }
    } catch (err) {
      console.error('Error generating blog from RSS:', err)
      throw err
    }
  }

  const shouldRefresh = computed(() => {
    if (!lastFetch.value) return true
    
    const now = new Date()
    const lastFetchDate = new Date(lastFetch.value)
    const hoursSinceLastFetch = (now - lastFetchDate) / (1000 * 60 * 60)
    
    return hoursSinceLastFetch > 1 // Refresh every hour
  })

  const loadFromCache = () => {
    const cached = localStorage.getItem('rss_feed_data')
    if (cached) {
      const { items, lastFetch: cachedFetch } = JSON.parse(cached)
      rssItems.value = items
      lastFetch.value = cachedFetch
    }
  }

  return {
    rssItems,
    isLoading,
    error,
    lastFetch,
    isGenerating,
    fetchRssFeed,
    generateBlogFromRss,
    shouldRefresh,
    loadFromCache
  }
}
