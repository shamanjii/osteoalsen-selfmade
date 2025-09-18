export default function HeroSection() {
    return (
        <section id="home" className="bg-slate-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
                <div className="max-w-3xl">
                    <h1 className="font-epilogue text-slate-900 text-4xl sm:text-5xl tracking-tight font-light">
                        Osteopathie Hamburg
                        <br />
                        <span className="font-normal">Joshua Alsen</span>
                    </h1>
                    <p className="mt-4 text-slate-600 text-lg">
                        Heilpraktiker &amp; Osteopath in Hamburg Mitte
                    </p>
                    <p className="mt-6 text-slate-700 text-base sm:text-lg leading-7">
                        In meiner Heilpraxis für Osteopathie in Hamburg biete ich osteopathische Behandlungen für gesetzlich
                        Versicherte, Privatpatienten und Selbstzahler an. Lassen Sie uns gemeinsam Ihre natürliche Balance
                        wiederherstellen.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <a href="#kontakt" className="inline-flex items-center rounded-md bg-slate-900 text-white px-5 py-2.5 hover:bg-slate-800">
                            Termin vereinbaren
                        </a>
                        <a href="#behandlungen" className="inline-flex items-center rounded-md border border-slate-300 text-slate-900 px-5 py-2.5 hover:bg-white">
                            Mehr erfahren
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
