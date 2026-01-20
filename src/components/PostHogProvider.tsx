'use client';

/**
 * PostHog Analytics Provider
 *
 * Initializes PostHog and tracks page views automatically.
 * Designed to never block page rendering even if tracking fails.
 */

import { useEffect, Suspense, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function PostHogTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure we only run on client after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Initialize PostHog on mount (deferred to avoid blocking)
  useEffect(() => {
    if (!isMounted) return;

    // Use requestIdleCallback or setTimeout to defer initialization
    const initId = typeof requestIdleCallback !== 'undefined'
      ? requestIdleCallback(() => initPostHog())
      : setTimeout(() => initPostHog(), 100);

    async function initPostHog() {
      try {
        const { initPostHog: init } = await import('@/lib/posthog');
        init();
        setIsInitialized(true);
      } catch (error) {
        // PostHog not critical - fail silently in production
        if (process.env.NODE_ENV === 'development') {
          console.error('Failed to initialize PostHog:', error);
        }
      }
    }

    return () => {
      if (typeof requestIdleCallback !== 'undefined') {
        cancelIdleCallback(initId as number);
      } else {
        clearTimeout(initId as NodeJS.Timeout);
      }
    };
  }, [isMounted]);

  // Track page views on route change
  useEffect(() => {
    if (!isMounted || !isInitialized) return;

    const trackPage = async () => {
      try {
        const { trackPageView } = await import('@/lib/posthog');
        const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
        trackPageView(url, document.referrer);
      } catch (error) {
        // Tracking not critical - fail silently
        if (process.env.NODE_ENV === 'development') {
          console.error('Failed to track page view:', error);
        }
      }
    };

    trackPage();
  }, [pathname, searchParams, isInitialized, isMounted]);

  return null;
}

export default function PostHogProvider() {
  return (
    <Suspense fallback={null}>
      <PostHogTracker />
    </Suspense>
  );
}
