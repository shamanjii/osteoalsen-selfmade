"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import throttle from "lodash.throttle";
import DropdownMenu from "@/components/DropdownMenu";

export default function SiteHeader() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    // Throttled scroll handler for better performance
    const handleScroll = useCallback(() => {
        const throttledHandler = throttle(() => {
            const currentScrollY = window.scrollY;

            // Show header at top of page
            if (currentScrollY < 10) {
                setIsVisible(true);
            }
            // Hide when scrolling down, show when scrolling up
            else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else if (currentScrollY < lastScrollY) {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        }, 16); // 60fps throttling

        return throttledHandler;
    }, [lastScrollY]);

    // Auto-hide header on scroll with throttling
    useEffect(() => {
        const scrollHandler = handleScroll();
        window.addEventListener('scroll', scrollHandler, { passive: true });
        return () => {
            window.removeEventListener('scroll', scrollHandler);
            scrollHandler.cancel(); // Cancel pending throttled calls
        };
    }, [handleScroll]);

    // Memoize event handlers to prevent recreation
    const handleClose = useCallback(() => setMobileOpen(false), []);
    const handleResize = useCallback(() => {
        const throttledResize = throttle(() => {
            if (window.innerWidth >= 768) setMobileOpen(false);
        }, 100); // Throttle resize events

        return throttledResize;
    }, []);

    // Close mobile menu on route changes and resize
    useEffect(() => {
        window.addEventListener("hashchange", handleClose);
        const resizeHandler = handleResize();
        window.addEventListener("resize", resizeHandler, { passive: true });

        return () => {
            window.removeEventListener("hashchange", handleClose);
            window.removeEventListener("resize", resizeHandler);
            resizeHandler.cancel(); // Cancel pending throttled calls
        };
    }, [handleClose, handleResize]);

    // Memoize smooth scroll handler
    const handleSmoothScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        setMobileOpen(false);

        const currentPath = window.location.pathname;
        const targetSection = targetId.replace('#', '');

        // If we're not on the homepage, navigate to homepage with hash
        if (currentPath !== '/' && !currentPath.includes('/index.html')) {
            window.location.href = `/#${targetSection}`;
            return;
        }

        // If we're on homepage, do smooth scroll
        const target = document.getElementById(targetSection);
        if (target) {
            const offset = 90;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }, []);

    return (
        <header className={`fixed top-0 w-full z-50 bg-gradient-to-r from-slate-800 to-slate-900 shadow-lg transition-transform duration-300 ease-in-out ${
            isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                {/* Desktop Navigation */}
                <div className="flex items-center h-16 md:h-24">
                    {/* Mobile: Centered logo with hamburger */}
                    <div className="flex items-center justify-between w-full md:hidden">
                        <div></div> {/* Spacer */}
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/assets/osteopathie-alsen-logo.webp"
                                alt="Osteopathie Alsen Logo"
                                width={256}
                                height={32}
                                className="h-8 w-auto"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    const fallback = target.nextElementSibling as HTMLElement;
                                    if (fallback) fallback.style.display = 'block';
                                }}
                            />
                            <span className="hidden text-white font-epilogue text-lg font-bold tracking-[0.1em] uppercase">
                                OSTEOPATHIE ALSEN
                            </span>
                        </Link>
                        <button
                            type="button"
                            className="p-2 rounded-md text-white hover:bg-white/10 transition-colors duration-200"
                            aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {mobileOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>

                    {/* Desktop: Full navigation layout */}
                    <div className="hidden md:grid md:grid-cols-3 md:items-center md:w-full md:gap-8">
                        {/* Left Navigation Links */}
                        <nav className="flex items-center space-x-6">
                            <Link
                                href="/"
                                className="text-white/90 hover:text-white text-sm font-medium transition-colors duration-200"
                            >
                                Home
                            </Link>
                            <DropdownMenu
                                label="Osteopathie"
                                items={[
                                    { label: "Was ist Osteopathie?", href: "/was-ist-osteopathie", icon: "ℹ️" },
                                    { label: "Behandlungsablauf", href: "/kosten-ablauf#ablauf", icon: "📋" },
                                ]}
                                isOpen={openDropdown === "osteopathie"}
                                onOpenChange={(open) => setOpenDropdown(open ? "osteopathie" : null)}
                            />
                            <DropdownMenu
                                label="Behandlungen"
                                items={[
                                    { label: "Rückenschmerzen", href: "/behandlungen/rueckenschmerzen" },
                                    { label: "Nackenschmerzen & HWS", href: "/behandlungen/nackenschmerzen" },
                                    { label: "Kopfschmerzen & Migräne", href: "/behandlungen/kopfschmerzen-migraene" },
                                    { label: "Arthrose & Gelenkschmerzen", href: "/behandlungen/arthrose-gelenkbeschwerden" },
                                    { label: "Verdauungsbeschwerden", href: "/behandlungen/verdauungsbeschwerden" },
                                    { label: "Sportosteopathie", href: "/behandlungen/sportosteopathie" },
                                    { label: "Stress & Burnout", href: "/behandlungen/stress-burnout" },
                                ]}
                                showAllLink={true}
                                isOpen={openDropdown === "behandlungen"}
                                onOpenChange={(open) => setOpenDropdown(open ? "behandlungen" : null)}
                            />
                        </nav>

                        {/* Centered Logo */}
                        <div className="flex justify-center">
                            <Link href="/" className="flex items-center">
                                <Image
                                    src="/assets/osteopathie-alsen-logo.webp"
                                    alt="Osteopathie Alsen Logo"
                                    width={320}
                                    height={40}
                                    className="h-10 w-auto"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        const fallback = target.nextElementSibling as HTMLElement;
                                        if (fallback) fallback.style.display = 'block';
                                    }}
                                />
                                <span className="hidden text-white font-epilogue text-lg font-bold tracking-[0.1em] uppercase">
                                    OSTEOPATHIE ALSEN
                                </span>
                            </Link>
                        </div>

                        {/* Right Navigation Links */}
                        <nav className="flex items-center justify-end space-x-6">
                            <Link
                                href="/ueber-mich"
                                className="text-white/90 hover:text-white text-sm font-medium transition-colors duration-200"
                            >
                                Über mich
                            </Link>
                            <Link
                                href="/kosten-ablauf"
                                className="text-white/90 hover:text-white text-sm font-medium transition-colors duration-200"
                            >
                                Kosten
                            </Link>
                            <Link
                                href="/faq"
                                className="text-white/90 hover:text-white text-sm font-medium transition-colors duration-200"
                            >
                                FAQ
                            </Link>
                            <Link
                                href="/blog"
                                className="text-white/90 hover:text-white text-sm font-medium transition-colors duration-200"
                            >
                                Blog
                            </Link>
                            <Link
                                href="/terminbuchung"
                                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-200 flex items-center gap-2"
                            >
                                <span>📅</span>
                                <span>Termin</span>
                            </Link>
                        </nav>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <div className="md:hidden border-t border-white/20 bg-slate-900">
                        <div className="px-4 py-4 space-y-2">
                            <Link
                                href="/"
                                onClick={() => setMobileOpen(false)}
                                className="block w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg text-base font-medium transition-colors duration-200 touch-manipulation"
                            >
                                Home
                            </Link>
                            {/* Osteopathie - Accordion Style */}
                            <div className="space-y-1">
                                <div className="block w-full text-left px-4 py-3 text-white/90 rounded-lg text-base font-semibold">
                                    Osteopathie
                                </div>
                                <div className="pl-4 space-y-1">
                                    <Link
                                        href="/was-ist-osteopathie"
                                        onClick={() => setMobileOpen(false)}
                                        className="flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg text-sm transition-colors duration-200 touch-manipulation"
                                    >
                                        <span>ℹ️</span>
                                        <span>Was ist Osteopathie?</span>
                                    </Link>
                                    <Link
                                        href="/kosten-ablauf#ablauf"
                                        onClick={() => setMobileOpen(false)}
                                        className="flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg text-sm transition-colors duration-200 touch-manipulation"
                                    >
                                        <span>📋</span>
                                        <span>Behandlungsablauf</span>
                                    </Link>
                                </div>
                            </div>
                            {/* Behandlungen - Accordion Style */}
                            <div className="space-y-1">
                                <Link
                                    href="/behandlungen"
                                    onClick={() => setMobileOpen(false)}
                                    className="block w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg text-base font-semibold transition-colors duration-200 touch-manipulation"
                                >
                                    Behandlungen
                                </Link>
                                <div className="pl-4 space-y-1">
                                    <Link
                                        href="/behandlungen/rueckenschmerzen"
                                        onClick={() => setMobileOpen(false)}
                                        className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg text-sm transition-colors duration-200 touch-manipulation"
                                    >
                                        Rückenschmerzen
                                    </Link>
                                    <Link
                                        href="/behandlungen/nackenschmerzen"
                                        onClick={() => setMobileOpen(false)}
                                        className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg text-sm transition-colors duration-200 touch-manipulation"
                                    >
                                        Nackenschmerzen & HWS
                                    </Link>
                                    <Link
                                        href="/behandlungen/kopfschmerzen-migraene"
                                        onClick={() => setMobileOpen(false)}
                                        className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg text-sm transition-colors duration-200 touch-manipulation"
                                    >
                                        Kopfschmerzen & Migräne
                                    </Link>
                                    <Link
                                        href="/behandlungen/arthrose-gelenkbeschwerden"
                                        onClick={() => setMobileOpen(false)}
                                        className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg text-sm transition-colors duration-200 touch-manipulation"
                                    >
                                        Arthrose & Gelenkschmerzen
                                    </Link>
                                    <Link
                                        href="/behandlungen/verdauungsbeschwerden"
                                        onClick={() => setMobileOpen(false)}
                                        className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg text-sm transition-colors duration-200 touch-manipulation"
                                    >
                                        Verdauungsbeschwerden
                                    </Link>
                                    <Link
                                        href="/behandlungen/sportosteopathie"
                                        onClick={() => setMobileOpen(false)}
                                        className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg text-sm transition-colors duration-200 touch-manipulation"
                                    >
                                        Sportosteopathie
                                    </Link>
                                    <Link
                                        href="/behandlungen/stress-burnout"
                                        onClick={() => setMobileOpen(false)}
                                        className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg text-sm transition-colors duration-200 touch-manipulation"
                                    >
                                        Stress & Burnout
                                    </Link>
                                </div>
                            </div>
                            <Link
                                href="/ueber-mich"
                                onClick={() => setMobileOpen(false)}
                                className="block w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg text-base font-medium transition-colors duration-200 touch-manipulation"
                            >
                                Über mich
                            </Link>
                            <Link
                                href="/kosten-ablauf"
                                onClick={() => setMobileOpen(false)}
                                className="block w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg text-base font-medium transition-colors duration-200 touch-manipulation"
                            >
                                Kosten & Ablauf
                            </Link>
                            <Link
                                href="/faq"
                                onClick={() => setMobileOpen(false)}
                                className="block w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg text-base font-medium transition-colors duration-200 touch-manipulation"
                            >
                                FAQ
                            </Link>
                            <Link
                                href="/blog"
                                onClick={() => setMobileOpen(false)}
                                className="block w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg text-base font-medium transition-colors duration-200 touch-manipulation"
                            >
                                Blog
                            </Link>
                            <Link
                                href="/terminbuchung"
                                onClick={() => setMobileOpen(false)}
                                className="block w-full mx-auto mt-4 px-4 py-3 bg-white/10 border border-white/20 text-white text-center font-semibold rounded-lg hover:bg-white/20 transition-colors duration-200 touch-manipulation"
                            >
                                📅 Termin buchen
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
