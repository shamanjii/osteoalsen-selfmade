import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-slate-700 mb-4">
          Seite nicht gefunden
        </h2>
        <p className="text-slate-600 mb-8 max-w-md">
          Die angeforderte Seite konnte nicht gefunden werden.
          Möglicherweise wurde sie verschoben oder gelöscht.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            Zur Startseite
          </Link>
          <Link
            href="/blog"
            className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Zum Blog
          </Link>
        </div>
      </div>
    </div>
  )
}