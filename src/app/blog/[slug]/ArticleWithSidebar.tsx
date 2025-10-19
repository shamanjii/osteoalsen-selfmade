'use client';

import { useRef, useEffect, useState } from 'react';
import SafeHtml from '@/components/SafeHtml';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import TableOfContents from '@/components/TableOfContents';

interface ArticleWithSidebarProps {
  content: string;
  children?: React.ReactNode;
  articleOnly?: boolean; // Only render article content
  sidebarOnly?: boolean; // Only render ToC sidebar
}

export default function ArticleWithSidebar({
  content,
  children,
  articleOnly = false,
  sidebarOnly = false
}: ArticleWithSidebarProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isContentReady, setIsContentReady] = useState(false);

  // Wait for SafeHtml to render the content
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsContentReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [content]);

  // Sidebar only mode - just render ToC
  if (sidebarOnly) {
    useEffect(() => {
      // Find the content element by ID
      const findContent = () => {
        const elem = document.getElementById('article-content');
        if (elem && contentRef.current !== elem) {
          (contentRef as any).current = elem;
          setIsContentReady(true);
        }
      };

      findContent();
      const interval = setInterval(findContent, 100);
      setTimeout(() => clearInterval(interval), 2000);

      return () => clearInterval(interval);
    }, []);

    return isContentReady && contentRef.current ? (
      <>
        {/* Desktop Sidebar - wrapper is in page.tsx */}
        <div className="hidden lg:block">
          <TableOfContents contentRef={contentRef} isDesktopSidebar />
        </div>

        {/* Mobile Floating Button */}
        <div className="lg:hidden">
          <TableOfContents contentRef={contentRef} />
        </div>
      </>
    ) : null;
  }

  // Article only mode - just render content
  if (articleOnly) {
    return (
      <>
        {/* Reading Progress Bar */}
        <ReadingProgressBar contentRef={contentRef} />

        <div id="article-content" ref={contentRef} className="max-w-none">
          <SafeHtml html={content} type="blog" />
        </div>

        {/* Additional content (boxes, sections, etc.) */}
        {children}
      </>
    );
  }

  // Full mode - render everything (fallback)
  return (
    <>
      <ReadingProgressBar contentRef={contentRef} />
      <div className="flex gap-8 items-start">
        <div className="flex-1 min-w-0">
          <div ref={contentRef} className="max-w-none">
            <SafeHtml html={content} type="blog" />
          </div>
          {children}
        </div>
        {isContentReady && (
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <TableOfContents contentRef={contentRef} isDesktopSidebar />
          </aside>
        )}
      </div>
      {isContentReady && (
        <div className="lg:hidden">
          <TableOfContents contentRef={contentRef} />
        </div>
      )}
    </>
  );
}
