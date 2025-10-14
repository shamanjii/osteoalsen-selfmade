# 📅 Blog Publishing Configuration

**Zweck**: Automatische Berechnung von Publish-Dates für jeden neuen Artikel

---

## ⚙️ Publishing Settings

```json
{
  "publishingStrategy": "sequential",
  "intervalDays": 3,
  "startDate": "2025-10-15",
  "autoPublish": true,
  "backdate": false,
  "timeOfDay": "00:00:00"
}
```

### Erklärung:

- **publishingStrategy**: `"sequential"` = Ein Artikel nach dem anderen
- **intervalDays**: `3` = Alle 3 Tage ein neuer Artikel
- **startDate**: `"2025-10-15"` = Erster Artikel erscheint am 15.10
- **autoPublish**: `true` = Cron Job published automatisch
- **backdate**: `false` = KEINE Zurückdatierung (für SEO-Safety)
- **timeOfDay**: `"00:00:00"` = Veröffentlichung um Mitternacht

---

## 📅 Berechnete Publishing Dates

| Artikel # | Titel | Berechnet Publish Date | Status |
|-----------|-------|------------------------|--------|
| 1.1 | Nackenschmerzen & HWS | 2025-10-15 | 📝 NÄCHSTER |
| 1.2 | 5 Faszien-Übungen | 2025-10-18 | ⏳ Wartend |
| 1.3 | Ergonomie Arbeitsplatz | 2025-10-21 | ⏳ Wartend |
| 1.4 | Osteopathie für Büroangestellte | 2025-10-24 | ⏳ Wartend |
| 2.1 | Die drei Säulen der Osteopathie | 2025-10-27 | 🔒 Phase 2 |
| 2.2 | Osteopathie vs. Physio vs. Chiro | 2025-10-30 | 🔒 Phase 2 |
| 2.3 | ISG-Blockade & Beckenschiefstand | 2025-11-02 | 🔒 Phase 2 |
| 2.4 | CMD & Kiefergelenk | 2025-11-05 | 🔒 Phase 2 |

**Auto-calculated**: Wenn Artikel N geschrieben wird, wird `scheduledPublishAt = lastPublishDate + intervalDays`

---

## 🔧 Dynamic Date Calculation

Claude berechnet beim Schreiben automatisch:

```javascript
function getNextPublishDate() {
  // Lese letzten geschriebenen Artikel aus Roadmap
  const lastArticle = getLastWrittenArticle();

  if (!lastArticle) {
    // Erster Artikel
    return new Date(config.startDate);
  }

  // Nächstes Datum = letzter + interval
  const nextDate = new Date(lastArticle.scheduledPublishAt);
  nextDate.setDate(nextDate.getDate() + config.intervalDays);

  return nextDate;
}
```

**Beispiel:**
- Artikel 1 geschrieben am 13.10 → scheduledPublishAt: 15.10
- Artikel 2 geschrieben am 14.10 → scheduledPublishAt: 18.10 (15.10 + 3 Tage)
- Artikel 3 geschrieben am 15.10 → scheduledPublishAt: 21.10 (18.10 + 3 Tage)

---

## 🎯 Publishing Rhythm Options

Du kannst das Intervall jederzeit anpassen:

### **Option A: Schnelles Wachstum** (current)
```json
{ "intervalDays": 3 }
```
- 6 Artikel in 18 Tagen
- Schneller Content-Aufbau
- Pro Monat: ~10 neue Artikel

### **Option B: Steady & Sustainable**
```json
{ "intervalDays": 7 }
```
- 1 Artikel pro Woche
- Natürlicheres Wachstum
- Pro Monat: 4 neue Artikel

### **Option C: Ultra-Natürlich**
```json
{ "intervalDays": 5, "randomOffset": 2 }
```
- Alle 5-7 Tage (variiert)
- Sieht sehr natürlich aus
- Schwieriger für Google zu erkennen

**Meine Empfehlung für dich**: Option A (intervalDays: 3) - guter Kompromiss

---

## 🔄 Ablauf-Beispiel

### Tag 1 (13.10.2025):
```
Du: "fahre mit dem blog redaktionsplan fort"

Claude:
→ Liest Roadmap: Nächster = Artikel 1.1
→ Liest Config: startDate = 15.10, interval = 3
→ Berechnet: scheduledPublishAt = 15.10.2025 00:00:00
→ Schreibt Artikel (4-5 Stunden)
→ POST /api/cms/blog/create-draft {
    title: "Nackenschmerzen & HWS-Syndrom verstehen",
    scheduledPublishAt: "2025-10-15T00:00:00Z",
    status: "DRAFT",
    ...
  }
→ Updated Roadmap:
  Artikel 1.1: ✅ Geschrieben, publish: 15.10
  Artikel 1.2: 📝 NÄCHSTER
```

### Tag 2 (14.10.2025):
```
Du: "fahre mit dem blog redaktionsplan fort"

Claude:
→ Liest Roadmap: Nächster = Artikel 1.2
→ Findet letzten: Artikel 1.1, scheduledPublishAt = 15.10
→ Berechnet: 15.10 + 3 = 18.10.2025
→ Schreibt Artikel 1.2
→ POST /api/cms/blog/create-draft {
    scheduledPublishAt: "2025-10-18T00:00:00Z"
  }
→ Updated Roadmap:
  Artikel 1.2: ✅ Geschrieben, publish: 18.10
  Artikel 1.3: 📝 NÄCHSTER
```

### Tag 15.10.2025 00:00:
```
Cron Job läuft:
→ Findet: Artikel 1.1 mit scheduledPublishAt = 15.10
→ Update: status = PUBLISHED, publishedAt = 15.10
→ Sync zu Main Site
→ Git push
→ Vercel deploy
→ 🎉 Artikel ist live
```

---

## ✅ Status-Tracking in Roadmap

Neue Status-Flags:

| Status | Symbol | Bedeutung |
|--------|--------|-----------|
| **📝 NÄCHSTER** | 🔴 | Wird als Nächstes geschrieben |
| **✍️ In Arbeit** | 🟡 | Claude schreibt gerade |
| **✅ Geschrieben** | 🟢 | Im CMS als Draft, wartet auf Publish |
| **🚀 Published** | 🔵 | Live auf Website |
| **⏳ Wartend** | ⚪ | Wartet auf vorherigen Artikel |

---

## 🎯 Vorteil: Flexible Anpassung

Wenn du **schneller** publishen willst:
```
Du: "ändere publishing interval auf 2 tage"

Claude:
→ Updated BLOG_PUBLISHING_CONFIG.md
→ Neue Artikel werden mit intervalDays: 2 berechnet
```

Wenn du einen Artikel **verzögern** willst:
```
Du: "verschiebe artikel 1.3 auf den 25.10"

Claude:
→ Ruft CMS API auf: UPDATE scheduledPublishAt
→ Alle nachfolgenden Dates werden neu berechnet
```

---

## 🚀 Start-Kommando

Alles ist bereit! Du kannst jetzt starten:

```
"fahre mit dem blog redaktionsplan fort"
```

Claude wird:
1. ✅ Config lesen
2. 📝 Artikel 1.1 schreiben (hochwertig, 4000+ Wörter)
3. 📤 Im CMS speichern (scheduledPublishAt: 15.10.2025)
4. ✅ Roadmap updaten
5. 🎯 Bereit für nächsten Artikel

---

**Zuletzt aktualisiert**: 2025-10-13
**Nächster Artikel**: #1.1 Nackenschmerzen (Publish: 15.10.2025)
