import { Metadata } from "next";
import TreatmentHero from "../components/TreatmentHero";
import TreatmentCTA from "../components/TreatmentCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import MedicalConditionSchema from "@/components/MedicalConditionSchema";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Verdauungsbeschwerden Behandlung Hamburg | Viszerale Osteopathie",
  description:
    "Osteopathische Behandlung bei Reizdarm, Blähungen, Verstopfung und Verdauungsproblemen in Hamburg. Viszerale Osteopathie für den Bauchraum.",
  keywords: [
    "Reizdarm Osteopathie Hamburg",
    "Verdauungsbeschwerden Osteopath",
    "Blähungen Behandlung",
    "Viszerale Osteopathie Hamburg",
  ],
  alternates: { canonical: "/behandlungen/verdauungsbeschwerden" },
};

export default function VerdauungPage() {
  return (
    <>
      <MedicalConditionSchema
        name="Verdauungsbeschwerden"
        description="Reizdarm, Blähungen, Verstopfung und funktionelle Verdauungsstörungen durch viszerale Osteopathie"
        symptoms={[
          "Reizdarmsyndrom",
          "Chronische Verstopfung",
          "Blähungen",
          "Sodbrennen und Reflux",
          "Nahrungsmittelunverträglichkeiten",
        ]}
        treatmentName="Viszerale Osteopathie"
        url="https://www.osteoalsen.de/behandlungen/verdauungsbeschwerden"
      />
      <Breadcrumbs
        items={[
          { label: "Behandlungen", href: "/behandlungen" },
          { label: "Verdauungsbeschwerden" },
        ]}
      />

      <TreatmentHero
        subtitle="Viszerale Osteopathie"
        title="Verdauungsbeschwerden"
        description="Sanfte osteopathische Behandlung bei Reizdarm, Blähungen und anderen Verdauungsproblemen."
      />

      <article className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-epilogue">
              Wenn der Bauch Probleme macht
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-700 leading-relaxed mb-4">
                Verdauungsbeschwerden können die Lebensqualität erheblich
                einschränken. Viele Betroffene haben einen langen Leidensweg
                hinter sich, bevor sie zur Osteopathie finden.
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6">
                <li>Reizdarmsyndrom mit Bauchschmerzen und Blähungen</li>
                <li>Chronische Verstopfung oder Durchfall</li>
                <li>Sodbrennen und Reflux</li>
                <li>Nahrungsmittelunverträglichkeiten</li>
                <li>Beschwerden nach Operationen im Bauchraum</li>
                <li>Funktionelle Verdauungsstörungen</li>
              </ul>
            </div>
          </section>

          <section className="mb-16 bg-slate-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-epilogue">
              Viszerale Osteopathie
            </h2>
            <div className="space-y-4 text-slate-700">
              <p className="leading-relaxed">
                Die viszerale Osteopathie behandelt die inneren Organe und ihre
                Beweglichkeit. Durch sanfte manuelle Techniken können wir:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Verklebungen und Spannungen im Bauchraum lösen</li>
                <li>Die Mobilität von Magen, Darm und Leber verbessern</li>
                <li>Die Durchblutung der Bauchorgane fördern</li>
                <li>Das vegetative Nervensystem harmonisieren</li>
                <li>Narben nach Operationen behandeln</li>
              </ul>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-epilogue">
              Behandlungsablauf
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-slate-900 pl-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                  1. Ausführliches Gespräch
                </h3>
                <p className="text-slate-700">
                  Wir besprechen Ihre Beschwerden, Ernährungsgewohnheiten,
                  Stress-Level und Vorerkrankungen. Wichtig: Bringen Sie
                  relevante ärztliche Befunde mit.
                </p>
              </div>

              <div className="border-l-4 border-slate-900 pl-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                  2. Untersuchung des Bauchraums
                </h3>
                <p className="text-slate-700">
                  Ich taste vorsichtig den Bauchraum ab und prüfe die
                  Beweglichkeit der Organe sowie Spannungen im Gewebe.
                </p>
              </div>

              <div className="border-l-4 border-slate-900 pl-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                  3. Sanfte viszerale Behandlung
                </h3>
                <p className="text-slate-700">
                  Mit sehr sanften Techniken behandle ich die Bauchorgane,
                  Zwerchfell und das umliegende Gewebe. Die Behandlung ist
                  angenehm und entspannend.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16 bg-blue-50 border border-blue-200 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-epilogue">
              Behandlungserfolg
            </h2>
            <div className="space-y-4 text-slate-700">
              <p className="leading-relaxed">
                Bei funktionellen Verdauungsbeschwerden (ohne organische Ursache)
                zeigt Osteopathie oft gute Erfolge. Empfohlen sind 4-6
                Behandlungen im Abstand von 2-3 Wochen.
              </p>
              <p className="leading-relaxed">
                <strong>Wichtig:</strong> Osteopathie ersetzt keine medizinische
                Diagnostik. Bei unklaren Bauchschmerzen, Gewichtsverlust oder
                Blut im Stuhl sollte zunächst ein Arzt konsultiert werden.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-epilogue">
              Verwandte Behandlungen
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/behandlungen/stress-burnout"
                className="border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-semibold text-slate-900 mb-2">
                  🧘 Stress & Burnout
                </h3>
                <p className="text-slate-600 text-sm">
                  Stress beeinflusst die Verdauung
                </p>
              </Link>
              <Link
                href="/behandlungen/rueckenschmerzen"
                className="border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-semibold text-slate-900 mb-2">
                  🦴 Rückenschmerzen
                </h3>
                <p className="text-slate-600 text-sm">
                  Bauch und Rücken hängen zusammen
                </p>
              </Link>
            </div>
          </section>
        </div>
      </article>

      <section className="py-16 px-4 sm:px-6 bg-slate-50">
        <div className="mx-auto max-w-5xl">
          <TreatmentCTA
            title="Verdauungsbeschwerden behandeln"
            description="Vereinbaren Sie jetzt einen Termin für viszerale Osteopathie."
          />
        </div>
      </section>
    </>
  );
}
