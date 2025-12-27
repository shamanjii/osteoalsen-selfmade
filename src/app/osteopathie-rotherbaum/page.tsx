import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSchema from "@/components/FAQSchema";
import SiteHeader from "@/app/(site)/components/SiteHeader";
import SiteFooter from "@/app/(site)/components/SiteFooter";

export const metadata: Metadata = {
  title: "Osteopath Rotherbaum Hamburg | VFO-zertifiziert | Joshua Alsen",
  description:
    "Ihr Osteopath in Rotherbaum ✓ Ganzheitliche Schmerzbehandlung ✓ VFO-zertifiziert ✓ Zentrale Lage Rappstraße 7 ✓ Termine binnen 48h ✓ Vollständige Kassenerstattung möglich ⭐ Jetzt buchen!",
  keywords: [
    "Osteopathie Rotherbaum",
    "Osteopath Rotherbaum",
    "Heilpraktiker Rotherbaum",
    "Osteopathie Hamburg Rotherbaum",
    "Osteopath Hamburg Mitte",
    "heilpraktiker hamburg rotherbaum"
  ],
  alternates: { canonical: "/osteopathie-rotherbaum/" },
  openGraph: {
    title: "Osteopath Rotherbaum Hamburg | VFO-zertifiziert | Joshua Alsen",
    description:
      "Ihr Osteopath in Rotherbaum ✓ Ganzheitliche Schmerzbehandlung ✓ VFO-zertifiziert ✓ Zentrale Lage Rappstraße 7 ✓ Termine binnen 48h ✓ Vollständige Kassenerstattung möglich",
    url: "/osteopathie-rotherbaum",
    siteName: "Osteopathie Hamburg - Joshua Alsen",
    images: [
      {
        url: "/assets/joshua-alsen-osteopath-hamburg-og.webp",
        width: 1200,
        height: 630,
        alt: "Osteopathie Hamburg Rotherbaum - Joshua Alsen",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Osteopath Rotherbaum Hamburg | Joshua Alsen",
    description:
      "Osteopath Rotherbaum ✓ Ganzheitliche Schmerzbehandlung ✓ VFO-zertifiziert ✓ Vollständige Kassenerstattung möglich ⭐ Jetzt Termin buchen!",
    images: ["/assets/joshua-alsen-osteopath-hamburg-twitter.webp"],
  },
};

export default function OsteopathieRotherbaumPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <FAQSchema
          faqs={[
            {
              question: "Wo finde ich die Osteopathie-Praxis in Rotherbaum?",
              answer:
                "Die Praxis befindet sich in der Rappstraße 7, 20146 Hamburg-Rotherbaum. Nur 3 Gehminuten von der U-Bahn Station Hallerstraße (U1) entfernt.",
            },
            {
              question: "Gibt es Parkplätze in der Nähe der Praxis Rotherbaum?",
              answer:
                "In den umliegenden Straßen gibt es Anwohnerparkplätze. Alternativ können Sie das Parkhaus am Grindelhof (ca. 5 Min. Fußweg) nutzen.",
            },
            {
              question: "Wie komme ich mit öffentlichen Verkehrsmitteln zur Praxis?",
              answer:
                "U-Bahn U1 bis Station Hallerstraße (3 Min. Fußweg). Alternativ: Buslinie 4, 5 bis Hallerstraße oder Grindelhof.",
            },
            {
              question: "Was kostet eine osteopathische Behandlung in Rotherbaum?",
              answer:
                "Eine Behandlung kostet 150€ (45-60 Minuten). Viele private und gesetzliche Krankenkassen erstatten einen Teil der Kosten.",
            },
          ]}
        />
        <Breadcrumbs
          items={[{ label: "Osteopathie Rotherbaum" }]}
        />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 font-epilogue">
              Osteopathie Hamburg Rotherbaum
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              VFO-zertifizierter Osteopath und Heilpraktiker in Hamburg-Rotherbaum.
              Ganzheitliche osteopathische Behandlungen in zentraler Lage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/terminbuchung"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-slate-900 rounded-md hover:bg-slate-800 hover:transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                📅 Termin buchen
              </Link>
              <a
                href="tel:+4917643990001"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold border-2 border-slate-900 text-slate-900 rounded-md hover:bg-slate-900 hover:text-white transition-all duration-300"
              >
                📞 0176 4399 0001
              </a>
            </div>
          </div>

          {/* Quick Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white border border-slate-200 rounded-xl p-6 text-center shadow-sm">
              <div className="text-4xl mb-3">📍</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                Zentrale Lage
              </h3>
              <p className="text-slate-600">
                Rappstraße 7, Rotherbaum<br />
                3 Min. von U1 Hallerstraße
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 text-center shadow-sm">
              <div className="text-4xl mb-3">⏱️</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                Kurzfristige Termine
              </h3>
              <p className="text-slate-600">
                Termine oft binnen 48 Stunden<br />
                Online-Buchung verfügbar
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 text-center shadow-sm">
              <div className="text-4xl mb-3">🎓</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                VFO-zertifiziert
              </h3>
              <p className="text-slate-600">
                BAO-Ausbildung (5.000+ Std.)<br />
                Kassenzuschuss möglich
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Praxisstandort */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-12 font-epilogue">
            Praxisstandort Rotherbaum
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-4 font-epilogue flex items-center gap-2">
                  <span>📍</span> Adresse
                </h3>
                <p className="text-slate-700 text-lg">
                  <strong>Rappstraße 7</strong><br />
                  20146 Hamburg-Rotherbaum<br />
                  <br />
                  Ich praktiziere in den etablierten Räumlichkeiten der{" "}
                  <strong>Praxis für Osteopathie Hamburg Rotherbaum & Eimsbüttel</strong>.
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-4 font-epilogue flex items-center gap-2">
                  <span>🚇</span> Anfahrt
                </h3>
                <div className="space-y-3 text-slate-700">
                  <div>
                    <strong className="text-slate-900">U-Bahn:</strong><br />
                    U1 bis Hallerstraße (3 Min. Fußweg)
                  </div>
                  <div>
                    <strong className="text-slate-900">Bus:</strong><br />
                    Linie 4, 5 bis Hallerstraße oder Grindelhof
                  </div>
                  <div>
                    <strong className="text-slate-900">Auto:</strong><br />
                    Anwohnerparkplätze in den Nebenstraßen<br />
                    Parkhaus Grindelhof (ca. 5 Min. Fußweg)
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-4 font-epilogue flex items-center gap-2">
                  <span>📞</span> Kontakt
                </h3>
                <p className="text-slate-700">
                  <strong className="text-slate-900">Telefon:</strong><br />
                  <a href="tel:+4917643990001" className="text-blue-600 hover:text-blue-800 font-medium">
                    0176 4399 0001
                  </a>
                  <br /><br />
                  <strong className="text-slate-900">E-Mail:</strong><br />
                  <a href="mailto:joshua@alsen.info" className="text-blue-600 hover:text-blue-800 font-medium">
                    joshua@alsen.info
                  </a>
                </p>
              </div>
            </div>

            <div>
              <div className="bg-slate-100 rounded-xl overflow-hidden" style={{ height: '500px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2368.4179437641837!2d9.987241976926285!3d53.56836997237858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b18f0e8f0e3b3d%3A0x6f0e8f0e8f0e8f0e!2sRappstra%C3%9Fe%207%2C%2020146%20Hamburg!5e0!3m2!1sde!2sde!4v1234567890123!5m2!1sde!2sde"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Karte Osteopathie Praxis Rotherbaum"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rotherbaum als Stadtteil */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-8 font-epilogue">
            Osteopathie im Herzen von Rotherbaum
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-slate-700 leading-relaxed mb-4">
              Rotherbaum ist ein zentraler, lebendiger Stadtteil in Hamburg-Mitte, der sich
              perfekt für eine osteopathische Praxis eignet. Die Lage zwischen Grindelviertel
              und Harvestehude macht den Standort für Patienten aus ganz Hamburg gut erreichbar.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Die Praxis in der Rappstraße 7 liegt nur wenige Gehminuten von der U-Bahn Station
              Hallerstraße entfernt und ist somit optimal mit öffentlichen Verkehrsmitteln zu erreichen.
              Die Nähe zur Universität Hamburg und zum Universitätsklinikum Eppendorf (UKE) macht
              Rotherbaum zu einem lebendigen Quartier mit hoher Lebensqualität.
            </p>
            <h3 className="text-2xl font-semibold text-slate-900 mb-4 mt-8 font-epilogue">
              Was Rotherbaum besonders macht
            </h3>
            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6">
              <li>Zentrale Lage mit hervorragender Verkehrsanbindung</li>
              <li>Lebendiges Universitätsviertel mit vielfältiger Gastronomie</li>
              <li>Grünflächen wie der Alsterpark in unmittelbarer Nähe</li>
              <li>Kulturelle Vielfalt und studentisches Flair</li>
              <li>Kurze Wege zu anderen Stadtteilen wie Eimsbüttel, Harvestehude und Eppendorf</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Behandlungsangebot */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-12 font-epilogue">
            Behandlungsangebot in Rotherbaum
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/behandlungen/rueckenschmerzen"
              className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-3">🦴</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                Rückenschmerzen
              </h3>
              <p className="text-slate-600">
                Bandscheiben, ISG-Blockaden, Hexenschuss
              </p>
            </Link>
            <Link
              href="/behandlungen/kopfschmerzen-migraene"
              className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-3">🧠</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                Kopfschmerzen & Migräne
              </h3>
              <p className="text-slate-600">
                Spannungskopfschmerz, Migräne, CMD
              </p>
            </Link>
            <Link
              href="/behandlungen/nackenschmerzen"
              className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-3">🔄</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                Nackenschmerzen
              </h3>
              <p className="text-slate-600">
                HWS-Syndrom, Schulter-Nacken-Verspannungen
              </p>
            </Link>
            <Link
              href="/behandlungen/sportverletzungen"
              className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-3">⚽</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                Sportverletzungen
              </h3>
              <p className="text-slate-600">
                Zerrungen, Überlastung, Regeneration
              </p>
            </Link>
            <Link
              href="/behandlungen/verdauungsbeschwerden"
              className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-3">🫁</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                Verdauungsbeschwerden
              </h3>
              <p className="text-slate-600">
                Reizdarm, Blähungen, Verstopfung
              </p>
            </Link>
            <Link
              href="/behandlungen"
              className="bg-slate-900 text-white rounded-xl p-6 hover:bg-slate-800 transition-colors flex items-center justify-center"
            >
              <div className="text-center">
                <div className="text-4xl mb-3">➕</div>
                <h3 className="text-xl font-semibold mb-2 font-epilogue">
                  Alle Behandlungen
                </h3>
                <p className="text-slate-300 text-sm">
                  Entdecken Sie das vollständige Angebot
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-12 font-epilogue">
            Häufige Fragen zur Praxis Rotherbaum
          </h2>
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                Wo finde ich die Osteopathie-Praxis in Rotherbaum?
              </h3>
              <p className="text-slate-600">
                Die Praxis befindet sich in der Rappstraße 7, 20146 Hamburg-Rotherbaum.
                Nur 3 Gehminuten von der U-Bahn Station Hallerstraße (U1) entfernt.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                Gibt es Parkplätze in der Nähe der Praxis Rotherbaum?
              </h3>
              <p className="text-slate-600">
                In den umliegenden Straßen gibt es Anwohnerparkplätze. Alternativ können
                Sie das Parkhaus am Grindelhof (ca. 5 Min. Fußweg) nutzen.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                Wie komme ich mit öffentlichen Verkehrsmitteln zur Praxis?
              </h3>
              <p className="text-slate-600">
                U-Bahn U1 bis Station Hallerstraße (3 Min. Fußweg). Alternativ: Buslinie 4, 5
                bis Hallerstraße oder Grindelhof.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                Was kostet eine osteopathische Behandlung in Rotherbaum?
              </h3>
              <p className="text-slate-600">
                Eine Behandlung kostet 150€ (45-60 Minuten). Viele private und gesetzliche
                Krankenkassen erstatten einen Teil der Kosten. Mehr Informationen zu{" "}
                <Link href="/kosten-ablauf" className="text-blue-600 hover:text-blue-800 font-medium">
                  Kosten und Ablauf
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-white px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 sm:p-12 text-center text-white shadow-xl">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-epilogue">
              Termin in Rotherbaum vereinbaren
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
            <p className="text-sm text-slate-300 mt-6">
              Weitere Informationen{" "}
              <Link href="/ueber-mich" className="underline hover:text-white">
                über mich
              </Link>{" "}
              und meine{" "}
              <Link href="/behandlungen" className="underline hover:text-white">
                Behandlungsschwerpunkte
              </Link>
            </p>
          </div>
        </div>
      </section>
      </main>
      <SiteFooter />
    </div>
  );
}
