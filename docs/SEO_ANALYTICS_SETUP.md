# 🚀 SEO + Analytics System - Complete Setup Guide

## Übersicht

Dein integriertes SEO & Analytics-System kombiniert:

- **PostHog**: User Analytics, Conversions, Funnels, Session Recordings
- **Google Search Console API**: Echte Ranking-Daten, Impressions, CTR
- **Custom SEO Dashboard**: Real-time Monitoring & Alerts
- **Automatisiertes Ranking-Tracking**: Tägliche Updates

---

## ✅ Was bereits funktioniert (Out of the box)

### 1. PostHog Analytics
- ✅ Installiert und konfiguriert
- ✅ Tracking läuft auf allen Seiten
- ✅ Conversion Funnel implementiert
- ✅ Event-Tracking für CTAs, Forms, Navigation

**Zugriff:**
- Dashboard: https://eu.posthog.com
- API Key: Bereits in `.env` gespeichert

### 2. Custom Event Tracking
Folgende Events werden automatisch getrackt:

| Event | Beschreibung | Location |
|-------|-------------|----------|
| `funnel_homepage_view` | Besucher auf Homepage | Home |
| `funnel_treatments_explored` | Besucher schaut Behandlungen an | Behandlungen |
| `funnel_booking_cta_clicked` | CTA zum Buchen geklickt | Überall |
| `funnel_booking_interface_opened` | Terminbuchungsseite besucht | Terminbuchung |
| `cta_clicked` | Jeder CTA-Klick | Überall |
| `treatment_viewed` | Behandlungsseite angesehen | Behandlungen |

### 3. Optimiertes Schema.org LocalBusiness
- ✅ Erweiterte LocalBusiness Structured Data
- ✅ Service Areas (Hamburg, Rotherbaum, Eimsbüttel, etc.)
- ✅ GeoCircle (10km Radius)
- ✅ Medical Specialties & Procedures
- ✅ Practitioner Credentials

---

## 🔧 Setup: Google Search Console API

Um echte Ranking-Daten abzurufen, benötigst du Google Search Console API-Zugriff:

### Schritt 1: Google Cloud Project erstellen

1. Gehe zu https://console.cloud.google.com/
2. Erstelle ein neues Projekt oder wähle ein bestehendes aus
3. Name: "Osteoalsen SEO Monitoring"

### Schritt 2: Search Console API aktivieren

1. Navigation: **APIs & Services** → **Library**
2. Suche: "Google Search Console API"
3. Klicke **Enable**

### Schritt 3: Service Account erstellen

1. Navigation: **APIs & Services** → **Credentials**
2. Klicke **Create Credentials** → **Service Account**
3. Name: `osteoalsen-seo-monitor`
4. Role: **Owner** (für vollen Zugriff)
5. Klicke **Done**

### Schritt 4: JSON Key herunterladen

1. Klicke auf den erstellten Service Account
2. Gehe zu **Keys** Tab
3. **Add Key** → **Create new key** → **JSON**
4. Speichere die heruntergeladene JSON-Datei sicher

### Schritt 5: Service Account zu Search Console hinzufügen

1. Gehe zu https://search.google.com/search-console/
2. Wähle deine Property (www.osteoalsen.de)
3. **Settings** → **Users and permissions**
4. **Add user**
5. Email: Die Service Account Email (z.B., `osteoalsen-seo-monitor@project-id.iam.gserviceaccount.com`)
6. Permission: **Owner**
7. **Add**

### Schritt 6: Credentials in dein Projekt einbinden

**Option A: Via Environment Variable (Empfohlen für Vercel)**
```bash
# In .env.local
GOOGLE_SERVICE_ACCOUNT_KEY_PATH=/path/to/service-account-key.json
```

**Option B: Direkt in Vercel (Für Production)**
1. Vercel Dashboard → dein Projekt → **Settings** → **Environment Variables**
2. Füge hinzu:
   - Name: `GOOGLE_SERVICE_ACCOUNT_KEY`
   - Value: Gesamter Inhalt der JSON-Datei als String

---

## 📊 Verwendung des SEO Dashboards

### Dashboard öffnen:
```
http://localhost:3000/admin/seo-dashboard
```

### Was du siehst:

1. **Overall SEO Score (0-100)**
   - Berechnet aus Rankings, CTR, Performance, etc.

2. **Search Console Metrics**
   - Total Clicks (Letzte 30 Tage)
   - Impressions
   - Average Position
   - CTR

3. **Top Keywords**
   - Ranking-Position
   - Clicks & Impressions

4. **Analytics**
   - Page Views, Unique Visitors
   - Conversion Rate
   - Appointment Bookings

5. **Recommendations**
   - Automatische Empfehlungen basierend auf deinen Daten
   - Priorisiert (High, Medium, Low)

---

## 🤖 Automatisiertes Ranking-Monitoring

### Manuell ausführen:
```bash
npm run monitor:rankings
```

### Automatisch täglich ausführen (via Cron):

**Option 1: Lokaler Server**
```bash
# Crontab öffnen
crontab -e

# Folgende Zeile hinzufügen (täglich um 9 Uhr morgens):
0 9 * * * cd /path/to/osteoalsen-selfmade && npm run monitor:rankings
```

**Option 2: Vercel Cron (Empfohlen)**

Erstelle `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/cron/monitor-rankings",
      "schedule": "0 9 * * *"
    }
  ]
}
```

Erstelle API Route: `src/app/api/cron/monitor-rankings/route.ts`:
```typescript
import { monitorRankings } from '@/scripts/monitor-rankings';

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  await monitorRankings();
  return Response.json({ success: true });
}
```

---

## 📈 Conversion Funnel in PostHog analysieren

1. Gehe zu PostHog Dashboard
2. **Insights** → **Funnels**
3. Erstelle neuen Funnel:
   - Step 1: `funnel_homepage_view`
   - Step 2: `funnel_treatments_explored`
   - Step 3: `funnel_booking_cta_clicked`
   - Step 4: `funnel_booking_interface_opened`
   - Step 5: `funnel_booking_completed`

4. Du siehst:
   - Conversion Rate pro Step
   - Drop-off Rate
   - Durchschnittliche Zeit pro Step

---

## 🎯 Priority Keywords überwachen

Die wichtigsten Keywords für deine lokale SEO:

```typescript
// In scripts/monitor-rankings.ts
const PRIORITY_KEYWORDS = [
  'osteopath hamburg',
  'osteopathie hamburg',
  'osteopath rotherbaum',
  'osteopathie rotherbaum',
  'osteopath eimsbüttel',
  'heilpraktiker hamburg',
  'osteopath hamburg mitte',
  'rückenschmerzen hamburg',
  'kopfschmerzen behandlung hamburg',
];
```

Du erhältst Alerts wenn:
- Position sich um ≥5 Plätze ändert (für Priority Keywords)
- Position sich um ≥10 Plätze ändert (für andere Keywords)

---

## 🔔 Alerts & Notifications einrichten

### Slack Integration (Optional)

1. Erstelle Slack Webhook:
   - https://api.slack.com/messaging/webhooks

2. Füge zu `.env` hinzu:
```bash
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

3. In `scripts/monitor-rankings.ts`, aktualisiere `sendAlert()`:
```typescript
async function sendAlert(alert: RankingAlert): Promise<void> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) return;

  const message = /* ... */;

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: message }),
  });
}
```

---

## 🚦 API Endpoints

| Endpoint | Beschreibung |
|----------|-------------|
| `GET /api/seo-health` | Vollständiger SEO Health Report |
| `GET /admin/seo-dashboard` | Interactive Dashboard UI |

---

## 📦 NPM Scripts

```json
{
  "monitor:rankings": "ts-node scripts/monitor-rankings.ts",
  "seo:health": "curl http://localhost:3000/api/seo-health | jq"
}
```

Füge diese zu deiner `package.json` hinzu!

---

## 🎉 Next Steps

### Kurzfristig (Diese Woche):
1. ✅ Google Search Console API einrichten
2. ✅ Erstes Ranking-Monitoring ausführen
3. ✅ PostHog Funnels analysieren

### Mittelfristig (Nächster Monat):
1. Alerts via Slack/Email einrichten
2. A/B Testing für CTAs mit PostHog Feature Flags
3. Content-Gap Analyse mit Ahrefs/SerpApi

### Langfristig (Nächste 3 Monate):
1. Automatisches Content-Suggestions basierend auf Search Console
2. Integration mit Google My Business API
3. Wettbewerber-Analyse automatisieren

---

## 🆘 Troubleshooting

### PostHog Events erscheinen nicht:
- Prüfe Browser Console auf Fehler
- Stelle sicher, dass `NEXT_PUBLIC_POSTHOG_KEY` gesetzt ist
- Prüfe, ob PostHog Script geladen wurde (DevTools → Network)

### Google Search Console API Fehler:
- Prüfe, ob Service Account zu Search Console hinzugefügt wurde
- Validiere JSON Key Path in `.env`
- Stelle sicher, dass API aktiviert ist

### Dashboard lädt nicht:
- Prüfe `/api/seo-health` Endpoint direkt
- Öffne Browser DevTools → Console für Fehler

---

## 💡 Pro-Tipps

1. **Nutze PostHog Session Recordings**
   - Sieh dir an, wie Nutzer wirklich mit deiner Seite interagieren
   - Finde UX-Probleme, die Conversions blockieren

2. **Erstelle Custom Dashboards in PostHog**
   - Kombiniere mehrere Insights
   - Teile mit Team/Kollegen

3. **Überwache Web Vitals**
   - Schlechte Performance = schlechtere Rankings
   - Track FCP, LCP, CLS, TTFB

4. **Nutze Feature Flags für A/B Tests**
   - Teste verschiedene CTAs
   - Messe, welche besser konvertieren

---

**Bei Fragen oder Problemen:** Check die Code-Kommentare oder frag Claude!
