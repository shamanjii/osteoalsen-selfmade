# 📊 POSTHOG ANALYTICS INTEGRATION - VOLLSTÄNDIGE ANALYSE

**Datum:** 27. November 2025
**Status:** ✅ Vollständig konfiguriert und aktiv

---

## 🎯 EXECUTIVE SUMMARY

PostHog ist **professionell integriert** und trackt:
- ✅ **Page Views** (automatisch)
- ✅ **Conversion Funnel** (6-Schritte Booking-Prozess)
- ✅ **CTA-Klicks** (Buttons, Telefon, Email)
- ✅ **Formular-Interaktionen** (Start, Fehler, Abbruch, Success)
- ✅ **Behandlungs-Engagement** (Views, Clicks)
- ✅ **Session Recordings** (GDPR-konform mit Masking)
- ✅ **Autocapture** (Clicks auf Buttons & Links)

**PostHog Host:** https://eu.i.posthog.com (EU-Server = GDPR-compliant)
**PostHog Key:** phc_f5bZrbN4BoQ6RPpxzO3m7IgITBvn34W8mKHjnhSoJo1

---

## 🔐 DATENSCHUTZ & GDPR-KONFORMITÄT

### ✅ Privacy-First Konfiguration

```typescript
{
  person_profiles: 'identified_only',    // ✓ Nur identifizierte User tracken
  capture_pageview: false,                // ✓ Manuelle Kontrolle über Pageviews
  capture_pageleave: true,                // ✓ Exit Intent tracking

  autocapture: {
    dom_event_allowlist: ['click'],      // ✓ Nur Klicks, keine Eingaben
    url_allowlist: [/osteoalsen\.de/],   // ✓ Nur eigene Domain
    element_allowlist: ['button', 'a'],   // ✓ Nur Buttons & Links
  },

  session_recording: {
    maskAllInputs: true,                  // ✓ Alle Eingabefelder maskiert
    maskTextSelector: '[data-sensitive]', // ✓ Sensitive Elemente geschützt
  }
}
```

**Bedeutung:**
- 🔒 GDPR-konform (EU-Server + Privacy Settings)
- 🔒 Keine persönlichen Daten ohne Consent
- 🔒 Formular-Eingaben werden NICHT aufgezeichnet
- 🔒 Session Recordings mit automatischer Maskierung

---

## 📈 GETRACKTE METRIKEN

### 1. CONVERSION FUNNEL (6 Schritte)

**Vollständiger Booking-Prozess getrackt:**

```
Schritt 1: Homepage angesehen
  ↓ Event: funnel_homepage_view

Schritt 2: Behandlungen erkundet
  ↓ Event: funnel_treatments_explored
  ↓ Parameter: treatment_type (z.B. "arthrose", "nackenschmerzen")

Schritt 3: CTA geklickt
  ↓ Event: funnel_booking_cta_clicked
  ↓ Parameter: cta_location (z.B. "floating_button", "hero", "footer")

Schritt 4: Booking Interface geöffnet
  ↓ Event: funnel_booking_interface_opened

Schritt 5: Formular gestartet
  ↓ Event: funnel_booking_form_started

Schritt 6: CONVERSION! Buchung abgeschlossen
  ✓ Event: funnel_booking_completed
  ✓ Conversion Value: 150€ (Durchschnittspreis)
```

**Drop-Off Tracking:**
```
Event: funnel_booking_abandoned
Parameter: last_completed_field
→ Zeigt an welchem Formularfeld User abbrechen
```

---

### 2. CTA & ENGAGEMENT TRACKING

#### Getrackte CTAs:

**A) Booking Button (Floating)**
- Location: `floating_button`
- Tracked in: `FloatingBookingButton.tsx:40-44`
- Events:
  - `cta_clicked` (engagement)
  - `funnel_booking_cta_clicked` (funnel)

**B) Telefon-Klicks**
```typescript
trackPhoneClick(location)
→ cta_type: 'call_phone'
→ cta_text: '+49 176 43990001'
→ cta_location: z.B. 'header', 'footer', 'hero'
```

**C) Email-Klicks**
```typescript
trackEmailClick(location)
→ cta_type: 'send_email'
→ cta_text: 'joshua@alsen.info'
```

**D) Treatment-Klicks**
```typescript
trackTreatmentClick(treatmentType, sourcePage)
→ treatment_type: z.B. "arthrose", "nackenschmerzen"
→ source_page: Von welcher Seite aus geklickt
→ Triggert auch: funnel_treatments_explored
```

---

### 3. FORMULAR-TRACKING

**Vollständiger Formular-Lifecycle:**

```javascript
// 1. Formular gestartet (erster Klick ins Feld)
trackFormStart('appointment_booking')
  ↓
// 2. Jedes Feld ausgefüllt
trackFormFieldComplete('appointment_booking', 'name')
trackFormFieldComplete('appointment_booking', 'email')
  ↓
// 3. Bei Fehlern
trackFormError('appointment_booking', 'email', 'Ungültige Email-Adresse')
  ↓
// 4A. Erfolgreiche Einreichung
trackFormSubmitSuccess('appointment_booking', {
  treatment_type: 'arthrose',
  preferred_date: '2025-12-01'
})
  ↓ Triggert: funnel_booking_completed (CONVERSION!)

// 4B. ODER Formular abgebrochen
trackFormAbandoned('appointment_booking', 'telefon')
  ↓ Zeigt: User hat bis Feld "telefon" ausgefüllt, dann abgebrochen
```

---

### 4. PAGE VIEW & NAVIGATION

**Automatisches Tracking:**
```typescript
// Bei jeder Route-Änderung (Next.js Router)
useEffect(() => {
  trackPageView(url, referrer);
}, [pathname, searchParams]);

// Getrackte Properties:
{
  $current_url: '/behandlungen/arthrose-gelenkbeschwerden',
  $referrer: 'https://google.com/...',
  page_title: 'Hilft Osteopathie bei Arthrose?...'
}
```

**Navigation-Klicks:**
```typescript
trackNavigation(linkUrl, linkText, linkLocation)
→ Trackt interne Links
→ z.B. "Über mich" aus Header geklickt
```

---

### 5. BLOG & CONTENT ENGAGEMENT

```typescript
// Blog Post angesehen
trackBlogPostView(postTitle, postSlug)

// Blog Post gelesen (mit Scroll-Tiefe)
trackBlogPostReadTime(
  postSlug: 'osteopathie-arthrose',
  timeSpentSeconds: 180,
  scrollDepthPercent: 75
)
→ Misst: Wie lange & wie weit wurde gelesen
```

---

### 6. SEO & PERFORMANCE METRICS

```typescript
// SEO Metriken von Google Search Console
trackSEOMetrics({
  page_url: '/behandlungen/arthrose-gelenkbeschwerden',
  keyword_target: 'hilft osteopathie bei arthrose',
  organic_ranking: 9.3,
  impressions: 124,
  clicks: 0,
  ctr: 0.0
})

// Core Web Vitals
trackWebVitals({
  name: 'LCP',  // Largest Contentful Paint
  value: 1850,  // Milliseconds
  rating: 'good' // 'good', 'needs-improvement', 'poor'
})
```

---

### 7. ERROR & 404 TRACKING

```typescript
// JavaScript Errors
trackError(
  errorType: 'TypeError',
  errorMessage: 'Cannot read property...',
  errorStack: '...',
  context: { page: '/behandlungen/arthrose' }
)

// 404 Not Found
track404(
  attemptedPath: '/alte-seite',
  referrer: 'https://google.com'
)
```

---

## 🎯 WICHTIGSTE METRIKEN FÜR DEIN BUSINESS

### 📊 Conversion-Analyse

**Im PostHog Dashboard kannst du sehen:**

1. **Conversion Rate gesamt**
   ```
   Funnel: Homepage → Treatments → CTA → Booking Complete
   Erwartung: 5-10% Conversion Rate
   ```

2. **Drop-Off Points**
   ```
   Wo brechen User ab?
   - Zwischen Homepage und Treatments?
   - Beim CTA-Klick?
   - Im Booking-Formular?
   ```

3. **Beste CTA-Locations**
   ```
   Welcher Button konvertiert am besten?
   - Floating Button?
   - Hero Section?
   - Footer?
   ```

4. **Behandlungs-Performance**
   ```
   Welche Behandlungen führen zu Buchungen?
   - Arthrose-Seite → Buchungen?
   - Nackenschmerzen → Buchungen?
   - Homepage → Direktbuchungen?
   ```

---

### 📈 User Journey Insights

**Was du tracken kannst:**

```
Typische User Journey:
1. Google Search → Homepage (tracked: referrer + landing page)
2. Liest über Behandlungen (tracked: treatment_viewed)
3. Klickt auf Arthrose-Seite (tracked: treatment_clicked)
4. Scrollt 75% der Seite (tracked: scroll_depth via session recording)
5. Klickt "Termin buchen" (tracked: cta_clicked + funnel_step_3)
6. Füllt Formular aus (tracked: form_started, form_field_completed)
7. Sendet Formular (tracked: form_submitted + CONVERSION!)
```

**Fragen die du beantworten kannst:**
- ❓ Wie viele User sehen die Arthrose-Seite? → `treatment_viewed` Count
- ❓ Wie viele davon klicken "Termin buchen"? → `cta_clicked` Count where `source_page = /arthrose`
- ❓ Wie viele schließen Buchung ab? → `funnel_booking_completed` Count
- ❓ **Conversion Rate = (Buchungen / Arthrose-Views) × 100**

---

## 🔍 WIE DU AUF POSTHOG ZUGREIFST

### Option 1: PostHog Dashboard (Web)

**URL:** https://eu.posthog.com/

**Login:**
- Nutze den Account, mit dem du PostHog registriert hast
- Project: osteoalsen.de
- API Key: `phc_f5bZrbN4BoQ6RPpxzO3m7IgITBvn34W8mKHjnhSoJo1`

**Wichtigste Dashboards:**

1. **Insights → Funnels**
   ```
   Erstelle Funnel-Analyse:
   Step 1: funnel_homepage_view
   Step 2: funnel_treatments_explored
   Step 3: funnel_booking_cta_clicked
   Step 4: funnel_booking_form_started
   Step 5: funnel_booking_completed

   → Siehst sofort: Wo verlierst du User?
   ```

2. **Insights → Trends**
   ```
   Erstelle Trend-Chart:
   Event: cta_clicked
   Filter: cta_type = 'book_appointment'
   Group by: cta_location

   → Siehst: Welcher Button wird am meisten geklickt?
   ```

3. **Session Recordings**
   ```
   Filter: Nur Sessions die "cta_clicked" enthalten
   → Schau dir echte User-Sessions an!
   → Siehst wo User hängen bleiben
   → GDPR-konform: Alle Eingaben maskiert
   ```

4. **Web Analytics**
   ```
   Automatische Analysen:
   - Top Pages (welche Seiten am meisten besucht)
   - Bounce Rate
   - Referrers (woher kommen User)
   - Devices (Mobile vs Desktop)
   ```

---

### Option 2: PostHog API

**Beispiel: Top Events der letzten 7 Tage**

```bash
# Erstelle Personal API Key in PostHog Dashboard:
# Settings → Project → Personal API Keys → Create

export POSTHOG_PERSONAL_API_KEY="phx_xxxxx..."
export POSTHOG_PROJECT_ID="12345"

# Top Events abfragen
curl -X POST "https://eu.posthog.com/api/projects/${POSTHOG_PROJECT_ID}/query" \
  -H "Authorization: Bearer ${POSTHOG_PERSONAL_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "query": {
      "kind": "EventsQuery",
      "select": ["event", "count()"],
      "after": "-7d",
      "orderBy": ["count() DESC"],
      "limit": 20
    }
  }'
```

---

## 📊 WICHTIGSTE QUERIES FÜR DEIN BUSINESS

### 1. Conversion Rate berechnen

**Im PostHog Dashboard:**
```
Insights → Funnels → New Funnel

Step 1: $pageview (any page)
Step 2: funnel_booking_completed

→ Zeigt: Wie viele % aller Besucher buchen?
```

**Erwartete Werte:**
```
Sehr gut:  3-5% Conversion Rate
Gut:       1-3% Conversion Rate
Optimierung nötig: <1%
```

---

### 2. Beste Traffic-Quellen

**Query:**
```
Insights → Trends → New Insight

Event: funnel_booking_completed
Break down by: $referring_domain

→ Zeigt: Von welchen Quellen kommen Buchungen?
- google.com
- Direct (osteoalsen.de)
- Social Media
```

---

### 3. Behandlungs-Performance

**Query:**
```
Insights → Funnels

Step 1: treatment_clicked where treatment_type = 'arthrose'
Step 2: funnel_booking_cta_clicked
Step 3: funnel_booking_completed

→ Conversion Rate: Arthrose-Seite → Buchung
```

**Wiederholen für:**
- Nackenschmerzen
- Kopfschmerzen
- Rückenschmerzen
- etc.

**Ziel:** Finde heraus welche Behandlungsseiten am besten konvertieren!

---

### 4. CTA-Button Performance

**Query:**
```
Insights → Trends

Event: cta_clicked where cta_type = 'book_appointment'
Break down by: cta_location

→ Zeigt:
- floating_button: X clicks
- hero: Y clicks
- footer: Z clicks
```

**Optimierung:** Platziere mehr Buttons an den Stellen die gut performen!

---

### 5. Formular-Abbrüche analysieren

**Query:**
```
Insights → Trends

Event: funnel_booking_abandoned
Break down by: last_completed_field

→ Zeigt: Bei welchem Feld brechen User ab?
```

**Wenn viele bei "telefon" abbrechen:**
- Ist das Feld zu kompliziert?
- Fehlt eine Hilfestellung?
- Ist Datenschutz-Hinweis unklar?

---

### 6. Mobile vs Desktop Performance

**Query:**
```
Insights → Funnels

Funnel: Full Booking Process
Filter 1: $device_type = 'Mobile'
Filter 2: $device_type = 'Desktop'

→ Vergleiche Conversion Rates
```

**Wenn Mobile schlechter:**
- Buttons zu klein?
- Formular unübersichtlich?
- Ladezeit zu lang?

---

## 🎯 AKTIONS-PLAN: POSTHOG OPTIMAL NUTZEN

### Woche 1: Dashboard Setup

**1. Erstelle Haupt-Dashboards**

```
Dashboard 1: "Conversion Overview"
- Total Pageviews (last 7d)
- Booking Funnel (all steps)
- Conversion Rate (%)
- Top Referrers

Dashboard 2: "Treatment Performance"
- treatment_viewed by treatment_type
- treatment_clicked by treatment_type
- Conversion Rate by treatment

Dashboard 3: "CTA Performance"
- cta_clicked by cta_location
- phone_click by location
- email_click by location
```

**2. Aktiviere Alerts**

```
Alert 1: Conversion Rate Drop
If: Conversion Rate < 1% for 3 days
Then: Email notification

Alert 2: High Bounce Rate
If: Bounce Rate > 70% for 1 day
Then: Slack notification

Alert 3: Form Errors Spike
If: form_error count > 10 per day
Then: Email notification
```

---

### Woche 2-4: Analyse & Optimierung

**Tägliche Checks (5 Minuten):**
```
1. Öffne PostHog Dashboard "Conversion Overview"
2. Checke: Conversion Rate heute vs. Durchschnitt
3. Checke: Booking Funnel - wo Drop-Offs?
4. Checke: Session Recordings von Usern die abgebrochen haben
```

**Wöchentliche Deep-Dives (30 Minuten):**
```
1. Treatment Performance Analyse
   - Welche Seite konvertiert am besten?
   - Warum? (Session Recordings schauen)

2. CTA-Button Optimierung
   - Welcher Button wird am meisten geklickt?
   - Teste: Neue Button-Texte / -Farben

3. Formular-Optimierung
   - Wo brechen User ab?
   - Teste: Formular-Felder reduzieren
```

---

## 📋 CHECKLISTE: POSTHOG SETUP VERIFIZIEREN

### ✅ Basis-Setup

- [x] PostHog initialisiert (src/lib/posthog.ts)
- [x] PostHogProvider eingebunden (src/components/PostHogProvider.tsx)
- [x] Pageview-Tracking aktiv
- [x] EU-Server konfiguriert (GDPR)
- [x] Session Recording mit Masking

### ✅ Event-Tracking

- [x] Conversion Funnel (6 Schritte)
- [x] CTA-Klicks (Booking, Phone, Email)
- [x] Formular-Tracking (Start, Complete, Abandon)
- [x] Treatment-Tracking (View, Click)
- [x] Navigation-Tracking
- [x] Blog Engagement

### ⚠️ Noch zu implementieren (Optional)

- [ ] **Personal API Key erstellen** (für programmatischen Zugriff)
- [ ] **Dashboards erstellen** (Conversion, Treatment, CTA)
- [ ] **Alerts einrichten** (Low Conversion, High Bounce)
- [ ] **A/B Tests** (Button-Farben, Texte testen)
- [ ] **Cohort Analyse** (User-Segmentierung)
- [ ] **Retention Tracking** (Wiederkehrende Besucher)

---

## 🚀 QUICK WINS MIT POSTHOG

### 1. Finde deine beste Traffic-Quelle

**Dashboard → Web Analytics → Referrers**
- Siehst: Woher kommen die meisten Buchungen?
- **Optimierung:** Investiere mehr in Top-Kanäle!

### 2. Optimiere deine schwächste Seite

**Insights → Funnels**
```
Step 1: treatment_viewed where treatment_type = 'kopfschmerzen'
Step 2: cta_clicked
```
- Siehst: Conversion Rate Kopfschmerzen-Seite
- **Wenn <1%:** Diese Seite braucht Optimierung!

### 3. Verbessere Formular-Completion

**Insights → Trends**
```
Event 1: form_started
Event 2: form_submitted

Completion Rate = (form_submitted / form_started) × 100
```
- **Ziel:** >80% Completion Rate
- **Wenn niedriger:** Formular vereinfachen!

### 4. Teste verschiedene CTA-Texte

**Insights → A/B Test**
```
Variant A: "Termin vereinbaren"
Variant B: "Jetzt buchen - 48h verfügbar"
Metric: cta_clicked → funnel_booking_completed
```
- PostHog zeigt automatisch statistisch signifikante Gewinner!

---

## 📞 ZUGRIFF & SUPPORT

**PostHog Dashboard:**
https://eu.posthog.com/

**Project ID:**
Findest du in PostHog unter: Settings → Project

**API Key (Public):**
`phc_f5bZrbN4BoQ6RPpxzO3m7IgITBvn34W8mKHjnhSoJo1`

**Personal API Key:**
Noch nicht erstellt → Erstelle in: Settings → Personal API Keys

**Dokumentation:**
https://posthog.com/docs

**Support:**
- PostHog Community: https://posthog.com/questions
- Email: hey@posthog.com

---

## 🎊 ZUSAMMENFASSUNG

### ✅ Was bereits perfekt funktioniert:

1. **Vollständiges Conversion-Tracking** → Du siehst jeden Schritt bis zur Buchung
2. **GDPR-konform** → EU-Server + Privacy-First Config
3. **Session Recordings** → Siehst echte User-Interaktionen
4. **Autocapture** → Klicks werden automatisch getrackt
5. **Dual-Tracking** → PostHog + Google Tag Manager parallel

### 🎯 Nächste Schritte:

1. **Heute:** Öffne PostHog Dashboard, schaue erste Daten an
2. **Diese Woche:** Erstelle 3 Haupt-Dashboards (siehe oben)
3. **Nächste 4 Wochen:** Wöchentliche Analysen + Optimierungen

### 💡 Wichtigste Insights die du tracken solltest:

```
1. Conversion Rate gesamt (Ziel: 2-5%)
2. Welche Behandlungsseiten konvertieren am besten?
3. Welche CTA-Buttons werden am meisten geklickt?
4. Wo brechen User im Formular ab?
5. Mobile vs Desktop Conversion Rate
```

---

**Erstellt am:** 27.11.2025
**Status:** ✅ PostHog vollständig analysiert und dokumentiert
