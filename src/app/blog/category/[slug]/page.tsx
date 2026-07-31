// Static export - all pages generated at build time

import type { Metadata } from "next";
import { RUBRICS, resolveRubric } from "@/lib/taxonomy";
import Link from "next/link";
import BlogClient from "../../components/BlogClient";
import BlogErrorBoundary from "@/components/BlogErrorBoundary";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAllPosts } from "@/lib/posts";
import { calculateReadingTime } from "@/lib/utils";
import { notFound } from "next/navigation";

// Rubric metadata comes from lib/taxonomy.ts (single source of truth)
const categoryInfo = Object.fromEntries(
    RUBRICS.map(r => [r.slug, { name: r.name, icon: r.emoji, description: r.description, keywords: r.keywords }])
);

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
        .map(post => ({
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            date: post.date,
            keywords: post.keywords,
            image: post.image,
            alt: post.alt || post.title,
            category: resolveRubric(post).slug,
            readingTime: calculateReadingTime(post.content)
        }))
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
