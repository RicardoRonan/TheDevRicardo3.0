<template>
  <!-- This component handles SEO meta tags via @vueuse/head -->
</template>

<script>
import { useHead } from '@vueuse/head'

export default {
  name: 'BlogSEO',
  props: {
    post: {
      type: Object,
      required: true
    },
    isListPage: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const baseUrl = window.location.origin
    const postUrl = `${baseUrl}/blog/${props.post.slug}`
    const imageUrl = props.post.coverImage || `${baseUrl}/src/assets/pixel-rick-icon.svg`

    // JSON-LD structured data
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: props.post.title,
      description: props.post.excerpt,
      image: imageUrl,
      author: {
        '@type': 'Person',
        name: props.post.author,
        url: baseUrl
      },
      publisher: {
        '@type': 'Organization',
        name: 'The Dev Ricardo',
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/src/assets/pixel-rick-icon.svg`
        }
      },
      datePublished: props.post.date,
      dateModified: props.post.date,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': postUrl
      },
      keywords: props.post.tags.join(', '),
      articleSection: props.post.category,
      wordCount: props.post.content?.split(' ').length || 0
    }

    // Breadcrumb schema
    const breadcrumbJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: baseUrl
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: `${baseUrl}/blog`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: props.post.title,
          item: postUrl
        }
      ]
    }

    // Website schema with search action
    const websiteJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'The Dev Ricardo',
      url: baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${baseUrl}/blog?search={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    }

    useHead({
      title: props.isListPage ? 'Blog - The Dev Ricardo' : `${props.post.title} - The Dev Ricardo`,
      meta: [
        {
          name: 'description',
          content: props.isListPage 
            ? 'Read the latest articles on web development, design, and technology by Ricardo Moses.' 
            : props.post.excerpt
        },
        {
          name: 'keywords',
          content: props.isListPage 
            ? 'web development, frontend, design, technology, tutorials, blog' 
            : props.post.tags.join(', ')
        },
        {
          name: 'author',
          content: props.post.author
        },
        {
          name: 'robots',
          content: 'index, follow'
        },
        // Open Graph tags
        {
          property: 'og:title',
          content: props.post.title
        },
        {
          property: 'og:description',
          content: props.post.excerpt
        },
        {
          property: 'og:image',
          content: imageUrl
        },
        {
          property: 'og:url',
          content: postUrl
        },
        {
          property: 'og:type',
          content: 'article'
        },
        {
          property: 'og:site_name',
          content: 'The Dev Ricardo'
        },
        {
          property: 'article:author',
          content: props.post.author
        },
        {
          property: 'article:published_time',
          content: props.post.date
        },
        {
          property: 'article:section',
          content: props.post.category
        },
        {
          property: 'article:tag',
          content: props.post.tags.join(', ')
        },
        // Twitter Card tags
        {
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          name: 'twitter:title',
          content: props.post.title
        },
        {
          name: 'twitter:description',
          content: props.post.excerpt
        },
        {
          name: 'twitter:image',
          content: imageUrl
        },
        {
          name: 'twitter:creator',
          content: '@thedevricardo'
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: postUrl
        },
        {
          rel: 'alternate',
          type: 'application/rss+xml',
          title: 'The Dev Ricardo Blog RSS Feed',
          href: `${baseUrl}/blog-rss.xml`
        }
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(jsonLd)
        },
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(breadcrumbJsonLd)
        },
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(websiteJsonLd)
        }
      ]
    })

    return {}
  }
}
</script>
