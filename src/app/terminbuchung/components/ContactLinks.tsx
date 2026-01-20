"use client";
import { trackPhoneClick, trackEmailClick, BookingTracking } from "@/lib/analytics-events";

export default function ContactLinks() {
  return (
    <div className="text-center">
      <div className="bg-slate-50 rounded-2xl p-8 max-w-2xl mx-auto border border-slate-200">
        <h3 className="font-epilogue text-xl font-semibold text-slate-900 mb-6">📞 Kontakt</h3>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a
            href="tel:+4917643990001"
            onClick={() => {
              trackPhoneClick('booking_page_contact');
              BookingTracking.alternativeContactUsed('phone');
            }}
            className="flex items-center justify-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
          >
            <span className="text-lg">📞</span>
            0176 4399 0001
          </a>
          <a
            href="mailto:joshua@alsen.info"
            onClick={() => {
              trackEmailClick('booking_page_contact');
              BookingTracking.alternativeContactUsed('email');
            }}
            className="flex items-center justify-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors"
          >
            <span className="text-lg">✉️</span>
            joshua@alsen.info
          </a>
        </div>
      </div>
    </div>
  );
}
