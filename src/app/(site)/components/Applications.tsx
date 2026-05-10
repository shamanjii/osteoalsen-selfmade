const items = [
    {
        title: "Rückenschmerzen und Muskel-Skelett-Beschwerden",
        desc:
            "Osteopathie kann unterstützend wirken bei Rücken-, Nacken-, Ischias- und Gelenkschmerzen sowie nach Unfällen.",
    },
    {
        title: "Kopfschmerzen und Migräne",
        desc:
            "Entspannung der Muskulatur und Verbesserung der Durchblutung können bei Spannungskopfschmerzen und Migräne unterstützend wirken.",
    },
    {
        title: "Verdauungsprobleme",
        desc:
            "Begleitende Unterstützung bei Blähungen, Verstopfung, Reizdarm, Sodbrennen und Reflux durch osteopathische Techniken.",
    },
    {
        title: "Chronische Schmerzen",
        desc:
            "Ganzheitliche Ansätze können ergänzend wirken, um chronische Schmerzen zu lindern und die Lebensqualität zu unterstützen.",
    },
    { title: "Schwindel und Gleichgewicht", desc: "Kann unterstützend wirken bei Gleichgewichtsproblemen und Schwindel." },
    {
        title: "Sportverletzungen",
        desc: "Begleitende Unterstützung bei Rehabilitation und Prävention von Zerrungen, Verstauchungen und Sehnenentzündungen.",
    },
    {
        title: "Kiefergelenksbeschwerden (CMD)",
        desc: "Kann unterstützend wirken bei Kieferdysfunktionen, Zähneknirschen und damit verbundenen Beschwerden.",
    },
    {
        title: "Beschwerden im Alter",
        desc: "Kann ergänzend wirken bei Arthrose und Bewegungseinschränkungen.",
    },
    {
        title: "Postoperative Rehabilitation",
        desc: "Begleitend zu Physiotherapie und medizinischer Reha können osteopathische Techniken Durchblutung und Mobilität unterstützen.",
    },
    {
        title: "Long Covid und Fatigue",
        desc: "Begleitende Unterstützung bei Erschöpfung — ergänzend zur medizinischen Hauptbehandlung.",
    },
];

export default function Applications() {
    return (
        <section id="anwendungsbereiche" className="bg-slate-50 py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <p className="uppercase tracking-wider text-slate-500 font-medium">Vielseitige Behandlungsmöglichkeiten</p>
                    <h2 className="mt-2 text-3xl sm:text-4xl font-light text-slate-900 tracking-tight">
                        Anwendungsbereiche der Osteopathie in Hamburg
                    </h2>
                    <p className="mt-4 text-slate-700">
                        Osteopathie kann bei einer Vielzahl von Beschwerden und Zuständen hilfreich sein.
                    </p>
                </div>
                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((it) => (
                        <div key={it.title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h3 className="text-lg font-medium text-slate-900">{it.title}</h3>
                            <p className="mt-2 text-sm text-slate-700 leading-6">{it.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
