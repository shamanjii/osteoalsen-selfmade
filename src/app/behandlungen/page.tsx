import { Metadata } from "next";
import TreatmentCard from "./components/TreatmentCard";
import TreatmentCTA from "./components/TreatmentCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSchema from "@/components/FAQSchema";

export const metadata: Metadata = {
  title: "Osteopathie Behandlungen Hamburg | Joshua Alsen",
  description:
    "Osteopath Hamburg ✓ VFO-zertifiziert ✓ Rücken, Kopf, Verdauung, Sport ✓ 60 Min. ✓ Kassenzuschuss ⭐ Jetzt Termin buchen!",
  keywords: [
    "Osteopathie Hamburg",
    "Osteopath Rotherbaum",
    "Rückenschmerzen Behandlung Hamburg",
    "Kopfschmerzen Osteopathie",
    "Sportverletzung Osteopath",
    "Verdauungsbeschwerden Hamburg",
  ],
  alternates: { canonical: "/behandlungen/" },
  openGraph: {
    title: "Osteopathische Behandlungen Hamburg | Joshua Alsen",
    description:
      "Osteopath Hamburg ✓ VFO-zertifiziert ✓ Rückenschmerzen, Kopfschmerzen, Verdauung, Sport & mehr ✓ 60 Min. Behandlung ✓ 2 Standorte ✓ Kassenzuschuss ⭐ Jetzt Termin buchen!",
    url: "/behandlungen",
    siteName: "Osteopathie Hamburg - Joshua Alsen",
    images: [
      {
        url: "/assets/joshua-alsen-osteopath-hamburg-og.webp",
        width: 1200,
        height: 630,
        alt: "Osteopathische Behandlungen Hamburg - Joshua Alsen",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Osteopathische Behandlungen Hamburg",
    description:
      "Osteopath Hamburg ✓ VFO-zertifiziert ✓ Rücken, Kopf, Verdauung & mehr ✓ 60 Min. ✓ 2 Standorte ✓ Kassenzuschuss möglich ⭐",
    images: ["/assets/joshua-alsen-osteopath-hamburg-twitter.webp"],
  },
};

const treatments = [
  {
    title: "Rückenschmerzen",
    description:
      "Ganzheitliche osteopathische Behandlung bei akuten und chronischen Rückenschmerzen. Von Verspannungen bis Bandscheibenproblematik.",
    href: "/behandlungen/rueckenschmerzen",
    keywords: ["Bandscheibe", "ISG", "Hexenschuss", "Verspannungen"],
  },
  {
    title: "Nackenschmerzen & HWS",
    description:
      "Behandlung von Nackenschmerzen, HWS-Syndrom und Schulter-Nacken-Verspannungen. Sanfte Mobilisation und ganzheitlicher Ansatz.",
    href: "/behandlungen/nackenschmerzen",
    keywords: ["HWS-Syndrom", "Nackenverspannung", "Schulter-Nacken", "Zervikalsyndrom"],
  },
  {
    title: "Kopfschmerzen & Migräne",
    description:
      "Sanfte Behandlung von Spannungskopfschmerzen, Migräne und Kieferbeschwerden durch manuelle Techniken und ganzheitlichen Ansatz.",
    href: "/behandlungen/kopfschmerzen-migraene",
    keywords: ["Migräne", "Spannungskopfschmerz", "CMD", "Kiefergelenk"],
  },
  {
    title: "Arthrose & Gelenkbeschwerden",
    description:
      "Osteopathische Behandlung bei Arthrose, Knie-, Hüft- und Gelenkschmerzen. Schmerzlinderung und Verbesserung der Beweglichkeit.",
    href: "/behandlungen/arthrose-gelenkbeschwerden",
    keywords: ["Arthrose", "Knieschmerzen", "Hüftarthrose", "Gelenkschmerzen"],
  },
  {
    title: "Verdauungsbeschwerden",
    description:
      "Osteopathische Hilfe bei Reizdarm, Blähungen, Verstopfung und anderen Verdauungsproblemen. Viszerale Osteopathie für den Bauchraum.",
    href: "/behandlungen/verdauungsbeschwerden",
    keywords: ["Reizdarm", "Blähungen", "Verstopfung", "Reflux"],
  },
  {
    title: "Sportverletzungen",
    description:
      "Schnelle Regeneration und Prävention bei Sportverletzungen. Von Zerrungen über Überlastung bis zur Wettkampfvorbereitung.",
    href: "/behandlungen/sportverletzungen",
    keywords: ["Zerrung", "Überlastung", "Prävention", "Regeneration"],
  },
  {
    title: "Stress & Burnout",
    description:
      "Behandlung stressbedingter Beschwerden und Erschöpfungszustände. Regulation des vegetativen Nervensystems durch sanfte Techniken.",
    href: "/behandlungen/stress-burnout",
    keywords: ["Erschöpfung", "Burnout", "Nervensystem", "Entspannung"],
  },
];

export default function BehandlungenPage() {
  return (
    <>
      <FAQSchema
        faqs={[
          {
            question: "Wie läuft eine osteopathische Behandlung ab?",
            answer:
              "Die Erstbehandlung beginnt mit einem ausführlichen Gespräch über Ihre Beschwerden und Krankengeschichte. Danach folgt eine körperliche Untersuchung und die eigentliche osteopathische Behandlung. Die gesamte Sitzung dauert 45-60 Minuten.",
          },
          {
            question: "Wie viele Behandlungen sind nötig?",
            answer:
              "Das ist individuell unterschiedlich. Bei akuten Beschwerden reichen oft 2-3 Sitzungen. Chronische Beschwerden können 4-6 oder mehr Behandlungen erfordern. Nach der ersten Sitzung kann ich eine bessere Einschätzung geben.",
          },
          {
            question: "Was kostet eine osteopathische Behandlung?",
            answer:
              "Eine osteopathische Behandlung kostet 150€ (45-60 Minuten). Viele private Krankenkassen und einige gesetzliche Kassen erstatten einen Teil der Kosten.",
          },
          {
            question: "Welche Krankenkassen übernehmen die Kosten?",
            answer:
              "Viele private Krankenkassen übernehmen die vollen Kosten. Auch einige gesetzliche Krankenkassen beteiligen sich an osteopathischen Behandlungen (oft 3-6 Sitzungen pro Jahr mit Zuschuss von 40-60€). Informieren Sie sich vorab bei Ihrer Kasse.",
          },
          {
            question: "Ist Osteopathie für jedes Alter geeignet?",
            answer:
              "Ja, Osteopathie kann in jedem Alter angewendet werden - von Säuglingen über Erwachsene bis zu Senioren. Die Techniken werden individuell an das Alter und die Konstitution angepasst.",
          },
        ]}
      />
      <Breadcrumbs items={[{ label: "Behandlungen" }]} />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 font-epilogue">
              Behandlungsschwerpunkte
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Ganzheitliche osteopathische Behandlungen für verschiedene
              Beschwerdebilder. VFO-zertifizierter Osteopath mit fundierter
              Ausbildung und leidenschaftlicher Betreuung.
            </p>
          </div>

          {/* Treatments Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {treatments.map((treatment) => (
              <TreatmentCard key={treatment.href} {...treatment} />
            ))}
          </div>
        </div>
      </section>

      {/* USP Section */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12 font-epilogue">
            Warum osteopathische Behandlung bei mir?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                VFO-zertifiziert
              </h3>
              <p className="text-slate-600">
                Fundierte BAO-Ausbildung und VFO-Mitgliedschaft mit
                kontinuierlicher Weiterbildung nach höchsten Qualitätsstandards.
              </p>
            </div>
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
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                Kassenerstattung
              </h3>
              <p className="text-slate-600">
                Viele private und gesetzliche Krankenkassen erstatten einen
                Teil der Behandlungskosten.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12 font-epilogue">
            Häufige Fragen zu Behandlungen
          </h2>
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                Wie läuft eine Behandlung ab?
              </h3>
              <p className="text-slate-600">
                Die Erstbehandlung beginnt mit einem ausführlichen Gespräch
                über Ihre Beschwerden und Krankengeschichte. Danach folgt eine
                körperliche Untersuchung und die eigentliche osteopathische
                Behandlung. Die gesamte Sitzung dauert 45-60 Minuten.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                Wie viele Behandlungen sind nötig?
              </h3>
              <p className="text-slate-600">
                Das ist individuell unterschiedlich. Bei akuten Beschwerden
                reichen oft 2-3 Sitzungen. Chronische Beschwerden können 4-6
                oder mehr Behandlungen erfordern. Nach der ersten Sitzung kann
                ich eine bessere Einschätzung geben.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                Was kostet eine Behandlung?
              </h3>
              <p className="text-slate-600">
                Eine osteopathische Behandlung kostet 150€ (45-60 Minuten).
                Viele private Krankenkassen und einige gesetzliche Kassen
                erstatten einen Teil der Kosten. Details finden Sie auf der
                Seite Kosten & Ablauf.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <TreatmentCTA
            title="Bereit für Ihre Behandlung?"
            description="Vereinbaren Sie jetzt einen Termin in meiner Praxis in Hamburg-Rotherbaum oder Eimsbüttel."
          />
        </div>
      </section>
    </>
  );
}
