import Link from "next/link";

const treatments = [
    {
        title: "Rückenschmerzen",
        desc: "Ganzheitliche Behandlung bei akuten und chronischen Rückenschmerzen. Von Verspannungen bis Bandscheibenproblematik.",
        icon: "🦴",
        href: "/behandlungen/rueckenschmerzen",
    },
    {
        title: "Kopfschmerzen & Migräne",
        desc: "Sanfte Behandlung von Spannungskopfschmerzen, Migräne und Kieferbeschwerden durch manuelle Techniken.",
        icon: "🧠",
        href: "/behandlungen/kopfschmerzen-migraene",
    },
    {
        title: "Verdauungsbeschwerden",
        desc: "Osteopathische Hilfe bei Reizdarm, Blähungen und Verdauungsproblemen. Viszerale Osteopathie für den Bauchraum.",
        icon: "🫁",
        href: "/behandlungen/verdauungsbeschwerden",
    },
    {
        title: "Sportverletzungen",
        desc: "Schnelle Regeneration und Prävention bei Sportverletzungen. Von Zerrungen bis zur Wettkampfvorbereitung.",
        icon: "⚽",
        href: "/behandlungen/sportverletzungen",
    },
    {
        title: "Stress & Burnout",
        desc: "Behandlung stressbedingter Beschwerden und Erschöpfung. Regulation des vegetativen Nervensystems.",
        icon: "🧘",
        href: "/behandlungen/stress-burnout",
    },
    {
        title: "Schwangerschaft",
        desc: "Begleitung während und nach der Schwangerschaft. Beckenbodenprobleme, Rückenschmerzen und Geburtsvorbereitung.",
        icon: "🤰",
        href: "/behandlungen/schwangerschaft",
    },
];

export default function Treatments() {
    return (
        <section id="behandlungen" className="bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight font-epilogue">Behandlungsschwerpunkte</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-slate-700 text-lg leading-relaxed">
                        Ganzheitliche osteopathische Behandlungen für verschiedene Beschwerdebilder.
                        Jeder Mensch ist einzigartig – deshalb passe ich die Behandlung individuell an Ihre Bedürfnisse an.
                    </p>
                </div>
                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {treatments.map((t) => (
                        <Link key={t.title} href={t.href} className="group">
                            <div className="treatment-card relative bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                {/* Icon */}
                                <div className="text-4xl mb-4">{t.icon}</div>

                                {/* Title */}
                                <h3 className="text-xl font-semibold text-slate-900 font-epilogue mb-3 group-hover:text-slate-700 transition-colors">{t.title}</h3>

                                {/* Description */}
                                <p className="text-slate-600 leading-relaxed mb-4">{t.desc}</p>

                                {/* CTA */}
                                <div className="flex items-center text-slate-900 font-medium group-hover:gap-2 transition-all">
                                    <span>Mehr erfahren</span>
                                    <span className="ml-1 group-hover:ml-0 transition-all">→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* View All Link */}
                <div className="mt-12 text-center">
                    <Link
                        href="/behandlungen"
                        className="inline-flex items-center bg-slate-900 text-white px-8 py-4 rounded-lg font-epilogue font-semibold hover:bg-slate-800 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                    >
                        Alle Behandlungen ansehen
                    </Link>
                </div>
            </div>
        </section>
    );
}
