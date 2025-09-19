const items = [
    {
        title: "Rückenschmerzen und Muskel-Skelett-Beschwerden",
        desc:
            "Osteopathie ist besonders wirksam bei Rücken-, Nacken-, Ischias- und Gelenkschmerzen sowie nach Unfällen.",
    },
    {
        title: "Kopfschmerzen und Migräne",
        desc:
            "Entspannung der Muskulatur und Verbesserung der Durchblutung können Spannungskopfschmerzen und Migräne lindern.",
    },
    {
        title: "Verdauungsprobleme",
        desc:
            "Unterstützung bei Blähungen, Verstopfung, Reizdarm, Sodbrennen und Reflux durch gezielte osteopathische Techniken.",
    },
    {
        title: "Chronische Schmerzen",
        desc:
            "Ganzheitliche Ansätze helfen, chronische Schmerzen zu lindern und die Lebensqualität zu steigern.",
    },
    { title: "Schwindel und Gleichgewicht", desc: "Verbesserung von Gleichgewicht und Linderung von Schwindel." },
    { title: "Atemwegserkrankungen", desc: "Unterstützung bei Asthma und chronischer Bronchitis." },
    {
        title: "Sportverletzungen",
        desc: "Rehabilitation und Prävention von Zerrungen, Verstauchungen und Sehnenentzündungen.",
    },
    {
        title: "Kiefergelenksbeschwerden (CMD)",
        desc: "Hilfe bei Kieferdysfunktionen, Zähneknirschen und damit verbundenen Beschwerden.",
    },
    { title: "Kinderosteopathie", desc: "Begleitung der Entwicklung, Haltung und Wachstum." },
    { title: "Altersbeschwerden", desc: "Linderung bei Arthrose, Osteoporose und Bewegungseinschränkungen." },
    {
        title: "Postoperative Rehabilitation",
        desc: "Förderung der Durchblutung und Mobilität nach Operationen.",
    },
    { title: "Long Covid und Fatigue", desc: "Anregung des Lymphflusses und Unterstützung bei Erschöpfung." },
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
