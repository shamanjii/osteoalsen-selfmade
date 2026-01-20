// Static export - all pages generated at build time

import type { Metadata } from "next";
import Link from "next/link";
import BlogClient from "../../components/BlogClient";
import BlogErrorBoundary from "@/components/BlogErrorBoundary";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAllPosts } from "@/lib/posts";
import { calculateReadingTime } from "@/lib/utils";
import { notFound } from "next/navigation";

// Category metadata
const categoryInfo = {
    'osteopathie': {
        name: 'Osteopathie',
        icon: '🩺',
        description: 'Entdecken Sie professionelle Fachartikel über Osteopathie, ganzheitliche Behandlungsmethoden und evidenzbasierte Therapieansätze.',
        keywords: ['Osteopathie', 'Osteopathie Hamburg', 'Osteopathische Behandlung', 'Ganzheitliche Medizin']
    },
    'rueckenschmerzen': {
        name: 'Rückenschmerzen',
        icon: '🦴',
        description: 'Erfahren Sie, wie Osteopathie bei Rückenschmerzen, Verspannungen und Wirbelsäulenproblemen nachhaltig helfen kann.',
        keywords: ['Rückenschmerzen', 'Rückenschmerzen Behandlung', 'Osteopathie Rücken', 'HWS Blockade', 'LWS Schmerzen']
    },
    'kopfschmerzen': {
        name: 'Kopfschmerzen',
        icon: '🧠',
        description: 'Lernen Sie osteopathische Ansätze zur Behandlung von Kopfschmerzen, Migräne und Spannungskopfschmerzen kennen.',
        keywords: ['Kopfschmerzen', 'Migräne', 'Spannungskopfschmerzen', 'Kopfschmerzen Behandlung', 'Osteopathie Kopfschmerzen']
    },
    'sportverletzungen': {
        name: 'Sportverletzungen',
        icon: '⚽',
        description: 'Professionelle osteopathische Behandlung von Sportverletzungen und Tipps für schnellere Regeneration.',
        keywords: ['Sportverletzungen', 'Sportosteopathie', 'Sportverletzung Behandlung', 'Regeneration Sport']
    },
    'verdauung': {
        name: 'Verdauung',
        icon: '🍃',
        description: 'Viszerale Osteopathie für Verdauungsbeschwerden: Erfahren Sie, wie osteopathische Behandlung bei Darmproblemen helfen kann.',
        keywords: ['Verdauungsbeschwerden', 'Viszerale Osteopathie', 'Darm-Hirn-Achse', 'Reizdarm', 'Verdauung Behandlung']
    },
    'gesundheitstipps': {
        name: 'Gesundheitstipps',
        icon: '💡',
        description: 'Praktische Gesundheitstipps und evidenzbasierte Ratschläge für Ihr Wohlbefinden aus osteopathischer Sicht.',
        keywords: ['Gesundheitstipps', 'Gesundheit', 'Prävention', 'Wohlbefinden', 'Gesundheit Hamburg']
    }
};

type CategorySlug = keyof typeof categoryInfo;

interface PageProps {
    params: Promise<{ slug: string }>;
}

// Generate static params for all categories
export async function generateStaticParams() {
    return Object.keys(categoryInfo).map((slug) => ({
        slug,
    }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const category = categoryInfo[slug as CategorySlug];

    if (!category) {
        return {
            title: 'Kategorie nicht gefunden | Osteoalsen Hamburg',
        };
    }

    return {
        title: `${category.name} Blog | Osteoalsen Hamburg`,
        description: category.description,
        keywords: category.keywords,
        openGraph: {
            title: `${category.name} Blog | Osteoalsen Hamburg`,
            description: category.description,
            type: 'website',
            url: `/blog/category/${slug}`,
        },
    };
}

export default async function CategoryPage({ params }: PageProps) {
    const { slug } = await params;
    const category = categoryInfo[slug as CategorySlug];

    // 404 if category doesn't exist
    if (!category) {
        notFound();
    }

    // Fetch all posts and filter by category
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
        .filter(post => post.category === slug); // Filter by current category

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <Breadcrumbs
                items={[
                    { label: "Blog", href: "/blog" },
                    { label: category.name }
                ]}
            />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-20">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
                    <div className="text-6xl mb-4">{category.icon}</div>
                    <h1 className="font-epilogue text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                        {category.name}
                    </h1>
                    <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed mb-8">
                        {category.description}
                    </p>
                    <div className="flex items-center justify-center gap-4 text-sm text-slate-300">
                        <span className="bg-slate-700/50 px-4 py-2 rounded-lg">
                            📄 {processedPosts.length} {processedPosts.length === 1 ? 'Artikel' : 'Artikel'}
                        </span>
                        <Link
                            href="/blog/"
                            className="bg-slate-700/50 px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
                        >
                            ← Alle Kategorien
                        </Link>
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
