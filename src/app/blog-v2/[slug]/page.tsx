// Use ISR for performance with faster cache invalidation
export const revalidate = 60;

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllSlugs, getPostBySlug, getAllPosts } from "@/lib/posts";
import { detectCluster, getClusterEmoji, calculateReadTime } from "@/lib/cluster-detection";
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
        description: post.excerpt,
        keywords: post.keywords,
        alternates: {
            canonical: `https://www.osteoalsen.de/blog/${slug}`,
        },
        openGraph: {
            title: post.title,
            description: post.excerpt || '',
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

export default async function BlogPostV2({ params }: PageProps) {
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
                        href="/blog"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                        ← Zurück zum Blog
                    </Link>
                </div>
            </main>
        );
    }

    const allPosts = await getAllPosts();
    const faqs = extractFAQs(post.content);
    const cluster = detectCluster({ title: post.title, excerpt: post.excerpt, keywords: post.keywords });
    const clusterEmoji = getClusterEmoji(cluster);
    const readTime = calculateReadTime(post.content);

    return (
        <>
            <Breadcrumbs items={[
                { label: "Blog", href: "/blog" },
                { label: post.title }
            ]} />

            {/* Structured Data */}
            <BlogPostStructuredData
                title={post.title}
                description={post.excerpt}
                author="Joshua Alsen"
                datePublished={post.date}
                imageUrl={post.image}
                keywords={post.keywords}
            />

            {post.keywords?.some(keyword =>
                keyword.toLowerCase().includes('osteopathie') ||
                keyword.toLowerCase().includes('medizin') ||
                keyword.toLowerCase().includes('behandlung')
            ) && (
                <MedicalScholarlyArticle
                    title={post.title}
                    description={post.excerpt}
                    author="Joshua Alsen"
                    datePublished={post.date}
                    imageUrl={post.image}
                    keywords={post.keywords}
                />
            )}

            {faqs.length > 0 && <FAQPageStructuredData faqs={faqs} />}

            {/* Hero Section with Gradient */}
            <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }}></div>
                </div>

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16">
                    {/* Cluster Badge */}
                    <div className="mb-6">
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-white/95 backdrop-blur-sm text-slate-900 shadow-lg">
                            {clusterEmoji} {cluster}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-epilogue font-black mb-6 leading-tight max-w-4xl">
                        {post.title}
                    </h1>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 text-slate-200 text-sm mb-8">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <time dateTime={post.date}>
                                {new Date(post.date || '').toLocaleDateString('de-DE', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </time>
                        </div>
                        <span className="text-slate-400">•</span>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{readTime} Min. Lesezeit</span>
                        </div>
                        <span className="text-slate-400">•</span>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>Joshua Alsen</span>
                        </div>
                    </div>

                    {/* Improved Tags */}
                    {post.keywords && post.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {post.keywords.slice(0, 6).map((keyword, index) => {
                                const tagSlug = keyword.toLowerCase().replace(/\s+/g, '-');
                                return (
                                    <Link
                                        key={index}
                                        href={`/blog/tag/${tagSlug}`}
                                        className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white rounded-full text-xs font-semibold border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all shadow-sm"
                                    >
                                        <span className="text-teal-300">#</span>
                                        <span>{keyword}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* Main Content */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
                <div className="flex gap-8 items-start">
                    {/* Article Container */}
                    <BlogErrorBoundary>
                        <article className="flex-1">
                            {/* Quick Facts / TL;DR Box */}
                            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border-l-4 border-teal-600 rounded-r-xl p-6 mb-8 shadow-sm">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="font-epilogue text-lg font-bold text-slate-900 mb-2">
                                            Das Wichtigste in Kürze
                                        </h2>
                                        <p className="text-slate-700 leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Featured Image with Enhanced Styling */}
                            {post.image && (
                                <div className="mb-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-slate-200">
                                    <Image
                                        src={post.image}
                                        alt={post.alt || post.title}
                                        width={1200}
                                        height={600}
                                        className="w-full h-80 md:h-96 object-cover"
                                        priority
                                    />
                                </div>
                            )}

                            {/* Main Content */}
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 md:p-12">
                                <ArticleWithSidebar content={post.content} articleOnly>
                                    {post.keywords?.some(keyword =>
                                        keyword.toLowerCase().includes('osteopathie') ||
                                        keyword.toLowerCase().includes('medizin')
                                    ) && (
                                        <ScientificCredibilityBox />
                                    )}

                                    {post.keywords?.some(keyword =>
                                        keyword.toLowerCase().includes('evidenz') ||
                                        keyword.toLowerCase().includes('studie')
                                    ) && (
                                        <LiteratureSection />
                                    )}
                                </ArticleWithSidebar>

                                <footer className="mt-12 pt-8 border-t border-slate-200">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <Link
                                            href="/blog"
                                            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold transition-colors"
                                        >
                                            ← Zurück zur Übersicht
                                        </Link>
                                        <Link
                                            href="/terminbuchung"
                                            className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-4 rounded-xl hover:from-teal-700 hover:to-cyan-700 transition-all font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                        >
                                            📅 Jetzt Termin buchen
                                        </Link>
                                    </div>
                                </footer>
                            </div>
                        </article>
                    </BlogErrorBoundary>

                    {/* Enhanced Sidebar with Sticky CTA */}
                    <aside className="hidden lg:block w-72 flex-shrink-0 space-y-6">
                        {/* Sticky CTA Card */}
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-2xl shadow-xl p-6 text-white">
                                <div className="text-center mb-4">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-4xl">📅</span>
                                    </div>
                                    <h3 className="font-epilogue text-xl font-bold mb-2">
                                        Termin vereinbaren
                                    </h3>
                                    <p className="text-teal-50 text-sm">
                                        Jetzt online buchen und von osteopathischer Behandlung profitieren
                                    </p>
                                </div>
                                <Link
                                    href="/terminbuchung"
                                    className="block w-full bg-white text-teal-700 text-center px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-lg"
                                >
                                    Termin buchen
                                </Link>
                            </div>

                            {/* Table of Contents */}
                            <ArticleWithSidebar content={post.content} sidebarOnly />
                        </div>
                    </aside>
                </div>
            </div>

            {/* Social Share */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-8">
                <SocialShare
                    title={post.title}
                    url={`/blog/${post.slug}`}
                    excerpt={post.excerpt}
                />
            </div>

            {/* Related Articles */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <RelatedArticles currentSlug={post.slug} articles={allPosts} />
            </div>
        </>
    );
}
