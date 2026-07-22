# HWG-Review-Checkliste: Alle Artikel & Seiten einzeln

Stand: 22. Juli 2026. Ziel: jeden Artikel/jede Seite mit Gesundheitsaussagen einzeln durchgehen und auf „grün" (HWG-konform) prüfen — nicht nur Scanner-Treffer, sondern auch Kausalketten, Zitatwahrheit und Gesamteindruck (siehe Maßstab in `2026-07-22-hwg-audit-nackenschmerzen-schwindel-hws-vagus.md`).

**Status-Legende:** ⬜ offen · 🟡 in Arbeit · ✅ grün (keine/nur redaktionelle Änderung nötig) · 🔧 bereinigt (Änderung vorgenommen) · 🔴 braucht Tiefenüberarbeitung (Struktur, nicht nur Wortlaut)

**Arbeitsweise:** Wir gehen die Liste von oben nach unten durch, ein Artikel pro Schritt. Pro Artikel: Scanner-Treffer + manuelle Lesung (Zahlen, Zitate, Kausalaussagen, Zeitversprechen, OP-Vergleiche) → ggf. Fix → Commit → nächster.

---

## Gruppe A — Bereits in dieser Session bearbeitet (Verifikations-Durchgang, niedrige Priorität)

- [x] 🔧 `nackenschmerzen-schwindel-hws-vagus.md` — Tiefenaudit existiert bereits, **Status Rot, noch offen** (Selbsttest, Kausalkette, Live/Lokal-Drift)
- [x] 🔧 `hws-syndrom-symptome-behandlung.md`
- [x] 🔧 `schulterschmerzen-frozen-shoulder-osteopathie-statt-op.md`
- [x] 🔧 `hueftschmerzen-hueftarthrose-ohne-op-behandeln.md`
- [x] 🔧 `gelenkbeschwerden-osteopathie-ganzheitliche-behandlung.md`
- [x] 🔧 `cmd-nackenschmerzen-kiefergelenk.md`
- [x] 🔧 `rueckenschmerzen-verdauung-radix-mesenterii.md`
- [x] 🔧 `viszerale-osteopathie.md`
- [x] 🔧 `zwerchfell-osteopathie-atmung-verdauung.md`
- [x] 🔧 `chronische-kopfschmerzen-osteopathie-statt-tabletten.md`
- [ ] ⬜ `schulter-impingement-rotatorenmanschette-uebungen.md` — nur Scanner-Treffer gecheckt (verifiziert korrekt zitiert), noch keine volle manuelle Lesung des ganzen Artikels

## Gruppe B — Darm-Rücken-Cluster, noch nie geprüft (Priorität hoch — `reizdarm...` hat bereits im Meta-Text eine ungeprüfte 50-80%-Zahl)

- [ ] ⬜ `reizdarm-rueckenschmerzen-darm-ruecken-zusammenhang.md`
- [ ] ⬜ `blaehungen-rueckenschmerzen.md`
- [ ] ⬜ `durchfall-rueckenschmerzen.md`
- [ ] ⬜ `verstopfung-rueckenschmerzen.md`

## Gruppe C — Restliche Blog-Artikel, noch nie einzeln geprüft

- [ ] ⬜ `dehnen-rueckenschmerzen-mythos.md`
- [ ] ⬜ `hws-blockierung-nacken-verspannung.md`
- [ ] ⬜ `isg-blockierung-teufelskreis.md`
- [ ] ⬜ `kniearthrose-ohne-op-behandeln.md`
- [ ] ⬜ `kopfschmerzen-trigeminus-ursache.md`
- [ ] ⬜ `kreuzbeinschmerzen-beckenstellung-rumpfstabilitaet.md`
- [ ] ⬜ `migraene-ohne-aura-osteopathie.md`
- [ ] ⬜ `osteopathie-hamburg-krankenkasse-erstattung-2026.md`
- [ ] ⬜ `rueckenschmerzen-3-versteckte-ursachen.md`
- [ ] ⬜ `rueckenschmerzen-osteopathie-ganzheitliche-behandlung-hamburg.md`
- [ ] ⬜ `schleudertrauma-spaetfolgen-langfristig-behandeln.md`
- [ ] ⬜ `schreibtisch-fehler-rueckenschmerzen.md`
- [ ] ⬜ `spannungskopfschmerzen-muskel-oder-hws.md` (hat Selbsttest — ähnliches Risiko wie Schwindel-Artikel prüfen!)
- [ ] ⬜ `sportosteopathie-hamburg-leistung-optimieren.md`
- [ ] ⬜ `sportosteopathie-hamburg-marathon-vorbereitung.md`
- [ ] ⬜ `sportverletzung-schneller-zurueck-training.md`
- [ ] ⬜ `vagusnerv-aktivieren-stress-uebungen.md` ("sofort beruhigen" im Titel — prüfen)

## Gruppe D — Behandlungsseiten (`src/app/behandlungen/*`) — höchster Werbecharakter, da direkte Leistungsbeschreibung

- [ ] ⬜ `behandlungen/page.tsx` (Übersicht)
- [ ] ⬜ `behandlungen/arthrose-gelenkbeschwerden/page.tsx`
- [ ] ⬜ `behandlungen/kopfschmerzen-migraene/page.tsx`
- [ ] ⬜ `behandlungen/kraniosakrale-osteopathie/page.tsx`
- [ ] ⬜ `behandlungen/nackenschmerzen/page.tsx`
- [ ] ⬜ `behandlungen/rueckenschmerzen/page.tsx`
- [ ] ⬜ `behandlungen/sportosteopathie/page.tsx`
- [ ] ⬜ `behandlungen/stress-burnout/page.tsx`
- [ ] ⬜ `behandlungen/verdauungsbeschwerden/page.tsx`

## Gruppe E — Kernseiten mit Gesundheitsaussagen (niedrigere Priorität, aber sichtbar)

- [ ] ⬜ `src/app/page.tsx` (Homepage)
- [ ] ⬜ `src/app/osteopath-hamburg/page.tsx`
- [ ] ⬜ `src/app/rueckenschmerzen-osteopathie-hamburg/page.tsx`
- [ ] ⬜ `src/app/was-ist-osteopathie/page.tsx`
- [ ] ⬜ `src/app/osteopathie-kosten-hamburg/page.tsx`
- [ ] ⬜ `src/app/ueber-mich/page.tsx`
- [ ] ⬜ `src/app/faq/page.tsx`

*Nicht relevant (keine Gesundheitsaussagen): `datenschutz`, `impressum`, `terminbuchung`, `kosten-ablauf` (nur falls Erstattungs-% ohne Quelle — kurz querchecken), `osteopathie-eimsbuettel`, `osteopathie-rotherbaum` (Standort-Seiten, ggf. nur kurzer Check auf Duplicate-Claims).

---

**Gesamt:** 33 Blog-Artikel + 9 Behandlungsseiten + 7 Kernseiten = 49 Positionen. Gruppe A ist der schnelle Verifikations-Durchgang, B–E sind der eigentliche neue Scope.
