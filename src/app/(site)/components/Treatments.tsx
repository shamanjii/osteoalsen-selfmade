const treatments = [
    {
        title: "Craniosakrale Osteopathie",
        desc:
            "Sanfte Manipulationen am Schädel und an der Wirbelsäule, die darauf abzielen, das Nervensystem zu harmonisieren und Heilungsprozesse zu unterstützen.",
        benefits: [
            "Entspannung des zentralen Nervensystems",
            "Verbesserung der Hirndurchblutung",
            "Linderung von Kopfschmerzen und Migräne",
            "Reduktion von Stress und Anspannung",
        ],
    },
    {
        title: "Viszerale Osteopathie",
        desc:
            "Manuelle Techniken, die auf die inneren Organe abzielen, um Funktionsstörungen zu korrigieren und die Organgesundheit zu fördern.",
        benefits: [
            "Optimierung der Organfunktion",
            "Verbesserung der Verdauung",
            "Förderung der Durchblutung",
            "Lösung von Verklebungen und Verwachsungen",
        ],
    },
    {
        title: "Parietale Osteopathie",
        desc:
            "Verwendung von Techniken wie Gelenkmobilisation und -manipulation, um Bewegungseinschränkungen in Gelenken und Wirbelsäule zu verbessern.",
        benefits: [
            "Wiederherstellung der Beweglichkeit",
            "Schmerzlinderung in Gelenken",
            "Entspannung der Muskulatur",
            "Verbesserung der Körperhaltung",
        ],
    },
];

export default function Treatments() {
    return (
        <section id="behandlungen" className="py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight font-epilogue">Osteopathische Behandlungsarten in Hamburg</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-slate-700 text-lg leading-relaxed">
                        Eine osteopathische Behandlung basiert auf den drei fundamentalen Säulen der Osteopathie. Diese ganzheitliche
                        Herangehensweise ermöglicht es, den Körper als Einheit zu betrachten und zu behandeln.
                    </p>
                </div>
                <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {treatments.map((t, index) => (
                        <div key={t.title} className="treatment-card group relative bg-white rounded-xl border border-slate-200 p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            {/* Treatment Header with Number */}
                            <div className="treatment-header flex items-center mb-6">
                                <div className="treatment-number flex-shrink-0 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center font-epilogue font-semibold text-lg mr-4 group-hover:bg-slate-800 transition-colors duration-300">
                                    <span>{index + 1}</span>
                                </div>
                                <h3 className="text-xl font-semibold text-slate-900 font-epilogue">{t.title}</h3>
                            </div>

                            {/* Description */}
                            <p className="text-slate-700 leading-relaxed mb-6">{t.desc}</p>

                            {/* Benefits List */}
                            <ul className="space-y-3 text-slate-700">
                                {t.benefits.map((b) => (
                                    <li key={b} className="flex items-start">
                                        <span className="flex-shrink-0 w-2 h-2 bg-slate-400 rounded-full mt-2 mr-3"></span>
                                        <span className="text-sm leading-relaxed">{b}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="mt-10 rounded-lg border border-slate-200 bg-slate-50 p-6">
                    <h3 className="text-lg font-medium text-slate-900">Ganzheitliche Integration</h3>
                    <p className="mt-2 text-slate-700 text-sm">
                        Der menschliche Körper funktioniert als Einheit. Deshalb kombiniere ich in jeder Behandlung alle drei
                        osteopathischen Bereiche, um nachhaltige Ergebnisse zu erzielen.
                    </p>
                </div>
            </div>
        </section>
    );
}
