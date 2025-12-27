import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSchema from "@/components/FAQSchema";
import SiteHeader from "@/app/(site)/components/SiteHeader";
import SiteFooter from "@/app/(site)/components/SiteFooter";

export const metadata: Metadata = {
  title: "Osteopathie Hamburg Eimsbüttel | Joshua Alsen | VFO-zertifiziert",
  description:
    "Osteopathie Hamburg Eimsbüttel ✓ Joshua Alsen ✓ VFO-zertifiziert ✓ Stresemannallee 118 ✓ Termine binnen 48h ✓ S-Bahn Eidelstedt ✓ Kassenzuschuss möglich ⭐ Jetzt Termin buchen!",
  keywords: [
    "Osteopathie Eimsbüttel",
    "Osteopath Eimsbüttel",
    "Heilpraktiker Eimsbüttel",
    "Osteopathie Hamburg Eimsbüttel",
    "Osteopath Hamburg Altona",
  ],
  alternates: { canonical: "/osteopathie-eimsbuettel/" },
  openGraph: {
    title: "Osteopathie Hamburg Eimsbüttel | Joshua Alsen",
    description:
      "Osteopathie Hamburg Eimsbüttel ✓ Joshua Alsen ✓ VFO-zertifiziert ✓ Stresemannallee 118 ✓ Termine binnen 48h ✓ Kassenzuschuss möglich ⭐ Jetzt buchen!",
    url: "/osteopathie-eimsbuettel",
    siteName: "Osteopathie Hamburg - Joshua Alsen",
    images: [
      {
        url: "/assets/joshua-alsen-osteopath-hamburg-og.webp",
        width: 1200,
        height: 630,
        alt: "Osteopathie Hamburg Eimsbüttel - Joshua Alsen",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Osteopathie Hamburg Eimsbüttel | Joshua Alsen",
    description:
      "Osteopathie Eimsbüttel ✓ VFO-zertifiziert ✓ Stresemannallee 118 ✓ Termine binnen 48h ✓ Kassenzuschuss ⭐",
    images: ["/assets/joshua-alsen-osteopath-hamburg-twitter.webp"],
  },
};

export default function OsteopathieEimsbuettelPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <FAQSchema
          faqs={[
            {
              question: "Wo finde ich die Osteopathie-Praxis in Eimsbüttel?",
              answer:
                "Die Praxis befindet sich in der Stresemannallee 118, 22529 Hamburg-Eimsbüttel. Gut erreichbar mit S-Bahn und Bus.",
            },
            {
              question: "Gibt es Parkplätze in der Nähe der Praxis Eimsbüttel?",
              answer:
                "In den umliegenden Straßen gibt es Anwohnerparkplätze. Die Stresemannallee bietet ebenfalls begrenzte Parkmöglichkeiten.",
            },
            {
              question: "Wie komme ich mit öffentlichen Verkehrsmitteln zur Praxis?",
              answer:
                "S-Bahn S21, S3 bis Eidelstedt oder Bus 22, 181 bis Kieler Straße. Die Praxis ist von den Haltestellen gut zu Fuß erreichbar.",
            },
            {
              question: "Was kostet eine osteopathische Behandlung in Eimsbüttel?",
              answer:
                "Eine Behandlung kostet 150€ (45-60 Minuten). Viele private und gesetzliche Krankenkassen erstatten einen Teil der Kosten.",
            },
          ]}
        />
      <Breadcrumbs
        items={[{ label: "Osteopathie Eimsbüttel" }]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 font-epilogue">
              Osteopathie Hamburg Eimsbüttel
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              VFO-zertifizierter Osteopath und Heilpraktiker in Hamburg-Eimsbüttel.
              Ganzheitliche osteopathische Behandlungen in ruhiger Lage.
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
                Ruhige Lage
              </h3>
              <p className="text-slate-600">
                Stresemannallee 118, Eimsbüttel<br />
                Gut mit S-Bahn & Bus erreichbar
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
            Praxisstandort Eimsbüttel
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-4 font-epilogue flex items-center gap-2">
                  <span>📍</span> Adresse
                </h3>
                <p className="text-slate-700 text-lg">
                  <strong>Stresemannallee 118</strong><br />
                  22529 Hamburg-Eimsbüttel<br />
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
                    <strong className="text-slate-900">S-Bahn:</strong><br />
                    S21, S3 bis Eidelstedt (ca. 10 Min. Fußweg)
                  </div>
                  <div>
                    <strong className="text-slate-900">Bus:</strong><br />
                    Linie 22, 181 bis Kieler Straße
                  </div>
                  <div>
                    <strong className="text-slate-900">Auto:</strong><br />
                    Anwohnerparkplätze in den Nebenstraßen<br />
                    Parkplätze entlang der Stresemannallee
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2368.123456789!2d9.912345678!3d53.612345678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b18f123456789a%3A0x123456789abcdef0!2sStresemannallee%20118%2C%2022529%20Hamburg!5e0!3m2!1sde!2sde!4v1234567890123!5m2!1sde!2sde"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Karte Osteopathie Praxis Eimsbüttel"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eimsbüttel als Stadtteil */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-8 font-epilogue">
            Osteopathie im grünen Eimsbüttel
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-slate-700 leading-relaxed mb-4">
              Eimsbüttel ist einer der beliebtesten Stadtteile Hamburgs und zeichnet sich durch
              seine grüne, familienfreundliche Atmosphäre aus. Der Standort in der Stresemannallee
              bietet eine ruhige Umgebung, die ideal für osteopathische Behandlungen ist.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Die Praxis liegt verkehrsgünstig und ist sowohl mit öffentlichen Verkehrsmitteln
              als auch mit dem Auto gut zu erreichen. Die Nähe zu den Grünflächen wie dem
              Eimsbütteler Park und der Kieler Straße macht den Stadtteil besonders lebenswert.
            </p>
            <h3 className="text-2xl font-semibold text-slate-900 mb-4 mt-8 font-epilogue">
              Was Eimsbüttel besonders macht
            </h3>
            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6">
              <li>Grüner, familienfreundlicher Stadtteil mit hoher Lebensqualität</li>
              <li>Vielfältige Einkaufsmöglichkeiten und gemütliche Cafés</li>
              <li>Gute Verkehrsanbindung mit S-Bahn und Bus</li>
              <li>Nähe zu Parks und Grünflächen für Entspannung</li>
              <li>Lebendiges Quartier mit vielseitigem kulturellen Angebot</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Behandlungsangebot */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-12 font-epilogue">
            Behandlungsangebot in Eimsbüttel
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
            Häufige Fragen zur Praxis Eimsbüttel
          </h2>
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                Wo finde ich die Osteopathie-Praxis in Eimsbüttel?
              </h3>
              <p className="text-slate-600">
                Die Praxis befindet sich in der Stresemannallee 118, 22529 Hamburg-Eimsbüttel.
                Gut erreichbar mit S-Bahn und Bus.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                Gibt es Parkplätze in der Nähe der Praxis Eimsbüttel?
              </h3>
              <p className="text-slate-600">
                In den umliegenden Straßen gibt es Anwohnerparkplätze. Die Stresemannallee
                bietet ebenfalls begrenzte Parkmöglichkeiten.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                Wie komme ich mit öffentlichen Verkehrsmitteln zur Praxis?
              </h3>
              <p className="text-slate-600">
                S-Bahn S21, S3 bis Eidelstedt oder Bus 22, 181 bis Kieler Straße. Die Praxis
                ist von den Haltestellen gut zu Fuß erreichbar.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                Was kostet eine osteopathische Behandlung in Eimsbüttel?
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
              Termin in Eimsbüttel vereinbaren
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
