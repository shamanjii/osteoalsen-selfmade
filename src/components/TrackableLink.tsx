interface TrackableLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  eventName?: 'phone_click' | 'email_click' | 'appointment_click';
  source?: string;
}

/**
 * Simple link component (tracking disabled for stability)
 */
export default function TrackableLink({
  href,
  children,
  className = '',
}: TrackableLinkProps) {
  return (
    <a href={href} className={className}>
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
