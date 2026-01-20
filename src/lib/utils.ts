import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function formatDate(date: Date | string | null): string {
  if (!date) return ''

  const d = new Date(date)
  return new Intl.DateTimeFormat('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(d)
}

export function formatDateTime(date: Date | string | null): string {
  if (!date) return ''

  const d = new Date(date)
  return new Intl.DateTimeFormat('de-DE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(d)
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

export function extractExcerpt(content: string, maxLength: number = 160): string {
  // Remove markdown and HTML tags
  const plainText = content
    .replace(/#+\s/g, '') // Remove markdown headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()

  return truncateText(plainText, maxLength)
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

/**
 * Extract FAQs from markdown content
 * Looks for patterns like "### Question?" followed by answer text
 */
export function extractFAQs(content: string): Array<{ question: string; answer: string }> {
  const faqs: Array<{ question: string; answer: string }> = []

  // Look for FAQ section heading
  const faqSectionMatch = content.match(/##\s+(?:Häufige Fragen|FAQ|Frequently Asked Questions)/i)
  if (!faqSectionMatch) return faqs

  // Get content after FAQ section
  const faqContent = content.slice(faqSectionMatch.index!)

  // Extract Q&A pairs
  // Pattern: ### followed by question ending with ?
  const questionRegex = /###\s+(.+?\?)\s*\n([\s\S]*?)(?=\n###|$)/g
  let match

  while ((match = questionRegex.exec(faqContent)) !== null && faqs.length < 10) {
    const question = match[1].trim()
    let answer = match[2].trim()

    // Clean up answer - remove markdown formatting
    answer = answer
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.*?)\*/g, '$1') // Remove italic
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links (keep text)
      .replace(/^-\s+/gm, '') // Remove list markers
      .replace(/\n{3,}/g, '\n\n') // Normalize line breaks
      .slice(0, 500) // Limit answer length for schema

    if (question && answer) {
      faqs.push({ question, answer })
    }
  }

  return faqs
}

export function validateImageUrl(url: string): boolean {
  try {
    new URL(url)
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url)
  } catch {
    return false
  }
}

