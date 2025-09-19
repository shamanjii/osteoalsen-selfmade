import Image from "next/image";

const benefits = [
    { title: "Schmerzlinderung", icon: "pain" },
    { title: "Lösen von Blockaden", icon: "wave" },
    { title: "Verbesserte Zirkulation", icon: "flow" },
    { title: "Ganzheitliche Gesundheitsoptimierung", icon: "target" },
];

export default function AboutOsteopathie() {
    return (
        <section id="was-ist-osteopathie" className="bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
                    {/* Mobile: Foto vor dem Text */}
                    <div className="relative h-[400px] overflow-hidden rounded-xl lg:hidden">
                        <Image src="/assets/joshua-alsen-profil.jpg" alt="Joshua Alsen Profilfoto" fill className="object-cover" priority />
                    </div>

                    <div className="lg:col-span-3">
                        <p className="uppercase tracking-wider text-slate-500 font-medium text-sm">Mein Name ist Joshua Alsen</p>
                        <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 tracking-tight font-epilogue">Was ist Osteopathie?</h2>
                        <div className="mt-8 space-y-6 text-slate-700 leading-loose text-lg">
                            <p>
                                Osteopathie ist eine eigenständige Form der Medizin, die auf der grundlegenden Überzeugung basiert,
                                dass alle Teile des Organismus in einer wechselseitigen Beziehung zueinander stehen.
                            </p>
                            <p>
                                In meiner Osteopathie-Praxis in Hamburg-Rotherbaum und Eimsbüttel nutze ich evidenzbasierte
                                osteopathische Techniken, um die Harmonie von Struktur und Funktion des Körpers zu fördern,
                                die Zirkulation zu verbessern und Barrieren für die Selbstregulation zu beseitigen.
                            </p>
                            <p className="text-slate-600 italic">
                                Als VFO-zertifizierter Osteopath arbeite ich nach den höchsten Standards der modernen Osteopathie
                                und verbinde traditionelle Ansätze mit aktuellsten wissenschaftlichen Erkenntnissen.
                            </p>
                        </div>

                        <div className="mt-12 grid sm:grid-cols-2 gap-4">
                            {benefits.map((b) => (
                                <div key={b.title} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                    <div className="h-10 w-10 rounded-full bg-slate-900 text-white grid place-items-center text-sm font-medium">★</div>
                                    <span className="text-slate-900 text-lg font-medium">{b.title}</span>
                                </div>
                            ))}
                        </div>

                    </div>

                    {/* Desktop: Foto nach dem Text */}
                    <div className="relative lg:col-span-2 h-[500px] lg:h-[700px] overflow-hidden rounded-xl hidden lg:block">
                        <Image src="/assets/joshua-alsen-profil.jpg" alt="Joshua Alsen - Osteopath und Heilpraktiker in Hamburg" fill className="object-cover" priority />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                            <div className="text-white">
                                <h3 className="text-xl font-semibold font-epilogue">Joshua Alsen</h3>
                                <p className="text-slate-200">Heilpraktiker & Osteopath in Hamburg</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
