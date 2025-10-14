'use client';

/**
 * PostHog Analytics Provider
 *
 * Initializes PostHog and tracks page views automatically.
 */

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initPostHog, trackPageView } from '@/lib/posthog';

export default function PostHogProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize PostHog on mount
  useEffect(() => {
    initPostHog();
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    const referrer = document.referrer;

    // Track in PostHog
    trackPageView(url, referrer);
  }, [pathname, searchParams]);

  return null;
}
