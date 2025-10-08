import { Metadata } from "next";
import TreatmentHero from "../components/TreatmentHero";
import TreatmentCTA from "../components/TreatmentCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import MedicalConditionSchema from "@/components/MedicalConditionSchema";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rückenschmerzen Behandlung Hamburg | Osteopathie Joshua Alsen",
  description:
    "Osteopathische Behandlung bei Rückenschmerzen in Hamburg. Ganzheitlicher Ansatz bei Bandscheibenproblemen, ISG-Blockaden, Hexenschuss und chronischen Rückenschmerzen. VFO-zertifiziert.",
  keywords: [
    "Rückenschmerzen Osteopathie Hamburg",
    "Osteopath Rückenschmerzen Rotherbaum",
    "Bandscheibenvorfall Hamburg",
    "ISG Blockade Osteopathie",
    "Hexenschuss Behandlung Hamburg",
    "Chronische Rückenschmerzen Osteopath",
  ],
  alternates: { canonical: "/behandlungen/rueckenschmerzen" },
};

export default function RueckenschmerzenPage() {
  return (
    <>
      <MedicalConditionSchema
        name="Rückenschmerzen"
        description="Akute und chronische Rückenschmerzen, Bandscheibenvorfälle, ISG-Blockaden und Verspannungen im unteren Rücken"
        symptoms={[
          "Schmerzen im unteren Rücken",
          "ISG-Blockaden",
          "Bandscheibenprobleme",
          "Hexenschuss",
          "Chronische Verspannungen",
        ]}
        url="https://www.osteoalsen.de/behandlungen/rueckenschmerzen"
      />
      <Breadcrumbs
        items={[
          { label: "Behandlungen", href: "/behandlungen" },
          { label: "Rückenschmerzen" },
        ]}
      />

      <TreatmentHero
        subtitle="Osteopathische Behandlung"
        title="Rückenschmerzen"
        description="Ganzheitliche osteopathische Behandlung bei akuten und chronischen Rückenschmerzen in Hamburg-Rotherbaum & Eimsbüttel."
      />

      {/* Main Content */}
      <article className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Problem Description */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-epilogue">
              Wenn der Rücken schmerzt
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-700 leading-relaxed mb-4">
                Rückenschmerzen gehören zu den häufigsten Beschwerden in unserer
                modernen Gesellschaft. Ob akut nach einer falschen Bewegung
                oder chronisch über Monate und Jahre – die Ursachen sind
                vielfältig und oft nicht auf den ersten Blick erkennbar.
              </p>
              <p className="text-slate-700 leading-relaxed mb-4">
                Viele Menschen leiden unter:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6">
                <li>Verspannungen im unteren Rücken (Lendenwirbelsäule)</li>
                <li>
                  ISG-Blockaden (Iliosakralgelenk) mit ausstrahlenden
                  Schmerzen
                </li>
                <li>
                  Bandscheibenproblemen oder Bandscheibenvorfall
                </li>
                <li>Hexenschuss (Lumbago) mit plötzlichem Bewegungsverlust</li>
                <li>
                  Chronischen Schmerzen nach langjähriger Fehlhaltung oder
                  Überlastung
                </li>
                <li>Schmerzen zwischen den Schulterblättern</li>
              </ul>
            </div>
          </section>

          {/* Osteopathic Approach */}
          <section className="mb-16 bg-slate-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-epilogue">
              Der osteopathische Ansatz
            </h2>
            <div className="space-y-4 text-slate-700">
              <p className="leading-relaxed">
                In der Osteopathie betrachten wir Rückenschmerzen nicht isoliert,
                sondern als Symptom eines größeren Zusammenhangs. Oft liegt die
                Ursache nicht dort, wo der Schmerz empfunden wird.
              </p>
              <p className="leading-relaxed">
                <strong>Mögliche Ursachen aus osteopathischer Sicht:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Bewegungseinschränkungen in Becken, Hüfte oder Füßen
                </li>
                <li>
                  Viszerale Probleme (z.B. Darmverklebungen nach Operationen)
                </li>
                <li>
                  Fasziale Spannungen entlang der gesamten Körperrückseite
                </li>
                <li>
                  Stress und emotionale Belastung mit Auswirkung auf die
                  Muskulatur
                </li>
                <li>
                  Fehlhaltungen durch einseitige Belastung im Alltag oder Beruf
                </li>
              </ul>
            </div>
          </section>

          {/* Treatment Process */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-epilogue">
              Ablauf der Behandlung
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-slate-900 pl-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                  1. Ausführliche Anamnese
                </h3>
                <p className="text-slate-700">
                  Wir besprechen Ihre Beschwerden, den zeitlichen Verlauf,
                  Ihre Krankengeschichte und Ihren Alltag. Wann treten die
                  Schmerzen auf? Was verschlimmert oder verbessert sie?
                </p>
              </div>

              <div className="border-l-4 border-slate-900 pl-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                  2. Körperliche Untersuchung
                </h3>
                <p className="text-slate-700">
                  Ich untersuche Ihre gesamte Körperstatik, Beweglichkeit und
                  Gewebespannung – nicht nur den schmerzenden Bereich. Oft
                  finde ich relevante Einschränkungen in anderen Körperregionen.
                </p>
              </div>

              <div className="border-l-4 border-slate-900 pl-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                  3. Osteopathische Behandlung
                </h3>
                <p className="text-slate-700">
                  Mit sanften manuellen Techniken löse ich Blockaden, mobilisiere
                  eingeschränkte Gelenke und entspanne verspannte Muskulatur.
                  Dabei arbeite ich an Wirbelsäule, Becken, inneren Organen und
                  Faszien.
                </p>
              </div>

              <div className="border-l-4 border-slate-900 pl-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                  4. Individuelle Empfehlungen
                </h3>
                <p className="text-slate-700">
                  Sie erhalten praktische Tipps für den Alltag, Übungen zur
                  Stabilisierung und Hinweise zur Prävention zukünftiger
                  Beschwerden.
                </p>
              </div>
            </div>
          </section>

          {/* Success Outlook */}
          <section className="mb-16 bg-blue-50 border border-blue-200 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-epilogue">
              Behandlungserfolg & Dauer
            </h2>
            <div className="space-y-4 text-slate-700">
              <p className="leading-relaxed">
                <strong>Bei akuten Rückenschmerzen</strong> (Hexenschuss,
                plötzliche Blockade) zeigt sich oft schon nach 1-3 Behandlungen
                eine deutliche Besserung. Die Selbstheilungskräfte des Körpers
                werden aktiviert und die Beschwerden klingen ab.
              </p>
              <p className="leading-relaxed">
                <strong>Bei chronischen Rückenschmerzen</strong> (länger als 3
                Monate) benötigen wir mehr Geduld. Hier empfehle ich meist 4-6
                Behandlungen im Abstand von 2-3 Wochen. Der Körper braucht Zeit,
                um alte Muster zu verändern.
              </p>
              <p className="leading-relaxed">
                <strong>Wichtig:</strong> Osteopathie ersetzt keine ärztliche
                Diagnostik. Bei schweren neurologischen Ausfällen, Unfällen oder
                unklaren Beschwerden sollte vorher ein Arzt konsultiert werden.
              </p>
            </div>
          </section>

          {/* Scientific Basis */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-epilogue">
              Wissenschaftliche Grundlage
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-700 leading-relaxed mb-4">
                Die Wirksamkeit osteopathischer Behandlungen bei Rückenschmerzen
                ist durch verschiedene Studien belegt. Besonders bei
                unspezifischen Rückenschmerzen zeigt Osteopathie gute Erfolge.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Die manuelle Therapie adressiert sowohl strukturelle als auch
                funktionelle Störungen und aktiviert die körpereigenen
                Selbstheilungskräfte. Der ganzheitliche Ansatz berücksichtigt
                biomechanische, viszerale und neurologische Zusammenhänge.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 font-epilogue">
              Häufige Fragen zu Rückenschmerzen
            </h2>
            <div className="space-y-4">
              <details className="bg-white border border-slate-200 rounded-lg p-6 group">
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center">
                  Kann Osteopathie bei Bandscheibenvorfall helfen?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-slate-700">
                  Ja, Osteopathie kann bei Bandscheibenvorfällen unterstützend
                  wirken. Wir können die umliegende Muskulatur entspannen,
                  Druck vom Nerv nehmen und die Durchblutung fördern. Bei
                  schweren Vorfällen mit neurologischen Ausfällen sollte
                  jedoch zuerst eine ärztliche Abklärung erfolgen.
                </p>
              </details>

              <details className="bg-white border border-slate-200 rounded-lg p-6 group">
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center">
                  Ist die Behandlung schmerzhaft?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-slate-700">
                  Die Behandlung sollte nicht schmerzhaft sein. Manche
                  Techniken können zunächst etwas unangenehm sein, wenn
                  verspannte Bereiche gelöst werden, aber ich arbeite immer im
                  Rahmen Ihrer Schmerzgrenze. Nach der Behandlung kann ein
                  Muskelkater-ähnliches Gefühl auftreten, das nach 1-2 Tagen
                  verschwindet.
                </p>
              </details>

              <details className="bg-white border border-slate-200 rounded-lg p-6 group">
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center">
                  Übernimmt die Krankenkasse die Kosten?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-slate-700">
                  Viele private Krankenkassen übernehmen die vollen Kosten.
                  Auch einige gesetzliche Krankenkassen beteiligen sich an
                  osteopathischen Behandlungen (oft 3-6 Sitzungen pro Jahr mit
                  Zuschuss von 40-60€). Informieren Sie sich vorab bei Ihrer
                  Kasse.
                </p>
              </details>
            </div>
          </section>

          {/* Related Treatments */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-epilogue">
              Verwandte Behandlungen
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/behandlungen/sportverletzungen"
                className="border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-semibold text-slate-900 mb-2">
                  ⚽ Sportverletzungen
                </h3>
                <p className="text-slate-600 text-sm">
                  Bei Zerrungen, Überlastung und muskulären Problemen
                </p>
              </Link>
              <Link
                href="/behandlungen/stress-burnout"
                className="border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-semibold text-slate-900 mb-2">
                  🧘 Stress & Burnout
                </h3>
                <p className="text-slate-600 text-sm">
                  Wenn Verspannungen durch Stress entstehen
                </p>
              </Link>
            </div>
          </section>
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 bg-slate-50">
        <div className="mx-auto max-w-5xl">
          <TreatmentCTA
            title="Rückenschmerzen behandeln lassen"
            description="Vereinbaren Sie jetzt einen Termin für Ihre osteopathische Behandlung in Hamburg."
          />
        </div>
      </section>
    </>
  );
}
