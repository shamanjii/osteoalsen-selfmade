// Use ISR (Incremental Static Regeneration) for performance
export const revalidate = 3600; // Revalidate every hour
export const dynamicParams = true; // Allow dynamic tag generation

import type { Metadata } from "next";
import Link from "next/link";
import BlogClient from "../../components/BlogClient";
import BlogErrorBoundary from "@/components/BlogErrorBoundary";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAllPosts } from "@/lib/posts";
import { calculateReadingTime } from "@/lib/utils";

interface PageProps {
    params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const tagName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return {
        title: `#${tagName} - Artikel | OsteoAlsen Blog`,
        description: `Alle Artikel zum Thema ${tagName}. Evidenzbasierte Fachartikel von Osteopath Joshua Alsen aus Hamburg.`,
        keywords: [tagName, 'Osteopathie', 'Hamburg'],
        openGraph: {
            title: `#${tagName} - Artikel | OsteoAlsen Blog`,
            description: `Alle Artikel zum Thema ${tagName}`,
            type: 'website',
            url: `/blog/tag/${slug}`,
        },
    };
}

export default async function TagPage({ params }: PageProps) {
    const { slug } = await params;
    const tagName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    // Fetch all posts and filter by tag
    const allPosts = await getAllPosts();

    const processedPosts = allPosts
        .map(post => {
            // Extract category from keywords as fallback if CMS category not set
            const extractCategory = (keywords?: string[], cmsCategory?: string): string => {
                if (cmsCategory) return cmsCategory;

                if (!keywords || keywords.length === 0) return 'osteopathie';
                const keywordStr = keywords.join(' ').toLowerCase();

                if (keywordStr.includes('rückenschmerzen') || keywordStr.includes('muskel')) return 'rueckenschmerzen';
                if (keywordStr.includes('kopfschmerzen') || keywordStr.includes('migräne')) return 'kopfschmerzen';
                if (keywordStr.includes('sport') || keywordStr.includes('verletzung')) return 'sportverletzungen';
                if (keywordStr.includes('verdauung') || keywordStr.includes('darm')) return 'verdauung';
                if (keywordStr.includes('gesundheit') || keywordStr.includes('tipps')) return 'gesundheitstipps';

                return 'osteopathie';
            };

            return {
                slug: post.slug,
                title: post.title,
                excerpt: post.excerpt,
                date: post.date,
                keywords: post.keywords,
                image: post.image,
                alt: post.alt || post.title,
                category: extractCategory(post.keywords, post.category),
                readingTime: calculateReadingTime(post.content)
            };
        })
        .filter(post =>
            post.keywords?.some(keyword =>
                keyword.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()
            )
        );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <Breadcrumbs
                items={[
                    { label: "Blog", href: "/blog" },
                    { label: `#${tagName}` }
                ]}
            />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-20">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
                    <div className="text-6xl mb-4">#️⃣</div>
                    <h1 className="font-epilogue text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                        #{tagName}
                    </h1>
                    <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed mb-8">
                        Alle Artikel zum Thema <strong>{tagName}</strong>
                    </p>
                    <div className="flex items-center justify-center gap-4 text-sm text-slate-300">
                        <span className="bg-slate-700/50 px-4 py-2 rounded-lg">
                            📄 {processedPosts.length} {processedPosts.length === 1 ? 'Artikel' : 'Artikel'}
                        </span>
                        <Link
                            href="/blog/"
                            className="bg-slate-700/50 px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
                        >
                            ← Alle Artikel
                        </Link>
                    </div>
                </div>
            </section>

            {/* Client Component for Interactive Features */}
            {processedPosts.length > 0 ? (
                <BlogErrorBoundary>
                    <BlogClient posts={processedPosts} />
                </BlogErrorBoundary>
            ) : (
                <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16">
                    <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-300">
                        <div className="text-6xl mb-4 opacity-50">🔍</div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">Keine Artikel gefunden</h3>
                        <p className="text-slate-600 mb-6">
                            Zu diesem Tag gibt es derzeit keine Artikel.
                        </p>
                        <Link
                            href="/blog/"
                            className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition-colors"
                        >
                            ← Zurück zum Blog
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
