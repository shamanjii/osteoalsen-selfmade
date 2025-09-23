'use client';

interface ScientificCredibilityBoxProps {
  sourceCount: number;
  specialty: string;
  certification: string;
  fullBibliographyAnchor?: string;
}

export default function ScientificCredibilityBox({
  sourceCount,
  specialty,
  certification = "VFO-zertifiziert",
  fullBibliographyAnchor = "#literatur"
}: ScientificCredibilityBoxProps) {
  return (
    <div className="border-l-4 border-slate-300 bg-slate-50 p-4 mb-6">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">
          <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-epilogue font-medium text-slate-900 mb-2">
            Wissenschaftlich fundiert
          </h3>
          <div className="space-y-2 text-xs text-slate-700">
            <div className="flex items-center flex-wrap gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-slate-200 text-slate-700">
                {sourceCount}+ Studien
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-slate-200 text-slate-700">
                {certification}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-slate-200 text-slate-700">
                {specialty}
              </span>
            </div>
            <div className="text-xs text-slate-600">
              Basiert auf peer-reviewed Forschung und evidenzbasierten Behandlungsansätzen.{' '}
              <a
                href={fullBibliographyAnchor}
                className="text-slate-700 hover:text-slate-900 underline transition-colors"
              >
                Quellen anzeigen
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}