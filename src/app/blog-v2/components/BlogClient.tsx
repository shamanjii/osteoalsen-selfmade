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

// Cluster mapping with emojis
const clusterMap: Record<string, { name: ClusterName; emoji: string }> = {
    'alle': { name: 'Osteopathie Allgemein', emoji: '📚' },
    'rucken-wirbelsaule': { name: 'Rücken & Wirbelsäule', emoji: '🦴' },
    'nacken-hws': { name: 'Nacken & HWS', emoji: '🔄' },
    'kopf-nerven': { name: 'Kopf & Nerven', emoji: '🧠' },
    'knie-hufte': { name: 'Knie & Hüfte', emoji: '🦵' },
    'sport-leistung': { name: 'Sport & Leistung', emoji: '⚡' },
    'verdauung': { name: 'Verdauung & Innere Organe', emoji: '🫁' },
};

const POSTS_PER_PAGE = 12;

const BlogClient = memo(function BlogClient({ posts }: BlogClientProps) {
    const [selectedCluster, setSelectedCluster] = useState('alle');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('date-desc');
    const [currentPage, setCurrentPage] = useState(1);

    // Add cluster info to posts
    const postsWithClusters = useMemo(() => {
        return posts.map(post => ({
            ...post,
            cluster: detectCluster({ title: post.title, excerpt: post.excerpt || '', keywords: post.keywords }),
            clusterEmoji: getClusterEmoji(detectCluster({ title: post.title, excerpt: post.excerpt || '', keywords: post.keywords }))
        }));
    }, [posts]);

    // Calculate cluster stats
    const clusterStats = useMemo(() => {
        const stats: Record<string, number> = {};
        postsWithClusters.forEach(post => {
            const key = post.cluster.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-');
            stats[key] = (stats[key] || 0) + 1;
        });
        return stats;
    }, [postsWithClusters]);

    // Filter and sort posts
    const filteredPosts = useMemo(() => {
        let filtered = [...postsWithClusters];

        // Filter by cluster
        if (selectedCluster !== 'alle') {
            filtered = filtered.filter(post => {
                const clusterKey = post.cluster.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-');
                return clusterKey === selectedCluster;
            });
        }

        // Filter by search
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(post =>
                post.title.toLowerCase().includes(term) ||
                post.excerpt?.toLowerCase().includes(term) ||
                post.keywords?.some(keyword => keyword.toLowerCase().includes(term))
            );
        }

        // Sort
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
    }, [postsWithClusters, selectedCluster, searchTerm, sortBy]);

    // Pagination
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    const paginatedPosts = useMemo(() => {
        const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
        return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
    }, [filteredPosts, currentPage]);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCluster, searchTerm, sortBy]);

    return (
        <>
            {/* Stats Section */}
            <section className="relative -mt-16 mb-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 text-center">
                            <div className="text-5xl font-black text-teal-600 mb-2">{posts.length}</div>
                            <div className="text-slate-600 font-medium">Evidenzbasierte Artikel</div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 text-center">
                            <div className="text-5xl font-black text-cyan-600 mb-2">7</div>
                            <div className="text-slate-600 font-medium">Themenbereiche</div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 text-center">
                            <div className="text-5xl mb-2">📅</div>
                            <div className="text-slate-600 font-medium">Regelmäßig aktualisiert</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Search & Filter Section */}
            <section className="mb-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-xl border border-slate-200 p-8">
                        <div className="text-center mb-8">
                            <h2 className="font-epilogue text-3xl font-bold text-slate-900 mb-3">
                                Finden Sie den passenden Artikel
                            </h2>
                            <p className="text-slate-600 text-lg">
                                Durchsuchen Sie unsere Sammlung professioneller Gesundheitsartikel nach Themenbereich
                            </p>
                        </div>

                        <div className="relative mb-8 max-w-2xl mx-auto">
                            <input
                                type="search"
                                placeholder="Artikel durchsuchen..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-6 py-4 pr-14 border-2 border-slate-300 rounded-2xl focus:border-teal-500 focus:outline-none transition-colors bg-white text-lg shadow-sm"
                            />
                            <span className="absolute right-5 top-1/2 transform -translate-y-1/2 text-2xl">🔍</span>
                        </div>

                        <div className="flex flex-wrap gap-3 justify-center">
                            <button
                                onClick={() => setSelectedCluster('alle')}
                                className={`group px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2.5 text-sm font-bold ${
                                    selectedCluster === 'alle'
                                        ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg scale-105'
                                        : 'bg-white/80 backdrop-blur-sm text-slate-700 border-2 border-slate-200 hover:border-teal-500 hover:shadow-md shadow-sm'
                                }`}
                            >
                                <span className="text-lg">📚</span>
                                <span>Alle Artikel</span>
                                <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                                    selectedCluster === 'alle' ? 'bg-white/20' : 'bg-slate-100 group-hover:bg-teal-100'
                                }`}>{posts.length}</span>
                            </button>

                            {Object.entries(clusterMap)
                                .filter(([key]) => key !== 'alle')
                                .map(([key, { emoji }]) => {
                                    const count = clusterStats[key] || 0;
                                    if (count === 0) return null;
                                    return (
                                        <button
                                            key={key}
                                            onClick={() => setSelectedCluster(key)}
                                            className={`group px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2.5 text-sm font-bold ${
                                                selectedCluster === key
                                                    ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg scale-105'
                                                    : 'bg-white/80 backdrop-blur-sm text-slate-700 border-2 border-slate-200 hover:border-teal-500 hover:shadow-md shadow-sm'
                                            }`}
                                        >
                                            <span className="text-lg">{emoji}</span>
                                            <span className="whitespace-nowrap">{clusterMap[key].name}</span>
                                            <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                                                selectedCluster === key ? 'bg-white/20' : 'bg-slate-100 group-hover:bg-teal-100'
                                            }`}>{count}</span>
                                        </button>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </section>

            <main className="mx-auto max-w-7xl px-4 sm:px-6 pb-16">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <div className="text-slate-600 text-lg">
                        <strong className="text-slate-900 text-2xl">{filteredPosts.length}</strong> Artikel gefunden
                        {selectedCluster !== 'alle' && (
                            <span className="ml-2">in <strong>{clusterMap[selectedCluster]?.name}</strong></span>
                        )}
                    </div>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-3 border-2 border-slate-300 rounded-xl bg-white text-sm font-medium focus:border-teal-500 focus:outline-none shadow-sm"
                    >
                        <option value="date-desc">Neueste zuerst</option>
                        <option value="date-asc">Älteste zuerst</option>
                        <option value="title-asc">Titel A-Z</option>
                        <option value="title-desc">Titel Z-A</option>
                    </select>
                </div>

                {paginatedPosts.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-300">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">Keine Artikel gefunden</h3>
                        <p className="text-slate-600 text-lg">Versuchen Sie es mit anderen Suchbegriffen.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {paginatedPosts.map((post, index) => {
                            const isFeatured = index === 0 && selectedCluster === 'alle' && !searchTerm;
                            return (
                                <Link key={post.slug} href={`/blog-v2/${post.slug}`} className={`group ${isFeatured ? 'md:col-span-2 xl:col-span-2' : ''}`}>
                                    <article className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 overflow-hidden hover:shadow-2xl hover:border-teal-500 hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
                                        <div className={`relative bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden ${isFeatured ? 'h-80' : 'h-56'}`}>
                                            {post.image ? (
                                                <img src={post.image} alt={post.alt || post.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading={index === 0 ? 'eager' : 'lazy'} />
                                            ) : (
                                                <div className="flex items-center justify-center h-full"><span className="text-6xl">{post.clusterEmoji}</span></div>
                                            )}
                                            <div className="absolute top-4 left-4">
                                                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-white/95 backdrop-blur-sm text-slate-900 shadow-lg">
                                                    {post.clusterEmoji} {post.cluster}
                                                </span>
                                            </div>
                                            {isFeatured && (
                                                <div className="absolute top-4 right-4">
                                                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg">⭐ Featured</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className={`p-6 flex-1 flex flex-col ${isFeatured ? 'md:p-8' : ''}`}>
                                            <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                                                <span className="flex items-center gap-1.5">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                    {post.date ? new Date(post.date).toLocaleDateString('de-DE', { day: 'numeric', month: 'short', year: 'numeric' }) : 'unbekannt'}
                                                </span>
                                                <span className="text-slate-300">•</span>
                                                <span className="flex items-center gap-1.5">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    {post.readingTime || 5} Min.
                                                </span>
                                            </div>
                                            <h3 className={`font-epilogue font-bold mb-4 text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-2 ${isFeatured ? 'text-3xl' : 'text-xl'}`}>{post.title}</h3>
                                            {post.excerpt && (
                                                <p className={`text-slate-600 mb-6 leading-relaxed flex-1 ${isFeatured ? 'text-lg line-clamp-3' : 'line-clamp-3'}`}>{post.excerpt}</p>
                                            )}
                                            <div className="inline-flex items-center gap-2 text-teal-600 font-bold group-hover:text-teal-700 transition-colors">
                                                <span>Artikel lesen</span>
                                                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            );
                        })}
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-3 mt-16">
                        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-6 py-3 rounded-xl border-2 border-slate-300 text-slate-700 font-bold hover:bg-teal-600 hover:text-white hover:border-teal-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-700 disabled:hover:border-slate-300 transition-all shadow-sm">← Zurück</button>
                        <div className="flex gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button key={page} onClick={() => setCurrentPage(page)} className={`w-12 h-12 rounded-xl border-2 font-bold transition-all shadow-sm ${currentPage === page ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white border-teal-600 shadow-lg scale-110' : 'border-slate-300 text-slate-700 hover:bg-teal-600 hover:text-white hover:border-teal-600'}`}>{page}</button>
                            ))}
                        </div>
                        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-6 py-3 rounded-xl border-2 border-slate-300 text-slate-700 font-bold hover:bg-teal-600 hover:text-white hover:border-teal-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-700 disabled:hover:border-slate-300 transition-all shadow-sm">Weiter →</button>
                    </div>
                )}

                <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 rounded-2xl shadow-2xl border-2 border-slate-700 p-8 md:p-12 mt-20 text-white">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl flex-shrink-0">
                            <Image src="/assets/joshua-alsen-profil.webp" alt="Joshua Alsen" fill className="object-cover" sizes="160px" loading="lazy" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="font-epilogue text-4xl font-black mb-2">Joshua Alsen</h3>
                            <p className="text-xl text-teal-200 font-bold mb-4">Heilpraktiker & Osteopath</p>
                            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
                                <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold border border-white/30">VFO-zertifiziert</span>
                                <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold border border-white/30">B.Sc. Osteopathie</span>
                                <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold border border-white/30">Hamburg-Eimsbüttel</span>
                            </div>
                            <p className="text-slate-200 text-lg leading-relaxed mb-8">
                                Als Osteopath in Hamburg teile ich in diesem Blog mein Fachwissen über evidenzbasierte Behandlungsmethoden,
                                ganzheitliche Therapieansätze und die vielfältigen Anwendungsbereiche der Osteopathie.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                <Link href="/#ueber-mich" className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-xl hover:bg-slate-100 transition-all font-bold shadow-lg hover:shadow-xl">👨‍⚕️ Mehr über Joshua</Link>
                                <Link href="/terminbuchung" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-slate-900 transition-all font-bold shadow-lg">📅 Termin vereinbaren</Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
});

export default BlogClient;
