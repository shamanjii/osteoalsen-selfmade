import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSchema from "@/components/FAQSchema";

export const metadata: Metadata = {
  title: "Kosten & Ablauf | Osteopathie Hamburg - Joshua Alsen",
  description:
    "Transparente Preise für osteopathische Behandlungen in Hamburg: 150€ für 45-60 Min. Viele Krankenkassen erstatten die Kosten. Ablauf der Erstbehandlung und Folgetermine.",
  keywords: [
    "Osteopathie Kosten Hamburg",
    "Kassenerstattung Osteopathie",
    "Was kostet Osteopath Hamburg",
    "Osteopathie Preise",
    "Krankenkasse Osteopathie",
  ],
  alternates: { canonical: "/kosten-ablauf" },
  openGraph: {
    title: "Kosten & Ablauf | Osteopathie Hamburg",
    description:
      "Transparente Preise: 150€ für 45-60 Min. Viele Krankenkassen erstatten die Kosten. Informieren Sie sich über den Behandlungsablauf.",
    url: "/kosten-ablauf",
    siteName: "Osteopathie Hamburg - Joshua Alsen",
    images: [
      {
        url: "/assets/joshua-alsen-osteopath-hamburg-og.webp",
        width: 1200,
        height: 630,
        alt: "Kosten & Ablauf - Osteopathie Hamburg",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kosten & Ablauf | Osteopathie Hamburg",
    description:
      "Transparente Preise: 150€ für 45-60 Min. Viele Krankenkassen erstatten die Kosten.",
    images: ["/assets/joshua-alsen-osteopath-hamburg-twitter.webp"],
  },
};

export default function KostenAblaufPage() {
  return (
    <>
      <FAQSchema
        faqs={[
          {
            question: "Was kostet eine osteopathische Behandlung?",
            answer:
              "Eine osteopathische Behandlung kostet 150€ und dauert 45-60 Minuten. Der Preis gilt sowohl für Erst- als auch Folgebehandlungen.",
          },
          {
            question: "Übernimmt die Krankenkasse die Kosten?",
            answer:
              "Viele private Krankenkassen übernehmen die vollen Kosten. Auch viele gesetzliche Krankenkassen beteiligen sich mit 40-60€ pro Sitzung (meist 3-6 Sitzungen pro Jahr). Informieren Sie sich vorab bei Ihrer Kasse.",
          },
          {
            question: "Wie läuft die Erstbehandlung ab?",
            answer:
              "Die Erstbehandlung beginnt mit einem ausführlichen Anamnesegespräch (15-20 Min.), gefolgt von einer körperlichen Untersuchung und der osteopathischen Behandlung. Insgesamt dauert die Sitzung 60 Minuten.",
          },
          {
            question: "Welche Zahlungsmethoden werden akzeptiert?",
            answer:
              "Sie können bar oder per EC-Karte bezahlen. Die Rechnung erhalten Sie direkt nach der Behandlung und können diese bei Ihrer Krankenkasse zur Erstattung einreichen.",
          },
          {
            question: "Kann ich einen Termin stornieren?",
            answer:
              "Termine können bis 24 Stunden vor dem Termin kostenfrei storniert werden. Bei kurzfristigeren Absagen oder Nichterscheinen wird die volle Behandlungsgebühr in Rechnung gestellt.",
          },
        ]}
      />
      <Breadcrumbs items={[{ label: "Kosten & Ablauf" }]} />

      {/* Hero Section */}
      <section className="bg-white pt-8 pb-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 lg:px-12 text-center">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-epilogue text-slate-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-light leading-tight mb-6">
              Kosten & Ablauf
            </h1>
            <p className="text-slate-600 text-lg sm:text-xl md:text-2xl font-light leading-relaxed">
              Transparente Preise und Informationen zum Behandlungsablauf in
              meiner Praxis
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 sm:p-12 text-white text-center mb-12 shadow-xl">
            <h2 className="text-3xl sm:text-4xl font-light mb-4 font-epilogue tracking-tight">
              Preisübersicht
            </h2>
            <div className="text-6xl font-light mb-2">150€</div>
            <p className="text-2xl text-slate-200 font-light mb-6">
              pro Behandlung (45-60 Minuten)
            </p>
            <div className="bg-white/10 rounded-lg p-6 text-left max-w-2xl mx-auto">
              <p className="text-lg">
                ✓ Ausführliches Anamnesegespräch<br />
                ✓ Körperliche Untersuchung<br />
                ✓ Osteopathische Behandlung<br />
                ✓ Nachbesprechung & Empfehlungen<br />
                ✓ Rechnung zur Kasseneinreichung
              </p>
            </div>
          </div>

          <div className="max-w-none">
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight mb-6 font-epilogue">
              Was ist in der Behandlung enthalten?
            </h2>
            <p className="text-slate-700 text-lg leading-relaxed mb-6">
              Eine osteopathische Behandlung bei mir dauert zwischen 45 und 60
              Minuten und beinhaltet:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 text-lg mb-8">
              <li>
                Ausführliche Anamnese und Besprechung Ihrer Beschwerden
              </li>
              <li>
                Körperliche Untersuchung zur Identifikation der Ursachen
              </li>
              <li>
                Individuelle osteopathische Behandlung mit sanften manuellen
                Techniken
              </li>
              <li>Nachbesprechung und Empfehlungen für zu Hause</li>
              <li>
                Erstellung einer Rechnung zur Einreichung bei Ihrer
                Krankenkasse
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Insurance Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight mb-8 font-epilogue">
            Kostenerstattung durch Krankenkassen
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Private Krankenkassen */}
            <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🏥</div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3 font-epilogue">
                    Private Krankenkassen
                  </h3>
                  <p className="text-slate-700 mb-3">
                    Die meisten privaten Krankenkassen übernehmen die{" "}
                    <strong>vollen Kosten</strong> für osteopathische
                    Behandlungen.
                  </p>
                  <p className="text-slate-600 text-sm">
                    Je nach Tarif kann die Anzahl der erstatteten Sitzungen
                    variieren. Bitte informieren Sie sich vorab bei Ihrer
                    Versicherung.
                  </p>
                </div>
              </div>
            </div>

            {/* Gesetzliche Krankenkassen */}
            <div className="bg-white border-2 border-blue-200 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">💳</div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3 font-epilogue">
                    Gesetzliche Krankenkassen
                  </h3>
                  <p className="text-slate-700 mb-3">
                    Viele gesetzliche Kassen bezuschussen osteopathische
                    Behandlungen mit <strong>40-60€ pro Sitzung</strong>.
                  </p>
                  <p className="text-slate-600 text-sm">
                    Meist werden 3-6 Sitzungen pro Jahr bezuschusst. Eine
                    ärztliche Verordnung ist oft erforderlich.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-4 font-epilogue">
              Beispiele erstattender gesetzlicher Krankenkassen
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 text-slate-700">
              <div>✓ Techniker Krankenkasse (TK)</div>
              <div>✓ DAK Gesundheit</div>
              <div>✓ Barmer</div>
              <div>✓ AOK (regional unterschiedlich)</div>
              <div>✓ IKK</div>
              <div>✓ BKK (verschiedene Kassen)</div>
              <div>✓ HEK</div>
              <div>✓ KKH</div>
            </div>
            <p className="text-sm text-slate-600 mt-4">
              <strong>Hinweis:</strong> Die Erstattungsmodalitäten können sich
              ändern. Bitte informieren Sie sich vorab bei Ihrer Krankenkasse
              über die aktuellen Konditionen.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-4 font-epilogue">
              So funktioniert die Erstattung
            </h3>
            <ol className="list-decimal list-inside space-y-3 text-slate-700">
              <li>
                <strong>Ärztliche Verordnung einholen</strong> (bei gesetzlichen
                Kassen meist erforderlich)
              </li>
              <li>
                <strong>Termin vereinbaren</strong> und Behandlung wahrnehmen
              </li>
              <li>
                <strong>Rechnung bezahlen</strong> (bar oder EC-Karte)
              </li>
              <li>
                <strong>Rechnung bei Krankenkasse einreichen</strong> (mit
                Verordnung falls nötig)
              </li>
              <li>
                <strong>Erstattung erhalten</strong> (meist innerhalb von 2-4
                Wochen)
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Treatment Process Section */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight mb-8 font-epilogue">
            Wie läuft eine Behandlung ab?
          </h2>

          <div className="space-y-6">
            {/* Erstbehandlung */}
            <div className="bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900 mb-3 font-epilogue">
                    Erstbehandlung (60 Minuten)
                  </h3>
                  <div className="space-y-3 text-slate-700">
                    <div>
                      <strong>Anamnesegespräch (15-20 Min.)</strong>
                      <p className="text-slate-600">
                        Wir besprechen ausführlich Ihre aktuellen Beschwerden,
                        Krankengeschichte, Lebensumstände und Erwartungen an die
                        Behandlung.
                      </p>
                    </div>
                    <div>
                      <strong>Körperliche Untersuchung (10-15 Min.)</strong>
                      <p className="text-slate-600">
                        Ich untersuche Ihren gesamten Körper, um
                        Bewegungseinschränkungen, Spannungen und die Ursachen
                        Ihrer Beschwerden zu identifizieren.
                      </p>
                    </div>
                    <div>
                      <strong>Osteopathische Behandlung (25-30 Min.)</strong>
                      <p className="text-slate-600">
                        Mit sanften manuellen Techniken behandle ich die
                        identifizierten Problembereiche und aktiviere die
                        Selbstheilungskräfte Ihres Körpers.
                      </p>
                    </div>
                    <div>
                      <strong>Nachbesprechung (5 Min.)</strong>
                      <p className="text-slate-600">
                        Ich erkläre Ihnen meine Befunde, gebe Ihnen Übungen für
                        zu Hause und besprechen das weitere Vorgehen.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Folgebehandlungen */}
            <div className="bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900 mb-3 font-epilogue">
                    Folgebehandlungen (45-50 Minuten)
                  </h3>
                  <p className="text-slate-700 mb-3">
                    Bei Folgeterminen liegt der Fokus auf der Behandlung. Wir
                    besprechen kurz Ihre aktuelle Befindlichkeit und
                    Veränderungen seit der letzten Sitzung, dann folgt die
                    osteopathische Behandlung.
                  </p>
                  <p className="text-slate-600">
                    Je nach Beschwerdebild empfehle ich meist 3-6 Behandlungen
                    im Abstand von 1-3 Wochen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment & Cancellation */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Zahlungsmethoden */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight mb-6 font-epilogue">
                Zahlungsmethoden
              </h2>
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">💵</div>
                    <div>
                      <strong className="text-slate-900">Barzahlung</strong>
                      <p className="text-sm text-slate-600">
                        Zahlung direkt nach der Behandlung
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">💳</div>
                    <div>
                      <strong className="text-slate-900">EC-Karte</strong>
                      <p className="text-sm text-slate-600">
                        Zahlung per Girocard (Maestro/V-Pay)
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mt-4">
                  Sie erhalten direkt nach der Behandlung eine detaillierte
                  Rechnung zur Einreichung bei Ihrer Krankenkasse.
                </p>
              </div>
            </div>

            {/* Stornierungsbedingungen */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight mb-6 font-epilogue">
                Stornierungsbedingungen
              </h2>
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-2xl">✅</div>
                      <strong className="text-slate-900">
                        Bis 24h vorher
                      </strong>
                    </div>
                    <p className="text-slate-600">
                      Kostenfreie Stornierung oder Umbuchung des Termins
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-2xl">⚠️</div>
                      <strong className="text-slate-900">
                        Weniger als 24h
                      </strong>
                    </div>
                    <p className="text-slate-600">
                      Bei kurzfristiger Absage wird die volle
                      Behandlungsgebühr berechnet
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-2xl">❌</div>
                      <strong className="text-slate-900">
                        Nichterscheinen
                      </strong>
                    </div>
                    <p className="text-slate-600">
                      Bei Nichterscheinen ohne Absage wird die volle Gebühr in
                      Rechnung gestellt
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight text-center mb-12 font-epilogue">
            Häufige Fragen zu Kosten & Ablauf
          </h2>

          <div className="space-y-6">
            <details className="bg-white border border-slate-200 rounded-lg p-6 group">
              <summary className="text-lg font-semibold text-slate-900 cursor-pointer list-none font-epilogue">
                Brauche ich eine Überweisung vom Arzt?
                <span className="float-right group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <div className="mt-4 text-slate-700 leading-relaxed">
                <p>
                  Nein, eine Überweisung ist nicht zwingend erforderlich. Sie
                  können direkt einen Termin bei mir buchen. Für die
                  Kostenerstattung bei gesetzlichen Krankenkassen ist jedoch
                  oft eine ärztliche Verordnung/Empfehlung notwendig.
                </p>
              </div>
            </details>

            <details className="bg-white border border-slate-200 rounded-lg p-6 group">
              <summary className="text-lg font-semibold text-slate-900 cursor-pointer list-none font-epilogue">
                Wie viele Behandlungen sind in der Regel nötig?
                <span className="float-right group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <div className="mt-4 text-slate-700 leading-relaxed">
                <p>
                  Das ist sehr individuell und hängt von Art und Dauer Ihrer
                  Beschwerden ab. Bei akuten Beschwerden reichen oft 2-3
                  Sitzungen. Chronische Beschwerden können 4-6 oder mehr
                  Behandlungen erfordern. Nach der ersten Sitzung kann ich
                  Ihnen eine genauere Einschätzung geben.
                </p>
              </div>
            </details>

            <details className="bg-white border border-slate-200 rounded-lg p-6 group">
              <summary className="text-lg font-semibold text-slate-900 cursor-pointer list-none font-epilogue">
                Kann ich die Rechnung auf Raten zahlen?
                <span className="float-right group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <div className="mt-4 text-slate-700 leading-relaxed">
                <p>
                  Die Behandlung ist direkt nach der Sitzung zu bezahlen.
                  Ratenzahlung ist grundsätzlich nicht vorgesehen. In
                  Einzelfällen und nach Absprache sind individuelle Lösungen
                  möglich. Sprechen Sie mich gerne darauf an.
                </p>
              </div>
            </details>

            <details className="bg-white border border-slate-200 rounded-lg p-6 group">
              <summary className="text-lg font-semibold text-slate-900 cursor-pointer list-none font-epilogue">
                Was muss ich zur ersten Behandlung mitbringen?
                <span className="float-right group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <div className="mt-4 text-slate-700 leading-relaxed">
                <p className="mb-3">Bitte bringen Sie mit:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Versichertenkarte Ihrer Krankenkasse</li>
                  <li>
                    Ärztliche Verordnung/Empfehlung (falls vorhanden und für
                    Kassenerstattung benötigt)
                  </li>
                  <li>
                    Befunde und Arztberichte zu Ihren Beschwerden (falls
                    vorhanden)
                  </li>
                  <li>Bequeme Kleidung</li>
                </ul>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16 sm:py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 sm:p-12 text-center text-white shadow-xl">
            <h2 className="text-3xl sm:text-4xl font-light mb-4 font-epilogue tracking-tight">
              Noch Fragen?
            </h2>
            <p className="text-xl mb-8 text-slate-200 font-light">
              Kontaktieren Sie mich gerne telefonisch oder buchen Sie direkt
              einen Termin online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/terminbuchung"
                className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold text-slate-900 bg-white rounded-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1"
              >
                <span className="relative z-10">📅 Online Termin buchen</span>
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
    </>
  );
}
