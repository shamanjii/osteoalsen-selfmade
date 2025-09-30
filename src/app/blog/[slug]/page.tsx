// Force dynamic rendering to avoid prerender errors
export const dynamic = 'force-dynamic';

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllSlugs, getPostBySlug, getAllPosts } from "@/lib/posts";
import SafeHtml from "@/components/SafeHtml";
import BlogErrorBoundary from "@/components/BlogErrorBoundary";
import { BlogPostStructuredData, MedicalScholarlyArticle } from "@/components/StructuredData";
import ScientificCredibilityBox from "@/components/ScientificCredibilityBox";
import LiteratureSection from "@/components/LiteratureSection";
import RelatedArticles from "@/components/RelatedArticles";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Function to get CMS post by slug
async function getCMSPostBySlug(slug: string) {
    try {
        const response = await fetch(`https://cms.osteoalsen.de/api/public/posts/${slug}`, {
            next: { revalidate: 0 }
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return data.success ? data.data : null;
    } catch (error) {
        console.error('Error fetching CMS post:', error);
        return null;
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;

    // Try markdown first
    const markdownPost = await getPostBySlug(slug);
    if (markdownPost) {
        return {
            title: `${markdownPost.title} | Osteoalsen Blog`,
            description: markdownPost.excerpt,
            keywords: markdownPost.keywords,
            openGraph: {
                title: markdownPost.title,
                description: markdownPost.excerpt || '',
                type: 'article',
                images: markdownPost.image ? [markdownPost.image] : [],
            },
        };
    }

    // Try CMS post
    const cmsPost = await getCMSPostBySlug(slug);
    if (cmsPost) {
        return {
            title: `${cmsPost.title} | Osteoalsen Blog`,
            description: cmsPost.excerpt || '',
            openGraph: {
                title: cmsPost.title,
                description: cmsPost.excerpt || '',
                type: 'article',
                images: cmsPost.image ? [cmsPost.image] : [],
            },
        };
    }

    return {
        title: 'Post nicht gefunden | Osteoalsen Blog'
    };
}

export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPost({ params }: PageProps) {
    const { slug } = await params;

    // Try to get markdown post first
    let post = await getPostBySlug(slug);
    let isCMSPost = false;

    // If not found, try CMS post
    if (!post) {
        const cmsPost = await getCMSPostBySlug(slug);
        if (cmsPost) {
            // Process markdown content to HTML for CMS posts
            let processedContent = '';
            try {
                const processed = await remark()
                    .use(remarkGfm)
                    .use(remarkHtml)
                    .process(cmsPost.content || '');
                processedContent = String(processed);
            } catch (error) {
                console.error('Error processing CMS markdown:', error);
                processedContent = cmsPost.content || '';
            }

            post = {
                title: cmsPost.title || 'Untitled',
                excerpt: cmsPost.excerpt || '',
                content: processedContent, // ✅ Now processed HTML
                date: cmsPost.publishedAt || cmsPost.createdAt || new Date().toISOString(),
                keywords: Array.isArray(cmsPost.keywords) ? cmsPost.keywords : (typeof cmsPost.keywords === 'string' ? cmsPost.keywords.split(',').map(k => k.trim()) : []),
                image: cmsPost.image || '',
                alt: cmsPost.title || 'Article image',
                slug: cmsPost.slug || slug
            };
            isCMSPost = true;
        }
    }

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
        <main className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
            {/* Breadcrumb */}
            <nav className="mb-8">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
                    <span>→</span>
                    <Link href="/blog" className="hover:text-slate-900 transition-colors">Blog</Link>
                    <span>→</span>
                    <span className="text-slate-900 font-medium truncate">{post.title}</span>
                </div>
            </nav>

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
                            Veröffentlicht am {new Date(post.date).toLocaleDateString('de-DE', {
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

                    <div className="prose prose-lg max-w-none">
                        {isCMSPost ? (
                            <SafeHtml html={post.content} type="blog" />
                        ) : (
                            <SafeHtml html={post.content} type="blog" />
                        )}
                    </div>

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

            {/* Related Articles */}
            <RelatedArticles currentSlug={post.slug} articles={allPosts} />
        </main>
    );
}