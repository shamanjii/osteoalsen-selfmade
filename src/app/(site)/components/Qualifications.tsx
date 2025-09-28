import Image from "next/image";

const fortbildungen = [
    {
        title: "Internationale Fortbildungen",
        description: "Dolmetschertätigkeit bei postgraduierten Kursen und Osteopathiekongressen mit internationalen Koryphäen der Osteopathie (2020-2024)",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
                <path d="M2 12h20" stroke="white" strokeWidth="2"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="white" strokeWidth="2"/>
            </svg>
        )
    },
    {
        title: "Kontinuierliche Weiterbildung",
        description: "Regelmäßige Teilnahme an Fortbildungen und Fachkongressen zur Sicherstellung aktueller Behandlungsmethoden",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="white" strokeWidth="2"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="white" strokeWidth="2"/>
                <line x1="10" y1="7" x2="16" y2="7" stroke="white" strokeWidth="2"/>
                <line x1="10" y1="11" x2="16" y2="11" stroke="white" strokeWidth="2"/>
                <line x1="10" y1="15" x2="16" y2="15" stroke="white" strokeWidth="2"/>
            </svg>
        )
    },
    {
        title: "Akademische Verbindung",
        description: "Enge Verbindung zur Osteopathie Schule Deutschland und Zugang zu neuesten wissenschaftlichen Erkenntnissen",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 21h18" stroke="white" strokeWidth="2"/>
                <path d="M5 21V7l8-4v18" stroke="white" strokeWidth="2"/>
                <path d="M19 21V11l-6-4" stroke="white" strokeWidth="2"/>
                <path d="M9 9v2" stroke="white" strokeWidth="2"/>
                <path d="M9 14v2" stroke="white" strokeWidth="2"/>
            </svg>
        )
    }
];

const qualityStandards = [
    {
        title: "BAO-Zertifizierung",
        description: "Ausbildung nach Standards der Bundesarbeitsgemeinschaft Osteopathie",
        icon: "✓"
    },
    {
        title: "Staatliche Anerkennung",
        description: "Heilpraktikererlaubnis nach bestandener staatlicher Prüfung",
        icon: "⚕"
    },
    {
        title: "Krankenkassen anerkannt",
        description: "Kostenerstattung durch die meisten gesetzlichen Krankenkassen",
        icon: "🏥"
    },
    {
        title: "Kontinuierliche Fortbildung",
        description: "Regelmäßige Weiterbildungen zur Qualitätssicherung",
        icon: "📈"
    }
];

export default function Qualifications() {
    return (
        <section id="qualifikationen" className="bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight font-epilogue">
                        Qualifikationen & Zertifikate
                    </h2>
                    <p className="mt-6 max-w-3xl mx-auto text-xl leading-relaxed text-slate-700">
                        Meine fundierte Ausbildung und kontinuierliche Weiterbildung stellen sicher, dass Sie eine Behandlung nach den höchsten osteopathischen Standards erhalten.
                    </p>
                </div>

                {/* Hauptausbildung */}
                <div className="mb-16">
                    <div className="bg-white p-8 sm:p-12 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start mb-8">
                            <div className="w-20 h-20 mb-4 sm:mb-0 sm:mr-8 flex-shrink-0">
                                <Image
                                    src="/assets/osd-logo.webp"
                                    alt="OSD Logo - Osteopathie Schule Deutschland"
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-contain rounded-lg"
                                />
                            </div>
                            <div className="text-center sm:text-left">
                                <h3 className="text-slate-900 text-2xl font-medium mb-2 font-epilogue">
                                    Bachelor of Science Osteopathie
                                </h3>
                                <p className="text-slate-600 text-xl font-medium">
                                    Osteopathie Schule Deutschland (OSD), Hamburg
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                <h4 className="text-slate-900 text-lg font-medium mb-2">Ausbildungsdauer</h4>
                                <p className="text-slate-600">2016 - 2020 (Vollzeitstudium)</p>
                            </div>
                            <div>
                                <h4 className="text-slate-900 text-lg font-medium mb-2">Ausbildungsumfang</h4>
                                <p className="text-slate-600">Über 5.000 Ausbildungsstunden</p>
                            </div>
                            <div>
                                <h4 className="text-slate-900 text-lg font-medium mb-2">Zertifizierung</h4>
                                <p className="text-slate-600">BAO-Zertifiziert</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Heilpraktikererlaubnis */}
                <div className="mb-16">
                    <div className="bg-white p-8 sm:p-12 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start">
                            <div className="w-20 h-20 mb-4 sm:mb-0 sm:mr-8 flex-shrink-0 bg-red-600 rounded-lg flex items-center justify-center">
                                {/* Hamburg Wappen SVG */}
                                <svg
                                    width="60"
                                    height="60"
                                    viewBox="0 0 100 120"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-white"
                                >
                                    {/* Base/Foundation */}
                                    <path d="M15 90 L85 90 L80 100 L20 100 Z" fill="white"/>

                                    {/* Main castle wall */}
                                    <rect x="20" y="70" width="60" height="20" fill="white"/>

                                    {/* Left tower */}
                                    <rect x="15" y="45" width="20" height="45" fill="white"/>
                                    {/* Left tower crown */}
                                    <path d="M12 45 L17 35 L22 40 L27 35 L32 40 L37 35 L40 45 Z" fill="white"/>

                                    {/* Center tower (tallest) */}
                                    <rect x="40" y="35" width="20" height="55" fill="white"/>
                                    {/* Center tower crown */}
                                    <path d="M37 35 L42 25 L47 30 L52 25 L57 30 L62 25 L67 35 Z" fill="white"/>

                                    {/* Right tower */}
                                    <rect x="65" y="45" width="20" height="45" fill="white"/>
                                    {/* Right tower crown */}
                                    <path d="M62 45 L67 35 L72 40 L77 35 L82 40 L87 35 L90 45 Z" fill="white"/>

                                    {/* Gate/Door */}
                                    <path d="M46 85 Q46 80 50 80 Q54 80 54 85 L54 90 L46 90 Z" fill="#dc2626"/>

                                    {/* Small details/windows */}
                                    <rect x="22" y="55" width="3" height="4" fill="#dc2626"/>
                                    <rect x="30" y="55" width="3" height="4" fill="#dc2626"/>
                                    <rect x="67" y="55" width="3" height="4" fill="#dc2626"/>
                                    <rect x="75" y="55" width="3" height="4" fill="#dc2626"/>
                                </svg>
                            </div>
                            <div className="text-center sm:text-left flex-1">
                                <h3 className="text-slate-900 text-2xl font-medium mb-2 font-epilogue">
                                    Heilpraktikererlaubnis
                                </h3>
                                <p className="text-slate-600 text-xl font-medium mb-2">
                                    Landessamt Hamburg, 2024
                                </p>
                                <p className="text-slate-600">
                                    <strong>Staatliche Prüfung in Theorie und Praxis bestanden - Mai 2024</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fortbildungen & Spezialisierungen */}
                <div className="mb-16">
                    <h3 className="text-slate-900 text-3xl font-light text-center mb-8 font-epilogue tracking-tight">
                        Fortbildungen & Spezialisierungen
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {fortbildungen.map((fortbildung, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-2 hover:border-slate-400 transition-all duration-300 cursor-pointer group transform hover:scale-105"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {fortbildung.icon}
                                </div>
                                <h4 className="text-slate-900 text-xl font-medium mb-4 font-epilogue tracking-tight">
                                    {fortbildung.title}
                                </h4>
                                <p className="text-slate-600 leading-relaxed">
                                    {fortbildung.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Qualitätssicherung & Standards */}
                <div className="qualitaet-section bg-slate-50 p-8 sm:p-12 rounded-xl border border-slate-200">
                    <h3 className="text-slate-900 text-2xl font-medium text-center mb-8 font-epilogue">
                        Qualitätssicherung & Standards
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {qualityStandards.map((standard, index) => (
                            <div key={index} className="text-center">
                                <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-white text-xl">{standard.icon}</span>
                                </div>
                                <h4 className="text-slate-900 text-lg font-medium mb-2">
                                    {standard.title}
                                </h4>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    {standard.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Kontakt-Hinweis */}
                <div className="text-center mt-12 p-8 bg-white rounded-lg border border-slate-200">
                    <p className="text-lg text-slate-700 m-0">
                        Sie haben weitere Fragen? Kontaktieren Sie mich gerne telefonisch oder schreiben Sie mir eine Mail.
                    </p>
                </div>
            </div>
        </section>
    );
}