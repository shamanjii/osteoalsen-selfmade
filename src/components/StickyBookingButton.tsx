"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { linkPath } from "@/lib/basePath";

export default function StickyBookingButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 300px down
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Link
      href={linkPath("/terminbuchung")}
      className={`fixed bottom-8 right-8 z-40 bg-gradient-to-r from-slate-800 to-slate-900 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-slate-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-2 font-semibold ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-20 opacity-0 pointer-events-none"
      }`}
      aria-label="Termin buchen"
    >
      <span className="text-xl">📅</span>
      <span className="hidden sm:inline">Termin buchen</span>
      <span className="sm:hidden">Termin</span>
    </Link>
  );
}
