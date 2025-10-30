import { createSitemap } from 'sitemap'

export function generateSitemap(blogPosts = []) {
  const baseUrl = 'https://thedevricardo.com' // Replace with your actual domain
  
  const staticRoutes = [
    {
      url: '/',
      changefreq: 'weekly',
      priority: 1.0,
      lastmod: new Date().toISOString()
    },
    {
      url: '/about',
      changefreq: 'monthly',
      priority: 0.8,
      lastmod: new Date().toISOString()
    },
    {
      url: '/projects',
      changefreq: 'weekly',
      priority: 0.9,
      lastmod: new Date().toISOString()
    },
    {
      url: '/blog',
      changefreq: 'daily',
      priority: 0.9,
      lastmod: new Date().toISOString()
    },
    {
      url: '/resources',
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date().toISOString()
    },
    {
      url: '/contact',
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: new Date().toISOString()
    },
    {
      url: '/testimonials',
      changefreq: 'monthly',
      priority: 0.5,
      lastmod: new Date().toISOString()
    }
  ]

  // Add blog post routes
  const blogRoutes = blogPosts.map(post => ({
    url: `/blog/${post.slug}`,
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: new Date(post.date).toISOString()
  }))

  const allRoutes = [...staticRoutes, ...blogRoutes]

  const sitemap = createSitemap({
    hostname: baseUrl,
    urls: allRoutes
  })

  return sitemap.toString()
}

export function generateRssFeed(blogPosts = []) {
  const baseUrl = 'https://thedevricardo.com' // Replace with your actual domain
  
  const rssItems = blogPosts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${post.author}</author>
      <category>${post.category}</category>
      ${post.tags.map(tag => `<category>${tag}</category>`).join('')}
    </item>
  `).join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Dev Ricardo Blog</title>
    <description>Latest articles on web development, design, and technology by Ricardo Moses</description>
    <link>${baseUrl}/blog</link>
    <atom:link href="${baseUrl}/blog-rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>ricardo@thedevricardo.com (Ricardo Moses)</managingEditor>
    <webMaster>ricardo@thedevricardo.com (Ricardo Moses)</webMaster>
    <image>
      <url>${baseUrl}/src/assets/pixel-rick-icon.svg</url>
      <title>The Dev Ricardo Blog</title>
      <link>${baseUrl}/blog</link>
    </image>
    ${rssItems}
  </channel>
</rss>`
}


