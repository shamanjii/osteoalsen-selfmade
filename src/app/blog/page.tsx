// Force dynamic rendering to avoid prerender errors
export const dynamic = 'force-dynamic';

import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import BlogClient from "./components/BlogClient";
import BlogErrorBoundary from "@/components/BlogErrorBoundary";
import Breadcrumbs from "@/components/Breadcrumbs";

async function getCMSPosts() {
    try {
        // Fetch from CMS API instead of direct database access
        const response = await fetch('https://cms.osteoalsen.de/api/public/posts', {
            next: { revalidate: 0 } // No caching for debugging
        });

        if (!response.ok) {
            console.warn('CMS API not available, falling back to empty array');
            return [];
        }

        const data = await response.json();

        if (data.success && data.data) {
            console.log(`Loaded ${data.data.length} posts from CMS API:`, data.data.map(p => ({ title: p.title, slug: p.slug, status: p.status })));
            return data.data;
        }

        return [];
    } catch (error) {
        console.error('Error fetching CMS posts from API:', error);
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

    // Process CMS posts to match expected format
    const cmsProcessedPosts = cmsPosts.map(post => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        date: post.publishedAt || post.createdAt,
        keywords: Array.isArray(post.keywords) ? post.keywords : (typeof post.keywords === 'string' ? post.keywords.split(',').map(k => k.trim()) : []),
        image: post.image || post.coverImage, // Use image from API, fallback to coverImage
        alt: post.altText || post.alt || post.title,
        category: post.category?.slug || 'osteopathie', // Use category from CMS if available
        source: 'cms' as const
    }));

    // Combine CMS and markdown posts
    const allPosts = [...cmsProcessedPosts, ...markdownProcessedPosts];

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
            image: post.image, // Already mapped correctly above
            alt: post.alt || post.title,
            category: post.category || extractCategory(post.keywords) // Use existing category if available, otherwise extract from keywords
        };
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <Breadcrumbs items={[{ label: "Blog" }]} />

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