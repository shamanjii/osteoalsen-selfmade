/**
 * Centralized Analytics Event Tracking
 *
 * This module provides a unified interface for tracking business-critical events
 * across both Google Analytics (GTM) and PostHog.
 *
 * Key Features:
 * - Dual tracking (GTM + PostHog)
 * - Type-safe event definitions
 * - Conversion funnel tracking
 * - SEO performance metrics
 */

import { trackEvent as baseTrackEvent } from '@/components/Analytics';

// ============================================================================
// EVENT TYPES & INTERFACES
// ============================================================================

export interface PageViewEvent {
  page_path: string;
  page_title: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export interface CTAClickEvent {
  cta_type: 'book_appointment' | 'call_phone' | 'send_email' | 'scroll_to_contact';
  cta_location: string; // e.g., 'hero', 'floating_button', 'footer'
  cta_text?: string;
}

export interface FormEvent {
  form_name: string;
  form_step?: string;
  form_field?: string;
  form_error?: string;
}

export interface TreatmentInteraction {
  treatment_type: string;
  interaction_type: 'view' | 'click' | 'expand' | 'book';
  source_page?: string;
}

export interface SearchEvent {
  search_query: string;
  search_results_count?: number;
  search_source?: string;
}

export interface NavigationEvent {
  link_url: string;
  link_text: string;
  link_location: string;
}

// ============================================================================
// CONVERSION FUNNEL TRACKING
// ============================================================================

/**
 * Track the user's progression through the appointment booking funnel
 */
export const ConversionFunnel = {
  // Step 1: Initial Interest
  viewedHomepage: () => {
    baseTrackEvent('funnel_homepage_view', {
      funnel_step: 1,
      funnel_name: 'appointment_booking',
      event_category: 'funnel',
    });
  },

  // Step 2: Explored Services
  exploredTreatments: (treatmentType?: string) => {
    baseTrackEvent('funnel_treatments_explored', {
      funnel_step: 2,
      funnel_name: 'appointment_booking',
      treatment_type: treatmentType,
      event_category: 'funnel',
    });
  },

  // Step 3: CTA Clicked
  clickedBookingCTA: (location: string) => {
    baseTrackEvent('funnel_booking_cta_clicked', {
      funnel_step: 3,
      funnel_name: 'appointment_booking',
      cta_location: location,
      event_category: 'funnel',
    });
  },

  // Step 4: Opened Booking Page/Modal
  openedBookingInterface: () => {
    baseTrackEvent('funnel_booking_interface_opened', {
      funnel_step: 4,
      funnel_name: 'appointment_booking',
      event_category: 'funnel',
    });
  },

  // Step 5: Started Form
  startedBookingForm: () => {
    baseTrackEvent('funnel_booking_form_started', {
      funnel_step: 5,
      funnel_name: 'appointment_booking',
      event_category: 'funnel',
    });
  },

  // Step 6: Submitted Form (CONVERSION!)
  completedBooking: (treatmentType?: string) => {
    baseTrackEvent('funnel_booking_completed', {
      funnel_step: 6,
      funnel_name: 'appointment_booking',
      treatment_type: treatmentType,
      event_category: 'conversion',
      conversion_value: 150, // Average treatment price
    });
  },

  // Drop-off: Abandoned Form
  abandonedBookingForm: (lastCompletedField?: string) => {
    baseTrackEvent('funnel_booking_abandoned', {
      funnel_name: 'appointment_booking',
      last_completed_field: lastCompletedField,
      event_category: 'funnel',
    });
  },
};

// ============================================================================
// CTA & ENGAGEMENT TRACKING
// ============================================================================

export const trackCTAClick = (event: CTAClickEvent) => {
  baseTrackEvent('cta_clicked', {
    cta_type: event.cta_type,
    cta_location: event.cta_location,
    cta_text: event.cta_text,
    event_category: 'engagement',
  });

  // Also track in conversion funnel if it's a booking CTA
  if (event.cta_type === 'book_appointment') {
    ConversionFunnel.clickedBookingCTA(event.cta_location);
  }
};

export const trackPhoneClick = (location: string) => {
  trackCTAClick({
    cta_type: 'call_phone',
    cta_location: location,
    cta_text: '+49 176 43990001',
  });
};

export const trackEmailClick = (location: string) => {
  trackCTAClick({
    cta_type: 'send_email',
    cta_location: location,
    cta_text: 'joshua@alsen.info',
  });
};

// ============================================================================
// TREATMENT & CONTENT INTERACTION
// ============================================================================

export const trackTreatmentView = (treatmentType: string, sourcePage?: string) => {
  baseTrackEvent('treatment_viewed', {
    treatment_type: treatmentType,
    source_page: sourcePage || window.location.pathname,
    event_category: 'content',
  });
};

export const trackTreatmentClick = (treatmentType: string, sourcePage?: string) => {
  baseTrackEvent('treatment_clicked', {
    treatment_type: treatmentType,
    source_page: sourcePage || window.location.pathname,
    event_category: 'engagement',
  });

  // Track in conversion funnel
  ConversionFunnel.exploredTreatments(treatmentType);
};

export const trackBlogPostView = (postTitle: string, postSlug: string) => {
  baseTrackEvent('blog_post_viewed', {
    post_title: postTitle,
    post_slug: postSlug,
    event_category: 'content',
  });
};

export const trackBlogPostReadTime = (
  postSlug: string,
  timeSpentSeconds: number,
  scrollDepthPercent: number
) => {
  baseTrackEvent('blog_post_read', {
    post_slug: postSlug,
    time_spent_seconds: timeSpentSeconds,
    scroll_depth_percent: scrollDepthPercent,
    event_category: 'engagement',
  });
};

// ============================================================================
// FORM TRACKING
// ============================================================================

export const trackFormStart = (formName: string) => {
  baseTrackEvent('form_started', {
    form_name: formName,
    event_category: 'form',
  });

  if (formName === 'appointment_booking') {
    ConversionFunnel.startedBookingForm();
  }
};

export const trackFormFieldComplete = (formName: string, fieldName: string) => {
  baseTrackEvent('form_field_completed', {
    form_name: formName,
    field_name: fieldName,
    event_category: 'form',
  });
};

export const trackFormError = (formName: string, fieldName: string, errorMessage: string) => {
  baseTrackEvent('form_error', {
    form_name: formName,
    field_name: fieldName,
    error_message: errorMessage,
    event_category: 'form',
  });
};

export const trackFormSubmitSuccess = (formName: string, submissionData?: Record<string, unknown>) => {
  baseTrackEvent('form_submitted', {
    form_name: formName,
    event_category: 'conversion',
    ...submissionData,
  });

  if (formName === 'appointment_booking') {
    ConversionFunnel.completedBooking(submissionData?.treatment_type as string);
  }
};

export const trackFormAbandoned = (formName: string, lastCompletedField?: string) => {
  baseTrackEvent('form_abandoned', {
    form_name: formName,
    last_completed_field: lastCompletedField,
    event_category: 'form',
  });

  if (formName === 'appointment_booking') {
    ConversionFunnel.abandonedBookingForm(lastCompletedField);
  }
};

// ============================================================================
// NAVIGATION & SEARCH
// ============================================================================

export const trackNavigation = (linkUrl: string, linkText: string, linkLocation: string) => {
  baseTrackEvent('navigation_click', {
    link_url: linkUrl,
    link_text: linkText,
    link_location: linkLocation,
    event_category: 'navigation',
  });
};

export const trackSearch = (query: string, resultsCount?: number) => {
  baseTrackEvent('search_performed', {
    search_query: query,
    search_results_count: resultsCount,
    event_category: 'search',
  });
};

// ============================================================================
// SEO & PERFORMANCE METRICS
// ============================================================================

export const trackSEOMetrics = (metrics: {
  page_url: string;
  keyword_target?: string;
  organic_ranking?: number;
  impressions?: number;
  clicks?: number;
  ctr?: number;
}) => {
  baseTrackEvent('seo_metrics_tracked', {
    ...metrics,
    event_category: 'seo',
  });
};

export const trackWebVitals = (metrics: {
  name: string; // e.g., 'FCP', 'LCP', 'CLS', 'FID', 'TTFB'
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}) => {
  baseTrackEvent('web_vitals', {
    metric_name: metrics.name,
    metric_value: metrics.value,
    metric_rating: metrics.rating,
    event_category: 'performance',
  });
};

// ============================================================================
// ERROR & MONITORING
// ============================================================================

export const trackError = (
  errorType: string,
  errorMessage: string,
  errorStack?: string,
  context?: Record<string, unknown>
) => {
  baseTrackEvent('error_occurred', {
    error_type: errorType,
    error_message: errorMessage,
    error_stack: errorStack,
    event_category: 'error',
    ...context,
  });
};

export const track404 = (attemptedPath: string, referrer?: string) => {
  baseTrackEvent('404_not_found', {
    attempted_path: attemptedPath,
    referrer: referrer || document.referrer,
    event_category: 'error',
  });
};
