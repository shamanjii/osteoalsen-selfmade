'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface RedirectNoticeProps {
  to: string;
  label: string;
}

/**
 * Soft-Redirect fuer Seiten, die auf eine andere URL konsolidiert wurden.
 *
 * Die Seite ist ein Next.js Static Export auf GitHub Pages ohne vorgeschaltetes
 * CDN - ein echter HTTP 301 ist dort nicht moeglich. Google nennt als Ersatz in
 * dieser Reihenfolge: serverseitiger Redirect > Meta-Refresh (0 Sekunden) >
 * JavaScript-Redirect. Hier greifen alle verfuegbaren Signale gleichzeitig:
 *
 *   1. rel=canonical auf die Zielseite (via `metadata` der jeweiligen Seite)
 *   2. <meta http-equiv="refresh" content="0; url=..."> - wird von React 19
 *      automatisch in den <head> gehoben
 *   3. window.location.replace() fuer Browser (ersetzt den History-Eintrag,
 *      damit der Zurueck-Button nicht in einer Schleife haengt)
 *   4. ein crawlbarer Link als Fallback, falls kein JS ausgefuehrt wird
 *
 * Bewusst KEIN noindex: das widerspraeche dem canonical. Eine Seite kann
 * entweder konsolidiert (canonical) oder ausgeschlossen (noindex) werden -
 * beides zusammen ist ein widerspruechliches Signal.
 */
export default function RedirectNotice({ to, label }: RedirectNoticeProps) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);

  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${to}`} />
      <main className="min-h-screen flex items-center justify-center px-4 text-center">
        <p className="text-slate-700">
          Diese Seite ist umgezogen. Weiter zu{' '}
          <Link href={to} className="text-slate-900 underline font-medium">
            {label}
          </Link>
          .
        </p>
      </main>
    </>
  );
}
