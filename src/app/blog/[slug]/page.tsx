import type { Metadata } from "next";
import Link from "next/link";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";

export async function generateStaticParams() {
    return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = await getPostBySlug(params.slug);
    if (!post) return {};
    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: post.image ? [{ url: post.image, alt: post.alt || post.title }] : undefined,
            type: "article",
            publishedTime: post.date,
        },
    };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug);
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
                {post.image && (
                    <div className="relative h-64 w-full mb-6 overflow-hidden rounded-lg bg-slate-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={post.image} alt={post.alt || post.title} className="h-full w-full object-cover" />
                    </div>
                )}
                <div className="rich-text" dangerouslySetInnerHTML={{ __html: post.content }} />
                <footer className="mt-10">
                    <Link href="/blog" className="text-slate-900 hover:underline">
                        ← Zurück zur Übersicht
                    </Link>
                </footer>
            </article>
        </main>
    );
}
