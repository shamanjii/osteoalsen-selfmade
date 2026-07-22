# HWG-Review-Checkliste: Alle 33 Blog-Artikel

Stand: 22. Juli 2026. **Scope-Korrektur (User, 22.07.2026): Nur die 33 Blog-Artikel (`posts/*.md`) sind online und müssen geprüft werden.** Behandlungsseiten und Kernseiten (ehem. Gruppe D/E) sind aus dem Scope raus — separates Thema, falls überhaupt.

Ziel: jeden der 33 Artikel einzeln durchgehen und auf „grün" (HWG-konform) prüfen — nicht nur Scanner-Treffer, sondern auch Kausalketten, Zitatwahrheit und Gesamteindruck (siehe Maßstab in `2026-07-22-hwg-audit-nackenschmerzen-schwindel-hws-vagus.md`).

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
- [ ] ⬜ `burnout-ganzheitlich-behandeln-glymphatisches-system.md` — nur zwei Scanner-Treffer gecheckt (beide ok, Mäusestudie korrekt gehedged), noch keine volle manuelle Lesung des ganzen Artikels

## Gruppe B — Darm-Rücken-Cluster, noch nie geprüft (Priorität hoch — `reizdarm...` hat bereits im Meta-Text eine ungeprüfte 50-80%-Zahl)

- [x] 🔧 `reizdarm-rueckenschmerzen-darm-ruecken-zusammenhang.md` — unbelegte 50-80%-Zahl (Titel+Meta+Intro) entschärft, Vergleichsaussage vs. Schmerzmittel entschärft, unbelegte persönliche Erfolgsaussage abgeschwächt. Notiz: Bild ist von fremder Domain hotlinked (Bildrechte klären, nicht HWG-Scope).
- [x] ✅ `blaehungen-rueckenschmerzen.md` — grün, keine Änderung nötig (gut gehedged, klare Alarmsymptom-Hinweise, keine erfundenen Zahlen)
- [x] ✅ `durchfall-rueckenschmerzen.md` — grün, keine Änderung nötig (gleiches Niveau, gute Red-Flag-Hinweise)
- [x] ✅ `verstopfung-rueckenschmerzen.md` — grün, keine Änderung nötig (gut gehedged, Red-Flags vorhanden, Quellen passend)

## Gruppe C — Restliche Blog-Artikel, noch nie einzeln geprüft

- [x] 🔴 `dehnen-rueckenschmerzen-mythos.md` — unbelegte 70%/30%-Zahlen entschärft, falscher interner Link gefixt. **Braucht noch Tiefenüberarbeitung wie der Schwindel-Artikel:** unvalidierter Selbsttest (3-Typen-Modell) weist Leser an, Behandlung zu wechseln ("Kein Dehnen mehr!") ohne validiertes Diagnoseinstrument.
- [x] 🔧 `hws-blockierung-nacken-verspannung.md` — unbelegte 85%-Zahl (Meta) entfernt, 4x wiederkehrende unbelegte Atlas→Arterie→Schwindel-Kausalkette entschärft (gleiches Problem wie im Schwindel-Artikel bereits identifiziert)
- [x] 🔧 `isg-blockierung-teufelskreis.md` — unbelegte 80%/40%-Zahlen entschärft, sonst gute Quellenlage (alle 6 Fußnoten passend)
- [x] 🔧 `kniearthrose-ohne-op-behandeln.md` — unbelegte wochenweise "-30%/-50%"-Erfolgsziele entschärft, unbelegte 80%-Hamstring-Zahl entfernt; ansonsten sehr sauber zitiert (Sihvonen/Kirkley/Thorlund korrekt wiedergegeben)
- [x] 🔧 `kopfschmerzen-trigeminus-ursache.md` — unbelegte 90%-Zahl (Intro), unbelegte 50-70%-Zahl entschärft, zwei überzogene Studienaussagen abgeschwächt; 18 Quellen größtenteils gut passend
- [x] 🔧 `kreuzbeinschmerzen-beckenstellung-rumpfstabilitaet.md` — bestbelegter Artikel bisher (Hodges/Richardson, Kovacs/Lancet, Arshad 2024 etc. korrekt); "16-fache Mehrbelastung" auf Physiopedia-Wiki-Quelle gestützt, Zahl entfernt und Quelle sollte langfristig durch Primärstudie ersetzt werden
- [x] 🔴 `migraene-ohne-aura-osteopathie.md` — **Sicherheitsrelevanter Fund:** enthielt wochenweisen Triptan-Reduktionsplan inkl. konkreter alternativer Medikamenten-Dosierung (Aspirin 1000mg + Metoclopramid 10mg) — das ist Medikamentensteuerung außerhalb der osteopathischen Kompetenz, komplett umgeschrieben auf "mit dem Arzt klären". Zusätzlich unbelegte Selbsttest-Diagnosewahrscheinlichkeiten (80%) entschärft. Krankenkassen-Zeile schon vorher gefixt.
- [x] 🔧 `osteopathie-hamburg-krankenkasse-erstattung-2026.md` — **kritisch, User-Meldung 2026-07-23:** komplette Erstattungstabelle war falsch (jede Kasse 3-4,5x überzeichnet, Barmer/hkk fälschlich als %-Erstattung statt Bonusprogramm/Festbetrag dargestellt). Auf offiziellen Kassenseiten (tk.de, barmer.de, dak.de, hkk.de, hek.de) nachrecherchiert und neu geschrieben, echte Quellen-Links ergänzt. **Folgefund:** dieselbe falsche "40-80€/3-6 Sitzungen"-Zahl steckte noch in 11 weiteren Artikeln (hws-blockierung, hueftschmerzen, kniearthrose, hws-syndrom, migraene, rueckenschmerzen-ganzheitlich, spannungskopfschmerzen, schulterschmerzen-frozen-shoulder, viszerale-osteopathie, kopfschmerzen-trigeminus, rueckenschmerzen-3-versteckte-ursachen) — alle korrigiert und auf den Kassenartikel verlinkt.
- [x] 🔧 `rueckenschmerzen-3-versteckte-ursachen.md` — gut gequellt (7 echte Fußnoten), nur übersehene "40-60€"-Krankenkassenzeile nachgezogen
- [x] 🔴 `rueckenschmerzen-osteopathie-ganzheitliche-behandlung-hamburg.md` — Frontmatter behauptet `sourceCount: 31`, aber **keine einzige Quelle im Text**. Mehrere "Studien zeigen"-Aussagen ohne Beleg entschärft (20%-TLF-Zahl, CV4 "fährt Nervensystem herunter", RCT-Protokoll fälschlich als Wirksamkeitsnachweis zitiert). Empfehlung: bei Gelegenheit echte Quellenliste ergänzen, analog zu den anderen Artikeln.
- [x] 🔧 `schleudertrauma-spaetfolgen-langfristig-behandeln.md` — **Zitatfehler:** "Studie Cassidy et al. 2008" mit erfundenem RCT-Design (40% weniger Symptome) entsprach nicht der tatsächlich gelisteten Cassidy-2000-Studie (andere Fragestellung) — entfernt. Unbelegte Symptomprozente (70/45/30/25%), rhetorische "5%"-Zahl und feste 70%/90%-Erholungs-Zeitlinie entschärft. Eigenständige Medikamenten-Dosierungsanweisung (Paracetamol 3-5 Tage) auf Arztverweis umgestellt.
- [x] 🔧 `schreibtisch-fehler-rueckenschmerzen.md` — gut zitiert (15 Fußnoten, meist passend), vier freistehende unbelegte Zahlen entschärft (67% Hamburg Büroarbeiter, 40% Stoffwechsel, 90% Fettverbrennung, 32% Rückenschmerz-Reduktion durch Steh-Sitz-Wechsel)
- [x] 🔴 `spannungskopfschmerzen-muskel-oder-hws.md` — **Praxis-Faktenfrage geklärt (User, 2026-07-23):** Artikel behauptete, der Praxisinhaber führe GON-Block-Injektionen durch — stimmt nicht, korrigiert auf "das macht ein Arzt, ich nutze Palpation". Unbelegte "60% zervikogen"-Zahl entschärft. **Braucht noch Tiefenüberarbeitung wie dehnen-Artikel:** Selbsttest-Struktur weist zu Behandlungswechsel an ("Massage ist NICHT ausreichend bei...") ohne validiertes Instrument.
- [ ] ⬜ `sportosteopathie-hamburg-leistung-optimieren.md`
- [ ] ⬜ `sportosteopathie-hamburg-marathon-vorbereitung.md`
- [ ] ⬜ `sportverletzung-schneller-zurueck-training.md`
- [ ] ⬜ `vagusnerv-aktivieren-stress-uebungen.md` ("sofort beruhigen" im Titel — prüfen)

---

**Out of Scope (nicht Teil dieses Durchgangs):** Behandlungsseiten (`src/app/behandlungen/*`) und Kernseiten (Homepage, `osteopath-hamburg`, `was-ist-osteopathie` etc.) — laut User nur die 33 Blog-Artikel sind relevant.

**Gesamt:** 33 Blog-Artikel. Gruppe A ist der schnelle Verifikations-Durchgang (11 Artikel, davon 9 bereits fertig bereinigt), Gruppe B (4) und Gruppe C (17) sind der eigentliche neue Scope.
