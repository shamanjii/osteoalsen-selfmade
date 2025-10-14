'use client';

import { useEffect, useState } from 'react';

interface ReadingProgressBarProps {
  contentRef: React.RefObject<HTMLElement>;
}

export default function ReadingProgressBar({ contentRef }: ReadingProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      if (!contentRef.current) return;

      const articleElement = contentRef.current;
      const articleTop = articleElement.offsetTop;
      const articleHeight = articleElement.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Calculate how far through the article the user has scrolled
      const scrollStart = articleTop - windowHeight * 0.2; // Start when article is 20% visible
      const scrollEnd = articleTop + articleHeight - windowHeight * 0.8; // End when 80% scrolled past
      const scrollDistance = scrollEnd - scrollStart;

      if (scrollTop < scrollStart) {
        setProgress(0);
      } else if (scrollTop > scrollEnd) {
        setProgress(100);
      } else {
        const currentProgress = ((scrollTop - scrollStart) / scrollDistance) * 100;
        setProgress(Math.min(Math.max(currentProgress, 0), 100));
      }
    };

    // Initial calculation
    updateProgress();

    // Update on scroll
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [contentRef]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-200">
      <div
        className="h-full bg-gradient-to-r from-slate-600 via-slate-800 to-slate-900 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Lesefortschritt"
      >
        {/* Glow effect at the end */}
        <div
          className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-slate-900/50 to-transparent"
          style={{ opacity: progress > 5 ? 1 : 0 }}
        />
      </div>

      {/* Optional: Reading time indicator */}
      {progress > 0 && progress < 100 && (
        <div className="absolute right-4 top-2 bg-slate-900 text-white text-xs px-2 py-1 rounded-full shadow-md">
          {Math.round(progress)}%
        </div>
      )}
    </div>
  );
}
