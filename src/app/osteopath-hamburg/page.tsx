import type { Metadata } from "next";
import RedirectNotice from "@/components/RedirectNotice";

// Konsolidiert auf die Startseite (GSC-Audit 2026-08-13): diese Seite und die
// Homepage haben faktisch dasselbe Keyword-Ziel ("Osteopath/Osteopathie Hamburg")
// belegt und sich gegenseitig kannibalisiert. Ein Dezember-2025-Commit hat die
// URL bereits aus der Sitemap entfernt in der (falschen) Annahme, sie würde per
// Middleware serverseitig weitergeleitet - das funktioniert bei einem reinen
// Next.js Static Export ohne Server nicht. Deshalb bis heute weiterhin live und
// vollständig indexierbar geblieben. Da GitHub Pages ohne vorgeschalteten CDN
// keinen echten HTTP 301 kann, ist dies der von Google empfohlene Ersatz:
// rel=canonical auf die Zielseite + client-seitiger Redirect + crawlbarer
// Fallback-Link für den Fall, dass JavaScript nicht ausgeführt wird.
export const metadata: Metadata = {
  title: "Osteopath Hamburg | Joshua Alsen",
  description: "Diese Seite ist umgezogen. Alle Informationen zu Joshua Alsen, Osteopath in Hamburg, finden Sie jetzt auf der Startseite.",
  alternates: { canonical: "/" },
};

export default function OsteopathHamburgPage() {
  return <RedirectNotice to="/" label="Osteopathie Hamburg – Joshua Alsen" />;
}
