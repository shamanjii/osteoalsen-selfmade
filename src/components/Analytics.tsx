'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, any>) => void;
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !window.gtag) return;

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
      });
    }
  }, [pathname, searchParams]);

  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
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
              // Privacy settings
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false
            });

            // Track Core Web Vitals
            gtag('config', '${GA_MEASUREMENT_ID}', {
              custom_map: {
                'custom_parameter_1': 'metric_name',
                'custom_parameter_2': 'metric_value'
              }
            });
          `,
        }}
      />
    </>
  );
}

// Utility functions for tracking events
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('event', eventName, {
      ...parameters,
      send_to: GA_MEASUREMENT_ID,
    });
  }
};

export const trackConversion = (conversionName: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
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