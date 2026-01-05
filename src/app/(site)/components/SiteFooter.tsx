'use client';

import Link from "next/link";
import { PhoneLink, EmailLink } from '@/components/TrackableLink';

export default function SiteFooter() {
    return (
        <footer className="border-t border-slate-200 bg-slate-50">
            {/* Sitemap Section */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Osteopathie */}
                    <div>
                        <h3 className="text-slate-900 font-semibold mb-4 font-epilogue">
                            Osteopathie
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="/was-ist-osteopathie/"
                                    className="text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    Was ist Osteopathie?
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/kosten-ablauf/"
                                    className="text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    Kosten & Ablauf
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/faq/"
                                    className="text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    Häufige Fragen
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/ueber-mich/"
                                    className="text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    Über mich
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Behandlungen */}
                    <div>
                        <h3 className="text-slate-900 font-semibold mb-4 font-epilogue">
                            Behandlungen
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="/behandlungen/rueckenschmerzen/"
                                    className="text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    Rückenschmerzen
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/behandlungen/kopfschmerzen-migraene/"
                                    className="text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    Kopfschmerzen & Migräne
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/behandlungen/verdauungsbeschwerden/"
                                    className="text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    Verdauungsbeschwerden
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/behandlungen/sportosteopathie/"
                                    className="text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    Sportosteopathie
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/behandlungen/stress-burnout/"
                                    className="text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    Stress & Burnout
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/behandlungen/nackenschmerzen/"
                                    className="text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    Nackenschmerzen & HWS
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/behandlungen/arthrose-gelenkbeschwerden/"
                                    className="text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    Arthrose & Gelenkbeschwerden
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Praxis */}
                    <div>
                        <h3 className="text-slate-900 font-semibold mb-4 font-epilogue">
                            Praxis
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="/terminbuchung/"
                                    className="text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    Termin buchen
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/blog/"
                                    className="text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <PhoneLink
                                    source="footer"
                                    className="text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    0176 4399 0001
                                </PhoneLink>
                            </li>
                            <li>
                                <EmailLink
                                    source="footer"
                                    className="text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    joshua@alsen.info
                                </EmailLink>
                            </li>
                        </ul>
                    </div>

                    {/* Standorte */}
                    <div>
                        <h3 className="text-slate-900 font-semibold mb-4 font-epilogue">
                            Standorte
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/osteopathie-rotherbaum/" className="hover:text-slate-900 transition-colors">
                                    <div className="text-slate-900 font-medium">Rotherbaum</div>
                                    <div className="text-slate-600">Rappstraße 7</div>
                                    <div className="text-slate-600">20146 Hamburg</div>
                                </Link>
                            </li>
                            <li>
                                <Link href="/osteopathie-eimsbuettel/" className="hover:text-slate-900 transition-colors">
                                    <div className="text-slate-900 font-medium">Eimsbüttel</div>
                                    <div className="text-slate-600">Stresemannallee 118</div>
                                    <div className="text-slate-600">22529 Hamburg</div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 text-sm text-slate-600">
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <p>© {new Date().getFullYear()} Osteopathie Alsen – Joshua Alsen</p>
                        <div className="flex items-center gap-4">
                            <span className="text-slate-500">Hamburg-Rotherbaum & Eimsbüttel</span>
                            <span className="text-slate-300">|</span>
                            <Link
                                href="/datenschutz/"
                                className="hover:text-slate-900 transition-colors"
                            >
                                Datenschutz
                            </Link>
                            <span className="text-slate-300">|</span>
                            <Link
                                href="/impressum/"
                                className="hover:text-slate-900 transition-colors"
                            >
                                Impressum
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
