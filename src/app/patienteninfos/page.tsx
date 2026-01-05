import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSchema from "@/components/FAQSchema";

export const metadata: Metadata = {
  title: "Patienteninfos | Osteopathie Hamburg - Joshua Alsen",
  description:
    "Infos für Ihre Behandlung ✓ Was mitbringen ✓ Vorbereitung ✓ Nachsorge ✓ Osteopathie Hamburg ✓ VFO-zertifiziert ⭐ Jetzt informieren!",
  keywords: [
    "Patienteninfos Osteopathie",
    "Erstbehandlung Osteopathie",
    "Behandlung vorbereiten",
    "Osteopathie Ablauf",
    "Was mitbringen Osteopath",
  ],
  alternates: { canonical: "/patienteninfos/" },
  openGraph: {
    title: "Patienteninformationen | Osteopathie Hamburg",
    description:
      "Alles Wichtige für Ihre Behandlung: Vorbereitung, Ablauf und Nachsorge. Gut informiert zur osteopathischen Behandlung.",
    url: "/patienteninfos",
    siteName: "Osteopathie Hamburg - Joshua Alsen",
    images: [
      {
        url: "/assets/joshua-alsen-osteopath-hamburg-og.webp",
        width: 1200,
        height: 630,
        alt: "Patienteninformationen - Osteopathie Hamburg",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Patienteninformationen | Osteopathie Hamburg",
    description:
      "Alles Wichtige für Ihre Behandlung: Vorbereitung, Ablauf und Nachsorge.",
    images: ["/assets/joshua-alsen-osteopath-hamburg-twitter.webp"],
  },
};

export default function PatienteninfosPage() {
  return (
    <>
      <FAQSchema
        faqs={[
          {
            question: "Was soll ich zur ersten Behandlung mitbringen?",
            answer:
              "Bringen Sie bitte bequeme Kleidung, Ihre Versichertenkarte, eine ärztliche Verordnung (falls vorhanden) und relevante Befunde mit.",
          },
          {
            question: "Wie bereite ich mich auf die Behandlung vor?",
            answer:
              "Tragen Sie bequeme Kleidung, essen Sie leicht vor der Behandlung und notieren Sie sich wichtige Fragen, die Sie stellen möchten.",
          },
          {
            question: "Was passiert nach der ersten Behandlung?",
            answer:
              "Nach der Behandlung kann es zu Müdigkeit oder muskelkaterähnlichen Beschwerden kommen. Trinken Sie viel Wasser und vermeiden Sie körperliche Belastungen für 1-2 Tage.",
          },
        ]}
      />
      <Breadcrumbs items={[{ label: "Patienteninfos" }]} />

      {/* Hero Section */}
      <section className="bg-white pt-8 pb-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 lg:px-12 text-center">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-epilogue text-slate-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-light leading-tight mb-6">
              Patienteninformationen
            </h1>
            <p className="text-slate-600 text-lg sm:text-xl md:text-2xl font-light leading-relaxed">
              Alles Wichtige für Ihre osteopathische Behandlung: Von der
              Vorbereitung bis zur Nachsorge
            </p>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white border border-slate-200 rounded-lg p-6 text-center hover:border-slate-900 transition-colors">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                Gut vorbereitet
              </h3>
              <p className="text-slate-600">
                Erfahren Sie, was Sie zur Behandlung mitbringen sollten und wie
                Sie sich optimal vorbereiten.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-6 text-center hover:border-slate-900 transition-colors">
              <div className="text-4xl mb-4">⏱️</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                Zeitlicher Ablauf
              </h3>
              <p className="text-slate-600">
                60 Minuten Erstbehandlung, 45-50 Minuten Folgebehandlungen mit
                individueller Betreuung.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-6 text-center hover:border-slate-900 transition-colors">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                Nach der Behandlung
              </h3>
              <p className="text-slate-600">
                Wichtige Verhaltenstipps für optimale Behandlungserfolge und
                nachhaltige Besserung.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Before Treatment */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight mb-8 font-epilogue">
            Vor Ihrer ersten Behandlung
          </h2>

          <div className="space-y-8">
            {/* Was mitbringen */}
            <div className="bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-lg p-6 sm:p-8">
              <h3 className="text-2xl font-semibold text-slate-900 mb-4 font-epilogue flex items-center gap-3">
                <span className="text-3xl">🎒</span>
                Was Sie mitbringen sollten
              </h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="text-slate-500 mt-1">✓</span>
                  <div>
                    <strong>Versichertenkarte</strong> Ihrer Krankenkasse
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-slate-500 mt-1">✓</span>
                  <div>
                    <strong>Ärztliche Verordnung/Empfehlung</strong> (falls
                    vorhanden und für Kassenerstattung erforderlich)
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-slate-500 mt-1">✓</span>
                  <div>
                    <strong>Befunde und Arztberichte</strong> zu Ihren
                    Beschwerden (z.B. Röntgenbilder, MRT-Berichte,
                    Laborergebnisse)
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-slate-500 mt-1">✓</span>
                  <div>
                    <strong>Liste Ihrer Medikamente</strong> (falls Sie
                    regelmäßig Medikamente einnehmen)
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-slate-500 mt-1">✓</span>
                  <div>
                    <strong>Bequeme Kleidung</strong> in der Sie sich gut
                    bewegen können (z.B. Leggings/Jogginghose und T-Shirt)
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-slate-500 mt-1">✓</span>
                  <div>
                    <strong>Handtuch</strong> (falls Sie möchten - nicht
                    zwingend erforderlich)
                  </div>
                </li>
              </ul>
            </div>

            {/* Kleidung */}
            <div className="bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-lg p-6 sm:p-8">
              <h3 className="text-2xl font-semibold text-slate-900 mb-4 font-epilogue flex items-center gap-3">
                <span className="text-3xl">👕</span>
                Passende Kleidung
              </h3>
              <div className="space-y-4 text-slate-700">
                <p>
                  Die Behandlung findet in Unterwäsche oder bequemer Kleidung
                  statt - je nachdem, womit Sie sich wohler fühlen. Wichtig ist,
                  dass ich Ihre Körperhaltung und Bewegungsmuster gut beurteilen
                  kann.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="font-semibold text-slate-900 mb-2">
                    Empfohlene Kleidung:
                  </p>
                  <ul className="space-y-2 text-slate-700">
                    <li>• Eng anliegende, dehnbare Kleidung (z.B. Sportkleidung)</li>
                    <li>• Leggings oder Jogginghose</li>
                    <li>• T-Shirt oder Tanktop</li>
                    <li>• Bei Bedarf: Shorts und Sport-BH</li>
                  </ul>
                </div>
                <p className="text-sm text-slate-600">
                  <strong>Hinweis:</strong> Bitte vermeiden Sie steife Jeans,
                  Kleider oder Kleidung mit vielen Knöpfen oder Reißverschlüssen.
                </p>
              </div>
            </div>

            {/* Vorbereitung */}
            <div className="bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-lg p-6 sm:p-8">
              <h3 className="text-2xl font-semibold text-slate-900 mb-4 font-epilogue flex items-center gap-3">
                <span className="text-3xl">📝</span>
                So bereiten Sie sich optimal vor
              </h3>
              <div className="space-y-4 text-slate-700">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">
                    Am Tag vor der Behandlung:
                  </h4>
                  <ul className="space-y-2">
                    <li>
                      • Notieren Sie sich Ihre Fragen und Beschwerden - so
                      vergessen Sie nichts
                    </li>
                    <li>
                      • Sammeln Sie relevante Befunde und Arztberichte
                    </li>
                    <li>
                      • Überlegen Sie, wann Ihre Beschwerden begonnen haben und
                      was sie auslöst
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">
                    Am Behandlungstag:
                  </h4>
                  <ul className="space-y-2">
                    <li>
                      • Essen Sie 1-2 Stunden vor der Behandlung nur leicht
                    </li>
                    <li>• Trinken Sie ausreichend Wasser</li>
                    <li>
                      • Planen Sie nach der Behandlung keine körperlich
                      anstrengenden Aktivitäten
                    </li>
                    <li>
                      • Kommen Sie pünktlich - bei Verspätung verkürzt sich die
                      Behandlungszeit
                    </li>
                    <li>
                      • Lassen Sie Schmuck zu Hause (Ketten, Armbänder, große
                      Ohrringe)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* During Treatment */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight mb-8 font-epilogue">
            Während der Behandlung
          </h2>

          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8">
              <h3 className="text-2xl font-semibold text-slate-900 mb-4 font-epilogue">
                Was Sie erwarten können
              </h3>
              <div className="space-y-4 text-slate-700">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <span className="text-xl">💬</span>
                    Offene Kommunikation
                  </h4>
                  <p>
                    Teilen Sie mir während der Behandlung mit, wie Sie sich
                    fühlen. Wenn etwas unangenehm oder schmerzhaft ist, passe
                    ich die Techniken sofort an. Ihre Rückmeldung ist wichtig
                    für eine erfolgreiche Behandlung.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <span className="text-xl">🤲</span>
                    Sanfte Techniken
                  </h4>
                  <p>
                    Die osteopathische Behandlung ist in der Regel nicht
                    schmerzhaft. Ich arbeite mit sanften manuellen Techniken,
                    die Ihr Körper gut verarbeiten kann. Bei stark verspannten
                    Bereichen kann es zu einem intensiveren Gefühl kommen, das
                    aber als "Wohlfühl-Weh" empfunden wird.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <span className="text-xl">😌</span>
                    Entspannung
                  </h4>
                  <p>
                    Versuchen Sie, während der Behandlung zu entspannen und
                    ruhig zu atmen. Viele Patienten empfinden die Behandlung
                    als sehr entspannend - manche schlafen sogar ein. Das ist
                    völlig in Ordnung und zeigt, dass Ihr Körper in den
                    Entspannungsmodus wechselt.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8">
              <h3 className="text-2xl font-semibold text-slate-900 mb-4 font-epilogue">
                Typischer Behandlungsablauf
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">
                      Anamnesegespräch (15-20 Min.)
                    </h4>
                    <p className="text-slate-700">
                      Wir besprechen Ihre Beschwerden, Krankengeschichte und
                      Erwartungen ausführlich.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">
                      Körperliche Untersuchung (10-15 Min.)
                    </h4>
                    <p className="text-slate-700">
                      Ich untersuche Ihren gesamten Körper auf
                      Bewegungseinschränkungen und Spannungen.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">
                      Osteopathische Behandlung (25-30 Min.)
                    </h4>
                    <p className="text-slate-700">
                      Mit sanften manuellen Techniken behandle ich die
                      identifizierten Problembereiche.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">
                      Nachbesprechung (5 Min.)
                    </h4>
                    <p className="text-slate-700">
                      Ich erkläre meine Befunde und gebe Ihnen Empfehlungen für
                      zu Hause.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* After Treatment */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight mb-8 font-epilogue">
            Nach der Behandlung
          </h2>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-white border border-blue-200 rounded-lg p-6 sm:p-8">
              <h3 className="text-2xl font-semibold text-slate-900 mb-4 font-epilogue">
                Mögliche Reaktionen
              </h3>
              <p className="text-slate-700 mb-4">
                Nach einer osteopathischen Behandlung kann Ihr Körper auf
                verschiedene Weise reagieren. Diese Reaktionen sind normal und
                zeigen, dass Ihr Körper auf die Behandlung anspricht:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-green-600 text-xl">✓</span>
                  <div>
                    <strong className="text-slate-900">
                      Sofortige Besserung:
                    </strong>
                    <span className="text-slate-700">
                      {" "}
                      Viele Patienten fühlen sich direkt nach der Behandlung
                      besser, entspannter und beweglicher.
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-orange-500 text-xl">⚠️</span>
                  <div>
                    <strong className="text-slate-900">Müdigkeit:</strong>
                    <span className="text-slate-700">
                      {" "}
                      Ein Gefühl der Müdigkeit oder Schwere ist häufig und zeigt,
                      dass der Körper regeneriert.
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-orange-500 text-xl">⚠️</span>
                  <div>
                    <strong className="text-slate-900">
                      Muskelkaterähnliche Beschwerden:
                    </strong>
                    <span className="text-slate-700">
                      {" "}
                      Leichte Muskelschmerzen ähnlich wie Muskelkater können
                      auftreten (klingen nach 1-2 Tagen ab).
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-orange-500 text-xl">⚠️</span>
                  <div>
                    <strong className="text-slate-900">
                      Emotionale Reaktionen:
                    </strong>
                    <span className="text-slate-700">
                      {" "}
                      Manchmal werden Emotionen freigesetzt - das ist völlig
                      normal und Teil des Heilungsprozesses.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-lg p-6 sm:p-8">
              <h3 className="text-2xl font-semibold text-slate-900 mb-4 font-epilogue">
                Verhaltenstipps nach der Behandlung
              </h3>
              <div className="space-y-4">
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <span className="text-xl">💧</span>
                    Viel Wasser trinken
                  </h4>
                  <p className="text-slate-700">
                    Trinken Sie nach der Behandlung mindestens 1,5-2 Liter
                    Wasser, um den Stoffwechsel zu unterstützen und
                    Schlackenstoffe auszuschwemmen.
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <span className="text-xl">🛋️</span>
                    Ruhe gönnen
                  </h4>
                  <p className="text-slate-700">
                    Vermeiden Sie am Behandlungstag anstrengende körperliche
                    Aktivitäten, Sport oder schweres Heben. Gönnen Sie Ihrem
                    Körper Zeit zur Regeneration.
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <span className="text-xl">🚶</span>
                    Leichte Bewegung
                  </h4>
                  <p className="text-slate-700">
                    Ein entspannter Spaziergang an der frischen Luft kann die
                    Behandlung unterstützen. Achten Sie auf Ihren Körper und
                    übertreiben Sie es nicht.
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <span className="text-xl">🧘</span>
                    Bewusste Atmung
                  </h4>
                  <p className="text-slate-700">
                    Tiefe, ruhige Atmung unterstützt den Heilungsprozess und
                    hilft Ihrem Körper, sich zu entspannen.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-lg p-6 sm:p-8">
              <h3 className="text-2xl font-semibold text-slate-900 mb-4 font-epilogue">
                Wann sollten Sie sich melden?
              </h3>
              <p className="text-slate-700 mb-4">
                In der Regel klingen Behandlungsreaktionen nach 1-2 Tagen ab.
                Kontaktieren Sie mich bitte, wenn:
              </p>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="text-red-600">•</span>
                  <span>
                    Die Beschwerden sich deutlich verschlimmern oder neue starke
                    Schmerzen auftreten
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600">•</span>
                  <span>Reaktionen länger als 3 Tage anhalten</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600">•</span>
                  <span>
                    Sie unsicher sind, ob eine Reaktion normal ist
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600">•</span>
                  <span>
                    Sie Fragen zu den Übungen oder Empfehlungen haben
                  </span>
                </li>
              </ul>
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-slate-700">
                  <strong>Kontakt:</strong> Sie erreichen mich telefonisch unter{" "}
                  <a
                    href="tel:+4917643990001"
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    0176 4399 0001
                  </a>{" "}
                  oder per E-Mail an{" "}
                  <a
                    href="mailto:joshua@alsen.info"
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    joshua@alsen.info
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weitere Termine */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight mb-8 font-epilogue">
            Folgebehandlungen
          </h2>
          <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8">
            <p className="text-slate-700 mb-4">
              Nach der Erstbehandlung besprechen wir gemeinsam, wie viele
              weitere Behandlungen voraussichtlich nötig sind. Dies hängt von
              verschiedenen Faktoren ab:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 rounded-lg p-4">
                <h4 className="font-semibold text-slate-900 mb-2">
                  Akute Beschwerden
                </h4>
                <p className="text-slate-700">
                  Oft reichen 2-3 Sitzungen im Abstand von 1-2 Wochen
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <h4 className="font-semibold text-slate-900 mb-2">
                  Chronische Beschwerden
                </h4>
                <p className="text-slate-700">
                  Meist 4-6+ Behandlungen im Abstand von 2-3 Wochen
                </p>
              </div>
            </div>
            <p className="text-slate-600 text-sm">
              <strong>Wichtig:</strong> Jeder Körper reagiert individuell. Nach
              der ersten Sitzung kann ich Ihnen eine genauere Einschätzung geben.
              Zwischen den Behandlungen sollte Ihr Körper ausreichend Zeit haben,
              die Impulse zu verarbeiten - daher empfehle ich meist einen Abstand
              von 1-3 Wochen zwischen den Terminen.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16 sm:py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 sm:p-12 text-center text-white shadow-xl">
            <h2 className="text-3xl sm:text-4xl font-light mb-4 font-epilogue tracking-tight">
              Gut vorbereitet zur Behandlung
            </h2>
            <p className="text-xl mb-8 text-slate-200 font-light">
              Sie haben noch Fragen? Rufen Sie mich an oder buchen Sie direkt
              online einen Termin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/terminbuchung/"
                className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold text-slate-900 bg-white rounded-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1"
              >
                <span className="relative z-10">📅 Jetzt Termin buchen</span>
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

      {/* Helpful Links */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight text-center mb-8 font-epilogue">
            Weiterführende Informationen
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
                Detaillierte Informationen zu Preisen, Kassenerstattung und
                Behandlungsablauf.
              </p>
            </Link>

            <Link
              href="/faq/"
              className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-900 transition-colors"
            >
              <div className="text-3xl mb-3">❓</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                Häufige Fragen
              </h3>
              <p className="text-slate-600">
                Antworten auf die wichtigsten Fragen zur Osteopathie und
                Behandlung.
              </p>
            </Link>

            <Link
              href="/behandlungen/"
              className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-900 transition-colors"
            >
              <div className="text-3xl mb-3">🦴</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                Behandlungen
              </h3>
              <p className="text-slate-600">
                Alle Behandlungsschwerpunkte im Überblick: Rückenschmerzen,
                Kopfschmerzen und mehr.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
