'use client';

import { useEffect, useState } from 'react';
import { sanitizeBlogContent, sanitizeFaqContent, sanitizeHtml } from '@/lib/sanitize';

interface SafeHtmlProps {
  html: string;
  className?: string;
  type?: 'default' | 'blog' | 'faq';
}

/**
 * Safe HTML component that sanitizes content before rendering
 * Prevents XSS attacks by using DOMPurify
 */
export default function SafeHtml({ html, className = '', type = 'default' }: SafeHtmlProps) {
  const [sanitizedHtml, setSanitizedHtml] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      let sanitized: string;

      try {
        switch (type) {
          case 'blog':
            sanitized = sanitizeBlogContent(html);
            break;
          case 'faq':
            sanitized = sanitizeFaqContent(html);
            break;
          default:
            sanitized = sanitizeHtml(html);
            break;
        }
        setSanitizedHtml(sanitized);
      } catch (error) {
        console.error('HTML sanitization failed:', error);
        // Fallback: strip all HTML tags if sanitization fails
        setSanitizedHtml(html.replace(/<[^>]*>/g, ''));
      }
    } else {
      // Server-side fallback: strip all HTML tags to avoid canvas issues
      setSanitizedHtml(html.replace(/<[^>]*>/g, ''));
    }
  }, [html, type, isClient]);

  // Show loading state while hydrating
  if (!isClient) {
    return (
      <div className={className}>
        {html.replace(/<[^>]*>/g, '')}
      </div>
    );
  }

  // Add proper styling based on type - using custom .rich-text class
  const getContentClasses = () => {
    switch (type) {
      case 'blog':
        return 'rich-text max-w-none';
      case 'faq':
        return 'rich-text max-w-none text-sm';
      default:
        return 'rich-text max-w-none';
    }
  };

  return (
    <div
      className={`${getContentClasses()} ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}