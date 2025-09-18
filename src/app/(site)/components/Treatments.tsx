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
                <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight">Osteopathische Behandlungsarten in Hamburg</h2>
                <p className="mt-4 max-w-2xl text-slate-700">
                    Eine osteopathische Behandlung basiert auf den drei fundamentalen Säulen der Osteopathie. Diese ganzheitliche
                    Herangehensweise ermöglicht es, den Körper als Einheit zu betrachten und zu behandeln.
                </p>
                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {treatments.map((t) => (
                        <div key={t.title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h3 className="text-xl font-medium text-slate-900">{t.title}</h3>
                            <p className="mt-3 text-slate-700 text-sm leading-6">{t.desc}</p>
                            <ul className="mt-4 space-y-2 text-sm text-slate-700 list-disc pl-5">
                                {t.benefits.map((b) => (
                                    <li key={b}>{b}</li>
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
