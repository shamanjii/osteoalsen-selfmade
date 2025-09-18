import Image from "next/image";

export default function AboutMe() {
    return (
        <section id="ueber-mich" className="bg-slate-50 py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight">Über mich</h2>
                <div className="mt-8 grid lg:grid-cols-[320px,1fr] gap-10 items-start">
                    <div className="relative h-80 rounded-lg overflow-hidden">
                        <Image src="/assets/joshua-alsen-dozent.jpeg" alt="Joshua Alsen" fill className="object-cover" />
                    </div>
                    <div className="space-y-4 text-slate-700">
                        <p>
                            Geboren und aufgewachsen in Hamburg. Zur Osteopathie führte mich die Krebserkrankung meines Stiefvaters.
                            Anstelle eines Medizinstudiums studierte ich in Vollzeit Osteopathie an der Osteopathie Schule Deutschland.
                        </p>
                        <p>
                            Nach dem Abschluss 2020 blieb ich an der Universität als Dolmetscher für postgraduierte Kurse und Kongresse
                            und arbeitete mit internationalen Koryphäen der Osteopathie zusammen. 2024 bestand ich die
                            Heilpraktikerprüfung und gründete meine eigene Praxis in Hamburg.
                        </p>
                    </div>
                </div>

                <div className="mt-12 rounded-xl border border-slate-200 bg-white p-6 flex flex-col md:flex-row gap-6 items-start">
                    <div className="relative w-40 h-40 shrink-0 self-center md:self-start">
                        <Image src="/assets/vfo-logo.jpeg" alt="VFO Logo" fill className="object-contain rounded" />
                    </div>
                    <div className="text-slate-700">
                        <h3 className="text-lg font-medium text-slate-900">Zertifiziertes Mitglied im Verband Freier Osteopathen e.V.</h3>
                        <p className="mt-2">
                            Als Praxismitglied im VFO profitieren Patientinnen und Patienten von Qualitätsstandards eines anerkannten
                            Berufsverbands. Die Mitgliedschaft gewährleistet regelmäßige Fortbildungen, ethische Richtlinien und
                            bildet die Grundlage für Kostenerstattung durch viele Krankenkassen.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
