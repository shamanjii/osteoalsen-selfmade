import { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/app/(site)/components/SiteHeader";
import SiteFooter from "@/app/(site)/components/SiteFooter";
import FloatingBookingButton from "@/components/FloatingBookingButton";
import FAQSchema from "@/components/FAQSchema";

export const metadata: Metadata = {
  title: "Rückenschmerzen Osteopathie Hamburg | Nachhaltige Behandlung - Joshua Alsen",
  description: "Osteopathie bei Rückenschmerzen in Hamburg ✓ Ganzheitliche Behandlung ✓ Ursachen statt Symptome ✓ 60 Min. intensive Therapie ✓ Rotherbaum & Eimsbüttel. Jetzt Termin buchen!",
  keywords: [
    "Rückenschmerzen Osteopathie Hamburg",
    "Rückenschmerzen behandeln Hamburg",
    "Chronische Rückenschmerzen Hamburg",
    "Rückenschmerzen Therapie Hamburg",
    "Osteopath Rücken Hamburg",
    "Kreuzschmerzen Osteopathie",
    "LWS Beschwerden Hamburg",
    "Hexenschuss Behandlung Hamburg",
    "Bandscheibenvorfall Osteopathie",
    "Ischias Osteopathie Hamburg",
  ],
  alternates: {
    canonical: "/rueckenschmerzen-osteopathie-hamburg",
  },
  openGraph: {
    title: "Rückenschmerzen Osteopathie Hamburg | Nachhaltige Behandlung",
    description: "Ganzheitliche osteopathische Behandlung bei Rückenschmerzen in Hamburg. 60 Min. intensive Therapie für nachhaltige Linderung.",
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
    question: "Kann Osteopathie bei chronischen Rückenschmerzen helfen?",
    answer:
      "Ja, Osteopathie kann bei chronischen Rückenschmerzen sehr wirksam sein. Studien zeigen, dass osteopathische Behandlungen Schmerzen signifikant reduzieren und die Funktionsfähigkeit verbessern können. Der ganzheitliche Ansatz adressiert nicht nur die Schmerzsymptome, sondern auch die zugrunde liegenden Ursachen wie Haltungsprobleme, muskuläre Dysbalancen oder viszerale Einschränkungen.",
  },
  {
    question: "Wie viele Sitzungen brauche ich bei Rückenschmerzen?",
    answer:
      "Die Anzahl der Sitzungen variiert je nach Ursache und Dauer der Beschwerden. Bei akuten Rückenschmerzen (z.B. Hexenschuss) reichen oft 1-3 Sitzungen. Bei chronischen Beschwerden empfehle ich meist 4-6 Behandlungen im Abstand von 2-3 Wochen. Bereits nach der ersten Sitzung berichten viele Patienten von deutlicher Verbesserung.",
  },
  {
    question: "Was ist der Unterschied zwischen Osteopathie und Physiotherapie bei Rückenschmerzen?",
    answer:
      "Osteopathie betrachtet den Körper ganzheitlich und sucht nach der Ursache der Rückenschmerzen im gesamten Körpersystem – manchmal liegt die Ursache z.B. im Becken, Darm oder sogar in der Kieferregion. Physiotherapie fokussiert sich meist auf lokale Übungen und Kräftigung. In der Osteopathie nehme ich mir 60 Minuten Zeit für manuelle Techniken, während Physiotherapie oft 20-30 Minuten dauert und mit Rezept verschrieben wird.",
  },
  {
    question: "Hilft Osteopathie auch bei Bandscheibenvorfall?",
    answer:
      "Osteopathie kann bei Bandscheibenvorfällen unterstützend wirken, besonders wenn keine OP-Indikation besteht. Durch sanfte Mobilisation, Entlastung der betroffenen Segmente und Verbesserung der umgebenden Strukturen kann der Heilungsprozess gefördert werden. Bei akuten neurologischen Ausfällen (z.B. Lähmungen, Taubheitsgefühle) ist jedoch zunächst eine ärztliche Abklärung wichtig. Ich arbeite hier gerne interdisziplinär mit Orthopäden zusammen.",
  },
  {
    question: "Werden die Kosten von der Krankenkasse übernommen?",
    answer:
      "Viele private Krankenversicherungen und Zusatzversicherungen erstatten osteopathische Behandlungen zu 80-100%. Auch einige gesetzliche Krankenkassen bezuschussen Osteopathie mit 30-60€ pro Sitzung. Eine Behandlung kostet 150€ (60 Min.). Gerne berate ich Sie individuell zu Erstattungsmöglichkeiten und stelle alle erforderlichen Unterlagen für die Abrechnung bereit.",
  },
  {
    question: "Was kann ich selbst gegen Rückenschmerzen tun?",
    answer:
      "Zwischen den Behandlungen empfehle ich: regelmäßige Bewegung (Spazieren, Schwimmen, Yoga), dynamisches Sitzen statt starre Haltung, Wärme bei Verspannungen, Dehnübungen für Hüfte und Wirbelsäule, Stressmanagement (da Stress Verspannungen verstärkt). Nach der Erstbehandlung gebe ich Ihnen individuell angepasste Übungen mit, die Sie zu Hause durchführen können.",
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
                Rückenschmerzen nachhaltig
                <span className="block text-teal-600">behandeln mit Osteopathie</span>
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
                Ganzheitliche osteopathische Behandlung bei akuten und chronischen
                Rückenschmerzen in Hamburg. Ursachen erkennen, Schmerzen lindern,
                Beweglichkeit wiederherstellen.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/terminbuchung"
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
                  href="/behandlungen/rueckenschmerzen"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white px-8 py-4 text-base font-semibold text-gray-700 transition-all hover:border-teal-600 hover:text-teal-600"
                >
                  Mehr zur Behandlung
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
                Warum Osteopathie bei Rückenschmerzen?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                Rückenschmerzen sind komplex – die Ursache liegt oft nicht dort, wo es
                weh tut
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 font-serif text-xl font-semibold text-gray-900">
                  Ursachen statt Symptome
                </h3>
                <p className="text-gray-600">
                  Ich untersuche Ihren gesamten Körper, um die wahre Ursache Ihrer
                  Rückenschmerzen zu finden – sei es im Becken, Darm, Zwerchfell oder
                  der Körperhaltung.
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 font-serif text-xl font-semibold text-gray-900">
                  60 Minuten intensive Therapie
                </h3>
                <p className="text-gray-600">
                  Keine Zeitnot: Ich nehme mir eine volle Stunde für Sie – für
                  ausführliche Anamnese, Untersuchung und individuell angepasste
                  Behandlung.
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
                  Nachhaltige Linderung
                </h3>
                <p className="text-gray-600">
                  Durch die ganzheitliche Behandlung und gezielte Übungen für zu Hause
                  erreichen wir nicht nur kurzfristige Schmerzlinderung, sondern
                  langfristige Besserung.
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
                  Keine schmerzhaften Manipulationen. Ich arbeite mit sanften,
                  präzisen Techniken, die Ihrem Körper helfen, sein natürliches
                  Gleichgewicht wiederzufinden.
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
                  Studien belegen die Wirksamkeit der Osteopathie bei Rückenschmerzen.
                  Ich kombiniere evidenzbasierte Ansätze mit individueller Erfahrung.
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

        {/* Häufige Ursachen */}
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
                Häufige Ursachen von Rückenschmerzen
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                In meiner Praxis behandle ich verschiedenste Formen von Rückenbeschwerden
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Muskuläre Verspannungen
                </h3>
                <p className="text-gray-600">
                  Oft durch Fehlhaltungen, einseitige Belastungen oder Stress ausgelöst.
                  Betrifft häufig die Lendenwirbelsäule und den unteren Rücken.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Blockierungen der Wirbelsäule
                </h3>
                <p className="text-gray-600">
                  Funktionsstörungen einzelner Wirbelgelenke führen zu Bewegungseinschränkungen
                  und Schmerzen, besonders im LWS- und BWS-Bereich.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Beckenschiefstand & ISG-Probleme
                </h3>
                <p className="text-gray-600">
                  Fehlstellungen des Beckens oder Blockaden im Iliosakralgelenk (ISG)
                  strahlen oft in den unteren Rücken und die Beine aus.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Bandscheibenprobleme
                </h3>
                <p className="text-gray-600">
                  Bandscheibenvorfälle oder -vorwölbungen können auf Nerven drücken und
                  zu ausstrahlenden Schmerzen (Ischias) führen.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Viszerale Dysfunktionen
                </h3>
                <p className="text-gray-600">
                  Bewegungseinschränkungen innerer Organe (z.B. Darm, Nieren) können
                  über Faszien und Nerven Rückenschmerzen verursachen.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Stress & psychosomatische Faktoren
                </h3>
                <p className="text-gray-600">
                  Chronischer Stress führt zu muskulären Verspannungen und kann
                  bestehende Rückenschmerzen verstärken.
                </p>
              </div>
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
                    Bereits nach der ersten Sitzung berichten viele Patienten von
                    deutlicher Verbesserung. Bei chronischen Beschwerden empfehle ich
                    meist 4-6 Behandlungen im Abstand von 2-3 Wochen für nachhaltige
                    Ergebnisse. Ihr Körper braucht Zeit, sich an die neuen
                    Bewegungsmuster zu gewöhnen.
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
                Ihre Rückenschmerzen in erfahrenen Händen
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
                Fundierte Ausbildung, spezialisiert auf muskuloskelettale Beschwerden
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
                  Heilpraktiker & Osteopath (BAO)
                </h3>
                <p className="text-gray-300">
                  5-jährige Vollzeitausbildung an der Berliner Academy of Osteopathy
                  mit Schwerpunkt muskuloskelettales System
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
                  Spezialisierung Rückenschmerzen
                </h3>
                <p className="text-gray-300">
                  Fortbildungen in parietaler Osteopathie, viszeraler Osteopathie und
                  Faszientherapie speziell für Wirbelsäulenbeschwerden
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
                <h3 className="mb-2 text-xl font-semibold">Langjährige Erfahrung</h3>
                <p className="text-gray-300">
                  Hunderte erfolgreich behandelte Patienten mit akuten und chronischen
                  Rückenbeschwerden in Hamburg
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
                      <p>U3 Hoheluftbrücke (3 Min. Fußweg)</p>
                      <p>Bus 4, 5 Grindelberg</p>
                    </div>
                  </div>
                </div>
                <Link
                  href="/osteopathie-rotherbaum"
                  className="mt-6 inline-flex items-center text-teal-600 transition-colors hover:text-teal-700"
                >
                  Mehr zum Standort Rotherbaum
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
                      <p className="font-medium text-gray-900">Eppendorfer Weg 234</p>
                      <p>20251 Hamburg</p>
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
                      <p>U3 Hoheluftbrücke (5 Min. Fußweg)</p>
                      <p>U2 Lutterothstraße (7 Min. Fußweg)</p>
                    </div>
                  </div>
                </div>
                <Link
                  href="/osteopathie-eimsbuettel"
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
                Beenden Sie Ihre Rückenschmerzen
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-teal-50">
                Buchen Sie jetzt Ihren Termin für eine ganzheitliche osteopathische
                Behandlung in Hamburg. Ich nehme mir 60 Minuten Zeit für Sie.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/terminbuchung"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-semibold text-teal-600 shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl"
                >
                  Jetzt Termin buchen
                </Link>
                <Link
                  href="/kosten-ablauf"
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
