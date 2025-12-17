// Use ISR (Incremental Static Regeneration) for performance
export const revalidate = 3600; // Revalidate every hour

import type { Metadata } from "next";
import BlogClient from "./components/BlogClient";
import BlogErrorBoundary from "@/components/BlogErrorBoundary";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAllPosts } from "@/lib/posts";
import { calculateReadingTime } from "@/lib/utils";

export const metadata: Metadata = {
    title: "Osteopathie Blog | Evidenzbasierte Fachartikel | Osteoalsen Hamburg",
    description: "Entdecken Sie evidenzbasierte Fachartikel zu Osteopathie, ganzheitlicher Gesundheit und bewährten Behandlungsmethoden von Osteopath Joshua Alsen aus Hamburg.",
    keywords: ["Osteopathie Blog", "Osteopathie Artikel", "Gesundheitstipps", "Rückenschmerzen", "Kopfschmerzen", "Sportverletzungen", "Osteopath Hamburg"],
    openGraph: {
        title: "Osteopathie Blog | Fachartikel & Gesundheitstipps",
        description: "Evidenzbasierte Fachartikel zu Osteopathie und ganzheitlicher Gesundheit von Osteopath Joshua Alsen",
        type: "website",
        url: "/blog",
    },
};

export default async function BlogIndexPage() {
    // Fetch from CMS database (single source of truth)
    const posts = await getAllPosts();

    const processedPosts = posts.map(post => {
        // Extract category from keywords as fallback if CMS category not set
        const extractCategory = (keywords?: string[], cmsCategory?: string): string => {
            // Prefer CMS category if available
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
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <Breadcrumbs items={[{ label: "Blog" }]} />

            {/* Hero Section with Dramatic Gradient & Dot Pattern */}
            <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white overflow-hidden">
                {/* Dot Pattern Background */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }}></div>
                </div>

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-24 md:py-32">
                    <div className="text-center max-w-4xl mx-auto">
                        {/* Main Badge */}
                        <div className="inline-flex items-center px-6 py-3 rounded-full text-sm font-bold bg-white/10 backdrop-blur-sm border border-white/20 text-white mb-8">
                            <span className="text-lg mr-2">📚</span>
                            Evidenzbasierte Fachartikel
                        </div>

                        {/* Title */}
                        <h1 className="font-epilogue text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
                            Osteopathie<br />
                            <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
                                Wissensdatenbank
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto leading-relaxed mb-12">
                            Entdecken Sie professionelle Artikel zu Osteopathie, ganzheitlicher Gesundheit und bewährten Behandlungsmethoden – wissenschaftlich fundiert und praxisnah erklärt
                        </p>

                        {/* Features */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                                <div className="text-4xl mb-3">🎯</div>
                                <div className="font-bold text-lg mb-2">7 Themenbereiche</div>
                                <div className="text-slate-300 text-sm">Von Rücken bis Verdauung</div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                                <div className="text-4xl mb-3">✍️</div>
                                <div className="font-bold text-lg mb-2">Expertenw issen</div>
                                <div className="text-slate-300 text-sm">Von zertifiziertem Osteopath</div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                                <div className="text-4xl mb-3">🔬</div>
                                <div className="font-bold text-lg mb-2">Evidenzbasiert</div>
                                <div className="text-slate-300 text-sm">Wissenschaftlich fundiert</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Client Component for Interactive Features */}
            <BlogErrorBoundary>
                <BlogClient posts={processedPosts} />
            </BlogErrorBoundary>
        </div>
    );
}
