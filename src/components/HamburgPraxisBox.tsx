import Link from "next/link";

export default function HamburgPraxisBox() {
  return (
    <aside
      className="my-10 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 sm:p-8 shadow-sm"
      aria-labelledby="hamburg-praxis-heading"
    >
      <div className="flex items-start gap-3 mb-4">
        <span className="text-2xl" aria-hidden="true">📍</span>
        <h2
          id="hamburg-praxis-heading"
          className="text-2xl font-bold text-slate-900 font-epilogue m-0"
        >
          Behandlung in Hamburg – Rotherbaum & Eimsbüttel
        </h2>
      </div>

      <p className="text-slate-700 leading-relaxed mb-6">
        Joshua Alsen ist VFO-zertifizierter Osteopath in Hamburg.
        Termine in der Regel binnen 24–48 Stunden verfügbar – an zwei zentralen Standorten.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <Link
          href="/osteopathie-rotherbaum/"
          className="group block rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-900 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl" aria-hidden="true">🚇</span>
            <h3 className="text-lg font-semibold text-slate-900 font-epilogue m-0 group-hover:text-slate-700">
              Rotherbaum
            </h3>
          </div>
          <p className="text-sm text-slate-600 mb-2">
            Rappstraße 7, 20146 Hamburg
          </p>
          <p className="text-xs text-slate-500 mb-3">
            U-Bahn Hallerstraße – 5 Min. Fußweg
          </p>
          <span className="text-sm font-medium text-slate-900 group-hover:underline">
            Mehr zur Praxis Rotherbaum →
          </span>
        </Link>

        <Link
          href="/osteopathie-eimsbuettel/"
          className="group block rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-900 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl" aria-hidden="true">🌳</span>
            <h3 className="text-lg font-semibold text-slate-900 font-epilogue m-0 group-hover:text-slate-700">
              Eimsbüttel
            </h3>
          </div>
          <p className="text-sm text-slate-600 mb-2">
            Stresemannallee 118, 22529 Hamburg
          </p>
          <p className="text-xs text-slate-500 mb-3">
            S-Bahn Eidelstedt / Bus Kieler Straße
          </p>
          <span className="text-sm font-medium text-slate-900 group-hover:underline">
            Mehr zur Praxis Eimsbüttel →
          </span>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/terminbuchung/"
          className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-all no-underline"
        >
          📅 Termin in Hamburg buchen
        </Link>
        <a
          href="tel:+4917643990001"
          className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold border-2 border-slate-900 text-slate-900 rounded-lg hover:bg-slate-900 hover:text-white transition-all no-underline"
        >
          📞 0176 4399 0001
        </a>
      </div>
    </aside>
  );
}
