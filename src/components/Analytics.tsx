'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

const GTM_ID = 'GTM-NRHDBZ59';

function AnalyticsInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === 'undefined' || !window.dataLayer) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    // Push page view event to dataLayer for GTM
    window.dataLayer.push({
      event: 'page_view',
      page_location: url,
      page_title: document.title,
    });

    // Track page view for monitoring
    import('@/lib/monitoring').then(({ monitoring }) => {
      monitoring.logPageView(url, document.referrer);
    }).catch(() => {
      // Monitoring not critical, fail silently
    });
  }, [pathname, searchParams]);

  return null;
}

export default function Analytics() {
  return (
    <>
      <Suspense fallback={null}>
        <AnalyticsInner />
      </Suspense>

      {/* Google Tag Manager - Single source of truth */}
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />

      {/* GTM noscript fallback */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
}

// Utility functions for tracking events via GTM dataLayer
export const trackEvent = (eventName: string, parameters?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...parameters,
    });
  }
};

export const trackConversion = (conversionName: string, value?: number) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'conversion',
      conversion_name: conversionName,
      conversion_value: value || 1,
    });
  }
};

// Track appointment bookings
export const trackAppointmentClick = (source: string) => {
  trackEvent('appointment_click', {
    event_category: 'engagement',
    event_label: source,
    event_source: source,
  });
};

// Track contact form interactions
export const trackContactFormSubmit = () => {
  trackEvent('contact_form_submit', {
    event_category: 'conversion',
    event_label: 'contact_form',
  });

  trackConversion('contact_form_submission');
};
