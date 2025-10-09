'use client';

import { trackEvent } from './Analytics';

interface TrackableLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  eventName: 'phone_click' | 'email_click' | 'appointment_click';
  source?: string;
}

/**
 * Trackable link component that sends events to Google Analytics
 * Use for phone numbers, email addresses, and appointment booking links
 */
export default function TrackableLink({
  href,
  children,
  className = '',
  eventName,
  source = 'unknown',
}: TrackableLinkProps) {
  const handleClick = () => {
    trackEvent(eventName, {
      event_category: 'engagement',
      event_label: source,
      event_source: source,
      link_url: href,
    });
  };

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}

/**
 * Pre-configured components for common use cases
 */

interface PhoneLinkProps {
  children: React.ReactNode;
  className?: string;
  source?: string;
}

export function PhoneLink({ children, className = '', source = 'generic' }: PhoneLinkProps) {
  return (
    <TrackableLink
      href="tel:+4917643990001"
      className={className}
      eventName="phone_click"
      source={source}
    >
      {children}
    </TrackableLink>
  );
}

interface EmailLinkProps {
  children: React.ReactNode;
  className?: string;
  source?: string;
}

export function EmailLink({ children, className = '', source = 'generic' }: EmailLinkProps) {
  return (
    <TrackableLink
      href="mailto:joshua@alsen.info"
      className={className}
      eventName="email_click"
      source={source}
    >
      {children}
    </TrackableLink>
  );
}
