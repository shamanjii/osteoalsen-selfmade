import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import SiteHeader from "@/app/(site)/components/SiteHeader";
import SiteFooter from "@/app/(site)/components/SiteFooter";

export const metadata: Metadata = {
  title: "Wissenschaft & Forschung | Osteopathie Hamburg - Joshua Alsen",
  description:
    "Was sagt die Wissenschaft zur Osteopathie? Aktuelle Studien, Forschungsergebnisse und evidenzbasierte Fakten zur Wirksamkeit osteopathischer Behandlungen.",
  keywords: [
    "Osteopathie Studien",
    "Osteopathie Forschung",
    "Osteopathie wissenschaftlich",
    "Evidence based Osteopathie",
    "Osteopathie Wirksamkeit",
    "Osteopathie Evidenz",
  ],
  alternates: { canonical: "/wissen" },
  openGraph: {
    title: "Wissenschaft & Forschung | Osteopathie Hamburg",
    description:
      "Was sagt die Wissenschaft zur Osteopathie? Aktuelle Studien und Forschungsergebnisse zur Wirksamkeit.",
    url: "/wissen",
    siteName: "Osteopathie Hamburg - Joshua Alsen",
    images: [
      {
        url: "/assets/joshua-alsen-osteopath-hamburg-og.webp",
        width: 1200,
        height: 630,
        alt: "Wissenschaft & Forschung - Osteopathie Hamburg",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wissenschaft & Forschung | Osteopathie Hamburg",
    description:
      "Was sagt die Wissenschaft zur Osteopathie? Aktuelle Studien und Forschungsergebnisse.",
    images: ["/assets/joshua-alsen-osteopath-hamburg-twitter.webp"],
  },
};

export default function WissenschaftPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <Breadcrumbs items={[{ label: "Wissenschaft & Forschung" }]} />

        {/* Hero Section */}
        <section className="bg-white pt-8 pb-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 lg:px-12 text-center">
            <div className="mx-auto max-w-3xl">
              <h1 className="font-epilogue text-slate-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-light leading-tight mb-6">
                Wissenschaft & Forschung
              </h1>
              <p className="text-slate-600 text-lg sm:text-xl md:text-2xl font-light leading-relaxed">
                Was sagt die Forschung zur Wirksamkeit der Osteopathie?
                Evidenzbasierte Fakten und aktuelle Studienlage.
              </p>
            </div>
          </div>
        </section>

        {/* Einleitung */}
        <section className="bg-slate-50 py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="bg-gradient-to-r from-blue-50 to-white border border-blue-200 rounded-xl p-8">
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-4 font-epilogue">
                Osteopathie und Evidence-Based Practice
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Als wissenschaftlich denkender Osteopath ist es mir wichtig, evidenzbasiert zu arbeiten.
                Das bedeutet: Ich kombiniere die <strong>besten verfügbaren wissenschaftlichen Erkenntnisse</strong> mit
                meiner <strong>klinischen Erfahrung</strong> und Ihren <strong>individuellen Bedürfnissen</strong>.
              </p>
              <p className="text-slate-700 leading-relaxed">
                In den letzten Jahren hat die wissenschaftliche Forschung zur Osteopathie deutlich zugenommen.
                Hier finden Sie einen Überblick über aktuelle Studien und Forschungsergebnisse.
              </p>
            </div>
          </div>
        </section>

        {/* Studienlage */}
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight mb-12 font-epilogue">
              Aktuelle Studienlage
            </h2>

            <div className="space-y-8">
              {/* Rückenschmerzen */}
              <div className="bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-lg p-6 sm:p-8">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4 font-epilogue flex items-center gap-3">
                  <span className="text-3xl">🦴</span>
                  Rückenschmerzen
                </h3>
                <div className="space-y-4 text-slate-700">
                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <h4 className="font-semibold text-slate-900 mb-2">
                      Cochrane Review 2021
                    </h4>
                    <p className="mb-2">
                      Eine systematische Übersichtsarbeit der renommierten Cochrane Collaboration untersuchte
                      die Wirksamkeit manueller Therapien bei chronischen Rückenschmerzen.
                    </p>
                    <p className="text-sm text-slate-600">
                      <strong>Ergebnis:</strong> Manuelle Therapien (inkl. Osteopathie) zeigten
                      signifikante Verbesserungen bei Schmerz und Funktionsfähigkeit im Vergleich zu
                      Placebo oder keiner Behandlung.
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <h4 className="font-semibold text-slate-900 mb-2">
                      OSTPAC-Studie (2013)
                    </h4>
                    <p className="mb-2">
                      Randomisierte kontrollierte Studie mit 455 Patienten mit chronischen Rückenschmerzen.
                    </p>
                    <p className="text-sm text-slate-600">
                      <strong>Ergebnis:</strong> Osteopathische Behandlung führte zu signifikanter
                      Schmerzreduktion und verbesserter Lebensqualität über 12 Monate.
                    </p>
                  </div>
                </div>
              </div>

              {/* Kopfschmerzen & Migräne */}
              <div className="bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-lg p-6 sm:p-8">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4 font-epilogue flex items-center gap-3">
                  <span className="text-3xl">🧠</span>
                  Kopfschmerzen & Migräne
                </h3>
                <div className="space-y-4 text-slate-700">
                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <h4 className="font-semibold text-slate-900 mb-2">
                      Systematic Review 2019
                    </h4>
                    <p className="mb-2">
                      Übersichtsarbeit zu manuellen Therapien bei Migräne und Spannungskopfschmerzen.
                    </p>
                    <p className="text-sm text-slate-600">
                      <strong>Ergebnis:</strong> Manuelle Therapien zeigten positive Effekte auf
                      Häufigkeit, Intensität und Dauer von Kopfschmerzen, besonders bei
                      zervikogenem Kopfschmerz und Spannungskopfschmerz.
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <h4 className="font-semibold text-slate-900 mb-2">
                      Craniosacrale Therapie bei Migräne (2016)
                    </h4>
                    <p className="mb-2">
                      Klinische Studie zur Wirksamkeit kraniosacraler Techniken bei Migräne.
                    </p>
                    <p className="text-sm text-slate-600">
                      <strong>Ergebnis:</strong> Signifikante Reduktion von Migräneattacken und
                      verbesserter Lebensqualität nach 8 Wochen Behandlung.
                    </p>
                  </div>
                </div>
              </div>

              {/* Säuglinge & Kinder */}
              <div className="bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-lg p-6 sm:p-8">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4 font-epilogue flex items-center gap-3">
                  <span className="text-3xl">👶</span>
                  Säuglinge & Kinder
                </h3>
                <div className="space-y-4 text-slate-700">
                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <h4 className="font-semibold text-slate-900 mb-2">
                      Säuglingskolik-Studie (2012)
                    </h4>
                    <p className="mb-2">
                      Randomisierte Kontrollstudie zur osteopathischen Behandlung von Säuglingskoliken.
                    </p>
                    <p className="text-sm text-slate-600">
                      <strong>Ergebnis:</strong> Osteopathische Behandlung führte zu signifikanter
                      Reduktion der Schreizeiten bei Säuglingen mit Dreimonatskoliken.
                    </p>
                  </div>
                </div>
              </div>

              {/* Viszerale Osteopathie */}
              <div className="bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-lg p-6 sm:p-8">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4 font-epilogue flex items-center gap-3">
                  <span className="text-3xl">🫁</span>
                  Viszerale Osteopathie
                </h3>
                <div className="space-y-4 text-slate-700">
                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <h4 className="font-semibold text-slate-900 mb-2">
                      IBS-Studie (Reizdarm) 2015
                    </h4>
                    <p className="mb-2">
                      Klinische Studie zur viszeralen Osteopathie bei Reizdarmsyndrom.
                    </p>
                    <p className="text-sm text-slate-600">
                      <strong>Ergebnis:</strong> Patienten mit IBS zeigten nach viszeraler
                      osteopathischer Behandlung signifikante Verbesserungen bei Schmerz,
                      Blähungen und Lebensqualität.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Wirkmechanismen */}
        <section className="bg-slate-50 py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight mb-8 font-epilogue">
              Wie wirkt Osteopathie?
            </h2>
            <p className="text-slate-700 leading-relaxed mb-8">
              Die Forschung identifiziert mehrere Wirkmechanismen der Osteopathie:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3 font-epilogue">
                  🧬 Neurophysiologische Effekte
                </h3>
                <p className="text-slate-700 text-sm">
                  Manuelle Techniken beeinflussen das autonome Nervensystem,
                  reduzieren Stresshormone (Cortisol) und fördern die Ausschüttung
                  von Endorphinen (körpereigene Schmerzmittel).
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3 font-epilogue">
                  🩺 Biomechanische Verbesserungen
                </h3>
                <p className="text-slate-700 text-sm">
                  Verbesserung der Gelenkbeweglichkeit, Reduktion muskulärer Verspannungen
                  und Optimierung der Körperhaltung führen zu besserer Funktion und
                  weniger Schmerzen.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3 font-epilogue">
                  🫀 Durchblutungsförderung
                </h3>
                <p className="text-slate-700 text-sm">
                  Osteopathische Techniken verbessern die Durchblutung und den lymphatischen
                  Abfluss, was die Versorgung von Geweben mit Nährstoffen und den Abtransport
                  von Stoffwechselprodukten optimiert.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3 font-epilogue">
                  🧘 Fasziale Entspannung
                </h3>
                <p className="text-slate-700 text-sm">
                  Behandlung des faszialen Bindegewebes löst Verklebungen und Spannungen,
                  die zu Schmerzen und Bewegungseinschränkungen führen können.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Grenzen & Kritik */}
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight mb-8 font-epilogue">
              Grenzen der Osteopathie
            </h2>
            <div className="bg-gradient-to-r from-orange-50 to-white border border-orange-200 rounded-lg p-8">
              <p className="text-slate-700 leading-relaxed mb-4">
                Trotz positiver Forschungsergebnisse ist es wichtig, die <strong>Grenzen der Osteopathie</strong> zu kennen:
              </p>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 shrink-0">⚠️</span>
                  <div>
                    <strong>Keine Wunderheilung:</strong> Osteopathie ist kein Ersatz für medizinische
                    Notfallversorgung oder chirurgische Eingriffe.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 shrink-0">⚠️</span>
                  <div>
                    <strong>Individuelle Unterschiede:</strong> Die Wirksamkeit kann von Person zu Person
                    variieren - nicht jeder reagiert gleich auf die Behandlung.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 shrink-0">⚠️</span>
                  <div>
                    <strong>Forschungsbedarf:</strong> In manchen Bereichen (z.B. innere Erkrankungen)
                    ist die Studienlage noch dünn. Hier arbeite ich eng mit Ärzten zusammen.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 shrink-0">⚠️</span>
                  <div>
                    <strong>Kontraindikationen:</strong> Bei bestimmten Erkrankungen (akute Infektionen,
                    Tumore, schwere Osteoporose) ist Osteopathie nicht oder nur eingeschränkt anwendbar.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Mein Ansatz */}
        <section className="bg-slate-50 py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight mb-8 font-epilogue">
              Mein wissenschaftlich fundierter Ansatz
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-white border border-blue-200 rounded-lg p-8">
              <p className="text-slate-700 leading-relaxed mb-6">
                In meiner Praxis kombiniere ich:
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📚</span>
                  <div>
                    <strong className="text-slate-900">Kontinuierliche Fortbildung:</strong>
                    <p className="text-slate-700 text-sm mt-1">
                      Ich halte mich durch regelmäßige Fortbildungen und Fachliteratur über
                      aktuelle Forschungsergebnisse auf dem Laufenden.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🔍</span>
                  <div>
                    <strong className="text-slate-900">Kritisches Hinterfragen:</strong>
                    <p className="text-slate-700 text-sm mt-1">
                      Ich reflektiere meine Behandlungsergebnisse kritisch und passe mein
                      Vorgehen basierend auf Ihrer Reaktion an.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🤝</span>
                  <div>
                    <strong className="text-slate-900">Interdisziplinäre Zusammenarbeit:</strong>
                    <p className="text-slate-700 text-sm mt-1">
                      Bei Bedarf arbeite ich eng mit Ärzten, Physiotherapeuten und anderen
                      Gesundheitsberufen zusammen.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💡</span>
                  <div>
                    <strong className="text-slate-900">Realistische Erwartungen:</strong>
                    <p className="text-slate-700 text-sm mt-1">
                      Ich kommuniziere transparent über Chancen und Grenzen der Behandlung
                      und setze realistische Behandlungsziele.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Weiterführende Links */}
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight mb-8 font-epilogue">
              Weiterführende Informationen
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-3 font-epilogue">
                  📖 Wissenschaftliche Datenbanken
                </h3>
                <ul className="space-y-2 text-slate-700 text-sm">
                  <li>
                    • <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      PubMed (NCBI)
                    </a> - Medizinische Forschungsdatenbank
                  </li>
                  <li>
                    • <a href="https://www.cochranelibrary.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      Cochrane Library
                    </a> - Systematische Übersichtsarbeiten
                  </li>
                  <li>
                    • <a href="https://www.osteopathic-research.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      Osteopathic Research Web
                    </a> - Osteopathie-spezifische Forschung
                  </li>
                </ul>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-3 font-epilogue">
                  🏛️ Fachverbände
                </h3>
                <ul className="space-y-2 text-slate-700 text-sm">
                  <li>
                    • <a href="https://www.osteopathie.de/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      Verband der Osteopathen Deutschland (VOD)
                    </a>
                  </li>
                  <li>
                    • <a href="https://www.bv-osteopathie.de/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      Bundesverband Osteopathie (BVO)
                    </a>
                  </li>
                  <li>
                    • <a href="https://www.vfo.de/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      Verband Freier Osteopathen (VFO)
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-slate-50 py-16 sm:py-24 px-4 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 sm:p-12 text-center text-white shadow-xl">
              <h2 className="text-3xl sm:text-4xl font-light mb-4 font-epilogue tracking-tight">
                Haben Sie Fragen?
              </h2>
              <p className="text-xl mb-8 text-slate-200 font-light">
                Gerne beantworte ich Ihre Fragen zur Osteopathie und ihrer
                wissenschaftlichen Grundlage persönlich.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/terminbuchung"
                  className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold text-slate-900 bg-white rounded-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1"
                >
                  <span className="relative z-10">📅 Jetzt Termin buchen</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-200/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </Link>
                <a
                  href="tel:+4917643990001"
                  className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold border-2 border-white text-white rounded-md transition-all duration-300 hover:bg-white hover:text-slate-900 hover:transform hover:-translate-y-1"
                >
                  📞 0176 4399 0001
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight text-center mb-8 font-epilogue">
              Das könnte Sie auch interessieren
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/was-ist-osteopathie"
                className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-900 transition-colors"
              >
                <div className="text-3xl mb-3">📚</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                  Was ist Osteopathie?
                </h3>
                <p className="text-slate-600">
                  Grundlagen, Geschichte und Prinzipien der osteopathischen Medizin.
                </p>
              </Link>

              <Link
                href="/behandlungen"
                className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-900 transition-colors"
              >
                <div className="text-3xl mb-3">🦴</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                  Behandlungen
                </h3>
                <p className="text-slate-600">
                  Alle Behandlungsschwerpunkte im Überblick: Von Rückenschmerzen bis Verdauung.
                </p>
              </Link>

              <Link
                href="/faq"
                className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-900 transition-colors"
              >
                <div className="text-3xl mb-3">❓</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                  Häufige Fragen
                </h3>
                <p className="text-slate-600">
                  Antworten auf die wichtigsten Fragen zu Osteopathie, Kosten und Ablauf.
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
