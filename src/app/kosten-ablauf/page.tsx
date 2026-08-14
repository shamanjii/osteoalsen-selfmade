import type { Metadata } from "next";
import RedirectNotice from "@/components/RedirectNotice";

// Konsolidiert auf /osteopathie-kosten-hamburg/ (GSC-Analyse 2026-08-14).
// Beide Seiten deckten dieselbe Suchintention ab. Query-Ebene 90 Tage:
//   /osteopathie-kosten-hamburg/  3.444 Impr, 9 Klicks - besitzt den kompletten
//     kommerziellen Kosten-Cluster ("was kostet ein osteopath" 48 Impr,
//     "osteopathie preise" 42, "kosten bei osteopathie" 68, ~30 weitere).
//   /kosten-ablauf/                 337 Impr, 0 Klicks - rankte fast nur fuer
//     thematisch fremde Queries ("endokrinologie ingolstadt kassenpatienten",
//     "ernaehrungsberatung koeln kostenlos") mit je 1-2 Impressionen.
// Die scheinbar bessere Durchschnittsposition von /kosten-ablauf/ (8,3 vs 14,5)
// war ein Mittelwert-Artefakt aus genau diesen volumenlosen Fremd-Queries -
// kein Qualitaetssignal. Der Ablauf-Inhalt (Erstbehandlung, Zahlung,
// Stornierung) ist vollstaendig in die Zielseite uebernommen; der sitewide
// Nav-Link zeigt jetzt dorthin und speist die Seite, die tatsaechlich rankt.
export const metadata: Metadata = {
  title: "Kosten & Ablauf | Osteopathie Hamburg - Joshua Alsen",
  description:
    "Diese Seite ist umgezogen. Preise, Kassenerstattung und Behandlungsablauf finden Sie jetzt unter Osteopathie Kosten Hamburg.",
  alternates: { canonical: "/osteopathie-kosten-hamburg/" },
};

export default function KostenAblaufPage() {
  return (
    <RedirectNotice
      to="/osteopathie-kosten-hamburg/"
      label="Osteopathie Kosten Hamburg - Preise & Ablauf"
    />
  );
}
