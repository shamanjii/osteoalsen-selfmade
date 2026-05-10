import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PersonSchema from "@/components/PersonSchema";

export const metadata: Metadata = {
  title: "Über mich | Osteopath Hamburg - Joshua Alsen",
  description:
    "Joshua Alsen ✓ VFO-Osteopath & Heilpraktiker ✓ 5.000+ Std. Ausbildung ✓ 2 Standorte Hamburg ⭐ Jetzt kennenlernen!",
  keywords: [
    "Joshua Alsen",
    "Osteopath Hamburg",
    "BAO zertifiziert",
    "VFO zertifiziert",
    "Heilpraktiker Hamburg",
    "Osteopathie Ausbildung",
  ],
  alternates: { canonical: "/ueber-mich/" },
  openGraph: {
    title: "Über mich - Joshua Alsen | Osteopath Hamburg",
    description:
      "Joshua Alsen ✓ VFO-zertifizierter Osteopath & Heilpraktiker ✓ BAO-Ausbildung (5.000+ Std.) ✓ Internationale Erfahrung ✓ 2 Standorte in Hamburg ⭐ Jetzt kennenlernen!",
    url: "/ueber-mich",
    siteName: "Osteopathie Hamburg - Joshua Alsen",
    images: [
      {
        url: "/assets/joshua-alsen-osteopath-hamburg-og.webp",
        width: 1200,
        height: 630,
        alt: "Joshua Alsen - Osteopath Hamburg",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Über mich - Joshua Alsen | Osteopath Hamburg",
    description:
      "Joshua Alsen ✓ VFO-zertifiziert ✓ BAO-Ausbildung ✓ Internationale Erfahrung ✓ 2 Standorte Hamburg ⭐",
    images: ["/assets/joshua-alsen-osteopath-hamburg-twitter.webp"],
  },
};

export default function UeberMichPage() {
  return (
    <>
      <PersonSchema
        name="Joshua Alsen"
        jobTitle="Osteopath und Heilpraktiker"
        url="https://www.osteoalsen.de/ueber-mich"
        imageUrl="https://www.osteoalsen.de/assets/joshua-alsen-osteopath-hamburg.webp"
        email="joshua@alsen.info"
        telephone="+4917643990001"
        address={{
          streetAddress: "Rappstraße 7",
          addressLocality: "Hamburg",
          postalCode: "20146",
          addressCountry: "DE",
        }}
        sameAs={[
          "https://www.osteopathie.de/praktikersuche",
          "https://www.vfo.de",
        ]}
      />
      <Breadcrumbs items={[{ label: "Über mich" }]} />

      {/* Hero Section */}
      <section className="bg-white pt-8 pb-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 lg:px-12 text-center">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-epilogue text-slate-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-light leading-tight mb-6">
              Joshua Alsen<br />
              <span className="font-normal">Heilpraktiker Hamburg Rotherbaum</span>
            </h1>
            <p className="text-slate-600 text-lg sm:text-xl md:text-2xl font-light leading-relaxed">
              VFO-zertifizierter Osteopath und Heilpraktiker in Hamburg-Rotherbaum
              & Eimsbüttel
            </p>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="relative">
            {/* Mobile: Image above text */}
            <div className="relative h-96 rounded-lg overflow-hidden mb-8 lg:hidden">
              <Image
                src="/assets/joshua-alsen-dozent.webp"
                alt="Joshua Alsen - Osteopath Hamburg"
                fill
                className="object-cover"
              />
            </div>

            {/* Desktop: Floating image with text wrap */}
            <div className="hidden lg:block lg:float-left lg:mr-8 lg:mb-6 lg:w-96 lg:h-[32rem] relative rounded-lg overflow-hidden">
              <Image
                src="/assets/joshua-alsen-dozent.webp"
                alt="Joshua Alsen - Osteopath Hamburg"
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-6 text-slate-700 text-lg leading-relaxed">
              <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight font-epilogue">
                Mein Weg zur Osteopathie
              </h2>

              <p>
                Geboren und aufgewachsen bin ich in Hamburg. Zur Osteopathie
                führte mich damals die Krebserkrankung meines Stiefvaters. Ich
                befand mich im Abitur und verbrachte mit ihm viel Zeit in
                Krankenhäusern. Während in mir der Wunsch wuchs, mich mit dem
                Thema Gesundheit zu beschäftigen, sank in mir die Befriedigung
                bei dem Gedanken, mich beruflich permanent in der Umgebung von
                Krankenhäusern zu bewegen.
              </p>

              <p>
                Nachdem ich mein Abitur 2015 beendet habe entschied ich mich
                gegen ein Medizinstudium und studierte stattdessen Osteopathie
                in Vollzeit an der Osteopathie Schule Deutschland. Eine
                Alternative zur allopathischen Medizin, die auf philosophischen
                Prinzipien beruht und davon ausgeht, dass der Körper zur
                Selbstheilung fähig ist, entfachte Begeisterung in mir.
              </p>

              <p>
                Nach einer fundierten Ausbildung akademischer Osteopathie in
                Hamburg, blieb ich nach dem Abschluss meines Studiums im Oktober
                2020 weiterhin an meiner Universität und arbeitete als
                Dolmetscher im Rahmen postgraduierter Kurse und
                Osteopathiekongressen eng mit zahlreichen internationalen
                Koryphäen der Osteopathie zusammen.
              </p>

              <p>
                Nach dem Bestehen meiner Heilpraktikerprüfung im Mai 2024
                entschied ich mich, meinen Fokus auf den klinischen Alltag zu
                richten und mich mit einer eigenen Praxis selbstständig zu
                machen. Seitdem praktiziere ich als Heilpraktiker in Hamburg Rotherbaum
                mit großer Freude und Hingabe in meiner eigenen Praxis für Osteopathie.
              </p>

              <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight font-epilogue mt-12">
                Meine Philosophie
              </h2>

              <p>
                Für mich ist Osteopathie mehr als eine Behandlungsmethode – es
                ist eine Philosophie, die den Menschen als Ganzes betrachtet.
                Jeder Körper hat seine eigene Geschichte, seine eigenen
                Kompensationsmuster und seine eigenen Ressourcen zur
                Selbstheilung.
              </p>

              <p>
                In meiner Praxis nehme ich mir Zeit für Sie. Eine Behandlung
                dauert 45-60 Minuten, in denen ich nicht nur Ihre akuten
                Beschwerden behandle, sondern auch die zugrundeliegenden Ursachen
                ergründe. Ich glaube an eine partnerschaftliche Zusammenarbeit
                zwischen Therapeut und Patient – denn nachhaltige Gesundheit
                entsteht durch Verständnis und aktive Mitarbeit.
              </p>

              <div className="clear-both"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Qualifications Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight text-center mb-12 font-epilogue">
            Ausbildung & Qualifikationen
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Osteopathie Ausbildung */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🎓</div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                    Osteopathie-Studium
                  </h3>
                  <p className="text-slate-600 mb-2">
                    <strong>Osteopathie Schule Deutschland (OSD)</strong>
                  </p>
                  <p className="text-slate-600">
                    Vollzeitstudium (2015-2020)<br />
                    Über 5.000 Ausbildungsstunden nach BAO-Standard<br />
                    Bachelor of Science (B.Sc.) Osteopathie<br />
                    <span className="text-sm text-slate-500">(mind. 1.350 Std. für Krankenkassenzulassung erforderlich)</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Heilpraktiker */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">⚕️</div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                    Heilpraktiker
                  </h3>
                  <p className="text-slate-600 mb-2">
                    <strong>Amtsärztliche Prüfung</strong>
                  </p>
                  <p className="text-slate-600">
                    Bestanden Mai 2024<br />
                    Gesundheitsamt Hamburg<br />
                    Berechtigung zur eigenständigen Patientenbehandlung
                  </p>
                </div>
              </div>
            </div>

            {/* Internationale Erfahrung */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🌍</div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                    Internationale Erfahrung
                  </h3>
                  <p className="text-slate-600 mb-2">
                    <strong>Dolmetscher & Dozent</strong>
                  </p>
                  <p className="text-slate-600">
                    Postgraduierte Kurse (2020-2024)<br />
                    Zusammenarbeit mit internationalen Experten<br />
                    Osteopathie-Kongresse
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BAO & VFO Section */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight text-center mb-12 font-epilogue">
            Zertifizierungen & Mitgliedschaften
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* BAO Section */}
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="text-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">🏆</div>
                  <h3 className="text-2xl font-semibold text-slate-900 font-epilogue">
                    Nach BAO-Standard ausgebildet
                  </h3>
                </div>
                <p className="text-lg font-semibold text-slate-900 mb-4">
                  Bundesarbeitsgemeinschaft Osteopathie e.V.
                </p>
                <p className="leading-relaxed mb-4">
                  Die BAO ist der Dachverband der bedeutendsten deutschen Osteopathie-Verbände
                  und definiert die höchsten Ausbildungsstandards in Deutschland.
                </p>
                <p className="leading-relaxed">
                  Meine Ausbildung mit über 5.000 Stunden entspricht dem BAO-Standard und
                  garantiert Ihnen höchste fachliche Kompetenz und Behandlungsqualität.
                </p>
              </div>
            </div>

            {/* VFO Section */}
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="text-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-16 h-16 shrink-0">
                    <Image
                      src="/assets/vfo-logo.webp"
                      alt="VFO Logo - Verband Freier Osteopathen"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900 font-epilogue">
                    VFO-Mitglied
                  </h3>
                </div>
                <p className="text-lg font-semibold text-slate-900 mb-4">
                  Verband Freier Osteopathen e.V.
                </p>
                <p className="leading-relaxed mb-4">
                  Als osteopathisches Praxismitglied im VFO profitieren Sie von
                  den zahlreichen Vorteilen eines anerkannten Berufsverbands.
                </p>
                <p className="leading-relaxed">
                  Die Mitgliedschaft gewährleistet regelmäßige Qualitätssicherung durch
                  fortlaufende Fortbildungen und ermöglicht die Abrechnung mit den Krankenkassen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Me Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight text-center mb-12 font-epilogue">
            Warum Sie sich für meine Praxis entscheiden sollten
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">⏱️</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                Zeit für Sie
              </h3>
              <p className="text-slate-600">
                45-60 Minuten intensive Behandlung. Keine Fließbandabfertigung,
                sondern individuelle Betreuung.
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                Ganzheitlicher Ansatz
              </h3>
              <p className="text-slate-600">
                Ich betrachte Beschwerden im Zusammenhang des gesamten
                Bewegungsapparats – mit Blick auf funktionelle Zusammenhänge.
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                Partnerschaftlich
              </h3>
              <p className="text-slate-600">
                Transparente Kommunikation und gemeinsame Erarbeitung eines
                individuellen Behandlungsplans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-50 py-16 sm:py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 sm:p-12 text-center text-white shadow-xl">
            <h2 className="text-3xl sm:text-4xl font-light mb-4 font-epilogue tracking-tight">
              Lernen Sie mich persönlich kennen
            </h2>
            <p className="text-xl mb-8 text-slate-200 font-light">
              Vereinbaren Sie jetzt einen Termin in meiner Praxis in
              Hamburg-Rotherbaum oder Eimsbüttel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/terminbuchung/"
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
