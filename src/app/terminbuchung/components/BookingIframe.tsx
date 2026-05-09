"use client";
import { useState, useEffect, useRef } from "react";
import { ConversionFunnel, BookingTracking } from "@/lib/analytics-events";

export default function BookingIframe() {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeHeight, setIframeHeight] = useState<number>(900);
  const [hasScrolledToIframe, setHasScrolledToIframe] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const pageLoadTime = useRef<number>(Date.now());

  // Track booking interface open
  useEffect(() => {
    ConversionFunnel.openedBookingInterface();
  }, []);

  // Listen for postMessage from Lucar (resize + booking events)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://lucar.app') return;
      if (!event.data || typeof event.data !== 'object') return;

      switch (event.data.type) {
        case 'lucar:resize':
          if (typeof event.data.height === 'number' && event.data.height > 200) {
            setIframeHeight(Math.ceil(event.data.height));
          }
          break;
        case 'lucar:booking_completed':
          BookingTracking.bookingCompleted(event.data);
          break;
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
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
    <div id="booking-iframe" className="rounded-xl overflow-hidden shadow-lg border border-slate-200 relative">
      {!iframeLoaded && (
        <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-slate-300 border-t-slate-900 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600">Terminkalender wird geladen...</p>
          </div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        src="https://lucar.app/booking/osteopathie-alsen?embed=true"
        width="100%"
        height={iframeHeight}
        style={{ minHeight: '700px', border: 'none' }}
        loading="lazy"
        onLoad={handleIframeLoad}
        className="w-full"
        title="Online-Terminbuchung"
      />
    </div>
  );
}
