import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Was ist Osteopathie? | Ganzheitliche Heilmethode erklärt",
  description:
    "Osteopathie ist eine ganzheitliche Heilmethode, die den Körper als Einheit betrachtet. Erfahren Sie mehr über Prinzipien, Behandlungsmethoden und für wen Osteopathie geeignet ist.",
  keywords: [
    "Was ist Osteopathie",
    "Osteopathie erklärt",
    "Osteopathie Definition",
    "Ganzheitliche Medizin",
    "Manuelle Therapie",
    "Osteopathie Hamburg",
  ],
  alternates: { canonical: "/was-ist-osteopathie" },
  openGraph: {
    title: "Was ist Osteopathie? | Osteopathie Hamburg",
    description:
      "Osteopathie ist eine ganzheitliche Heilmethode. Erfahren Sie alles über Prinzipien, Behandlungsmethoden und Anwendungsgebiete.",
    url: "/was-ist-osteopathie",
    siteName: "Osteopathie Hamburg - Joshua Alsen",
    images: [
      {
        url: "/assets/joshua-alsen-osteopath-hamburg-og.webp",
        width: 1200,
        height: 630,
        alt: "Was ist Osteopathie - Joshua Alsen Hamburg",
      },
    ],
    locale: "de_DE",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Was ist Osteopathie? | Osteopathie Hamburg",
    description:
      "Ganzheitliche Heilmethode erklärt - Prinzipien, Methoden und Anwendungsgebiete der Osteopathie.",
    images: ["/assets/joshua-alsen-osteopath-hamburg-twitter.webp"],
  },
};

export default function WasIstOsteopathiePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Was ist Osteopathie?" }]} />

      {/* Hero Section */}
      <section className="bg-white pt-8 pb-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 lg:px-12 text-center">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-epilogue text-slate-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-light leading-tight mb-6">
              Was ist Osteopathie?
            </h1>
            <p className="text-slate-600 text-lg sm:text-xl md:text-2xl font-light leading-relaxed">
              Eine ganzheitliche Heilmethode, die den Körper als Einheit
              betrachtet und die Selbstheilungskräfte aktiviert
            </p>
          </div>
        </div>
      </section>

      {/* Definition Section */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight font-epilogue mb-6">
                Definition und Grundprinzipien
              </h2>
              <div className="space-y-4 text-slate-700 text-lg leading-relaxed">
                <p>
                  Osteopathie ist eine <strong>ganzheitliche manuelle
                  Heilmethode</strong>, die den Menschen als funktionelle Einheit
                  von Körper, Geist und Seele betrachtet. Der Begriff stammt aus
                  dem Griechischen: "Osteon" (Knochen) und "Pathos" (Leiden).
                </p>
                <p>
                  Anders als die klassische Schulmedizin behandelt die
                  Osteopathie nicht nur einzelne Symptome, sondern sucht nach den
                  <strong> zugrundeliegenden Ursachen</strong> von Beschwerden –
                  oft fernab der schmerzenden Stelle.
                </p>
                <p>
                  Der Osteopath arbeitet ausschließlich mit seinen Händen, um
                  Blockaden und Funktionsstörungen im Körper zu erkennen und zu
                  behandeln. Ziel ist es, die körpereigenen
                  Selbstheilungskräfte zu aktivieren und das natürliche
                  Gleichgewicht wiederherzustellen.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/assets/joshua-alsen-behandlung.webp"
                alt="Osteopathische Behandlung - Joshua Alsen"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight font-epilogue mb-8">
            Geschichte der Osteopathie
          </h2>
          <div className="space-y-6 text-slate-700 text-lg leading-relaxed">
            <p>
              Die Osteopathie wurde Ende des 19. Jahrhunderts vom
              amerikanischen Arzt <strong>Dr. Andrew Taylor Still</strong> (1828-1917)
              begründet. Nach dem tragischen Verlust dreier seiner Kinder an
              Hirnhautentzündung begann Still, die damalige Medizin
              grundlegend zu hinterfragen.
            </p>
            <p>
              Er entwickelte ein neues Verständnis vom menschlichen Körper:
              Alle Strukturen des Körpers sind miteinander verbunden und
              beeinflussen sich gegenseitig. Wenn diese Strukturen frei
              beweglich und gut durchblutet sind, kann der Körper sich selbst
              heilen.
            </p>
            <p>
              1892 gründete Still die erste Osteopathie-Schule in Kirksville,
              Missouri (USA). Von dort aus verbreitete sich die Osteopathie
              weltweit. In Europa etablierte sie sich Anfang des 20.
              Jahrhunderts, zunächst in Großbritannien, später auch in
              Deutschland.
            </p>
          </div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight text-center mb-12 font-epilogue">
            Die drei Säulen der Osteopathie
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Parietal */}
            <div className="bg-white rounded-lg border border-slate-200 p-8">
              <div className="text-5xl mb-4">🦴</div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4 font-epilogue">
                Parietale Osteopathie
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                Behandlung des <strong>Bewegungsapparates</strong>:
              </p>
              <ul className="space-y-2 text-slate-600">
                <li>• Knochen und Gelenke</li>
                <li>• Muskeln und Faszien</li>
                <li>• Sehnen und Bänder</li>
              </ul>
              <p className="text-slate-600 mt-4 text-sm">
                Anwendung bei: Rückenschmerzen, Gelenkbeschwerden, Sportverletzungen
              </p>
            </div>

            {/* Visceral */}
            <div className="bg-white rounded-lg border border-slate-200 p-8">
              <div className="text-5xl mb-4">🫁</div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4 font-epilogue">
                Viszerale Osteopathie
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                Behandlung der <strong>inneren Organe</strong>:
              </p>
              <ul className="space-y-2 text-slate-600">
                <li>• Verdauungsorgane</li>
                <li>• Lunge und Herz</li>
                <li>• Urogenitalsystem</li>
              </ul>
              <p className="text-slate-600 mt-4 text-sm">
                Anwendung bei: Verdauungsbeschwerden, Reflux, Atemwegserkrankungen
              </p>
            </div>

            {/* Craniosacral */}
            <div className="bg-white rounded-lg border border-slate-200 p-8">
              <div className="text-5xl mb-4">🧠</div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4 font-epilogue">
                Craniosacrale Osteopathie
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                Behandlung von <strong>Schädel und Nervensystem</strong>:
              </p>
              <ul className="space-y-2 text-slate-600">
                <li>• Schädelknochen</li>
                <li>• Kreuzbein (Sacrum)</li>
                <li>• Gehirn- und Rückenmarksflüssigkeit</li>
              </ul>
              <p className="text-slate-600 mt-4 text-sm">
                Anwendung bei: Kopfschmerzen, Migräne, Kieferbeschwerden, Stress
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight font-epilogue mb-8">
            Die vier Grundprinzipien nach Still
          </h2>

          <div className="space-y-6">
            <div className="bg-slate-50 border-l-4 border-slate-900 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                1. Der Körper ist eine Einheit
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Körper, Geist und Seele bilden eine untrennbare Einheit. Alle
                Strukturen und Funktionen beeinflussen sich gegenseitig. Eine
                Störung an einer Stelle kann Auswirkungen auf den gesamten
                Organismus haben.
              </p>
            </div>

            <div className="bg-slate-50 border-l-4 border-slate-900 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                2. Struktur und Funktion stehen in Wechselbeziehung
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Die Struktur (Anatomie) bestimmt die Funktion, und die Funktion
                beeinflusst die Struktur. Wenn die Struktur nicht optimal ist,
                kann die Funktion beeinträchtigt sein – und umgekehrt.
              </p>
            </div>

            <div className="bg-slate-50 border-l-4 border-slate-900 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                3. Der Körper besitzt Selbstheilungskräfte
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Der Körper verfügt über die Fähigkeit zur Selbstregulation und
                Selbstheilung. Die Aufgabe des Osteopathen ist es, diese
                Kräfte zu unterstützen und Blockaden zu lösen, die die
                Heilung verhindern.
              </p>
            </div>

            <div className="bg-slate-50 border-l-4 border-slate-900 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                4. Die Regel der Arterie ist absolut
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Eine gute Durchblutung und Versorgung aller Gewebe ist
                essentiell für Gesundheit. Wenn der Blutfluss gestört ist,
                können Beschwerden entstehen. Die Osteopathie zielt darauf ab,
                die Durchblutung zu optimieren.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Differences Section */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight font-epilogue mb-8">
            Unterschied zu anderen Therapieformen
          </h2>

          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-3 font-epilogue">
                Osteopathie vs. Physiotherapie
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Osteopathie:</h4>
                  <ul className="space-y-2 text-slate-700">
                    <li>• Ganzheitlicher Ansatz</li>
                    <li>• Sucht nach Ursachen im ganzen Körper</li>
                    <li>• Ausschließlich manuelle Techniken</li>
                    <li>• 45-60 Min. intensive Behandlung</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Physiotherapie:</h4>
                  <ul className="space-y-2 text-slate-700">
                    <li>• Oft symptomorientiert</li>
                    <li>• Fokus auf betroffene Region</li>
                    <li>• Geräte und Übungen</li>
                    <li>• 15-30 Min. Behandlung</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-3 font-epilogue">
                Osteopathie vs. Chiropraktik
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Osteopathie:</h4>
                  <ul className="space-y-2 text-slate-700">
                    <li>• Sanfte, langsame Techniken</li>
                    <li>• Behandelt alle Körpersysteme</li>
                    <li>• Ganzheitliche Ursachensuche</li>
                    <li>• Langfristige Behandlungsplanung</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Chiropraktik:</h4>
                  <ul className="space-y-2 text-slate-700">
                    <li>• Schnelle Impulstechniken ("Einrenken")</li>
                    <li>• Fokus auf Wirbelsäule und Gelenke</li>
                    <li>• Blockadenlösung</li>
                    <li>• Oft kürzere Behandlungen</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Whom Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight text-center mb-12 font-epilogue">
            Für wen ist Osteopathie geeignet?
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-5xl mb-4">👶</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                Babys & Kinder
              </h3>
              <p className="text-slate-600">
                Sanfte Behandlung bei Schreibabys, Koliken, Entwicklungsstörungen
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-4">🤰</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                Schwangere
              </h3>
              <p className="text-slate-600">
                Begleitung während Schwangerschaft und Geburtsvorbereitung
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-4">💼</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                Erwachsene
              </h3>
              <p className="text-slate-600">
                Bei akuten und chronischen Beschwerden, Stress, Prävention
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-4">👴</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                Senioren
              </h3>
              <p className="text-slate-600">
                Erhalt der Mobilität, Schmerzlinderung, Lebensqualität
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scientific Evidence Section */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight font-epilogue mb-8">
            Wissenschaftliche Anerkennung
          </h2>
          <div className="space-y-6 text-slate-700 text-lg leading-relaxed">
            <p>
              Die Osteopathie wird zunehmend wissenschaftlich erforscht und
              anerkannt. Zahlreiche Studien belegen die Wirksamkeit
              osteopathischer Behandlungen, insbesondere bei:
            </p>
            <ul className="space-y-2 list-disc list-inside">
              <li>Rückenschmerzen und Nackenbeschwerden</li>
              <li>Kopfschmerzen und Migräne</li>
              <li>Muskuloskelettalen Beschwerden</li>
              <li>Verdauungsproblemen</li>
            </ul>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-slate-700">
                <strong>Wichtig:</strong> Die Weltgesundheitsorganisation (WHO)
                erkennt Osteopathie als eigenständige Behandlungsmethode an.
                Viele gesetzliche und private Krankenkassen übernehmen die
                Kosten ganz oder teilweise – ein deutliches Zeichen für die
                Anerkennung der Methode.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16 sm:py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 sm:p-12 text-center text-white shadow-xl">
            <h2 className="text-3xl sm:text-4xl font-light mb-4 font-epilogue tracking-tight">
              Erleben Sie Osteopathie selbst
            </h2>
            <p className="text-xl mb-8 text-slate-200 font-light">
              Vereinbaren Sie jetzt einen Termin in meiner Praxis in
              Hamburg-Rotherbaum oder Eimsbüttel
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/terminbuchung"
                className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold text-slate-900 bg-white rounded-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1"
              >
                <span className="relative z-10">📅 Termin buchen</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-200/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </Link>
              <Link
                href="/behandlungen"
                className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold border-2 border-white text-white rounded-md transition-all duration-300 hover:bg-white hover:text-slate-900 hover:transform hover:-translate-y-1"
              >
                Behandlungsschwerpunkte ansehen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Links Section */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight text-center mb-8 font-epilogue">
            Weitere Informationen
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/kosten-ablauf"
              className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-900 transition-colors"
            >
              <div className="text-3xl mb-3">💶</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                Kosten & Ablauf
              </h3>
              <p className="text-slate-600">
                Informationen zu Preisen, Kassenerstattung und Behandlungsablauf
              </p>
            </Link>

            <Link
              href="/faq"
              className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-900 transition-colors"
            >
              <div className="text-3xl mb-3">❓</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                FAQ
              </h3>
              <p className="text-slate-600">
                Antworten auf häufig gestellte Fragen zur Osteopathie
              </p>
            </Link>

            <Link
              href="/ueber-mich"
              className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-900 transition-colors"
            >
              <div className="text-3xl mb-3">👨‍⚕️</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                Über mich
              </h3>
              <p className="text-slate-600">
                Erfahren Sie mehr über meine Ausbildung und Philosophie
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
