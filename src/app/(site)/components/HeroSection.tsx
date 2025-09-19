export default function HeroSection() {
    return (
        <section id="home" className="bg-white">
            <div className="mx-auto max-w-4xl px-8 sm:px-12 py-12 sm:py-20 text-center">
                <div className="mx-auto max-w-3xl">
                    <h1 className="font-epilogue text-slate-900 text-4xl sm:text-5xl lg:text-6xl tracking-tight font-light leading-tight mb-4">
                        Osteopathie Hamburg:<br />
                        Rotherbaum &amp; Eimsbüttel
                        <br />
                        <span className="font-normal">Joshua Alsen</span>
                    </h1>
                    <h2 className="mt-6 text-slate-600 text-xl sm:text-2xl font-light">
                        VFO-zertifizierter<br />
                        Heilpraktiker &amp; Osteopath<br />
                        in Hamburg
                    </h2>
                    <p className="mt-10 text-slate-700 text-lg sm:text-xl leading-8 max-w-2xl mx-auto">
                        In meiner Osteopathie-Praxis in Hamburg-Rotherbaum und Eimsbüttel biete ich ganzheitliche osteopathische
                        Behandlungen an. Als VFO-zertifizierter Osteopath unterstütze ich gesetzlich Versicherte, Privatpatienten
                        und Selbstzahler dabei, ihre natürliche Balance wiederzufinden.
                    </p>
                    <div className="mt-12 flex flex-col sm:flex-row gap-5 justify-center items-center">
                        <a
                            href="#kontakt"
                            className="hero-btn-primary group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-slate-900 rounded-md overflow-hidden transition-all duration-300 hover:bg-slate-800 hover:transform hover:-translate-y-1 hover:shadow-xl"
                        >
                            <span className="relative z-10">Termin vereinbaren</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </a>
                        <a
                            href="#behandlungen"
                            className="hero-btn-secondary group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-slate-900 bg-white border-2 border-slate-900 rounded-md transition-all duration-300 hover:bg-slate-900 hover:text-white hover:transform hover:-translate-y-1 hover:shadow-lg"
                        >
                            <span className="relative z-10">Mehr erfahren</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
