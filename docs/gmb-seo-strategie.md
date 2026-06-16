# GBP-SEO-Strategie — Osteopathie Alsen Hamburg

**Stand:** 16. Juni 2026 | **Ziel:** Lokale Map-Pack-Sichtbarkeit in Hamburg steigern

---

## Ausgangslage & Datenbasis

### Datenquellen (Stand 16.06.2026)
| Quelle | Methode |
|---|---|
| GBP Performance (30d / 90d) | Direkte GBP API (`businessprofileperformance.googleapis.com`) |
| GBP Suchbegriffe | Late/Zernio API (Analytics Add-on) |
| GBP Profil / Leistungen / Reviews | Direkte GBP API (`mybusiness.googleapis.com`, `mybusinessbusinessinformation.googleapis.com`) |
| Web-Rankings | Google Search Console (Service-Account) |

GBP API seit 16.06.2026 vollständig freigeschaltet (Projekt 34819951291). MCP-Server `mcp-servers/gbp/` aktiv.

### GBP-Profil (live, 16.06.2026)
- **Name:** Osteopathie Alsen – Heilpraxis für Osteopathie Hamburg
- **Adresse:** Rappstraße 7, 20146 Hamburg (Rotherbaum/Eimsbüttel-Grenze)
- **Primärkategorie:** Osteopath
- **Sekundärkategorien:** Chiropraktiker, Naturheilpraktiker *(beide bereits eingetragen)*
- **Öffnungszeiten:** Mo/Di 9–15 Uhr, Mi/Do 9–18 Uhr, Fr 9–14 Uhr *(aktualisiert 16.06.2026)*
- **Urlaub:** 09.–19. Juli 2026 eingetragen
- **Attribut:** Rollstuhlgerechter Eingang ✅ *(gesetzt 16.06.2026)*
- **Online-Buchung:** 24/7 laut `ONLINE_SERVICE_HOURS`

### GBP-Leistungen (6 × 150 €, 60 Min.)
1. Osteopathische Behandlung bei Rückenschmerzen
2. Osteopathie bei Kopfschmerzen & Migräne (inkl. CMD)
3. Viszerale Osteopathie (Verdauung)
4. Sportosteopathie & Verletzungsbehandlung
5. Osteopathie für Büroangestellte
6. Kraniosakrale Osteopathie ← **keine Website-Seite (Issue #5)**

### GBP-Beschreibung (live)
> „BAO-zertifizierter Osteopath und Heilpraktiker in Hamburg. Über 5.000 Ausbildungsstunden. Behandlung von Rückenschmerzen, Kopfschmerzen, Arthrose, Verdauungsbeschwerden und mehr. Termine verfügbar. Kostenerstattung durch Krankenkassen möglich."

⚠️ Inkonsistenzen: „BAO-zertifiziert" (GBP) vs. „VFO-zertifiziert" (Website) — klären. „Arthrose" erwähnt, aber kein GBP-Service und keine Beschreibungsleistung.

### Bewertungen (live, 16.06.2026)
- **45 Bewertungen · 5,0 / 5** (alle 5 ★)
- **Beantwortet: 8 | Unbeantwortet: 37**
- Qualität: ausnahmslos begeistert, viele detaillierte Texte

**Review-Velocity nach Monat:**
| Zeitraum | Reviews | Ø/Monat |
|---|---|---|
| Aug–Okt 2024 | 19 | 6,3 ← Launch-Schub |
| Nov 2024–Jan 2025 | 7 | 2,3 |
| Feb–Apr 2025 | 3 | 1,0 |
| Mai–Jul 2025 | 8 | 2,7 |
| Aug–Nov 2025 | 3 | 0,75 |
| Dez 2025–Feb 2026 | 3 | 1,0 |
| Mär–Jun 2026 | **1** | **0,25 ← kritisch** |

---

## Messwerte

### GBP Performance

**30 Tage (Mai 2026):**
| Metrik | Wert |
|---|---|
| Maps-Impressionen | 145 (mobil 123 / desktop 22) |
| Suche-Impressionen | 403 (mobil 309 / desktop 94) |
| **GBP-Impressionen gesamt** | **548** (~18 / Tag) |
| Routenanfragen | 50 |
| Website-Klicks | 32 |
| Anruf-Klicks | 1 |

**90 Tage (Mär–Jun 2026):**
| Metrik | 90d gesamt | Ø/Monat |
|---|---|---|
| Maps-Impressionen | 454 | 151 |
| Suche-Impressionen | 1.339 | 446 |
| **GBP-Impressionen gesamt** | **1.793** | **598** |
| Routenanfragen | 120 | 40 |
| Website-Klicks | 84 | 28 |
| Anruf-Klicks | 4 | 1,3 |

**Aktionsrate:** ~15 % → Profil konvertiert gut, wird aber kaum gezeigt. Kein klarer Aufwärtstrend — stabile Stagnation.

### GBP Suchbegriffe (Apr–Jun 2026, via Late API)
| Begriff | Impressionen im Profil |
|---|---|
| osteopathie hamburg | 216 |
| osteopathie | 60 |
| osteopath hamburg | 0 (unter Schwelle) |
| osteopathie in der nähe | 0 |

### Web-Rankings via GSC (30 Tage)
| Metrik | Wert |
|---|---|
| Klicks gesamt | 10.775 |
| Impressionen gesamt | 727.000 |
| Ø Position | 7,8 |
| Lokale Hamburg-Klicks | ~7 (0,22 % des Traffics) |

| Wichtige lokale Keywords | Position | Klicks |
|---|---|---|
| osteopathie hamburg | 12,6 | 5 |
| osteopath hamburg | — | 0 (242 Impr.) |
| bester osteopath hamburg | 23,8 | 0 |

---

## Kern-Diagnose

> **Deine Content-Maschine ist stark und überregional dominant — dein lokales Profil ist fast unsichtbar.**

Die Website zieht 727.000 Impressionen/Monat für überregionale Informationsbegriffe. Das GBP-Profil wird nur ~600× / Monat gezeigt — das ist die eigentliche Wachstumsbremse.

Drei Ursachen:

1. **Relevanz** — GBP-Leistungen und Website-Seiten überlappen nicht vollständig; Nackenschmerzen fehlt als GBP-Service trotz starker Website-Seite
2. **Prominenz** — Review-Velocity fast auf null (1 Review in Q2 2026); 37 Reviews unbeantwortet; GBP-Posts fehlen
3. **On-Page Bridge** — Blog-Artikel verlinken kaum auf lokale Service-Seiten

---

## Core-N-Gap (Abgleich GBP-Leistungen ↔ Website, Stand 16.06.2026)

| GBP-Leistung | Website-Seite | Status |
|---|---|---|
| Rückenschmerzen | `behandlungen/rueckenschmerzen` | ✅ |
| Kopfschmerzen & Migräne | `behandlungen/kopfschmerzen-migraene` | ✅ |
| Viszerale Osteopathie | `behandlungen/verdauungsbeschwerden` | ✅ |
| Sportosteopathie | `behandlungen/sportosteopathie` | ✅ |
| **Kraniosakrale Osteopathie** | — | ❌ fehlt (Issue #5) |
| Büroangestellte | — | ⚠️ kein eigenes Thema → GBP-Leistung überdenken |
| — | `behandlungen/nackenschmerzen` | ⚠️ starke Seite, aber kein GBP-Service → Kandidat zum Ergänzen |
| — | `behandlungen/arthrose-gelenkbeschwerden` | ⚠️ kein GBP-Service (aber in Beschreibung erwähnt) |
| — | `behandlungen/stress-burnout` | ⚠️ kein GBP-Service |

**Title-Tag-Abgleich:**
| Seite | Title | GBP-Abgleich |
|---|---|---|
| Homepage | „Osteopathie Hamburg - Joshua Alsen…" | ⚠️ „Osteopathie" ≠ GBP-Primär „Osteopath" |
| `/osteopath-hamburg` | „Osteopath Hamburg \| Joshua Alsen…" | ✅ exakter Match |
| `/behandlungen/verdauungsbeschwerden` | „…Viszerale Osteopathie **HH**" | ⚠️ „HH" → „Hamburg" |

---

## Neu gefundene Profil-Probleme (Audit 16.06.2026)

### A — Stale Special Hours
Alle eingetragenen Sonderöffnungszeiten sind aus **2025** (03.10., 31.10., 24.–26.12., 31.12.2025, 01.01.2026). Für 2026 fehlen Feiertage komplett. Muss jährlich aktualisiert werden.

### B — `hasGoogleUpdated: true`
Google hat eigene Änderungsvorschläge am Profil gemacht, die noch nicht bestätigt oder abgelehnt wurden. Einmalig im GBP-Dashboard prüfen und aktiv entscheiden (annehmen oder ablehnen).

### C — BAO vs. VFO Inkonsistenz
GBP-Beschreibung: „BAO-zertifiziert" — Website überall: „VFO-zertifiziert, B.Sc." Klären ob beides stimmt, dann vereinheitlichen.

### D — Arthrose in Beschreibung, nicht als Service
Die GBP-Beschreibung erwähnt Arthrose, aber es gibt keinen GBP-Service-Eintrag dazu. Entweder: Arthrose als GBP-Leistung ergänzen, oder aus der Beschreibung streichen.

### E — Nackenschmerzen als GBP-Service
Starke Website-Seite (`behandlungen/nackenschmerzen`), in mehreren Reviews erwähnt, aber kein GBP-Service-Eintrag. Bester Kandidat für eine Leistungs-Ergänzung im GBP-Dashboard.

---

## Strategie: Drei Hebel, nach Aufwand/Wirkung

### Hebel 1 — GBP-Profil bereinigen & vervollständigen
→ Direkt im GBP-Dashboard, kein Content-Risiko, sofortige Wirkung

**Sofortmaßnahmen (Profil-Hygiene):**
- `hasGoogleUpdated` prüfen und Änderungen aktiv annehmen/ablehnen
- Stale Special Hours 2025 entfernen, 2026-Feiertage nachtragen
- BAO vs. VFO klären, GBP-Beschreibung entsprechend anpassen
- Arthrose: entweder als GBP-Service ergänzen oder aus Beschreibung entfernen

**Leistungsliste optimieren:**
- Nackenschmerzen als GBP-Service ergänzen (klarer Kandidat)
- Büroangestellte überdenken: generisch und ohne Suchvolumen-Basis — eher streichen und durch Nackenschmerzen ersetzen
- Kraniosakrale Osteopathie behalten (eigenständige Technik mit Suchvolumen)

**Sekundärkategorien:**
- Chiropraktiker + Naturheilpraktiker bereits eingetragen ✅
- Prüfen ob weitere GBP-Kategorien verfügbar sind (z. B. Heilpraktiker, Manualtherapeut) — im GBP-Dashboard testen

**Review-Velocity reaktivieren (höchster Hebel):**
- Alle 37 offenen Reviews beantworten (via MCP `gbp_reply_to_review`)
- Systematische Bitte nach jeder Behandlung + direkter Review-Link griffbereit
- Ziel: mind. 2–3 neue Reviews/Monat

### Hebel 2 — Website an finales GBP-Profil angleichen
→ Erst nach Hebel 1, wenn Leistungsliste final ist

- Kraniosakrale Osteopathie: eigene Seite `/behandlungen/kraniosakrale-osteopathie` erstellen (Issue #5)
- Title-Tags: „HH" → „Hamburg" in Verdauungsbeschwerden-Seite (Issue #9)
- Homepage-Title: Abweichung „Osteopathie" vs. „Osteopath" prüfen und strategisch entscheiden
- Interne Verlinkung: Top-Blog-Artikel → Behandlungsseiten + `/osteopath-hamburg` (Issue #8)

### Hebel 3 — Blog-Autorität auf lokale Seiten übertragen
→ Langfristig, schrittweise

- Top-Blog-Artikel (Trigeminusnerv, Vagusnerv, Schleudertrauma…) → interne Links auf Behandlungsseiten
- `/osteopath-hamburg` aus Top-5-Traffic-Artikeln verlinken

---

## Issue-Prioritätsliste (aktualisiert)

| Issue | Thema | Kanal | Priorität |
|---|---|---|---|
| Neu A | `hasGoogleUpdated` prüfen | GBP-Dashboard | 🔴 sofort |
| Neu B | ~~Stale Special Hours 2025 bereinigen~~ | ~~GBP-Dashboard~~ | ✅ 16.06.2026 |
| Neu C | ~~BAO vs. VFO — Beschreibung auf VFO aktualisiert~~ | ~~API~~ | ✅ 16.06.2026 |
| #6 | 37 offene Reviews beantworten | MCP `gbp_reply_to_review` | 🔴 hoch |
| #6b | Review-Velocity reaktivieren (System) | Praxis-Prozess | 🔴 hoch |
| Neu D | ~~Nackenschmerzen als GBP-Service ergänzen~~ | ~~API~~ | ✅ 16.06.2026 |
| Neu E | ~~Arthrose als GBP-Service ergänzen~~ | ~~API~~ | ✅ 16.06.2026 |
| #2 | Weitere Sekundärkategorien prüfen | GBP-Dashboard | 🟠 mittel |
| #5 | ~~Kraniosakral-Seite bauen~~ | ~~Website~~ | ✅ 16.06.2026 |
| #9 | Title-Tags: „HH"→„Hamburg", Homepage-Title prüfen | Website | 🟡 niedrig |
| #8 | Internes Linking Blog→Behandlungsseiten | Website | 🟡 niedrig |
| #11 | Citations: Bing, Apple Maps, Branchenverzeichnisse | Extern | 🟡 niedrig |
| #7 | GBP-Posts (1–2×/Monat) | MCP `gbp_create_post` | 🟡 niedrig |
| #12 | Tracking-Dashboard automatisieren | MCP/Skript | 🟡 niedrig |
| #10 | Domain-Check | Technisch | 🟡 niedrig |

---

## Was diese Strategie bewusst *nicht* tut

- **Keine Massen-Stadtteil-Seiten** — Doorway-Page-Risiko; Eimsbüttel + Rotherbaum reichen
- **Kein Blog-Massenausbau** — 33 Artikel liefern Reichweite; Fokus auf Verlinkungsqualität, nicht Menge
- **Kein generierter Thin-Content** — jede neue Seite muss echte, differenzierte Information zu einer echten Leistung liefern
- **Keine Blog-Teaser als GBP-Posts** — Posts müssen für Map-Pack-Suchende Wert haben (Symptom → Lösung → Hamburg → CTA)
- **Keine Büroangestellten-Seite** — zu generisch, kein klares Suchvolumen

---

## Offene Datenlücken

| Was fehlt | Warum wichtig | Wie auflösen |
|---|---|---|
| Wettbewerber Map-Pack-Position | Benchmark: wie weit ist der Gap? | Manuell suchen / LeadSnap-Test |
| Local Citations Status | Bing, Apple Maps, Branchenverzeichnisse belegt? | Manuell oder Citation-Tool |

---

*Datenscripts: `mcp-servers/gbp/pull-status.ts`, `mcp-servers/gbp/index.ts` (MCP), `scripts/get-full-seo-data.ts`, `scripts/gsc-hamburg-queries.ts`*
