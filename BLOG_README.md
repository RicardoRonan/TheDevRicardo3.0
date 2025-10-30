# Blog Feature Implementation

This document outlines the blog feature implementation with RSS feed integration and AI-powered content generation.

## Features Implemented

### ✅ Core Blog System
- **Magazine-style layout** with pixel theme integration
- **Markdown-based posts** with frontmatter metadata
- **Search and filtering** by category, tags, and text
- **Pagination** for better performance
- **Responsive design** for all devices

### ✅ RSS Feed Integration
- **Google Alerts RSS feed** parsing (currently using TechCrunch as sample)
- **AI-powered blog generation** using Groq API
- **Automatic content creation** from RSS items
- **Caching system** for performance optimization

### ✅ SEO Optimization
- **Dynamic meta tags** using @vueuse/head
- **Open Graph** and Twitter Card support
- **JSON-LD structured data** for search engines
- **RSS feed** for content syndication
- **Sitemap generation** utility

### ✅ Components Created
- `BlogCard.vue` - Magazine-style post cards
- `BlogHero.vue` - Featured post display
- `BlogContent.vue` - Styled markdown renderer
- `RelatedPosts.vue` - Related articles section
- `ShareButtons.vue` - Social sharing functionality
- `RssBadge.vue` - AI-generated content indicator
- `BlogSEO.vue` - SEO meta tags component

## File Structure

```
src/
├── components/blog/
│   ├── BlogCard.vue
│   ├── BlogHero.vue
│   ├── BlogContent.vue
│   ├── RelatedPosts.vue
│   ├── ShareButtons.vue
│   ├── RssBadge.vue
│   └── BlogSEO.vue
├── composables/
│   ├── useBlog.js
│   ├── useRssFeed.js
│   └── useGroqAI.js
├── data/blogs/
│   ├── sample-post-1.md
│   ├── sample-post-2.md
│   └── ai-generated/
│       └── sample-ai-post.md
├── pages/
│   ├── Blog.vue
│   └── BlogPost.vue
└── utils/
    └── generateSitemap.js
```

## Configuration

### Environment Variables
Create a `.env` file in the project root:
```env
VITE_GROQ_API_KEY=your_groq_api_key_here
```

### RSS Feed Setup
1. Set up Google Alerts for tech news
2. Get the RSS feed URL from Google Alerts
3. Update the `RSS_URL` in `src/composables/useRssFeed.js`

### Groq API Setup
1. Sign up at [console.groq.com](https://console.groq.com)
2. Get your API key
3. Add it to your `.env` file

## Usage

### Adding New Blog Posts
1. Create a new markdown file in `src/data/blogs/`
2. Include proper frontmatter:
```yaml
---
title: "Your Post Title"
excerpt: "Brief description"
date: "2024-01-20"
author: "Ricardo Moses"
tags: ["tag1", "tag2"]
coverImage: "image-url"
category: "Category"
readingTime: "5 min read"
---
```

### AI-Generated Content
- RSS feed items are automatically processed
- Groq API generates full blog posts
- Content is saved to `src/data/blogs/ai-generated/`
- AI-generated posts are marked with a special badge

## Free Storage Options

For storing blog content at scale:

1. **GitHub** (Recommended)
   - Unlimited storage for public repos
   - Version control for content
   - Easy collaboration

2. **Netlify CMS**
   - Free headless CMS
   - GitHub backend integration
   - User-friendly interface

3. **Forestry.io**
   - Free tier available
   - Git-based content management
   - Preview functionality

4. **CloudCannon**
   - Free tier with GitHub sync
   - Visual content editor
   - Built-in SEO tools

## SEO Features

### Meta Tags
- Dynamic title and description
- Open Graph tags for social sharing
- Twitter Card support
- Canonical URLs

### Structured Data
- Article schema
- Breadcrumb navigation
- Organization information
- Website search action

### RSS Feed
- Available at `/blog-rss.xml`
- Includes all blog posts
- Proper metadata for each post

## Styling

The blog uses the existing pixel theme with:
- **Pixelify Sans** font for headings
- **Accent red** color scheme
- **Retro newspaper** aesthetics
- **Magazine-style** grid layouts
- **Responsive design** for all devices

## Performance

- **Lazy loading** for images
- **Pagination** for large post lists
- **Caching** for RSS feed data
- **Optimized** bundle size

## Future Enhancements

1. **Comment System** - Add Disqus or similar
2. **Newsletter Signup** - Email subscription
3. **Advanced Search** - Full-text search with filters
4. **Content Scheduling** - Publish posts at specific times
5. **Analytics** - Track post performance
6. **Multi-language** - Support for multiple languages

## Troubleshooting

### Common Issues

1. **RSS Feed Not Loading**
   - Check CORS settings
   - Verify RSS URL is correct
   - Check browser console for errors

2. **AI Generation Failing**
   - Verify Groq API key is correct
   - Check API rate limits
   - Ensure internet connection

3. **Styling Issues**
   - Check Tailwind CSS classes
   - Verify theme variables are loaded
   - Check for CSS conflicts

## Support

For issues or questions about the blog feature:
1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure environment variables are set correctly
4. Check the network tab for API call failures


