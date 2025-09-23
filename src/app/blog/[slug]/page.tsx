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

export async function generateStaticParams() {
    return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) return {};

    // Enhanced medical and scientific keywords
    const baseKeywords = post.keywords || [];
    const scientificKeywords = [
        "evidenzbasierte Medizin",
        "peer-reviewed Studien",
        "wissenschaftlich fundiert",
        "VFO-zertifiziert",
        "manuelle Therapie",
        "ganzheitliche Behandlung"
    ];

    // Add specialty-specific keywords
    const specialtyKeywords: Record<string, string[]> = {
        "Neurologie und Schmerztherapie": [
            "Trigeminusnerv",
            "kraniosakrale Therapie",
            "neuropathische Schmerzen",
            "Nervensystem",
            "Schmerzlinderung",
            "myofasziale Therapie"
        ],
        "Gastroenterologie und viszerale Osteopathie": [
            "viszerale Osteopathie",
            "Vagusnerv Stimulation",
            "Darm-Hirn-Achse",
            "Reizdarmsyndrom",
            "funktionelle Dyspepsie",
            "Motilität"
        ]
    };

    const allKeywords = [
        ...baseKeywords,
        ...scientificKeywords,
        ...(post.specialty ? specialtyKeywords[post.specialty] || [] : [])
    ].filter(Boolean);

    // Enhanced title with scientific authority indicator
    const enhancedTitle = post.specialty && post.sourceCount
        ? `${post.title} | ${post.sourceCount}+ Studien | VFO-Osteopath Hamburg`
        : post.title;

    // Enhanced description with scientific credibility
    const enhancedDescription = post.specialty && post.sourceCount
        ? `${post.excerpt} ✓ Basiert auf ${post.sourceCount}+ wissenschaftlichen Studien ✓ VFO-zertifiziert ✓ Evidenzbasierte Behandlung in Hamburg.`
        : post.excerpt;

    return {
        title: enhancedTitle,
        description: enhancedDescription,
        keywords: allKeywords,
        authors: [{ name: "Joshua Alsen, VFO-Osteopath" }],
        creator: "Joshua Alsen",
        publisher: "Osteopathie Hamburg - Joshua Alsen",
        alternates: {
            canonical: `/blog/${slug}`
        },
        openGraph: {
            title: enhancedTitle,
            description: enhancedDescription,
            images: post.image ? [{
                url: post.image,
                alt: post.alt || post.title,
                width: 1200,
                height: 630
            }] : undefined,
            type: "article",
            publishedTime: post.date,
            authors: ["Joshua Alsen"],
            tags: allKeywords,
        },
        twitter: {
            card: "summary_large_image",
            title: enhancedTitle,
            description: enhancedDescription,
            images: post.image ? [post.image] : undefined,
            creator: "@osteoalsen"
        },
        robots: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large"
        },
        // Medical article specific metadata
        ...(post.specialty && post.sourceCount && {
            other: {
                "article:medical-specialty": post.specialty,
                "article:evidence-level": `${post.sourceCount}+ peer-reviewed studies`,
                "article:certification": "VFO-zertifiziert",
                "dc.subject": post.specialty,
                "dc.type": "Medical Article",
                "citation_journal_title": "Osteopathie Hamburg Blog",
                "citation_author": "Joshua Alsen",
                "citation_publication_date": post.date?.split('T')[0] || ''
            }
        })
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const [post, allPosts] = await Promise.all([
        getPostBySlug(slug),
        getAllPosts()
    ]);

    if (!post) {
        return (
            <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
                <h1 className="text-2xl font-epilogue font-semibold text-slate-900">Beitrag nicht gefunden</h1>
                <p className="mt-4">
                    Zurück zum <Link href="/blog" className="text-slate-900 hover:underline">Blog</Link>.
                </p>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
            {post.specialty && post.sourceCount ? (
                <MedicalScholarlyArticle
                    headline={post.title}
                    description={post.excerpt || ''}
                    author="Joshua Alsen"
                    datePublished={post.date || ''}
                    url={`https://www.osteoalsen.de/blog/${slug}`}
                    imageUrl={post.image}
                    keywords={post.keywords}
                    citations={post.citations || []}
                    specialty={post.specialty}
                    sourceCount={post.sourceCount}
                />
            ) : (
                <BlogPostStructuredData
                    headline={post.title}
                    description={post.excerpt || ''}
                    author="Joshua Alsen"
                    datePublished={post.date || ''}
                    url={`https://www.osteoalsen.de/blog/${slug}`}
                    imageUrl={post.image}
                    keywords={post.keywords}
                />
            )}
            <BlogErrorBoundary>
                <article className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
                    <header className="mb-6">
                        <h1 className="text-3xl font-epilogue font-bold mb-2 text-slate-900">{post.title}</h1>
                        <div className="text-slate-500 text-sm">
                            {post.date && (
                                <time dateTime={post.date}>
                                    {new Date(post.date).toLocaleDateString("de-DE", {
                                        year: "numeric",
                                        month: "long",
                                        day: "2-digit",
                                    })}
                                </time>
                            )}
                        </div>
                    </header>

                    {/* Scientific Credibility Box for medical articles */}
                    {post.specialty && post.sourceCount && (
                        <ScientificCredibilityBox
                            sourceCount={post.sourceCount}
                            specialty={post.specialty}
                            certification="VFO-zertifiziert"
                            fullBibliographyAnchor="#literatur"
                        />
                    )}

                    {post.image && (
                        <div className="relative h-64 w-full mb-6 overflow-hidden rounded-lg bg-slate-100">
                            <Image
                                src={post.image}
                                alt={post.alt || post.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 768px"
                            />
                        </div>
                    )}
                    <SafeHtml
                        html={post.content}
                        className="rich-text prose prose-slate max-w-none"
                        type="blog"
                    />

                    {/* Enhanced Literature Section */}
                    {post.extractedCitations && post.extractedCitations.length > 0 && (
                        <LiteratureSection citations={post.extractedCitations} />
                    )}

                    {/* Related Articles Section */}
                    <RelatedArticles
                        currentSlug={slug}
                        articles={allPosts.map(p => ({
                            slug: p.slug,
                            title: p.title,
                            excerpt: p.excerpt || '',
                            specialty: p.specialty,
                            readTime: Math.ceil((p.content.length || 0) / 1000) // Rough estimate: 1000 chars per minute
                        }))}
                    />

                    <footer className="mt-10">
                        <Link href="/blog" className="text-slate-900 hover:underline">
                            ← Zurück zur Übersicht
                        </Link>
                    </footer>
                </article>
            </BlogErrorBoundary>
        </main>
    );
}
