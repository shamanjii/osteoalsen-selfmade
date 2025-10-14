'use client';

import { useRef } from 'react';
import SafeHtml from '@/components/SafeHtml';
import TableOfContents from '@/components/TableOfContents';
import ReadingProgressBar from '@/components/ReadingProgressBar';

interface BlogArticleContentProps {
  content: string;
}

export default function BlogArticleContent({ content }: BlogArticleContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

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

        {/* Table of Contents - Hidden on mobile, shown on large screens */}
        <div className="hidden lg:block flex-shrink-0">
          <TableOfContents contentRef={contentRef} />
        </div>

        {/* Mobile Table of Contents */}
        <div className="lg:hidden">
          <TableOfContents contentRef={contentRef} />
        </div>
      </div>
    </>
  );
}
