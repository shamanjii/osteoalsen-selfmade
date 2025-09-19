'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import throttle from 'lodash.throttle';
import { trackAppointmentClick } from './Analytics';

export default function FloatingBookingButton() {
  const [isVisible, setIsVisible] = useState(false);
  const contactSectionRef = useRef<HTMLElement | null>(null);

  // Cache DOM element reference
  useEffect(() => {
    contactSectionRef.current = document.getElementById('kontakt');
  }, []);

  // Throttled scroll handler for better performance
  const toggleVisibility = useCallback(() => {
    const throttledToggle = throttle(() => {
      // Show button after scrolling 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }, 16); // 60fps throttling

    return throttledToggle;
  }, []);

  useEffect(() => {
    const scrollHandler = toggleVisibility();
    window.addEventListener('scroll', scrollHandler, { passive: true });
    return () => {
      window.removeEventListener('scroll', scrollHandler);
      scrollHandler.cancel(); // Cancel pending throttled calls
    };
  }, [toggleVisibility]);

  // Memoize click handler and use cached DOM reference
  const handleClick = useCallback(() => {
    // Track the conversion event
    trackAppointmentClick('floating_button');

    const contactSection = contactSectionRef.current || document.getElementById('kontakt');
    if (contactSection) {
      const headerHeight = 120;
      const targetPosition = contactSection.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 transition-all duration-500 ease-out floating-booking-mobile ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <button
        onClick={handleClick}
        className="group relative bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white px-6 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden animate-pulse-slow"
        aria-label="Termin vereinbaren"
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 -top-1 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

        {/* Button content */}
        <div className="relative flex items-center gap-3">
          <span className="text-xl">📅</span>
          <span className="font-semibold text-sm whitespace-nowrap">Termin vereinbaren</span>
        </div>
      </button>
    </div>
  );
}