/**
 * Web Vitals Performance Tracking
 *
 * Automatically tracks Core Web Vitals and sends them to analytics.
 * These metrics are crucial for SEO rankings.
 */

import { trackWebVitals } from './analytics-events';

export type WebVitalsMetric = {
  name: 'FCP' | 'LCP' | 'CLS' | 'FID' | 'TTFB' | 'INP';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
};

/**
 * Determines the rating based on thresholds from web.dev
 */
function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const thresholds: Record<string, [number, number]> = {
    FCP: [1800, 3000], // First Contentful Paint
    LCP: [2500, 4000], // Largest Contentful Paint
    CLS: [0.1, 0.25], // Cumulative Layout Shift
    FID: [100, 300], // First Input Delay
    TTFB: [800, 1800], // Time to First Byte
    INP: [200, 500], // Interaction to Next Paint
  };

  const [good, needsImprovement] = thresholds[name] || [0, 0];

  if (value <= good) return 'good';
  if (value <= needsImprovement) return 'needs-improvement';
  return 'poor';
}

/**
 * Track a single Web Vital metric
 */
export function reportWebVital(metric: WebVitalsMetric) {
  const rating = getRating(metric.name, metric.value);

  trackWebVitals({
    name: metric.name,
    value: Math.round(metric.value),
    rating,
  });
}

/**
 * Initialize Web Vitals tracking using Next.js built-in support
 */
export function initWebVitalsTracking() {
  if (typeof window === 'undefined') return;

  // Track using Next.js reportWebVitals
  // This should be called in _app.tsx or equivalent
}
