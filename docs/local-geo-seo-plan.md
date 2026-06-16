# Local/Geo SEO Plan

Stand: 2026-06-01

Ziel: Lokale Sichtbarkeit fuer relevante Praxis-Suchen in Hamburg steigern, ohne AI-Slop, Keyword-Stuffing oder schlechtere User Experience. Nutzer sollen schnell verstehen, ob Joshua Alsen fuer ihr konkretes Problem in Hamburg der passende Ansprechpartner ist.

## Entscheidung: Hauptseite

**Startseite `/` ist die Hauptseite fuer "Osteopath Hamburg" und "Osteopathie Hamburg".**

Begruendung:
- Alle externen Links (GBP, Backlinks, Social Media) zeigen auf `/`
- Das gesamte Navigation-Equity fliesst auf `/` (Logo, "Home"-Link in jeder Seite)
- Google priorisiert Homepages bei lokalen Brand-Queries fuer Einzelpraxen
- LocalBusinessSchema laeuft bereits sitewide via layout.tsx

**`/osteopath-hamburg/` bekommt eine differenzierte Rolle:**
- Fokus auf "Osteopath Hamburg Rotherbaum" (standortspezifisch, transaktional)
- Wird als Conversion-Landingpage genuetzt (evtl. bezahlter Traffic, direkter Intent)
- Konkurriert NICHT mehr gegen die Startseite
- Bekommt eine klarere thematische Differenzierung

**Was das bedeutet in der Praxis:**
- Startseite-Title und H1 werden als lokale Hauptsignale optimiert
- `/osteopath-hamburg/` wird keyword-seitig auf Rotherbaum-spezifische Varianten eingegrenzt
- Interne Links aus Blogartikeln und Behandlungsseiten gehen zur Startseite ODER zu `/osteopath-hamburg/` je nach Kontext
- "bester Osteopath Hamburg" aus keywords-Array in `/osteopath-hamburg/` entfernen (HWG)

## Grundsatz

Local SEO entsteht hier aus echter lokaler Relevanz:

- klare Praxisdaten
- konkrete Standorte
- nachvollziehbarer Ablauf
- transparente Kosten
- Qualifikation und Vertrauen
- medizinische Grenzen und Warnzeichen
- hilfreiche interne Wege von Blogartikeln zu lokalen Behandlungsseiten

Vermeiden:

- generische Stadttexte
- duplizierte Stadtteilseiten ohne echte Substanz
- wiederholte "Osteopath Hamburg"-Formulierungen
- kuenstliche lokale Absaetze in jedem Blogartikel
- Superlative wie "bester Osteopath Hamburg", sofern nicht belegbar

## Phase 1: Fundament Schaerfen (Woche 1-2)

### 1. Google Business Profile optimieren — ERSTE PRIORITAET

GBP ist die staerkste lokale Rankingsignal-Quelle. Vor allen anderen Seiten-Aenderungen.

To-do:

- primaere Kategorie pruefen und auf "Osteopath" setzen
- Leistungen eintragen: Rueckenschmerzen, Nackenschmerzen, Kopfschmerzen, Sportosteopathie, Verdauungsbeschwerden
- beide Standorte konsistent pflegen (Rotherbaum + Eimsbuettel)
- Fotos: Praxisraum, Eingang, Behandlungsraum, Joshua Alsen, Aussenansicht
- Bewertungsprozess sauber aufsetzen
- auf Bewertungen individuell antworten
- URL im GBP-Profil: zeigt auf Startseite `/`

### 2. Startseite als lokale Hauptseite ausbauen

Die Startseite ist Hauptziel fuer:

- osteopathie hamburg
- osteopath hamburg
- osteopath hamburg rotherbaum
- osteopathie eimsbuettel

**Technisch (dringend):**

- `metadata`-Export in `/src/app/page.tsx` hinzufuegen — aktuell erbt die Startseite nur aus layout.tsx ohne eigene Ueberschreibung. Das bedeutet: kein kontrollierbares Title-Tag fuer die wichtigste Seite.
- Title: `Osteopathie Hamburg | Joshua Alsen – Rotherbaum & Eimsbuettel`
- Description: `VFO-zertifizierter Osteopath in Hamburg. 2 Standorte: Rotherbaum & Eimsbuettel. 60 Min., 150 EUR, Kassenzuschuss moeglich. Online-Termin buchen.`
- canonical: `"/"` (bereits gesetzt via layout, reicht)

**Inhaltlich — erster Viewport muss klar machen:**

- Osteopathie in Hamburg
- Joshua Alsen
- Standorte Rotherbaum und Eimsbuettel
- VFO-zertifiziert, B.Sc., Heilpraktiker
- 60 Minuten Behandlung
- 150 Euro
- Online-Terminbuchung
- Krankenkassenzuschuss moeglich

Die aktuelle HeroSection hat H1 "Osteopathie Hamburg: Rotherbaum & Eimsbuettel" und Trust-Badges. Preis (150 EUR) und Behandlungsdauer (60 Min.) fehlen noch above the fold.

### 3. `/osteopath-hamburg/` neu ausrichten

Keyword-Abgrenzung von der Startseite:

- keywords-Array: "bester Osteopath Hamburg" entfernen (HWG-Problem)
- Fokus auf standortspezifische Varianten: "Osteopath Hamburg Rotherbaum", "Osteopathie Rotherbaum Hamburg", "Osteopath Rotherbaum"
- H1 bleibt "Osteopath in Hamburg" — ist differenziert genug von Startseite-H1 "Osteopathie Hamburg..."
- Eimsbuettel-Standort erwaehnen (aktuell zeigt die Seite nur Rotherbaum)
- Seite bleibt erreichbar, kein Redirect, kein canonical auf Startseite

## Phase 2: Lokale Seitenstruktur (Woche 2-3)

### 4. Standortseiten verbessern

Prioritaet:

- `/osteopathie-rotherbaum/`
- `/osteopathie-eimsbuettel/`

Jede Seite braucht eigene Substanz:

- genaue Adresse
- Anfahrt mit OEPNV, Fahrrad, Auto
- Parken
- Orientierung vor Ort
- fuer wen der Standort praktisch ist (Stadtteile in der Naehe)
- Behandlungsangebot am Standort
- Terminbuchung
- lokale FAQs

Keine duennen Seiten fuer weitere Hamburger Stadtteile ohne echte lokale Relevanz.

Beide Standortseiten sollen auf Startseite (nicht auf `/osteopath-hamburg/`) als uebergeordnete Einheit verlinken.

### 5. Behandlungsseiten lokal anschaerfen

Prioritaet:

- `/behandlungen/nackenschmerzen/`
- `/behandlungen/rueckenschmerzen/`
- `/behandlungen/kopfschmerzen-migraene/`
- `/behandlungen/sportosteopathie/`
- `/behandlungen/verdauungsbeschwerden/`
- `/behandlungen/arthrose-gelenkbeschwerden/`

Jede Seite braucht oben eine kompakte Entscheidungshilfe:

- Behandlung in Hamburg-Rotherbaum und Eimsbuettel
- fuer wen geeignet
- wann aerztlich abklaeren
- Ablauf der ersten Sitzung
- Kosten und Zuschuss
- Termin-CTA

## Phase 3: Blog-Traffic in lokale Nachfrage uebersetzen (Woche 3-4)

### 6. Top-Blogartikel mit lokalen Bruecken versehen

Nicht jeden Blogartikel lokal vollstopfen. Stattdessen passende lokale CTA-Boxen.

Prioritaet:

- Radix Mesenterii / Rueckenschmerzen und Verdauung
- Trigeminusnerv
- HWS-Blockierung
- Reizdarm und Rueckenschmerzen
- Nackenschmerzen und Schwindel
- Kniearthrose

Element:

- kurze Box "Osteopathische Abklaerung in Hamburg"
- 3 bis 4 konkrete Saetze
- passend zum Thema
- Link zur passenden Behandlungsseite
- Link zur Terminbuchung

Beispiele:

- Trigeminus -> Kopfschmerzen, Kiefer, HWS
- Radix -> Verdauung und Ruecken
- Kniearthrose -> Gelenkbeschwerden
- HWS -> Nackenschmerzen und HWS-Blockaden

### 7. Interne Links strategisch setzen

Von Blog zu Leistungsseiten:

- Trigeminus -> `/behandlungen/kopfschmerzen-migraene/`
- HWS-Blockierung -> `/behandlungen/nackenschmerzen/`
- Radix/Reizdarm -> `/behandlungen/verdauungsbeschwerden/`
- Kniearthrose -> `/behandlungen/arthrose-gelenkbeschwerden/`
- Sportverletzung -> `/behandlungen/sportosteopathie/`

Allgemeine Hamburg-Kontexte (z.B. wer ist der Behandler, was kostet es) koennen auf Startseite verlinken.

Natuerliche Anchors:

- "osteopathische Behandlung bei Nackenschmerzen in Hamburg"
- "Kopfschmerzen und Migraene osteopathisch abklaeren"
- "Verdauungsbeschwerden osteopathisch einordnen"

Nicht immer exakt "Osteopath Hamburg" verwenden. Variation ist gut.

## Phase 4: Snippet- und CTR-Optimierung

### 8. Title und Description lokaler Seiten testen

Startseite (nach Hinzufuegen von eigenem metadata-Export):

Title:
`Osteopathie Hamburg | Joshua Alsen – Rotherbaum & Eimsbuettel`

Description:
`VFO-zertifizierter Osteopath in Hamburg. 2 Standorte: Rotherbaum & Eimsbuettel, 60 Min. Behandlung, 150 EUR, Kassenzuschuss moeglich. Online-Termin buchen.`

`/osteopath-hamburg/` (nach Neuausrichtung):

Title:
`Osteopath Hamburg Rotherbaum | Joshua Alsen – VFO-zertifiziert`

Description:
`Osteopath in Hamburg-Rotherbaum. VFO-zertifiziert, B.Sc. Osteopathie, Heilpraktiker. 60 Min., 150 EUR. Kurzfristige Termine moeglich. Kassenzuschuss.`

Nackenschmerzen:
`Nackenschmerzen & HWS-Blockade | Osteopathie Hamburg`

Rueckenschmerzen:
`Rueckenschmerzen Hamburg | Osteopathische Behandlung`

### 9. Lokale FAQs mit echtem Nutzen

Gute Fragen:

- Was kostet Osteopathie in Hamburg?
- Uebernimmt die Krankenkasse Osteopathie?
- Wie schnell bekomme ich einen Termin?
- Welcher Standort ist fuer mich besser erreichbar?
- Wann sollte ich bei Nackenschmerzen zuerst zum Arzt?

Schlechte Fragen:

- Warum ist Osteopathie Hamburg so beliebt?
- Was macht Hamburg besonders?
- generische SEO-Fuellfragen

## Phase 5: Vertrauen und Conversion

### 10. E-E-A-T sichtbar machen

Auf wichtigen lokalen Seiten sichtbar machen:

- Joshua Alsen als Person
- Qualifikation (VFO-zertifiziert, B.Sc., Heilpraktiker)
- Ausbildungsstunden
- klare medizinische Grenzen
- Hinweis auf aerztliche Abklaerung bei Warnzeichen

Keine konkreten Fallverlaeufe oder Behandlungsbeispiele (HWG).

### 11. Bewertungen systematisch nutzen

Prozess:

- nach passender Behandlung freundlich um Bewertung bitten
- Direktlink zum Google-Profil
- keine Keyword-Vorgaben an Patienten
- keine gekauften oder gefakten Bewertungen
- individuell antworten
- echte Review-Auszuege sparsam auf der Website nutzen (ohne Heilungsversprechen)

### 12. Kontakt- und Termin-UX verbessern

Auf lokalen Seiten immer schnell auffindbar:

- Termin buchen
- Telefonnummer
- Standorte
- Kosten
- Dauer
- Krankenkasse
- Ablauf des ersten Termins

## Phase 6: Offpage lokal

### 13. Lokale Citations bereinigen

NAP-Daten konsistent halten (Name, Adresse, Telefon, Website):

- Google Business Profile
- Apple Maps
- Bing Places
- Doctolib/Jameda, falls genutzt
- Heilpraktiker-/Osteopathie-Verzeichnisse
- VFO/Verbandsprofil
- lokale Branchenverzeichnisse

Alle Eintraege zeigen auf Startseite `/`.

### 14. Lokale Backlinks mit Substanz

Gute Quellen:

- Berufsverband
- Kooperationspartner
- lokale Sportvereine
- Gesundheitsnetzwerke
- Podcasts oder Interviews
- lokale Presse bei echtem Anlass
- fachlich starke Gastbeitraege

Vermeiden:

- gekaufte SEO-Links
- generische Gastartikel
- minderwertige "Top 10 Osteopathen Hamburg"-Listen

## Messplan

Baseline: GSC-Daten vom 2026-05-09 (Pre-Deploy-Baseline) verwenden.
Tool: Google Search Console API (vorhandene Scripts in osteoalsen-selfmade/scripts/ bzw. gsc-api-scripts).
Rhythmus: alle 30 Tage pruefen.

Keywords beobachten:

- osteopathie hamburg
- osteopath hamburg
- osteopath hamburg rotherbaum
- osteopathie eimsbuettel
- nackenschmerzen behandlung hamburg
- rueckenschmerzen hamburg
- kopfschmerzen behandlung hamburg
- sportosteopathie hamburg

KPIs:

- lokale Impressions
- lokale Klicks
- Positionen der Hauptseite `/` fuer "osteopath hamburg" und "osteopathie hamburg"
- Position von `/osteopath-hamburg/` fuer "osteopath hamburg rotherbaum"
- CTR lokaler Seiten
- Klicks auf Terminbuchung aus Blogartikeln
- Google Business Profile: Anrufe, Routen, Website-Klicks

## Prioritaet fuer die naechsten 14 Tage

1. **GBP vollstaendig pruefen und optimieren** (Kategorie, Leistungen, Fotos, beide Standorte)
2. **`metadata`-Export in `page.tsx` der Startseite** hinzufuegen mit optimiertem Title und Description
3. **Startseite lokal schaerfen** — Preis (150 EUR) und Behandlungsdauer above the fold
4. **`/osteopath-hamburg/`** — "bester Osteopath Hamburg" aus keywords entfernen, Eimsbuettel-Standort erwaehnen, Title/Description auf Rotherbaum-Fokus aendern
5. **Rotherbaum- und Eimsbuettel-Seiten** mit echten lokalen Infos verbessern
6. **Top 6 Blogartikel** mit lokalen CTA-Boxen ergaenzen
7. **Interne Links** von Blog zu Behandlungsseiten sauber setzen
