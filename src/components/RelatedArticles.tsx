'use client';

import Link from "next/link";

interface RelatedArticle {
  slug: string;
  title: string;
  excerpt: string;
  specialty?: string;
  readTime?: number;
}

interface RelatedArticlesProps {
  currentSlug: string;
  articles: RelatedArticle[];
  title?: string;
}

export default function RelatedArticles({
  currentSlug,
  articles,
  title = "Verwandte Artikel"
}: RelatedArticlesProps) {
  // Filter out current article and limit to 3
  const relatedArticles = articles
    .filter(article => article.slug !== currentSlug)
    .slice(0, 3);

  if (!relatedArticles.length) return null;

  return (
    <section className="mt-8">
      <div className="mb-6">
        <h2 className="text-2xl font-epilogue font-semibold text-slate-900 mb-2">
          {title}
        </h2>
        <p className="text-slate-600 text-sm">
          Weitere evidenzbasierte Artikel zu osteopathischen Behandlungsmethoden
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        {relatedArticles.map((article, index) => (
          <article
            key={article.slug}
            className="group relative bg-white rounded-xl border border-slate-200 p-6 hover:border-slate-300 hover:shadow-sm transition-all duration-200"
          >
            {/* Header */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                {article.specialty && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                    🎯 {article.specialty}
                  </span>
                )}
                {article.readTime && (
                  <span className="text-xs text-slate-500">
                    ⏱️ {article.readTime} Min.
                  </span>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-3">
              <h3 className="text-lg font-epilogue font-semibold text-slate-900 group-hover:text-slate-700 transition-colors line-clamp-2">
                <Link href={`/blog/${article.slug}`} className="stretched-link">
                  {article.title}
                </Link>
              </h3>

              <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                {article.excerpt}
              </p>

              {/* Read more indication */}
              <div className="flex items-center text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                <span>Artikel lesen</span>
                <svg className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Article number indicator */}
            <div className="absolute top-4 right-4 w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-sm font-medium text-slate-600 group-hover:bg-slate-200 transition-colors">
              {index + 1}
            </div>
          </article>
        ))}
      </div>

      {/* Call-to-action */}
      <div className="mt-6 p-6 bg-slate-50 border border-slate-200 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-epilogue font-semibold text-slate-900 mb-2">
              Alle Artikel entdecken
            </h3>
            <p className="text-slate-700 text-sm">
              Umfassendes Wissen über osteopathische Behandlungsmethoden und ganzheitliche Gesundheit
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors"
          >
            Blog übersicht
            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}