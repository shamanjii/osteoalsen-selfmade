'use client';

import { useEffect } from 'react';
import { monitoring } from '@/lib/monitoring';

export default function GlobalErrorHandler() {
  useEffect(() => {
    // Handle uncaught JavaScript errors
    const handleError = (event: ErrorEvent) => {
      monitoring.logError(new Error(event.message), {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        source: 'window.onerror',
      });
    };

    // Handle unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const error = event.reason instanceof Error
        ? event.reason
        : new Error(String(event.reason));

      monitoring.logError(error, {
        source: 'unhandledrejection',
        promise: true,
      });
    };

    // Handle resource loading errors (only for critical resources)
    const handleResourceError = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target && target.tagName) {
        const src = (target as HTMLImageElement).src || (target as HTMLLinkElement).href;

        // Skip logging for expected missing images or non-critical resources
        const isImageError = target.tagName === 'IMG';
        const isOptionalResource = src && (
          src.includes('/assets/') ||
          src.includes('/images/') ||
          src.includes('.jpg') ||
          src.includes('.png') ||
          src.includes('.webp')
        );

        // Only log critical resource errors (scripts, stylesheets, etc.)
        if (!isImageError || !isOptionalResource) {
          monitoring.logError(new Error(`Critical resource failed to load: ${target.tagName}`), {
            source: 'resource_error',
            element: target.tagName,
            src: src,
          });
        }
      }
    };

    // Add event listeners
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleResourceError, true); // Capture phase

    // Web Vitals monitoring
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        // Monitor Core Web Vitals
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'navigation') {
              const navEntry = entry as PerformanceNavigationTiming;
              const duration = navEntry.loadEventEnd - navEntry.fetchStart;

              // Only log if we have valid timing data
              if (!isNaN(duration) && duration > 0) {
                monitoring.logPerformance({
                  name: 'page_load',
                  duration: duration,
                  timestamp: new Date().toISOString(),
                  url: window.location.href,
                  type: 'navigation',
                });
              }
            }

            if (entry.entryType === 'paint') {
              monitoring.logPerformance({
                name: entry.name as string,
                duration: entry.startTime,
                timestamp: new Date().toISOString(),
                url: window.location.href,
                type: 'navigation',
              });
            }
          }
        });

        observer.observe({ entryTypes: ['navigation', 'paint'] });

        // Monitor layout shifts
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as PerformanceEntry & { hadRecentInput?: boolean }).hadRecentInput) {
              monitoring.logPerformance({
                name: 'cumulative_layout_shift',
                duration: (entry as PerformanceEntry & { value: number }).value,
                timestamp: new Date().toISOString(),
                url: window.location.href,
                type: 'custom',
              });
            }
          }
        });

        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (error) {
        console.warn('Performance monitoring not available:', error);
      }
    }

    // Cleanup
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleResourceError, true);
    };
  }, []);

  return null; // This component doesn't render anything
}