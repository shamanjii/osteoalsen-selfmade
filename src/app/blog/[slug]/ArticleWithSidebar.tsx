'use client';

import { useRef, useEffect, useState } from 'react';
import SafeHtml from '@/components/SafeHtml';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import TableOfContents from '@/components/TableOfContents';

interface ArticleWithSidebarProps {
  content: string;
  children?: React.ReactNode; // For ScientificCredibilityBox, LiteratureSection, etc.
}

export default function ArticleWithSidebar({ content, children }: ArticleWithSidebarProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isContentReady, setIsContentReady] = useState(false);

  // Wait for SafeHtml to render the content
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsContentReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [content]);

  return (
    <>
      {/* Reading Progress Bar */}
      <ReadingProgressBar contentRef={contentRef} />

      {/* Layout: Article + ToC Sidebar */}
      <div className="flex gap-8 items-start">
        {/* Main Article Content - Left side */}
        <div className="flex-1 min-w-0">
          <div ref={contentRef} className="prose prose-lg max-w-none">
            <SafeHtml html={content} type="blog" />
          </div>

          {/* Additional content (boxes, sections, etc.) */}
          {children}
        </div>

        {/* Table of Contents Sidebar - Right side, desktop only, sticky */}
        {isContentReady && (
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <TableOfContents contentRef={contentRef} isDesktopSidebar />
          </aside>
        )}
      </div>

      {/* Table of Contents - Mobile floating button */}
      {isContentReady && (
        <div className="lg:hidden">
          <TableOfContents contentRef={contentRef} />
        </div>
      )}
    </>
  );
}
