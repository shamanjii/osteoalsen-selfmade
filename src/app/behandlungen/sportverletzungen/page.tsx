import { Metadata } from "next";
import TreatmentHero from "../components/TreatmentHero";
import TreatmentCTA from "../components/TreatmentCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import MedicalConditionSchema from "@/components/MedicalConditionSchema";

export const metadata: Metadata = {
  title: "Sportverletzungen Behandlung Hamburg | Osteopathie für Sportler",
  description:
    "Osteopathische Behandlung bei Sportverletzungen in Hamburg. Zerrungen, Überlastung, Prävention. Schnelle Regeneration für Sportler.",
  keywords: [
    "Sportverletzung Osteopathie Hamburg",
    "Osteopath Sportler Hamburg",
    "Zerrung Behandlung",
    "Überlastung Osteopathie",
  ],
  alternates: { canonical: "/behandlungen/sportverletzungen" },
};

export default function SportverletzungenPage() {
  return (
    <>
      <MedicalConditionSchema
        name="Sportverletzungen"
        description="Muskelzerrungen, Überlastungssyndrome und Rehabilitation bei Sportverletzungen für Freizeit- und Leistungssportler"
        symptoms={[
          "Muskelzerrungen",
          "Überlastungssyndrome",
          "Sehnenreizungen",
          "Gelenkblockaden",
          "Verzögerte Regeneration",
        ]}
        treatmentName="Sportosteopathie"
        url="https://www.osteoalsen.de/behandlungen/sportverletzungen"
      />
      <Breadcrumbs
        items={[
          { label: "Behandlungen", href: "/behandlungen" },
          { label: "Sportverletzungen" },
        ]}
      />

      <TreatmentHero
        subtitle="Osteopathie für Sportler"
        title="Sportverletzungen"
        description="Schnelle Regeneration und Prävention bei Sportverletzungen für Freizeit- und Leistungssportler."
      />

      <article className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-epilogue">
              Sportbedingte Beschwerden
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-700 leading-relaxed mb-4">
                Als Sportler kennen Sie das: Eine falsche Bewegung, zu viel
                Training oder unzureichende Regeneration führen zu Beschwerden.
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6">
                <li>Muskelzerrungen und -faserrisse</li>
                <li>Überlastungssyndrome (Läuferknie, Tennisarm, etc.)</li>
                <li>Sehnenreizungen und -entzündungen</li>
                <li>Gelenkblockaden und Bewegungseinschränkungen</li>
                <li>Verzögerte Regeneration nach Wettkämpfen</li>
                <li>Prävention vor wichtigen Wettkämpfen</li>
              </ul>
            </div>
          </section>

          <section className="mb-16 bg-slate-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-epilogue">
              Osteopathie für Sportler
            </h2>
            <div className="space-y-4 text-slate-700">
              <p className="leading-relaxed">
                Osteopathie unterstützt Sportler auf verschiedenen Ebenen:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Beschleunigte Regeneration nach Verletzungen</li>
                <li>Verbesserung der Beweglichkeit und Mobilität</li>
                <li>Optimierung biomechanischer Bewegungsabläufe</li>
                <li>Prävention von Überlastungsschäden</li>
                <li>Behandlung chronischer Sportbeschwerden</li>
              </ul>
            </div>
          </section>

          <section className="mb-16 bg-blue-50 border border-blue-200 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-epilogue">
              Behandlung & Regeneration
            </h2>
            <div className="space-y-4 text-slate-700">
              <p className="leading-relaxed">
                <strong>Nach akuten Verletzungen:</strong> Je nach Schweregrad
                kann bereits nach 1-2 Wochen mit der osteopathischen Behandlung
                begonnen werden. Dies unterstützt den Heilungsprozess.
              </p>
              <p className="leading-relaxed">
                <strong>Bei chronischen Überlastungen:</strong> 3-5 Behandlungen
                helfen oft, das Problem nachhaltig zu lösen und die
                Trainingsbelastung anzupassen.
              </p>
              <p className="leading-relaxed">
                <strong>Zur Prävention:</strong> Viele Sportler kommen
                regelmäßig (alle 4-6 Wochen) zur Prophylaxe.
              </p>
            </div>
          </section>
        </div>
      </article>

      <section className="py-16 px-4 sm:px-6 bg-slate-50">
        <div className="mx-auto max-w-5xl">
          <TreatmentCTA
            title="Als Sportler behandeln lassen"
            description="Vereinbaren Sie jetzt einen Termin für optimale Regeneration."
          />
        </div>
      </section>
    </>
  );
}
