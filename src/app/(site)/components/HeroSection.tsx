import Link from "next/link";

export default function HeroSection() {
    return (
        <section id="home" className="bg-white pt-16 md:pt-24">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-20 text-center">
                <div className="mx-auto max-w-3xl">
                    <h1 className="font-epilogue text-slate-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-light leading-tight mb-4">
                        Osteopathie Hamburg:<br />
                        <Link href="/osteopathie-rotherbaum" className="text-slate-900 hover:text-slate-600 transition-colors">Rotherbaum</Link> &amp; <Link href="/osteopathie-eimsbuettel" className="text-slate-900 hover:text-slate-600 transition-colors">Eimsbüttel</Link>
                        <br />
                        <span className="font-normal">Joshua Alsen</span>
                    </h1>
                    <h2 className="mt-6 text-slate-600 text-lg sm:text-xl md:text-2xl font-light">
                        VFO-zertifizierter<br />
                        Heilpraktiker &amp; Osteopath<br />
                        in Hamburg
                    </h2>
                    <p className="mt-10 text-slate-700 text-base sm:text-lg md:text-xl leading-7 max-w-2xl mx-auto">
                        Osteopathie Hamburg – In meiner Praxis in{" "}
                        <Link href="/osteopathie-rotherbaum" className="text-slate-900 hover:text-slate-600 font-medium underline decoration-1 underline-offset-2">
                            Rotherbaum
                        </Link>{" "}und{" "}
                        <Link href="/osteopathie-eimsbuettel" className="text-slate-900 hover:text-slate-600 font-medium underline decoration-1 underline-offset-2">
                            Eimsbüttel
                        </Link>{" "}biete ich ganzheitliche osteopathische
                        Behandlungen an. Als VFO-zertifizierter Osteopath und Heilpraktiker unterstütze ich gesetzlich Versicherte,
                        Privatpatienten und Selbstzahler dabei, ihre natürliche Balance wiederzufinden. Termine oft binnen 48 Stunden verfügbar.
                    </p>
                    <div className="mt-12 flex flex-col sm:flex-row gap-5 justify-center items-center">
                        <a
                            href="/terminbuchung"
                            className="hero-btn-primary group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold text-white bg-slate-900 rounded-md overflow-hidden transition-all duration-300 hover:bg-slate-800 hover:transform hover:-translate-y-1 hover:shadow-xl"
                        >
                            <span className="relative z-10">Termin vereinbaren</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </a>
                        <a
                            href="#behandlungen"
                            className="hero-btn-secondary group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold text-slate-900 bg-white border-2 border-slate-900 rounded-md transition-all duration-300 hover:bg-slate-900 hover:text-white hover:transform hover:-translate-y-1 hover:shadow-lg"
                        >
                            <span className="relative z-10">Mehr erfahren</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
