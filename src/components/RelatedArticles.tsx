'use client';

import Link from "next/link";
import Image from "next/image";
import { detectCluster, getClusterEmoji, type ClusterName } from "@/lib/cluster-detection";

interface RelatedArticle {
  slug: string;
  title: string;
  excerpt: string;
  keywords?: string[];
  image?: string;
  alt?: string;
  date?: string;
  readingTime?: number;
}

interface RelatedArticlesProps {
  currentSlug: string;
  articles: RelatedArticle[];
  title?: string;
}

// Extract common keywords between two articles
const getCommonKeywords = (keywords1?: string[], keywords2?: string[]): number => {
  if (!keywords1 || !keywords2) return 0;

  const set1 = new Set(keywords1.map(k => k.toLowerCase()));
  const set2 = new Set(keywords2.map(k => k.toLowerCase()));

  let commonCount = 0;
  set1.forEach(keyword => {
    if (set2.has(keyword)) commonCount++;
  });

  return commonCount;
};

// Calculate title word overlap
const getTitleOverlap = (title1: string, title2: string): number => {
  const words1 = title1.toLowerCase().split(/\s+/).filter(w => w.length > 3); // Ignore short words
  const words2 = title2.toLowerCase().split(/\s+/).filter(w => w.length > 3);

  const set2 = new Set(words2);
  return words1.filter(word => set2.has(word)).length;
};

export default function RelatedArticles({
  currentSlug,
  articles,
  title = "Verwandte Artikel"
}: RelatedArticlesProps) {
  // Find current article
  const currentArticle = articles.find(a => a.slug === currentSlug);
  if (!currentArticle) return null;

  const currentCluster = detectCluster(currentArticle);

  // Intelligent related article selection with improved scoring
  const relatedArticles = articles
    .filter(article => article.slug !== currentSlug)
    .map(article => {
      let score = 0;
      const articleCluster = detectCluster(article);

      // 1. Same cluster = +5 points (most important!)
      if (articleCluster === currentCluster && currentCluster !== 'Osteopathie Allgemein') {
        score += 5;
      }

      // 2. Common keywords = +2 points each
      const commonKeywords = getCommonKeywords(currentArticle.keywords, article.keywords);
      score += commonKeywords * 2;

      // 3. Title word overlap = +1 point each
      const titleOverlap = getTitleOverlap(currentArticle.title, article.title);
      score += titleOverlap;

      return {
        article,
        score,
        cluster: articleCluster,
        readTime: article.readingTime || 3 // Use actual reading time, fallback to 3
      };
    })
    .sort((a, b) => b.score - a.score) // Sort by relevance
    .slice(0, 3) // Take top 3
    .filter(item => item.score > 0); // Only show if there's some relevance

  if (!relatedArticles.length) return null;

  return (
    <section className="mt-12 py-12 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl">
      <div className="px-6 md:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-epilogue font-bold text-slate-900 mb-3">
            {title}
          </h2>
          <p className="text-slate-600 text-base max-w-2xl mx-auto">
            Weitere evidenzbasierte Artikel aus dem <strong>{currentCluster}</strong> Cluster
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {relatedArticles.map((item) => (
            <Link
              key={item.article.slug}
              href={`/blog/${item.article.slug}`}
              className="group"
            >
              <article className="relative bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-teal-500 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                {/* Image */}
                {item.article.image && (
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={item.article.image}
                      alt={item.article.alt || item.article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Cluster Badge Overlay */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/95 backdrop-blur-sm text-slate-800 shadow-sm">
                        {getClusterEmoji(item.cluster as ClusterName)} {item.cluster}
                      </span>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Metadata */}
                  {item.readTime && (
                    <div className="flex items-center gap-1 mb-3 text-xs text-slate-500">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {item.readTime} Min. Lesezeit
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-lg font-epilogue font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-teal-700 transition-colors leading-tight">
                    {item.article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4 flex-1">
                    {item.article.excerpt}
                  </p>

                  {/* Read more link */}
                  <div className="flex items-center text-sm font-semibold text-teal-600 group-hover:text-teal-700 transition-colors mt-auto">
                    <span>Weiterlesen</span>
                    <svg className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Call-to-action */}
        <div className="mt-8 p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-epilogue font-bold text-slate-900 mb-2">
                Alle {articles.length} Artikel durchsuchen
              </h3>
              <p className="text-slate-600 text-sm">
                Umfassendes Wissen über osteopathische Behandlungsmethoden und ganzheitliche Gesundheit
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-teal-600 text-white text-sm font-semibold rounded-lg hover:bg-teal-700 transition-colors shadow-sm hover:shadow-md whitespace-nowrap"
            >
              Blog-Übersicht
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}