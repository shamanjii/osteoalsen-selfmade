"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function SiteHeader() {
    const [open, setOpen] = useState(false);

    // Close menu on hash change (when clicking an anchor link)
    useEffect(() => {
        const handler = () => setOpen(false);
        window.addEventListener("hashchange", handler);
        return () => window.removeEventListener("hashchange", handler);
    }, []);

    // Optional: close on resize to desktop
    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 768) setOpen(false);
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/assets/osd-logo.webp" alt="Osteopathie Alsen Logo" width={32} height={32} className="h-8 w-auto" />
                    <span className="font-semibold tracking-tight text-slate-900">Osteopathie Alsen</span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-6 text-sm">
                    <Link href="/blog" className="hover:text-slate-900 text-slate-600">Blog</Link>
                    <Link href="/#behandlungen" className="hover:text-slate-900 text-slate-600">Behandlungen</Link>
                    <Link href="/#anwendungen" className="hover:text-slate-900 text-slate-600">Anwendungen</Link>
                    <Link href="/#bewertungen" className="hover:text-slate-900 text-slate-600">Bewertungen</Link>
                    <Link href="/#ueber-mich" className="hover:text-slate-900 text-slate-600">Über mich</Link>
                    <Link href="/#kontakt" className="inline-flex items-center rounded-md bg-slate-900 text-white px-3 py-1.5 hover:bg-slate-800">Termin</Link>
                </nav>

                {/* Mobile hamburger */}
                <button
                    type="button"
                    className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400"
                    aria-controls="mobile-menu"
                    aria-expanded={open}
                    aria-label={open ? "Menü schließen" : "Menü öffnen"}
                    onClick={() => setOpen((v) => !v)}
                >
                    {/* Icon */}
                    <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                    >
                        {open ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile dropdown */}
            <div
                id="mobile-menu"
                className={`md:hidden transition-[max-height,opacity] duration-200 ease-out overflow-hidden bg-white/95 backdrop-blur border-t border-slate-200 ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
            >
                <nav className="px-4 sm:px-6 py-3 grid gap-2 text-base">
                    <Link href="/blog" onClick={() => setOpen(false)} className="px-2 py-2 rounded hover:bg-slate-100 text-slate-700">Blog</Link>
                    <Link href="/#behandlungen" onClick={() => setOpen(false)} className="px-2 py-2 rounded hover:bg-slate-100 text-slate-700">Behandlungen</Link>
                    <Link href="/#anwendungen" onClick={() => setOpen(false)} className="px-2 py-2 rounded hover:bg-slate-100 text-slate-700">Anwendungen</Link>
                    <Link href="/#bewertungen" onClick={() => setOpen(false)} className="px-2 py-2 rounded hover:bg-slate-100 text-slate-700">Bewertungen</Link>
                    <Link href="/#ueber-mich" onClick={() => setOpen(false)} className="px-2 py-2 rounded hover:bg-slate-100 text-slate-700">Über mich</Link>
                    <Link href="/#kontakt" onClick={() => setOpen(false)} className="mt-1 inline-flex items-center justify-center rounded-md bg-slate-900 text-white px-3 py-2 hover:bg-slate-800">Termin vereinbaren</Link>
                </nav>
            </div>
        </header>
    );
}
