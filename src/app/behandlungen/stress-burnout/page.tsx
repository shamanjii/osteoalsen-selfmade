import { Metadata } from "next";
import TreatmentHero from "../components/TreatmentHero";
import TreatmentCTA from "../components/TreatmentCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import MedicalConditionSchema from "@/components/MedicalConditionSchema";

export const metadata: Metadata = {
  title: "Stress & Burnout Behandlung Hamburg | Osteopathie",
  description:
    "Osteopathische Behandlung bei Stress, Erschöpfung und Burnout in Hamburg. Regulation des Nervensystems durch sanfte Techniken.",
  keywords: [
    "Burnout Osteopathie Hamburg",
    "Stress Behandlung Osteopath",
    "Erschöpfung Hamburg",
    "Nervensystem Osteopathie",
  ],
  alternates: { canonical: "/behandlungen/stress-burnout" },
  openGraph: {
    title: "Stress & Burnout Behandlung Hamburg | Osteopathie",
    description:
      "Osteopathische Behandlung bei Stress, Erschöpfung und Burnout. Regulation des Nervensystems durch sanfte Techniken.",
    url: "/behandlungen/stress-burnout",
    siteName: "Osteopathie Hamburg - Joshua Alsen",
    images: [
      {
        url: "/assets/joshua-alsen-osteopath-hamburg-og.webp",
        width: 1200,
        height: 630,
        alt: "Stress & Burnout Behandlung - Osteopathie Hamburg",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stress & Burnout Behandlung Hamburg",
    description:
      "Osteopathische Behandlung bei Stress, Erschöpfung und Burnout in Hamburg.",
    images: ["/assets/joshua-alsen-osteopath-hamburg-twitter.webp"],
  },
};

export default function StressBurnoutPage() {
  return (
    <>
      <MedicalConditionSchema
        name="Stress und Burnout"
        description="Stressbedingte Beschwerden, Erschöpfungszustände und Regulation des vegetativen Nervensystems"
        symptoms={[
          "Chronischer Stress",
          "Erschöpfung und Burnout",
          "Schlafstörungen",
          "Verspannungen",
          "Innere Unruhe",
        ]}
        treatmentName="Craniosacrale Osteopathie"
        url="https://www.osteoalsen.de/behandlungen/stress-burnout"
      />
      <Breadcrumbs
        items={[
          { label: "Behandlungen", href: "/behandlungen" },
          { label: "Stress & Burnout" },
        ]}
      />

      <TreatmentHero
        subtitle="Osteopathie für das Nervensystem"
        title="Stress & Burnout"
        description="Behandlung stressbedingter Beschwerden und Erschöpfungszustände durch Regulation des vegetativen Nervensystems."
      />

      <article className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-epilogue">
              Wenn Stress den Körper belastet
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-700 leading-relaxed mb-4">
                Chronischer Stress und Erschöpfung manifestieren sich oft
                körperlich. Viele Betroffene leiden unter:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6">
                <li>Verspannungen in Nacken, Schultern und Rücken</li>
                <li>Schlafstörungen und innere Unruhe</li>
                <li>Kopfschmerzen und Migräne</li>
                <li>Verdauungsbeschwerden</li>
                <li>Herzklopfen und Atembeschwerden</li>
                <li>Erschöpfung und Energielosigkeit</li>
              </ul>
            </div>
          </section>

          <section className="mb-16 bg-slate-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-epilogue">
              Regulation des Nervensystems
            </h2>
            <div className="space-y-4 text-slate-700">
              <p className="leading-relaxed">
                In der Osteopathie arbeiten wir mit dem vegetativen Nervensystem,
                das für Stressreaktion und Entspannung verantwortlich ist:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Craniosacrale Techniken zur Beruhigung</li>
                <li>Faszienarbeit zur Lösung von Spannungen</li>
                <li>Viszerale Behandlung bei Stress-Bauch</li>
                <li>Atemtherapie und Entspannungstechniken</li>
                <li>Verbesserung der Körperwahrnehmung</li>
              </ul>
            </div>
          </section>

          <section className="mb-16 bg-blue-50 border border-blue-200 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-epilogue">
              Behandlung bei Stress & Burnout
            </h2>
            <div className="space-y-4 text-slate-700">
              <p className="leading-relaxed">
                Die Behandlung ist sehr sanft und entspannend. Viele Patienten
                schlafen während der Sitzung ein – ein Zeichen, dass der Körper
                in den Regenerationsmodus schaltet.
              </p>
              <p className="leading-relaxed">
                <strong>Empfohlener Behandlungsplan:</strong> 4-6 Sitzungen im
                Abstand von 1-2 Wochen. Danach oft monatliche Erhaltungsbehandlungen.
              </p>
              <p className="leading-relaxed">
                <strong>Wichtig:</strong> Osteopathie ersetzt keine
                Psychotherapie, kann aber begleitend sehr hilfreich sein.
              </p>
            </div>
          </section>
        </div>
      </article>

      <section className="py-16 px-4 sm:px-6 bg-slate-50">
        <div className="mx-auto max-w-5xl">
          <TreatmentCTA
            title="Stressbedingte Beschwerden behandeln"
            description="Vereinbaren Sie jetzt einen Termin zur Entspannung und Regeneration."
          />
        </div>
      </section>
    </>
  );
}
