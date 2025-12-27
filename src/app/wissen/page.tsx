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
        url: "/og-image.webp",
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
    images: ["/og-image.webp"],
  },
};

export default function WissenschaftPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="pt-20">
        <Breadcrumbs items={[{ label: "Wissenschaft & Forschung" }]} />

        {/* Hero Section */}
        <section className="bg-white pt-8 pb-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 lg:px-12 text-center">
            <div className="mx-auto max-w-3xl">
              <h1 className="font-epilogue text-slate-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-light leading-tight mb-4">
                Wissenschaft & Forschung zur Osteopathie Hamburg
              </h1>
              <h2 className="text-slate-700 text-xl sm:text-2xl md:text-3xl font-semibold mb-6 font-epilogue">
                Evidence-Based Practice: 30+ Studien belegen Wirksamkeit
              </h2>
              <p className="text-slate-600 text-lg sm:text-xl font-light leading-relaxed">
                Was sagt die Forschung zur Wirksamkeit der Osteopathie?
                Aktuelle Studienlage, wissenschaftliche Belege und kritische Bewertung.
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
                Als wissenschaftlich denkender <strong>Osteopath in Hamburg</strong> ist es mir wichtig, evidenzbasiert zu arbeiten.
                Das bedeutet: Ich kombiniere die <strong>besten verfügbaren wissenschaftlichen Erkenntnisse</strong> mit
                meiner <strong>klinischen Erfahrung</strong> und Ihren <strong>individuellen Bedürfnissen</strong>.
              </p>
              <p className="text-slate-700 leading-relaxed">
                In den letzten Jahren hat die wissenschaftliche Forschung zur <strong>Osteopathie Hamburg</strong> deutlich zugenommen.
                Hier finden Sie einen Überblick über aktuelle Studien und Forschungsergebnisse zur Wirksamkeit osteopathischer Behandlungen.
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
                  Rückenschmerzen
                </h3>
                <div className="space-y-4 text-slate-700">
                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <h4 className="font-semibold text-slate-900 mb-2">
                      Cochrane Review: Spinale Manualtherapie (2011)
                    </h4>
                    <p className="mb-2">
                      Eine systematische Übersichtsarbeit der renommierten Cochrane Collaboration mit 26 randomisierten Studien und 6.070 Teilnehmern untersuchte die Wirksamkeit spinaler Manualtherapie bei chronischen Rückenschmerzen.
                    </p>
                    <p className="text-sm text-slate-600">
                      <strong>Ergebnis:</strong> Spinale Manualtherapie (inkl. Osteopathie) erwies sich als ebenso wirksam wie andere gängige Therapien (Bewegungstherapie, medizinische Standardversorgung, Physiotherapie).
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                      Quelle: <a href="https://pubmed.ncbi.nlm.nih.gov/21593658/" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Rubinstein et al., Spine 2011 (PMID: 21593658)</a>
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <h4 className="font-semibold text-slate-900 mb-2">
                      OSTPAC-Studie (2013)
                    </h4>
                    <p className="mb-2">
                      Randomisierte, doppelblinde, Placebo-kontrollierte Studie mit 455 Patienten mit chronischen Rückenschmerzen.
                    </p>
                    <p className="text-sm text-slate-600">
                      <strong>Ergebnis:</strong> Osteopathische Behandlung führte zu signifikanter Schmerzreduktion (Response Ratio 1.38) und verbesserter Lebensqualität. Nur 1 Patient entwickelte mögliche Nebenwirkungen.
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                      Quelle: <a href="https://pubmed.ncbi.nlm.nih.gov/23508598/" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Licciardone et al., Ann Fam Med 2013 (PMID: 23508598)</a>
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <h4 className="font-semibold text-slate-900 mb-2">
                      Systematische Übersicht & Meta-Analyse (2020)
                    </h4>
                    <p className="mb-2">
                      Umfassende Meta-Analyse zur Effektivität osteopathischer Interventionen bei chronischen unspezifischen Rückenschmerzen.
                    </p>
                    <p className="text-sm text-slate-600">
                      <strong>Ergebnis:</strong> Osteopathie zeigte sich wirksamer als Kontrollinterventionen bei Schmerzreduktion (Effect Size: -0.59) und Verbesserung der Funktionsfähigkeit (Effect Size: -0.42).
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                      Quelle: <a href="https://pubmed.ncbi.nlm.nih.gov/33197571/" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Voogt et al., Eur J Pain 2020 (PMID: 33197571)</a>
                    </p>
                  </div>

                  <div className="mt-4 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-4">
                    <p className="text-sm font-semibold text-slate-900 mb-2">
                      📖 Passende Fachartikel:
                    </p>
                    <ul className="space-y-1.5 text-sm text-slate-700">
                      <li>
                        → <Link href="/blog/rueckenschmerzen-3-versteckte-ursachen" className="text-blue-700 hover:text-blue-900 hover:underline font-medium">
                          Die 3 versteckten Ursachen von Rückenschmerzen
                        </Link>
                      </li>
                      <li>
                        → <Link href="/blog/isg-blockierung-teufelskreis" className="text-blue-700 hover:text-blue-900 hover:underline font-medium">
                          ISG-Blockierung: Warum sie immer wiederkommt
                        </Link>
                      </li>
                      <li>
                        → <Link href="/blog/rueckenschmerzen-osteopathie-ganzheitliche-behandlung-hamburg" className="text-blue-700 hover:text-blue-900 hover:underline font-medium">
                          Rückenschmerzen ganzheitlich behandeln
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Kopfschmerzen & Migräne */}
              <div className="bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-lg p-6 sm:p-8">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4 font-epilogue flex items-center gap-3">
                  Kopfschmerzen & Migräne
                </h3>
                <div className="space-y-4 text-slate-700">
                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <h4 className="font-semibold text-slate-900 mb-2">
                      Systematic Review: Manuelle Therapie bei Spannungskopfschmerzen (2020)
                    </h4>
                    <p className="mb-2">
                      Systematische Übersichtsarbeit und Meta-Analyse zu manuellen Therapien bei Spannungskopfschmerzen.
                    </p>
                    <p className="text-sm text-slate-600">
                      <strong>Ergebnis:</strong> Manuelle Therapien zeigten positive Effekte auf Schmerzintensität, Häufigkeit und Behinderung bei Spannungskopfschmerzen. Auch die Lebensqualität und zervikale Beweglichkeit verbesserten sich signifikant.
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                      Quelle: <a href="https://pubmed.ncbi.nlm.nih.gov/32924640/" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Rolle et al., Am J Phys Med Rehabil 2020 (PMID: 32924640)</a>
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <h4 className="font-semibold text-slate-900 mb-2">
                      Manuelle Therapie & Lebensqualität bei Kopfschmerzen (2019)
                    </h4>
                    <p className="mb-2">
                      Systematische Übersicht und Meta-Analyse zu manuellen Therapien bei Kopfschmerzen (Spannungskopfschmerz, Migräne, zervikogener Kopfschmerz).
                    </p>
                    <p className="text-sm text-slate-600">
                      <strong>Ergebnis:</strong> Meta-Analyse von 10 RCTs zeigte statistisch signifikante Verbesserungen der Lebensqualität (HIT-6 und HDI Skalen) sowohl direkt nach Behandlung als auch bei Follow-up.
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                      Quelle: <a href="https://pubmed.ncbi.nlm.nih.gov/31401702/" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Rist et al., Pain Med 2019 (PMID: 31401702)</a>
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <h4 className="font-semibold text-slate-900 mb-2">
                      Craniosacrale Therapie bei Migräne: RCT (2022)
                    </h4>
                    <p className="mb-2">
                      Randomisierte kontrollierte Studie mit 50 Migräne-Patienten: Craniosacrale Therapie vs. Placebo-Kontrolle über 8 Wochen.
                    </p>
                    <p className="text-sm text-slate-600">
                      <strong>Ergebnis:</strong> Signifikante Verbesserungen bei Schmerzintensität, Migräneschwere, Häufigkeit, Behinderung und Medikamenteneinnahme in der Behandlungsgruppe.
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                      Quelle: <a href="https://pubmed.ncbi.nlm.nih.gov/35160211/" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Rego et al., J Clin Med 2022 (PMID: 35160211)</a>
                    </p>
                  </div>

                  <div className="mt-4 bg-purple-50 border-l-4 border-purple-600 rounded-r-lg p-4">
                    <p className="text-sm font-semibold text-slate-900 mb-2">
                      📖 Passende Fachartikel:
                    </p>
                    <ul className="space-y-1.5 text-sm text-slate-700">
                      <li>
                        → <Link href="/blog/chronische-kopfschmerzen-osteopathie-statt-tabletten" className="text-purple-700 hover:text-purple-900 hover:underline font-medium">
                          Chronische Kopfschmerzen: Osteopathie statt Tabletten
                        </Link>
                      </li>
                      <li>
                        → <Link href="/blog/migraene-ohne-aura-osteopathie" className="text-purple-700 hover:text-purple-900 hover:underline font-medium">
                          Migräne ohne Aura behandeln
                        </Link>
                      </li>
                      <li>
                        → <Link href="/blog/spannungskopfschmerzen-muskel-oder-hws" className="text-purple-700 hover:text-purple-900 hover:underline font-medium">
                          Spannungskopfschmerzen: Muskel oder HWS?
                        </Link>
                      </li>
                      <li>
                        → <Link href="/blog/kopfschmerzen-trigeminus-ursache" className="text-purple-700 hover:text-purple-900 hover:underline font-medium">
                          Trigeminus als versteckte Ursache
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Säuglinge & Kinder */}
              <div className="bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-lg p-6 sm:p-8">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4 font-epilogue flex items-center gap-3">
                  Säuglinge & Kinder
                </h3>
                <div className="space-y-4 text-slate-700">
                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <h4 className="font-semibold text-slate-900 mb-2">
                      Cochrane Review: Manuelle Therapien bei Säuglingskoliken (2012)
                    </h4>
                    <p className="mb-2">
                      Systematische Übersichtsarbeit der Cochrane Collaboration zu manuellen Therapien (Chiropraktik, Osteopathie, Craniosacraltherapie) bei Säuglingen unter 6 Monaten mit Koliken.
                    </p>
                    <p className="text-sm text-slate-600">
                      <strong>Ergebnis:</strong> Mehrere kleine Studien zeigten positive Effekte auf Schreizeit. Die Evidenz ist vielversprechend, weitere hochwertige Studien sind jedoch notwendig.
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                      Quelle: <a href="https://pubmed.ncbi.nlm.nih.gov/23235617/" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Dobson et al., Cochrane Database Syst Rev 2012 (PMID: 23235617)</a>
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <h4 className="font-semibold text-slate-900 mb-2">
                      Osteopathie bei pädiatrischen Beschwerden: Systematic Review (2022)
                    </h4>
                    <p className="mb-2">
                      Aktualisierte systematische Übersichtsarbeit und Meta-Analyse zur osteopathischen Behandlung bei Kindern (2012-2021).
                    </p>
                    <p className="text-sm text-slate-600">
                      <strong>Ergebnis:</strong> 13 Studien erfüllten die Einschlusskriterien. Bei Frühgeborenen zeigte OMT wenig bis keinen Effekt auf Krankenhausaufenthaltsdauer. Positive Effekte wurden bei anderen pädiatrischen Beschwerden berichtet.
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                      Quelle: <a href="https://pubmed.ncbi.nlm.nih.gov/35892555/" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Lanaro et al., J Clin Med 2022 (PMID: 35892555)</a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Viszerale Osteopathie */}
              <div className="bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-lg p-6 sm:p-8">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4 font-epilogue flex items-center gap-3">
                  Viszerale Osteopathie
                </h3>
                <div className="space-y-4 text-slate-700">
                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <h4 className="font-semibold text-slate-900 mb-2">
                      Viszerale Osteopathie bei Reizdarmsyndrom: RCT (2013)
                    </h4>
                    <p className="mb-2">
                      Randomisierte, Placebo-kontrollierte Crossover-Studie mit 31 therapieresistenten IBS-Patienten.
                    </p>
                    <p className="text-sm text-slate-600">
                      <strong>Ergebnis:</strong> Viszerale Osteopathie führte zu signifikanter Verbesserung bei Durchfall, abdomineller Distension und Bauchschmerzen. Langzeit-Effekte über 6 Monate nachweisbar.
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                      Quelle: <a href="https://pubmed.ncbi.nlm.nih.gov/23981319/" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Müller et al., J Crohns Colitis 2013 (PMID: 23981319)</a>
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <h4 className="font-semibold text-slate-900 mb-2">
                      Systematic Review & Meta-Analyse: OMT bei IBS (2023)
                    </h4>
                    <p className="mb-2">
                      Systematische Übersichtsarbeit und Meta-Analyse zur Effektivität osteopathischer manueller Behandlung bei Erwachsenen mit Reizdarmsyndrom.
                    </p>
                    <p className="text-sm text-slate-600">
                      <strong>Ergebnis:</strong> Evidenz deutet darauf hin, dass OMT bei der Behandlung von IBS-Patienten vorteilhaft sein kann. Positive Effekte auf Schmerz, Lebensqualität und Symptomreduktion wurden dokumentiert.
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                      Quelle: <a href="https://pubmed.ncbi.nlm.nih.gov/37621836/" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Chiacchiarini et al., Healthcare 2023 (PMID: 37621836)</a>
                    </p>
                  </div>

                  <div className="mt-4 bg-green-50 border-l-4 border-green-600 rounded-r-lg p-4">
                    <p className="text-sm font-semibold text-slate-900 mb-2">
                      📖 Passende Fachartikel:
                    </p>
                    <ul className="space-y-1.5 text-sm text-slate-700">
                      <li>
                        → <Link href="/blog/reizdarm-rueckenschmerzen-darm-ruecken-zusammenhang" className="text-green-700 hover:text-green-900 hover:underline font-medium">
                          Reizdarm & Rückenschmerzen: Der Zusammenhang
                        </Link>
                      </li>
                      <li>
                        → <Link href="/blog/rueckenschmerzen-verdauung-radix-mesenterii" className="text-green-700 hover:text-green-900 hover:underline font-medium">
                          Rückenschmerzen durch Verdauungsprobleme
                        </Link>
                      </li>
                    </ul>
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
                  Neurophysiologische Effekte
                </h3>
                <p className="text-slate-700 text-sm">
                  Manuelle Techniken beeinflussen das autonome Nervensystem,
                  reduzieren Stresshormone (Cortisol) und fördern die Ausschüttung
                  von Endorphinen (körpereigene Schmerzmittel).
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3 font-epilogue">
                  Biomechanische Verbesserungen
                </h3>
                <p className="text-slate-700 text-sm">
                  Verbesserung der Gelenkbeweglichkeit, Reduktion muskulärer Verspannungen
                  und Optimierung der Körperhaltung führen zu besserer Funktion und
                  weniger Schmerzen.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3 font-epilogue">
                  Durchblutungsförderung
                </h3>
                <p className="text-slate-700 text-sm">
                  Osteopathische Techniken verbessern die Durchblutung und den lymphatischen
                  Abfluss, was die Versorgung von Geweben mit Nährstoffen und den Abtransport
                  von Stoffwechselprodukten optimiert.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3 font-epilogue">
                  Fasziale Entspannung
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
                Gerne beantworte ich Ihre Fragen zur <strong>Osteopathie Hamburg</strong> und ihrer
                wissenschaftlichen Grundlage persönlich in meiner Praxis in Rotherbaum oder Eimsbüttel.
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
