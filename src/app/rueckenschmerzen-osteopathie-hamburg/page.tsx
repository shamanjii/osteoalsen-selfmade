import { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/app/(site)/components/SiteHeader";
import SiteFooter from "@/app/(site)/components/SiteFooter";
import FloatingBookingButton from "@/components/FloatingBookingButton";
import FAQSchema from "@/components/FAQSchema";

export const metadata: Metadata = {
  title: "Rückenschmerzen Hamburg | Osteopath - Joshua Alsen",
  description: "Osteopathie bei Rückenschmerzen in Hamburg ✓ Kurzfristige Termine ✓ 60 Min. Behandlungszeit ✓ Rotherbaum & Eimsbüttel ✓ Termin online buchen.",
  keywords: [
    "Rückenschmerzen behandeln Hamburg",
    "Akute Rückenschmerzen Hamburg",
    "Kreuzschmerzen Hamburg",
    "Rücken Osteopath Hamburg",
    "Schnelle Hilfe Rückenschmerzen Hamburg",
    "Hexenschuss Hamburg Rotherbaum",
    "LWS Schmerzen Hamburg",
    "Rückenschmerzen Soforthilfe Hamburg",
    "Osteopath Kreuzschmerzen Hamburg",
    "Unterer Rücken Schmerzen Hamburg",
  ],
  alternates: {
    canonical: "/rueckenschmerzen-osteopathie-hamburg",
  },
  openGraph: {
    title: "Rückenschmerzen Hamburg | Osteopathische Behandlung beim Osteopathen",
    description: "Osteopathische Behandlung bei Rückenschmerzen in Hamburg. Kurzfristige Termine in Rotherbaum & Eimsbüttel. 60 Minuten individuelle Behandlungszeit.",
    url: "https://www.osteoalsen.de/rueckenschmerzen-osteopathie-hamburg",
    siteName: "Osteopathie Hamburg - Joshua Alsen",
    locale: "de_DE",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const faqItems = [
  {
    question: "Wie schnell bekomme ich einen Termin bei akuten Rückenschmerzen in Hamburg?",
    answer:
      "Bei akuten Rückenschmerzen versuche ich, Ihnen kurzfristig einen Termin anzubieten – oft innerhalb von 1-3 Tagen. Beide Standorte (Rotherbaum und Eimsbüttel) sind gut erreichbar mit U-Bahn und Bus. Sie können online buchen oder mich direkt anrufen unter 0176 4399 0001.",
  },
  {
    question: "Wie lange dauert eine Behandlung und was kostet sie?",
    answer:
      "Eine osteopathische Behandlung bei mir dauert 60 Minuten und kostet 150€. Wie viele Sitzungen sinnvoll sind, hängt vom individuellen Befund ab und besprechen wir nach der ersten Untersuchung – der Verlauf ist immer individuell. Die Rechnung können Sie bei Ihrer Krankenkasse zur Erstattung einreichen – viele Kassen bezuschussen mit 30-60€ pro Sitzung.",
  },
  {
    question: "Wo in Hamburg finde ich Ihre Praxen?",
    answer:
      "Ich habe zwei zentrale Standorte: In Rotherbaum (Rappstraße 7, U1 Hallerstraße ca. 5 Min. Fußweg) und in Eimsbüttel (Stresemannallee 118, S-Bahn Diebsteich bzw. Buslinien in der Nähe). Beide Standorte sind gut an den ÖPNV angebunden.",
  },
  {
    question: "Kann ich mit akuten Rückenschmerzen direkt zu Ihnen kommen?",
    answer:
      "Ja, bei akuten Rückenschmerzen wie Hexenschuss, ISG-Blockade oder plötzlichen Verspannungen können Sie direkt zu mir kommen – eine ärztliche Überweisung ist nicht erforderlich. Bei sehr starken Schmerzen nach einem Unfall oder bei neurologischen Ausfällen (Taubheit, Lähmungen) sollten Sie jedoch zunächst zum Arzt gehen.",
  },
  {
    question: "Was unterscheidet Ihre Behandlung von einer Massage oder Physiotherapie?",
    answer:
      "Osteopathie ist ein eigenständiger manualtherapeutischer Ansatz mit einer ganzheitlichen Sichtweise auf den Körper. In der Untersuchung schaue ich nicht nur auf die schmerzende Region, sondern auch auf mögliche funktionelle Zusammenhänge mit Becken, inneren Organen und Faszien. Eine Sitzung dauert bei mir 60 Minuten und besteht aus Anamnese, Untersuchung und manueller Behandlung. Physiotherapie und Massage haben jeweils eigene Schwerpunkte und können je nach Beschwerdebild sinnvoll ergänzend eingesetzt werden.",
  },
  {
    question: "Gibt es Parkmöglichkeiten an Ihren Standorten?",
    answer:
      "In Rotherbaum und Eimsbüttel gibt es Straßenparkplätze (teilweise Parkscheinautomat). Ich empfehle die Anreise mit ÖPNV: Rotherbaum (Rappstraße 7) ist gut über die U1 Hallerstraße erreichbar, Eimsbüttel (Stresemannallee 118) über die S-Bahn Diebsteich und diverse Buslinien. Fahrradstellplätze sind in beiden Standorten vorhanden.",
  },
];

export default function RueckenschmerzenOsteopathiePage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-blue-50 py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(20,184,166,0.1),transparent_50%)]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Osteopathie bei
                <span className="block text-teal-600">Rückenschmerzen in Hamburg</span>
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
                Termine kurzfristig verfügbar in Rotherbaum & Eimsbüttel.
                Osteopathische Behandlung bei Beschwerden wie Hexenschuss,
                ISG-Blockaden und Kreuzschmerzen – mit 60 Minuten Zeit für eine
                gründliche Anamnese und individuelle Behandlung.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/terminbuchung/"
                  className="group inline-flex items-center justify-center rounded-lg bg-teal-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-teal-700 hover:shadow-xl"
                >
                  Jetzt Termin buchen
                  <svg
                    className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
                <Link
                  href="/behandlungen/rueckenschmerzen/"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white px-8 py-4 text-base font-semibold text-gray-700 transition-all hover:border-teal-600 hover:text-teal-600"
                >
                  Detaillierte Behandlungsinfos
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Warum Osteopathie bei Rückenschmerzen */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
                Warum zu mir bei Rückenschmerzen?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                Zentral in Hamburg gelegen, kurzfristige Termine und individuelle Behandlung
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-teal-500 hover:shadow-lg">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 text-teal-600">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 font-serif text-xl font-semibold text-gray-900">
                  Kurzfristige Termine
                </h3>
                <p className="text-gray-600">
                  Bei akuten Rückenschmerzen versuche ich, Ihnen innerhalb von 1-3
                  Tagen einen Termin in Rotherbaum oder Eimsbüttel anzubieten. Online
                  buchbar oder telefonisch.
                </p>
              </div>

              <div className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-teal-500 hover:shadow-lg">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 text-teal-600">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 font-serif text-xl font-semibold text-gray-900">
                  Zentral in Hamburg
                </h3>
                <p className="text-gray-600">
                  Zwei Standorte in Hamburg: Rotherbaum (Rappstraße 7) und Eimsbüttel
                  (Stresemannallee 118). Beide Praxen sind gut mit U-Bahn, S-Bahn
                  und Bus erreichbar.
                </p>
              </div>

              <div className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-teal-500 hover:shadow-lg">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 text-teal-600">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 font-serif text-xl font-semibold text-gray-900">
                  Individueller Behandlungsverlauf
                </h3>
                <p className="text-gray-600">
                  Wie viele Sitzungen sinnvoll sind, hängt vom individuellen Befund ab.
                  Bei akuten Beschwerden wie Hexenschuss oder ISG-Blockaden besprechen
                  wir das Vorgehen nach der ersten Untersuchung gemeinsam.
                </p>
              </div>

              <div className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-teal-500 hover:shadow-lg">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 text-teal-600">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 font-serif text-xl font-semibold text-gray-900">
                  Sanfte, manuelle Techniken
                </h3>
                <p className="text-gray-600">
                  Ich arbeite mit sanften, präzisen manuellen Techniken. Welche
                  Techniken im Einzelfall geeignet sind, richtet sich nach dem
                  Befund und Ihrer individuellen Situation.
                </p>
              </div>

              <div className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-teal-500 hover:shadow-lg">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 text-teal-600">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 font-serif text-xl font-semibold text-gray-900">
                  Wissenschaftlich fundiert
                </h3>
                <p className="text-gray-600">
                  Mein Vorgehen orientiert sich an aktuellen Studien zur manuellen
                  Therapie und an etablierten osteopathischen Konzepten – kombiniert
                  mit Erfahrung aus der täglichen Praxis.
                </p>
              </div>

              <div className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-teal-500 hover:shadow-lg">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 text-teal-600">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 font-serif text-xl font-semibold text-gray-900">
                  Interdisziplinär vernetzt
                </h3>
                <p className="text-gray-600">
                  Bei Bedarf arbeite ich mit Orthopäden, Physiotherapeuten und anderen
                  Fachärzten zusammen, um Ihnen die bestmögliche Versorgung zu bieten.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Infobox mit Link zur Hauptseite */}
        <section className="bg-blue-50 py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border-2 border-blue-200 bg-white p-8 text-center shadow-sm">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <svg
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-3 font-serif text-2xl font-bold text-gray-900">
                Mehr über osteopathische Rückenschmerz-Behandlung erfahren?
              </h3>
              <p className="mb-6 text-gray-600">
                Auf unserer ausführlichen Behandlungsseite finden Sie detaillierte
                Informationen zu Ursachen, Techniken, wissenschaftlichen Hintergründen
                und Behandlungsablauf.
              </p>
              <Link
                href="/behandlungen/rueckenschmerzen/"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white transition-all hover:bg-blue-700"
              >
                Zur ausführlichen Behandlungsseite
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Häufige Ursachen */}
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
                Häufige Beschwerdebilder im Rückenbereich
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                Themen, mit denen Patientinnen und Patienten in meine Praxis kommen
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border-l-4 border-teal-500 bg-white p-6 shadow-sm">
                <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  ⚡ Hexenschuss (Lumbago)
                </h3>
                <p className="text-gray-600">
                  Plötzlicher stechender Schmerz im unteren Rücken, meist durch eine
                  ungünstige Bewegung oder Belastung ausgelöst.
                </p>
              </div>

              <div className="rounded-xl border-l-4 border-teal-500 bg-white p-6 shadow-sm">
                <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  🦴 ISG-Blockade
                </h3>
                <p className="text-gray-600">
                  Blockade des Iliosakralgelenks mit einseitigen Schmerzen im Gesäß,
                  oft mit Ausstrahlung ins Bein.
                </p>
              </div>

              <div className="rounded-xl border-l-4 border-teal-500 bg-white p-6 shadow-sm">
                <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  💪 Akute Verspannungen
                </h3>
                <p className="text-gray-600">
                  Nach falscher Bewegung, schwerem Heben oder durch Stress ausgelöste
                  muskuläre Verhärtungen.
                </p>
              </div>

              <div className="rounded-xl border-l-4 border-orange-500 bg-white p-6 shadow-sm">
                <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  📀 Bandscheibenprobleme
                </h3>
                <p className="text-gray-600">
                  Bei Vorwölbungen oder Vorfällen kann eine osteopathische Begleitung
                  ergänzend zur ärztlichen Behandlung infrage kommen – immer abgestimmt
                  auf den individuellen Befund.
                </p>
              </div>

              <div className="rounded-xl border-l-4 border-orange-500 bg-white p-6 shadow-sm">
                <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  🔄 Chronische Kreuzschmerzen
                </h3>
                <p className="text-gray-600">
                  Langanhaltende LWS-Beschwerden durch Fehlhaltung, Überlastung oder
                  alte Verletzungen.
                </p>
              </div>

              <div className="rounded-xl border-l-4 border-orange-500 bg-white p-6 shadow-sm">
                <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  💼 Büro-Rückenschmerzen
                </h3>
                <p className="text-gray-600">
                  Beschwerden durch langes Sitzen, schlechte Ergonomie und
                  Bewegungsmangel im Arbeitsalltag.
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                <span className="font-semibold text-teal-600">Grün markiert:</span>{" "}
                eher akute Beschwerden |{" "}
                <span className="font-semibold text-orange-600">Orange markiert:</span>{" "}
                eher chronische Verläufe – der individuelle Verlauf ist immer unterschiedlich.
              </p>
            </div>
          </div>
        </section>

        {/* Behandlungsablauf */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
                So läuft Ihre Behandlung ab
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                Systematisch, ganzheitlich, individuell – 60 Minuten nur für Sie
              </p>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-4">
              <div className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-600 text-2xl font-bold text-white">
                    1
                  </div>
                  <h3 className="mb-2 font-serif text-xl font-semibold text-gray-900">
                    Ausführliche Anamnese
                  </h3>
                  <p className="text-gray-600">
                    Wir besprechen Ihre Beschwerden, Vorgeschichte, Lebensgewohnheiten
                    und bisherige Behandlungen (15 Min.)
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-600 text-2xl font-bold text-white">
                    2
                  </div>
                  <h3 className="mb-2 font-serif text-xl font-semibold text-gray-900">
                    Ganzheitliche Untersuchung
                  </h3>
                  <p className="text-gray-600">
                    Ich untersuche Ihre Wirbelsäule, Becken, Muskulatur, innere Organe
                    und Körperhaltung (15 Min.)
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-600 text-2xl font-bold text-white">
                    3
                  </div>
                  <h3 className="mb-2 font-serif text-xl font-semibold text-gray-900">
                    Osteopathische Behandlung
                  </h3>
                  <p className="text-gray-600">
                    Gezielte manuelle Techniken zur Lösung von Blockaden, Verspannungen
                    und Dysfunktionen (25 Min.)
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-600 text-2xl font-bold text-white">
                    4
                  </div>
                  <h3 className="mb-2 font-serif text-xl font-semibold text-gray-900">
                    Nachbesprechung & Übungen
                  </h3>
                  <p className="text-gray-600">
                    Sie erhalten individuelle Übungen und Empfehlungen für zu Hause
                    (5 Min.)
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 rounded-2xl border border-teal-200 bg-teal-50 p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-teal-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    Wichtig zu wissen
                  </h3>
                  <p className="text-gray-700">
                    Der individuelle Verlauf ist unterschiedlich – wie viele Sitzungen
                    sinnvoll sind, hängt von Befund, Vorgeschichte und Verlauf ab.
                    Bei chronischen Beschwerden besprechen wir typischerweise einen
                    Rahmen von mehreren Behandlungen im Abstand von 2-3 Wochen, damit
                    der Körper Zeit hat, auf die Behandlung zu reagieren.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Qualifikationen */}
        <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-16 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl font-bold sm:text-4xl">
                Ausbildung und Qualifikation
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
                Fundierte osteopathische Ausbildung und kontinuierliche Fortbildung
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-teal-500 text-white">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  Heilpraktiker & Osteopath (B.Sc.)
                </h3>
                <p className="text-gray-300">
                  Osteopathie-Ausbildung an der OSD Hamburg (Osteopathie Schule
                  Deutschland) mit über 5.000 Ausbildungsstunden, VFO-zertifiziert.
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-teal-500 text-white">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  Ganzheitlicher Ansatz
                </h3>
                <p className="text-gray-300">
                  Behandlung nach den Prinzipien der parietalen, viszeralen und
                  kraniosakralen Osteopathie – integriert in eine ganzheitliche
                  Sichtweise auf den Körper.
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-teal-500 text-white">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Praxiserfahrung</h3>
                <p className="text-gray-300">
                  Tägliche Arbeit mit Patientinnen und Patienten mit akuten und
                  chronischen Rückenbeschwerden in den Praxen in Hamburg.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Standorte */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
                Zwei zentrale Standorte in Hamburg
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                Bequem erreichbar mit U-Bahn, S-Bahn und Bus
              </p>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <h3 className="mb-4 font-serif text-2xl font-semibold text-gray-900">
                  Rotherbaum
                </h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-start gap-3">
                    <svg
                      className="mt-1 h-5 w-5 flex-shrink-0 text-teal-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">Rappstraße 7</p>
                      <p>20146 Hamburg</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg
                      className="mt-1 h-5 w-5 flex-shrink-0 text-teal-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                      />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">Anfahrt:</p>
                      <p>U1 Hallerstraße (ca. 5 Min. Fußweg)</p>
                      <p>diverse Buslinien in unmittelbarer Nähe</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <h3 className="mb-4 font-serif text-2xl font-semibold text-gray-900">
                  Eimsbüttel
                </h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-start gap-3">
                    <svg
                      className="mt-1 h-5 w-5 flex-shrink-0 text-teal-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">Stresemannallee 118</p>
                      <p>22529 Hamburg</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg
                      className="mt-1 h-5 w-5 flex-shrink-0 text-teal-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                      />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">Anfahrt:</p>
                      <p>S-Bahn Diebsteich in der Nähe</p>
                      <p>Buslinien entlang der Stresemannallee</p>
                    </div>
                  </div>
                </div>
                <Link
                  href="/osteopathie-eimsbuettel/"
                  className="mt-6 inline-flex items-center text-teal-600 transition-colors hover:text-teal-700"
                >
                  Mehr zum Standort Eimsbüttel
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
                Häufige Fragen zu Rückenschmerzen & Osteopathie
              </h2>
            </div>

            <div className="mt-12 space-y-4">
              {faqItems.map((item, index) => (
                <details
                  key={index}
                  className="group rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
                >
                  <summary className="flex cursor-pointer items-center justify-between p-6 font-semibold text-gray-900">
                    {item.question}
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-gray-500 transition-transform group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <div className="border-t border-gray-100 px-6 pb-6 pt-4 text-gray-600">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-gradient-to-br from-teal-600 to-blue-600 px-8 py-12 text-center text-white shadow-xl">
              <h2 className="font-serif text-3xl font-bold sm:text-4xl">
                Termin vereinbaren
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-teal-50">
                Buchen Sie Ihren Termin für eine ganzheitliche osteopathische
                Behandlung in Hamburg. Ich nehme mir 60 Minuten Zeit für Sie.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/terminbuchung/"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-semibold text-teal-600 shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl"
                >
                  Jetzt Termin buchen
                </Link>
                <Link
                  href="/kosten-ablauf/"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-transparent px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10"
                >
                  Kosten & Ablauf
                </Link>
              </div>
              <p className="mt-6 text-sm text-teal-100">
                Erstattung durch viele Krankenkassen möglich
              </p>
            </div>
          </div>
        </section>
      </main>

      <FAQSchema faqItems={faqItems} />
      <FloatingBookingButton />
      <SiteFooter />
    </>
  );
}
