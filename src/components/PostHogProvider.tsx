'use client';

/**
 * PostHog Analytics Provider
 *
 * Initializes PostHog and tracks page views automatically.
 */

import { useEffect, Suspense, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initPostHog, trackPageView } from '@/lib/posthog';

function PostHogTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize PostHog on mount
  useEffect(() => {
    try {
      initPostHog();
      setIsInitialized(true);
    } catch (error) {
      console.error('Failed to initialize PostHog:', error);
      // Don't block page render if PostHog fails
    }
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (typeof window === 'undefined' || !isInitialized) return;

    try {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      const referrer = document.referrer;

      // Track in PostHog
      trackPageView(url, referrer);
    } catch (error) {
      console.error('Failed to track page view:', error);
      // Don't block page render if tracking fails
    }
  }, [pathname, searchParams, isInitialized]);

  return null;
}

export default function PostHogProvider() {
  return (
    <Suspense fallback={null}>
      <PostHogTracker />
    </Suspense>
  );
}
