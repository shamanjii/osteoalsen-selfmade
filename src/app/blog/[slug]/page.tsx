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
import BlogArticleContent from "./BlogArticleContent";

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

            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">

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

            <BlogErrorBoundary>
                <article className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
                    <header className="mb-6">
                        <h1 className="text-3xl font-epilogue font-bold mb-2 text-slate-900">{post.title}</h1>
                        <div className="text-slate-500 text-sm">
                            Veröffentlicht am {new Date(post.date || '').toLocaleDateString('de-DE', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </div>
                    </header>

                    {post.image && (
                        <div className="mb-6">
                            <Image
                                src={post.image}
                                alt={post.alt || post.title}
                                width={800}
                                height={400}
                                className="w-full h-64 object-cover rounded-lg"
                            />
                        </div>
                    )}

                    <BlogArticleContent content={post.content} />

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

                    <footer className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-center">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                        >
                            ← Zurück zur Übersicht
                        </Link>
                    </footer>
                </article>
            </BlogErrorBoundary>

            {/* Social Share Buttons */}
            <div className="mt-8">
                <SocialShare
                    title={post.title}
                    url={`/blog/${post.slug}`}
                    excerpt={post.excerpt}
                />
            </div>

            {/* Related Articles */}
            <RelatedArticles currentSlug={post.slug} articles={allPosts} />
        </div>
        </>
    );
}
