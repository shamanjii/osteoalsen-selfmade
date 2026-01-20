import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSchema from "@/components/FAQSchema";
import { linkPath } from "@/lib/basePath";

export const metadata: Metadata = {
  title: "FAQ | Osteopathie Hamburg - Joshua Alsen",
  description:
    "FAQ zur Osteopathie in Hamburg ✓ Ablauf, Kosten, Kassenerstattung ✓ VFO-zertifiziert ✓ Termine binnen 48h ⭐ Jetzt buchen!",
  keywords: [
    "Osteopathie FAQ",
    "Osteopathie Fragen Hamburg",
    "Was ist Osteopathie",
    "Osteopath Kosten",
    "Osteopathie Ablauf",
  ],
  alternates: { canonical: "/faq/" },
  openGraph: {
    title: "Häufige Fragen (FAQ) | Osteopathie Hamburg",
    description:
      "Antworten auf häufige Fragen zur Osteopathie: Behandlungsablauf, Kosten, Kassenerstattung und mehr.",
    url: "/faq",
    siteName: "Osteopathie Hamburg - Joshua Alsen",
    images: [
      {
        url: "/assets/joshua-alsen-osteopath-hamburg-og.webp",
        width: 1200,
        height: 630,
        alt: "FAQ - Osteopathie Hamburg",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Häufige Fragen (FAQ) | Osteopathie Hamburg",
    description:
      "Antworten auf häufige Fragen zur Osteopathie in Hamburg.",
    images: ["/assets/joshua-alsen-osteopath-hamburg-twitter.webp"],
  },
};

const faqData = [
  {
    category: "Kosten & Erstattung",
    questions: [
      {
        question: "Was kostet eine osteopathische Behandlung?",
        answer:
          "Eine osteopathische Behandlung kostet 150€ und dauert 45-60 Minuten. Der Preis gilt sowohl für Erst- als auch Folgebehandlungen. Sie erhalten direkt nach der Behandlung eine detaillierte Rechnung, die Sie bei Ihrer Krankenkasse zur Erstattung einreichen können.",
      },
      {
        question: "Übernimmt meine Krankenkasse die Kosten?",
        answer:
          "Die Kostenerstattung hängt von Ihrer Krankenkasse ab:\n\n**Private Krankenkassen:** Die meisten privaten Krankenversicherungen übernehmen die vollen Kosten für osteopathische Behandlungen, wenn Sie bei einem qualifizierten Osteopathen (z.B. VFO-zertifiziert) behandelt werden. Prüfen Sie vorab Ihren Versicherungsvertrag oder fragen Sie bei Ihrer Versicherung nach.\n\n**Gesetzliche Krankenkassen:** Viele gesetzliche Krankenkassen beteiligen sich mittlerweile an den Kosten für Osteopathie mit einem Zuschuss von 40-60€ pro Sitzung (meist 3-6 Sitzungen pro Jahr). Beispiele für Kassen mit Erstattung: Techniker Krankenkasse (TK), DAK-Gesundheit, Barmer, verschiedene AOKs (regional unterschiedlich), IKK-Kassen und viele BKK-Kassen.\n\nBei gesetzlichen Kassen ist oft eine ärztliche Verordnung, Empfehlung oder Privatrezept erforderlich. Diese können Sie sich von Ihrem Hausarzt oder Facharzt ausstellen lassen. Wichtig: Die Erstattungsmodalitäten können sich ändern - informieren Sie sich daher bitte vorab bei Ihrer Kasse über die aktuellen Konditionen.\n\nSie erhalten von mir nach jeder Behandlung eine detaillierte Rechnung nach dem Gebührenverzeichnis für Heilpraktiker (GebüH), die Sie bei Ihrer Kasse einreichen können. <a href='/kosten-ablauf' className='text-teal-600 hover:text-teal-700 underline'>Mehr Informationen zu Kosten & Ablauf</a>.",
      },
      {
        question: "Wie reiche ich die Rechnung bei meiner Krankenkasse ein?",
        answer:
          "Nach der Behandlung erhalten Sie eine detaillierte Rechnung nach dem Gebührenverzeichnis für Heilpraktiker (GebüH). Diese können Sie direkt bei Ihrer Krankenkasse einreichen - entweder per Post, E-Mail oder über das Online-Portal Ihrer Kasse (z.B. TK-App, AOK-App).\n\n**Schritt-für-Schritt:**\n1. Rechnung von mir erhalten (per E-Mail oder ausgedruckt)\n2. Bei gesetzlichen Kassen: Ärztliche Empfehlung/Verordnung beilegen (falls erforderlich)\n3. Formular Ihrer Kasse ausfüllen (falls vorhanden) oder Rechnung direkt einreichen\n4. Erstattung erfolgt meist innerhalb von 2-4 Wochen auf Ihr Konto\n\nDie meisten Kassen erstatten 40-60€ pro Sitzung, maximal 3-6 Sitzungen pro Jahr. Prüfen Sie vorab die Konditionen Ihrer Kasse.",
      },
      {
        question: "Brauche ich eine Überweisung vom Arzt?",
        answer:
          "Nein, eine Überweisung ist nicht zwingend erforderlich. Sie können direkt einen Termin bei mir buchen. Für die Kostenerstattung bei gesetzlichen Krankenkassen ist jedoch oft eine ärztliche Verordnung oder Empfehlung notwendig. Diese können Sie sich von Ihrem Hausarzt oder Facharzt ausstellen lassen.",
      },
      {
        question: "Welche Zahlungsmethoden werden akzeptiert?",
        answer:
          "Sie können bar oder per EC-Karte (Girocard/Maestro/V-Pay) bezahlen. Die Zahlung erfolgt direkt nach der Behandlung. Kreditkartenzahlung ist derzeit nicht möglich.",
      },
    ],
  },
  {
    category: "Terminbuchung & Organisation",
    questions: [
      {
        question: "Wie kann ich einen Termin buchen?",
        answer:
          "Sie können ganz einfach <a href='/terminbuchung' className='text-teal-600 hover:text-teal-700 underline'>online über das Buchungsformular</a> auf meiner Website einen Termin vereinbaren. Alternativ können Sie mich auch telefonisch unter <a href='tel:+4917643990001' className='text-teal-600 hover:text-teal-700 underline'>0176 4399 0001</a> erreichen. Online-Buchungen sind rund um die Uhr möglich und Sie erhalten sofort eine Bestätigung.",
      },
      {
        question: "Wie lange muss ich auf einen Termin warten?",
        answer:
          "Die Wartezeit variiert je nach Auslastung. In der Regel können Sie innerhalb von 1-2 Wochen einen Termin bekommen. Bei akuten Beschwerden versuche ich, Ihnen zeitnah einen Termin anzubieten. Bei dringenden Fällen rufen Sie mich bitte direkt an unter 0176 4399 0001.",
      },
      {
        question: "Kann ich einen Termin absagen oder verschieben?",
        answer:
          "Ja, Sie können Termine bis 24 Stunden vor dem Termin kostenfrei absagen oder verschieben. Bei kurzfristigeren Absagen (weniger als 24h) oder Nichterscheinen wird die volle Behandlungsgebühr berechnet, da ich den Termin nicht mehr anderweitig vergeben kann. Bitte haben Sie Verständnis für diese Regelung.",
      },
      {
        question: "Wo finden die Behandlungen statt?",
        answer:
          "Ich behandle in meiner Praxis in Hamburg-Rotherbaum, Rappstraße 7, 20146 Hamburg. Die Praxis ist gut mit öffentlichen Verkehrsmitteln (U-Bahn Hallerstraße, diverse Buslinien) und dem Auto erreichbar. Parkmöglichkeiten finden Sie in der Umgebung.",
      },
    ],
  },
  {
    category: "Behandlungsablauf",
    questions: [
      {
        question: "Wie läuft die erste Behandlung ab?",
        answer:
          "Die Erstbehandlung dauert 60 Minuten und gliedert sich in drei Teile:\n\n**1. Anamnesegespräch (15-20 Min.):** Wir besprechen Ihre aktuellen Beschwerden, Krankengeschichte und Lebensumstände. Ich möchte verstehen, wann die Beschwerden auftreten, was sie verschlimmert oder verbessert, und ob es Vorerkrankungen, Operationen oder Unfälle gab.\n\n**2. Körperliche Untersuchung (10-15 Min.):** Ich untersuche Ihren gesamten Körper auf Bewegungseinschränkungen und Spannungen - nicht nur dort, wo es schmerzt. Dies geschieht in Unterwäsche oder bequemer Kleidung.\n\n**3. Osteopathische Behandlung (25-30 Min.):** Mit sanften manuellen Techniken aus der parietalen (Bewegungsapparat), viszeralen (Organe) und kraniosacralen Osteopathie behandle ich die gefundenen Funktionsstörungen.\n\nZum Abschluss besprechen wir den Befund und das weitere Vorgehen: Wie viele Behandlungen voraussichtlich nötig sind, welche Übungen Sie zu Hause machen können und worauf Sie achten sollten. <a href='/kosten-ablauf' className='text-teal-600 hover:text-teal-700 underline'>Mehr Details zu Kosten & Ablauf</a>.",
      },
      {
        question: "Wie viele Behandlungen sind nötig?",
        answer:
          "Das ist sehr individuell und hängt von der Art und Dauer Ihrer Beschwerden ab. Bei akuten Beschwerden reichen oft 2-3 Sitzungen. Chronische Beschwerden können 4-6 oder mehr Behandlungen erfordern. Nach der ersten Sitzung kann ich Ihnen eine genauere Einschätzung geben. Die Behandlungen finden meist im Abstand von 1-3 Wochen statt.",
      },
      {
        question: "Ist eine osteopathische Behandlung schmerzhaft?",
        answer:
          "Nein, osteopathische Behandlungen sind in der Regel nicht schmerzhaft. Die meisten Techniken sind sehr sanft und werden als angenehm empfunden. Bei der Behandlung von stark verspannten oder schmerzhaften Bereichen kann es kurzzeitig zu einem intensiveren Gefühl kommen, das aber nicht über ein 'Wohlfühl-Weh' hinausgeht. Kommunizieren Sie während der Behandlung, wenn etwas unangenehm ist - ich passe die Techniken dann entsprechend an.",
      },
      {
        question: "Was soll ich zur Behandlung anziehen?",
        answer:
          "Bitte tragen Sie bequeme Kleidung, in der Sie sich gut bewegen können (z.B. Leggings/Jogginghose und T-Shirt). Die Behandlung findet in Unterwäsche oder bequemer Kleidung statt - je nachdem, womit Sie sich wohler fühlen. Wichtig ist, dass ich Ihre Körperhaltung und Bewegungsmuster gut beurteilen kann.",
      },
      {
        question: "Was passiert nach der Behandlung?",
        answer:
          "Nach der Behandlung kann es zu verschiedenen Reaktionen kommen: Manche fühlen sich sofort besser und entspannter, andere spüren zunächst eine leichte Müdigkeit oder muskelkaterähnliche Beschwerden. Das ist normal und zeigt, dass der Körper auf die Behandlung reagiert. Diese Reaktionen klingen meist nach 1-2 Tagen ab. Ich empfehle, nach der Behandlung viel zu trinken und körperlich nicht zu viel zu machen.",
      },
      {
        question: "Kann ich nach der Behandlung Sport machen oder Auto fahren?",
        answer:
          "Auto fahren ist nach der Behandlung kein Problem. Bei Sport empfehle ich, am Tag der Behandlung auf intensive Belastung zu verzichten und dem Körper Zeit zur Regeneration zu geben. Leichte Bewegung wie Spazierengehen ist sogar gut. Ab dem nächsten Tag können Sie in der Regel wieder normal trainieren - je nachdem, wie Ihr Körper reagiert hat.",
      },
    ],
  },
  {
    category: "Spezifische Beschwerden",
    questions: [
      {
        question: "Kann Osteopathie bei Rückenschmerzen helfen?",
        answer:
          "Ja, Osteopathie ist sehr effektiv bei Rückenschmerzen und gehört zu den häufigsten Behandlungsgründen in meiner Praxis. Ich behandle nicht nur die schmerzende Stelle, sondern suche nach den tatsächlichen Ursachen im gesamten Körper.\n\nBei akuten Rückenschmerzen (Hexenschuss, ISG-Blockade) kann oft schon nach 1-3 Behandlungen eine deutliche Besserung eintreten. Bei chronischen Beschwerden arbeite ich mit 4-6 Sitzungen.\n\nHäufige Rückenprobleme, die ich behandle: Bandscheibenvorfälle, ISG-Blockaden, Hexenschuss, chronische Verspannungen, Skoliose-Beschwerden und Facettensyndrom.\n\n<a href='/behandlungen/rueckenschmerzen' className='text-teal-600 hover:text-teal-700 underline'>→ Mehr Details und Praxisbeispiele: Rückenschmerzen-Behandlungsseite</a> | <a href='/blog/rueckenschmerzen-bandscheibenvorfall' className='text-teal-600 hover:text-teal-700 underline'>Blog: Bandscheibenvorfall behandeln</a>",
      },
      {
        question: "Hilft Osteopathie bei Kopfschmerzen und Migräne?",
        answer:
          "Ja, Osteopathie kann bei verschiedenen Arten von Kopfschmerzen sehr hilfreich sein:\n\n**Spannungskopfschmerzen:** Entstehen oft durch Verspannungen im Nacken und Schultern. Durch manuelle Techniken löse ich diese Spannungen.\n\n**Migräne:** Mit craniosacralen Techniken am Schädel und der HWS kann ich die Häufigkeit und Intensität von Migräneattacken reduzieren. Besonders bei Migräne mit Aura sehe ich gute Erfolge.\n\n**CMD (Kiefergelenksprobleme):** Die Behandlung des Kiefers kann Kopfschmerzen, Gesichtsschmerzen und Tinnitus deutlich lindern.\n\n**Zervikogene Kopfschmerzen:** Diese gehen von der HWS aus. Durch Mobilisation der Halswirbelsäule lassen sich diese oft gut behandeln.\n\nWichtig: Bei neu auftretenden, sehr starken Kopfschmerzen sollten Sie zunächst ärztlich abklären lassen, dass keine ernsthafte Erkrankung vorliegt.\n\n<a href='/behandlungen/kopfschmerzen-migraene' className='text-teal-600 hover:text-teal-700 underline'>→ Detaillierte Infos: Kopfschmerzen & Migräne</a> | <a href='/blog/kopfschmerzen-trigeminus-ursache' className='text-teal-600 hover:text-teal-700 underline'>Blog: Trigeminusnerv & Kopfschmerzen</a>",
      },
      {
        question: "Kann Osteopathie bei Verdauungsbeschwerden helfen?",
        answer:
          "Ja, viszerale (organorientierte) Osteopathie ist sehr wirksam bei funktionellen Verdauungsbeschwerden. Ich behandle häufig: Reizdarm (IBS), chronische Verstopfung, Blähungen, Reflux/Sodbrennen und Narben/Verwachsungen nach Bauchoperationen.\n\nDurch sanfte manuelle Techniken am Bauchraum löse ich Spannungen, verbessere die Durchblutung der Organe und unterstütze deren natürliche Beweglichkeit. Viele Patienten berichten von deutlicher Besserung - oft schon nach 2-4 Behandlungen.\n\nWichtig: Bei akuten Bauchschmerzen, Blut im Stuhl oder unerklärlichem Gewichtsverlust sollten Sie zunächst ärztlich abklären lassen.\n\n<a href='/behandlungen/verdauungsbeschwerden' className='text-teal-600 hover:text-teal-700 underline'>→ Mehr Details: Verdauungsbeschwerden-Seite</a> | <a href='/blog/reizdarm-rueckenschmerzen-darm-ruecken-zusammenhang' className='text-teal-600 hover:text-teal-700 underline'>Blog: Reizdarm & Rückenschmerzen</a>",
      },
      {
        question: "Behandeln Sie auch Schwangere?",
        answer:
          "Ja, ich begleite gerne Schwangere osteopathisch. Die Behandlung ist sehr sanft und sicher und kann bei typischen Schwangerschaftsbeschwerden wie Rückenschmerzen, ISG-Blockaden, Symphysenschmerzen oder Sodbrennen helfen. Auch zur Geburtsvorbereitung und nach der Geburt (Rückbildung, Beckenboden, Narbennachsorge) ist Osteopathie sehr sinnvoll. Ab dem 2. Trimester kann behandelt werden.",
      },
      {
        question: "Behandeln Sie auch Kinder und Babys?",
        answer:
          "Ich behandle Kinder ab etwa 6 Jahren mit angepassten, sehr sanften Techniken. Für Säuglinge und Kleinkinder (0-5 Jahre) empfehle ich spezialisierte Kinderosteopathen, da diese Altersgruppe besondere Ausbildung und Techniken erfordert. Gerne empfehle ich Ihnen entsprechende Kollegen in Hamburg, die auf pädiatrische Osteopathie spezialisiert sind.",
      },
    ],
  },
  {
    category: "Allgemeine Fragen zur Osteopathie",
    questions: [
      {
        question: "Was ist Osteopathie?",
        answer:
          "Osteopathie ist eine ganzheitliche manuelle Medizin, die den Körper als Einheit betrachtet. Sie basiert auf dem Prinzip, dass der Körper zur Selbstheilung fähig ist, wenn alle Strukturen frei beweglich und gut durchblutet sind.\n\nDie Osteopathie umfasst drei große Bereiche: Die parietale Osteopathie behandelt den Bewegungsapparat (Knochen, Muskeln, Gelenke), die viszerale Osteopathie konzentriert sich auf die inneren Organe und ihre Aufhängungen, und die kraniosakrale Osteopathie arbeitet am Schädel, der Wirbelsäule und dem Nervensystem.\n\nAls VFO-zertifizierter Osteopath habe ich eine 5-jährige berufsbegleitende Ausbildung absolviert und arbeite ausschließlich manuell. Ich suche nicht nur nach dem Ort des Schmerzes, sondern nach den Ursachen im gesamten Körper.\n\n<a href='/was-ist-osteopathie' className='text-teal-600 hover:text-teal-700 underline'>→ Mehr erfahren: Was ist Osteopathie?</a>",
      },
      {
        question: "Für wen ist Osteopathie geeignet?",
        answer:
          "Osteopathie ist grundsätzlich für jeden geeignet - von Kindern über Erwachsene bis zu Senioren. Die Techniken werden individuell an Alter, Konstitution und Beschwerdebild angepasst. Besonders hilfreich ist Osteopathie bei Rückenschmerzen, Kopfschmerzen, Verdauungsbeschwerden, Sportverletzungen und vielen weiteren Beschwerden. <a href='/behandlungen' className='text-teal-600 hover:text-teal-700 underline'>Alle Behandlungsschwerpunkte ansehen</a>.",
      },
      {
        question: "Was ist der Unterschied zwischen Osteopathie und Physiotherapie?",
        answer:
          "Während Physiotherapie oft symptomorientiert arbeitet und häufig Geräte oder Übungen einsetzt, arbeitet die Osteopathie ausschließlich manuell und ganzheitlich. Osteopathen suchen nach den Ursachen der Beschwerden im gesamten Körper und behandeln nicht nur die schmerzende Stelle. Eine osteopathische Behandlung dauert 45-60 Minuten und umfasst eine umfassende Untersuchung und Behandlung.",
      },
      {
        question: "Was ist der Unterschied zwischen Osteopathie und Chiropraktik?",
        answer:
          "Beide arbeiten manuell, aber mit unterschiedlichen Ansätzen: Chiropraktiker konzentrieren sich hauptsächlich auf die Wirbelsäule und Gelenke und arbeiten oft mit schnellen, impulsartigen Manipulationen (das 'Knacken'). Osteopathen arbeiten ganzheitlicher und sanfter. Ich behandle nicht nur Gelenke, sondern auch Organe, Gewebe und das Nervensystem mit weichen, fließenden Techniken. Der Fokus liegt auf dem Verständnis des Körpers als Gesamtsystem.",
      },
      {
        question: "Ist Osteopathie wissenschaftlich anerkannt?",
        answer:
          "Ja, es gibt zunehmend wissenschaftliche Studien zur Wirksamkeit der Osteopathie, besonders bei Rückenschmerzen, Kopfschmerzen und muskuloskelettalen Beschwerden. Viele Krankenkassen erkennen die Osteopathie an und erstatten die Behandlungskosten teilweise oder vollständig. Osteopathie wird auch von der WHO (Weltgesundheitsorganisation) als eigenständige Behandlungsmethode anerkannt.",
      },
      {
        question: "Wann sollte ich NICHT zur Osteopathie gehen?",
        answer:
          "Osteopathie hat klare Grenzen: Bei akuten Infektionen mit Fieber, frischen Knochenbrüchen, akuten Bandscheibenvorfällen mit neurologischen Ausfällen (Taubheit, Lähmungen), Tumoren oder schwerer Osteoporose sollten Sie zunächst ärztlich abklären lassen. Osteopathie ersetzt keine medizinische Notfallversorgung. Bei Unsicherheit sprechen Sie mich gerne an - ich berate Sie ehrlich, ob Osteopathie in Ihrem Fall sinnvoll ist oder ob eine ärztliche Abklärung Vorrang hat.",
      },
      {
        question: "Wie kann ich Ihre Qualifikationen überprüfen?",
        answer:
          "Ich bin VFO-zertifizierter Osteopath (Verband Freier Osteopathen) mit 5-jähriger berufsbegleitender Ausbildung und B.Sc. Osteopathie. Sie können meine Qualifikation im <a href='https://www.vfo.de/praktikersuche' target='_blank' rel='noopener noreferrer' className='text-teal-600 hover:text-teal-700 underline'>VFO-Verzeichnis</a> überprüfen. Mehr zu meiner Ausbildung und Philosophie finden Sie auf meiner <a href='/ueber-mich' className='text-teal-600 hover:text-teal-700 underline'>Über-mich-Seite</a>.",
      },
    ],
  },
];

export default function FAQPage() {
  // Flatten all questions for schema
  const allQuestions = faqData.flatMap((category) =>
    category.questions.map((q) => ({
      question: q.question,
      answer: q.answer,
    }))
  );

  return (
    <>
      <FAQSchema faqs={allQuestions} />
      <Breadcrumbs items={[{ label: "FAQ" }]} />

      {/* Hero Section */}
      <section className="bg-white pt-8 pb-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 lg:px-12 text-center">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-epilogue text-slate-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-light leading-tight mb-6">
              Häufig gestellte Fragen
            </h1>
            <p className="text-slate-600 text-lg sm:text-xl md:text-2xl font-light leading-relaxed">
              Antworten auf die wichtigsten Fragen rund um Osteopathie,
              Behandlungsablauf, Kosten und Terminbuchung
            </p>
          </div>
        </div>
      </section>

      {/* Categories Navigation */}
      <section className="bg-slate-50 py-8 sticky top-0 z-10 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {faqData.map((category, idx) => (
              <a
                key={idx}
                href={`#category-${idx}`}
                className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-colors text-sm font-medium"
              >
                {category.category}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="space-y-16">
            {faqData.map((category, categoryIdx) => (
              <div key={categoryIdx} id={`category-${categoryIdx}`}>
                <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight mb-8 font-epilogue">
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((item, questionIdx) => (
                    <details
                      key={questionIdx}
                      className="bg-white border border-slate-200 rounded-lg p-6 group hover:border-slate-300 transition-colors"
                    >
                      <summary className="text-lg font-semibold text-slate-900 cursor-pointer list-none font-epilogue flex items-start justify-between">
                        <span className="pr-4">{item.question}</span>
                        <span className="shrink-0 group-open:rotate-180 transition-transform">
                          ▼
                        </span>
                      </summary>
                      <div
                        className="mt-4 text-slate-700 leading-relaxed prose prose-slate max-w-none prose-a:text-teal-600 prose-a:no-underline hover:prose-a:text-teal-700 hover:prose-a:underline"
                        dangerouslySetInnerHTML={{ __html: item.answer }}
                      />
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still have questions */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight mb-6 font-epilogue">
            Ihre Frage war nicht dabei?
          </h2>
          <p className="text-xl text-slate-600 font-light mb-8 leading-relaxed">
            Kein Problem! Kontaktieren Sie mich gerne direkt - ich beantworte
            Ihre Fragen gerne persönlich.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+4917643990001"
              className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold bg-slate-900 text-white rounded-md transition-all duration-300 hover:bg-slate-800 hover:transform hover:-translate-y-1"
            >
              📞 0176 4399 0001
            </a>
            <a
              href="mailto:joshua@alsen.info"
              className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold border-2 border-slate-900 text-slate-900 rounded-md transition-all duration-300 hover:bg-slate-900 hover:text-white hover:transform hover:-translate-y-1"
            >
              ✉️ E-Mail schreiben
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-50 py-16 sm:py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 sm:p-12 text-center text-white shadow-xl">
            <h2 className="text-3xl sm:text-4xl font-light mb-4 font-epilogue tracking-tight">
              Bereit für Ihre erste Behandlung?
            </h2>
            <p className="text-xl mb-8 text-slate-200 font-light">
              Vereinbaren Sie jetzt einen Termin in meiner Praxis in
              Hamburg-Rotherbaum.
            </p>
            <Link
              href={linkPath("/terminbuchung/")}
              className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold text-slate-900 bg-white rounded-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1"
            >
              <span className="relative z-10">📅 Jetzt Termin buchen</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-200/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* Helpful Links */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight text-center mb-8 font-epilogue">
            Das könnte Sie auch interessieren
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href={linkPath("/behandlungen/")}
              className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-900 transition-colors"
            >
              <div className="text-3xl mb-3">🦴</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                Behandlungsschwerpunkte
              </h3>
              <p className="text-slate-600">
                Alle Behandlungen im Überblick: Rückenschmerzen, Kopfschmerzen,
                Verdauung und mehr.
              </p>
            </Link>

            <Link
              href={linkPath("/kosten-ablauf/")}
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
              href={linkPath("/ueber-mich/")}
              className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-900 transition-colors"
            >
              <div className="text-3xl mb-3">👨‍⚕️</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                Über mich
              </h3>
              <p className="text-slate-600">
                Erfahren Sie mehr über mich, meine Ausbildung und meine
                Philosophie.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
