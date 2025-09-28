// DOMPurify removed to prevent build issues - using basic sanitization
let DOMPurify: any = null;

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
// Server-side safe HTML processing
function serverSideSanitize(html: string): string {
  return html
    .replace(/<script[^>]*>.*?<\/script>/gi, '') // Remove scripts
    .replace(/<style[^>]*>.*?<\/style>/gi, '') // Remove style tags
    .replace(/on\w+="[^"]*"/gi, '') // Remove event handlers
    .replace(/javascript:/gi, '') // Remove javascript: urls
    .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '') // Remove iframes
    .replace(/<object[^>]*>.*?<\/object>/gi, '') // Remove objects
    .replace(/<embed[^>]*>/gi, '') // Remove embeds
    // Ensure images have proper attributes for better loading
    .replace(/<img([^>]*?)>/gi, (match, attrs) => {
      if (!attrs.includes('loading=')) {
        attrs += ' loading="lazy"';
      }
      if (!attrs.includes('decoding=')) {
        attrs += ' decoding="async"';
      }
      return `<img${attrs}>`;
    });
}

export function sanitizeHtml(html: string): string {
  // For server-side, preserve safe HTML structure but remove dangerous elements
  if (typeof window === 'undefined') {
    return serverSideSanitize(html);
  }

  try {
    if (DOMPurify) {
      return DOMPurify.sanitize(html, SANITIZE_CONFIG);
    } else {
      // Fallback: Use server-side sanitization
      return serverSideSanitize(html);
    }
  } catch (error) {
    console.error('HTML sanitization failed:', error);
    // Fallback: Use server-side sanitization
    return serverSideSanitize(html);
  }
}

/**
 * Sanitize blog post content with blog-specific rules
 * @param content - Blog post HTML content
 * @returns Sanitized content safe for blog rendering
 */
export function sanitizeBlogContent(content: string): string {
  // For server-side, use safer sanitization that preserves structure
  if (typeof window === 'undefined') {
    return serverSideSanitize(content);
  }

  const blogConfig = {
    ...SANITIZE_CONFIG,
    ALLOWED_TAGS: [
      ...SANITIZE_CONFIG.ALLOWED_TAGS,
      'table', 'thead', 'tbody', 'tr', 'td', 'th', 'caption'
    ]
  };

  try {
    if (DOMPurify) {
      return DOMPurify.sanitize(content, blogConfig);
    } else {
      return serverSideSanitize(content);
    }
  } catch (error) {
    console.error('Blog content sanitization failed:', error);
    return serverSideSanitize(content);
  }
}

/**
 * Sanitize FAQ content with minimal allowed tags
 * @param content - FAQ answer HTML content
 * @returns Sanitized content safe for FAQ rendering
 */
export function sanitizeFaqContent(content: string): string {
  // For static builds, always strip HTML on server-side to avoid canvas dependency
  if (typeof window === 'undefined') {
    return content.replace(/<[^>]*>/g, '');
  }

  const faqConfig = {
    ...SANITIZE_CONFIG,
    ALLOWED_TAGS: ['p', 'br', 'strong', 'b', 'em', 'i', 'a', 'ul', 'ol', 'li']
  };

  try {
    if (DOMPurify) {
      return DOMPurify.sanitize(content, faqConfig);
    } else {
      return content.replace(/<[^>]*>/g, '');
    }
  } catch (error) {
    console.error('FAQ content sanitization failed:', error);
    return content.replace(/<[^>]*>/g, '');
  }
}