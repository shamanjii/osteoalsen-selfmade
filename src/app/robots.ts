import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.osteoalsen.de'

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/_next/static/', // Allow CSS, JS, fonts, images
          '/_next/image/', // Allow Next.js Image Optimization
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/_next/data/', // Only block data files
          '/private/',
          '/*.json$',
          '/terminbuchung/success', // Don't index confirmation pages
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
        ],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
    // LLMs.txt for AI crawlers (ChatGPT, Gemini, Perplexity, etc.)
    other: {
      'llms-full-text': `${baseUrl}/llms.txt`,
    }
  }
}
