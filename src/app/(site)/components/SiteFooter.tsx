export default function SiteFooter() {
    return (
        <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 text-sm text-slate-600 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <p>© {new Date().getFullYear()} Osteopathie Alsen – Joshua Alsen</p>
                <div className="text-slate-500">Hamburg</div>
            </div>
        </footer>
    );
}
