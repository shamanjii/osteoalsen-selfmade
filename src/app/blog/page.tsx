import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import BlogClient from "./components/BlogClient";
import BlogErrorBoundary from "@/components/BlogErrorBoundary";
import { prisma } from "@/lib/prisma";

async function getCMSPosts() {
    try {
        const posts = await prisma.post.findMany({
            where: {
                published: true,
                status: 'PUBLISHED'
            },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true
                    }
                },
                category: {
                    select: {
                        name: true,
                        slug: true
                    }
                },
                tags: {
                    include: {
                        tag: {
                            select: {
                                name: true,
                                slug: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                publishedAt: 'desc'
            }
        });

        return posts.map(post => ({
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt || '',
            date: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
            keywords: post.keywords ? post.keywords.split(',').map(k => k.trim()) : [],
            image: post.coverImage || '',
            alt: post.title,
            category: post.category?.slug || 'osteopathie',
            source: 'cms' as const,
            content: post.content,
            author: post.author.name || post.author.email,
            tags: post.tags.map(pt => pt.tag.name)
        }));
    } catch (error) {
        console.error('Error fetching CMS posts:', error);
        return [];
    }
}

export default async function BlogIndexPage() {
    const [markdownPosts, cmsPosts] = await Promise.all([
        getAllPosts(),
        getCMSPosts()
    ]);

    // Combine and process posts for client component
    const markdownProcessedPosts = markdownPosts.map(post => ({
        ...post,
        source: 'markdown' as const
    }));

    // Combine CMS and markdown posts
    const allPosts = [...cmsPosts, ...markdownProcessedPosts];

    // Sort all posts by date (newest first)
    allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const processedPosts = allPosts.map(post => {
        // Extract category from keywords
        const extractCategory = (keywords?: string[]): string => {
            if (!keywords || keywords.length === 0) return 'osteopathie';
            const keywordStr = keywords.join(' ').toLowerCase();

            if (keywordStr.includes('rückenschmerzen') || keywordStr.includes('muskel')) return 'rueckenschmerzen';
            if (keywordStr.includes('kopfschmerzen') || keywordStr.includes('migräne')) return 'kopfschmerzen';
            if (keywordStr.includes('sport') || keywordStr.includes('verletzung')) return 'sportverletzungen';
            if (keywordStr.includes('verdauung') || keywordStr.includes('gesundheit')) return 'gesundheitstipps';

            return 'osteopathie';
        };

        return {
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            date: post.date,
            keywords: post.keywords,
            image: post.image,
            alt: post.alt,
            category: extractCategory(post.keywords)
        };
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Breadcrumb */}
            <nav className="bg-white border-b border-slate-200 py-3">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
                        <span>→</span>
                        <span className="text-slate-900 font-medium">Blog</span>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-20">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
                    <h1 className="font-epilogue text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                        Osteopathie Blog
                    </h1>
                    <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed">
                        Entdecken Sie evidenzbasierte Fachartikel zu Osteopathie, ganzheitlicher Gesundheit und bewährten Behandlungsmethoden
                    </p>
                </div>
            </section>

            {/* Client Component for Interactive Features */}
            <BlogErrorBoundary>
                <BlogClient posts={processedPosts} />
            </BlogErrorBoundary>
        </div>
    );
}