'use client';

import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import Link from 'next/link';

interface BlogErrorBoundaryProps {
  children: React.ReactNode;
}

const BlogErrorFallback = () => (
  <div className="min-h-[400px] flex items-center justify-center bg-white rounded-xl shadow-sm border border-slate-200">
    <div className="text-center p-8 max-w-lg">
      <div className="text-6xl mb-6 opacity-50">📝</div>
      <h3 className="text-2xl font-epilogue font-semibold text-slate-900 mb-4">
        Blog-Inhalt konnte nicht geladen werden
      </h3>
      <p className="text-slate-600 mb-6 leading-relaxed">
        Es tut uns leid, aber beim Laden der Blog-Inhalte ist ein Fehler aufgetreten.
        Dies könnte an einem temporären Problem liegen.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium"
        >
          Erneut versuchen
        </button>
        <Link
          href="/"
          className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
        >
          Zur Startseite
        </Link>
      </div>
    </div>
  </div>
);

export default function BlogErrorBoundary({ children }: BlogErrorBoundaryProps) {
  return (
    <ErrorBoundary
      fallback={<BlogErrorFallback />}
      onError={(error) => {
        console.error('Blog Error:', error);
        // Could send to analytics service
        // analytics.track('Blog Error', { error: error.message });
      }}
    >
      {children}
    </ErrorBoundary>
  );
}