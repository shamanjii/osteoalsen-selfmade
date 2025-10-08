import Link from "next/link";

export default function SiteFooter() {
    return (
        <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 text-sm text-slate-600">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <p>© {new Date().getFullYear()} Osteopathie Alsen – Joshua Alsen</p>
                    <div className="flex items-center gap-4">
                        <span className="text-slate-500">Hamburg</span>
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
        </footer>
    );
}
