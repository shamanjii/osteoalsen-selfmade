import Link from "next/link";
import { linkPath } from "@/lib/basePath";

export const metadata = {
  title: "Datenschutzerklärung - Osteopathie Hamburg | Joshua Alsen",
  description:
    "Informationen zur Datenverarbeitung gemäß DSGVO der Heilpraxis für Osteopathie Joshua Alsen Hamburg",
  robots: "noindex, nofollow",
};

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header with Back Link */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900 shadow-md">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link
            href={linkPath("/")}
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
              Datenschutzerklärung
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Informationen zur Verarbeitung Ihrer personenbezogenen Daten
              gemäß Datenschutz-Grundverordnung (DSGVO)
            </p>
          </section>

          {/* Contact Info */}
          <div className="bg-slate-50 border-l-4 border-slate-900 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4 font-epilogue">
              🏥 Verantwortlicher für die Datenverarbeitung
            </h2>
            <div className="space-y-2 text-slate-700">
              <p>
                <strong>Heilpraxis für Osteopathie Joshua Alsen</strong>
              </p>
              <p>Rappstraße 7, 20146 Hamburg</p>
              <p>Stresemannallee 118, 22529 Hamburg</p>
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

          {/* 1. Data Collection */}
          <section className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6 pb-3 border-b-2 border-slate-200 font-epilogue">
              1. Erhebung und Speicherung personenbezogener Daten
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3 font-epilogue">
                  Beim Besuch der Website
                </h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Beim Aufrufen unserer Website werden durch den auf Ihrem
                  Endgerät zum Einsatz kommenden Browser automatisch
                  Informationen an den Server unserer Website gesendet. Diese
                  Informationen werden temporär in einem sogenannten Logfile
                  gespeichert.
                </p>

                <p className="text-slate-700 font-semibold mb-3">
                  Folgende Informationen werden dabei ohne Ihr Zutun erfasst
                  und bis zur automatisierten Löschung gespeichert:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                  <li>IP-Adresse des anfragenden Rechners</li>
                  <li>Datum und Uhrzeit des Zugriffs</li>
                  <li>Name und URL der abgerufenen Datei</li>
                  <li>
                    Website, von der aus der Zugriff erfolgt (Referrer-URL)
                  </li>
                  <li>
                    verwendeter Browser und ggf. das Betriebssystem Ihres
                    Rechners sowie der Name Ihres Access-Providers
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-3 font-epilogue">
                  Zweck der Datenverarbeitung:
                </h4>
                <p className="text-slate-700 leading-relaxed mb-3">
                  Die genannten Daten werden zu folgenden Zwecken verarbeitet:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                  <li>
                    Gewährleistung eines reibungslosen Verbindungsaufbaus der
                    Website
                  </li>
                  <li>
                    Gewährleistung einer komfortablen Nutzung unserer Website
                  </li>
                  <li>
                    Auswertung der Systemsicherheit und -stabilität sowie zu
                    weiteren administrativen Zwecken
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. eTermin */}
          <section className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6 pb-3 border-b-2 border-slate-200 font-epilogue">
              2. Nutzung des Buchungssystems eTermin.net
            </h2>

            <p className="text-slate-700 leading-relaxed mb-4">
              Wir nutzen das Buchungssystem von eTermin.net für die
              Terminbuchung. Über das Kontaktformular auf dieser Seite können
              Sie personenbezogene Daten angeben, wie:
            </p>

            <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
              <li>Name</li>
              <li>E-Mail-Adresse</li>
              <li>Telefonnummer</li>
              <li>Adresse</li>
            </ul>

            <p className="text-slate-700 leading-relaxed mb-4">
              Die Angabe dieser Daten erfolgt freiwillig und dient der
              Bearbeitung Ihrer Anfrage bzw. Terminbuchung. Ihre Daten werden
              nur zum Zweck der Bearbeitung der Terminbuchung verwendet und
              nicht an Dritte weitergegeben.
            </p>

            <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2 font-epilogue">
                ℹ️ Externe Datenschutzbestimmungen
              </h3>
              <p className="text-blue-900">
                Weitere Informationen zum Datenschutz von eTermin.net finden
                Sie in deren Datenschutzerklärung auf der Website von
                eTermin.net.
              </p>
            </div>
          </section>

          {/* 3. Cookies */}
          <section className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6 pb-3 border-b-2 border-slate-200 font-epilogue">
              3. Cookies
            </h2>

            <p className="text-slate-700 leading-relaxed mb-4">
              Wir verwenden auf unserer Website nur Cookies, die für den
              Betrieb der Seite notwendig sind. Diese Cookies speichern keine
              personenbezogenen Daten und dienen lediglich der Funktionalität
              der Website.
            </p>

            <p className="text-slate-700 font-semibold mb-3">
              Arten der verwendeten Cookies:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
              <li>
                <strong>Technisch notwendige Cookies:</strong> Diese Cookies
                sind für die Grundfunktionen der Website erforderlich
              </li>
              <li>
                <strong>Session-Cookies:</strong> Werden automatisch gelöscht,
                wenn Sie Ihren Browser schließen
              </li>
            </ul>
          </section>

          {/* 4. Google Analytics */}
          <section className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6 pb-3 border-b-2 border-slate-200 font-epilogue">
              4. Google Analytics (falls verwendet)
            </h2>

            <p className="text-slate-700 leading-relaxed mb-4">
              Unsere Website nutzt eventuell Google Analytics, einen
              Webanalysedienst der Google LLC („Google"). Google Analytics
              verwendet „Cookies", Textdateien, die auf Ihrem Computer
              gespeichert werden und die eine Analyse der Benutzung der Website
              durch Sie ermöglichen.
            </p>

            <p className="text-slate-700 leading-relaxed mb-4">
              Die durch den Cookie erzeugten Informationen über Ihre Benutzung
              dieser Website werden in der Regel an einen Server von Google in
              den USA übertragen und dort gespeichert.
            </p>

            <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2 font-epilogue">
                🔒 IP-Anonymisierung
              </h3>
              <p className="text-blue-900">
                Google Analytics wird ausschließlich mit aktivierter
                IP-Anonymisierung verwendet. Das bedeutet, dass Ihre IP-Adresse
                innerhalb der Europäischen Union gekürzt und anonymisiert wird,
                bevor sie an die USA übermittelt wird.
              </p>
            </div>
          </section>

          {/* 5. Storage Duration */}
          <section className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6 pb-3 border-b-2 border-slate-200 font-epilogue">
              5. Dauer der Datenspeicherung
            </h2>

            <p className="text-slate-700 leading-relaxed mb-4">
              Wir speichern personenbezogene Daten nur so lange, wie es für die
              Abwicklung des jeweiligen Vorgangs erforderlich ist, oder wie es
              gesetzlich vorgeschrieben ist.
            </p>

            <p className="text-slate-700 font-semibold mb-3">
              Spezifische Speicherfristen:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
              <li>
                <strong>Terminbuchungen:</strong> Termine werden in unserem
                Kalender gespeichert, um Ihre Anfragen zu verwalten
              </li>
              <li>
                <strong>Logfiles:</strong> Werden automatisch nach 30 Tagen
                gelöscht
              </li>
              <li>
                <strong>Kontaktanfragen:</strong> Werden nach Bearbeitung und
                Ablauf etwaiger Nachfragen gelöscht
              </li>
            </ul>
          </section>

          {/* 6. Rights */}
          <section className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6 pb-3 border-b-2 border-slate-200 font-epilogue">
              6. Ihre Rechte als Betroffener
            </h2>

            <p className="text-slate-700 leading-relaxed mb-4">
              Sie haben umfassende Rechte bezüglich Ihrer personenbezogenen
              Daten. Diese können Sie jederzeit geltend machen:
            </p>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 font-epilogue">
                Ihre Rechte im Überblick:
              </h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl mt-0.5">
                    ✓
                  </span>
                  <div>
                    <strong>Auskunftsrecht (Art. 15 DSGVO):</strong> Sie können
                    Auskunft über Ihre von uns verarbeiteten personenbezogenen
                    Daten verlangen
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl mt-0.5">
                    ✓
                  </span>
                  <div>
                    <strong>Berichtigungsrecht (Art. 16 DSGVO):</strong> Sie
                    können unverzüglich die Berichtigung unrichtiger oder
                    Vervollständigung Ihrer bei uns gespeicherten Daten
                    verlangen
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl mt-0.5">
                    ✓
                  </span>
                  <div>
                    <strong>Löschungsrecht (Art. 17 DSGVO):</strong> Sie können
                    die Löschung Ihrer bei uns gespeicherten personenbezogenen
                    Daten verlangen
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl mt-0.5">
                    ✓
                  </span>
                  <div>
                    <strong>
                      Einschränkung der Verarbeitung (Art. 18 DSGVO):
                    </strong>{" "}
                    Sie können die Einschränkung der Verarbeitung Ihrer
                    personenbezogenen Daten verlangen
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl mt-0.5">
                    ✓
                  </span>
                  <div>
                    <strong>Datenportabilität (Art. 20 DSGVO):</strong> Sie
                    können Ihre personenbezogenen Daten in einem
                    strukturierten, gängigen und maschinenlesbaren Format
                    erhalten
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl mt-0.5">
                    ✓
                  </span>
                  <div>
                    <strong>Beschwerderecht (Art. 77 DSGVO):</strong> Sie
                    können sich bei einer Aufsichtsbehörde beschweren
                  </div>
                </li>
              </ul>
            </div>

            <p className="text-slate-700 leading-relaxed mt-6">
              Zur Ausübung Ihrer Rechte kontaktieren Sie uns bitte über die
              oben angegebenen Kontaktdaten.
            </p>
          </section>

          {/* 7. Data Security */}
          <section className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6 pb-3 border-b-2 border-slate-200 font-epilogue">
              7. Datensicherheit
            </h2>

            <p className="text-slate-700 leading-relaxed mb-4">
              Wir verwenden innerhalb des Website-Besuchs das verbreitete
              SSL-Verfahren (Secure Socket Layer) in Verbindung mit der jeweils
              höchsten Verschlüsselungsstufe, die von Ihrem Browser unterstützt
              wird.
            </p>

            <p className="text-slate-700 font-semibold mb-3">
              Weitere Sicherheitsmaßnahmen:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
              <li>Regelmäßige Sicherheitsupdates</li>
              <li>Verschlüsselte Datenübertragung</li>
              <li>Sichere Server-Infrastruktur</li>
              <li>Zugriffsbeschränkungen auf personenbezogene Daten</li>
            </ul>
          </section>

          {/* 8. Changes */}
          <section className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6 pb-3 border-b-2 border-slate-200 font-epilogue">
              8. Aktualität und Änderung dieser Datenschutzerklärung
            </h2>

            <p className="text-slate-700 leading-relaxed mb-4">
              Diese Datenschutzerklärung ist aktuell gültig und hat den Stand{" "}
              <strong>Januar 2025</strong>.
            </p>

            <p className="text-slate-700 leading-relaxed">
              Durch die Weiterentwicklung unserer Website und Angebote darüber
              oder aufgrund geänderter gesetzlicher Vorgaben kann es notwendig
              werden, diese Datenschutzerklärung zu ändern. Die jeweils
              aktuelle Datenschutzerklärung kann jederzeit auf der Website
              unter diesem Link von Ihnen abgerufen und ausgedruckt werden.
            </p>
          </section>

          {/* Contact */}
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2 font-epilogue">
              📧 Fragen zum Datenschutz?
            </h3>
            <p className="text-blue-900">
              Bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer
              personenbezogenen Daten, bei Auskünften, Berichtigung, Sperrung
              oder Löschung von Daten wenden Sie sich bitte an:{" "}
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
            <Link href={linkPath("/datenschutz/")} className="hover:text-white transition-colors">
              Datenschutz
            </Link>{" "}
            |{" "}
            <Link href={linkPath("/impressum/")} className="hover:text-white transition-colors">
              Impressum
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
