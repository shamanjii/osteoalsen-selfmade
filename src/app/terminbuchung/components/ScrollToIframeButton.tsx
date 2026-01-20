"use client";

export default function ScrollToIframeButton() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      document.getElementById('etifr')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a
      href="#etifr"
      onClick={handleClick}
      className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
    >
      📅 Jetzt Termin buchen
    </a>
  );
}
