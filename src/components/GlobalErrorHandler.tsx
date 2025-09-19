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

    // Handle resource loading errors
    const handleResourceError = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target && target.tagName) {
        monitoring.logError(new Error(`Resource failed to load: ${target.tagName}`), {
          source: 'resource_error',
          element: target.tagName,
          src: (target as any).src || (target as any).href,
        });
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
              monitoring.logPerformance({
                name: 'page_load',
                duration: navEntry.loadEventEnd - navEntry.navigationStart,
                timestamp: new Date().toISOString(),
                url: window.location.href,
                type: 'navigation',
              });
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
            if (!entry.hadRecentInput) {
              monitoring.logPerformance({
                name: 'cumulative_layout_shift',
                duration: (entry as any).value,
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