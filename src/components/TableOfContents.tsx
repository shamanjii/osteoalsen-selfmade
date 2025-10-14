'use client';

import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  contentRef: React.RefObject<HTMLElement>;
}

export default function TableOfContents({ contentRef }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Use MutationObserver to wait for content to be fully rendered
    const extractHeadings = () => {
      if (!contentRef.current) return;

      // Look for headings in the entire subtree, including in dangerouslySetInnerHTML content
      const headings = contentRef.current.querySelectorAll('h2, h3');
      const items: TocItem[] = [];

      headings.forEach((heading, index) => {
        // Create ID if not exists
        if (!heading.id) {
          const id = `heading-${index}-${heading.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
          heading.id = id;
        }

        items.push({
          id: heading.id,
          text: heading.textContent || '',
          level: parseInt(heading.tagName.charAt(1))
        });
      });

      if (items.length > 0) {
        setTocItems(items);
      }
    };

    // Initial extraction
    extractHeadings();

    // Watch for DOM changes (SafeHtml renders asynchronously)
    if (!contentRef.current) return;

    const observer = new MutationObserver(() => {
      extractHeadings();
    });

    observer.observe(contentRef.current, {
      childList: true,
      subtree: true,
    });

    // Retry after a short delay to catch late renders
    const timer = setTimeout(extractHeadings, 200);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [contentRef]);

  useEffect(() => {
    if (tocItems.length === 0) return;

    // Intersection Observer for active heading detection
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 1.0
      }
    );

    tocItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [tocItems]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  if (tocItems.length === 0) return null;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-40 bg-slate-900 text-white p-4 rounded-full shadow-lg hover:bg-slate-700 transition-colors"
        aria-label="Inhaltsverzeichnis öffnen"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Table of Contents */}
      <aside
        className={`
          fixed lg:relative top-24 lg:top-0 right-0 z-50 lg:z-auto
          w-80 lg:w-full h-fit max-h-[calc(100vh-8rem)]
          bg-white rounded-xl shadow-lg lg:shadow-none border border-slate-200
          p-6 overflow-y-auto
          transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
          lg:mr-0 mr-4
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-epilogue font-semibold text-slate-900">
            Inhaltsverzeichnis
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-slate-400 hover:text-slate-600"
            aria-label="Schließen"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="space-y-2">
            {tocItems.map((item) => (
              <li
                key={item.id}
                style={{ paddingLeft: `${(item.level - 2) * 0.75}rem` }}
              >
                <button
                  onClick={() => handleClick(item.id)}
                  className={`
                    w-full text-left text-sm py-1.5 px-3 rounded-lg transition-all duration-200
                    ${activeId === item.id
                      ? 'bg-slate-900 text-white font-medium'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }
                  `}
                >
                  {item.text}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Progress Indicator */}
        <div className="mt-6 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Fortschritt</span>
            <span>
              {tocItems.findIndex(item => item.id === activeId) + 1} / {tocItems.length}
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5">
            <div
              className="bg-slate-900 h-1.5 rounded-full transition-all duration-300"
              style={{
                width: `${((tocItems.findIndex(item => item.id === activeId) + 1) / tocItems.length) * 100}%`
              }}
            />
          </div>
        </div>
      </aside>
    </>
  );
}
