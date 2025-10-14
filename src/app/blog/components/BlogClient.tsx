"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useCallback, useMemo, memo } from "react";

interface Post {
    slug: string;
    title: string;
    excerpt?: string;
    date?: string;
    keywords?: string[];
    image?: string;
    alt?: string;
    category?: string;
}

interface BlogClientProps {
    posts: Post[];
}

const categoryMap = {
    'alle': { name: 'Alle Artikel', icon: '📚' },
    'osteopathie': { name: 'Osteopathie', icon: '🩺' },
    'rueckenschmerzen': { name: 'Rückenschmerzen', icon: '🦴' },
    'kopfschmerzen': { name: 'Kopfschmerzen', icon: '🧠' },
    'sportverletzungen': { name: 'Sportverletzungen', icon: '⚽' },
    'gesundheitstipps': { name: 'Gesundheitstipps', icon: '💡' }
};

const BlogClient = memo(function BlogClient({ posts }: BlogClientProps) {
    const [selectedCategory, setSelectedCategory] = useState('alle');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('date-desc');

    // Memoize expensive filtering and sorting operations
    const filteredPosts = useMemo(() => {
        let filtered = [...posts];

        // Filter by category
        if (selectedCategory !== 'alle') {
            filtered = filtered.filter(post => post.category === selectedCategory);
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
    }, [posts, selectedCategory, searchTerm, sortBy]);

    // Memoize reading time calculation
    const calculateReadingTime = useCallback((excerpt?: string): number => {
        if (!excerpt) return 5;
        const words = excerpt.split(' ').length;
        return Math.max(Math.ceil(words / 50), 3);
    }, []);

    // Memoize category entries to prevent recreation
    const categoryEntries = useMemo(() => Object.entries(categoryMap), []);

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

                        {/* Category Filters */}
                        <div className="flex flex-wrap gap-3 justify-center">
                            {categoryEntries.map(([key, { name, icon }]) => (
                                <button
                                    key={key}
                                    onClick={() => setSelectedCategory(key)}
                                    className={`px-4 py-2 rounded-full border-2 transition-all duration-200 flex items-center gap-2 ${
                                        selectedCategory === key
                                            ? 'bg-slate-900 text-white border-slate-900'
                                            : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-900 hover:text-white hover:border-slate-900'
                                    }`}
                                >
                                    <span>{icon}</span>
                                    <span className="text-sm font-medium">{name}</span>
                                </button>
                            ))}
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
                        {selectedCategory !== 'alle' && (
                            <span> in {categoryMap[selectedCategory as keyof typeof categoryMap]?.name}</span>
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
                {filteredPosts.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-300">
                        <div className="text-6xl mb-4 opacity-50">📝</div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">Keine Artikel gefunden</h3>
                        <p className="text-slate-600">
                            Versuchen Sie es mit anderen Suchbegriffen oder wählen Sie eine andere Kategorie.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {filteredPosts.map((post, index) => {
                            const isFeatured = index === 0 && selectedCategory === 'alle' && !searchTerm;

                            return (
                                <article
                                    key={post.slug}
                                    className={`bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group ${
                                        isFeatured ? 'md:col-span-2 xl:col-span-2' : ''
                                    }`}
                                >
                                    {/* Image */}
                                    <div className={`relative bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center ${
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
                                                        parent.innerHTML = '<span class="text-4xl text-slate-400">📄</span>';
                                                        parent.className = parent.className.replace('relative', 'flex items-center justify-center');
                                                    }
                                                }}
                                                onLoad={() => {
                                                    console.log('Image loaded successfully for:', post.title, 'URL:', post.image);
                                                }}
                                                loading={index === 0 ? 'eager' : 'lazy'}
                                            />
                                        ) : (
                                            <span className="text-4xl text-slate-400">📄</span>
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
                                                    ⏱️ {calculateReadingTime(post.excerpt)} Min.
                                                </span>
                                            </div>
                                            {post.category && (
                                                <span className="bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide">
                                                    {categoryMap[post.category as keyof typeof categoryMap]?.name || 'Artikel'}
                                                </span>
                                            )}
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
                                    href="/terminbuchung"
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