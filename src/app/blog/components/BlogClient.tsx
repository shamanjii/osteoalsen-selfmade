"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useMemo, memo, useEffect } from "react";
import { detectCluster, getClusterEmoji, type ClusterName } from "@/lib/cluster-detection";

interface Post {
    slug: string;
    title: string;
    excerpt?: string;
    date?: string;
    keywords?: string[];
    image?: string;
    alt?: string;
    category?: string;
    readingTime?: number;
}

interface BlogClientProps {
    posts: Post[];
}

// Cluster mapping - NO EMOJIS per user request
// Keys must match the transformation: cluster.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')
const categoryMap: Record<string, { name: string }> = {
    'alle': { name: 'Alle Artikel' },
    'rücken-wirbelsäule': { name: 'Rücken & Wirbelsäule' },
    'nacken-hws': { name: 'Nacken & HWS' },
    'kopf-nerven': { name: 'Kopf & Nerven' },
    'knie-hüfte': { name: 'Knie & Hüfte' },
    'sport-leistung': { name: 'Sport & Leistung' },
    'verdauung-innere-organe': { name: 'Verdauung & Innere Organe' },
    'stress-burnout': { name: 'Stress & Burnout' },
    'osteopathie-allgemein': { name: 'Osteopathie Allgemein' }
};

const POSTS_PER_PAGE = 12;

const BlogClient = memo(function BlogClient({ posts }: BlogClientProps) {
    const [selectedCategory, setSelectedCategory] = useState('alle');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('date-desc');
    const [currentPage, setCurrentPage] = useState(1);

    // Add cluster info to posts using automatic detection
    const postsWithClusters = useMemo(() => {
        return posts.map(post => ({
            ...post,
            cluster: detectCluster({ title: post.title, excerpt: post.excerpt || '', keywords: post.keywords }),
            clusterEmoji: getClusterEmoji(detectCluster({ title: post.title, excerpt: post.excerpt || '', keywords: post.keywords }))
        }));
    }, [posts]);

    // Calculate cluster stats for badge counts
    const clusterStats = useMemo(() => {
        const stats: Record<string, number> = {};
        postsWithClusters.forEach(post => {
            const key = post.cluster.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-');
            stats[key] = (stats[key] || 0) + 1;
        });
        return stats;
    }, [postsWithClusters]);

    // Memoize expensive filtering and sorting operations
    const filteredPosts = useMemo(() => {
        let filtered = [...postsWithClusters];

        // Filter by cluster (instead of old category)
        if (selectedCategory !== 'alle') {
            filtered = filtered.filter(post => {
                const clusterKey = post.cluster.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-');
                return clusterKey === selectedCategory;
            });
        }

        // Filter by search term
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(post =>
                post.title.toLowerCase().includes(term) ||
                post.excerpt?.toLowerCase().includes(term) ||
                post.keywords?.some(keyword => keyword.toLowerCase().includes(term))
            );
        }

        // Sort posts
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'date-desc':
                    return new Date(b.date || '').getTime() - new Date(a.date || '').getTime();
                case 'date-asc':
                    return new Date(a.date || '').getTime() - new Date(b.date || '').getTime();
                case 'title-asc':
                    return a.title.localeCompare(b.title);
                case 'title-desc':
                    return b.title.localeCompare(a.title);
                default:
                    return 0;
            }
        });

        return filtered;
    }, [postsWithClusters, selectedCategory, searchTerm, sortBy]);

    // Pagination logic
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    const paginatedPosts = useMemo(() => {
        const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
        return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
    }, [filteredPosts, currentPage]);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, searchTerm, sortBy]);

    return (
        <>
            {/* Search & Filter Section */}
            <section className="relative z-10 -mt-12">
                <div className="mx-auto max-w-4xl px-4 sm:px-6">
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 md:p-8">
                        <div className="text-center mb-6">
                            <h2 className="font-epilogue text-2xl font-semibold text-slate-900 mb-2">
                                Finden Sie relevante Artikel
                            </h2>
                            <p className="text-slate-600">
                                Durchsuchen Sie unsere Sammlung professioneller Gesundheitsartikel
                            </p>
                        </div>

                        {/* Search Box */}
                        <div className="relative mb-6">
                            <input
                                type="search"
                                placeholder="Artikel durchsuchen..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-3 pr-12 border-2 border-slate-300 rounded-xl focus:border-slate-500 focus:outline-none transition-colors bg-slate-50 focus:bg-white"
                            />
                            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                                🔍
                            </span>
                        </div>

                        {/* Cluster Filters - Compact on mobile */}
                        <div className="flex flex-wrap gap-2 justify-center">
                            {/* Alle Filter - NO EMOJI */}
                            <button
                                onClick={() => setSelectedCategory('alle')}
                                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border-2 transition-all duration-200 flex items-center gap-1.5 ${
                                    selectedCategory === 'alle'
                                        ? 'bg-slate-900 text-white border-slate-900'
                                        : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-900 hover:text-white hover:border-slate-900'
                                }`}
                            >
                                <span className="text-xs sm:text-sm font-medium">{categoryMap['alle'].name}</span>
                                <span className="text-xs">({posts.length})</span>
                            </button>

                            {/* Cluster Filters - only show if articles exist, NO EMOJIS */}
                            {Object.entries(categoryMap)
                                .filter(([key]) => key !== 'alle')
                                .map(([key, { name }]) => {
                                    const count = clusterStats[key] || 0;
                                    if (count === 0) return null;

                                    return (
                                        <button
                                            key={key}
                                            onClick={() => setSelectedCategory(key)}
                                            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border-2 transition-all duration-200 flex items-center gap-1.5 ${
                                                selectedCategory === key
                                                    ? 'bg-slate-900 text-white border-slate-900'
                                                    : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-900 hover:text-white hover:border-slate-900'
                                            }`}
                                        >
                                            <span className="text-xs sm:text-sm font-medium">{name}</span>
                                            <span className="text-xs">({count})</span>
                                        </button>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
                {/* Results Info */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <div className="text-slate-600">
                        <strong className="text-slate-900">{filteredPosts.length}</strong> Artikel gefunden
                        {selectedCategory !== 'alle' && categoryMap[selectedCategory] && (
                            <span> in {categoryMap[selectedCategory].name}</span>
                        )}
                    </div>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm"
                    >
                        <option value="date-desc">Neueste zuerst</option>
                        <option value="date-asc">Älteste zuerst</option>
                        <option value="title-asc">Titel A-Z</option>
                        <option value="title-desc">Titel Z-A</option>
                    </select>
                </div>

                {/* Posts Grid */}
                {paginatedPosts.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-300">
                        <div className="text-6xl mb-4 opacity-50">📝</div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">Keine Artikel gefunden</h3>
                        <p className="text-slate-600">
                            Versuchen Sie es mit anderen Suchbegriffen oder wählen Sie eine andere Kategorie.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {paginatedPosts.map((post, index) => {
                            const isFeatured = index === 0 && selectedCategory === 'alle' && !searchTerm;

                            return (
                                <article
                                    key={post.slug}
                                    className={`bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group ${
                                        isFeatured ? 'md:col-span-2 xl:col-span-2' : ''
                                    }`}
                                >
                                    {/* Image */}
                                    <div className={`relative bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 flex items-center justify-center overflow-hidden ${
                                        isFeatured ? 'h-64' : 'h-48'
                                    }`}>
                                        {post.image ? (
                                            <img
                                                src={post.image}
                                                alt={post.alt || post.title}
                                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                onError={(e) => {
                                                    console.log('Image loading failed for:', post.title, 'URL:', post.image);
                                                    const target = e.target as HTMLImageElement;
                                                    target.style.display = 'none';
                                                    const parent = target.parentElement;
                                                    if (parent) {
                                                        parent.innerHTML = `
                                                            <div class="flex flex-col items-center justify-center gap-3 p-6">
                                                                <svg class="w-16 h-16 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                                </svg>
                                                                <span class="text-slate-500 text-sm font-medium text-center">${post.title.substring(0, 40)}...</span>
                                                            </div>
                                                        `;
                                                    }
                                                }}
                                                onLoad={() => {
                                                    console.log('Image loaded successfully for:', post.title, 'URL:', post.image);
                                                }}
                                                loading={index === 0 ? 'eager' : 'lazy'}
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center gap-3 p-6">
                                                <svg className="w-16 h-16 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                <span className="text-slate-500 text-sm font-medium text-center">{post.title.substring(0, 40)}...</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className={isFeatured ? 'p-8' : 'p-6'}>
                                        {/* Meta */}
                                        <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                                            <div className="flex items-center gap-4">
                                                <span className="flex items-center gap-1">
                                                    📅 {post.date ? new Date(post.date).toLocaleDateString('de-DE', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    }) : 'Datum unbekannt'}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    ⏱️ {post.readingTime || 5} Min.
                                                </span>
                                            </div>
                                            <span className="bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide">
                                                {post.cluster}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className={`font-epilogue font-semibold mb-4 text-slate-900 group-hover:text-slate-700 transition-colors ${
                                            isFeatured ? 'text-2xl md:text-3xl' : 'text-xl'
                                        }`}>
                                            <Link href={`/blog/${post.slug}`}>
                                                {post.title}
                                            </Link>
                                        </h3>

                                        {/* Excerpt */}
                                        {post.excerpt && (
                                            <p className={`text-slate-600 mb-6 leading-relaxed ${
                                                isFeatured ? 'text-lg' : 'text-base'
                                            }`}>
                                                {post.excerpt}
                                            </p>
                                        )}

                                        {/* Read More */}
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className="inline-flex items-center gap-2 text-slate-900 font-medium border-2 border-slate-300 px-4 py-2 rounded-lg hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-200"
                                        >
                                            <span>Artikel lesen</span>
                                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                                        </Link>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-12">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 rounded-lg border-2 border-slate-300 text-slate-700 font-medium hover:bg-slate-900 hover:text-white hover:border-slate-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-700 disabled:hover:border-slate-300 transition-all"
                        >
                            ← Zurück
                        </button>

                        <div className="flex gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-10 h-10 rounded-lg border-2 font-medium transition-all ${
                                        currentPage === page
                                            ? 'bg-slate-900 text-white border-slate-900'
                                            : 'border-slate-300 text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 rounded-lg border-2 border-slate-300 text-slate-700 font-medium hover:bg-slate-900 hover:text-white hover:border-slate-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-700 disabled:hover:border-slate-300 transition-all"
                        >
                            Weiter →
                        </button>
                    </div>
                )}

                {/* Author Section */}
                <section className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mt-16">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-slate-900">
                            <Image
                                src="/assets/joshua-alsen-profil.webp"
                                alt="Joshua Alsen"
                                fill
                                className="object-cover"
                                sizes="128px"
                                loading="lazy"
                            />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="font-epilogue text-3xl font-bold text-slate-900 mb-2">Joshua Alsen</h3>
                            <p className="text-xl text-slate-600 font-medium mb-4">Heilpraktiker & Osteopath</p>
                            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
                                <span className="bg-slate-900 text-white px-3 py-1 rounded-lg text-sm font-medium">VFO-zertifiziert</span>
                                <span className="bg-slate-900 text-white px-3 py-1 rounded-lg text-sm font-medium">B.Sc. Osteopathie</span>
                                <span className="bg-slate-900 text-white px-3 py-1 rounded-lg text-sm font-medium">Hamburg-Eimsbüttel</span>
                            </div>
                            <p className="text-slate-700 leading-relaxed mb-6">
                                Als Osteopath in Hamburg teile ich in diesem Blog mein Fachwissen über evidenzbasierte Behandlungsmethoden,
                                ganzheitliche Therapieansätze und die vielfältigen Anwendungsbereiche der Osteopathie.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                <Link
                                    href="/#ueber-mich"
                                    className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition-colors"
                                >
                                    👨‍⚕️ Mehr über Joshua
                                </Link>
                                <Link
                                    href="/terminbuchung/"
                                    className="inline-flex items-center gap-2 border-2 border-slate-900 text-slate-900 px-6 py-3 rounded-lg hover:bg-slate-900 hover:text-white transition-colors"
                                >
                                    📅 Termin vereinbaren
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </>
    );
});

export default BlogClient;