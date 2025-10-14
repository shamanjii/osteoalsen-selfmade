// Use ISR (Incremental Static Regeneration) for performance
export const revalidate = 3600; // Revalidate every hour

import BlogClient from "./components/BlogClient";
import BlogErrorBoundary from "@/components/BlogErrorBoundary";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAllPosts } from "@/lib/posts-cms";

export default async function BlogIndexPage() {
    // Fetch from CMS database (single source of truth)
    const posts = await getAllPosts();

    const processedPosts = posts.map(post => {
        // Extract category from keywords if not set
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
            alt: post.alt || post.title,
            category: extractCategory(post.keywords)
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
