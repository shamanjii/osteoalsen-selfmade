import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSchema from "@/components/FAQSchema";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import SiteHeader from "@/app/(site)/components/SiteHeader";
import SiteFooter from "@/app/(site)/components/SiteFooter";

export const metadata: Metadata = {
  title: "Heilpraktiker Osteopathie Hamburg | Joshua Alsen | VFO-zertifiziert",
  description:
    "Heilpraktiker für Osteopathie Hamburg ✓ Joshua Alsen ✓ VFO-zertifiziert ✓ BAO-Ausbildung ✓ Ohne Überweisung ✓ Ganzheitliche Behandlung ✓ 2 Standorte ⭐ Jetzt Termin!",
  keywords: [
    "Heilpraktiker Osteopathie Hamburg",
    "Heilpraktiker Hamburg Osteopath",
    "Osteopath Heilpraktiker",
    "Heilpraktiker manuelle Therapie Hamburg",
    "Osteopathie ohne Überweisung Hamburg",
  ],
  alternates: { canonical: "/heilpraktiker-osteopathie-hamburg/" },
  openGraph: {
    title: "Heilpraktiker Osteopathie Hamburg | Joshua Alsen",
    description:
      "Heilpraktiker für Osteopathie ✓ VFO-zertifiziert ✓ Ohne Überweisung ✓ Ganzheitliche Behandlung ⭐",
    url: "/heilpraktiker-osteopathie-hamburg",
    siteName: "Osteopathie Hamburg - Joshua Alsen",
    images: [
      {
        url: "/assets/joshua-alsen-osteopath-hamburg-og.webp",
        width: 1200,
        height: 630,
        alt: "Heilpraktiker Osteopathie Hamburg",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Heilpraktiker Osteopathie Hamburg",
    description: "VFO-zertifiziert ✓ Ohne Überweisung ✓ Ganzheitliche Behandlung",
    images: ["/assets/joshua-alsen-osteopath-hamburg-twitter.webp"],
  },
};

export default function HeilpraktikerOsteopathieHamburgPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <LocalBusinessSchema location="rotherbaum" />
      <main>
        <FAQSchema
          faqs={[
            {
              question: "Was ist ein Heilpraktiker für Osteopathie?",
              answer:
                "Ein Heilpraktiker für Osteopathie hat sowohl die staatliche Heilpraktiker-Prüfung bestanden als auch eine umfassende osteopathische Ausbildung absolviert. Dies ermöglicht eigenverantwortliche Diagnostik und Behandlung ohne ärztliche Verordnung.",
            },
            {
              question: "Brauche ich eine Überweisung zum Heilpraktiker?",
              answer:
                "Nein, als Heilpraktiker kann ich Sie ohne ärztliche Überweisung behandeln. Sie können direkt einen Termin buchen.",
            },
            {
              question: "Ist ein Heilpraktiker für Osteopathie genauso qualifiziert wie ein Arzt?",
              answer:
                "Heilpraktiker sind keine Ärzte, haben aber eine umfassende Ausbildung in Diagnostik und Therapie. VFO-zertifizierte Osteopathen haben zusätzlich 4-5 Jahre Osteopathie-Ausbildung (1350-5000 Std.).",
            },
          ]}
        />
        <Breadcrumbs items={[{ label: "Heilpraktiker Osteopathie Hamburg" }]} />

        {/* Hero */}
        <section className="bg-gradient-to-b from-slate-50 to-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center max-w-4xl mx-auto mb-12">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 font-epilogue leading-tight">
                Heilpraktiker für Osteopathie in Hamburg
              </h1>
              <p className="text-xl sm:text-2xl text-slate-600 leading-relaxed mb-8">
                Staatlich geprüfter Heilpraktiker & VFO-zertifizierter Osteopath.
                Ganzheitliche Behandlung ohne Überweisung in Rotherbaum & Eimsbüttel.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/terminbuchung"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-slate-900 rounded-md hover:bg-slate-800 hover:transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                >
                  📅 Termin buchen
                </Link>
                <a
                  href="tel:+4917643990001"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold border-2 border-slate-900 text-slate-900 rounded-md hover:bg-slate-900 hover:text-white transition-all duration-300"
                >
                  📞 0176 4399 0001
                </a>
              </div>
            </div>

            {/* USP Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6 text-center shadow-sm">
                <div className="text-4xl mb-3">🩺</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                  Heilpraktiker
                </h3>
                <p className="text-slate-600 text-sm">
                  Staatlich geprüft & zugelassen
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-6 text-center shadow-sm">
                <div className="text-4xl mb-3">🎓</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                  VFO-Osteopath
                </h3>
                <p className="text-slate-600 text-sm">
                  BAO-Ausbildung (5000+ Std.)
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-6 text-center shadow-sm">
                <div className="text-4xl mb-3">✅</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                  Ohne Überweisung
                </h3>
                <p className="text-slate-600 text-sm">
                  Direkter Zugang zur Behandlung
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-6 text-center shadow-sm">
                <div className="text-4xl mb-3">💳</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                  Kassenzuschuss
                </h3>
                <p className="text-slate-600 text-sm">
                  40-60€ Erstattung möglich
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Was ist ein Heilpraktiker */}
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight mb-8 font-epilogue">
              Was ist ein Heilpraktiker für Osteopathie?
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-700 leading-relaxed mb-4">
                Als <strong>Heilpraktiker für Osteopathie</strong> vereinen ich zwei wichtige
                Qualifikationen:
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3 font-epilogue flex items-center gap-2">
                    <span className="text-2xl">🩺</span>
                    Heilpraktiker-Zulassung
                  </h3>
                  <p className="text-slate-700 text-sm">
                    Die <strong>staatliche Heilpraktiker-Prüfung</strong> berechtigt mich zur
                    eigenverantwortlichen Ausübung der Heilkunde. Das bedeutet:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 text-sm mt-3">
                    <li>Diagnostik ohne ärztliche Verordnung</li>
                    <li>Eigenverantwortliche Therapieentscheidungen</li>
                    <li>Differenzialdiagnostik (Erkennung von Red Flags)</li>
                    <li>Abrechnung nach GebüH (Gebührenverzeichnis)</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-white border border-blue-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3 font-epilogue flex items-center gap-2">
                    <span className="text-2xl">🎓</span>
                    Osteopathie-Ausbildung
                  </h3>
                  <p className="text-slate-700 text-sm">
                    Meine <strong>5-jährige BAO-Ausbildung</strong> (über 5000 Stunden)
                    umfasst:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 text-sm mt-3">
                    <li>Parietale Osteopathie (Bewegungsapparat)</li>
                    <li>Viszerale Osteopathie (innere Organe)</li>
                    <li>Kraniosakrale Osteopathie</li>
                    <li>VFO-Zertifizierung (Qualitätsstandard)</li>
                  </ul>
                </div>
              </div>

              <p className="text-slate-700 leading-relaxed">
                Diese Kombination ermöglicht mir eine <strong>ganzheitliche, eigenverantwortliche
                Behandlung</strong> auf höchstem Qualitätsniveau - ohne dass Sie vorher zum Arzt
                müssen.
              </p>
            </div>
          </div>
        </section>

        {/* Vorteile */}
        <section className="bg-slate-50 py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight mb-8 font-epilogue">
              Vorteile eines Heilpraktikers für Osteopathie
            </h2>

            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl shrink-0">✅</div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                      Direkter Zugang ohne Überweisung
                    </h3>
                    <p className="text-slate-700">
                      Sie können <strong>sofort einen Termin</strong> buchen, ohne vorher zum
                      Hausarzt zu müssen. Das spart Zeit und ermöglicht schnellere Behandlung
                      bei akuten Beschwerden.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl shrink-0">🔍</div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                      Eigenverantwortliche Diagnostik
                    </h3>
                    <p className="text-slate-700">
                      Als Heilpraktiker kann ich <strong>selbstständig diagnostizieren</strong> und
                      entscheiden, ob Osteopathie die richtige Therapie für Sie ist oder ob
                      eine ärztliche Abklärung sinnvoll wäre.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl shrink-0">⏱️</div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                      Zeit für Sie
                    </h3>
                    <p className="text-slate-700">
                      <strong>60 Minuten für Erstbehandlung</strong> - ausführliche Anamnese,
                      gründliche Untersuchung und individuelle Behandlung. Keine
                      Fließbandabfertigung.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl shrink-0">🧘</div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                      Ganzheitlicher Ansatz
                    </h3>
                    <p className="text-slate-700">
                      Heilpraktiker arbeiten traditionell <strong>ganzheitlich</strong> - ich
                      betrachte nicht nur Ihre Symptome, sondern Sie als ganzen Menschen mit
                      Körper, Geist und Lebensumständen.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Unterschied zu anderen */}
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight mb-8 font-epilogue">
              Abgrenzung zu anderen Therapeuten
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-900">
                      Kriterium
                    </th>
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-900">
                      Heilpraktiker Osteopathie
                    </th>
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-900">
                      Physiotherapeut
                    </th>
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-900">
                      Arzt/Orthopäde
                    </th>
                  </tr>
                </thead>
                <tbody className="text-slate-700 text-sm">
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-medium">Überweisung nötig?</td>
                    <td className="border border-slate-300 px-4 py-3 bg-green-50">
                      <strong>Nein</strong>
                    </td>
                    <td className="border border-slate-300 px-4 py-3">Ja (Rezept)</td>
                    <td className="border border-slate-300 px-4 py-3">Nein</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-medium">Behandlungsdauer</td>
                    <td className="border border-slate-300 px-4 py-3 bg-green-50">
                      <strong>45-60 Min.</strong>
                    </td>
                    <td className="border border-slate-300 px-4 py-3">15-20 Min.</td>
                    <td className="border border-slate-300 px-4 py-3">5-15 Min.</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-medium">Ansatz</td>
                    <td className="border border-slate-300 px-4 py-3 bg-green-50">
                      <strong>Ganzheitlich</strong>
                    </td>
                    <td className="border border-slate-300 px-4 py-3">Symptomorientiert</td>
                    <td className="border border-slate-300 px-4 py-3">Medizinisch</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-medium">Ausbildung</td>
                    <td className="border border-slate-300 px-4 py-3 bg-green-50">
                      <strong>4-5 Jahre Osteopathie</strong>
                    </td>
                    <td className="border border-slate-300 px-4 py-3">3 Jahre</td>
                    <td className="border border-slate-300 px-4 py-3">6 Jahre Studium</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-medium">Verschreibung</td>
                    <td className="border border-slate-300 px-4 py-3">Nein</td>
                    <td className="border border-slate-300 px-4 py-3">Nein</td>
                    <td className="border border-slate-300 px-4 py-3 bg-green-50">
                      <strong>Ja (Medikamente)</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-medium">Kosten</td>
                    <td className="border border-slate-300 px-4 py-3">150€ (Selbstzahler)</td>
                    <td className="border border-slate-300 px-4 py-3">10€ Zuzahlung</td>
                    <td className="border border-slate-300 px-4 py-3">Kasseleistung</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Qualifikation */}
        <section className="bg-slate-50 py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight mb-8 font-epilogue">
              Meine Qualifikation
            </h2>

            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3 font-epilogue">
                  🩺 Staatlich geprüfter Heilpraktiker
                </h3>
                <p className="text-slate-700">
                  Die Heilpraktiker-Prüfung beim Gesundheitsamt Hamburg umfasst:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 mt-3">
                  <li>Schriftliche Prüfung zu Anatomie, Physiologie, Pathologie</li>
                  <li>Mündliche Prüfung zu Diagnostik und Differenzialdiagnostik</li>
                  <li>Praktische Prüfung mit Patientenvorstellung</li>
                  <li>Rechtliche Grundlagen und Hygiene</li>
                </ul>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3 font-epilogue">
                  🎓 BAO-Osteopathie-Ausbildung (5000+ Stunden)
                </h3>
                <p className="text-slate-700">
                  5-jährige berufsbegleitende Ausbildung an der renommierten Berliner Academy
                  of Osteopathy:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 mt-3">
                  <li>Parietale Osteopathie (Bewegungsapparat)</li>
                  <li>Viszerale Osteopathie (innere Organe)</li>
                  <li>Kraniosakrale Osteopathie</li>
                  <li>Klinische Praxis und Supervisionen</li>
                </ul>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3 font-epilogue">
                  ✅ VFO-Mitgliedschaft
                </h3>
                <p className="text-slate-700">
                  Mitglied im Verband Freier Osteopathen - garantiert kontinuierliche
                  Fortbildung und Einhaltung ethischer Standards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white py-16 sm:py-24 px-4 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 sm:p-12 text-center text-white shadow-xl">
              <h2 className="text-3xl sm:text-4xl font-light mb-4 font-epilogue tracking-tight">
                Termin beim Heilpraktiker für Osteopathie
              </h2>
              <p className="text-xl mb-8 text-slate-200 font-light">
                Ohne Überweisung direkt zur ganzheitlichen Behandlung.
                Jetzt online buchen oder anrufen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/terminbuchung"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-slate-900 bg-white rounded-md hover:shadow-lg hover:transform hover:-translate-y-1 transition-all duration-300"
                >
                  📅 Online Termin buchen
                </Link>
                <a
                  href="tel:+4917643990001"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold border-2 border-white text-white rounded-md hover:bg-white hover:text-slate-900 transition-all duration-300"
                >
                  📞 0176 4399 0001
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
