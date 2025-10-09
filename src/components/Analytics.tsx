'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (command: string, targetId: string, config?: Record<string, unknown>) => void;
  }
}

const GTM_ID = 'GTM-NRHDBZ59';
const GA_MEASUREMENT_ID = 'G-8E63RJG34K';

function AnalyticsInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!window.gtag) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    window.gtag('config', GA_MEASUREMENT_ID, {
      page_location: url,
      page_title: document.title,
      send_page_view: true,
    });

    // Track page view for monitoring
    if (typeof window !== 'undefined') {
      import('@/lib/monitoring').then(({ monitoring }) => {
        monitoring.logPageView(url, document.referrer);
      }).catch(() => {
        // Monitoring not critical, fail silently
      });
    }
  }, [pathname, searchParams]);

  return null;
}

export default function Analytics() {
  return (
    <>
      <Suspense fallback={null}>
        <AnalyticsInner />
      </Suspense>

      {/* Google Tag Manager */}
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

      {/* Google Analytics 4 (Fallback via gtag.js) */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_location: window.location.href,
              page_title: document.title,
              send_page_view: true,
              // Privacy settings (GDPR compliant)
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false
            });
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

// Utility functions for tracking events
export const trackEvent = (eventName: string, parameters?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...parameters,
      send_to: GA_MEASUREMENT_ID,
    });
  }
};

export const trackConversion = (conversionName: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: GA_MEASUREMENT_ID,
      event_category: 'conversion',
      event_label: conversionName,
      value: value || 1,
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
