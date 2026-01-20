import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSchema from "@/components/FAQSchema";
import StickyBookingButton from "@/components/StickyBookingButton";
import { assetPath, linkPath } from "@/lib/basePath";

export const metadata: Metadata = {
  title: "Was ist Osteopathie? | Hamburg - Joshua Alsen",
  description:
    "Osteopathie erklärt ✓ VFO-Osteopath Hamburg ✓ Rotherbaum & Eimsbüttel ✓ Rückenschmerzen, Kopfschmerzen & mehr ✓ Jetzt buchen!",
  keywords: [
    "Was ist Osteopathie",
    "Osteopathie erklärt",
    "Osteopathie Definition",
    "Ganzheitliche Medizin",
    "Manuelle Therapie",
    "Osteopathie Hamburg",
  ],
  alternates: { canonical: "/was-ist-osteopathie/" },
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
      <FAQSchema
        faqs={[
          {
            question: "Was kostet eine osteopathische Behandlung?",
            answer:
              "Eine osteopathische Behandlung kostet in der Regel zwischen 80 und 150 Euro pro Sitzung. Die Kosten variieren je nach Behandlungsdauer (meist 45-60 Minuten) und Praxisstandort. Viele private Krankenversicherungen übernehmen die Kosten vollständig. Auch zahlreiche gesetzliche Krankenkassen wie TK, Barmer, DAK und AOK bezuschussen osteopathische Behandlungen mit 30-60 Euro pro Sitzung. Informieren Sie sich bei Ihrer Krankenkasse über die genauen Erstattungsmodalitäten.",
          },
          {
            question: "Wie läuft die erste Behandlung ab?",
            answer:
              "Die Erstbehandlung dauert etwa 60 Minuten und beginnt mit einer ausführlichen Anamnese: Ich erfrage Ihre aktuellen Beschwerden, Krankengeschichte, Lebensgewohnheiten und Erwartungen. Anschließend folgt eine körperliche Untersuchung, bei der ich Ihren gesamten Körper auf Blockaden, Spannungsmuster und Bewegungseinschränkungen untersuche. Danach beginnt die osteopathische Behandlung mit sanften manuellen Techniken. Am Ende besprechen wir die Befunde und erstellen einen individuellen Behandlungsplan.",
          },
          {
            question: "Wie viele Behandlungen brauche ich?",
            answer:
              "Die Anzahl der Behandlungen hängt von Art und Dauer Ihrer Beschwerden ab. Bei akuten Problemen reichen oft 3-5 Sitzungen im Abstand von 1-2 Wochen. Bei chronischen Beschwerden sind meist 6-10 Behandlungen über mehrere Monate sinnvoll. Viele Patienten spüren bereits nach der ersten Sitzung eine Verbesserung. Die osteopathische Behandlung setzt Selbstheilungsprozesse in Gang, die Zeit brauchen. Ich bespreche mit Ihnen nach jeder Sitzung, wie viele weitere Behandlungen empfehlenswert sind.",
          },
          {
            question: "Übernimmt die Krankenkasse die Kosten?",
            answer:
              "Private Krankenversicherungen übernehmen in der Regel die Kosten vollständig, wenn eine ärztliche Verordnung vorliegt. Viele gesetzliche Krankenkassen bezuschussen osteopathische Behandlungen mit 30-60 Euro pro Sitzung (meist 3-6 Sitzungen pro Jahr). Zu den erstattenden Kassen gehören unter anderem: TK (Techniker Krankenkasse), Barmer, DAK, AOK, IKK, KKH und BKK. Die genauen Konditionen variieren je nach Kasse. Bitte informieren Sie sich vorab bei Ihrer Krankenkasse über die Erstattungsmöglichkeiten und erforderlichen Unterlagen.",
          },
          {
            question: "Was ist der Unterschied zwischen Osteopathie und Physiotherapie?",
            answer:
              "Osteopathie verfolgt einen ganzheitlichen Ansatz und sucht nach den Ursachen von Beschwerden im gesamten Körper, nicht nur am Ort des Symptoms. Die Behandlung erfolgt ausschließlich mit den Händen und dauert 45-60 Minuten. Physiotherapie ist oft symptomorientierter und fokussiert auf die betroffene Region. Sie arbeitet mit Übungen, Geräten und manuellen Techniken, Behandlungen dauern meist 15-30 Minuten. Beide Methoden können sich gut ergänzen.",
          },
          {
            question: "Tut osteopathische Behandlung weh?",
            answer:
              "Osteopathische Behandlungen sind in der Regel sanft und schmerzfrei. Ich arbeite mit gezieltem Druck und sanften Mobilisationstechniken. Bei manchen Techniken kann ein kurzer Dehnschmerz auftreten, der jedoch nicht unangenehm ist. Nach der Behandlung kann es zu einem leichten Muskelkater kommen – ein Zeichen, dass der Körper auf die Behandlung reagiert. Bei akuten Entzündungen oder starken Schmerzen passe ich die Behandlung entsprechend an. Die meisten Patienten empfinden die Behandlung als sehr entspannend.",
          },
          {
            question: "Wie finde ich einen guten Osteopathen?",
            answer:
              "Achten Sie auf eine fundierte Ausbildung: Ein guter Osteopath hat eine 4-5-jährige berufsbegleitende Ausbildung absolviert (mindestens 1350 Unterrichtsstunden) und ist bei einem Berufsverband registriert (z.B. VFO, VOD, BVO). Diese Verbände garantieren hohe Ausbildungsstandards. Prüfen Sie, ob der Osteopath eine Heilpraktiker-Zulassung oder ärztliche Approbation hat – nur dann darf er eigenständig behandeln. Empfehlungen von Freunden oder Ärzten sowie Online-Bewertungen können bei der Suche helfen.",
          },
          {
            question: "Kann Osteopathie Nebenwirkungen haben?",
            answer:
              "Osteopathie ist bei fachgerechter Anwendung sehr sicher. In den ersten 24-48 Stunden nach der Behandlung kann es zu milden Reaktionen kommen: leichter Muskelkater, Müdigkeit, verstärkter Harndrang oder Durst, vorübergehende Verstärkung der Symptome. Diese Reaktionen sind normal und zeigen, dass der Körper auf die Behandlung reagiert. Sie klingen meist nach 1-2 Tagen ab. Ernsthafte Nebenwirkungen sind extrem selten. Bei bestimmten Kontraindikationen (akute Infektionen, Knochenbrüche, Tumore, schwere Osteoporose) sollte nicht osteopathisch behandelt werden.",
          },
          {
            question: "Ist Osteopathie wissenschaftlich anerkannt?",
            answer:
              "Ja, Osteopathie wird zunehmend wissenschaftlich erforscht und anerkannt. Die WHO (Weltgesundheitsorganisation) erkennt Osteopathie als eigenständige Heilmethode an. Zahlreiche Studien belegen die Wirksamkeit bei Rückenschmerzen, Nackenbeschwerden, Kopfschmerzen und muskuloskelettalen Beschwerden. Auch die Kostenübernahme durch viele Krankenkassen ist ein deutliches Zeichen der Anerkennung. Die Forschung zu osteopathischen Wirkmechanismen entwickelt sich stetig weiter. In einigen Ländern (USA, Großbritannien) ist Osteopathie bereits vollständig im Gesundheitssystem integriert.",
          },
          {
            question: "Was sind Faszien und warum sind sie wichtig?",
            answer:
              "Faszien sind kollagenhaltige Bindegewebsstrukturen, die alle Körperstrukturen – Muskeln, Organe, Knochen, Nerven – umhüllen und miteinander verbinden. Sie bilden ein dreidimensionales Netzwerk im gesamten Körper. Faszien übertragen Kräfte, ermöglichen Bewegung und dienen der Kommunikation zwischen Körperstrukturen. Bei Stress, Fehlhaltung oder Verletzungen können Faszien verkleben oder verhärten, was zu Bewegungseinschränkungen und Schmerzen führt. In der Osteopathie spielen Faszien eine zentrale Rolle, da Spannungen im Fasziensystem oft die Ursache für Beschwerden fernab der schmerzenden Stelle sind.",
          },
        ]}
      />
      <Breadcrumbs items={[{ label: "Was ist Osteopathie?" }]} />

      <StickyBookingButton />

      {/* Hero Section */}
      
        <section className="bg-white pt-8 pb-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 lg:px-12 text-center">
            <div className="mx-auto max-w-3xl">
              <h1 className="font-epilogue text-slate-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-light leading-tight mb-6">
                Was ist Osteopathie? Ihre Praxis in Hamburg
              </h1>
              <p className="text-slate-600 text-lg sm:text-xl md:text-2xl font-light leading-normal">
                Ganzheitliche Heilmethode in Hamburg Rotherbaum & Eimsbüttel –
                Der Körper als Einheit, Aktivierung der Selbstheilungskräfte
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
                  Definition und Grundprinzipien der Osteopathie Hamburg
                </h2>
                <div className="space-y-4 text-slate-700 text-lg leading-normal">
                  <p>
                    Osteopathie in Hamburg ist eine <strong>ganzheitliche manuelle
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
                  src={assetPath("/assets/joshua-alsen-dozent.webp")}
                  alt="Joshua Alsen erklärt Osteopathie"
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
            <div className="space-y-6 text-slate-700 text-lg leading-normal">
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
                <p className="text-slate-700 leading-normal mb-4">
                  Behandlung des <strong>Bewegungsapparates</strong>:
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li>• Knochen und Gelenke</li>
                  <li>• Muskeln und Faszien</li>
                  <li>• Sehnen und Bänder</li>
                </ul>
                <p className="text-slate-600 mt-4 text-sm">
                  Anwendung bei: <Link href={linkPath("/behandlungen/rueckenschmerzen/")} className="hover:text-slate-900 underline">Rückenschmerzen Hamburg</Link>, Gelenkbeschwerden, <Link href={linkPath("/behandlungen/sportosteopathie/")} className="hover:text-slate-900 underline">Sportverletzungen</Link>
                </p>
              </div>

              {/* Visceral */}
              <div className="bg-white rounded-lg border border-slate-200 p-8">
                <div className="text-5xl mb-4">🫁</div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4 font-epilogue">
                  Viszerale Osteopathie
                </h3>
                <p className="text-slate-700 leading-normal mb-4">
                  Behandlung der <strong>inneren Organe</strong>:
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li>• Verdauungsorgane</li>
                  <li>• Lunge und Herz</li>
                  <li>• Urogenitalsystem</li>
                </ul>
                <p className="text-slate-600 mt-4 text-sm">
                  Anwendung bei: <Link href={linkPath("/behandlungen/verdauungsbeschwerden/")} className="hover:text-slate-900 underline">Verdauungsbeschwerden</Link>, Reflux, Atemwegserkrankungen
                </p>
              </div>

              {/* Craniosacral */}
              <div className="bg-white rounded-lg border border-slate-200 p-8">
                <div className="text-5xl mb-4">🧠</div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4 font-epilogue">
                  Craniosacrale Osteopathie
                </h3>
                <p className="text-slate-700 leading-normal mb-4">
                  Behandlung von <strong>Schädel und Nervensystem</strong>:
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li>• Schädelknochen</li>
                  <li>• Kreuzbein (Sacrum)</li>
                  <li>• Gehirn- und Rückenmarksflüssigkeit</li>
                </ul>
                <p className="text-slate-600 mt-4 text-sm">
                  Anwendung bei: <Link href={linkPath("/behandlungen/kopfschmerzen-migraene/")} className="hover:text-slate-900 underline">Kopfschmerzen, Migräne</Link>, Kieferbeschwerden, <Link href={linkPath("/behandlungen/stress-burnout/")} className="hover:text-slate-900 underline">Stress</Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      

      {/* NEW: Faszien-System Section */}
      
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight font-epilogue mb-8">
              Das Faszien-System: Verbindung im ganzen Körper
            </h2>
            <div className="space-y-6 text-slate-700 text-lg leading-normal">
              <p>
                <strong>Faszien</strong> sind kollagenhaltige Bindegewebsstrukturen, die alle Körperstrukturen – Muskeln, Organe, Knochen, Nerven und Blutgefäße – umhüllen und miteinander verbinden. Sie bilden ein dreidimensionales Netzwerk, das den gesamten Körper durchzieht und als eine Art "inneres Spannungssystem" fungiert.
              </p>
              <p>
                Lange wurden Faszien in der Medizin vernachlässigt. Heute wissen wir: Sie sind weit mehr als nur "Verpackungsmaterial". Faszien spielen eine zentrale Rolle bei der Kraftübertragung, Bewegungskoordination und der Kommunikation zwischen verschiedenen Körperbereichen. Sie enthalten zahlreiche Nervenenden und sind damit auch an der Schmerzwahrnehmung beteiligt.
              </p>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 my-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3 font-epilogue">Warum Faszien in der Osteopathie zentral sind</h3>
                <p className="mb-4">
                  Bei Stress, Fehlhaltungen, Verletzungen oder Operationen können Faszien verkleben, verhärten oder ihre Elastizität verlieren. Dies führt zu:
                </p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Bewegungseinschränkungen und Steifheit</li>
                  <li>Chronischen Schmerzen – oft fernab der eigentlichen Ursache</li>
                  <li>Gestörter Durchblutung und Lymphfluss</li>
                  <li>Beeinträchtigung der Organfunktion</li>
                </ul>
              </div>

              <p>
                In der osteopathischen Behandlung nehmen Faszien eine Schlüsselrolle ein. Durch gezielte <strong>Faszienarbeit</strong> können Verklebungen gelöst, Spannungen ausgeglichen und die Beweglichkeit wiederhergestellt werden. Osteopathen arbeiten mit sanften Techniken, um das fasziale Netzwerk zu entspannen und die Selbstheilungskräfte zu aktivieren.
              </p>

              <p>
                Ein Beispiel: <Link href={linkPath("/behandlungen/rueckenschmerzen/")} className="text-slate-800 hover:text-slate-900 underline font-semibold">Rückenschmerzen</Link> im unteren Bereich können durch Faszienspannungen im Zwerchfell oder sogar im Nacken verursacht werden. Durch die ganzheitliche Betrachtung des Fasziensystems kann der Osteopath solche Zusammenhänge erkennen und behandeln.
              </p>
            </div>
          </div>
        </section>
      

      {/* Principles Section */}
      
        <section className="bg-slate-50 py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight font-epilogue mb-8">
              Die vier Grundprinzipien nach Still
            </h2>

            <div className="space-y-6">
              <div className="bg-white border-l-4 border-slate-900 p-6 rounded-r-lg">
                <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                  1. Der Körper ist eine Einheit
                </h3>
                <p className="text-slate-700 leading-normal">
                  Körper, Geist und Seele bilden eine untrennbare Einheit. Alle
                  Strukturen und Funktionen beeinflussen sich gegenseitig. Eine
                  Störung an einer Stelle kann Auswirkungen auf den gesamten
                  Organismus haben.
                </p>
              </div>

              <div className="bg-white border-l-4 border-slate-900 p-6 rounded-r-lg">
                <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                  2. Struktur und Funktion stehen in Wechselbeziehung
                </h3>
                <p className="text-slate-700 leading-normal">
                  Die Struktur (Anatomie) bestimmt die Funktion, und die Funktion
                  beeinflusst die Struktur. Wenn die Struktur nicht optimal ist,
                  kann die Funktion beeinträchtigt sein – und umgekehrt.
                </p>
              </div>

              <div className="bg-white border-l-4 border-slate-900 p-6 rounded-r-lg">
                <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                  3. Der Körper besitzt Selbstheilungskräfte
                </h3>
                <p className="text-slate-700 leading-normal">
                  Der Körper verfügt über die Fähigkeit zur Selbstregulation und
                  Selbstheilung. Die Aufgabe des Osteopathen ist es, diese
                  Kräfte zu unterstützen und Blockaden zu lösen, die die
                  Heilung verhindern.
                </p>
              </div>

              <div className="bg-white border-l-4 border-slate-900 p-6 rounded-r-lg">
                <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                  4. Die Regel der Arterie ist absolut
                </h3>
                <p className="text-slate-700 leading-normal">
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
      
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight font-epilogue mb-8">
              Unterschied zu anderen Therapieformen
            </h2>

            <div className="space-y-6">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
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

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
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
      

      {/* For Whom Section - EXPANDED */}
      
        <section className="bg-slate-50 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight text-center mb-12 font-epilogue">
              Für wen ist Osteopathie geeignet?
            </h2>

            <div className="grid md:grid-cols-4 gap-6 mb-16">
              <div className="text-center bg-white rounded-lg p-6 border border-slate-200">
                <div className="text-5xl mb-4">👶</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                  Babys & Kinder
                </h3>
                <p className="text-slate-600">
                  Sanfte Behandlung bei Schreibabys, Koliken, Entwicklungsstörungen
                </p>
              </div>

              <div className="text-center bg-white rounded-lg p-6 border border-slate-200">
                <div className="text-5xl mb-4">🤰</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                  Schwangere
                </h3>
                <p className="text-slate-600">
                  Begleitung während Schwangerschaft und Geburtsvorbereitung
                </p>
              </div>

              <div className="text-center bg-white rounded-lg p-6 border border-slate-200">
                <div className="text-5xl mb-4">💼</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                  Erwachsene
                </h3>
                <p className="text-slate-600">
                  Bei akuten und chronischen Beschwerden, <Link href={linkPath("/behandlungen/stress-burnout/")} className="text-slate-800 hover:text-slate-900 underline font-semibold">Stress</Link>, Prävention
                </p>
              </div>

              <div className="text-center bg-white rounded-lg p-6 border border-slate-200">
                <div className="text-5xl mb-4">👴</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                  Senioren
                </h3>
                <p className="text-slate-600">
                  Erhalt der Mobilität, Schmerzlinderung, Lebensqualität
                </p>
              </div>
            </div>

            {/* NEW: Detailed Application Areas */}
            <div className="mx-auto max-w-4xl">
              <h3 className="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight font-epilogue mb-8 text-center">
                Häufige Anwendungsgebiete der Osteopathie
              </h3>

              <div className="space-y-6">
                <div className="bg-white border-l-4 border-blue-600 p-6 rounded-r-lg">
                  <h4 className="text-xl font-semibold text-slate-900 mb-3 font-epilogue flex items-center gap-2">
                    <span>🩻</span> <Link href={linkPath("/behandlungen/rueckenschmerzen/")} className="hover:text-blue-600 transition-colors">Rückenschmerzen & Bandscheibenprobleme</Link>
                  </h4>
                  <p className="text-slate-700 leading-normal">
                    Chronische und akute Schmerzen im unteren Rücken (LWS), Bandscheibenvorfälle, ISG-Blockaden, Hexenschuss. Die Osteopathie behandelt nicht nur die schmerzende Region, sondern sucht nach den Ursachen im gesamten Körper – oft liegen diese in Faszienspannungen, Fehlhaltungen oder Organfunktionsstörungen.
                  </p>
                </div>

                <div className="bg-white border-l-4 border-purple-600 p-6 rounded-r-lg">
                  <h4 className="text-xl font-semibold text-slate-900 mb-3 font-epilogue flex items-center gap-2">
                    <span>🤕</span> <Link href={linkPath("/behandlungen/kopfschmerzen-migraene/")} className="hover:text-purple-600 transition-colors">Kopfschmerzen & Migräne</Link>
                  </h4>
                  <p className="text-slate-700 leading-normal">
                    Spannungskopfschmerzen, Migräne, Clusterkopfschmerzen, Schwindel. Durch craniosacrale Techniken und Behandlung der Halswirbelsäule kann die Durchblutung verbessert und der Druck im Schädel reguliert werden. Viele Patienten erleben eine deutliche Reduktion der Kopfschmerzfrequenz und -intensität.
                  </p>
                </div>

                <div className="bg-white border-l-4 border-green-600 p-6 rounded-r-lg">
                  <h4 className="text-xl font-semibold text-slate-900 mb-3 font-epilogue flex items-center gap-2">
                    <span>🫃</span> <Link href={linkPath("/behandlungen/verdauungsbeschwerden/")} className="hover:text-green-600 transition-colors">Verdauungsbeschwerden</Link>
                  </h4>
                  <p className="text-slate-700 leading-normal">
                    Reizdarm, Blähungen, Verstopfung, Sodbrennen, Reflux. Die viszerale Osteopathie behandelt die inneren Organe und ihre Aufhängung. Durch Mobilisation des Verdauungstrakts und Entspannung des Zwerchfells können Verdauungsbeschwerden oft deutlich gebessert werden.
                  </p>
                </div>

                <div className="bg-white border-l-4 border-red-600 p-6 rounded-r-lg">
                  <h4 className="text-xl font-semibold text-slate-900 mb-3 font-epilogue flex items-center gap-2">
                    <span>😰</span> <Link href={linkPath("/behandlungen/stress-burnout/")} className="hover:text-red-600 transition-colors">Stress & Burnout</Link>
                  </h4>
                  <p className="text-slate-700 leading-normal">
                    Chronischer Stress, Erschöpfung, Schlafstörungen, innere Unruhe, Angstzustände. Die Osteopathie reguliert das vegetative Nervensystem durch craniosacrale Techniken und Vagusnerv-Stimulation. Dies fördert Entspannung, verbessert den Schlaf und hilft dem Körper, wieder in den Regenerationsmodus zu finden.
                  </p>
                </div>

                <div className="bg-white border-l-4 border-orange-600 p-6 rounded-r-lg">
                  <h4 className="text-xl font-semibold text-slate-900 mb-3 font-epilogue flex items-center gap-2">
                    <span>⚽</span> <Link href={linkPath("/behandlungen/sportosteopathie/")} className="hover:text-orange-600 transition-colors">Sportosteopathie</Link>
                  </h4>
                  <p className="text-slate-700 leading-normal">
                    Sportverletzungen, Überlastungssyndrome, Leistungsoptimierung, Rehabilitation. Ob Läufer, Fußballer oder Kraftsportler – osteopathische Behandlung hilft bei der Regeneration, verbessert die Beweglichkeit und beugt Verletzungen vor. Viele Profisportler setzen auf regelmäßige osteopathische Betreuung.
                  </p>
                </div>

                <div className="bg-white border-l-4 border-pink-600 p-6 rounded-r-lg">
                  <h4 className="text-xl font-semibold text-slate-900 mb-3 font-epilogue flex items-center gap-2">
                    <span>🤰</span> Schwangerschaft & Postpartal
                  </h4>
                  <p className="text-slate-700 leading-normal">
                    Rückenschmerzen in der Schwangerschaft, Beckenbeschwerden, Geburtsvorbereitung, Rückbildung nach der Geburt. Die sanfte osteopathische Behandlung unterstützt den Körper während der Schwangerschaft, bereitet das Becken auf die Geburt vor und hilft bei der Regeneration danach.
                  </p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link
                  href={linkPath("/behandlungen/")}
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-slate-900 rounded-md hover:bg-slate-800 transition-colors"
                >
                  Alle Behandlungen ansehen →
                </Link>
              </div>
            </div>
          </div>
        </section>
      

      {/* NEW: Behandlungsablauf Section */}
      
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight font-epilogue mb-8">
              Der Behandlungsablauf: Was erwartet Sie?
            </h2>

            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">Anamnese & Erstgespräch (15-20 Min.)</h3>
                  <p className="text-slate-700 leading-normal">
                    Die Erstbehandlung beginnt mit einem ausführlichen Gespräch. Ich erfrage Ihre aktuellen Beschwerden, Krankengeschichte, Unfälle, Operationen, Medikamente und Lebensgewohnheiten. Wichtig ist auch, was Sie bereits unternommen haben und welche Erwartungen Sie an die Behandlung haben. Diese Informationen helfen mir, ein umfassendes Bild Ihrer Gesundheit zu erhalten.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">Körperliche Untersuchung (10-15 Min.)</h3>
                  <p className="text-slate-700 leading-normal">
                    Anschließend untersuche ich Ihren gesamten Körper – nicht nur die schmerzende Region. Mit geschulten Händen erspüre ich Blockaden, Spannungsmuster, Bewegungseinschränkungen und Gewebeveränderungen. Diese ganzheitliche Untersuchung ist charakteristisch für die Osteopathie und hilft mir, die Ursachen Ihrer Beschwerden zu finden.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">Osteopathische Behandlung (30-35 Min.)</h3>
                  <p className="text-slate-700 leading-normal mb-3">
                    Die Behandlung erfolgt mit sanften manuellen Techniken. Je nach Befund kombiniere ich parietale, viszerale und craniosacrale Methoden. Die Techniken sind meist schmerzfrei und werden individuell an Sie angepasst. Während der Behandlung aktiviere ich die Selbstheilungskräfte Ihres Körpers und löse Blockaden.
                  </p>
                  <p className="text-slate-700 leading-normal">
                    <strong>Dauer einer Behandlung:</strong> Erstbehandlung ca. 60 Minuten, Folgebehandlungen 45-50 Minuten.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">Nachbesprechung & Empfehlungen (5-10 Min.)</h3>
                  <p className="text-slate-700 leading-normal mb-3">
                    Am Ende jeder Sitzung besprechen wir die Befunde und Behandlung. Ich erkläre Ihnen, was ich gefunden habe und warum ich bestimmte Bereiche behandelt habe. Sie erhalten Empfehlungen für zuhause: Übungen, Verhaltenstipps oder Hinweise zur Selbsthilfe.
                  </p>
                  <p className="text-slate-700 leading-normal">
                    <strong>Behandlungsfrequenz:</strong> Bei akuten Beschwerden empfehle ich oft 3-5 Behandlungen im Abstand von 1-2 Wochen. Bei chronischen Problemen sind 6-10 Sitzungen über mehrere Monate sinnvoll. Die Abstände zwischen den Behandlungen werden größer, je mehr sich Ihr Körper stabilisiert.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Was passiert zwischen den Behandlungen?</h3>
              <p className="text-slate-700 leading-normal mb-3">
                Die osteopathische Behandlung setzt Prozesse in Gang, die mehrere Tage nachwirken. In den ersten 24-48 Stunden kann es zu leichten Reaktionen kommen: Muskelkater, Müdigkeit oder vorübergehende Verstärkung der Symptome. Dies ist normal und zeigt, dass Ihr Körper auf die Behandlung reagiert.
              </p>
              <p className="text-slate-700 leading-normal">
                Die eigentliche Verbesserung tritt oft erst 3-5 Tage nach der Behandlung ein. Deshalb sind die Abstände zwischen den Sitzungen wichtig – Ihr Körper braucht Zeit zur Selbstregulation. Weitere Informationen finden Sie auf der Seite <Link href={linkPath("/kosten-ablauf/")} className="text-slate-800 hover:text-slate-900 underline font-semibold">Kosten & Ablauf</Link>.
              </p>
            </div>
          </div>
        </section>
      

      {/* NEW: Ausbildung & Qualifikation Section */}
      
        <section className="bg-slate-50 py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight font-epilogue mb-8">
              Ausbildung & Qualifikation: Was macht einen guten Osteopathen aus?
            </h2>
            <div className="space-y-6 text-slate-700 text-lg leading-normal">
              <p>
                In Deutschland ist die Osteopathie-Ausbildung noch nicht staatlich einheitlich geregelt. Umso wichtiger ist es, auf eine fundierte Qualifikation zu achten. Ein qualifizierter Osteopath hat eine <strong>4-5-jährige berufsbegleitende Ausbildung</strong> mit mindestens 1.350 Unterrichtsstunden absolviert.
              </p>

              <div className="bg-white border-2 border-slate-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-4 font-epilogue">Die Ausbildung umfasst:</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Anatomie, Physiologie und Pathologie (medizinisches Grundwissen)</li>
                  <li>Parietale, viszerale und craniosacrale Osteopathie</li>
                  <li>Differentialdiagnostik und klinische Untersuchung</li>
                  <li>Praxistraining und Behandlungstechniken</li>
                  <li>Wissenschaftliche Arbeit und Abschlussprüfung</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4 font-epilogue">Berufsverbände und Qualitätssicherung</h3>
              <p>
                Für Patienten sind Berufsverbände wichtig, da sie die Abrechnung mit den Krankenkassen gewährleisten. Die größten Verbände in Deutschland sind der <strong>Verband der Osteopathen Deutschland (VOD)</strong>, der <strong>Bundesverband Osteopathie (BVO)</strong> und der <strong>Verband Freier Osteopathen (VFO)</strong>. Ich bin Mitglied im <strong>VFO</strong>.
              </p>
              <p>
                Ich habe Osteopathie an der <strong>Osteopathie Schule Deutschland (OSD)</strong> studiert – und zwar in <strong>Vollzeit über 4 Jahre</strong>. Dadurch komme ich auf weitaus mehr Ausbildungsstunden als die von Krankenkassen geforderten Mindeststunden von 1.350 Unterrichtsstunden. Die OSD ist BAO-anerkannt (Bundesarbeitsgemeinschaft Osteopathie), was höchste Qualitätsstandards garantiert.
              </p>

              <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4 font-epilogue">Heilpraktiker oder Arzt: Wer darf osteopathisch behandeln?</h3>
              <p>
                In Deutschland dürfen nur <strong>Heilpraktiker</strong> oder <strong>Ärzte</strong> eigenständig osteopathische Behandlungen durchführen. Physiotherapeuten mit osteopathischer Ausbildung dürfen nur auf ärztliche Verordnung tätig werden.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-slate-900 mb-2">Osteopath (Heilpraktiker)</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Eigenständige Diagnostik und Behandlung</li>
                    <li>• Keine Verschreibung von Medikamenten</li>
                    <li>• Fokus auf manuelle Therapie und Naturheilkunde</li>
                    <li>• Kostenerstattung durch viele Krankenkassen</li>
                  </ul>
                </div>

                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                  <h4 className="font-semibold text-slate-900 mb-2">Osteopath (Arzt)</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Medizinische Approbation plus Osteopathie-Ausbildung</li>
                    <li>• Volle schulmedizinische Diagnostik möglich</li>
                    <li>• Kann Medikamente verschreiben</li>
                    <li>• Integration von Schulmedizin und Osteopathie</li>
                  </ul>
                </div>
              </div>

              <p className="mt-6">
                Mehr über meine Ausbildung, Qualifikationen und Philosophie erfahren Sie auf meiner <Link href={linkPath("/ueber-mich/")} className="text-slate-800 hover:text-slate-900 underline font-semibold">Über-mich-Seite</Link>.
              </p>
            </div>
          </div>
        </section>
      

      {/* Scientific Evidence Section */}
      
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight font-epilogue mb-8">
              Wissenschaftliche Anerkennung
            </h2>
            <div className="space-y-6 text-slate-700 text-lg leading-normal">
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
      

      {/* NEW: Grenzen & Risiken Section */}
      
        <section className="bg-slate-50 py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight font-epilogue mb-8">
              Grenzen & Risiken: Wann ist Osteopathie nicht geeignet?
            </h2>
            <div className="space-y-6 text-slate-700 text-lg leading-normal">
              <p>
                Osteopathie ist eine sichere und sanfte Behandlungsmethode – aber sie hat auch ihre Grenzen. Bei bestimmten Erkrankungen ist eine osteopathische Behandlung nicht geeignet oder muss mit großer Vorsicht erfolgen.
              </p>

              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-4 font-epilogue flex items-center gap-2">
                  <span>⚠️</span> Kontraindikationen: Wann Osteopathie NICHT angewendet werden sollte
                </h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li><strong>Akute Infektionen:</strong> Fieber, bakterielle oder virale Infektionen, Sepsis</li>
                  <li><strong>Akute Verletzungen:</strong> Frische Knochenbrüche, offene Wunden, Blutungen</li>
                  <li><strong>Tumorerkrankungen:</strong> Krebs oder Metastasen (außer in palliativer Begleitung)</li>
                  <li><strong>Schwere Osteoporose:</strong> Hohes Risiko für Frakturen</li>
                  <li><strong>Akute Entzündungen:</strong> Rheumatoide Arthritis im Schub, akute Darmentzündung</li>
                  <li><strong>Gefäßerkrankungen:</strong> Frischer Schlaganfall, Aneurysmen, Thrombosen</li>
                  <li><strong>Akute psychiatrische Krisen:</strong> Schwere Depression mit Suizidalität, akute Psychose</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4 font-epilogue">Relative Kontraindikationen (mit Vorsicht)</h3>
              <p className="mb-4">
                Bei folgenden Zuständen kann osteopathisch behandelt werden, jedoch mit angepassten, besonders sanften Techniken:
              </p>
              <ul className="space-y-2 list-disc list-inside mb-6">
                <li>Schwangerschaft (besonders im ersten Trimester)</li>
                <li>Nach Operationen (mindestens 6 Wochen Heilungszeit abwarten)</li>
                <li>Einnahme von Blutverdünnern (erhöhtes Blutungsrisiko)</li>
                <li>Autoimmunerkrankungen</li>
                <li>Bandscheibenvorfälle mit neurologischen Ausfällen</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4 font-epilogue">Mögliche Reaktionen nach der Behandlung</h3>
              <p className="mb-4">
                Osteopathie ist in der Regel sehr gut verträglich. In den ersten 24-48 Stunden nach der Behandlung können jedoch milde Reaktionen auftreten:
              </p>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-slate-900 mb-3">Normale Reaktionen (kein Grund zur Sorge):</h4>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Leichter Muskelkater oder Schmerzen (wie nach Sport)</li>
                  <li>Müdigkeit und verstärktes Schlafbedürfnis</li>
                  <li>Verstärkter Harndrang oder Durst</li>
                  <li>Vorübergehende Verstärkung der Symptome (1-2 Tage)</li>
                  <li>Emotionale Reaktionen (Weinen, innere Unruhe)</li>
                </ul>
                <p className="mt-4 text-sm">
                  Diese Reaktionen zeigen, dass Ihr Körper auf die Behandlung anspricht und Selbstheilungsprozesse aktiviert wurden. Sie klingen meist nach 1-2 Tagen ab.
                </p>
              </div>

              <p className="mt-6">
                <strong>Wichtig:</strong> Osteopathie ersetzt keine notwendige medizinische oder psychiatrische Behandlung. Bei ernsthaften Erkrankungen arbeite ich eng mit Ihrem Hausarzt oder Facharzt zusammen. Im Zweifel überweise ich Sie zur weiteren Diagnostik an einen Arzt.
              </p>
            </div>
          </div>
        </section>
      

      {/* NEW: Kosten & Erstattung Section */}
      
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight font-epilogue mb-8">
              Kosten & Erstattung: Was kostet Osteopathie?
            </h2>
            <div className="space-y-6 text-slate-700 text-lg leading-normal">
              <p>
                Die Kosten für osteopathische Behandlungen sind nicht einheitlich geregelt und variieren je nach Praxisstandort, Behandlungsdauer und Qualifikation des Therapeuten.
              </p>

              <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-4 font-epilogue">Typische Kosten pro Sitzung</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="font-semibold text-slate-900 mb-2">Erstbehandlung (60 Min.):</p>
                    <p className="text-2xl font-bold text-slate-900">100-150 €</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 mb-2">Folgebehandlung (45-50 Min.):</p>
                    <p className="text-2xl font-bold text-slate-900">80-120 €</p>
                  </div>
                </div>
                <p className="text-sm mt-4">
                  Die Preise in Großstädten wie Hamburg liegen meist im oberen Bereich. Qualität und fundierte Ausbildung rechtfertigen die Kosten.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4 font-epilogue">Private Krankenversicherung</h3>
              <p>
                Private Krankenkassen und Beihilfe übernehmen in der Regel die <strong>vollständigen Kosten</strong> für osteopathische Behandlungen, wenn eine ärztliche Verordnung vorliegt. Die Erstattung erfolgt nach der Gebührenordnung für Heilpraktiker (GebüH).
              </p>

              <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4 font-epilogue">Gesetzliche Krankenversicherung</h3>
              <p className="mb-4">
                Viele gesetzliche Krankenkassen bezuschussen osteopathische Behandlungen mit <strong>30-60 Euro pro Sitzung</strong>, meist für 3-6 Sitzungen pro Jahr. Voraussetzung ist oft eine ärztliche Empfehlung oder Verordnung.
              </p>

              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                <h4 className="font-semibold text-slate-900 mb-3">Beispiele für erstattende Krankenkassen:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <ul className="space-y-2 list-disc list-inside text-sm">
                      <li><strong>TK (Techniker Krankenkasse):</strong> bis zu 120€/Jahr</li>
                      <li><strong>Barmer:</strong> bis zu 100€/Jahr</li>
                      <li><strong>DAK Gesundheit:</strong> bis zu 120€/Jahr</li>
                      <li><strong>AOK:</strong> Varies by region (meist 60-80€/Jahr)</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-2 list-disc list-inside text-sm">
                      <li><strong>IKK:</strong> bis zu 180€/Jahr</li>
                      <li><strong>KKH:</strong> bis zu 150€/Jahr</li>
                      <li><strong>BKK:</strong> Varies (meist 60-120€/Jahr)</li>
                      <li><strong>HEK:</strong> bis zu 180€/Jahr</li>
                    </ul>
                  </div>
                </div>
                <p className="text-sm mt-4">
                  <strong>Wichtig:</strong> Die Erstattungsmodalitäten ändern sich regelmäßig. Bitte informieren Sie sich vorab bei Ihrer Krankenkasse über die aktuellen Bedingungen.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4 font-epilogue">So erhalten Sie eine Erstattung</h3>
              <div className="space-y-3">
                <div className="flex gap-3 items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <p>Holen Sie eine ärztliche Empfehlung oder Verordnung für Osteopathie ein (meist vom Hausarzt)</p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <p>Vereinbaren Sie einen Termin bei einem qualifizierten Osteopathen (VFO, VOD oder BVO-zertifiziert)</p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <p>Bezahlen Sie die Behandlung zunächst selbst und erhalten Sie eine Rechnung</p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <p>Reichen Sie Rechnung und ärztliche Verordnung bei Ihrer Krankenkasse ein</p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
                  <p>Erhalten Sie den Zuschuss zurück (meist innerhalb von 2-4 Wochen)</p>
                </div>
              </div>

              <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                <p className="font-medium">
                  Detaillierte Informationen zu Kosten, Ablauf und Erstattung finden Sie auf meiner <Link href={linkPath("/kosten-ablauf/")} className="text-slate-800 hover:text-slate-900 underline font-semibold">Kosten & Ablauf</Link>-Seite.
                </p>
              </div>
            </div>
          </div>
        </section>
      

      {/* NEW: FAQ Section */}
      
        <section className="bg-slate-50 py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight font-epilogue mb-8 text-center">
              Häufig gestellte Fragen (FAQ)
            </h2>

            <div className="space-y-4">
              <details className="bg-white border-2 border-slate-200 rounded-xl p-6 group hover:border-slate-400 hover:shadow-lg transition-all duration-300">
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center gap-4">
                  <span className="flex items-center gap-3">
                    <span className="text-2xl">💶</span>
                    Was kostet eine osteopathische Behandlung?
                  </span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform duration-300 flex-shrink-0">▼</span>
                </summary>
                <p className="mt-4 text-slate-700 leading-normal pl-11">
                  Eine osteopathische Behandlung kostet in der Regel zwischen 80 und 150 Euro pro Sitzung. Die Kosten variieren je nach Behandlungsdauer (meist 45-60 Minuten) und Praxisstandort. Viele private Krankenversicherungen übernehmen die Kosten vollständig. Auch zahlreiche gesetzliche Krankenkassen wie TK, Barmer, DAK und AOK bezuschussen osteopathische Behandlungen mit 30-60 Euro pro Sitzung. Informieren Sie sich bei Ihrer Krankenkasse über die genauen Erstattungsmodalitäten.
                </p>
              </details>

              <details className="bg-white border-2 border-slate-200 rounded-xl p-6 group hover:border-slate-400 hover:shadow-lg transition-all duration-300">
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center gap-4">
                  <span className="flex items-center gap-3">
                    <span className="text-2xl">📋</span>
                    Wie läuft die erste Behandlung ab?
                  </span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform duration-300 flex-shrink-0">▼</span>
                </summary>
                <p className="mt-4 text-slate-700 leading-normal pl-11">
                  Die Erstbehandlung dauert etwa 60 Minuten und beginnt mit einer ausführlichen Anamnese: Ich erfrage Ihre aktuellen Beschwerden, Krankengeschichte, Lebensgewohnheiten und Erwartungen. Anschließend folgt eine körperliche Untersuchung, bei der ich Ihren gesamten Körper auf Blockaden, Spannungsmuster und Bewegungseinschränkungen untersuche. Danach beginnt die osteopathische Behandlung mit sanften manuellen Techniken. Am Ende besprechen wir die Befunde und erstellen einen individuellen Behandlungsplan.
                </p>
              </details>

              <details className="bg-white border-2 border-slate-200 rounded-xl p-6 group hover:border-slate-400 hover:shadow-lg transition-all duration-300">
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center gap-4">
                  <span className="flex items-center gap-3">
                    <span className="text-2xl">🔢</span>
                    Wie viele Behandlungen brauche ich?
                  </span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform duration-300 flex-shrink-0">▼</span>
                </summary>
                <p className="mt-4 text-slate-700 leading-normal pl-11">
                  Die Anzahl der Behandlungen hängt von Art und Dauer Ihrer Beschwerden ab. Bei akuten Problemen reichen oft 3-5 Sitzungen im Abstand von 1-2 Wochen. Bei chronischen Beschwerden sind meist 6-10 Behandlungen über mehrere Monate sinnvoll. Viele Patienten spüren bereits nach der ersten Sitzung eine Verbesserung. Die osteopathische Behandlung setzt Selbstheilungsprozesse in Gang, die Zeit brauchen. Ich bespreche mit Ihnen nach jeder Sitzung, wie viele weitere Behandlungen empfehlenswert sind.
                </p>
              </details>

              <details className="bg-white border-2 border-slate-200 rounded-xl p-6 group hover:border-slate-400 hover:shadow-lg transition-all duration-300">
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center gap-4">
                  <span className="flex items-center gap-3">
                    <span className="text-2xl">🏥</span>
                    Übernimmt die Krankenkasse die Kosten?
                  </span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform duration-300 flex-shrink-0">▼</span>
                </summary>
                <p className="mt-4 text-slate-700 leading-normal pl-11">
                  Private Krankenversicherungen übernehmen in der Regel die Kosten vollständig, wenn eine ärztliche Verordnung vorliegt. Viele gesetzliche Krankenkassen bezuschussen osteopathische Behandlungen mit 30-60 Euro pro Sitzung (meist 3-6 Sitzungen pro Jahr). Zu den erstattenden Kassen gehören unter anderem: TK (Techniker Krankenkasse), Barmer, DAK, AOK, IKK, KKH und BKK. Die genauen Konditionen variieren je nach Kasse. Bitte informieren Sie sich vorab bei Ihrer Krankenkasse über die Erstattungsmöglichkeiten und erforderlichen Unterlagen.
                </p>
              </details>

              <details className="bg-white border-2 border-slate-200 rounded-xl p-6 group hover:border-slate-400 hover:shadow-lg transition-all duration-300">
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center gap-4">
                  <span className="flex items-center gap-3">
                    <span className="text-2xl">🆚</span>
                    Was ist der Unterschied zwischen Osteopathie und Physiotherapie?
                  </span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform duration-300 flex-shrink-0">▼</span>
                </summary>
                <p className="mt-4 text-slate-700 leading-normal pl-11">
                  Osteopathie verfolgt einen ganzheitlichen Ansatz und sucht nach den Ursachen von Beschwerden im gesamten Körper, nicht nur am Ort des Symptoms. Die Behandlung erfolgt ausschließlich mit den Händen und dauert 45-60 Minuten. Physiotherapie ist oft symptomorientierter und fokussiert auf die betroffene Region. Sie arbeitet mit Übungen, Geräten und manuellen Techniken, Behandlungen dauern meist 15-30 Minuten. Beide Methoden können sich gut ergänzen.
                </p>
              </details>

              <details className="bg-white border-2 border-slate-200 rounded-xl p-6 group hover:border-slate-400 hover:shadow-lg transition-all duration-300">
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center gap-4">
                  <span className="flex items-center gap-3">
                    <span className="text-2xl">😖</span>
                    Tut osteopathische Behandlung weh?
                  </span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform duration-300 flex-shrink-0">▼</span>
                </summary>
                <p className="mt-4 text-slate-700 leading-normal pl-11">
                  Osteopathische Behandlungen sind in der Regel sanft und schmerzfrei. Ich arbeite mit gezieltem Druck und sanften Mobilisationstechniken. Bei manchen Techniken kann ein kurzer Dehnschmerz auftreten, der jedoch nicht unangenehm ist. Nach der Behandlung kann es zu einem leichten Muskelkater kommen – ein Zeichen, dass der Körper auf die Behandlung reagiert. Bei akuten Entzündungen oder starken Schmerzen passe ich die Behandlung entsprechend an. Die meisten Patienten empfinden die Behandlung als sehr entspannend.
                </p>
              </details>

              <details className="bg-white border-2 border-slate-200 rounded-xl p-6 group hover:border-slate-400 hover:shadow-lg transition-all duration-300">
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center gap-4">
                  <span className="flex items-center gap-3">
                    <span className="text-2xl">🔍</span>
                    Wie finde ich einen guten Osteopathen?
                  </span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform duration-300 flex-shrink-0">▼</span>
                </summary>
                <p className="mt-4 text-slate-700 leading-normal pl-11">
                  Achten Sie auf eine fundierte Ausbildung: Ein guter Osteopath hat eine 4-5-jährige berufsbegleitende Ausbildung absolviert (mindestens 1350 Unterrichtsstunden) und ist bei einem Berufsverband registriert (z.B. VFO, VOD, BVO). Diese Verbände garantieren hohe Ausbildungsstandards. Prüfen Sie, ob der Osteopath eine Heilpraktiker-Zulassung oder ärztliche Approbation hat – nur dann darf er eigenständig behandeln. Empfehlungen von Freunden oder Ärzten sowie Online-Bewertungen können bei der Suche helfen.
                </p>
              </details>

              <details className="bg-white border-2 border-slate-200 rounded-xl p-6 group hover:border-slate-400 hover:shadow-lg transition-all duration-300">
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center gap-4">
                  <span className="flex items-center gap-3">
                    <span className="text-2xl">⚠️</span>
                    Kann Osteopathie Nebenwirkungen haben?
                  </span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform duration-300 flex-shrink-0">▼</span>
                </summary>
                <p className="mt-4 text-slate-700 leading-normal pl-11">
                  Osteopathie ist bei fachgerechter Anwendung sehr sicher. In den ersten 24-48 Stunden nach der Behandlung kann es zu milden Reaktionen kommen: leichter Muskelkater, Müdigkeit, verstärkter Harndrang oder Durst, vorübergehende Verstärkung der Symptome. Diese Reaktionen sind normal und zeigen, dass der Körper auf die Behandlung reagiert. Sie klingen meist nach 1-2 Tagen ab. Ernsthafte Nebenwirkungen sind extrem selten. Bei bestimmten Kontraindikationen (akute Infektionen, Knochenbrüche, Tumore, schwere Osteoporose) sollte nicht osteopathisch behandelt werden.
                </p>
              </details>

              <details className="bg-white border-2 border-slate-200 rounded-xl p-6 group hover:border-slate-400 hover:shadow-lg transition-all duration-300">
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center gap-4">
                  <span className="flex items-center gap-3">
                    <span className="text-2xl">📚</span>
                    Ist Osteopathie wissenschaftlich anerkannt?
                  </span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform duration-300 flex-shrink-0">▼</span>
                </summary>
                <p className="mt-4 text-slate-700 leading-normal pl-11">
                  Ja, Osteopathie wird zunehmend wissenschaftlich erforscht und anerkannt. Die WHO (Weltgesundheitsorganisation) erkennt Osteopathie als eigenständige Heilmethode an. Zahlreiche Studien belegen die Wirksamkeit bei Rückenschmerzen, Nackenbeschwerden, Kopfschmerzen und muskuloskelettalen Beschwerden. Auch die Kostenübernahme durch viele Krankenkassen ist ein deutliches Zeichen der Anerkennung. Die Forschung zu osteopathischen Wirkmechanismen entwickelt sich stetig weiter. In einigen Ländern (USA, Großbritannien) ist Osteopathie bereits vollständig im Gesundheitssystem integriert.
                </p>
              </details>

              <details className="bg-white border-2 border-slate-200 rounded-xl p-6 group hover:border-slate-400 hover:shadow-lg transition-all duration-300">
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center gap-4">
                  <span className="flex items-center gap-3">
                    <span className="text-2xl">🧬</span>
                    Was sind Faszien und warum sind sie wichtig?
                  </span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform duration-300 flex-shrink-0">▼</span>
                </summary>
                <p className="mt-4 text-slate-700 leading-normal pl-11">
                  Faszien sind kollagenhaltige Bindegewebsstrukturen, die alle Körperstrukturen – Muskeln, Organe, Knochen, Nerven – umhüllen und miteinander verbinden. Sie bilden ein dreidimensionales Netzwerk im gesamten Körper. Faszien übertragen Kräfte, ermöglichen Bewegung und dienen der Kommunikation zwischen Körperstrukturen. Bei Stress, Fehlhaltung oder Verletzungen können Faszien verkleben oder verhärten, was zu Bewegungseinschränkungen und Schmerzen führt. In der Osteopathie spielen Faszien eine zentrale Rolle, da Spannungen im Fasziensystem oft die Ursache für Beschwerden fernab der schmerzenden Stelle sind.
                </p>
              </details>
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
                  href={linkPath("/terminbuchung/")}
                  className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold text-slate-900 bg-white rounded-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1"
                >
                  <span className="relative z-10">Termin buchen</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-200/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </Link>
                <Link
                  href={linkPath("/behandlungen/")}
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
                href={linkPath("/kosten-ablauf/")}
                className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-900 hover:shadow-lg transition-all duration-300"
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
                href={linkPath("/faq/")}
                className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-900 hover:shadow-lg transition-all duration-300"
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
                href={linkPath("/ueber-mich/")}
                className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-900 hover:shadow-lg transition-all duration-300"
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
