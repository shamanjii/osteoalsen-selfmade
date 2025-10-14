import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSchema from "@/components/FAQSchema";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import SiteHeader from "@/app/(site)/components/SiteHeader";
import SiteFooter from "@/app/(site)/components/SiteFooter";

export const metadata: Metadata = {
  title: "Osteopath Hamburg | VFO-zertifiziert | Joshua Alsen | Termin binnen 48h",
  description:
    "Osteopath Hamburg ✓ Joshua Alsen ✓ VFO-zertifiziert ✓ BAO-Ausbildung 5000+ Std. ✓ Rückenschmerzen, Kopfschmerzen, Verdauung ✓ 2 Standorte ✓ Kassenzuschuss ⭐ Jetzt Termin buchen!",
  keywords: [
    "Osteopath Hamburg",
    "Osteopathie Hamburg",
    "Heilpraktiker Osteopathie Hamburg",
    "VFO Osteopath Hamburg",
    "Osteopath Hamburg Rotherbaum",
    "Osteopath Hamburg Eimsbüttel",
    "Osteopathische Behandlung Hamburg",
  ],
  alternates: { canonical: "/osteopath-hamburg" },
  openGraph: {
    title: "Osteopath Hamburg | VFO-zertifiziert | Joshua Alsen",
    description:
      "Osteopath Hamburg ✓ Joshua Alsen ✓ VFO-zertifiziert ✓ Rückenschmerzen, Kopfschmerzen, Verdauung ✓ 2 Standorte ✓ Kassenzuschuss ⭐",
    url: "/osteopath-hamburg",
    siteName: "Osteopathie Hamburg - Joshua Alsen",
    images: [
      {
        url: "/assets/joshua-alsen-osteopath-hamburg-og.webp",
        width: 1200,
        height: 630,
        alt: "Osteopath Hamburg - Joshua Alsen",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Osteopath Hamburg | VFO-zertifiziert | Joshua Alsen",
    description:
      "Osteopath Hamburg ✓ VFO-zertifiziert ✓ Rückenschmerzen, Kopfschmerzen, Verdauung ✓ Kassenzuschuss ⭐",
    images: ["/assets/joshua-alsen-osteopath-hamburg-twitter.webp"],
  },
};

export default function OsteopathHamburgPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <LocalBusinessSchema location="rotherbaum" />
      <main>
        <FAQSchema
          faqs={[
            {
              question: "Wie finde ich einen guten Osteopathen in Hamburg?",
              answer:
                "Achten Sie auf eine fundierte Ausbildung (BAO oder vergleichbar mit mind. 1350 Std.), VFO-Mitgliedschaft und positive Patientenbewertungen. Ein guter Osteopath nimmt sich Zeit für eine ausführliche Anamnese.",
            },
            {
              question: "Was kostet ein Osteopath in Hamburg?",
              answer:
                "Eine osteopathische Behandlung kostet in Hamburg üblicherweise zwischen 100-180€ pro Sitzung (45-60 Min.). Viele Krankenkassen erstatten einen Teil der Kosten.",
            },
            {
              question: "Brauche ich eine Überweisung zum Osteopathen?",
              answer:
                "Nein, Sie können direkt einen Termin beim Osteopathen buchen. Für die Kassenerstattung bei gesetzlichen Krankenkassen ist oft eine ärztliche Empfehlung erforderlich.",
            },
            {
              question: "Wie viele Behandlungen brauche ich beim Osteopathen?",
              answer:
                "Bei akuten Beschwerden reichen oft 2-3 Sitzungen. Chronische Beschwerden können 4-6 oder mehr Behandlungen erfordern. Nach der Erstbehandlung kann der Osteopath eine genauere Einschätzung geben.",
            },
          ]}
        />
        <Breadcrumbs items={[{ label: "Osteopath Hamburg" }]} />

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-slate-50 to-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center max-w-4xl mx-auto mb-12">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 font-epilogue leading-tight">
                Osteopath in Hamburg
              </h1>
              <p className="text-xl sm:text-2xl text-slate-600 leading-relaxed mb-8">
                VFO-zertifizierter Osteopath mit BAO-Ausbildung (5000+ Stunden).
                Ganzheitliche Behandlungen bei Rückenschmerzen, Kopfschmerzen,
                Verdauungsbeschwerden und mehr.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/terminbuchung"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-slate-900 rounded-md hover:bg-slate-800 hover:transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                >
                  📅 Jetzt Termin buchen
                </Link>
                <a
                  href="tel:+4917643990001"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold border-2 border-slate-900 text-slate-900 rounded-md hover:bg-slate-900 hover:text-white transition-all duration-300"
                >
                  📞 0176 4399 0001
                </a>
              </div>
            </div>

            {/* USP Cards */}
            <div className="grid md:grid-cols-4 gap-6 mt-12">
              <div className="bg-white border border-slate-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-3">🎓</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                  VFO-zertifiziert
                </h3>
                <p className="text-slate-600 text-sm">
                  BAO-Ausbildung mit über 5000 Stunden
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-3">⏱️</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                  60 Min. Behandlung
                </h3>
                <p className="text-slate-600 text-sm">
                  Ausführliche Anamnese und individuelle Therapie
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-3">📍</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                  2 Standorte
                </h3>
                <p className="text-slate-600 text-sm">
                  Rotherbaum & Eimsbüttel - zentral gelegen
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-3">💳</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                  Kassenzuschuss
                </h3>
                <p className="text-slate-600 text-sm">
                  Viele Krankenkassen erstatten 40-60€ pro Sitzung
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Was ist Osteopathie */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 font-epilogue">
              Was macht ein Osteopath?
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-700 leading-relaxed mb-4">
                Als Osteopath in Hamburg behandle ich Sie <strong>ausschließlich mit meinen Händen</strong> -
                ohne Medikamente oder Geräte. Osteopathie ist eine ganzheitliche Behandlungsmethode,
                die den Körper als Einheit betrachtet und die Selbstheilungskräfte aktiviert.
              </p>
              <p className="text-slate-700 leading-relaxed mb-4">
                Ich habe eine 5-jährige berufsbegleitende Ausbildung an der Berliner Academy of Osteopathy (BAO)
                absolviert - eine der renommiertesten Osteopathie-Schulen Deutschlands. Mit über 5000
                Ausbildungsstunden und VFO-Zertifizierung erfülle ich höchste Qualitätsstandards.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3 font-epilogue">
                  Die 3 Säulen der Osteopathie
                </h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl shrink-0">🦴</span>
                    <div>
                      <strong>Parietale Osteopathie:</strong> Behandlung des Bewegungsapparats
                      (Knochen, Muskeln, Gelenke, Faszien)
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl shrink-0">🫁</span>
                    <div>
                      <strong>Viszerale Osteopathie:</strong> Behandlung der inneren Organe
                      und ihrer Aufhängungen
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl shrink-0">🧠</span>
                    <div>
                      <strong>Kraniosakrale Osteopathie:</strong> Sanfte Techniken an Schädel,
                      Wirbelsäule und Nervensystem
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Behandlungsschwerpunkte */}
        <section className="py-16 sm:py-24 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-12 font-epilogue">
              Behandlungsschwerpunkte
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link
                href="/behandlungen/rueckenschmerzen"
                className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-slate-900 transition-all"
              >
                <div className="text-4xl mb-3">🦴</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                  Rückenschmerzen
                </h3>
                <p className="text-slate-600 mb-3">
                  Bandscheibenvorfälle, ISG-Blockaden, Hexenschuss, chronische Verspannungen
                </p>
                <span className="text-blue-600 font-medium">Mehr erfahren →</span>
              </Link>

              <Link
                href="/behandlungen/kopfschmerzen-migraene"
                className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-slate-900 transition-all"
              >
                <div className="text-4xl mb-3">🧠</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                  Kopfschmerzen & Migräne
                </h3>
                <p className="text-slate-600 mb-3">
                  Spannungskopfschmerzen, Migräne, CMD/Kiefergelenksprobleme
                </p>
                <span className="text-blue-600 font-medium">Mehr erfahren →</span>
              </Link>

              <Link
                href="/behandlungen/nackenschmerzen"
                className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-slate-900 transition-all"
              >
                <div className="text-4xl mb-3">🔄</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                  Nackenschmerzen & HWS
                </h3>
                <p className="text-slate-600 mb-3">
                  HWS-Syndrom, Schulter-Nacken-Verspannungen, Zervikalsyndrom
                </p>
                <span className="text-blue-600 font-medium">Mehr erfahren →</span>
              </Link>

              <Link
                href="/behandlungen/verdauungsbeschwerden"
                className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-slate-900 transition-all"
              >
                <div className="text-4xl mb-3">🫁</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                  Verdauungsbeschwerden
                </h3>
                <p className="text-slate-600 mb-3">
                  Reizdarm, Blähungen, Verstopfung, Reflux
                </p>
                <span className="text-blue-600 font-medium">Mehr erfahren →</span>
              </Link>

              <Link
                href="/behandlungen/sportverletzungen"
                className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-slate-900 transition-all"
              >
                <div className="text-4xl mb-3">⚽</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                  Sportverletzungen
                </h3>
                <p className="text-slate-600 mb-3">
                  Zerrungen, Überlastung, Regeneration, Prävention
                </p>
                <span className="text-blue-600 font-medium">Mehr erfahren →</span>
              </Link>

              <Link
                href="/behandlungen"
                className="bg-slate-900 text-white rounded-xl p-6 hover:bg-slate-800 transition-colors flex flex-col justify-center items-center text-center"
              >
                <div className="text-4xl mb-3">➕</div>
                <h3 className="text-xl font-semibold mb-2 font-epilogue">
                  Alle Behandlungen
                </h3>
                <p className="text-slate-300 text-sm">
                  Stress & Burnout, Arthrose und mehr
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Qualifikationen */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 font-epilogue">
              Meine Qualifikation als Osteopath
            </h2>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🎓</div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                      BAO-Ausbildung (5000+ Stunden)
                    </h3>
                    <p className="text-slate-700">
                      5-jährige berufsbegleitende Ausbildung an der renommierten
                      <strong> Berliner Academy of Osteopathy (BAO)</strong> - eine der führenden
                      Osteopathie-Schulen in Deutschland mit höchsten Qualitätsstandards.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">✅</div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                      VFO-Mitgliedschaft
                    </h3>
                    <p className="text-slate-700">
                      Mitglied im <strong>Verband Freier Osteopathen (VFO)</strong> - garantiert
                      kontinuierliche Fortbildung und Einhaltung ethischer Standards. Die VFO-Zertifizierung
                      wird von vielen Krankenkassen für die Kostenerstattung vorausgesetzt.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🩺</div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                      Heilpraktiker-Zulassung
                    </h3>
                    <p className="text-slate-700">
                      Staatlich geprüfter Heilpraktiker - ermöglicht eigenverantwortliche Diagnostik
                      und Therapie. Sie können direkt einen Termin buchen, ohne vorherige ärztliche Überweisung.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Standorte */}
        <section className="py-16 sm:py-24 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-12 font-epilogue">
              Praxisstandorte in Hamburg
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Rotherbaum */}
              <div className="bg-white border border-slate-200 rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4 font-epilogue">
                  📍 Rotherbaum
                </h3>
                <p className="text-slate-700 mb-4">
                  <strong>Rappstraße 7</strong><br />
                  20146 Hamburg-Rotherbaum
                </p>
                <div className="space-y-2 text-slate-700 mb-6">
                  <p>🚇 U1 Hallerstraße (3 Min. Fußweg)</p>
                  <p>🚌 Bus 4, 5 bis Hallerstraße</p>
                  <p>🚗 Parkhaus Grindelhof</p>
                </div>
                <Link
                  href="/osteopathie-rotherbaum"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  Mehr zum Standort Rotherbaum →
                </Link>
              </div>

              {/* Eimsbüttel */}
              <div className="bg-white border border-slate-200 rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4 font-epilogue">
                  📍 Eimsbüttel
                </h3>
                <p className="text-slate-700 mb-4">
                  Weitere Informationen zum Standort Eimsbüttel
                </p>
                <div className="space-y-2 text-slate-700 mb-6">
                  <p>🚇 Gut erreichbar mit ÖPNV</p>
                  <p>📞 Terminvereinbarung: 0176 4399 0001</p>
                </div>
                <Link
                  href="/osteopathie-eimsbuettel"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  Mehr zum Standort Eimsbüttel →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-12 font-epilogue">
              Häufige Fragen zum Osteopathen
            </h2>
            <div className="space-y-4">
              <details className="bg-slate-50 border border-slate-200 rounded-lg p-6 group">
                <summary className="text-lg font-semibold text-slate-900 cursor-pointer list-none font-epilogue flex justify-between items-start">
                  <span className="pr-4">Wie finde ich einen guten Osteopathen in Hamburg?</span>
                  <span className="shrink-0 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-4 text-slate-700 leading-relaxed">
                  <p className="mb-3">
                    Achten Sie auf folgende Qualitätskriterien:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Fundierte Ausbildung:</strong> Mind. 1350 Std. (BAO, DAOM, etc.)</li>
                    <li><strong>Verbandsmitgliedschaft:</strong> VFO, VOD oder vergleichbar</li>
                    <li><strong>Heilpraktiker-Zulassung:</strong> Für eigenverantwortliche Behandlung</li>
                    <li><strong>Positive Bewertungen:</strong> Erfahrungen anderer Patienten</li>
                    <li><strong>Ausführliche Anamnese:</strong> Ein guter Osteopath nimmt sich Zeit (45-60 Min.)</li>
                  </ul>
                </div>
              </details>

              <details className="bg-slate-50 border border-slate-200 rounded-lg p-6 group">
                <summary className="text-lg font-semibold text-slate-900 cursor-pointer list-none font-epilogue flex justify-between items-start">
                  <span className="pr-4">Was kostet ein Osteopath in Hamburg?</span>
                  <span className="shrink-0 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-4 text-slate-700 leading-relaxed">
                  <p>
                    Eine osteopathische Behandlung kostet in Hamburg üblicherweise zwischen
                    <strong> 100-180€ pro Sitzung</strong> (45-60 Minuten). Bei mir zahlen Sie
                    <strong> 150€ pro Behandlung</strong>.
                  </p>
                  <p className="mt-3">
                    <strong>Kassenerstattung:</strong> Viele private Krankenkassen übernehmen
                    die vollen Kosten. Gesetzliche Krankenkassen beteiligen sich meist mit
                    40-60€ pro Sitzung (3-6 Sitzungen/Jahr).
                  </p>
                </div>
              </details>

              <details className="bg-slate-50 border border-slate-200 rounded-lg p-6 group">
                <summary className="text-lg font-semibold text-slate-900 cursor-pointer list-none font-epilogue flex justify-between items-start">
                  <span className="pr-4">Brauche ich eine Überweisung zum Osteopathen?</span>
                  <span className="shrink-0 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-4 text-slate-700 leading-relaxed">
                  <p>
                    <strong>Nein</strong>, als Heilpraktiker kann ich Sie ohne ärztliche Überweisung
                    behandeln. Sie können direkt einen Termin buchen.
                  </p>
                  <p className="mt-3">
                    Für die <strong>Kostenerstattung bei gesetzlichen Krankenkassen</strong> ist jedoch
                    oft eine ärztliche Empfehlung/Verordnung erforderlich. Diese können Sie sich von
                    Ihrem Hausarzt oder Facharzt ausstellen lassen.
                  </p>
                </div>
              </details>

              <details className="bg-slate-50 border border-slate-200 rounded-lg p-6 group">
                <summary className="text-lg font-semibold text-slate-900 cursor-pointer list-none font-epilogue flex justify-between items-start">
                  <span className="pr-4">Wie viele Behandlungen brauche ich beim Osteopathen?</span>
                  <span className="shrink-0 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-4 text-slate-700 leading-relaxed">
                  <p className="mb-3">
                    Das ist sehr individuell und hängt von Art und Dauer Ihrer Beschwerden ab:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Akute Beschwerden:</strong> Oft 2-3 Sitzungen ausreichend</li>
                    <li><strong>Chronische Beschwerden:</strong> Meist 4-6+ Behandlungen erforderlich</li>
                    <li><strong>Prävention:</strong> 1-2 Behandlungen pro Quartal</li>
                  </ul>
                  <p className="mt-3">
                    Nach der ersten Sitzung kann ich Ihnen eine genauere Einschätzung geben.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-24 bg-slate-50 px-4 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 sm:p-12 text-center text-white shadow-xl">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-epilogue">
                Termin bei Ihrem Osteopathen in Hamburg
              </h2>
              <p className="text-xl mb-8 text-slate-200">
                Termine oft binnen 48 Stunden verfügbar. Jetzt online buchen oder anrufen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/terminbuchung"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-slate-900 bg-white rounded-md hover:shadow-lg hover:transform hover:-translate-y-1 transition-all duration-300"
                >
                  📅 Online Termin buchen
                </Link>
                <a
                  href="tel:+4917643990001"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold border-2 border-white text-white rounded-md hover:bg-white hover:text-slate-900 transition-all duration-300"
                >
                  📞 0176 4399 0001
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
