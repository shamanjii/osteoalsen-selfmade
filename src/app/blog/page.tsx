import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default async function BlogIndexPage() {
    const posts = await getAllPosts();
    return (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-epilogue text-slate-900 tracking-tight">Blog</h1>
                <p className="text-slate-600 mt-2">Aktuelle Artikel aus der Praxis – verständlich und hilfreich.</p>
            </header>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((p) => (
                    <article
                        key={p.slug}
                        className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow transition-shadow duration-200 overflow-hidden"
                    >
                        {p.image && (
                            <div className="relative h-44 w-full bg-slate-100">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={p.image} alt={p.alt || p.title} className="h-full w-full object-cover" />
                            </div>
                        )}
                        <div className="p-5">
                            <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
                                {p.date ? (
                                    <time dateTime={p.date}>
                                        {new Date(p.date).toLocaleDateString("de-DE", {
                                            year: "numeric",
                                            month: "long",
                                            day: "2-digit",
                                        })}
                                    </time>
                                ) : (
                                    <span />
                                )}
                                {p.keywords?.length ? (
                                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                                        {p.keywords[0]}
                                    </span>
                                ) : null}
                            </div>
                            <h2 className="text-xl font-semibold leading-snug mb-2 text-slate-900">
                                <Link href={`/blog/${p.slug}`} className="hover:underline">
                                    {p.title}
                                </Link>
                            </h2>
                            {p.excerpt && <p className="text-slate-700 mb-3 clamp-3">{p.excerpt}</p>}
                            <Link href={`/blog/${p.slug}`} className="text-slate-900 font-medium hover:underline">
                                Weiterlesen →
                            </Link>
                        </div>
                    </article>
                ))}
            </section>
        </main>
    );
}
