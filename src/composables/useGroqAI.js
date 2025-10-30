import { ref } from 'vue'

export function useGroqAI() {
  const isLoading = ref(false)
  const error = ref(null)

  const generateBlogPost = async (rssItem) => {
    isLoading.value = true
    error.value = null

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY
      if (!apiKey) {
        throw new Error('Groq API key not found')
      }

      const prompt = `You are a tech blogger writing for a developer audience. Create a comprehensive blog post based on this RSS feed item:

Title: ${rssItem.title}
Description: ${rssItem.description}
Source URL: ${rssItem.link}

Please generate a full blog post in markdown format with the following structure:

1. An engaging title (different from the RSS title)
2. A compelling excerpt (2-3 sentences)
3. An introduction that hooks the reader
4. Main content with 3-4 sections covering:
   - The key points from the news
   - Technical implications for developers
   - Practical examples or code snippets where relevant
   - Future implications or trends
5. A conclusion with actionable takeaways
6. Relevant tags (3-5 tags)

Format the response as a markdown file with frontmatter:

---
title: "Your Generated Title"
excerpt: "Your compelling excerpt"
date: "${new Date().toISOString().split('T')[0]}"
author: "Ricardo Moses"
tags: ["tag1", "tag2", "tag3"]
coverImage: "https://i.postimg.cc/52xz48sW/resources.png"
isAiGenerated: true
sourceUrl: "${rssItem.link}"
generatedDate: "${new Date().toISOString()}"
category: "Tech Updates"
readingTime: "5 min read"
---

[Your full blog post content here in markdown]`

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-70b-versatile',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000
        })
      })

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      const generatedContent = data.choices[0].message.content

      // Parse the generated content to extract frontmatter and content
      const frontmatterMatch = generatedContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
      
      if (!frontmatterMatch) {
        throw new Error('Failed to parse generated blog post format')
      }

      const frontmatter = frontmatterMatch[1]
      const content = frontmatterMatch[2]

      // Parse frontmatter into object
      const metadata = {}
      frontmatter.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':')
        if (key && valueParts.length > 0) {
          const value = valueParts.join(':').trim()
          if (value.startsWith('"') && value.endsWith('"')) {
            metadata[key.trim()] = value.slice(1, -1)
          } else if (value.startsWith('[') && value.endsWith(']')) {
            metadata[key.trim()] = JSON.parse(value)
          } else {
            metadata[key.trim()] = value
          }
        }
      })

      return {
        frontmatter: metadata,
        content: content.trim(),
        fullContent: generatedContent
      }

    } catch (err) {
      error.value = err.message
      console.error('Error generating blog post:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    generateBlogPost
  }
}
