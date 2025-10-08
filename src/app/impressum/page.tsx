import Link from "next/link";

export const metadata = {
  title: "Impressum - Osteopathie Hamburg | Joshua Alsen",
  description: "Rechtliche Angaben gemäß § 5 TMG (Telemediengesetz) und Heilpraktikergesetz",
  robots: "noindex, nofollow",
};

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header with Back Link */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900 shadow-md">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-white hover:text-slate-200 transition-colors font-epilogue font-medium"
          >
            ← Zurück zur Startseite
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Page Header */}
          <section className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-epilogue">
              Impressum
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Rechtliche Angaben gemäß § 5 TMG (Telemediengesetz) und
              Heilpraktikergesetz
            </p>
          </section>

          {/* Business Info */}
          <div className="bg-slate-50 border-l-4 border-slate-900 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4 font-epilogue">
              🏥 Heilpraxis für Osteopathie Joshua Alsen
            </h2>
            <div className="space-y-2 text-slate-700">
              <p>
                <strong>Rappstraße 7, 20146 Hamburg</strong>
              </p>
              <p>
                <strong>Stresemannallee 118, 22529 Hamburg</strong>
              </p>
              <p>
                Telefon:{" "}
                <a
                  href="tel:+4917643990001"
                  className="text-slate-900 hover:underline font-medium"
                >
                  0176 4399 0001
                </a>
              </p>
              <p>
                E-Mail:{" "}
                <a
                  href="mailto:joshua@alsen.info"
                  className="text-slate-900 hover:underline font-medium"
                >
                  joshua@alsen.info
                </a>
              </p>
            </div>
          </div>

          {/* Person Information */}
          <section className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6 pb-3 border-b-2 border-slate-200 font-epilogue">
              Angaben zur Person
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2 font-epilogue">
                  👤 Vertreten durch
                </h3>
                <p className="text-slate-700">
                  Joshua Alsen
                  <br />
                  Einzelunternehmen
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2 font-epilogue">
                  🎓 Berufsbezeichnung
                </h3>
                <p className="text-slate-700">
                  Heilpraktiker
                  <br />
                  (verliehen in Deutschland)
                </p>
              </div>
            </div>
          </section>

          {/* Supervisory Authority */}
          <section className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6 pb-3 border-b-2 border-slate-200 font-epilogue">
              Zuständige Behörden & Mitgliedschaften
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2 font-epilogue">
                  🏛️ Zuständige Aufsichtsbehörde
                </h3>
                <p className="text-slate-700">
                  Gesundheitsbehörde Hamburg
                  <br />
                  Billstraße 80
                  <br />
                  20539 Hamburg
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2 font-epilogue">
                  🤝 Mitgliedschaften
                </h3>
                <p className="text-slate-700">
                  Verband freier Osteopathen e.V. (VFO)
                  <br />
                  <a
                    href="https://www.vfo.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-900 hover:underline font-medium"
                  >
                    www.vfo.de
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* Tax Information */}
          <section className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6 pb-3 border-b-2 border-slate-200 font-epilogue">
              Steuerliche Angaben
            </h2>
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2 font-epilogue">
                💰 Umsatzsteuerbefreiung
              </h3>
              <p className="text-blue-900">
                Als freier Beruf nach § 4 Nr. 14 UStG von der Umsatzsteuer
                befreit.
              </p>
            </div>
          </section>

          {/* Professional Liability Insurance */}
          <section className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6 pb-3 border-b-2 border-slate-200 font-epilogue">
              Berufshaftpflichtversicherung
            </h2>
            <p className="text-slate-700 mb-4">
              <strong>Versichert bei:</strong>
            </p>
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2 font-epilogue">
                🛡️ Hiscox SA, Niederlassung für Deutschland
              </h3>
              <div className="space-y-3 text-slate-700">
                <p>
                  <strong>Hauptbevollmächtigter:</strong> Markus Niederreiner
                </p>
                <p>
                  <strong>Adresse:</strong>
                  <br />
                  Bernhard-Wicki-Straße 8
                  <br />
                  80636 München
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <p>
                      <strong>Telefon:</strong>{" "}
                      <a
                        href="tel:+498954580170"
                        className="text-slate-900 hover:underline"
                      >
                        +49 (0)89 545801 700
                      </a>
                    </p>
                    <p>
                      <strong>Fax:</strong> +49 (0)89 545801 799
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>E-Mail:</strong>{" "}
                      <a
                        href="mailto:myhiscox@hiscoxdirekt.de"
                        className="text-slate-900 hover:underline"
                      >
                        myhiscox@hiscoxdirekt.de
                      </a>
                    </p>
                    <p>
                      <strong>Web:</strong>{" "}
                      <a
                        href="https://www.hiscox.de"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-900 hover:underline"
                      >
                        www.hiscox.de
                      </a>
                    </p>
                  </div>
                </div>
                <p className="mt-4">
                  <strong>Registergericht:</strong> Amtsgericht München HRB
                  196892
                </p>
              </div>
            </div>
          </section>

          {/* Legal Notices */}
          <section className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6 pb-3 border-b-2 border-slate-200 font-epilogue">
              Rechtliche Hinweise
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3 font-epilogue">
                  Haftungsausschluss
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  Die Inhalte unserer Seiten wurden mit größter Sorgfalt
                  erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität
                  der Inhalte können wir jedoch keine Gewähr übernehmen.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3 font-epilogue">
                  Haftung für Links
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  Unser Angebot enthält Links zu externen Webseiten Dritter,
                  auf deren Inhalte wir keinen Einfluss haben. Deshalb können
                  wir für diese fremden Inhalte auch keine Gewähr übernehmen.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3 font-epilogue">
                  Urheberrecht
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke
                  auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die
                  Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                  Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen
                  der schriftlichen Zustimmung des jeweiligen Autors bzw.
                  Erstellers.
                </p>
              </div>
            </div>
          </section>

          {/* Contact for Legal Questions */}
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2 font-epilogue">
              📋 Rechtliche Fragen?
            </h3>
            <p className="text-blue-900">
              Bei rechtlichen Fragen zu diesem Impressum oder unseren
              Dienstleistungen kontaktieren Sie uns bitte unter:{" "}
              <a
                href="mailto:joshua@alsen.info"
                className="font-semibold hover:underline"
              >
                joshua@alsen.info
              </a>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="mb-2">
            &copy; 2025 Osteopathie Alsen - Joshua Alsen. Alle Rechte
            vorbehalten.
          </p>
          <p className="text-slate-400 text-sm">
            Heilpraxis für Osteopathie | Hamburg |{" "}
            <Link href="/datenschutz" className="hover:text-white transition-colors">
              Datenschutz
            </Link>{" "}
            |{" "}
            <Link href="/impressum" className="hover:text-white transition-colors">
              Impressum
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
