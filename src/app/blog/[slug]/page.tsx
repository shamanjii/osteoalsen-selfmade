// Use ISR for performance
export const revalidate = 3600; // Revalidate every hour

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllSlugs, getPostBySlug, getAllPosts } from "@/lib/posts-cms";
import BlogErrorBoundary from "@/components/BlogErrorBoundary";
import { BlogPostStructuredData, MedicalScholarlyArticle } from "@/components/StructuredData";
import Breadcrumbs from "@/components/Breadcrumbs";
import ScientificCredibilityBox from "@/components/ScientificCredibilityBox";
import LiteratureSection from "@/components/LiteratureSection";
import RelatedArticles from "@/components/RelatedArticles";
import SocialShare from "@/components/SocialShare";
import ArticleWithSidebar from "./ArticleWithSidebar";

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
        openGraph: {
            title: post.title,
            description: post.excerpt || '',
            type: 'article',
            images: post.image ? [post.image] : [],
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

    return (
        <>
            <Breadcrumbs items={[
                { label: "Blog", href: "/blog" },
                { label: post.title }
            ]} />

            {/* Structured Data for Blog Post */}
            <BlogPostStructuredData
                title={post.title}
                description={post.excerpt}
                author="Joshua Alsen"
                datePublished={post.date}
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
                    title={post.title}
                    description={post.excerpt}
                    author="Joshua Alsen"
                    datePublished={post.date}
                    imageUrl={post.image}
                    keywords={post.keywords}
                />
            )}

            {/* Main Layout: Article + Sidebar */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
                <div className="flex gap-8 items-start">
                    {/* Article Container - Left side */}
                    <BlogErrorBoundary>
                        <article className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 p-8 md:p-12">
                    <header className="mb-8 pb-6 border-b border-slate-200">
                        <h1 className="text-4xl md:text-5xl font-epilogue font-bold mb-4 text-slate-900 leading-tight">{post.title}</h1>
                        <div className="flex items-center gap-4 text-slate-600 text-sm">
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
                    </header>

                    {post.image && (
                        <div className="mb-10 -mx-4 md:-mx-8">
                            <Image
                                src={post.image}
                                alt={post.alt || post.title}
                                width={1200}
                                height={600}
                                className="w-full h-80 md:h-96 object-cover rounded-lg"
                                priority
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

                    <footer className="mt-12 pt-8 border-t border-slate-200">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium transition-colors"
                            >
                                ← Zurück zur Übersicht
                            </Link>
                            <Link
                                href="/terminbuchung"
                                className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-all font-semibold shadow-sm hover:shadow-md"
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
