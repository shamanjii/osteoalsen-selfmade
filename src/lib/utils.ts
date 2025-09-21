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

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

export function validateImageUrl(url: string): boolean {
  try {
    new URL(url)
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url)
  } catch {
    return false
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'PUBLISHED':
      return 'bg-green-100 text-green-800'
    case 'DRAFT':
      return 'bg-yellow-100 text-yellow-800'
    case 'ARCHIVED':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export function getRoleColor(role: string): string {
  switch (role) {
    case 'ADMIN':
      return 'bg-red-100 text-red-800'
    case 'EDITOR':
      return 'bg-blue-100 text-blue-800'
    case 'USER':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}