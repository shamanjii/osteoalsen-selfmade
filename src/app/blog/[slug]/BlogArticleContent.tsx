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

      <div className="relative flex gap-8">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div ref={contentRef} className="prose prose-lg max-w-none">
            <SafeHtml html={content} type="blog" />
          </div>
        </div>

        {/* Table of Contents - Only render when content is ready */}
        {isContentReady && (
          <>
            {/* Desktop ToC */}
            <div className="hidden lg:block flex-shrink-0">
              <TableOfContents contentRef={contentRef} />
            </div>

            {/* Mobile ToC */}
            <div className="lg:hidden">
              <TableOfContents contentRef={contentRef} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
