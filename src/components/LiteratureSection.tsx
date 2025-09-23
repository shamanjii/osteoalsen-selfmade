'use client';

interface Citation {
  id: string;
  title: string;
  author?: string;
  url?: string;
  identifier?: string;
  journal?: string;
  year?: string;
}

interface LiteratureSectionProps {
  citations: Citation[];
  title?: string;
}

export default function LiteratureSection({
  citations,
  title = "Literatur und Quellen"
}: LiteratureSectionProps) {
  if (!citations.length) return null;

  return (
    <section id="literatur" className="mt-8">
      <div className="mb-6">
        <h2 className="text-2xl font-epilogue font-semibold text-slate-900 mb-2">
          {title}
        </h2>
        <div className="flex items-center text-sm text-slate-600">
          <svg className="h-4 w-4 mr-2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Alle Referenzen wurden sorgfältig ausgewählt und entsprechen wissenschaftlichen Standards</span>
        </div>
      </div>

      <div className="space-y-3">
        {citations.map((citation, index) => (
          <div
            key={citation.id}
            id={citation.id}
            className="group relative bg-white rounded-lg p-4 border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all duration-200"
          >
            <div className="flex items-start">
              {/* Citation number */}
              <div className="flex-shrink-0 w-8 h-8 bg-slate-100 text-slate-700 rounded-full flex items-center justify-center text-sm font-medium mr-4 group-hover:bg-slate-200 transition-colors">
                {index + 1}
              </div>

              {/* Citation content */}
              <div className="flex-1 min-w-0">
                <div className="space-y-2">
                  {/* Title */}
                  {citation.url ? (
                    <a
                      href={citation.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block font-medium text-slate-900 hover:text-slate-700 transition-colors"
                    >
                      {citation.title}
                      <svg className="inline-block w-3 h-3 ml-1 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : (
                    <h3 className="font-medium text-slate-900">{citation.title}</h3>
                  )}

                  {/* Metadata */}
                  <div className="text-sm text-slate-600 space-y-1">
                    {citation.author && (
                      <div className="flex items-center">
                        <span className="text-slate-500 mr-2">Autor:</span>
                        <span>{citation.author}</span>
                      </div>
                    )}
                    {citation.journal && citation.year && (
                      <div className="flex items-center">
                        <span className="text-slate-500 mr-2">Veröffentlicht:</span>
                        <span>{citation.journal} ({citation.year})</span>
                      </div>
                    )}
                    {citation.identifier && (
                      <div className="flex items-center">
                        <span className="text-slate-500 mr-2">ID:</span>
                        <code className="text-xs bg-slate-200 px-2 py-1 rounded font-mono">
                          {citation.identifier}
                        </code>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Back to top link */}
            <div className="mt-3 flex justify-end">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-xs text-slate-400 hover:text-slate-600 flex items-center transition-colors"
              >
                <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                Nach oben
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
        <div className="flex items-start">
          <svg className="h-5 w-5 text-slate-500 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm text-slate-700">
            <p className="font-medium mb-1">Evidenzbasierte Medizin</p>
            <p>
              Alle hier aufgeführten Studien und Quellen sind peer-reviewed und entsprechen den Standards der evidenzbasierten Medizin.
              Die Anwendung osteopathischer Behandlungsmethoden erfolgt individuell und nach sorgfältiger Diagnose.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}