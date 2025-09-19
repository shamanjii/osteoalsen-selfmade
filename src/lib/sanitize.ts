import DOMPurify from 'dompurify';

// Safe HTML sanitization configuration
const SANITIZE_CONFIG = {
  ALLOWED_TAGS: [
    'p', 'br', 'strong', 'b', 'em', 'i', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'code', 'pre', 'span', 'div'
  ],
  ALLOWED_ATTR: [
    'href', 'title', 'alt', 'src', 'width', 'height', 'class', 'id'
  ],
  ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  FORBID_TAGS: ['script', 'object', 'embed', 'form', 'input', 'textarea'],
  FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'style'],
  KEEP_CONTENT: true,
  RETURN_DOM: false,
  RETURN_DOM_FRAGMENT: false,
  RETURN_DOM_IMPORT: false
};

/**
 * Safely sanitize HTML content to prevent XSS attacks
 * @param html - Raw HTML string to sanitize
 * @returns Sanitized HTML string safe for rendering
 */
export function sanitizeHtml(html: string): string {
  if (typeof window === 'undefined') {
    // Server-side: Return plain text or use server-side DOMPurify
    return html.replace(/<[^>]*>/g, ''); // Strip all HTML tags on server
  }

  try {
    return DOMPurify.sanitize(html, SANITIZE_CONFIG);
  } catch (error) {
    console.error('HTML sanitization failed:', error);
    // Fallback: Strip all HTML tags if sanitization fails
    return html.replace(/<[^>]*>/g, '');
  }
}

/**
 * Sanitize blog post content with blog-specific rules
 * @param content - Blog post HTML content
 * @returns Sanitized content safe for blog rendering
 */
export function sanitizeBlogContent(content: string): string {
  const blogConfig = {
    ...SANITIZE_CONFIG,
    ALLOWED_TAGS: [
      ...SANITIZE_CONFIG.ALLOWED_TAGS,
      'table', 'thead', 'tbody', 'tr', 'td', 'th', 'caption'
    ]
  };

  if (typeof window === 'undefined') {
    return content.replace(/<[^>]*>/g, '');
  }

  try {
    return DOMPurify.sanitize(content, blogConfig);
  } catch (error) {
    console.error('Blog content sanitization failed:', error);
    return content.replace(/<[^>]*>/g, '');
  }
}

/**
 * Sanitize FAQ content with minimal allowed tags
 * @param content - FAQ answer HTML content
 * @returns Sanitized content safe for FAQ rendering
 */
export function sanitizeFaqContent(content: string): string {
  const faqConfig = {
    ...SANITIZE_CONFIG,
    ALLOWED_TAGS: ['p', 'br', 'strong', 'b', 'em', 'i', 'a', 'ul', 'ol', 'li']
  };

  if (typeof window === 'undefined') {
    return content.replace(/<[^>]*>/g, '');
  }

  try {
    return DOMPurify.sanitize(content, faqConfig);
  } catch (error) {
    console.error('FAQ content sanitization failed:', error);
    return content.replace(/<[^>]*>/g, '');
  }
}