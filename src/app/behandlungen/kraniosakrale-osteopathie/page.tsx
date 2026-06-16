import { Metadata } from "next";
import TreatmentHero from "../components/TreatmentHero";
import TreatmentCTA from "../components/TreatmentCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSchema from "@/components/FAQSchema";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kraniosakrale Osteopathie Hamburg | Joshua Alsen",
  description:
    "Kraniosakrale Osteopathie Hamburg ✓ Sanfte Technik am craniosacralen System ✓ VFO-zertifizierter Osteopath ✓ Termine binnen 48h ✓ Kopfschmerzen, Stress, Schwindel ⭐ Jetzt buchen!",
  keywords: [
    "kraniosakrale osteopathie hamburg",
    "craniosacral therapie hamburg",
    "craniosakrale osteopathie",
    "craniosacrale behandlung hamburg",
    "kraniosakral osteopath hamburg",
    "craniosacral osteopathie hamburg",
  ],
  alternates: { canonical: "/behandlungen/kraniosakrale-osteopathie/" },
  openGraph: {
    title: "Kraniosakrale Osteopathie Hamburg | Joshua Alsen",
    description:
      "Sanfte kraniosakrale Osteopathie in Hamburg ✓ VFO-zertifizierter Osteopath ✓ Termine binnen 48h ✓ 2 Standorte: Rotherbaum & Eimsbüttel",
    url: "/behandlungen/kraniosakrale-osteopathie",
    siteName: "Osteopathie Hamburg - Joshua Alsen",
    images: [
      {
        url: "/assets/joshua-alsen-osteopath-hamburg-og.webp",
        width: 1200,
        height: 630,
        alt: "Kraniosakrale Osteopathie Hamburg - Joshua Alsen",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kraniosakrale Osteopathie Hamburg | Joshua Alsen",
    description:
      "Sanfte kraniosakrale Osteopathie bei Kopfschmerzen, Stress und Schwindel in Hamburg.",
    images: ["/assets/joshua-alsen-osteopath-hamburg-twitter.webp"],
  },
};

const therapySchema = {
  "@context": "https://schema.org",
  "@type": "MedicalTherapy",
  name: "Kraniosakrale Osteopathie",
  description:
    "Sehr sanfte osteopathische Technik, die mit dem craniosacralen System — Schädel, Wirbelsäule, Kreuzbein und zugehörigen Membranen — arbeitet.",
  relevantSpecialty: { "@type": "MedicalSpecialty", name: "Osteopathie" },
  indication: [
    { "@type": "MedicalIndication", name: "Kopfschmerzen und Migräne" },
    { "@type": "MedicalIndication", name: "Stressbedingte Beschwerden" },
    { "@type": "MedicalIndication", name: "Schwindel und Gleichgewichtsstörungen" },
    { "@type": "MedicalIndication", name: "Tinnitus" },
    { "@type": "MedicalIndication", name: "Schlafstörungen" },
    { "@type": "MedicalIndication", name: "Nacken- und Rückenverspannungen" },
  ],
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://www.osteoalsen.de/behandlungen/kraniosakrale-osteopathie",
  },
};

export default function KraniosakraleOsteopathiePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(therapySchema) }}
      />
      <FAQSchema
        faqs={[
          {
            question: "Was ist kraniosakrale Osteopathie?",
            answer:
              "Kraniosakrale Osteopathie ist ein sanfter, manueller Behandlungsansatz innerhalb der Osteopathie. Sie arbeitet mit dem craniosacralen System — dem Zusammenspiel von Schädel (Cranium), Wirbelsäule, Kreuzbein (Sacrum), den umhüllenden Membranen und der Gehirn-Rückenmarks-Flüssigkeit (Liquor). Mit sehr leichtem Druck — oft kaum mehr als das Gewicht einer Münze — werden Spannungen in diesem System adressiert. Die Technik wurde im frühen 20. Jahrhundert von William Sutherland entwickelt und ist heute ein etablierter Teil der osteopathischen Ausbildung.",
          },
          {
            question: "Für welche Beschwerden ist kraniosakrale Osteopathie geeignet?",
            answer:
              "Kraniosakrale Osteopathie kann bei verschiedenen Beschwerden eine sinnvolle ergänzende Option sein: Kopfschmerzen und Migräne, stressbedingte Verspannungen, Schwindel, Tinnitus, Schlafstörungen, Nacken- und Rückenbeschwerden sowie Kieferprobleme (CMD). Der individuelle Verlauf ist unterschiedlich und nicht vorhersagbar. Die Behandlung wird idealerweise als Teil eines ganzheitlichen Therapieplans verstanden und ersetzt keine ärztliche Diagnostik.",
          },
          {
            question: "Wie fühlt sich eine kraniosakrale Behandlung an?",
            answer:
              "Die Behandlung ist sehr sanft und angenehm — viele Patient:innen empfinden sie als tief entspannend. Der Therapeut legt die Hände mit minimalem Druck auf Kopf, Nacken, Kreuzbein oder andere Körperbereiche und lauscht subtilen Bewegungsrhythmen. Viele Patient:innen entspannen sich tief oder schlafen sogar ein. Gelegentlich können feine Wärme- oder Kribbel-Empfindungen wahrgenommen werden — das sind normale Reaktionen des sich regulierenden Nervensystems.",
          },
          {
            question: "Was ist der Unterschied zwischen Kraniosakraler Osteopathie und klassischer Osteopathie?",
            answer:
              "Beide Ansätze gehören zur Osteopathie und werden oft kombiniert. Der Hauptunterschied liegt in der Intensität: Klassische (parietale) Osteopathie arbeitet direkter mit Gelenken, Muskeln und Faszien — mit spürbarem Druck, manchmal auch Mobilisationen. Kraniosakrale Osteopathie ist deutlich sanfter und arbeitet mit subtilen Rhythmen des Nervensystems. In der Behandlung wähle ich je nach Befund und Beschwerdebild die passenden Techniken — oft eine Kombination aus beiden Ansätzen.",
          },
          {
            question: "Wie viele Behandlungen brauche ich?",
            answer:
              "Das hängt von der Art und Dauer Ihrer Beschwerden ab. Bei akuten Verspannungen oder einmaligen stressbedingten Beschwerden können 2–3 Sitzungen sinnvoll sein. Bei chronischen Beschwerden wie wiederkehrenden Kopfschmerzen oder Schlafproblemen empfehle ich 4–6 Behandlungen über 2–3 Monate. Der individuelle Verlauf ist unterschiedlich — wir besprechen nach der Erstbehandlung gemeinsam das weitere Vorgehen.",
          },
          {
            question: "Ist kraniosakrale Osteopathie wissenschaftlich belegt?",
            answer:
              "Die Studienlage zur kraniosakralen Osteopathie ist noch im Aufbau. Es gibt positive Hinweise aus klinischen Studien, besonders bei Kopfschmerzen, Nacken- und Rückenschmerzen sowie stressbedingten Beschwerden. Die Forschung ist methodisch herausfordernd, da sich sehr sanfte manuelle Techniken schwer in klassischen Doppelblind-Designs testen lassen. Die kraniosakrale Osteopathie ist Teil der regulären osteopathischen Ausbildung (VFO-Standard) und wird von vielen Fachgesellschaften als ergänzende Methode anerkannt.",
          },
        ]}
      />
      <Breadcrumbs
        items={[
          { label: "Behandlungen", href: "/behandlungen" },
          { label: "Kraniosakrale Osteopathie" },
        ]}
      />

      <TreatmentHero
        subtitle="Osteopathische Behandlung"
        title="Kraniosakrale Osteopathie"
        description="Sehr sanfte osteopathische Technik, die mit dem craniosacralen System arbeitet — bei Kopfschmerzen, Stress, Schwindel und Verspannungen in Hamburg."
      />

      <article className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-epilogue">
              Was ist kraniosakrale Osteopathie?
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-700 leading-relaxed mb-4">
                Kraniosakrale Osteopathie ist ein sehr sanfter, manueller Behandlungsansatz, der mit dem <strong>craniosacralen System</strong> arbeitet — dem Zusammenspiel von Schädel (<em>Cranium</em>), Wirbelsäule und Kreuzbein (<em>Sacrum</em>), den umhüllenden Membranen (Hirnhäute / Meningen) sowie der Gehirn-Rückenmarks-Flüssigkeit (Liquor cerebrospinalis).
              </p>
              <p className="text-slate-700 leading-relaxed mb-4">
                Die Technik wurde zu Beginn des 20. Jahrhunderts vom amerikanischen Osteopathen William Garner Sutherland entwickelt. Er beschrieb eine subtile, rhythmische Bewegung im Schädelbereich — den <strong>craniosacralen Rhythmus</strong> — und beobachtete, dass Störungen in diesem System mit verschiedenen Beschwerden einhergehen können. Heute ist die kraniosakrale Osteopathie ein fester Bestandteil der osteopathischen Ausbildung in Deutschland (VFO-Standard) und wird als Teil eines ganzheitlichen Behandlungsansatzes eingesetzt.
              </p>
              <p className="text-slate-700 leading-relaxed mb-4">
                Das Besondere: Die Behandlung erfolgt mit minimalem Druck — oft kaum mehr als das Gewicht einer 5-Cent-Münze. Diese Sanftheit macht die Methode besonders geeignet für sensible Patient:innen und als Ergänzung bei Beschwerden, bei denen stärkere Techniken zu intensiv wären.
              </p>
            </div>
          </section>

          <section className="mb-16 bg-slate-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-epilogue">
              Das craniosacrale System
            </h2>
            <div className="space-y-6">
              <p className="text-slate-700 leading-relaxed">
                Um zu verstehen, was bei einer kraniosakralen Behandlung passiert, hilft ein Blick auf die Anatomie:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="text-2xl">🧠</span> Schädel (Cranium)
                  </h3>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    Der Schädel besteht aus mehreren Knochen, die durch <strong>Suturen</strong> (Schädelnähte) verbunden sind. Diese Nähte sind nicht starr — sie erlauben minimale Mikrobewegungen, die für die Gesundheit des zentralen Nervensystems relevant sind. Spannungen oder Blockaden in den Suturen können sich auf das gesamte craniosacrale System auswirken.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="text-2xl">💧</span> Liquor cerebrospinalis
                  </h3>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    Die Gehirn-Rückenmarks-Flüssigkeit umhüllt und schützt das Gehirn und Rückenmark. Sie pulsiert in einem eigenen Rhythmus — dem <strong>craniosacralen Rhythmus</strong> (8–12 Zyklen/Minute). Störungen in Produktion, Zirkulation oder Resorption des Liquors können verschiedene Beschwerden begünstigen.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="text-2xl">🩹</span> Hirnhäute (Meningen)
                  </h3>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    Drei Membranen umhüllen Gehirn und Rückenmark: Dura mater (außen, hart), Arachnoidea (mittig) und Pia mater (innen). Die Dura mater verbindet Schädel und Kreuzbein — Spannungen an einem Ende übertragen sich auf das andere. Das <strong>Tentorium cerebelli</strong>, eine Membranfalte im Schädel, ist besonders relevant bei Kopfschmerzen.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="text-2xl">🦴</span> Kreuzbein (Sacrum)
                  </h3>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    Das Kreuzbein am unteren Ende der Wirbelsäule ist durch die Dura mater direkt mit der Schädelbasis verbunden. Es bewegt sich synchron mit dem craniosacralen Rhythmus. <Link href="/behandlungen/rueckenschmerzen/" className="text-slate-800 hover:text-slate-900 underline">Rücken- oder Beckenbeschwerden</Link> können sich daher auf das gesamte craniosacrale System auswirken — und umgekehrt.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-epilogue">
              Bei welchen Beschwerden kann kraniosakrale Osteopathie eingesetzt werden?
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-700 leading-relaxed mb-6">
                Kraniosakrale Osteopathie ist kein Allheilmittel — sie ist eine sanfte Ergänzung, die in bestimmten Situationen sinnvoll eingesetzt werden kann. Ich nutze sie als Teil eines ganzheitlichen Behandlungsplans, oft kombiniert mit anderen osteopathischen Techniken.
              </p>

              <div className="space-y-4">
                <div className="bg-white border-l-4 border-slate-900 pl-6 py-4">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Kopfschmerzen & Migräne
                  </h3>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    Ein häufiges Einsatzgebiet. Spannungen an der Schädelbasis, in den Suturen oder im Tentoriumbereich können <Link href="/behandlungen/kopfschmerzen-migraene/" className="text-slate-800 hover:text-slate-900 underline">Kopfschmerzen und Migräne</Link> begünstigen. Kraniosakrale Techniken an diesen Strukturen können Spannungen im craniosacralen System adressieren. Viele Patient:innen berichten nach der Behandlung von Erleichterung; der individuelle Verlauf ist unterschiedlich.
                  </p>
                </div>

                <div className="bg-white border-l-4 border-slate-900 pl-6 py-4">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Stress & Nervensystem-Dysregulation
                  </h3>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    Bei chronischem <Link href="/behandlungen/stress-burnout/" className="text-slate-800 hover:text-slate-900 underline">Stress und Erschöpfung</Link> ist das vegetative Nervensystem aus dem Gleichgewicht geraten — zu viel Sympathikus, zu wenig Parasympathikus. Die sehr sanfte kraniosakrale Arbeit kann das Nervensystem in Richtung Entspannung (Parasympathikus) begleiten. Viele Patient:innen empfinden die Behandlung als tief entspannend.
                  </p>
                </div>

                <div className="bg-white border-l-4 border-slate-900 pl-6 py-4">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Schwindel & Gleichgewichtsstörungen
                  </h3>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    Das Gleichgewichtsorgan im Innenohr und seine neuralen Verbindungen laufen über Strukturen, die beim kraniosakralen Ansatz adressiert werden können — besonders das Schläfenbein (Os temporale), in dem das Innenohr liegt. Bei Schwindel ohne klare medizinische Ursache kann ein Versuch mit kraniosakraler Behandlung sinnvoll sein. Vorab sollte eine ärztliche Abklärung erfolgen.
                  </p>
                </div>

                <div className="bg-white border-l-4 border-slate-900 pl-6 py-4">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Tinnitus
                  </h3>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    Tinnitus ohne organische Ursache (idiopathisch) kann mit Spannungen im Bereich des Schläfenbeins, der Kiefermuskulatur oder der Halswirbelsäule zusammenhängen. Kraniosakrale Techniken an diesen Strukturen — ergänzt durch <Link href="/behandlungen/nackenschmerzen/" className="text-slate-800 hover:text-slate-900 underline">Nackenbehandlung</Link> — können unterstützend eingesetzt werden. Auch hier gilt: ärztliche Abklärung zuerst.
                  </p>
                </div>

                <div className="bg-white border-l-4 border-slate-900 pl-6 py-4">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Schlafstörungen
                  </h3>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    Chronische Schlafprobleme gehen oft mit Überaktivierung des Sympathikus einher. Die entspannende Wirkung der kraniosakralen Behandlung auf das Nervensystem kann in einigen Fällen schlafunterstützend wirken — besonders wenn Schlafstörungen stressbezogen sind.
                  </p>
                </div>

                <div className="bg-white border-l-4 border-slate-900 pl-6 py-4">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Nacken- & Rückenverspannungen
                  </h3>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    Bei <Link href="/behandlungen/nackenschmerzen/" className="text-slate-800 hover:text-slate-900 underline">Nackenschmerzen</Link> und <Link href="/behandlungen/rueckenschmerzen/" className="text-slate-800 hover:text-slate-900 underline">Rückenbeschwerden</Link> setze ich kraniosakrale Techniken ergänzend zu parietalen Methoden ein — besonders bei sehr verspannten oder sensiblen Patient:innen, für die stärkere Techniken zu intensiv wären.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-epilogue">
              Wie läuft eine kraniosakrale Behandlung ab?
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <div className="flex-1 border-l-4 border-slate-900 pl-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                    Anamnese & Einschätzung
                  </h3>
                  <p className="text-slate-700">
                    Zunächst erfasse ich Ihre Beschwerden, Vorgeschichte und bisherige Behandlungen. Ich frage gezielt nach: Beginn, Lokalisation, auslösenden Faktoren, Schlafqualität und Stressbelastung. Vor der ersten Behandlung steht immer eine gründliche Untersuchung. Mehr zum <Link href="/kosten-ablauf/" className="text-slate-800 hover:text-slate-900 underline">Ablauf und den Kosten</Link>.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <div className="flex-1 border-l-4 border-slate-900 pl-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                    Erspüren des craniosacralen Rhythmus
                  </h3>
                  <p className="text-slate-700">
                    Sie liegen vollständig bekleidet auf der Liege. Ich lege die Hände mit sehr leichtem Druck auf verschiedene Körperstellen — meist beginnend am Kreuzbein oder den Füßen. Ich erspüre den craniosacralen Rhythmus und identifiziere Bereiche, in denen die Bewegung eingeschränkt oder asymmetrisch ist.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <div className="flex-1 border-l-4 border-slate-900 pl-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                    Sanfte Behandlung der Spannungsbereiche
                  </h3>
                  <p className="text-slate-700">
                    Mit sehr leichtem, gehaltenem Druck — oft kaum spürbar — begleite ich die Strukturen des craniosacralen Systems. Ziel ist es, Spannungen in den Membranen, Suturen oder am Kreuzbein zu lösen und den Rhythmus zu harmonisieren. Die Behandlung dauert 45–60 Minuten. Viele Patient:innen entspannen tief oder schlafen ein.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  4
                </div>
                <div className="flex-1 border-l-4 border-slate-900 pl-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                    Nachruhe & Nachsorge
                  </h3>
                  <p className="text-slate-700">
                    Nach der Behandlung empfehle ich kurze Ruhe — gehen Sie wenn möglich nicht direkt in stressige Situationen. In den ersten 24–48 Stunden können Erstreaktionen auftreten: leichte Müdigkeit, ein Gefühl von Schwere oder selten eine kurzfristige Verstärkung der Beschwerden. Das ist normal und klingt ab. Viele Patient:innen berichten anschließend von einem Gefühl tiefer Entspannung.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-epilogue">
              Wissenschaftliche Einordnung
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-700 leading-relaxed mb-4">
                Die kraniosakrale Osteopathie ist innerhalb der manuellen Therapien eine der umstritteneren Methoden — nicht wegen fehlender Praxiserfahrungen, sondern wegen der Schwierigkeit, sehr sanfte Techniken in klassischen Studiendesigns zu testen.
              </p>

              <div className="bg-slate-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Was die Forschung zeigt</h3>
                <ul className="space-y-3 text-slate-700">
                  <li>
                    <strong>Kopfschmerzen:</strong> Mehrere kleinere Studien und klinische Erfahrungsberichte deuten auf eine positive Begleitung bei Spannungskopfschmerzen und Migräne hin. Ein Teil der beobachteten Wirkung dürfte auf die tiefe Entspannung und die Reduktion von Muskelverspannungen zurückzuführen sein.
                  </li>
                  <li>
                    <strong>Stressreduktion:</strong> Die Aktivierung des Parasympathikus durch sanfte Berührung ist gut dokumentiert. Viele Patient:innen berichten nach kraniosakralen Behandlungen von einem tiefen Entspannungszustand.
                  </li>
                  <li>
                    <strong>Nacken- und Rückenschmerzen:</strong> Als Ergänzung zu anderen osteopathischen Techniken zeigt die kombinierte Anwendung in Studien positive Effekte.
                  </li>
                  <li>
                    <strong>Forschungsbedarf:</strong> Es fehlen noch große, methodisch hochwertige Studien, die spezifisch die kraniosakrale Osteopathie isoliert untersuchen. Das liegt auch an der methodischen Herausforderung: Ein „Placebo" für eine sehr sanfte Berührungstechnik ist schwer zu gestalten.
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Meine Einschätzung als Osteopath</h3>
                <p className="text-slate-700 leading-relaxed">
                  Ich setze kraniosakrale Techniken dann ein, wenn sie zum Befund passen — nicht als Pauschalbehandlung für jeden. Sie sind besonders sinnvoll bei Patient:innen mit hoher Stressbelastung, sensiblem Nervensystem oder nach Traumata, bei denen stärkere Techniken zu intensiv wären. Als alleinige Methode ist sie selten ausreichend; als Teil eines ganzheitlichen osteopathischen Behandlungsplans kann sie wertvoll sein. Mehr zu meinem <Link href="/was-ist-osteopathie/" className="text-slate-800 hover:text-slate-900 underline">ganzheitlichen osteopathischen Ansatz</Link>.
                </p>
              </div>

              <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 mt-6">
                <h3 className="text-lg font-semibold text-red-900 mb-3">Wann ist kraniosakrale Osteopathie nicht geeignet?</h3>
                <p className="text-slate-700 text-sm mb-3">
                  In folgenden Situationen sollte auf kraniosakrale Behandlungen verzichtet oder vorher ärztlich abgeklärt werden:
                </p>
                <ul className="space-y-2 text-slate-700 text-sm list-disc ml-6">
                  <li><strong>Frische Schädel- oder Wirbelfrakturen</strong> — direkte Arbeit an diesen Strukturen ist kontraindiziert</li>
                  <li><strong>Akute ZNS-Entzündungen</strong> (Meningitis, Enzephalitis) — erfordert sofortige ärztliche Behandlung</li>
                  <li><strong>Intrakranielle Aneurysmen</strong> oder bekannte Gefäßfehlbildungen im Schädelbereich — vorher Abklärung mit behandelndem Arzt</li>
                  <li><strong>Direkt nach neurochirurgischen Eingriffen</strong> — Wartezeit und ärztliche Freigabe erforderlich</li>
                  <li><strong>Akuter Schlaganfall oder TIA</strong> — keine manuelle Behandlung, sofortige notfallmedizinische Versorgung</li>
                </ul>
                <p className="text-slate-700 text-sm mt-3 font-medium">
                  Bei Unsicherheit besprechen wir vor der ersten Behandlung gemeinsam Ihre Situation — im Zweifel holen wir eine ärztliche Einschätzung ein.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 font-epilogue">
              Häufig gestellte Fragen
            </h2>
            <div className="space-y-4">
              <details className="bg-white border-2 border-slate-200 rounded-xl p-6 group hover:border-slate-400 hover:shadow-lg transition-all duration-300">
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center gap-4">
                  <span className="flex items-center gap-3">
                    <span className="text-2xl">❓</span>
                    Was ist kraniosakrale Osteopathie?
                  </span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform duration-300 flex-shrink-0">▼</span>
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed pl-11">
                  Kraniosakrale Osteopathie ist ein sanfter, manueller Behandlungsansatz innerhalb der Osteopathie. Sie arbeitet mit dem craniosacralen System — dem Zusammenspiel von Schädel (Cranium), Wirbelsäule, Kreuzbein (Sacrum), den umhüllenden Membranen und der Gehirn-Rückenmarks-Flüssigkeit (Liquor). Mit sehr leichtem Druck — oft kaum mehr als das Gewicht einer Münze — werden Spannungen in diesem System adressiert. Die Technik wurde im frühen 20. Jahrhundert von William Sutherland entwickelt und ist heute ein etablierter Teil der osteopathischen Ausbildung.
                </p>
              </details>

              <details className="bg-white border-2 border-slate-200 rounded-xl p-6 group hover:border-slate-400 hover:shadow-lg transition-all duration-300">
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center gap-4">
                  <span className="flex items-center gap-3">
                    <span className="text-2xl">🩺</span>
                    Für welche Beschwerden ist kraniosakrale Osteopathie geeignet?
                  </span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform duration-300 flex-shrink-0">▼</span>
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed pl-11">
                  Kraniosakrale Osteopathie kann bei verschiedenen Beschwerden eine sinnvolle ergänzende Option sein: Kopfschmerzen und Migräne, stressbedingte Verspannungen, Schwindel, Tinnitus, Schlafstörungen, Nacken- und Rückenbeschwerden sowie Kieferprobleme (CMD). Der individuelle Verlauf ist unterschiedlich und nicht vorhersagbar. Die Behandlung wird idealerweise als Teil eines ganzheitlichen Therapieplans verstanden und ersetzt keine ärztliche Diagnostik.
                </p>
              </details>

              <details className="bg-white border-2 border-slate-200 rounded-xl p-6 group hover:border-slate-400 hover:shadow-lg transition-all duration-300">
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center gap-4">
                  <span className="flex items-center gap-3">
                    <span className="text-2xl">🤲</span>
                    Wie fühlt sich eine kraniosakrale Behandlung an?
                  </span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform duration-300 flex-shrink-0">▼</span>
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed pl-11">
                  Die Behandlung ist sehr sanft und angenehm — viele Patient:innen empfinden sie als tief entspannend. Der Therapeut legt die Hände mit minimalem Druck auf Kopf, Nacken, Kreuzbein oder andere Körperbereiche und lauscht subtilen Bewegungsrhythmen. Viele Patient:innen entspannen sich tief oder schlafen sogar ein. Gelegentlich können feine Wärme- oder Kribbel-Empfindungen wahrgenommen werden — das sind normale Reaktionen des sich regulierenden Nervensystems.
                </p>
              </details>

              <details className="bg-white border-2 border-slate-200 rounded-xl p-6 group hover:border-slate-400 hover:shadow-lg transition-all duration-300">
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center gap-4">
                  <span className="flex items-center gap-3">
                    <span className="text-2xl">🔄</span>
                    Was ist der Unterschied zu klassischer Osteopathie?
                  </span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform duration-300 flex-shrink-0">▼</span>
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed pl-11">
                  Beide Ansätze gehören zur Osteopathie und werden oft kombiniert. Der Hauptunterschied liegt in der Intensität: Klassische (parietale) Osteopathie arbeitet direkter mit Gelenken, Muskeln und Faszien — mit spürbarem Druck, manchmal auch Mobilisationen. Kraniosakrale Osteopathie ist deutlich sanfter und arbeitet mit subtilen Rhythmen des Nervensystems. In der Behandlung wähle ich je nach Befund und Beschwerdebild die passenden Techniken — oft eine Kombination aus beiden Ansätzen.
                </p>
              </details>

              <details className="bg-white border-2 border-slate-200 rounded-xl p-6 group hover:border-slate-400 hover:shadow-lg transition-all duration-300">
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center gap-4">
                  <span className="flex items-center gap-3">
                    <span className="text-2xl">📅</span>
                    Wie viele Behandlungen brauche ich?
                  </span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform duration-300 flex-shrink-0">▼</span>
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed pl-11">
                  Das hängt von der Art und Dauer Ihrer Beschwerden ab. Bei akuten Verspannungen oder einmaligen stressbedingten Beschwerden können 2–3 Sitzungen sinnvoll sein. Bei chronischen Beschwerden wie wiederkehrenden Kopfschmerzen oder Schlafproblemen empfehle ich 4–6 Behandlungen über 2–3 Monate. Der individuelle Verlauf ist unterschiedlich — wir besprechen nach der Erstbehandlung gemeinsam das weitere Vorgehen.
                </p>
              </details>

              <details className="bg-white border-2 border-slate-200 rounded-xl p-6 group hover:border-slate-400 hover:shadow-lg transition-all duration-300">
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center gap-4">
                  <span className="flex items-center gap-3">
                    <span className="text-2xl">🔬</span>
                    Ist kraniosakrale Osteopathie wissenschaftlich belegt?
                  </span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform duration-300 flex-shrink-0">▼</span>
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed pl-11">
                  Die Studienlage zur kraniosakralen Osteopathie ist noch im Aufbau. Es gibt positive Hinweise aus klinischen Studien, besonders bei Kopfschmerzen, Nacken- und Rückenschmerzen sowie stressbedingten Beschwerden. Die Forschung ist methodisch herausfordernd, da sich sehr sanfte manuelle Techniken schwer in klassischen Doppelblind-Designs testen lassen. Die kraniosakrale Osteopathie ist Teil der regulären osteopathischen Ausbildung (VFO-Standard) und wird von vielen Fachgesellschaften als ergänzende Methode anerkannt.
                </p>
              </details>
            </div>
          </section>

          <section className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 font-epilogue">
              Weitere Behandlungsgebiete
            </h2>
            <p className="text-slate-700 mb-6 text-sm">
              Kraniosakrale Osteopathie wird oft kombiniert mit:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/behandlungen/kopfschmerzen-migraene/"
                className="text-slate-700 hover:text-slate-900 underline text-sm flex items-center gap-2"
              >
                <span>→</span> Kopfschmerzen & Migräne
              </Link>
              <Link
                href="/behandlungen/stress-burnout/"
                className="text-slate-700 hover:text-slate-900 underline text-sm flex items-center gap-2"
              >
                <span>→</span> Stress & Burnout
              </Link>
              <Link
                href="/behandlungen/nackenschmerzen/"
                className="text-slate-700 hover:text-slate-900 underline text-sm flex items-center gap-2"
              >
                <span>→</span> Nackenschmerzen
              </Link>
              <Link
                href="/behandlungen/rueckenschmerzen/"
                className="text-slate-700 hover:text-slate-900 underline text-sm flex items-center gap-2"
              >
                <span>→</span> Rückenschmerzen
              </Link>
              <Link
                href="/was-ist-osteopathie/"
                className="text-slate-700 hover:text-slate-900 underline text-sm flex items-center gap-2"
              >
                <span>→</span> Was ist Osteopathie?
              </Link>
              <Link
                href="/behandlungen/"
                className="text-slate-700 hover:text-slate-900 underline text-sm flex items-center gap-2"
              >
                <span>→</span> Alle Behandlungen im Überblick
              </Link>
            </div>
          </section>

        </div>
      </article>

      <section className="py-16 px-4 sm:px-6 bg-slate-50">
        <div className="mx-auto max-w-5xl">
          <TreatmentCTA
            title="Kraniosakrale Osteopathie in Hamburg"
            description="Vereinbaren Sie jetzt einen Termin für Ihre kraniosakrale Osteopathie-Behandlung in Hamburg-Rotherbaum oder Eimsbüttel."
          />
        </div>
      </section>
    </>
  );
}
