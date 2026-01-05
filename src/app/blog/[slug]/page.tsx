// Use ISR for performance with cache optimization
export const revalidate = 3600; // Revalidate every hour (reduced from 60s to save CPU)
// Force rebuild: 2025-12-11 17:45

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllSlugs, getPostBySlug, getAllPosts } from "@/lib/posts";
import BlogErrorBoundary from "@/components/BlogErrorBoundary";
import { BlogPostStructuredData, MedicalScholarlyArticle, FAQPageStructuredData } from "@/components/StructuredData";
import Breadcrumbs from "@/components/Breadcrumbs";
import ScientificCredibilityBox from "@/components/ScientificCredibilityBox";
import LiteratureSection from "@/components/LiteratureSection";
import RelatedArticles from "@/components/RelatedArticles";
import SocialShare from "@/components/SocialShare";
import ArticleWithSidebar from "./ArticleWithSidebar";
import { extractFAQs } from "@/lib/utils";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Post nicht gefunden | Osteoalsen Blog'
        };
    }

    return {
        title: `${post.title} | Osteoalsen Blog`,
        description: post.metaDescription || post.excerpt,
        keywords: post.keywords,
        alternates: {
            canonical: `https://www.osteoalsen.de/blog/${slug}/`,
        },
        openGraph: {
            title: post.title,
            description: post.metaDescription || post.excerpt || '',
            type: 'article',
            images: post.image ? [post.image] : [],
            url: `https://www.osteoalsen.de/blog/${slug}`,
        },
    };
}

export async function generateStaticParams() {
    const slugs = await getAllSlugs();
    return slugs.map((slug) => ({
        slug,
    }));
}

export default async function BlogPost({ params }: PageProps) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return (
            <main className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-slate-900 mb-4">Artikel nicht gefunden</h1>
                    <p className="text-slate-600 mb-6">
                        Der gesuchte Artikel konnte nicht gefunden werden.
                    </p>
                    <Link
                        href="/blog/"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                        ← Zurück zum Blog
                    </Link>
                </div>
            </main>
        );
    }

    const allPosts = await getAllPosts();

    // Extract FAQs from content for structured data
    const faqs = extractFAQs(post.content);

    return (
        <>
            <Breadcrumbs items={[
                { label: "Blog", href: "/blog" },
                { label: post.title }
            ]} />

            {/* Structured Data for Blog Post */}
            <BlogPostStructuredData
                headline={post.title}
                description={post.metaDescription || post.excerpt || ''}
                author="Joshua Alsen"
                datePublished={post.date || new Date().toISOString()}
                url={`https://www.osteoalsen.de/blog/${slug}`}
                imageUrl={post.image}
                keywords={post.keywords}
            />

            {/* Medical Article Structured Data */}
            {post.keywords?.some(keyword =>
                keyword.toLowerCase().includes('osteopathie') ||
                keyword.toLowerCase().includes('medizin') ||
                keyword.toLowerCase().includes('behandlung')
            ) && (
                <MedicalScholarlyArticle
                    headline={post.title}
                    description={post.metaDescription || post.excerpt || ''}
                    author="Joshua Alsen"
                    datePublished={post.date || new Date().toISOString()}
                    url={`https://www.osteoalsen.de/blog/${slug}`}
                    imageUrl={post.image}
                    keywords={post.keywords}
                    specialty="Osteopathic Medicine"
                    sourceCount={5}
                />
            )}

            {/* FAQ Structured Data */}
            {faqs.length > 0 && <FAQPageStructuredData faqs={faqs} />}

            {/* Main Layout: Article + Sidebar */}
            <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-12">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
                    {/* Article Container - Left side */}
                    <BlogErrorBoundary>
                        <article className="flex-1 w-full bg-white rounded-lg sm:rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 md:p-8 lg:p-12">
                    <header className="mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-slate-200">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-epilogue font-bold mb-3 sm:mb-4 text-slate-900 leading-tight">{post.title}</h1>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-slate-600 text-xs sm:text-sm mb-3 sm:mb-4">
                            <time dateTime={post.date}>
                                Veröffentlicht am {new Date(post.date || '').toLocaleDateString('de-DE', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </time>
                            <span className="text-slate-400">•</span>
                            <span>Von Joshua Alsen</span>
                        </div>

                        {/* Tags - Compact on mobile, touch-optimized on larger screens */}
                        {post.keywords && post.keywords.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                {post.keywords.slice(0, 6).map((keyword, index) => {
                                    const slug = keyword.toLowerCase().replace(/\s+/g, '-');
                                    return (
                                        <Link
                                            key={index}
                                            href={`/blog/tag/${slug}`}
                                            className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-2 bg-slate-100 text-slate-700 rounded-full text-xs font-medium hover:bg-slate-200 hover:text-slate-900 transition-colors touch-manipulation active:scale-95"
                                        >
                                            <span className="text-slate-500">#</span>
                                            <span>{keyword}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </header>

                    {post.image && (
                        <div className="mb-6 sm:mb-8 md:mb-10 -mx-4 sm:-mx-6 md:-mx-8">
                            <Image
                                src={post.image}
                                alt={post.alt || post.title}
                                width={1200}
                                height={600}
                                className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-none sm:rounded-lg"
                                priority
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 85vw, 1200px"
                            />
                        </div>
                    )}

                    <ArticleWithSidebar content={post.content} articleOnly>
                        {/* Scientific Credibility Box for medical topics */}
                        {post.keywords?.some(keyword =>
                            keyword.toLowerCase().includes('osteopathie') ||
                            keyword.toLowerCase().includes('medizin')
                        ) && (
                            <ScientificCredibilityBox />
                        )}

                        {/* Literature Section for evidence-based articles */}
                        {post.keywords?.some(keyword =>
                            keyword.toLowerCase().includes('evidenz') ||
                            keyword.toLowerCase().includes('studie')
                        ) && (
                            <LiteratureSection />
                        )}
                    </ArticleWithSidebar>

                    <footer className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-200">
                        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4">
                            <Link
                                href="/blog/"
                                className="inline-flex items-center justify-center gap-2 text-teal-600 hover:text-teal-700 font-medium transition-colors min-h-[48px] px-4 py-3 touch-manipulation active:scale-95"
                            >
                                ← Zurück zur Übersicht
                            </Link>
                            <Link
                                href="/terminbuchung/"
                                className="inline-flex items-center justify-center gap-2 bg-teal-600 text-white px-6 py-3.5 min-h-[48px] rounded-lg hover:bg-teal-700 transition-all font-semibold shadow-sm hover:shadow-md touch-manipulation active:scale-95"
                            >
                                📅 Termin buchen
                            </Link>
                        </div>
                        </footer>
                    </article>
                </BlogErrorBoundary>

                {/* ToC Sidebar - Right side, separate from article, sticky */}
                <aside className="toc-sidebar-sticky hidden lg:block w-72 flex-shrink-0">
                    <ArticleWithSidebar content={post.content} sidebarOnly />
                </aside>
                </div>
            </div>

            {/* Social Share Buttons */}
            <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6 mt-6 sm:mt-8">
                <SocialShare
                    title={post.title}
                    url={`/blog/${post.slug}`}
                    excerpt={post.excerpt}
                />
            </div>

            {/* Related Articles */}
            <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
                <RelatedArticles currentSlug={post.slug} articles={allPosts} />
            </div>
        </>
    );
}
