import { Metadata } from 'next';
import TreatmentHero from '../components/TreatmentHero';
import TreatmentCTA from '../components/TreatmentCTA';
import Breadcrumbs from '@/components/Breadcrumbs';
import MedicalConditionSchema from '@/components/MedicalConditionSchema';
import FAQSchema from '@/components/FAQSchema';
import FadeInSection from '@/components/FadeInSection';
import StickyBookingButton from '@/components/StickyBookingButton';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Arthrose & Gelenkbeschwerden Hamburg | Osteopathie bei Gelenkschmerzen',
  description: 'Osteopathische Behandlung bei Arthrose, Hüftschmerzen, Knieschmerzen und Gelenkbeschwerden in Hamburg. Ganzheitlicher Ansatz für mehr Beweglichkeit.',
  keywords: [
    'Arthrose Osteopathie Hamburg',
    'Knieschmerzen Osteopath',
    'Hüftarthrose Behandlung',
    'Gelenkschmerzen Hamburg',
    'Gonarthrose Behandlung',
    'Coxarthrose Osteopathie',
    'Gelenkbeschwerden Hamburg',
    'Osteopath Arthrose Hamburg'
  ],
  alternates: {
    canonical: '/behandlungen/arthrose-gelenkbeschwerden'
  },
  openGraph: {
    title: 'Arthrose & Gelenkbeschwerden Hamburg | Osteopathie bei Gelenkschmerzen',
    description: 'Osteopathische Behandlung bei Arthrose, Hüftschmerzen, Knieschmerzen und Gelenkbeschwerden in Hamburg. Ganzheitlicher Ansatz für mehr Beweglichkeit.',
    url: '/behandlungen/arthrose-gelenkbeschwerden',
    type: 'website'
  }
};

const faqItems = [
  {
    question: 'Kann Osteopathie bei Arthrose helfen?',
    answer: 'Ja, Osteopathie kann bei Arthrose deutlich helfen, auch wenn sie den Knorpelverschleiß nicht rückgängig machen kann. Studien zeigen, dass manuelle Therapie und osteopathische Behandlungen Schmerzen reduzieren, die Beweglichkeit verbessern und die Lebensqualität steigern können. Der ganzheitliche Ansatz behandelt nicht nur das betroffene Gelenk, sondern optimiert die gesamte Körperstatik und Biomechanik, um Kompensationsmuster zu reduzieren und die Progression zu verlangsamen.'
  },
  {
    question: 'Welche Gelenke können osteopathisch behandelt werden?',
    answer: 'Grundsätzlich können alle Gelenke behandelt werden: Kniearthrose (Gonarthrose), Hüftarthrose (Coxarthrose), Schulterarthrose (Omarthrose), Hand- und Fingerarthrose (Rhizarthrose, Heberden-/Bouchard-Arthrose), Wirbelsäulenarthrose (Spondylarthrose, Facettengelenkarthrose), Sprunggelenk- und Fußarthrose. Die Behandlung wird individuell an das betroffene Gelenk und den Schweregrad der Arthrose angepasst.'
  },
  {
    question: 'Ist die osteopathische Behandlung schmerzhaft bei Arthrose?',
    answer: 'Nein, die Behandlung sollte nicht schmerzhaft sein. Bei akuten Entzündungsschüben (aktivierte Arthrose) arbeite ich besonders sanft und nutze indirekte Techniken. Die meisten Patienten empfinden die Behandlung als angenehm und entspannend. Wichtig ist die Kommunikation während der Sitzung – Sie können jederzeit Rückmeldung geben, wenn etwas unangenehm ist, damit ich die Intensität anpassen kann.'
  },
  {
    question: 'Wie viele Behandlungen sind bei Arthrose notwendig?',
    answer: 'Das ist sehr individuell und hängt vom Schweregrad der Arthrose, der Dauer der Beschwerden und begleitenden Faktoren ab. Typischerweise empfehle ich zunächst 4-6 Sitzungen im Abstand von 1-2 Wochen. Viele Patienten berichten bereits nach 2-3 Behandlungen von deutlicher Verbesserung. Bei chronischer Arthrose kann eine langfristige Begleitung mit Sitzungen alle 4-8 Wochen sinnvoll sein, um die Beschwerden dauerhaft unter Kontrolle zu halten.'
  },
  {
    question: 'Was ist der Unterschied zwischen Osteopathie und Physiotherapie bei Arthrose?',
    answer: 'Beide Ansätze können sich hervorragend ergänzen. Physiotherapie konzentriert sich vor allem auf gezieltes Training, Kräftigung der gelenkstabilisierenden Muskulatur und Bewegungstherapie. Osteopathie behandelt ganzheitlicher: Ich schaue auf den gesamten Körper, behandle Faszien, Organe, das Nervensystem und die Biomechanik, um die Ursachen von Fehlbelastungen zu finden. Idealerweise kombinieren Sie beides – osteopathische Behandlung zur Optimierung der Körperstruktur und physiotherapeutisches Training für langfristige Stabilität.'
  },
  {
    question: 'Kann Arthrose durch Osteopathie geheilt werden?',
    answer: 'Nein, Arthrose ist nicht heilbar – weder durch Osteopathie noch durch andere Methoden. Der Knorpelverschleiß lässt sich nicht rückgängig machen. Allerdings kann Osteopathie die Symptome deutlich lindern, die Progression verlangsamen und Ihre Lebensqualität erheblich verbessern. Viele Patienten können durch regelmäßige osteopathische Behandlung und Eigenübungen eine geplante Operation hinauszögern oder sogar vermeiden.'
  },
  {
    question: 'Ab welchem Stadium der Arthrose ist Osteopathie sinnvoll?',
    answer: 'Osteopathie ist in allen Stadien der Arthrose sinnvoll – vom Frühstadium (Grad 1) bis zur fortgeschrittenen Arthrose (Grad 3-4). Im Frühstadium kann die Behandlung präventiv wirken und die Progression verlangsamen. Bei fortgeschrittener Arthrose liegt der Fokus auf Schmerzreduktion, Erhalt der Mobilität und Optimierung der Kompensationsmuster. Auch nach Gelenkersatz-Operationen kann Osteopathie die Rehabilitation unterstützen.'
  },
  {
    question: 'Was kostet die osteopathische Behandlung bei Arthrose?',
    answer: 'Eine osteopathische Sitzung (60 Minuten) kostet in meiner Praxis 120 Euro. Viele gesetzliche Krankenkassen erstatten 20-40 Euro pro Sitzung (3-6 Sitzungen pro Jahr), private Krankenversicherungen übernehmen meist die vollen Kosten nach Gebührenordnung für Heilpraktiker (GebüH). Ich erstelle nach jeder Behandlung eine detaillierte Rechnung, die Sie bei Ihrer Kasse einreichen können. Eine Investition in Ihre Gesundheit, die sich durch verbesserte Lebensqualität und oft vermiedene Folgekosten rechnet.'
  },
  {
    question: 'Können auch jüngere Menschen mit Gelenkbeschwerden behandelt werden?',
    answer: 'Absolut! Arthrose betrifft nicht nur ältere Menschen. Auch jüngere Patienten leiden unter Gelenkbeschwerden durch Sportverletzungen, Überlastung, angeborene Fehlstellungen oder posttraumatische Arthrose nach Unfällen. Bei jüngeren Patienten ist der präventive Ansatz besonders wichtig: Durch Optimierung der Biomechanik und Behandlung von Dysfunktionen kann oft eine frühzeitige Arthrose-Entwicklung verhindert oder deutlich verlangsamt werden.'
  },
  {
    question: 'Wann sollte man bei Arthrose nicht osteopathisch behandeln (Kontraindikationen)?',
    answer: 'Bei akuten Infektionen des Gelenks (septische Arthritis), frischen Frakturen, schwerer Osteoporose mit Frakturrisiko, akuter Thrombose oder unmittelbar nach Gelenkoperationen sollte nicht behandelt werden. Auch bei starken Entzündungsschüben mit Schwellung und Überwärmung arbeite ich zunächst nur sehr sanft. Bei Unsicherheit kläre ich vorher mit Ihrem Arzt ab, ob eine Behandlung sinnvoll ist. Wichtig: Bei plötzlich auftretenden, sehr starken Gelenkschmerzen sollten Sie zunächst ärztlich abklären lassen, dass keine ernsthafte Erkrankung vorliegt.'
  }
];

export default function ArthrosePage() {
  return (
    <>
      <MedicalConditionSchema
        name="Arthrose und Gelenkbeschwerden"
        description="Osteopathische Behandlung von Arthrose, Hüftschmerzen, Knieschmerzen und anderen Gelenkbeschwerden durch ganzheitliche manuelle Therapie zur Schmerzreduktion und Mobilitätsverbesserung."
        symptoms={[
          'Gelenkschmerzen bei Belastung',
          'Morgendliche Gelenksteifigkeit',
          'Bewegungseinschränkung',
          'Knirschende Geräusche im Gelenk',
          'Schwellungen und Entzündungen',
          'Muskelverspannungen um das Gelenk',
          'Schonhaltungen und Fehlbelastungen',
          'Eingeschränkte Alltagsaktivitäten'
        ]}
        causes={[
          'Altersbedingter Knorpelverschleiß',
          'Genetische Veranlagung',
          'Übergewicht und Gelenküberlastung',
          'Frühere Gelenkverletzungen',
          'Fehlstellungen (O-Beine, X-Beine)',
          'Übermäßige sportliche oder berufliche Belastung',
          'Entzündliche Gelenkerkrankungen',
          'Stoffwechselerkrankungen'
        ]}
        treatments={[
          'Gelenkmobilisation und sanfte Manipulation',
          'Faszienbehandlung der gelenkumgebenden Strukturen',
          'Muskelentspannung und Triggerpunkt-Therapie',
          'Optimierung der Körperstatik und Biomechanik',
          'Behandlung kompensatorischer Dysfunktionen',
          'Verbesserung der Durchblutung und des Lymphflusses',
          'Viszerale Osteopathie zur Entzündungsreduktion',
          'Beratung zu Bewegung, Ernährung und Selbsthilfe'
        ]}
      />

      <FAQSchema faqs={faqItems} />

      <StickyBookingButton />

      <Breadcrumbs
        items={[
          { label: 'Startseite', href: '/' },
          { label: 'Behandlungen', href: '/behandlungen' },
          { label: 'Arthrose & Gelenkbeschwerden' }
        ]}
      />

      <TreatmentHero
        title="Arthrose & Gelenkbeschwerden"
        subtitle="Ganzheitliche osteopathische Behandlung für mehr Beweglichkeit und Lebensqualität"
        description="Gelenkschmerzen müssen Sie nicht hinnehmen. Mit einem ganzheitlichen osteopathischen Ansatz behandle ich nicht nur das schmerzende Gelenk, sondern optimiere Ihre gesamte Körperstatik für nachhaltige Beschwerdefreiheit."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Wenn Gelenke schmerzen */}
        <FadeInSection delay={0}>
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Wenn Gelenke schmerzen – mehr als nur eine Alterserscheinung
            </h2>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-4 mb-8">
              <p>
                Stellen Sie sich vor: Sie wachen morgens auf und Ihre Knie sind so steif, dass die ersten Schritte zur Qual werden.
                Die Treppe wird zum Hindernis, das Öffnen eines Marmeladenglases zur Herausforderung, und der Spaziergang mit den
                Enkeln muss abgebrochen werden, weil die Hüfte schmerzt. Gelenkbeschwerden und Arthrose betreffen Millionen Menschen
                in Deutschland – und die Tendenz ist steigend.
              </p>

              <p>
                Arthrose ist die häufigste Gelenkerkrankung weltweit. In Deutschland leben etwa 5 Millionen Menschen mit behandlungsbedürftiger
                Arthrose, ab dem 50. Lebensjahr ist jeder Zweite betroffen. Was viele nicht wissen: Gelenkbeschwerden sind nicht
                einfach Schicksal, das man hinnehmen muss. Es gibt wirksame, sanfte Behandlungsmöglichkeiten – und Osteopathie
                gehört zu den vielversprechendsten Ansätzen.
              </p>

              <p>
                Die Auswirkungen von chronischen Gelenkschmerzen gehen weit über das betroffene Gelenk hinaus. Sie beeinträchtigen
                die Lebensqualität erheblich: Hobbys müssen aufgegeben werden, die Unabhängigkeit schwindet, soziale Kontakte leiden,
                Schlafstörungen durch nächtliche Schmerzen sind häufig, und die psychische Belastung durch chronische Schmerzen
                kann zu Depression und Angststörungen führen. Viele Betroffene fühlen sich in ihrem eigenen Körper gefangen.
              </p>

              <p>
                Als Osteopath sehe ich täglich, wie Arthrose und Gelenkbeschwerden das Leben meiner Patienten einschränken – aber
                auch, wie deutlich ihre Lebensqualität durch eine ganzheitliche osteopathische Behandlung verbessert werden kann.
                Mein Ansatz geht über die reine Symptombehandlung hinaus: Ich schaue auf den ganzen Menschen, die Ursachen der
                Fehlbelastungen und die kompensatorischen Muster, die sich über Jahre entwickelt haben.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Häufige Symptome und Beschwerden bei Arthrose:
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Belastungsabhängige Gelenkschmerzen (Anlaufschmerz)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Morgendliche Gelenksteifigkeit (bis 30 Minuten)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Eingeschränkte Beweglichkeit des Gelenks</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Knirschende oder knackende Geräusche (Krepitation)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Schwellungen und Entzündungsschübe (aktivierte Arthrose)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Muskelverspannungen und Triggerpunkte um das Gelenk</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Schonhaltungen und Ausweichbewegungen</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Sekundäre Beschwerden in anderen Gelenken durch Kompensation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Wetterfühligkeit (Schmerzverstärkung bei Kälte/Nässe)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Eingeschränkte Alltagsaktivitäten (Treppensteigen, Greifen)</span>
                </li>
              </ul>
            </div>
          </section>
        </FadeInSection>

        {/* Was ist Arthrose? */}
        <FadeInSection delay={100}>
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Was ist Arthrose? – Verstehen, was im Gelenk passiert
            </h2>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-4 mb-8">
              <p>
                Arthrose, medizinisch auch als Osteoarthrose oder degenerative Gelenkerkrankung bezeichnet, ist ein fortschreitender
                Verschleiß des Gelenkknorpels. Der Knorpel ist eine glatte, elastische Schicht, die die Gelenkflächen überzieht
                und als Stoßdämpfer fungiert. Bei Arthrose wird dieser Knorpel zunehmend dünner und rauer, bis er stellenweise
                komplett abgebaut ist und Knochen auf Knochen reibt.
              </p>

              <p>
                Dieser Prozess führt zu einer Kaskade von Veränderungen: Der freiliegende Knochen verdichtet sich (Sklerosierung),
                es bilden sich knöcherne Anbauten an den Gelenkrändern (Osteophyten), die Gelenkkapsel verdickt und entzündet sich,
                die Gelenkflüssigkeit (Synovia) verändert ihre Zusammensetzung und verliert ihre stoßdämpfende Funktion, und die
                umgebende Muskulatur verspannt sich als Schutzreaktion.
              </p>

              <p>
                Wichtig ist die Unterscheidung zwischen <strong>Arthrose</strong> (degenerativer Verschleiß) und <strong>Arthritis</strong>
                (entzündliche Gelenkerkrankung). Arthrose ist primär ein mechanischer Verschleiß, der sekundär zu Entzündungen
                führen kann (aktivierte Arthrose). Arthritis hingegen ist eine primär entzündliche Erkrankung (z.B. rheumatoide
                Arthritis), bei der das Immunsystem das Gelenk angreift. Beide können ähnliche Symptome verursachen, erfordern
                aber unterschiedliche Behandlungsansätze.
              </p>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg my-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  Die vier Stadien der Arthrose (nach Kellgren-Lawrence):
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <strong className="text-gray-900">Grad 1 (Frühe Arthrose):</strong>
                      <span className="text-gray-700"> Geringfügige Osteophyten, kaum Beschwerden, Knorpel noch weitgehend intakt</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <strong className="text-gray-900">Grad 2 (Mäßige Arthrose):</strong>
                      <span className="text-gray-700"> Deutliche Osteophyten, leichte Gelenkspaltverschmälerung, gelegentliche Beschwerden</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <strong className="text-gray-900">Grad 3 (Fortgeschrittene Arthrose):</strong>
                      <span className="text-gray-700"> Ausgeprägte Osteophyten, deutliche Gelenkspaltverschmälerung, häufige Schmerzen</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">
                      4
                    </div>
                    <div>
                      <strong className="text-gray-900">Grad 4 (Schwere Arthrose):</strong>
                      <span className="text-gray-700"> Gelenkspalt kaum noch sichtbar, massive Osteophyten, starke Knochensklerose, erhebliche Bewegungseinschränkung</span>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                Die Entwicklung einer Arthrose ist multifaktoriell. <strong>Risikofaktoren</strong> umfassen: zunehmendes Alter
                (ab 50 deutlich erhöhtes Risiko), genetische Veranlagung (Familiengeschichte von Arthrose), Übergewicht (jedes
                Kilo Übergewicht belastet die Kniegelenke mit dem 4-fachen beim Gehen), frühere Gelenkverletzungen (Meniskusschäden,
                Kreuzbandverletzungen, Frakturen), Fehlstellungen (O-Beine, X-Beine, Hüftdysplasie), übermäßige berufliche oder
                sportliche Belastung (Fliesenleger, Leistungssport), weibliches Geschlecht (nach der Menopause erhöhtes Risiko),
                und Stoffwechselerkrankungen (Diabetes, Gicht).
              </p>

              <p>
                Die gute Nachricht: Auch wenn Arthrose nicht heilbar ist, lässt sich ihr Verlauf durch gezielte Maßnahmen deutlich
                beeinflussen. Studien zeigen, dass eine Kombination aus manueller Therapie (wie Osteopathie), angepasster Bewegung
                und Lebensstilmodifikation die Symptome erheblich lindern und die Progression verlangsamen kann – oft so effektiv,
                dass eine geplante Operation vermieden oder zumindest hinausgezögert werden kann.
              </p>
            </div>
          </section>
        </FadeInSection>

        {/* Häufig betroffene Gelenke im Detail */}
        <FadeInSection delay={200}>
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Häufig betroffene Gelenke im Detail
            </h2>

            <p className="text-lg text-gray-700 mb-8">
              Arthrose kann grundsätzlich jedes Gelenk betreffen, tritt aber besonders häufig in belasteten Gelenken auf.
              Hier die wichtigsten Lokalisationen und wie ich sie osteopathisch behandle:
            </p>

            <div className="space-y-6">
              {/* Kniearthrose */}
              <div className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded-r-lg">
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                  🦵 Kniearthrose (Gonarthrose)
                </h3>
                <p className="text-gray-700 mb-3">
                  Das Kniegelenk ist das am häufigsten von Arthrose betroffene Gelenk. Als größtes Gelenk des Körpers trägt
                  es bei jedem Schritt ein Vielfaches unseres Körpergewichts. Besonders betroffen ist oft der innere Gelenkspalt
                  (mediale Gonarthrose) bei O-Bein-Fehlstellung oder der Bereich hinter der Kniescheibe (Retropatellararthrose).
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Typische Symptome:</strong> Anlaufschmerz nach Ruhephasen, Schmerzen beim Treppensteigen (besonders bergab),
                  eingeschränkte Beugung und Streckung, Schwellungen nach Belastung, knirschende Geräusche, nächtliche Schmerzen
                  in bestimmten Schlafpositionen.
                </p>
                <p className="text-gray-700">
                  <strong>Osteopathischer Ansatz:</strong> Mobilisation des Kniegelenks und der Kniescheibe (Patella), Faszienbehandlung
                  der Oberschenkel- und Unterschenkelmuskulatur, Korrektur von Beinachsenfehlstellungen durch Behandlung von Hüfte,
                  Sprunggelenk und Fuß, Optimierung der Patellabewegung, Behandlung kompensatorischer Dysfunktionen in der Lendenwirbelsäule
                  und im Becken, Verbesserung der Durchblutung und des Lymphflusses.
                </p>
              </div>

              {/* Hüftarthrose */}
              <div className="border-l-4 border-green-500 bg-green-50 p-6 rounded-r-lg">
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                  🦴 Hüftarthrose (Coxarthrose)
                </h3>
                <p className="text-gray-700 mb-3">
                  Die Hüftarthrose ist die zweithäufigste Arthrose-Form. Sie kann durch angeborene Hüftdysplasie, das Impingement-Syndrom
                  oder einfach durch jahrzehntelange Belastung entstehen. Die Hüfte ist ein Kugelgelenk und zentral für unsere
                  Fortbewegung – Beschwerden hier wirken sich massiv auf die Lebensqualität aus.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Typische Symptome:</strong> Leistenschmerzen (typisches Erstsymptom), eingeschränkte Innenrotation und
                  Beugung, Anlaufschmerz, Schmerzen beim Aufstehen aus dem Sitzen, Probleme beim Schuhe anziehen oder Socken anziehen,
                  hinkender Gang (Schonhaltung), ausstrahlende Schmerzen ins Gesäß oder Knie.
                </p>
                <p className="text-gray-700">
                  <strong>Osteopathischer Ansatz:</strong> Sanfte Mobilisation des Hüftgelenks in alle Bewegungsrichtungen, Faszienbehandlung
                  des Iliopsoas, der Glutealmuskulatur und der tiefen Hüftrotatoren, Behandlung des Iliosakralgelenks (ISG) und der
                  Lendenwirbelsäule, Optimierung der Beinachse und des Gangbildes, viszerale Techniken (Organe können die Hüftbeweglichkeit
                  einschränken), Behandlung kompensatorischer Muster im gesamten Körper.
                </p>
              </div>

              {/* Schulterarthrose */}
              <div className="border-l-4 border-orange-500 bg-orange-50 p-6 rounded-r-lg">
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                  💪 Schulterarthrose (Omarthrose)
                </h3>
                <p className="text-gray-700 mb-3">
                  Schulterarthrose tritt seltener auf als Knie- oder Hüftarthrose, da die Schulter weniger Gewicht trägt. Sie
                  entsteht oft nach Verletzungen (Rotatorenmanschettenriss, Schulterluxation), durch chronische Überkopfarbeiten
                  oder im Rahmen der sogenannten Omarthrose bei Kalkschulter.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Typische Symptome:</strong> Schmerzen bei Überkopfbewegungen (Haare kämmen, Schrank einräumen), nächtliche
                  Schmerzen beim Liegen auf der betroffenen Schulter, eingeschränkte Außenrotation (Arm hinter den Kopf nehmen),
                  Kraftverlust beim Heben, knirschende Geräusche bei Bewegung, Schonhaltung mit Hochziehen der Schulter.
                </p>
                <p className="text-gray-700">
                  <strong>Osteopathischer Ansatz:</strong> Mobilisation des Glenohumeralgelenks (Hauptschultergelenk), Behandlung
                  der Rotatorenmanschette und der Bizepssehne, Mobilisation des Schulterblatts (Skapula) und des Schlüsselbeins
                  (Klavikula), Faszienbehandlung der Nacken- und Brustmuskulatur, Behandlung der Halswirbelsäule und der oberen
                  Rippen, Korrektur von Haltungsmustern (Rundrücken, Vorkopfhaltung), Verbesserung der neurovaskulären Versorgung.
                </p>
              </div>

              {/* Hand- und Fingerarthrose */}
              <div className="border-l-4 border-purple-500 bg-purple-50 p-6 rounded-r-lg">
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                  🤲 Hand- und Fingerarthrose (Rhizarthrose, Heberden-/Bouchard-Arthrose)
                </h3>
                <p className="text-gray-700 mb-3">
                  Handarthrose betrifft besonders häufig Frauen nach der Menopause und hat oft eine starke genetische Komponente.
                  Die Rhizarthrose (Daumensattelgelenk), Heberden-Arthrose (Fingerendgelenke) und Bouchard-Arthrose (Fingermittelgelenke)
                  können einzeln oder kombiniert auftreten und die Greiffunktion erheblich einschränken.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Typische Symptome:</strong> Schmerzen beim festen Zugreifen (Schraubglas öffnen), Verdickung und Verformung
                  der Fingergelenke (Knoten), morgendliche Steifigkeit der Finger, eingeschränkte Feinmotorik (Knöpfe schließen,
                  Schreiben), Kraftverlust im Daumen bei Rhizarthrose, sichtbare Gelenkveränderungen.
                </p>
                <p className="text-gray-700">
                  <strong>Osteopathischer Ansatz:</strong> Sanfte Mobilisation der betroffenen Fingergelenke, Behandlung der
                  Handwurzelknochen und des Handgelenks, Faszienbehandlung der Hand- und Unterarmmuskulatur, Verbesserung der
                  Durchblutung durch Lymphdrainage, Behandlung der Halswirbelsäule und des Schultergürtels (nervale Versorgung),
                  Beratung zu gelenkschonenden Alltagshilfen, bei Rhizarthrose: spezielle Techniken für das Daumensattelgelenk.
                </p>
              </div>

              {/* Wirbelsäulenarthrose */}
              <div className="border-l-4 border-red-500 bg-red-50 p-6 rounded-r-lg">
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                  🏥 Wirbelsäulenarthrose (Spondylarthrose, Facettengelenkarthrose)
                </h3>
                <p className="text-gray-700 mb-3">
                  Die kleinen Wirbelgelenke (Facettengelenke) können wie alle Gelenke von Arthrose betroffen sein. Dies führt
                  zu chronischen Rückenschmerzen, besonders in der Lendenwirbelsäule (LWS) und Halswirbelsäule (HWS). Oft tritt
                  sie zusammen mit degenerativen Bandscheibenveränderungen auf.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Typische Symptome:</strong> Morgendliche Rückenschmerzen und Steifigkeit, Schmerzen bei Rückneigung
                  (Extension) der Wirbelsäule, tiefsitzende Rückenschmerzen, bewegungsabhängige Beschwerden, eingeschränkte
                  Drehbewegungen, muskuläre Verspannungen, bei HWS-Arthrose: Nackenschmerzen, Kopfschmerzen, eingeschränkte
                  Kopfdrehung.
                </p>
                <p className="text-gray-700">
                  <strong>Osteopathischer Ansatz:</strong> Sanfte Mobilisation der betroffenen Wirbelsegmente, Behandlung der
                  paravertebralen Muskulatur und der Faszien, Optimierung der Wirbelsäulenstatik und -krümmungen, Behandlung
                  des Beckens und der Iliosakralgelenke, viszerale Osteopathie (Organverbindungen zur Wirbelsäule), craniosacrale
                  Techniken bei HWS-Beteiligung, Korrektur kompensatorischer Muster, Atemtherapie zur Entlastung der Brustwirbelsäule.
                </p>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* Osteopathischer Ansatz bei Arthrose */}
        <FadeInSection delay={300}>
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Der osteopathische Ansatz bei Arthrose – ganzheitlich statt symptomatisch
            </h2>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-4 mb-8">
              <p>
                Der osteopathische Ansatz bei Arthrose unterscheidet sich grundlegend von rein symptomatischen Behandlungen.
                Während konventionelle Therapien oft nur das schmerzende Gelenk fokussieren (Schmerzmittel, lokale Injektionen),
                schaue ich als Osteopath auf den gesamten Menschen: Warum ist gerade dieses Gelenk betroffen? Welche strukturellen
                Ursachen führen zu Fehlbelastungen? Wie kompensiert der Körper? Welche anderen Bereiche sind involviert?
              </p>

              <p>
                Die <strong>Philosophie</strong> dahinter: Der Körper ist eine funktionelle Einheit. Ein arthrotisches Kniegelenk
                ist selten ein isoliertes Problem – oft finden sich Beckenschiefstände, Fußfehlstellungen, Wirbelsäulendysfunktionen
                oder sogar viszerale (die Organe betreffende) Einschränkungen als Mitursachen. Diese gilt es zu identifizieren
                und zu behandeln, damit das betroffene Gelenk entlastet wird.
              </p>

              <p>
                Meine <strong>Behandlungsziele</strong> bei Arthrose sind:
              </p>
              <ul className="list-disc list-inside space-y-2 my-4">
                <li><strong>Schmerzreduktion:</strong> Durch Entspannung der Muskulatur, Verbesserung der Durchblutung und Reduktion von Entzündungsprozessen</li>
                <li><strong>Verbesserung der Gelenkbeweglichkeit:</strong> Sanfte Mobilisation zur Erhaltung der Gelenkfunktion</li>
                <li><strong>Verlangsamung der Progression:</strong> Durch Optimierung der Gelenkbelastung und Biomechanik</li>
                <li><strong>Stärkung der Kompensationsfähigkeit:</strong> Den Körper befähigen, besser mit der Arthrose umzugehen</li>
                <li><strong>Verbesserung der Lebensqualität:</strong> Mehr Mobilität, weniger Einschränkungen im Alltag</li>
                <li><strong>Vermeidung oder Hinauszögerung von Operationen:</strong> Durch konservative, ganzheitliche Behandlung</li>
              </ul>

              <p>
                Die <strong>osteopathischen Techniken</strong>, die ich bei Arthrose einsetze, sind vielfältig und werden individuell
                angepasst:
              </p>
              <ul className="list-disc list-inside space-y-2 my-4">
                <li><strong>Artikulationstechniken:</strong> Sanfte, rhythmische Bewegung des Gelenks zur Verbesserung der Gelenkflüssigkeitsproduktion</li>
                <li><strong>Muskel-Energie-Techniken (MET):</strong> Isometrische Muskelkontraktionen zur Mobilisation</li>
                <li><strong>Faszienbehandlung:</strong> Lösung von Verklebungen und Spannungen im Bindegewebe</li>
                <li><strong>Triggerpunkt-Therapie:</strong> Behandlung schmerzhafter Muskelknoten</li>
                <li><strong>Viszerale Osteopathie:</strong> Behandlung der Organe zur Verbesserung der Durchblutung und Reduktion systemischer Entzündungen</li>
                <li><strong>Craniosacrale Techniken:</strong> Bei begleitenden Kopfschmerzen oder zur Regulation des Nervensystems</li>
                <li><strong>Lymphatische Techniken:</strong> Verbesserung des Lymphflusses bei Schwellungen</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-lg my-8">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 text-center">
                Mein Behandlungsablauf – Schritt für Schritt
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900">Ausführliche Anamnese</h4>
                    <p className="text-gray-700">
                      Wir besprechen Ihre Beschwerdehistorie, bisherige Diagnosen, Vorerkrankungen, Medikamente und Ihre
                      persönlichen Ziele. Wie stark sind die Schmerzen? Was können Sie nicht mehr tun? Was möchten Sie wieder können?
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900">Ganzheitliche Befundung</h4>
                    <p className="text-gray-700">
                      Ich untersuche nicht nur das betroffene Gelenk, sondern Ihren gesamten Bewegungsapparat: Gang, Haltung,
                      Wirbelsäule, Becken, benachbarte Gelenke. Ich taste Spannungsmuster, teste Bewegungseinschränkungen und
                      suche nach den Ursachen der Fehlbelastung.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900">Behandlung des betroffenen Gelenks</h4>
                    <p className="text-gray-700">
                      Sanfte Mobilisation und Traktion (Zug) des Gelenks, Behandlung der Gelenkkapsel, Entspannung der
                      umgebenden Muskulatur, Verbesserung der Durchblutung durch manuelle Techniken.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900">Behandlung kompensatorischer Muster</h4>
                    <p className="text-gray-700">
                      Ich behandle die Bereiche, die sich aufgrund der Arthrose verspannt oder verschoben haben: Bei Kniearthrose
                      oft die Hüfte und den unteren Rücken, bei Schulterarthrose die Halswirbelsäule und Rippen.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900">Viszerale und craniosacrale Integration</h4>
                    <p className="text-gray-700">
                      Je nach Befund behandle ich auch Organsysteme (z.B. Darm bei systemischen Entzündungen) oder das
                      craniosacrale System zur Regulation des autonomen Nervensystems und Schmerzverarbeitung.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0">
                    6
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900">Übungen und Selbsthilfe</h4>
                    <p className="text-gray-700">
                      Ich zeige Ihnen gezielte Übungen zur Kräftigung und Mobilisation, gebe Tipps zur Ergonomie im Alltag
                      und berate Sie zu Bewegung, Ernährung und Hilfsmitteln.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0">
                    7
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900">Behandlungsplan und Verlaufskontrolle</h4>
                    <p className="text-gray-700">
                      Gemeinsam legen wir fest, wie oft Behandlungen sinnvoll sind und wann wir Fortschritte evaluieren.
                      Bei chronischer Arthrose empfehle ich oft eine initiale Serie von 4-6 Sitzungen, gefolgt von
                      regelmäßigen Erhaltungsbehandlungen.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* Wissenschaftliche Evidenz */}
        <FadeInSection delay={400}>
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Wissenschaftliche Evidenz – Was sagt die Forschung?
            </h2>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Die Wirksamkeit von manueller Therapie und Osteopathie bei Arthrose ist wissenschaftlich gut untersucht.
                Zahlreiche Studien belegen positive Effekte auf Schmerz, Funktion und Lebensqualität:
              </p>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg my-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Evidenz-Highlights:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 font-bold">•</span>
                    <span>
                      <strong>Kniearthrose:</strong> Eine systematische Cochrane-Review (2022) zeigt, dass manuelle Therapie
                      kurz- bis mittelfristig Schmerzen reduziert und die Funktion verbessert. Die Effektgröße ist moderat
                      und vergleichbar mit anderen konservativen Therapien.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 font-bold">•</span>
                    <span>
                      <strong>Hüftarthrose:</strong> Studien zeigen, dass Patienten mit Hüftarthrose von manueller Mobilisation
                      profitieren, besonders in Kombination mit Übungstherapie (French et al., 2011).
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 font-bold">•</span>
                    <span>
                      <strong>Handarthrose:</strong> Manuelle Therapie kann bei Daumensattelgelenkarthrose (Rhizarthrose)
                      Schmerzen lindern und die Greiffunktion verbessern (Kloppenburg & Kroon, 2017).
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 font-bold">•</span>
                    <span>
                      <strong>OARSI-Guidelines:</strong> Die Osteoarthritis Research Society International empfiehlt manuelle
                      Therapie als Teil eines multimodalen Behandlungsansatzes bei Knie- und Hüftarthrose.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 font-bold">•</span>
                    <span>
                      <strong>Mechanismen:</strong> Manuelle Therapie wirkt wahrscheinlich über mehrere Mechanismen:
                      Verbesserung der Gelenkmechanik, Schmerzmodulation über das Nervensystem (Gate-Control-Theorie),
                      Entspannung der Muskulatur, verbesserte Durchblutung und psychologische Effekte.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Wichtig zu verstehen: Die Evidenz für Osteopathie bei Arthrose ist überwiegend <strong>positiv bis moderat</strong>.
                Sie ist nicht so stark wie für Medikamente oder Operationen in schweren Fällen, aber sie ist vorhanden – und
                das bei einem sehr günstigen Nebenwirkungsprofil. Die meisten internationalen Leitlinien (OARSI, EULAR, NICE)
                empfehlen manuelle Therapie als Bestandteil eines konservativen Gesamtkonzepts.
              </p>

              <p>
                Was die Forschung außerdem zeigt: Die <strong>Kombination</strong> macht's. Osteopathie allein ist gut, aber
                in Kombination mit aktiver Bewegungstherapie, Gewichtsreduktion (bei Übergewicht) und ggf. begleitenden
                Maßnahmen (Ernährung, Hilfsmittel) sind die Ergebnisse am besten. Deshalb ist mein Ansatz immer ganzheitlich
                und beinhaltet neben der manuellen Behandlung auch Empfehlungen für Ihr Selbstmanagement.
              </p>
            </div>
          </section>
        </FadeInSection>

        {/* Praxisbeispiel */}
        <FadeInSection delay={450}>
          <section>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-xl border border-amber-200">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                📖 Aus meiner Praxis: Helgas Weg zurück zur Mobilität
              </h2>

              <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                <p>
                  <strong>Patientin:</strong> Helga, 68 Jahre, pensionierte Lehrerin<br />
                  <strong>Diagnose:</strong> Fortgeschrittene Kniearthrose beidseits (Gonarthrose Grad 3), rechts stärker betroffen<br />
                  <strong>Beschwerden:</strong> Seit 4 Jahren zunehmende Knieschmerzen, besonders beim Treppensteigen und nach längerem
                  Gehen. Gehstrecke auf ca. 500 Meter reduziert, danach starke Schmerzen und Schwellung. Morgendliche Steifigkeit
                  bis zu 45 Minuten. Orthopäde empfahl Kniegelenksersatz (TEP) für das rechte Knie.
                </p>

                <p>
                  <strong>Befund:</strong> Bei der osteopathischen Untersuchung fiel mir auf: deutliche O-Bein-Fehlstellung rechts,
                  Beckenschiefstand mit Beckenverwringung, verkürzte Hüftbeugemuskulatur beidseits, massive Verspannungen der
                  Oberschenkelmuskulatur, eingeschränkte Kniebeugung rechts (nur 90°), Fußgewölbeabsenkung (Plattfuß) rechts.
                  Das Knie war also nicht das einzige Problem – die gesamte Beinstatik war gestört.
                </p>

                <p>
                  <strong>Behandlung:</strong> Helga kam über 4 Monate 8 Mal zu mir. Ich behandelte nicht nur die Knie, sondern
                  korrigierte die Beckenstellung, mobilisierte die Hüften, löste die Verspannungen in der Oberschenkelmuskulatur,
                  behandelte die Füße und Sprunggelenke und zeigte ihr gezielte Übungen zur Kräftigung der Kniemuskulatur. Zusätzlich
                  empfahl ich orthopädische Einlagen zur Korrektur der Fußstellung.
                </p>

                <p>
                  <strong>Ergebnis:</strong> Nach 8 Sitzungen berichtete Helga von etwa 50% weniger Schmerzen. Ihre Gehstrecke
                  hatte sich auf über 2 Kilometer erweitert, die morgendliche Steifigkeit war auf 10-15 Minuten reduziert,
                  Treppensteigen war wieder ohne Geländer möglich, und sie konnte wieder mit ihren Enkeln spazieren gehen. Die
                  geplante Operation verschob sie zunächst – "solange es so gut geht, möchte ich es ohne versuchen", sagte sie.
                  Helga kommt nun alle 6-8 Wochen zu Erhaltungsbehandlungen und macht konsequent ihre Übungen. Ihre Lebensqualität
                  hat sich erheblich verbessert.
                </p>

                <p className="italic text-gray-600 border-l-4 border-amber-400 pl-4">
                  "Ich hätte nie gedacht, dass ich in meinem Alter noch so viel Verbesserung erleben würde. Die Behandlungen
                  haben mir nicht nur geholfen, wieder mobiler zu werden, sondern mir auch gezeigt, dass ich selbst viel für
                  meine Gelenke tun kann. Ich fühle mich nicht mehr so ausgeliefert." – Helga M.
                </p>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* Selbsthilfe & Prävention */}
        <FadeInSection delay={500}>
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Selbsthilfe & Prävention – Was Sie selbst tun können
            </h2>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-4 mb-8">
              <p>
                Arthrose-Behandlung ist Teamarbeit. Als Osteopath kann ich wichtige Impulse setzen und Ihren Körper optimal
                einstellen – aber den größten Teil der Zeit verbringen Sie außerhalb meiner Praxis. Deshalb ist Ihr Selbstmanagement
                entscheidend für den langfristigen Erfolg. Hier die wichtigsten Maßnahmen:
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
                🏃‍♀️ Bewegung ist Medizin – nicht Ruhe!
              </h3>
              <p>
                Der wichtigste Punkt zuerst: <strong>Bewegung ist bei Arthrose unverzichtbar</strong>. Viele Betroffene schonen
                ihr Gelenk aus Angst vor Schmerzen – doch genau das ist kontraproduktiv. Knorpel wird über die Gelenkflüssigkeit
                ernährt, und diese wird nur durch Bewegung produziert und im Gelenk verteilt. Ohne Bewegung verschlechtert sich
                die Arthrose schneller.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-6">
                <h4 className="text-xl font-semibold mb-3 text-gray-900">Empfohlene Bewegungsformen bei Arthrose:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">🏊‍♂️</span>
                    <span><strong>Schwimmen und Aquagymnastik:</strong> Gelenkschonend durch Auftrieb, ideal bei Knie- und Hüftarthrose</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">🚴‍♀️</span>
                    <span><strong>Radfahren:</strong> Gute Bewegung ohne Stoßbelastung, stärkt die Beinmuskulatur</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">🚶‍♂️</span>
                    <span><strong>Walking/Nordic Walking:</strong> Moderate Belastung, gut für die Ausdauer</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">🧘</span>
                    <span><strong>Yoga und Tai Chi:</strong> Verbessern Beweglichkeit, Balance und Körperwahrnehmung</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">💪</span>
                    <span><strong>Gezieltes Krafttraining:</strong> Kräftigt die gelenkstabilisierende Muskulatur (unter Anleitung)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">🤸</span>
                    <span><strong>Funktionelle Übungen:</strong> Gleichgewichtstraining, Koordinationsübungen</span>
                  </li>
                </ul>
                <p className="mt-4 text-gray-700">
                  <strong>Faustregel:</strong> Täglich 30 Minuten moderate Bewegung. Lieber öfter und kürzer als selten und lang.
                  Bei akuten Schmerzen Intensität reduzieren, aber nicht komplett aufhören.
                </p>
              </div>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
                ⚖️ Gewichtsmanagement – jedes Kilo zählt
              </h3>
              <p>
                Übergewicht ist einer der wichtigsten beeinflussbaren Risikofaktoren für Arthrose, besonders für Knie- und
                Hüftarthrose. Jedes Kilogramm Gewichtsabnahme reduziert die Belastung auf die Kniegelenke um das 4-fache beim
                Gehen! Studien zeigen, dass bereits 5-10% Gewichtsreduktion Schmerzen deutlich lindern und die Funktion verbessern
                können. Bei Bedarf unterstütze ich Sie gerne mit Ernährungsberatung oder vermittle Kontakte zu Ernährungsfachkräften.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
                🥗 Ernährung – Entzündungen von innen bekämpfen
              </h3>
              <p>
                Auch wenn Ernährung Arthrose nicht heilen kann, spielt sie eine wichtige Rolle bei der Entzündungsregulation.
                Eine antientzündliche Ernährung kann Schmerzen und Entzündungsschübe reduzieren:
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                  <h4 className="text-lg font-semibold mb-3 text-gray-900">✅ Empfohlene Lebensmittel:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Fetter Seefisch (Omega-3: Lachs, Makrele, Hering)</li>
                    <li>• Buntes Gemüse (Antioxidantien: Brokkoli, Paprika, Spinat)</li>
                    <li>• Beeren (Anthocyane: Heidelbeeren, Himbeeren)</li>
                    <li>• Kurkuma und Ingwer (Curcumin, Gingerole)</li>
                    <li>• Nüsse und Samen (Walnüsse, Leinsamen, Chiasamen)</li>
                    <li>• Olivenöl extra nativ (Oleocanthal)</li>
                    <li>• Grüner Tee (Polyphenole)</li>
                    <li>• Knoblauch und Zwiebeln (Schwefelverbindungen)</li>
                  </ul>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                  <h4 className="text-lg font-semibold mb-3 text-gray-900">❌ Lebensmittel zu reduzieren:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Zucker und Süßigkeiten (fördern Entzündungen)</li>
                    <li>• Weißmehlprodukte (hoher glykämischer Index)</li>
                    <li>• Rotes Fleisch und Wurstwaren (Arachidonsäure)</li>
                    <li>• Transfette (Fast Food, frittierte Speisen)</li>
                    <li>• Alkohol (entzündungsfördernd)</li>
                    <li>• Stark verarbeitete Lebensmittel</li>
                    <li>• Übermäßig salzige Kost</li>
                    <li>• Softdrinks und gesüßte Getränke</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
                🛋️ Gelenkschonende Alltagsgewohnheiten
              </h3>
              <ul className="space-y-2 my-4">
                <li className="flex items-start">
                  <span className="text-gray-900 mr-2 font-bold">•</span>
                  <span><strong>Ergonomie:</strong> Verwenden Sie Hilfsmittel wie Greifzangen, Flaschenöffner, erhöhte Toilettensitze</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 mr-2 font-bold">•</span>
                  <span><strong>Schuhwerk:</strong> Gut dämpfende Schuhe mit weicher Sohle, ggf. orthopädische Einlagen</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 mr-2 font-bold">•</span>
                  <span><strong>Sitzposition:</strong> Regelmäßig aufstehen, nicht lange in gebeugter Position verharren</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 mr-2 font-bold">•</span>
                  <span><strong>Heben und Tragen:</strong> Aus den Beinen heben, nicht aus dem Rücken; schwere Lasten verteilen</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 mr-2 font-bold">•</span>
                  <span><strong>Kälte und Wärme:</strong> Bei akuten Entzündungen kühlen (15-20 Min.), bei chronischen Schmerzen wärmen (Bad, Wärmepflaster)</span>
                </li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
                💊 Nahrungsergänzungsmittel – sinnvoll oder überflüssig?
              </h3>
              <p>
                Zu Nahrungsergänzungsmitteln bei Arthrose gibt es viele Meinungen und Produkte. Die Evidenz ist gemischt:
              </p>
              <ul className="space-y-2 my-4">
                <li className="flex items-start">
                  <span className="text-gray-900 mr-2 font-bold">•</span>
                  <span>
                    <strong>Glucosamin und Chondroitin:</strong> Können bei manchen Patienten leichte Schmerzlinderung bringen,
                    Studienlage ist uneinheitlich. Einen Versuch wert (3-6 Monate), aber keine Wundermittel.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 mr-2 font-bold">•</span>
                  <span>
                    <strong>Omega-3-Fettsäuren:</strong> Gut belegt für entzündungshemmende Wirkung, empfehlenswert (aus Fisch oder Algenöl).
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 mr-2 font-bold">•</span>
                  <span>
                    <strong>Vitamin D:</strong> Bei Mangel supplementieren (Bluttest!), wichtig für Knochengesundheit.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 mr-2 font-bold">•</span>
                  <span>
                    <strong>Curcumin:</strong> Starke antientzündliche Wirkung in Studien, aber schlechte Bioverfügbarkeit – mit Piperin (schwarzer Pfeffer) kombinieren.
                  </span>
                </li>
              </ul>
              <p className="italic text-gray-600">
                Wichtig: Besprechen Sie Nahrungsergänzungsmittel mit Ihrem Arzt oder Apotheker, besonders bei Einnahme von
                Medikamenten (Wechselwirkungen möglich).
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
                🚨 Warnzeichen – wann zum Arzt?
              </h3>
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                <p className="font-semibold mb-3">Suchen Sie umgehend ärztliche Hilfe bei:</p>
                <ul className="space-y-2">
                  <li>• Plötzlich auftretenden, sehr starken Gelenkschmerzen (kann auf Infektion oder Fraktur hinweisen)</li>
                  <li>• Starker Schwellung, Rötung und Überwärmung (Verdacht auf septische Arthritis)</li>
                  <li>• Fieber zusammen mit Gelenkschmerzen</li>
                  <li>• Unfähigkeit, das Gelenk zu belasten oder zu bewegen</li>
                  <li>• Taubheitsgefühlen oder Kribbeln (nervale Beteiligung)</li>
                  <li>• Anhaltenden Schmerzen trotz konservativer Therapie über Monate</li>
                </ul>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* Weitere Informationen */}
        <FadeInSection delay={500}>
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Weitere Informationen & verwandte Themen
            </h2>

            <p className="text-lg text-gray-700 mb-6">
              Arthrose steht oft in Zusammenhang mit anderen Beschwerden. Hier finden Sie weitere relevante Behandlungsseiten:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/behandlungen/rueckenschmerzen"
                className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-lg hover:border-blue-400 transition-all duration-300"
              >
                <h3 className="font-semibold text-lg text-blue-600 mb-2">Rückenschmerzen & Wirbelsäule</h3>
                <p className="text-gray-600 text-sm">
                  Wirbelsäulenarthrose und Rückenschmerzen hängen oft zusammen
                </p>
              </Link>

              <Link
                href="/behandlungen/sportverletzungen"
                className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-lg hover:border-blue-400 transition-all duration-300"
              >
                <h3 className="font-semibold text-lg text-blue-600 mb-2">Sportverletzungen</h3>
                <p className="text-gray-600 text-sm">
                  Alte Verletzungen können zu frühzeitiger Arthrose führen
                </p>
              </Link>

              <Link
                href="/behandlungen/kopfschmerzen-migraene"
                className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-lg hover:border-blue-400 transition-all duration-300"
              >
                <h3 className="font-semibold text-lg text-blue-600 mb-2">Kopfschmerzen & Migräne</h3>
                <p className="text-gray-600 text-sm">
                  HWS-Arthrose kann Kopfschmerzen verursachen
                </p>
              </Link>

              <Link
                href="/behandlungen/chronische-schmerzen"
                className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-lg hover:border-blue-400 transition-all duration-300"
              >
                <h3 className="font-semibold text-lg text-blue-600 mb-2">Chronische Schmerzen</h3>
                <p className="text-gray-600 text-sm">
                  Langfristige Schmerzbehandlung bei chronischer Arthrose
                </p>
              </Link>

              <Link
                href="/behandlungen/aeltere-patienten"
                className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-lg hover:border-blue-400 transition-all duration-300"
              >
                <h3 className="font-semibold text-lg text-blue-600 mb-2">Behandlung älterer Patienten</h3>
                <p className="text-gray-600 text-sm">
                  Spezialisierte Betreuung für Senioren mit Arthrose
                </p>
              </Link>

              <Link
                href="/behandlungen/rehabilitation"
                className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-lg hover:border-blue-400 transition-all duration-300"
              >
                <h3 className="font-semibold text-lg text-blue-600 mb-2">Rehabilitation nach Operationen</h3>
                <p className="text-gray-600 text-sm">
                  Osteopathie nach Gelenkersatz-OP (TEP)
                </p>
              </Link>

              <Link
                href="/behandlungen"
                className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-lg hover:border-blue-400 transition-all duration-300"
              >
                <h3 className="font-semibold text-lg text-blue-600 mb-2">Alle Behandlungen</h3>
                <p className="text-gray-600 text-sm">
                  Übersicht aller osteopathischen Behandlungsschwerpunkte
                </p>
              </Link>

              <Link
                href="/ueber-mich"
                className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-lg hover:border-blue-400 transition-all duration-300"
              >
                <h3 className="font-semibold text-lg text-blue-600 mb-2">Über mich</h3>
                <p className="text-gray-600 text-sm">
                  Erfahren Sie mehr über meine Qualifikationen und Philosophie
                </p>
              </Link>

              <Link
                href="/blog"
                className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-lg hover:border-blue-400 transition-all duration-300"
              >
                <h3 className="font-semibold text-lg text-blue-600 mb-2">Blog & Ratgeber</h3>
                <p className="text-gray-600 text-sm">
                  Tipps und Wissenswertes zu Gesundheit und Osteopathie
                </p>
              </Link>
            </div>
          </section>
        </FadeInSection>

        {/* FAQ Section */}
        <FadeInSection delay={500}>
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Häufig gestellte Fragen (FAQ)
            </h2>

            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <details
                  key={index}
                  className="group bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-300"
                >
                  <summary className="font-semibold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                    <span>{faq.question}</span>
                    <span className="text-blue-500 group-open:rotate-180 transition-transform duration-300">
                      ▼
                    </span>
                  </summary>
                  <p className="mt-4 text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </FadeInSection>

        {/* CTA Section */}
        <FadeInSection delay={500}>
          <TreatmentCTA
            title="Bereit für mehr Beweglichkeit und Lebensqualität?"
            description="Arthrose muss Ihren Alltag nicht dominieren. Vereinbaren Sie jetzt einen Termin und lassen Sie uns gemeinsam einen individuellen Behandlungsplan entwickeln. In einem ausführlichen Erstgespräch analysiere ich Ihre Situation und zeige Ihnen, wie Osteopathie Ihnen helfen kann."
          />
        </FadeInSection>
      </div>
    </>
  );
}
