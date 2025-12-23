'use client';

import { useEffect, useState, useMemo } from 'react';
import { sanitizeBlogContent, sanitizeFaqContent, sanitizeHtml } from '@/lib/sanitize';

interface SafeHtmlProps {
  html: string;
  className?: string;
  type?: 'default' | 'blog' | 'faq';
}

/**
 * Safe HTML component that sanitizes content before rendering
 * Prevents XSS attacks by using DOMPurify
 * PERFORMANCE: Uses useMemo to prevent re-sanitization on every render
 */
export default function SafeHtml({ html, className = '', type = 'default' }: SafeHtmlProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // PERFORMANCE: Memoize sanitization to avoid re-computation
  const sanitizedHtml = useMemo(() => {
    if (!isClient) {
      // Server-side: Return raw HTML (will be sanitized on client)
      return html;
    }

    try {
      switch (type) {
        case 'blog':
          return sanitizeBlogContent(html);
        case 'faq':
          return sanitizeFaqContent(html);
        default:
          return sanitizeHtml(html);
      }
    } catch (error) {
      console.error('HTML sanitization failed:', error);
      // Fallback: strip all HTML tags if sanitization fails
      return html.replace(/<[^>]*>/g, '');
    }
  }, [html, type, isClient]);

  // PERFORMANCE: Memoize className computation
  const contentClasses = useMemo(() => {
    const baseClasses = type === 'faq'
      ? 'rich-text max-w-none text-sm'
      : 'rich-text max-w-none';
    return `${baseClasses} ${className}`;
  }, [type, className]);

  return (
    <div
      className={contentClasses}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      suppressHydrationWarning // Suppress hydration warning for SSR/CSR mismatch
    />
  );
}