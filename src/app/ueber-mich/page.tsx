import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Über mich - Joshua Alsen | Osteopath Hamburg",
  description:
    "Joshua Alsen - VFO-zertifizierter Osteopath und Heilpraktiker in Hamburg-Rotherbaum. Über 1.350 Stunden Ausbildung, internationale Erfahrung und Leidenschaft für Osteopathie.",
  keywords: [
    "Joshua Alsen",
    "Osteopath Hamburg",
    "VFO zertifiziert",
    "Heilpraktiker Hamburg",
    "Osteopathie Ausbildung",
  ],
  alternates: { canonical: "/ueber-mich" },
  openGraph: {
    title: "Über mich - Joshua Alsen | Osteopath Hamburg",
    description:
      "VFO-zertifizierter Osteopath und Heilpraktiker in Hamburg-Rotherbaum. Über 1.350 Stunden Ausbildung und Leidenschaft für Osteopathie.",
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
      "VFO-zertifizierter Osteopath und Heilpraktiker in Hamburg-Rotherbaum.",
    images: ["/assets/joshua-alsen-osteopath-hamburg-twitter.webp"],
  },
};

export default function UeberMichPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Über mich" }]} />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 font-epilogue">
              Über mich
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Joshua Alsen - Osteopath und Heilpraktiker in Hamburg-Rotherbaum
              & Eimsbüttel
            </p>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-16">
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
            <div className="hidden lg:block lg:float-left lg:mr-8 lg:mb-6 lg:w-96 lg:h-[32rem] relative rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/assets/joshua-alsen-dozent.webp"
                alt="Joshua Alsen - Osteopath Hamburg"
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-6 text-slate-700 text-lg leading-relaxed">
              <h2 className="text-3xl font-bold text-slate-900 font-epilogue">
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
                machen. Seitdem praktiziere ich mit großer Freude und Hingabe
                in meiner eigenen Praxis für Osteopathie in Hamburg.
              </p>

              <h2 className="text-3xl font-bold text-slate-900 font-epilogue mt-12">
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
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12 font-epilogue">
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
                    Über 1.350 Ausbildungsstunden<br />
                    Bachelor of Science (B.Sc.) Osteopathie
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

            {/* VFO Mitgliedschaft */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🏛️</div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                    VFO-Mitgliedschaft
                  </h3>
                  <p className="text-slate-600 mb-2">
                    <strong>Verband Freier Osteopathen e.V.</strong>
                  </p>
                  <p className="text-slate-600">
                    Zertifiziertes Mitglied<br />
                    Regelmäßige Fortbildungen<br />
                    Qualitätssicherung nach Verbandsrichtlinien
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

      {/* VFO Section */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-xl border border-slate-200 bg-white p-8 flex flex-col md:flex-row gap-8 items-start">
            <div className="relative w-48 h-48 shrink-0 self-center md:self-start">
              <Image
                src="/assets/vfo-logo.webp"
                alt="VFO Logo - Verband Freier Osteopathen"
                fill
                className="object-contain"
              />
            </div>
            <div className="text-slate-700">
              <h3 className="text-2xl font-semibold text-slate-900 mb-4 font-epilogue">
                Zertifiziertes Mitglied im Verband Freier Osteopathen e.V.
              </h3>
              <p className="leading-relaxed mb-4">
                Als osteopathisches Praxismitglied im Verband Freier Osteopathen
                e.V. (VFO) profitieren Sie von den zahlreichen Vorteilen eines
                anerkannten Berufsverbands.
              </p>
              <p className="leading-relaxed">
                Die Mitgliedschaft gewährleistet nicht nur eine regelmäßige
                Qualitätssicherung durch fortlaufende Fortbildungen und strenge
                Ethikrichtlinien, sondern ermöglicht auch die Abrechnung mit den
                Krankenkassen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Me Section */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12 font-epilogue">
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
                Ich behandle nicht nur Symptome, sondern suche nach den wahren
                Ursachen Ihrer Beschwerden.
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
      <section className="py-16 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="bg-gradient-to-br from-slate-900 to-slate-700 rounded-2xl p-8 sm:p-12 text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-epilogue">
              Lernen Sie mich persönlich kennen
            </h2>
            <p className="text-xl mb-8 text-slate-200">
              Vereinbaren Sie jetzt einen Termin in meiner Praxis in
              Hamburg-Rotherbaum oder Eimsbüttel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/terminbuchung"
                className="inline-block px-8 py-4 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
              >
                📅 Online Termin buchen
              </Link>
              <a
                href="tel:+4917643990001"
                className="inline-block px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-slate-900 transition-colors"
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
