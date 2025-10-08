import { Metadata } from "next";
import TreatmentHero from "../components/TreatmentHero";
import TreatmentCTA from "../components/TreatmentCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kopfschmerzen & Migräne Behandlung Hamburg | Osteopathie",
  description:
    "Osteopathische Behandlung bei Kopfschmerzen, Migräne und Kieferbeschwerden in Hamburg. Sanfte manuelle Techniken für nachhaltige Linderung. VFO-zertifiziert.",
  keywords: [
    "Migräne Osteopathie Hamburg",
    "Kopfschmerzen Osteopath",
    "Spannungskopfschmerz Behandlung",
    "CMD Osteopathie Hamburg",
    "Kieferschmerzen Osteopath",
  ],
  alternates: { canonical: "/behandlungen/kopfschmerzen-migraene" },
};

export default function KopfschmerzenPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Behandlungen", href: "/behandlungen" },
          { label: "Kopfschmerzen & Migräne" },
        ]}
      />

      <TreatmentHero
        subtitle="Osteopathische Behandlung"
        title="Kopfschmerzen & Migräne"
        description="Sanfte osteopathische Behandlung bei Spannungskopfschmerzen, Migräne und Kieferbeschwerden in Hamburg."
      />

      <article className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-epilogue">
              Wenn der Kopf schmerzt
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-700 leading-relaxed mb-4">
                Kopfschmerzen und Migräne können den Alltag massiv beeinträchtigen.
                Viele Betroffene leiden unter wiederkehrenden Beschwerden und
                sind auf der Suche nach Alternativen zu Schmerzmitteln.
              </p>
              <p className="text-slate-700 leading-relaxed mb-4">
                Häufige Formen von Kopfschmerzen:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6">
                <li>Spannungskopfschmerzen mit dumpfem Druckgefühl</li>
                <li>Migräne mit einseitigen, pulsierenden Schmerzen</li>
                <li>Kieferbezogene Kopfschmerzen (CMD - Craniomandibuläre Dysfunktion)</li>
                <li>Nackenbezogene Kopfschmerzen (zervikogene Kopfschmerzen)</li>
                <li>Clusterkopfschmerzen</li>
              </ul>
            </div>
          </section>

          <section className="mb-16 bg-slate-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-epilogue">
              Der osteopathische Ansatz
            </h2>
            <div className="space-y-4 text-slate-700">
              <p className="leading-relaxed">
                In der Osteopathie suchen wir nach den Ursachen Ihrer Kopfschmerzen.
                Häufig finden sich Spannungen und Bewegungseinschränkungen in:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Nackenmuskulatur und Halswirbelsäule</li>
                <li>Kiefergelenk und Kaumuskulatur</li>
                <li>Schädelnähten und Schädelbasis</li>
                <li>Schulter-Nacken-Bereich</li>
                <li>Nervensystem (vegetative Dysregulation)</li>
              </ul>
              <p className="leading-relaxed mt-4">
                Mit sanften manuellen Techniken lösen wir diese Spannungen und
                verbessern die Durchblutung im Kopfbereich.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-epilogue">
              Ablauf der Behandlung
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-slate-900 pl-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                  1. Detaillierte Kopfschmerz-Anamnese
                </h3>
                <p className="text-slate-700">
                  Wir klären: Wo genau sind die Schmerzen? Wie fühlen sie sich an?
                  Wann treten sie auf? Gibt es Trigger? Wie ist die Intensität?
                </p>
              </div>

              <div className="border-l-4 border-slate-900 pl-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                  2. Untersuchung
                </h3>
                <p className="text-slate-700">
                  Ich untersuche Kopf, Nacken, Kiefer und Wirbelsäule auf
                  Bewegungseinschränkungen, Verspannungen und Triggerpunkte.
                </p>
              </div>

              <div className="border-l-4 border-slate-900 pl-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                  3. Craniosacrale und viszerale Techniken
                </h3>
                <p className="text-slate-700">
                  Mit sehr sanften Techniken behandle ich Schädel, Nacken und
                  Kiefergelenk. Die Behandlung ist entspannend und schmerzfrei.
                </p>
              </div>

              <div className="border-l-4 border-slate-900 pl-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                  4. Selbsthilfe & Prävention
                </h3>
                <p className="text-slate-700">
                  Sie erhalten Übungen zur Entspannung und Tipps zur Vermeidung
                  von Triggern im Alltag.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16 bg-blue-50 border border-blue-200 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-epilogue">
              Behandlungserfolg & Dauer
            </h2>
            <div className="space-y-4 text-slate-700">
              <p className="leading-relaxed">
                <strong>Bei Spannungskopfschmerzen</strong> zeigen sich oft schon
                nach 2-4 Behandlungen deutliche Verbesserungen. Die Häufigkeit und
                Intensität der Kopfschmerzen nimmt ab.
              </p>
              <p className="leading-relaxed">
                <strong>Bei Migräne</strong> benötigen wir mehr Geduld. Hier empfehle
                ich 4-6 Behandlungen. Viele Patienten berichten von reduzierten
                Migräne-Attacken und geringerer Medikamenteneinnahme.
              </p>
              <p className="leading-relaxed">
                <strong>Bei CMD/Kieferproblemen</strong> arbeite ich eng mit
                Zahnärzten und Kieferorthopäden zusammen. Die Behandlung umfasst
                4-6 Sitzungen.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 font-epilogue">
              Häufige Fragen
            </h2>
            <div className="space-y-4">
              <details className="bg-white border border-slate-200 rounded-lg p-6 group">
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center">
                  Kann Osteopathie Migräne heilen?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-slate-700">
                  Migräne ist eine komplexe neurologische Erkrankung. Osteopathie
                  kann die Häufigkeit und Intensität von Migräne-Attacken reduzieren,
                  aber keine Heilung versprechen. Viele Patienten berichten von
                  deutlicher Besserung.
                </p>
              </details>

              <details className="bg-white border border-slate-200 rounded-lg p-6 group">
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center">
                  Sollte ich während einer Migräne-Attacke kommen?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-slate-700">
                  Nein, während einer akuten Attacke ist Ruhe wichtiger. Kommen Sie
                  lieber zwischen den Attacken zur Behandlung, um präventiv zu arbeiten.
                </p>
              </details>

              <details className="bg-white border border-slate-200 rounded-lg p-6 group">
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center">
                  Was kann ich selbst tun?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-slate-700">
                  Führen Sie ein Kopfschmerz-Tagebuch, achten Sie auf Trigger
                  (Stress, Ernährung, Schlaf), machen Sie Entspannungsübungen und
                  halten Sie eine gute Arbeitsplatz-Ergonomie ein.
                </p>
              </details>
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
                  Bei stressbedingten Spannungen
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
                  Bei Nackenverspannungen
                </p>
              </Link>
            </div>
          </section>
        </div>
      </article>

      <section className="py-16 px-4 sm:px-6 bg-slate-50">
        <div className="mx-auto max-w-5xl">
          <TreatmentCTA
            title="Kopfschmerzen behandeln lassen"
            description="Vereinbaren Sie jetzt einen Termin für Ihre osteopathische Behandlung."
          />
        </div>
      </section>
    </>
  );
}
