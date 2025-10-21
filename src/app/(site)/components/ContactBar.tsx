"use client";
import { useState, useEffect, useCallback } from "react";
import throttle from "lodash.throttle";

/**
 * ContactBar - Schmale Kontaktleiste zwischen Header und Hero
 *
 * Zeigt die wichtigsten Kontaktinformationen (Telefon + E-Mail) prominent an,
 * damit Besucher sofort sehen, wie sie Kontakt aufnehmen können.
 * Versteckt sich zusammen mit dem Header beim Scrollen.
 */
export default function ContactBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Throttled scroll handler (same logic as SiteHeader)
  const handleScroll = useCallback(() => {
    const throttledHandler = throttle(() => {
      const currentScrollY = window.scrollY;

      // Show at top of page
      if (currentScrollY < 10) {
        setIsVisible(true);
      }
      // Hide when scrolling down, show when scrolling up
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    }, 16); // 60fps throttling

    return throttledHandler;
  }, [lastScrollY]);

  useEffect(() => {
    const scrollHandler = handleScroll();
    window.addEventListener('scroll', scrollHandler, { passive: true });
    return () => {
      window.removeEventListener('scroll', scrollHandler);
      scrollHandler.cancel();
    };
  }, [handleScroll]);

  return (
    <div className={`fixed top-0 w-full z-50 bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700 transition-transform duration-300 ease-in-out ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 py-3">
          {/* Telefon */}
          <a
            href="tel:+4917643990001"
            className="flex items-center gap-2 text-white hover:text-amber-400 transition-colors duration-200 group"
          >
            <svg
              className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span className="text-sm font-medium">+49 176 43990001</span>
          </a>

          {/* Separator */}
          <div className="hidden sm:block w-px h-4 bg-slate-600" />

          {/* E-Mail */}
          <a
            href="mailto:joshua@alsen.info"
            className="flex items-center gap-2 text-white hover:text-amber-400 transition-colors duration-200 group"
          >
            <svg
              className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm font-medium">joshua@alsen.info</span>
          </a>

          {/* Separator */}
          <div className="hidden sm:block w-px h-4 bg-slate-600" />

          {/* Schneller Hinweis */}
          <div className="flex items-center gap-2 text-amber-400">
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium">Termine oft binnen 48h</span>
          </div>
        </div>
      </div>
    </div>
  );
}
