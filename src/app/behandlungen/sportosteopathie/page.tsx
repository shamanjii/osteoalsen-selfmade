import { Metadata } from "next";
import TreatmentHero from "../components/TreatmentHero";
import TreatmentCTA from "../components/TreatmentCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import MedicalConditionSchema from "@/components/MedicalConditionSchema";
import FAQSchema from "@/components/FAQSchema";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sportosteopathie Hamburg | Osteopathie für Sportler - Joshua Alsen",
  description:
    "Sportosteopathie in Hamburg: Verletzungsprävention, schnellere Regeneration & Leistungsoptimierung für Sportler. VFO-zertifizierter Osteopath. Jetzt Termin buchen!",
  keywords: [
    "Sportosteopathie Hamburg",
    "Osteopath Sportler Hamburg",
    "Sportverletzung Osteopathie",
    "Leistungsoptimierung Osteopathie",
    "Sportosteopath Rotherbaum",
    "Läuferknie Behandlung Hamburg",
  ],
  alternates: { canonical: "/behandlungen/sportosteopathie" },
  openGraph: {
    title: "Sportosteopathie Hamburg | Osteopathie für Sportler",
    description:
      "Sportosteopathie für Verletzungsprävention, Regeneration & Leistungsoptimierung. VFO-zertifiziert.",
    url: "/behandlungen/sportosteopathie",
    siteName: "Osteopathie Hamburg - Joshua Alsen",
    images: [
      {
        url: "/assets/joshua-alsen-osteopath-hamburg-og.webp",
        width: 1200,
        height: 630,
        alt: "Sportosteopathie Hamburg - Joshua Alsen",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sportosteopathie Hamburg",
    description:
      "Sportosteopathie: Verletzungsprävention, Regeneration & Leistungsoptimierung für Sportler.",
    images: ["/assets/joshua-alsen-osteopath-hamburg-twitter.webp"],
  },
};

export default function SportosteopathiePage() {
  return (
    <>
      <MedicalConditionSchema
        name="Sportverletzungen und sportbedingte Beschwerden"
        description="Muskelzerrungen, Überlastungssyndrome, Sehnenreizungen und Rehabilitation bei Sportverletzungen für Freizeit- und Leistungssportler"
        symptoms={[
          "Muskelzerrungen",
          "Überlastungssyndrome",
          "Sehnenreizungen",
          "Gelenkblockaden",
          "Verzögerte Regeneration",
          "Läuferknie",
          "Tennisarm",
        ]}
        treatmentName="Sportosteopathie"
        url="https://www.osteoalsen.de/behandlungen/sportosteopathie"
      />
      <FAQSchema
        faqs={[
          {
            question: "Was ist Sportosteopathie und wie unterscheidet sie sich von normaler Osteopathie?",
            answer:
              "Sportosteopathie ist eine spezialisierte Form der Osteopathie, die sich auf die besonderen Bedürfnisse von Sportlern konzentriert. Während die klassische Osteopathie den gesamten Körper betrachtet, liegt der Fokus der Sportosteopathie zusätzlich auf sportartspezifischen Belastungen, Bewegungsmustern und Leistungsoptimierung. Als Sportosteopath kenne ich die typischen Verletzungsmuster verschiedener Sportarten und kann gezielt präventiv arbeiten. Die Behandlung umfasst nicht nur die Therapie von Verletzungen, sondern auch die Optimierung der Biomechanik, Verbesserung der Regeneration und Steigerung der sportlichen Leistungsfähigkeit.",
          },
          {
            question: "Bei welchen Sportverletzungen kann Sportosteopathie helfen?",
            answer:
              "Sportosteopathie ist wirksam bei akuten Verletzungen wie Muskelzerrungen, Bänderdehnungen und Prellungen sowie bei chronischen Überlastungssyndromen wie Läuferknie, Tennisarm, Achillessehnenentzündung oder Schienbeinkantensyndrom. Auch bei Gelenkblockaden, Rückenschmerzen durch Sport, Schulter- und Nackenverspannungen sowie verzögerter Regeneration nach Wettkämpfen kann ich helfen. Besonders effektiv ist die Behandlung bei funktionellen Beschwerden ohne strukturelle Schäden, aber auch begleitend zu medizinischer Versorgung bei schwereren Verletzungen.",
          },
          {
            question: "Wie schnell kann ich nach einer Sportverletzung wieder trainieren?",
            answer:
              "Das hängt stark von der Art und Schwere der Verletzung ab. Bei leichten Muskelzerrungen oder Blockaden kann oft schon nach 1-2 osteopathischen Behandlungen mit leichtem Training begonnen werden. Bei schwereren Verletzungen wie Muskelfaserrissen arbeite ich eng mit Ihnen zusammen, um einen sicheren Wiedereinstieg zu planen - meist nach 2-4 Wochen mit angepasstem Training. Wichtig ist: Zu frühes, intensives Training kann zu Rückfällen führen. Ich helfe Ihnen, den optimalen Zeitpunkt zu finden und gebe Ihnen Übungen für den Wiedereinstieg. Bei chronischen Überlastungen arbeiten wir parallel zur Behandlung oft mit reduzierter Trainingsintensität.",
          },
          {
            question: "Kann Sportosteopathie meine sportliche Leistung verbessern?",
            answer:
              "Ja, Sportosteopathie kann Ihre Leistung auf mehreren Ebenen verbessern: Durch Optimierung der Beweglichkeit können Sie effizienter bewegen, durch Lösen von Blockaden und Spannungen wird die Kraftübertragung verbessert, und durch bessere Regeneration können Sie intensiver trainieren. Viele Profisportler nutzen Osteopathie regelmäßig zur Leistungsoptimierung. Ich analysiere Ihre Bewegungsmuster, finde biomechanische Einschränkungen und behandle diese gezielt. Auch die Verbesserung der Atmung, Entspannung des Zwerchfells und Optimierung der viszeralen Mobilität können die Ausdauerleistung steigern.",
          },
          {
            question: "Wie oft sollte ich als Sportler zur Osteopathie gehen?",
            answer:
              "Das hängt von Ihrem Trainingsumfang und Ihren Zielen ab. Bei akuten Beschwerden: 1-3 Behandlungen im Abstand von 1-2 Wochen. Zur Prävention bei Hobbysportlern: alle 2-3 Monate. Bei intensiv trainierenden Sportlern oder vor wichtigen Wettkämpfen: alle 4-6 Wochen. Leistungssportler kommen oft alle 2-4 Wochen zur Optimierung und Prävention. Nach der ersten Behandlung kann ich Ihnen eine individuelle Empfehlung geben, basierend auf Ihrer Sportart, Trainingsintensität und Ihrem körperlichen Zustand.",
          },
          {
            question: "Ersetzt Sportosteopathie Physiotherapie oder ärztliche Behandlung?",
            answer:
              "Nein, Sportosteopathie ergänzt diese Behandlungen, ersetzt sie aber nicht. Bei akuten, schweren Verletzungen mit möglichen strukturellen Schäden (Knochenbrüche, Kreuzbandrisse, etc.) ist zunächst eine ärztliche Diagnostik notwendig. Physiotherapie mit gezielten Übungen ist oft wichtig für den Muskelaufbau und die Stabilisation. Die Osteopathie kann parallel dazu die ganzheitliche Heilung unterstützen, Kompensationsmuster lösen und die Regeneration beschleunigen. Ich arbeite gerne mit Ärzten, Physiotherapeuten und Trainern zusammen für Ihre optimale Genesung.",
          },
          {
            question: "Welche Sportarten behandeln Sie in Ihrer Praxis am häufigsten?",
            answer:
              "In meiner Praxis in Hamburg-Rotherbaum behandle ich Sportler aus vielen verschiedenen Bereichen: Läufer (Marathon, Triathlon, Ultraläufe), Fußballer, Handballer, Volleyballer, Tennisspieler, Golfer, Radfahrer, Schwimmer, CrossFit-Athleten, Kraftsportler und Yoga-Praktizierende. Jede Sportart hat typische Verletzungsmuster - beim Laufen z.B. Läuferknie und Achillessehnenbeschwerden, beim Tennis Tennisarm und Schulterprobleme, beim Fußball Leisten- und Knieprobleme. Durch meine Erfahrung mit verschiedenen Sportarten kann ich sportartspezifisch behandeln und beraten.",
          },
        ]}
      />
      <Breadcrumbs
        items={[
          { label: "Behandlungen", href: "/behandlungen" },
          { label: "Sportosteopathie" },
        ]}
      />

      <TreatmentHero
        subtitle="Osteopathie für Sportler"
        title="Sportosteopathie"
        description="Verletzungsprävention, schnellere Regeneration und Leistungsoptimierung für Freizeit- und Leistungssportler in Hamburg."
      />

      {/* Main Content */}
      <article className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Introduction */}
          
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-epilogue">
              Sportosteopathie – Mehr als nur Verletzungsbehandlung
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-700 leading-relaxed mb-4">
                Als Sportler stellen Sie höhere Anforderungen an Ihren Körper als der Durchschnitt.
                Ob Sie ambitionierter Hobbysportler, Wochenendläufer oder Leistungssportler sind –
                Ihr Körper braucht optimale Bedingungen, um Höchstleistungen zu erbringen und
                verletzungsfrei zu bleiben.
              </p>
              <p className="text-slate-700 leading-relaxed mb-4">
                Sportosteopathie verbindet das ganzheitliche Konzept der{" "}
                <Link href="/was-ist-osteopathie" className="text-blue-600 hover:text-blue-800 font-medium">
                  Osteopathie
                </Link>{" "}
                mit spezialisiertem Wissen über sportartspezifische Belastungen,
                Bewegungsmuster und Verletzungsrisiken. In meiner Praxis in Hamburg-Rotherbaum
                behandle ich Sportler aller Leistungsklassen – vom Gelegenheitsjogger bis zum
                Profiathleten.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Der Ansatz der Sportosteopathie geht weit über die reine Symptombehandlung hinaus:
                Ich suche nach den Ursachen Ihrer Beschwerden, optimiere Ihre Biomechanik und helfe
                Ihnen, Ihr volles sportliches Potenzial auszuschöpfen.
              </p>
            </div>
          </section>
          

          {/* Die 3 Säulen */}
          
          <section className="mb-16 bg-slate-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-epilogue">
              Die 3 Säulen der Sportosteopathie
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue flex items-center gap-2">
                    <span>🏥</span> Verletzungsbehandlung & Rehabilitation
                  </h3>
                  <p className="text-slate-700">
                    Schnelle und effektive Behandlung akuter Sportverletzungen wie Zerrungen,
                    Prellungen oder Blockaden. Durch manuelle Techniken beschleunige ich die
                    Heilung, reduziere Schwellungen und stelle die volle Beweglichkeit wieder her.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue flex items-center gap-2">
                    <span>🛡️</span> Prävention & Verletzungsvorbeugung
                  </h3>
                  <p className="text-slate-700">
                    Vorbeugung ist besser als Nachsorge: Ich identifiziere muskuläre Dysbalancen,
                    Bewegungseinschränkungen und Überlastungstendenzen, bevor sie zu Verletzungen
                    führen. Regelmäßige osteopathische Checks halten Sie verletzungsfrei.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue flex items-center gap-2">
                    <span>📈</span> Leistungsoptimierung & Regeneration
                  </h3>
                  <p className="text-slate-700">
                    Durch Optimierung Ihrer Biomechanik, Verbesserung der Beweglichkeit und
                    Förderung der Regeneration helfe ich Ihnen, Ihre sportlichen Ziele zu erreichen.
                    Viele Athleten nutzen Sportosteopathie für den letzten Leistungsschub vor
                    wichtigen Wettkämpfen.
                  </p>
                </div>
              </div>
            </div>
          </section>
          

          {/* Häufige Sportverletzungen */}
          
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-epilogue">
              Häufige Sportverletzungen und Überlastungssyndrome
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-700 leading-relaxed mb-6">
                In meiner Praxis behandle ich täglich Sportler mit verschiedensten
                Verletzungsmustern. Hier die häufigsten Beschwerden:
              </p>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Akute Verletzungen
              </h3>
              <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6">
                <li><strong>Muskelzerrungen und -faserrisse:</strong> Oberschenkel, Wade, Leiste</li>
                <li><strong>Bänderdehnungen:</strong> Sprunggelenk, Knie (Außenband, Innenband)</li>
                <li><strong>Prellungen und Hämatome:</strong> Durch Stürze oder Kontakt</li>
                <li><strong>Gelenkblockaden:</strong> ISG, Wirbelsäule, Rippen nach Stürzen</li>
                <li><strong>Verstauchungen:</strong> Handgelenk, Sprunggelenk, Finger</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Chronische Überlastungssyndrome
              </h3>
              <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6">
                <li>
                  <strong>Läuferknie (ITBS - Iliotibiales Bandsyndrom):</strong> Schmerzen außen am Knie,
                  typisch bei Läufern und Radfahrern
                </li>
                <li>
                  <strong>Patellaspitzensyndrom (Jumper's Knee):</strong> Reizung der Kniescheibensehne
                  bei Sprungsportarten
                </li>
                <li>
                  <strong>Achillessehnenentzündung:</strong> Schmerzen und Schwellung der Achillessehne
                  bei Läufern
                </li>
                <li>
                  <strong>Plantarfasziitis:</strong> Fersenschmerzen, besonders morgens nach dem Aufstehen
                </li>
                <li>
                  <strong>Tennisarm (laterale Epicondylitis):</strong> Schmerzen am äußeren Ellenbogen
                  bei Tennis, Golf, Kraftsport
                </li>
                <li>
                  <strong>Golferellenbogen (mediale Epicondylitis):</strong> Schmerzen am inneren Ellenbogen
                </li>
                <li>
                  <strong>Impingement-Syndrom der Schulter:</strong> Einklemmung von Sehnen bei
                  Überkopfsportarten (Schwimmen, Volleyball, Handball)
                </li>
                <li>
                  <strong>Schienbeinkantensyndrom:</strong> Schmerzen entlang der Schienbeinkante bei Läufern
                </li>
                <li>
                  <strong>Leistenschmerzen (Sportlerleiste):</strong> Chronische Beschwerden bei Fußballern
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Weitere sportbedingte Beschwerden
              </h3>
              <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6">
                <li>
                  <strong>Rückenschmerzen durch Sport:</strong> Hohlkreuz bei Kraftsportlern,
                  Rundrücken bei Radfahrern, mehr dazu auf meiner{" "}
                  <Link href="/behandlungen/rueckenschmerzen" className="text-blue-600 hover:text-blue-800 font-medium">
                    Rückenschmerzen-Seite
                  </Link>
                </li>
                <li>
                  <strong>Nackenverspannungen:</strong> Durch Radfahren, Schwimmen (Kraulschwimmen)
                </li>
                <li>
                  <strong>Kieferbeschwerden (CMD):</strong> Durch Zähneknirschen bei Stress und Wettkämpfen
                </li>
                <li>
                  <strong>Verdauungsprobleme bei Ausdauersportlern:</strong> Siehe auch{" "}
                  <Link href="/behandlungen/verdauungsbeschwerden" className="text-blue-600 hover:text-blue-800 font-medium">
                    Verdauungsbeschwerden
                  </Link>
                </li>
              </ul>
            </div>
          </section>
          

          {/* Sportartspezifische Behandlung */}
          
          <section className="mb-16 bg-blue-50 border border-blue-200 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-epilogue">
              Sportartspezifische Osteopathie
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-700 leading-relaxed mb-6">
                Jede Sportart stellt spezifische Anforderungen an den Körper und hat typische
                Verletzungsmuster. Als Sportosteopath kenne ich diese Besonderheiten:
              </p>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Laufsport & Triathlon
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                <strong>Typische Beschwerden:</strong> Läuferknie, Achillessehnenentzündung,
                Plantarfasziitis, Schienbeinkantensyndrom, ISG-Blockaden
              </p>
              <p className="text-slate-700 leading-relaxed mb-6">
                <strong>Osteopathischer Ansatz:</strong> Analyse des Laufstils, Behandlung von
                Beckenschiefständen, Optimierung der Fußstatik, Verbesserung der Hüftbeweglichkeit.
                Viele Läufer haben asymmetrische Bewegungsmuster, die ich korrigiere.
              </p>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Ballsportarten (Fußball, Handball, Volleyball)
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                <strong>Typische Beschwerden:</strong> Leistenschmerzen, Knieprobleme (Meniskus,
                Kreuzbänder), Sprunggelenksverletzungen, Rückenschmerzen
              </p>
              <p className="text-slate-700 leading-relaxed mb-6">
                <strong>Osteopathischer Ansatz:</strong> Stabilisation der Sprunggelenke,
                Behandlung der Adduktoren bei Leistenschmerzen, Optimierung der Rotationsbeweglichkeit
                für Schuss- und Wurftechniken.
              </p>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Racketsport (Tennis, Badminton, Squash)
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                <strong>Typische Beschwerden:</strong> Tennisarm, Schulter-Impingement,
                Handgelenksbeschwerden, einseitige Rückenverspannungen
              </p>
              <p className="text-slate-700 leading-relaxed mb-6">
                <strong>Osteopathischer Ansatz:</strong> Behandlung der Unterarmmuskulatur,
                Mobilisation der Schulter, Ausgleich muskulärer Dysbalancen durch einseitige Belastung.
              </p>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Kraftsport & CrossFit
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                <strong>Typische Beschwerden:</strong> Rückenschmerzen (Hohlkreuz),
                Schulterprobleme, Handgelenksbeschwerden, muskuläre Dysbalancen
              </p>
              <p className="text-slate-700 leading-relaxed mb-6">
                <strong>Osteopathischer Ansatz:</strong> Korrektur von Fehlhaltungen,
                Behandlung überlasteter Strukturen, Optimierung der Bewegungstechnik,
                Ausgleich zwischen Agonisten und Antagonisten.
              </p>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Radsport
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                <strong>Typische Beschwerden:</strong> Rückenschmerzen (Rundrücken),
                Nackenverspannungen, ISG-Blockaden, Knieschmerzen, Taubheitsgefühle in Händen
              </p>
              <p className="text-slate-700 leading-relaxed mb-6">
                <strong>Osteopathischer Ansatz:</strong> Behandlung der Brustwirbelsäule,
                Optimierung der Sitzposition, Behandlung des Psoas-Muskels, Verbesserung
                der Beckenbeweglichkeit.
              </p>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Schwimmen
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                <strong>Typische Beschwerden:</strong> Schulter-Impingement (Schwimmerschulter),
                Nackenverspannungen (Kraulschwimmen), Rückenschmerzen (Brustschwimmen)
              </p>
              <p className="text-slate-700 leading-relaxed">
                <strong>Osteopathischer Ansatz:</strong> Mobilisation der Schulter,
                Behandlung der Halswirbelsäule, Optimierung der Rotationsbeweglichkeit,
                Verbesserung der Atmung durch Zwerchfellbehandlung.
              </p>
            </div>
          </section>
          

          {/* Behandlungsablauf für Sportler */}
          
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-epilogue">
              So läuft Ihre sportosteopathische Behandlung ab
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue flex items-center gap-2">
                    <span>📋</span> Sportspezifische Anamnese
                  </h3>
                  <p className="text-slate-700">
                    Welche Sportart betreiben Sie? Wie intensiv trainieren Sie? Wann treten die
                    Beschwerden auf - beim Training, danach oder in Ruhe? Gibt es eine Vorgeschichte
                    mit Verletzungen? Ich möchte Ihre Trainingsgewohnheiten, Wettkampfziele und
                    Ihre Sportgeschichte genau verstehen.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue flex items-center gap-2">
                    <span>🔍</span> Bewegungsanalyse
                  </h3>
                  <p className="text-slate-700">
                    Ich schaue mir Ihre sportartspezifischen Bewegungen an: Laufstil, Wurftechnik,
                    Schlagbewegung - je nach Sportart. Dabei erkenne ich muskuläre Dysbalancen,
                    Kompensationsmuster und Bewegungseinschränkungen, die zu Beschwerden führen
                    oder führen können.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue flex items-center gap-2">
                    <span>✋</span> Ganzheitliche osteopathische Behandlung
                  </h3>
                  <p className="text-slate-700">
                    Mit manuellen Techniken behandle ich nicht nur die schmerzende Stelle, sondern
                    den gesamten Körper. Oft liegt die Ursache von Knieschmerzen im Becken oder
                    Fuß, Schulterschmerzen können von der Brustwirbelsäule kommen. Ich kombiniere
                    parietale, viszerale und kraniosakrale Osteopathie für optimale Ergebnisse.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue flex items-center gap-2">
                    <span>💡</span> Trainingsempfehlungen & Prävention
                  </h3>
                  <p className="text-slate-700">
                    Sie erhalten konkrete Empfehlungen für Ihr Training: Welche Übungen helfen?
                    Was sollten Sie vermeiden? Wie steigen Sie nach einer Verletzung wieder ein?
                    Ich gebe Ihnen auch Tipps zur Regeneration, Ernährung und Trainingssteuerung.
                  </p>
                </div>
              </div>
            </div>
          </section>
          

          {/* Prävention & Leistungsoptimierung */}
          
          <section className="mb-16 bg-slate-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-epilogue">
              Prävention: Verletzungen verhindern, bevor sie entstehen
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-700 leading-relaxed mb-4">
                Die beste Verletzung ist die, die gar nicht erst passiert. Viele Sportverletzungen
                entstehen nicht durch Unfälle, sondern durch schleichende Überlastung, muskuläre
                Dysbalancen oder Bewegungseinschränkungen.
              </p>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Wie Sportosteopathie präventiv wirkt:
              </h3>
              <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6">
                <li>
                  <strong>Früherkennung:</strong> Ich erkenne Probleme, bevor sie zu Verletzungen werden
                </li>
                <li>
                  <strong>Muskuläre Balance:</strong> Ausgleich von Dysbalancen durch einseitige Belastung
                </li>
                <li>
                  <strong>Beweglichkeitsoptimierung:</strong> Mehr Beweglichkeit = weniger Verletzungsrisiko
                </li>
                <li>
                  <strong>Kompensationsmuster lösen:</strong> Alte Verletzungen führen oft zu
                  Fehlbelastungen, die neue Verletzungen provozieren
                </li>
                <li>
                  <strong>Regenerationsförderung:</strong> Bessere Regeneration = mehr
                  Belastungstoleranz
                </li>
              </ul>

              <p className="text-slate-700 leading-relaxed mb-4">
                <strong>Empfehlung für Hobbysportler:</strong> 1x pro Quartal (alle 3 Monate)
                zur präventiven Behandlung
              </p>
              <p className="text-slate-700 leading-relaxed mb-4">
                <strong>Empfehlung für ambitionierte Sportler:</strong> Alle 4-6 Wochen,
                besonders in intensiven Trainingsphasen
              </p>
              <p className="text-slate-700 leading-relaxed">
                <strong>Empfehlung vor Wettkämpfen:</strong> 1-2 Wochen vor wichtigen Wettkämpfen
                für optimale Leistungsfähigkeit
              </p>
            </div>
          </section>
          

          {/* Regeneration */}
          
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-epilogue">
              Regeneration & Return to Sport
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-700 leading-relaxed mb-4">
                Nach einer Verletzung ist der richtige Wiedereinstieg entscheidend. Zu früh zurück
                ins Training = Rückfallrisiko. Zu lange Pause = Leistungsverlust und Angst. Als
                Sportosteopath begleite ich Sie durch alle Phasen:
              </p>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Phase 1: Akutphase (erste 48-72 Stunden)
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                <strong>Bei akuten Verletzungen:</strong> PECH-Regel anwenden (Pause, Eis,
                Compression, Hochlagern). Osteopathische Behandlung noch nicht sinnvoll.
                Bei Unsicherheit: ärztliche Abklärung!
              </p>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Phase 2: Subakute Phase (3-14 Tage)
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                <strong>Osteopathie beginnt:</strong> Sobald die akute Entzündung abklingt, kann
                ich mit sanften Techniken die Heilung unterstützen. Ziel: Schwellung reduzieren,
                Durchblutung fördern, Beweglichkeit erhalten.
              </p>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Phase 3: Rehabilitationsphase (2-6 Wochen)
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                <strong>Intensive Behandlung:</strong> 1-2x pro Woche osteopathische Behandlung
                kombiniert mit gezieltem Aufbautraining. Ich behandle nicht nur die verletzte
                Struktur, sondern auch Kompensationsmuster, die sich entwickelt haben.
              </p>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Phase 4: Return to Sport (ab Woche 6-12)
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                <strong>Stufenweiser Wiedereinstieg:</strong> Ich teste Ihre Belastbarkeit und
                gebe grünes Licht für den Wiedereinstieg. Wichtig: Nicht direkt zurück auf 100% -
                langsame Steigerung ist der Schlüssel für langfristigen Erfolg.
              </p>

              <div className="mt-6 p-6 bg-white border-l-4 border-slate-900 rounded-r-lg">
                <p className="text-sm text-slate-600 italic mb-2">Praxisbeispiel:</p>
                <p className="text-slate-700 leading-relaxed">
                  Ein Marathonläufer kam mit Läuferknie 6 Wochen vor seinem Zielwettkampf zu mir.
                  Bisherige Behandlung (Physiotherapie, Dehnung) hatte nur kurzfristig geholfen.
                  Bei der Untersuchung fand ich eine ISG-Blockade rechts und einen verkürzten Psoas,
                  die zu einer Überlastung des IT-Bands führten. Nach 3 Behandlungen war er
                  schmerzfrei, ich optimierte seinen Laufstil und er konnte seinen Marathon in
                  persönlicher Bestzeit laufen.
                </p>
              </div>
            </div>
          </section>
          

          {/* FAQ */}
          
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 font-epilogue">
              Häufige Fragen zur Sportosteopathie
            </h2>
            <div className="space-y-4">
              <details className="bg-white border-2 border-slate-200 rounded-xl p-6 group hover:border-slate-400 hover:shadow-lg transition-all duration-300">
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center gap-4">
                  <span className="flex items-center gap-3">
                    <span className="text-2xl">❓</span>
                    Was ist Sportosteopathie und wie unterscheidet sie sich?
                  </span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform duration-300 flex-shrink-0">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed pl-11">
                  Sportosteopathie ist eine spezialisierte Form der Osteopathie, die sich auf die
                  besonderen Bedürfnisse von Sportlern konzentriert. Während die klassische Osteopathie
                  den gesamten Körper betrachtet, liegt der Fokus zusätzlich auf sportartspezifischen
                  Belastungen, Bewegungsmustern und Leistungsoptimierung.
                </p>
              </details>

              <details className="bg-white border-2 border-slate-200 rounded-xl p-6 group hover:border-slate-400 hover:shadow-lg transition-all duration-300">
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center gap-4">
                  <span className="flex items-center gap-3">
                    <span className="text-2xl">🏃</span>
                    Bei welchen Sportverletzungen kann sie helfen?
                  </span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform duration-300 flex-shrink-0">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed pl-11">
                  Wirksam bei akuten Verletzungen wie Muskelzerrungen, Bänderdehnungen und Prellungen
                  sowie bei chronischen Überlastungssyndromen wie Läuferknie, Tennisarm,
                  Achillessehnenentzündung oder Schienbeinkantensyndrom. Besonders effektiv bei
                  funktionellen Beschwerden ohne strukturelle Schäden.
                </p>
              </details>

              <details className="bg-white border-2 border-slate-200 rounded-xl p-6 group hover:border-slate-400 hover:shadow-lg transition-all duration-300">
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center gap-4">
                  <span className="flex items-center gap-3">
                    <span className="text-2xl">⏱️</span>
                    Wie schnell kann ich wieder trainieren?
                  </span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform duration-300 flex-shrink-0">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed pl-11">
                  Bei leichten Zerrungen oder Blockaden oft nach 1-2 Behandlungen mit leichtem Training.
                  Bei schwereren Verletzungen: 2-4 Wochen mit angepasstem Training. Wichtig: Zu frühes,
                  intensives Training kann zu Rückfällen führen. Ich helfe Ihnen, den optimalen Zeitpunkt
                  zu finden.
                </p>
              </details>

              <details className="bg-white border-2 border-slate-200 rounded-xl p-6 group hover:border-slate-400 hover:shadow-lg transition-all duration-300">
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center gap-4">
                  <span className="flex items-center gap-3">
                    <span className="text-2xl">📈</span>
                    Kann sie meine Leistung verbessern?
                  </span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform duration-300 flex-shrink-0">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed pl-11">
                  Ja! Durch Optimierung der Beweglichkeit, Lösen von Blockaden und bessere Regeneration
                  können Sie effizienter trainieren. Viele Profisportler nutzen Osteopathie zur
                  Leistungsoptimierung. Ich analysiere Bewegungsmuster und behandle biomechanische
                  Einschränkungen gezielt.
                </p>
              </details>

              <details className="bg-white border-2 border-slate-200 rounded-xl p-6 group hover:border-slate-400 hover:shadow-lg transition-all duration-300">
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center gap-4">
                  <span className="flex items-center gap-3">
                    <span className="text-2xl">📅</span>
                    Wie oft zur Osteopathie als Sportler?
                  </span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform duration-300 flex-shrink-0">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed pl-11">
                  Akute Beschwerden: 1-3 Behandlungen (1-2 Wochen Abstand). Prävention Hobbysportler:
                  alle 2-3 Monate. Intensiv Trainierende: alle 4-6 Wochen. Leistungssportler: alle
                  2-4 Wochen zur Optimierung.
                </p>
              </details>

              <details className="bg-white border-2 border-slate-200 rounded-xl p-6 group hover:border-slate-400 hover:shadow-lg transition-all duration-300">
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center gap-4">
                  <span className="flex items-center gap-3">
                    <span className="text-2xl">🏥</span>
                    Ersetzt es Physio oder ärztliche Behandlung?
                  </span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform duration-300 flex-shrink-0">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed pl-11">
                  Nein, Sportosteopathie ergänzt diese Behandlungen. Bei schweren akuten Verletzungen
                  ist ärztliche Diagnostik notwendig. Physiotherapie mit Übungen bleibt wichtig für
                  Muskelaufbau. Osteopathie unterstützt die ganzheitliche Heilung parallel dazu.
                </p>
              </details>

              <details className="bg-white border-2 border-slate-200 rounded-xl p-6 group hover:border-slate-400 hover:shadow-lg transition-all duration-300">
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center gap-4">
                  <span className="flex items-center gap-3">
                    <span className="text-2xl">⚽</span>
                    Welche Sportarten behandeln Sie?
                  </span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform duration-300 flex-shrink-0">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed pl-11">
                  Läufer, Fußballer, Handballer, Volleyballer, Tennisspieler, Golfer, Radfahrer,
                  Schwimmer, CrossFit-Athleten, Kraftsportler und Yoga-Praktizierende. Jede Sportart
                  hat typische Verletzungsmuster - ich kann sportartspezifisch behandeln und beraten.
                </p>
              </details>
            </div>
          </section>
          

          {/* Weitere Infos */}
          
          <section className="mb-16 bg-blue-50 border border-blue-200 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4 font-epilogue">
              Weitere hilfreiche Informationen
            </h3>
            <div className="space-y-3">
              <p className="text-slate-700">
                Sie möchten mehr über den Behandlungsablauf erfahren?{" "}
                <Link href="/kosten-ablauf" className="text-blue-600 hover:text-blue-800 font-medium">
                  Alle Infos zu Kosten & Ablauf →
                </Link>
              </p>
              <p className="text-slate-700">
                Leiden Sie zusätzlich unter{" "}
                <Link href="/behandlungen/stress-burnout" className="text-blue-600 hover:text-blue-800 font-medium">
                  Stress oder Burnout
                </Link>
                ? Viele Sportler kämpfen mit mentalem Druck.
              </p>
              <p className="text-slate-700">
                Interessiert an weiteren Behandlungsmöglichkeiten?{" "}
                <Link href="/behandlungen" className="text-blue-600 hover:text-blue-800 font-medium">
                  Alle Behandlungen im Überblick →
                </Link>
              </p>
            </div>
          </section>
          

        </div>
      </article>

      {/* CTA Section */}
      
      <section className="py-16 px-4 sm:px-6 bg-slate-50">
        <div className="mx-auto max-w-5xl">
          <TreatmentCTA
            title="Als Sportler behandeln lassen"
            description="Vereinbaren Sie jetzt einen Termin für optimale Regeneration und Leistungssteigerung."
          />
        </div>
      </section>
      
    </>
  );
}
