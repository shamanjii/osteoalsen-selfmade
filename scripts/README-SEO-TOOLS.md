# 🚀 Kostenlose SEO Tools

Zwei leistungsstarke SEO-Tools für Konkurrenz-Analyse und Keyword-Recherche - **100% kostenlos**!

## 📊 Verfügbare Tools

### 1. SERP Competitor Analysis
Analysiert deine Konkurrenz in den Google-Suchergebnissen.

**Features:**
- Top 10 Konkurrenten für ein Keyword
- Position, URL, Title, Snippet
- Lokale Hamburg-Businesses erkennen
- Deine eigene Position tracken
- Durchschnittliche Title-Länge berechnen

### 2. Keyword Research Tool
Findet Keyword-Opportunities und Content-Gaps.

**Features:**
- Keyword-Opportunities aus Google Search Console
- High-Priority Keywords identifizieren
- Content-Gaps erkennen
- Potenzielle Klicks berechnen
- Detaillierte Reports (JSON)

---

## 🛠️ Setup

### Tool 1: SERP Competitor Analysis

Nutzt SerpAPI (100 kostenlose Requests/Monat)

**Einrichtung:**
```bash
# 1. Erstelle kostenlosen Account
# Gehe zu: https://serpapi.com
# Keine Kreditkarte erforderlich!

# 2. Kopiere deinen API Key vom Dashboard

# 3. Setze Environment Variable
export SERPAPI_KEY="dein-api-key-hier"

# Oder füge in .env hinzu:
echo "SERPAPI_KEY=dein-api-key-hier" >> .env
```

**Usage:**
```bash
# Einzelnes Keyword analysieren
npx tsx scripts/serp-competitor-analysis.ts "Osteopath Hamburg"

# Weitere Beispiele
npx tsx scripts/serp-competitor-analysis.ts "Rückenschmerzen Behandlung"
npx tsx scripts/serp-competitor-analysis.ts "Osteopathie bei Arthrose"
```

**Output:**
```
================================================================================
📊 SERP ANALYSE: "Osteopath Hamburg"
================================================================================

📅 Datum: 18.12.2025, 20:30:00
🎯 Gefundene Ergebnisse: 10
✅ Deine Position: #5

--------------------------------------------------------------------------------
🏆 TOP 10 KONKURRENTEN:
--------------------------------------------------------------------------------

   🥇 Position #1
   📌 Osteopathie in Hamburg - Die besten Osteopathen
   🔗 https://www.jameda.de/hamburg/osteopathen
   🌐 Domain: jameda.de
   📝 Finden Sie Ihren Osteopathen in Hamburg...

👉 🥈 Position #5
   📌 Osteopath Hamburg | Joshua Alsen
   🔗 https://www.osteoalsen.de
   🌐 Domain: osteoalsen.de
   📝 Osteopathie Hamburg Eimsbüttel...
```

---

### Tool 2: Keyword Research

Nutzt deine **vorhandenen** Google Search Console Credentials!

**Einrichtung:**
```bash
# Keine weitere Einrichtung nötig!
# Credentials sind bereits in credentials/google-search-console.json
```

**Usage:**
```bash
# Vollständige Analyse (alle Keywords)
npx tsx scripts/keyword-research.ts

# Nur bestimmtes Topic analysieren
npx tsx scripts/keyword-research.ts --topic="Osteopathie"
npx tsx scripts/keyword-research.ts --topic="Rückenschmerzen"

# Mit Trending Topics
npx tsx scripts/keyword-research.ts --trending
```

**Output:**
```
================================================================================
🎯 KEYWORD OPPORTUNITIES (Top 20)
================================================================================

🔥 #1 - osteopathie hamburg
   📊 Impressions: 802
   📍 Position: #19
   📈 CTR: 0.00%
   💰 Potenzial: +80 Klicks/Monat
   🎯 Action: Auf Seite 1 bringen (aktuell Seite 2)
   ⚡ Priorität: HIGH

⭐ #2 - osteopathie bei arthrose
   📊 Impressions: 332
   📍 Position: #12
   📈 CTR: 0.00%
   💰 Potenzial: +33 Klicks/Monat
   🎯 Action: Auf Seite 1 bringen (aktuell Seite 2)
   ⚡ Priorität: HIGH

================================================================================
🕳️  CONTENT GAPS - Fehlende Inhalte
================================================================================

1. Rückenschmerzen 🟡
   📊 Suchvolumen: 679 Impressions
   🏷️  Keywords: reizdarm symptome rückenschmerzen, bandscheibenvorfall hws...
   🎯 Wettbewerb: MEDIUM
   💡 Erstelle Content zu "Rückenschmerzen" - 116 relevante Keywords gefunden
```

---

## 📈 Workflow-Empfehlung

### Wöchentliche SEO-Routine

**1. Keyword-Opportunities finden (Jeden Montag)**
```bash
npx tsx scripts/keyword-research.ts
```

Analysiere den Report:
- Fokussiere auf HIGH-Priority Keywords
- Identifiziere Quick Wins (Position 4-10 mit hohen Impressions)
- Prüfe Content-Gaps

**2. Konkurrenz-Analyse (Bei neuen Keywords)**
```bash
# Für jedes High-Priority Keyword
npx tsx scripts/serp-competitor-analysis.ts "dein-keyword"
```

Finde heraus:
- Wer rankt aktuell auf Position 1-3?
- Wie lang sind deren Titles?
- Welche Domains dominieren?

**3. Content optimieren**
- Optimiere bestehende Seiten für Position 4-10 Keywords
- Erstelle neuen Content für Content-Gaps
- Verbessere Title/Description für bessere CTR

**4. Monitoring (Jeden Monat)**
```bash
# Tracking der Fortschritte
npx tsx scripts/keyword-research.ts > reports/monthly-$(date +%Y-%m).txt
```

---

## 💡 Pro-Tipps

### SERP Competitor Analysis

**Best Practices:**
- Analysiere deine Top 10 High-Priority Keywords
- Achte auf lokale Konkurrenten (Hamburg-Businesses)
- Prüfe Title-Längen für Optimierung
- Speichere Snapshots regelmäßig zum Vergleich

**Limits:**
- 100 Requests/Monat (SerpAPI Free Tier)
- Spare Requests: Fokussiere auf wichtigste Keywords

### Keyword Research

**Keyword-Prioritäten:**
1. **HIGH Priority + Position 11-20** → Schnelle Wins!
2. **HIGH Priority + Position 4-10** → Mittelfristig optimieren
3. **Content Gaps mit LOW Competition** → Neue Artikel

**Content-Gap-Strategie:**
1. Sortiere nach Suchvolumen
2. Prüfe Competition (LOW = einfacher zu ranken)
3. Erstelle umfassenden Content
4. Verlinke intern mit bestehenden Artikeln

---

## 📂 Gespeicherte Daten

### SERP Analysis
```
data/serp-analysis/
├── serp-analysis-Osteopath-Hamburg-2025-12-18.json
├── serp-analysis-Rückenschmerzen-2025-12-18.json
└── ...
```

### Keyword Research
```
data/keyword-research/
├── report-2025-12-18.json
├── report-2025-12-25.json
└── ...
```

**Report-Struktur:**
```json
{
  "date": "2025-12-18T19:30:00.000Z",
  "opportunities": [...],
  "contentGaps": [...],
  "trendingTopics": [...],
  "summary": {
    "totalOpportunities": 19,
    "highPriority": 11,
    "totalPotentialClicks": 311,
    "contentGapsFound": 5
  }
}
```

---

## ❓ Troubleshooting

### SERP Tool: "SERPAPI_KEY nicht gefunden"
```bash
# Prüfe ob Variable gesetzt ist
echo $SERPAPI_KEY

# Falls leer, setze erneut
export SERPAPI_KEY="dein-api-key"

# Oder nutze .env
echo "SERPAPI_KEY=dein-api-key" >> .env
```

### Keyword Tool: "Credentials Error"
```bash
# Prüfe ob Credentials-Datei existiert
ls -la credentials/google-search-console.json

# Falls nicht vorhanden, erstelle Service Account auf
# https://console.cloud.google.com/apis/credentials
```

### "Permission denied"
```bash
# Scripts ausführbar machen
chmod +x scripts/serp-competitor-analysis.ts
chmod +x scripts/keyword-research.ts
```

---

## 🎯 Nächste Schritte

1. **Setup SerpAPI**: Account erstellen auf https://serpapi.com
2. **Erste Analyse**: `npx tsx scripts/keyword-research.ts`
3. **Prioritäten setzen**: Fokussiere auf Top 5 High-Priority Keywords
4. **Content planen**: Nutze Content-Gaps für Redaktionsplan
5. **Monitoring**: Wöchentliche Reports tracken

---

## 💰 Kosten

- **SERP Competitor Analysis**: 100% kostenlos (100 Requests/Monat)
- **Keyword Research**: 100% kostenlos (unbegrenzt)
- **Gesamt**: **0€/Monat**

Vergleich mit SEMrush: ~$120-$450/Monat gespart! 🎉

---

## 📚 Ressourcen

- [SerpAPI Dokumentation](https://serpapi.com/docs)
- [Google Search Console API](https://developers.google.com/webmaster-tools/search-console-api-original)
- [SEO Best Practices](https://developers.google.com/search/docs)

---

**Viel Erfolg beim Dominieren der Google-Rankings! 🚀**
