'use client';

import Link from 'next/link';

interface BlogCTAProps {
  variant?: 'inline' | 'prominent' | 'minimal';
  symptom?: string;
  className?: string;
}

/**
 * Conversion-optimierte CTA-Box für Blog-Artikel
 *
 * Varianten:
 * - inline: Kompakte Box nach dem ersten Abschnitt
 * - prominent: Große Box am Ende des Artikels
 * - minimal: Dezente Variante für weniger aufdringliche Platzierung
 */
export default function BlogCTA({
  variant = 'inline',
  symptom,
  className = ''
}: BlogCTAProps) {

  // Inline-Variante: Nach dem ersten Absatz / Intro
  if (variant === 'inline') {
    return (
      <div className={`my-8 p-6 bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-xl ${className}`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1">
            <p className="text-slate-900 font-semibold mb-1">
              {symptom
                ? `Leiden Sie unter ${symptom}?`
                : 'Sie erkennen sich wieder?'
              }
            </p>
            <p className="text-slate-600 text-sm">
              Lassen Sie uns gemeinsam die Ursache finden. Termine in 24-48h verfügbar.
            </p>
          </div>
          <Link
            href="/terminbuchung/"
            className="inline-flex items-center justify-center whitespace-nowrap px-6 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 hover:shadow-lg transition-all duration-300 text-sm"
          >
            Termin vereinbaren
          </Link>
        </div>
      </div>
    );
  }

  // Prominent-Variante: Große Box am Ende des Artikels
  if (variant === 'prominent') {
    return (
      <div className={`my-12 p-8 sm:p-10 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl text-white shadow-xl ${className}`}>
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 font-epilogue">
            {symptom
              ? `${symptom}? Ich helfe Ihnen.`
              : 'Bereit für Ihre Behandlung?'
            }
          </h3>
          <p className="text-slate-300 mb-8 text-lg">
            In meiner Praxis in Hamburg-Rotherbaum finde ich die Ursache Ihrer Beschwerden –
            oft schon in der ersten Sitzung. Termine sind kurzfristig verfügbar.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link
              href="/terminbuchung/"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-semibold rounded-lg hover:shadow-lg hover:transform hover:-translate-y-1 transition-all duration-300"
            >
              Jetzt Termin buchen
            </Link>
            <a
              href="tel:+4917643990001"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-slate-900 transition-all duration-300"
            >
              📞 0176 4399 0001
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-1">
              <span className="text-emerald-400">✓</span> VFO-zertifiziert
            </span>
            <span className="flex items-center gap-1">
              <span className="text-emerald-400">✓</span> Termine in 24-48h
            </span>
            <span className="flex items-center gap-1">
              <span className="text-emerald-400">✓</span> Kassenzuschuss möglich
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Minimal-Variante: Dezent, weniger aufdringlich
  if (variant === 'minimal') {
    return (
      <div className={`my-6 py-4 px-5 bg-slate-50 border-l-4 border-slate-900 rounded-r-lg ${className}`}>
        <p className="text-slate-700 text-sm">
          <strong className="text-slate-900">Persönliche Beratung gewünscht?</strong>{' '}
          <Link href="/terminbuchung/" className="text-blue-600 hover:text-blue-800 font-medium underline">
            Termin vereinbaren
          </Link>{' '}
          oder anrufen:{' '}
          <a href="tel:+4917643990001" className="text-blue-600 hover:text-blue-800 font-medium">
            0176 4399 0001
          </a>
        </p>
      </div>
    );
  }

  return null;
}

/**
 * Symptom-spezifische CTA-Box
 * Zeigt eine auf das Thema des Artikels zugeschnittene CTA
 */
interface SymptomCTAProps {
  symptom: string;
  treatmentLink?: string;
  treatmentName?: string;
}

export function SymptomCTA({ symptom, treatmentLink, treatmentName }: SymptomCTAProps) {
  return (
    <div className="my-10 p-6 sm:p-8 bg-white border-2 border-slate-200 rounded-xl shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-900 mb-2 font-epilogue">
            Leiden Sie unter {symptom}?
          </h3>
          <p className="text-slate-600 mb-4">
            Als Osteopath in Hamburg behandle ich die Ursachen – nicht nur die Symptome.
            In einem persönlichen Termin finden wir gemeinsam heraus, wie ich Ihnen helfen kann.
          </p>
          {treatmentLink && treatmentName && (
            <Link
              href={treatmentLink}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              Mehr über {treatmentName} →
            </Link>
          )}
        </div>
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
          <Link
            href="/terminbuchung/"
            className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-all duration-300 text-center"
          >
            Termin vereinbaren
          </Link>
          <a
            href="tel:+4917643990001"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-slate-300 text-slate-700 font-medium rounded-lg hover:border-slate-900 hover:text-slate-900 transition-all duration-300 text-center"
          >
            📞 Anrufen
          </a>
        </div>
      </div>
    </div>
  );
}
