"use client";
import { useState, useEffect, useRef } from "react";
import { ConversionFunnel, BookingTracking } from "@/lib/analytics-events";

export default function BookingIframe() {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [hasScrolledToIframe, setHasScrolledToIframe] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const pageLoadTime = useRef<number>(Date.now());

  // Track page open and load etermin script
  useEffect(() => {
    // Track that user opened booking interface
    ConversionFunnel.openedBookingInterface();

    // Load etermin resize script
    const script = document.createElement('script');
    script.src = 'https://www.eTermin.net/js/resizecustomersitescroll.min.js';
    script.type = 'text/javascript';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[src="https://www.eTermin.net/js/resizecustomersitescroll.min.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  // Track scroll to iframe (user engagement)
  useEffect(() => {
    if (!iframeRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasScrolledToIframe) {
            setHasScrolledToIframe(true);
            BookingTracking.scrolledToIframe();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(iframeRef.current);
    return () => observer.disconnect();
  }, [hasScrolledToIframe]);

  // Track significant time spent on page
  useEffect(() => {
    const timer = setTimeout(() => {
      const timeSpentSeconds = Math.floor((Date.now() - pageLoadTime.current) / 1000);
      BookingTracking.significantTimeSpent(timeSpentSeconds);
    }, 60000);

    return () => clearTimeout(timer);
  }, []);

  // Track exit behavior
  useEffect(() => {
    const handleBeforeUnload = () => {
      const timeOnPageSeconds = Math.floor((Date.now() - pageLoadTime.current) / 1000);
      BookingTracking.exitedBookingPage(timeOnPageSeconds, hasScrolledToIframe);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasScrolledToIframe]);

  // Handle iframe load
  const handleIframeLoad = () => {
    const loadTime = Date.now() - pageLoadTime.current;
    setIframeLoaded(true);
    BookingTracking.iframeLoaded(loadTime);
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200 relative">
      {!iframeLoaded && (
        <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-slate-300 border-t-slate-900 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600">Terminkalender wird geladen...</p>
          </div>
        </div>
      )}
      <iframe
        id="etifr"
        ref={iframeRef}
        src="https://www.eTermin.net/osteoalsen"
        width="100%"
        height="800"
        style={{ minHeight: '600px', border: 'none' }}
        scrolling="no"
        onLoad={handleIframeLoad}
        className="w-full"
        title="Online Terminbuchung"
      />
    </div>
  );
}
