import { Metadata } from "next";
import TreatmentHero from "../components/TreatmentHero";
import TreatmentCTA from "../components/TreatmentCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import MedicalConditionSchema from "@/components/MedicalConditionSchema";

export const metadata: Metadata = {
  title: "Schwangerschaft & Postpartal | Osteopathie Hamburg",
  description:
    "Osteopathische Begleitung während und nach der Schwangerschaft in Hamburg. Beckenbodenprobleme, Rückenschmerzen, Geburtsvorbereitung und Rückbildung.",
  keywords: [
    "Schwangerschaft Osteopathie Hamburg",
    "Beckenboden Osteopath",
    "Geburtsvorbereitung Hamburg",
    "Rückbildung Osteopathie",
  ],
  alternates: { canonical: "/behandlungen/schwangerschaft" },
  openGraph: {
    title: "Schwangerschaft & Postpartal | Osteopathie Hamburg",
    description:
      "Osteopathische Begleitung während und nach der Schwangerschaft. Beckenbodenprobleme, Rückenschmerzen, Geburtsvorbereitung.",
    url: "/behandlungen/schwangerschaft",
    siteName: "Osteopathie Hamburg - Joshua Alsen",
    images: [
      {
        url: "/assets/joshua-alsen-osteopath-hamburg-og.webp",
        width: 1200,
        height: 630,
        alt: "Schwangerschaft & Postpartal - Osteopathie Hamburg",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Schwangerschaft & Postpartal | Osteopathie Hamburg",
    description:
      "Osteopathische Begleitung während und nach der Schwangerschaft in Hamburg.",
    images: ["/assets/joshua-alsen-osteopath-hamburg-twitter.webp"],
  },
};

export default function SchwangerschaftPage() {
  return (
    <>
      <MedicalConditionSchema
        name="Schwangerschaft und Postpartale Beschwerden"
        description="Osteopathische Begleitung während der Schwangerschaft und nach der Geburt bei Beckenbodenproblemen, Rückenschmerzen und Rückbildung"
        symptoms={[
          "Rückenschmerzen in der Schwangerschaft",
          "ISG-Blockaden und Beckenschmerzen",
          "Beckenbodenschwäche postpartal",
          "Symphysenschmerzen",
          "Narben nach Kaiserschnitt",
        ]}
        treatmentName="Osteopathie in der Schwangerschaft"
        url="https://www.osteoalsen.de/behandlungen/schwangerschaft"
      />
      <Breadcrumbs
        items={[
          { label: "Behandlungen", href: "/behandlungen" },
          { label: "Schwangerschaft & Postpartal" },
        ]}
      />

      <TreatmentHero
        subtitle="Osteopathie für Schwangere & junge Mütter"
        title="Schwangerschaft & Postpartal"
        description="Sanfte osteopathische Begleitung während der Schwangerschaft und nach der Geburt."
      />

      <article className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-epilogue">
              Begleitung in einer besonderen Zeit
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-700 leading-relaxed mb-4">
                Schwangerschaft und Geburt sind intensive körperliche
                Erfahrungen. Viele Frauen leiden unter:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6">
                <li>Rückenschmerzen und Beckenschmerzen</li>
                <li>ISG-Blockaden</li>
                <li>Symphysenschmerzen (Schambein)</li>
                <li>Sodbrennen und Verdauungsbeschwerden</li>
                <li>Kopfschmerzen</li>
                <li>Atembeschwerden durch Platzmangel</li>
              </ul>
              <p className="text-slate-700 leading-relaxed mb-4">
                <strong>Nach der Geburt:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6">
                <li>Beckenbodenschwäche und Inkontinenz</li>
                <li>Narben (Kaiserschnitt, Dammriss)</li>
                <li>Rückbildungsprobleme</li>
                <li>Stillprobleme und Brustentzündungen</li>
                <li>Erschöpfung und Schlafmangel</li>
              </ul>
            </div>
          </section>

          <section className="mb-16 bg-slate-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-epilogue">
              Osteopathie in der Schwangerschaft
            </h2>
            <div className="space-y-4 text-slate-700">
              <p className="leading-relaxed">
                Die osteopathische Behandlung in der Schwangerschaft ist sehr
                sanft und sicher:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Lösung von Beckenverspannungen</li>
                <li>Mobilisation der Wirbelsäule</li>
                <li>Verbesserung der Durchblutung</li>
                <li>Entspannung des Zwerchfells</li>
                <li>Vorbereitung des Beckens auf die Geburt</li>
              </ul>
              <p className="leading-relaxed mt-4">
                <strong>Ab wann behandelbar:</strong> Ab dem 2. Trimester (nach
                der 12. Schwangerschaftswoche). Bei Risikoschwangerschaften
                bitte vorher mit Ihrem Frauenarzt sprechen.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-epilogue">
              Postpartale Behandlung
            </h2>
            <div className="space-y-4 text-slate-700">
              <p className="leading-relaxed">
                Nach der Geburt unterstütze ich Sie bei der Rückbildung:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Beckenbodentraining und -stabilisierung</li>
                <li>Narbenbehandlung (Kaiserschnitt, Dammriss)</li>
                <li>Rektusdiastase-Behandlung</li>
                <li>Wiederherstellung der Körperstatik</li>
                <li>Behandlung von Stillproblemen</li>
              </ul>
              <p className="leading-relaxed mt-4">
                <strong>Ab wann behandelbar:</strong> Nach vaginaler Geburt ab
                ca. 6 Wochen, nach Kaiserschnitt ab 8-10 Wochen (nach ärztlicher
                Freigabe).
              </p>
            </div>
          </section>

          <section className="mb-16 bg-blue-50 border border-blue-200 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-epilogue">
              Behandlungsempfehlung
            </h2>
            <div className="space-y-4 text-slate-700">
              <p className="leading-relaxed">
                <strong>Während der Schwangerschaft:</strong> Alle 4-6 Wochen
                zur Begleitung und bei akuten Beschwerden.
              </p>
              <p className="leading-relaxed">
                <strong>Nach der Geburt:</strong> 3-5 Behandlungen zur
                Rückbildungsunterstützung, dann nach Bedarf.
              </p>
            </div>
          </section>
        </div>
      </article>

      <section className="py-16 px-4 sm:px-6 bg-slate-50">
        <div className="mx-auto max-w-5xl">
          <TreatmentCTA
            title="Termin für Schwangerschaft & Rückbildung"
            description="Vereinbaren Sie jetzt einen Termin für sanfte osteopathische Begleitung."
          />
        </div>
      </section>
    </>
  );
}
