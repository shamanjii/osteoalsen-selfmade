export default function ContactSection() {
    return (
        <section id="kontakt" className="py-16 sm:py-24 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight">Kontakt & Standorte</h2>
                <p className="mt-4 text-slate-700 max-w-2xl">
                    Termine nach Vereinbarung. Behandlungsdauer 45–60 Minuten, Honorar 150 €.
                </p>
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-200 p-6">
                        <h3 className="text-lg font-medium text-slate-900">Rotherbaum</h3>
                        <p className="mt-2 text-slate-700">Rappstraße 7, 20146 Hamburg</p>
                    </div>
                    <div className="rounded-xl border border-slate-200 p-6">
                        <h3 className="text-lg font-medium text-slate-900">Eimsbüttel</h3>
                        <p className="mt-2 text-slate-700">Stresemannallee 118, 22529 Hamburg</p>
                    </div>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                    <a href="tel:+4917643990001" className="inline-flex items-center rounded-md border border-slate-300 px-5 py-2.5 text-slate-900 hover:bg-slate-50">
                        Anrufen
                    </a>
                    <a href="mailto:kontakt@osteoalsen.de" className="inline-flex items-center rounded-md border border-slate-300 px-5 py-2.5 text-slate-900 hover:bg-slate-50">
                        E-Mail senden
                    </a>
                </div>
            </div>
        </section>
    );
}
