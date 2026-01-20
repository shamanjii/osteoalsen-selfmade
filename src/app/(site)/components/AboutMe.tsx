import Image from "next/image";
import Link from "next/link";
import { assetPath, linkPath } from "@/lib/basePath";

export default function AboutMe() {
    return (
        <section id="ueber-mich" className="bg-slate-50 py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight font-epilogue">Über mich</h2>
                    <h3 className="mt-4 text-xl text-slate-700 font-medium">Joshua Alsen - Osteopath in Hamburg</h3>
                </div>
                <div className="relative">
                    {/* Mobile: Image above text */}
                    <div className="relative h-80 rounded-lg overflow-hidden mb-6 lg:hidden">
                        <Image src={assetPath("/assets/joshua-alsen-dozent.webp")} alt="Joshua Alsen" fill className="object-cover" />
                    </div>

                    {/* Desktop: Floating image with text wrap */}
                    <div className="hidden lg:block lg:float-left lg:mr-8 lg:mb-6 lg:w-80 lg:h-[28rem] relative rounded-lg overflow-hidden">
                        <Image src={assetPath("/assets/joshua-alsen-dozent.webp")} alt="Joshua Alsen" fill className="object-cover" />
                    </div>

                    <div className="space-y-6 text-slate-700 text-lg leading-relaxed">
                        <p>
                            Geboren und aufgewachsen bin ich in Hamburg. Zur Osteopathie führte mich damals die Krebserkrankung meines Stiefvaters. Ich befand mich im Abitur und verbrachte mit ihm viel Zeit in Krankenhäusern. Während in mir der Wunsch wuchs, mich mit dem Thema Gesundheit zu beschäftigen, sank in mir die Befriedigung bei dem Gedanken, mich beruflich permanent in der Umgebung von Krankenhäusern zu bewegen.
                        </p>
                        <p>
                            Nachdem ich mein Abitur 2015 beendet habe entschied ich mich gegen ein Medizinstudium und studierte stattdessen Osteopathie in Vollzeit an der Osteopathie Schule Deutschland. Eine Alternative zur allopathischen Medizin, die auf philosophischen Prinzipien beruht und davon ausgeht, dass der Körper zur Selbstheilung fähig ist, entfachte Begeisterung in mir.
                        </p>
                        <p>
                            Nach einer fundierten Ausbildung akademischer Osteopathie in Hamburg, blieb ich nach dem Abschluss meines Studiums im Oktober 2020 weiterhin an meiner Universität und arbeitete als Dolmetscher im Rahmen postgraduierter Kurse und Osteopathiekongressen eng mit zahlreichen internationalen Koryphäen der Osteopathie zusammen.
                        </p>
                        <p>
                            Nach dem Bestehen meiner Heilpraktikerprüfung im Mai 2024 entschied ich mich, meinen Fokus auf den klinischen Alltag zu richten und mich mit einer eigenen Praxis selbstständig zu machen. Seitdem praktiziere ich mit großer Freude und Hingabe in meiner eigenen Praxis für Osteopathie in Hamburg.
                        </p>
                    </div>

                    {/* Clear float */}
                    <div className="clear-both"></div>
                </div>

                <div className="mt-12 rounded-xl border border-slate-200 bg-white p-6 flex flex-col md:flex-row gap-6 items-start">
                    <div className="relative w-40 h-40 shrink-0 self-center md:self-start">
                        <Image src={assetPath("/assets/vfo-logo.webp")} alt="VFO Logo" fill className="object-contain rounded" />
                    </div>
                    <div className="text-slate-700">
                        <h3 className="text-lg font-medium text-slate-900">Zertifiziertes Mitglied im Verband Freier Osteopathen e.V.</h3>
                        <p className="mt-2 leading-relaxed">
                            Als osteopathisches Praxismitglied im Verband Freier Osteopathen e.V. (VFO) profitieren Sie von den zahlreichen Vorteilen eines anerkannten Berufsverbands. Die Mitgliedschaft gewährleistet nicht nur eine regelmäßige Qualitätssicherung durch fortlaufende Fortbildungen und strenge Ethikrichtlinien, sondern ermöglicht auch die Abrechnung mit den Kassen.
                        </p>
                    </div>
                </div>

                {/* CTA Link to full about page */}
                <div className="mt-8 text-center">
                    <Link
                        href={linkPath("/ueber-mich/")}
                        className="inline-flex items-center text-slate-900 font-medium hover:text-slate-700 transition-colors group"
                    >
                        Mehr über mich erfahren
                        <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
