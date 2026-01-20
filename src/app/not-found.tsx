import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4">
      <div className="max-w-3xl mx-auto text-center">
        {/* Large 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-slate-900 font-epilogue mb-4">
            404
          </h1>
          <h2 className="text-3xl font-semibold text-slate-700 mb-4 font-epilogue">
            Seite nicht gefunden
          </h2>
          <p className="text-lg text-slate-600 max-w-xl mx-auto">
            Die angeforderte Seite konnte nicht gefunden werden. Möglicherweise
            wurde sie verschoben oder die URL ist falsch.
          </p>
        </div>

        {/* Quick Links */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-slate-900 mb-6 font-epilogue">
            Beliebte Seiten
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Link
              href="/"
              className="px-6 py-4 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all hover:shadow-lg font-medium"
            >
              🏠 Zur Startseite
            </Link>
            <Link
              href="/behandlungen/"
              className="px-6 py-4 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-all hover:border-slate-400 font-medium"
            >
              🦴 Behandlungen
            </Link>
            <Link
              href="/terminbuchung/"
              className="px-6 py-4 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-all hover:border-slate-400 font-medium"
            >
              📅 Termin buchen
            </Link>
            <Link
              href="/blog/"
              className="px-6 py-4 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-all hover:border-slate-400 font-medium"
            >
              📰 Blog
            </Link>
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-t border-slate-200 pt-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 font-epilogue">
            Benötigen Sie Hilfe?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-slate-600">
            <a
              href="tel:+4917643990001"
              className="hover:text-slate-900 transition-colors"
            >
              📞 0176 4399 0001
            </a>
            <span className="hidden sm:inline">|</span>
            <a
              href="mailto:joshua@alsen.info"
              className="hover:text-slate-900 transition-colors"
            >
              ✉️ joshua@alsen.info
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}