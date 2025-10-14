/**
 * PostHog Analytics Configuration
 *
 * Provides PostHog client initialization and utility functions
 * for tracking user behavior, conversions, and SEO metrics.
 */

import posthog from 'posthog-js';

// Initialize PostHog client (only runs on client-side)
export function initPostHog() {
  if (typeof window === 'undefined') return;

  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  if (!posthogKey || !posthogHost) {
    console.warn('PostHog keys not configured');
    return;
  }

  if (!posthog.__loaded) {
    posthog.init(posthogKey, {
      api_host: posthogHost,
      person_profiles: 'identified_only', // GDPR-friendly: only track identified users
      capture_pageview: false, // We'll handle pageviews manually
      capture_pageleave: true, // Track exit intent
      autocapture: {
        dom_event_allowlist: ['click'], // Only capture clicks
        url_allowlist: [/osteoalsen\.de/], // Only our domain
        element_allowlist: ['button', 'a'], // Only buttons and links
      },
      session_recording: {
        maskAllInputs: true, // Privacy: mask all input fields
        maskTextSelector: '[data-sensitive]', // Mask sensitive elements
      },
      loaded: (posthogInstance) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('PostHog loaded', posthogInstance);
        }
      },
    });
  }
}

// Track custom events
export function trackEvent(
  eventName: string,
  properties?: Record<string, unknown>
): void {
  if (typeof window === 'undefined') return;

  posthog.capture(eventName, {
    timestamp: new Date().toISOString(),
    ...properties,
  });
}

// Track page views with metadata
export function trackPageView(url: string, referrer?: string): void {
  if (typeof window === 'undefined') return;

  posthog.capture('$pageview', {
    $current_url: url,
    $referrer: referrer || document.referrer,
    page_title: document.title,
  });
}

// Identify users (for authenticated sessions)
export function identifyUser(
  userId: string,
  properties?: Record<string, unknown>
): void {
  if (typeof window === 'undefined') return;

  posthog.identify(userId, properties);
}

// Reset user identity (on logout)
export function resetUser(): void {
  if (typeof window === 'undefined') return;

  posthog.reset();
}

// Feature flags
export function isFeatureEnabled(flag: string): boolean {
  if (typeof window === 'undefined') return false;

  return posthog.isFeatureEnabled(flag) ?? false;
}

// Get PostHog instance
export function getPostHog() {
  return posthog;
}
