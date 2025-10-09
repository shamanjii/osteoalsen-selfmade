import Link from "next/link";

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
                                    href="/was-ist-osteopathie"
                                    className="text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    Was ist Osteopathie?
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/kosten-ablauf"
                                    className="text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    Kosten & Ablauf
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/faq"
                                    className="text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    Häufige Fragen
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/ueber-mich"
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
                                    href="/behandlungen/rueckenschmerzen"
                                    className="text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    Rückenschmerzen
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/behandlungen/kopfschmerzen-migraene"
                                    className="text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    Kopfschmerzen & Migräne
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/behandlungen/verdauungsbeschwerden"
                                    className="text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    Verdauungsbeschwerden
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/behandlungen/sportosteopathie"
                                    className="text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    Sportosteopathie
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/behandlungen/stress-burnout"
                                    className="text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    Stress & Burnout
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/behandlungen/schwangerschaft"
                                    className="text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    Schwangerschaft & Postpartal
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
                                    href="/terminbuchung"
                                    className="text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    Termin buchen
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/blog"
                                    className="text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="tel:+4917643990001"
                                    className="text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    0176 4399 0001
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:joshua@alsen.info"
                                    className="text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    joshua@alsen.info
                                </a>
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
                                <div className="text-slate-900 font-medium">Rotherbaum</div>
                                <div className="text-slate-600">Rappstraße 7</div>
                                <div className="text-slate-600">20146 Hamburg</div>
                            </li>
                            <li>
                                <div className="text-slate-900 font-medium">Eimsbüttel</div>
                                <div className="text-slate-600">Eppendorfer Weg 171</div>
                                <div className="text-slate-600">20253 Hamburg</div>
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
                                href="/datenschutz"
                                className="hover:text-slate-900 transition-colors"
                            >
                                Datenschutz
                            </Link>
                            <span className="text-slate-300">|</span>
                            <Link
                                href="/impressum"
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
