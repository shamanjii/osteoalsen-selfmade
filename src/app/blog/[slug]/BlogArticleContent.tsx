'use client';

import { useRef, useEffect, useState } from 'react';
import SafeHtml from '@/components/SafeHtml';
import TableOfContents from '@/components/TableOfContents';
import ReadingProgressBar from '@/components/ReadingProgressBar';

interface BlogArticleContentProps {
  content: string;
}

export default function BlogArticleContent({ content }: BlogArticleContentProps) {
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

      {/* Layout: Article (left/center) + ToC Sidebar (right, desktop only) */}
      <div className="flex gap-8 items-start -mx-6 md:-mx-8">
        {/* Main Content - takes most space */}
        <div className="flex-1 min-w-0 px-6 md:px-8">
          <div ref={contentRef} className="prose prose-lg max-w-none">
            <SafeHtml html={content} type="blog" />
          </div>
        </div>

        {/* Table of Contents Sidebar - Desktop only, sticky */}
        {isContentReady && (
          <aside className="hidden lg:block w-72 flex-shrink-0 pr-6">
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
