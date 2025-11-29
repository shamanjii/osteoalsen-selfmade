# 🚀 PostHog in Vercel aktivieren

## Problem
PostHog ist im Code integriert, aber läuft NICHT in Production, weil die Environment Variables fehlen.

## Lösung: Environment Variables in Vercel hinzufügen

### Schritt 1: Vercel Dashboard öffnen
1. Gehe zu: https://vercel.com/dashboard
2. Wähle dein Projekt: **osteoalsen-selfmade**
3. Klicke auf **Settings** (oben rechts)

### Schritt 2: Environment Variables hinzufügen
1. Gehe zu **Settings → Environment Variables** (linke Sidebar)
2. Füge folgende Variables hinzu:

#### Variable 1: NEXT_PUBLIC_POSTHOG_KEY
```
Name:  NEXT_PUBLIC_POSTHOG_KEY
Value: phc_f5bZrbN4BoQ6RPpxzO3m7IgITBvn34W8mKHjnhSoJo1
```
**Environments auswählen:**
- ✅ Production
- ✅ Preview
- ✅ Development

#### Variable 2: NEXT_PUBLIC_POSTHOG_HOST
```
Name:  NEXT_PUBLIC_POSTHOG_HOST
Value: https://eu.i.posthog.com
```
**Environments auswählen:**
- ✅ Production
- ✅ Preview
- ✅ Development

### Schritt 3: Redeploy triggern
Nach dem Hinzufügen der Variables:

**Option A: Automatisches Redeploy**
1. Gehe zu **Deployments** Tab
2. Klicke auf die letzte Production Deployment
3. Klicke auf **... (3 Punkte)** → **Redeploy**
4. Bestätige mit **Redeploy**

**Option B: Git Push (empfohlen)**
```bash
# Kleine Änderung machen um Redeploy zu triggern
echo "# PostHog aktiviert $(date)" >> README.md
git add README.md
git commit -m "chore: trigger redeploy for PostHog env vars"
git push origin main
```

### Schritt 4: Verifizierung (nach ~2-3 Minuten)

#### Test 1: Browser Console
1. Öffne https://www.osteoalsen.de
2. Öffne Browser DevTools (F12)
3. Gehe zu **Console**
4. Suche nach: "PostHog loaded" (sollte erscheinen)
5. Tippe ein: `posthog`
6. Sollte PostHog Object zeigen (nicht undefined)

#### Test 2: Network Tab
1. Öffne https://www.osteoalsen.de
2. DevTools → **Network** Tab
3. Filter: "posthog"
4. Sollte Requests zu `eu.i.posthog.com` zeigen

#### Test 3: HTML Source
```bash
curl -s https://www.osteoalsen.de | grep -i "posthog"
# Sollte jetzt PostHog Script-Tags zeigen
```

## Was passiert dann?

### Sofort nach Aktivierung:
- ✅ PostHog sammelt ab sofort alle Pageviews
- ✅ Click-Events auf Buttons & Links werden getrackt
- ✅ Conversion Funnel wird gemessen
- ✅ Session Recordings starten (mit Input-Masking für Datenschutz)

### Nach 24 Stunden:
- Erste aussagekräftige Daten verfügbar
- Pageviews, Click-Events, User Paths sichtbar

### Nach 1 Woche:
- Conversion Funnel komplett trackbar
- Heatmaps zeigen User-Verhalten
- A/B Testing möglich

## Dashboards erstellen

Sobald Daten reinkommen (nach Vercel Setup):

### 1. Conversion Funnel Dashboard
```
PostHog → Insights → New Insight → Funnel
```
Füge hinzu:
1. Step 1: `$pageview` (Homepage)
2. Step 2: `cta_click` (CTA geklickt)
3. Step 3: `booking_widget_opened` (Buchung gestartet)
4. Step 4: `booking_step_completed` where step = "Behandlungsgrund"
5. Step 5: `booking_step_completed` where step = "Termin"
6. Step 6: `booking_completed`

### 2. Top Pages Dashboard
```
PostHog → Insights → New Insight → Trends
```
- Event: `$pageview`
- Group by: `$current_url`
- Timeframe: Last 30 days

### 3. CTA Performance
```
PostHog → Insights → New Insight → Trends
```
- Event: `cta_click`
- Group by: `cta_type` (floating-button, hero, treatment-card)
- Breakdown: `page_path`

### 4. SEO Landing Pages Performance
```
PostHog → Insights → New Insight → Trends
```
- Event: `$pageview`
- Filter: `$referrer` contains "google"
- Group by: `$current_url`
- Metrics: Unique users, Conversions

## Wichtig: DSGVO-Konformität

PostHog ist bereits DSGVO-konform konfiguriert:
- ✅ EU-Server (https://eu.i.posthog.com)
- ✅ Alle Inputs werden maskiert
- ✅ `person_profiles: 'identified_only'` - keine unnötige User-Tracking
- ✅ Keine Cookies für nicht-identifizierte User

## Troubleshooting

### "PostHog keys not configured" in Console
→ Environment Variables noch nicht in Vercel gesetzt oder Redeploy fehlt

### Keine Daten in PostHog nach 1 Stunde
→ Browser Cache leeren, Incognito-Fenster testen

### PostHog lädt, aber keine Events
→ Prüfe ob Ad-Blocker PostHog blockiert (normal bei ~30% der User)

---

**Erstellt:** 27.11.2025
**Status:** ⚠️ AKTION ERFORDERLICH - Environment Variables in Vercel setzen
