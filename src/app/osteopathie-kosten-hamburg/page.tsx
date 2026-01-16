import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSchema from "@/components/FAQSchema";
import SiteHeader from "@/app/(site)/components/SiteHeader";
import SiteFooter from "@/app/(site)/components/SiteFooter";

export const metadata: Metadata = {
  title: "Osteopathie Kosten Hamburg | Was kostet ein Osteopath?",
  description:
    "Osteopathie Hamburg: 150€/60 Min. ✓ Kassenzuschuss 40-60€ ✓ Private Erstattung ✓ Transparente Preise ⭐ Jetzt informieren!",
  keywords: [
    "Osteopathie Kosten Hamburg",
    "Was kostet Osteopathie Hamburg",
    "Osteopath Preise Hamburg",
    "Osteopathie Kassenzuschuss",
    "Krankenkasse Osteopathie Hamburg",
    "Osteopathie Erstattung",
  ],
  alternates: { canonical: "/osteopathie-kosten-hamburg/" },
  openGraph: {
    title: "Osteopathie Kosten Hamburg | Was kostet ein Osteopath?",
    description:
      "150€/Behandlung ✓ Kassenzuschuss 40-60€ ✓ Private Erstattung ✓ Transparente Preise ⭐",
    url: "/osteopathie-kosten-hamburg",
    siteName: "Osteopathie Hamburg - Joshua Alsen",
    images: [
      {
        url: "/assets/joshua-alsen-osteopath-hamburg-og.webp",
        width: 1200,
        height: 630,
        alt: "Osteopathie Kosten Hamburg",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Osteopathie Kosten Hamburg",
    description: "150€/Behandlung ✓ Kassenzuschuss ✓ Transparente Preise",
    images: ["/assets/joshua-alsen-osteopath-hamburg-twitter.webp"],
  },
};

export default function OsteopathieKostenHamburgPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <FAQSchema
          faqs={[
            {
              question: "Was kostet eine osteopathische Behandlung in Hamburg?",
              answer:
                "Eine osteopathische Behandlung kostet in Hamburg durchschnittlich 100-180€. Bei mir zahlen Sie 150€ für 45-60 Minuten intensive Behandlung inkl. Anamnese und Nachbesprechung.",
            },
            {
              question: "Übernimmt die Krankenkasse Osteopathie-Kosten in Hamburg?",
              answer:
                "Ja, viele private Krankenkassen übernehmen die vollen Kosten. Gesetzliche Kassen bezuschussen oft mit 40-60€ pro Sitzung (meist 3-6 Sitzungen pro Jahr).",
            },
            {
              question: "Warum kostet Osteopathie mehr als Physiotherapie?",
              answer:
                "Osteopathen haben eine 4-5 jährige Vollzeitausbildung (1350-5000 Std.). Die Behandlung dauert 45-60 Min. statt 20 Min. und ist ganzheitlicher - nicht nur symptomorientiert.",
            },
          ]}
        />
        <Breadcrumbs items={[{ label: "Osteopathie Kosten Hamburg" }]} />

        {/* Hero */}
        <section className="bg-gradient-to-b from-slate-50 to-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center max-w-4xl mx-auto mb-12">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 font-epilogue leading-tight">
                Osteopathie Kosten in Hamburg
              </h1>
              <p className="text-xl sm:text-2xl text-slate-600 leading-relaxed mb-8">
                Transparente Preise, faire Behandlung: 150€ für 60 Minuten
                intensive osteopathische Betreuung. Viele Krankenkassen
                erstatten 40-60€ pro Sitzung.
              </p>
            </div>

            {/* Price Box */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 sm:p-12 text-white text-center shadow-2xl">
                <div className="text-6xl sm:text-7xl font-light mb-2">150€</div>
                <p className="text-2xl text-slate-200 font-light mb-6">
                  pro Behandlung (45-60 Minuten)
                </p>
                <div className="bg-white/10 rounded-lg p-6 text-left mb-8">
                  <p className="text-lg leading-relaxed">
                    ✓ Ausführliche Anamnese (15-20 Min.)<br />
                    ✓ Ganzheitliche Untersuchung<br />
                    ✓ Osteopathische Behandlung (25-30 Min.)<br />
                    ✓ Nachbesprechung & Empfehlungen<br />
                    ✓ Rechnung für Krankenkasse
                  </p>
                </div>
                <Link
                  href="/terminbuchung/"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-slate-900 bg-white rounded-md hover:shadow-xl hover:transform hover:-translate-y-1 transition-all duration-300"
                >
                  📅 Jetzt Termin buchen
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Kostenvergleich Hamburg */}
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight mb-8 font-epilogue">
              Preisvergleich: Osteopathie in Hamburg
            </h2>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-8">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-300">
                    <th className="text-left py-3 font-semibold text-slate-900">Anbieter</th>
                    <th className="text-left py-3 font-semibold text-slate-900">Preis</th>
                    <th className="text-left py-3 font-semibold text-slate-900">Dauer</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  <tr className="border-b border-slate-200">
                    <td className="py-3">Durchschnitt Hamburg</td>
                    <td className="py-3 font-medium">100-180€</td>
                    <td className="py-3">45-60 Min.</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-blue-50">
                    <td className="py-3 font-semibold text-slate-900">Joshua Alsen</td>
                    <td className="py-3 font-semibold text-slate-900">150€</td>
                    <td className="py-3 font-semibold text-slate-900">60 Min.</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-3">Physiotherapie (Rezept)</td>
                    <td className="py-3">10€ Zuzahlung</td>
                    <td className="py-3">20 Min.</td>
                  </tr>
                  <tr>
                    <td className="py-3">Massage (Rezept)</td>
                    <td className="py-3">10€ Zuzahlung</td>
                    <td className="py-3">15-20 Min.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Kassenerstattung */}
        <section className="bg-slate-50 py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight mb-8 font-epilogue">
              Kostenerstattung durch Krankenkassen
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Private */}
              <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🏥</div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3 font-epilogue">
                      Private Krankenkassen
                    </h3>
                    <p className="text-slate-700 mb-3">
                      <strong className="text-green-600">Meist 100% Erstattung</strong>
                    </p>
                    <p className="text-slate-600 text-sm">
                      Die meisten privaten Krankenversicherungen übernehmen die vollen
                      Kosten bei VFO-zertifizierten Osteopathen. Bitte prüfen Sie Ihren
                      Tarif vorab.
                    </p>
                  </div>
                </div>
              </div>

              {/* Gesetzlich */}
              <div className="bg-white border-2 border-blue-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">💳</div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3 font-epilogue">
                      Gesetzliche Krankenkassen
                    </h3>
                    <p className="text-slate-700 mb-3">
                      <strong className="text-blue-600">40-60€ Zuschuss</strong> pro Sitzung
                    </p>
                    <p className="text-slate-600 text-sm">
                      Viele gesetzliche Kassen bezuschussen 3-6 Sitzungen pro Jahr.
                      Oft ist eine ärztliche Empfehlung erforderlich.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Erstattende Kassen */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4 font-epilogue">
                Beispiele erstattender Kassen in Hamburg
              </h3>
              <div className="grid sm:grid-cols-3 gap-3 text-slate-700 mb-4">
                <div>✓ Techniker Krankenkasse (TK)</div>
                <div>✓ DAK-Gesundheit</div>
                <div>✓ Barmer</div>
                <div>✓ AOK Rheinland/Hamburg</div>
                <div>✓ IKK Classic</div>
                <div>✓ BKK (verschiedene)</div>
                <div>✓ HEK</div>
                <div>✓ KKH</div>
                <div>✓ hkk</div>
              </div>
              <p className="text-sm text-slate-600">
                <strong>Wichtig:</strong> Erstattungsbeträge können variieren.
                Informieren Sie sich bitte vorab bei Ihrer Krankenkasse über die
                aktuellen Konditionen.
              </p>
            </div>
          </div>
        </section>

        {/* Warum diese Kosten */}
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight mb-8 font-epilogue">
              Warum kostet Osteopathie mehr als Physiotherapie?
            </h2>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🎓</div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                      Umfassende Ausbildung
                    </h3>
                    <p className="text-slate-700">
                      Osteopathen absolvieren eine 4-5 jährige Vollzeitausbildung mit
                      <strong> 1350-5000 Stunden</strong> (BAO: 5000+ Std.). Physiotherapeuten
                      haben eine 3-jährige Ausbildung mit ca. 2900 Stunden.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">⏱️</div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                      Intensive Behandlungszeit
                    </h3>
                    <p className="text-slate-700">
                      Eine osteopathische Behandlung dauert <strong>45-60 Minuten</strong> mit
                      ausführlicher Anamnese und ganzheitlicher Untersuchung. Physiotherapie-Sitzungen
                      auf Rezept dauern oft nur 15-20 Minuten.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🔍</div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                      Ganzheitlicher Ansatz
                    </h3>
                    <p className="text-slate-700">
                      Osteopathie behandelt nicht nur Symptome, sondern sucht nach den
                      <strong> Ursachen im gesamten Körper</strong>. Das erfordert umfangreiches
                      anatomisches und physiologisches Wissen.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🩺</div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                      Eigenverantwortliche Behandlung
                    </h3>
                    <p className="text-slate-700">
                      Als Heilpraktiker kann ich Sie <strong>ohne ärztliche Verordnung</strong> behandeln
                      und eigenverantwortlich diagnostizieren. Das setzt höhere Qualifikationen voraus.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Preisrechner */}
        <section className="bg-slate-50 py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight mb-8 font-epilogue text-center">
              Was zahlen Sie effektiv?
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Privat versichert */}
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 font-epilogue">
                  Privat versichert
                </h3>
                <div className="text-4xl font-bold text-green-600 mb-2">0€</div>
                <p className="text-slate-600 text-sm mb-4">
                  Meist vollständige Erstattung durch die Versicherung
                </p>
                <div className="text-xs text-slate-500">
                  Sie zahlen: 150€<br />
                  Erstattung: ~150€<br />
                  <strong>Effektiv: 0€</strong>
                </div>
              </div>

              {/* Gesetzlich mit Zuschuss */}
              <div className="bg-white border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 font-epilogue">
                  Gesetzlich (mit Zuschuss)
                </h3>
                <div className="text-4xl font-bold text-blue-600 mb-2">90-110€</div>
                <p className="text-slate-600 text-sm mb-4">
                  Nach Kassenerstattung (40-60€)
                </p>
                <div className="text-xs text-slate-500">
                  Sie zahlen: 150€<br />
                  Erstattung: ~40-60€<br />
                  <strong>Effektiv: 90-110€</strong>
                </div>
              </div>

              {/* Selbstzahler */}
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 font-epilogue">
                  Selbstzahler
                </h3>
                <div className="text-4xl font-bold text-slate-900 mb-2">150€</div>
                <p className="text-slate-600 text-sm mb-4">
                  Voller Preis ohne Erstattung
                </p>
                <div className="text-xs text-slate-500">
                  Sie zahlen: 150€<br />
                  Erstattung: 0€<br />
                  <strong>Effektiv: 150€</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight mb-12 font-epilogue text-center">
              Häufige Fragen zu Kosten
            </h2>

            <div className="space-y-4">
              <details className="bg-slate-50 border border-slate-200 rounded-lg p-6 group">
                <summary className="text-lg font-semibold text-slate-900 cursor-pointer list-none font-epilogue flex justify-between items-start">
                  <span className="pr-4">Kann ich in Raten zahlen?</span>
                  <span className="shrink-0 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-4 text-slate-700 leading-relaxed">
                  Die Behandlung ist direkt nach der Sitzung zu bezahlen (bar oder EC-Karte).
                  Ratenzahlung ist grundsätzlich nicht vorgesehen. In Einzelfällen und nach
                  Absprache sind individuelle Lösungen möglich - sprechen Sie mich gerne an.
                </div>
              </details>

              <details className="bg-slate-50 border border-slate-200 rounded-lg p-6 group">
                <summary className="text-lg font-semibold text-slate-900 cursor-pointer list-none font-epilogue flex justify-between items-start">
                  <span className="pr-4">Gibt es Ermäßigungen für Studierende?</span>
                  <span className="shrink-0 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-4 text-slate-700 leading-relaxed">
                  Aktuell biete ich keine generelle Studierenden-Ermäßigung an. In sozialen
                  Härtefällen können wir nach individuellen Lösungen suchen. Bitte sprechen Sie
                  mich direkt an.
                </div>
              </details>

              <details className="bg-slate-50 border border-slate-200 rounded-lg p-6 group">
                <summary className="text-lg font-semibold text-slate-900 cursor-pointer list-none font-epilogue flex justify-between items-start">
                  <span className="pr-4">Wie reiche ich die Rechnung bei meiner Kasse ein?</span>
                  <span className="shrink-0 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-4 text-slate-700 leading-relaxed">
                  <p className="mb-3">Sie erhalten von mir eine detaillierte Rechnung nach GebüH
                  (Gebührenverzeichnis für Heilpraktiker). Diese reichen Sie ein:</p>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Rechnung + ggf. ärztliche Verordnung bei Ihrer Kasse einreichen</li>
                    <li>Meist online per App oder per Post möglich</li>
                    <li>Erstattung erfolgt meist innerhalb von 2-4 Wochen</li>
                  </ol>
                </div>
              </details>

              <details className="bg-slate-50 border border-slate-200 rounded-lg p-6 group">
                <summary className="text-lg font-semibold text-slate-900 cursor-pointer list-none font-epilogue flex justify-between items-start">
                  <span className="pr-4">Sind die Preise verhandelbar?</span>
                  <span className="shrink-0 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-4 text-slate-700 leading-relaxed">
                  Nein, die Preise sind festgelegt und orientieren sich an der GebüH sowie
                  den Marktpreisen in Hamburg. Sie garantieren eine hochqualitative,
                  individuelle Behandlung mit ausreichend Zeit.
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-slate-50 py-16 sm:py-24 px-4 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 sm:p-12 text-center text-white shadow-xl">
              <h2 className="text-3xl sm:text-4xl font-light mb-4 font-epilogue tracking-tight">
                Investieren Sie in Ihre Gesundheit
              </h2>
              <p className="text-xl mb-8 text-slate-200 font-light">
                150€ für 60 Minuten intensive osteopathische Betreuung.
                Transparente Preise, faire Behandlung.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/terminbuchung/"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-slate-900 bg-white rounded-md hover:shadow-lg hover:transform hover:-translate-y-1 transition-all duration-300"
                >
                  📅 Jetzt Termin buchen
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

        {/* Related Links */}
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="text-3xl font-light text-slate-900 tracking-tight text-center mb-8 font-epilogue">
              Weitere Informationen
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/kosten-ablauf/"
                className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-900 transition-colors"
              >
                <div className="text-3xl mb-3">💶</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                  Kosten & Ablauf
                </h3>
                <p className="text-slate-600">
                  Detaillierte Informationen zu Preisen, Behandlungsablauf und Erstattung.
                </p>
              </Link>

              <Link
                href="/faq/"
                className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-900 transition-colors"
              >
                <div className="text-3xl mb-3">📋</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                  Patienteninfos
                </h3>
                <p className="text-slate-600">
                  Was Sie zur Behandlung mitbringen sollten und wie Sie sich vorbereiten.
                </p>
              </Link>

              <Link
                href="/faq/"
                className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-900 transition-colors"
              >
                <div className="text-3xl mb-3">❓</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                  FAQ
                </h3>
                <p className="text-slate-600">
                  Antworten auf häufige Fragen zur Osteopathie, Kosten und Behandlung.
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
