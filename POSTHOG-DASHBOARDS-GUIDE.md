# 📊 PostHog Dashboards Setup Guide

**Voraussetzung:** PostHog muss 24h Daten sammeln bevor Dashboards sinnvoll sind.

**PostHog Dashboard:** https://eu.posthog.com

---

## 🎯 EMPFOHLENE DASHBOARDS

### 1. Conversion Funnel - Booking Process

**Ziel:** Wo springen User im Buchungsprozess ab?

**Setup:**
1. Gehe zu: **Insights** → **New Insight** → **Funnel**
2. Füge Steps hinzu:

```
Step 1: $pageview
  → Filter: current_url contains "osteoalsen.de"

Step 2: cta_click
  → Filter: cta_type = "floating-button" OR "hero" OR "treatment-card"

Step 3: booking_widget_opened
  → No filter

Step 4: booking_step_completed
  → Filter: step = "Behandlungsgrund"

Step 5: booking_step_completed
  → Filter: step = "Termin"

Step 6: booking_step_completed
  → Filter: step = "Kontaktdaten"

Step 7: booking_completed
  → No filter
```

**Einstellungen:**
- Timeframe: Last 30 days
- Breakdown: None (oder by page_path für Details)

**Was du siehst:**
- Conversion Rate pro Step
- Wo die meisten User abspringen
- Gesamt-Conversion: Pageview → Buchung

**Insights:**
- Wenn viele bei Step 3→4 abspringen: CTA optimieren
- Wenn viele bei Step 5→6 abspringen: Formular vereinfachen

---

### 2. Top Pages Performance

**Ziel:** Welche Seiten haben die beste Performance?

**Setup:**
1. **Insights** → **New Insight** → **Trends**
2. Event: `$pageview`
3. Group by: `$current_url`
4. Timeframe: Last 30 days
5. Show: Top 10

**Chart Type:** Bar Chart

**Zusätzliche Metriken:**
- Average session duration per page
- Bounce rate per page (verlassen ohne weitere Action)

**Was du siehst:**
- Meistbesuchte Seiten
- Welche Behandlungen interessieren User am meisten

**Insights:**
- Top-Seiten: Mehr Content, bessere CTAs
- Low-Performer: Content oder SEO verbessern

---

### 3. CTA Click Analysis

**Ziel:** Welche "Termin buchen" Buttons funktionieren am besten?

**Setup:**
1. **Insights** → **New Insight** → **Trends**
2. Event: `cta_click`
3. Group by: `cta_type`
4. Breakdown by: `page_path` (optional)
5. Timeframe: Last 30 days

**Chart Type:** Line Chart oder Bar Chart

**CTA Types:**
- `floating-button` - Floating Booking Button (rechts unten)
- `hero` - Hero Section CTA
- `treatment-card` - Behandlungs-Karten CTAs
- `nav` - Navigation "Termin" Button

**Was du siehst:**
- Welcher CTA-Type die meisten Klicks bekommt
- Auf welchen Seiten CTAs am besten funktionieren

**Insights:**
- Floating Button dominant? → Gut!
- Hero CTA schwach? → Design/Text optimieren

---

### 4. SEO Landing Pages Performance

**Ziel:** Wie performen Seiten die über Google gefunden werden?

**Setup:**
1. **Insights** → **New Insight** → **Trends**
2. Event: `$pageview`
3. Filter: `$referrer` contains "google"
4. Group by: `$current_url`
5. Timeframe: Last 30 days

**Zusätzliche Ansicht - Conversion Rate:**
1. Füge zweites Event hinzu: `booking_completed`
2. Filter: `$referrer` contains "google"
3. Formula: `B / A * 100` (Conversion %)

**Was du siehst:**
- Welche Seiten Traffic von Google bekommen
- Conversion Rate: Google Traffic → Buchung

**Insights:**
- Hoher Traffic, low Conversion? → CTA optimieren
- Niedriger Traffic? → SEO verbessern (siehe SEO-TRACKING-PLAN.md)

---

### 5. User Journey Flow

**Ziel:** Wie navigieren User durch die Website?

**Setup:**
1. **Insights** → **New Insight** → **User Paths**
2. Starting Point: `$pageview` (any page)
3. Timeframe: Last 7 days
4. Max steps: 5

**Was du siehst:**
- Häufigste User-Pfade durch die Website
- Von welchen Seiten User zur Buchung kommen
- Wo User die Website verlassen

**Insights:**
- Optimiere häufig genutzte Pfade
- Füge CTAs auf Seiten hinzu wo User häufig landen

---

### 6. Session Recordings Review

**Ziel:** Echte User-Sessions anschauen (Privacy-konform)

**Setup:**
1. **Session Recordings** → **Recordings**
2. Filter:
   - Last 7 days
   - Duration > 30 seconds
   - With activity

**Was du siehst:**
- Video-Recordings von echten User-Sessions
- Wo User klicken, scrollen, zögern
- **WICHTIG:** Inputs sind maskiert (DSGVO!)

**Insights:**
- User finden CTA nicht? → Position ändern
- User scrollen zu weit? → CTA höher platzieren
- User klicken mehrfach? → Button nicht responsive?

---

## 📊 DASHBOARD ORGANISATION

### Empfohlene Struktur:

**Dashboard 1: "Overview"**
- Top Pages (Trends)
- Total Pageviews (Number)
- Booking Conversion Rate (Number)
- CTA Clicks (Trends)

**Dashboard 2: "Conversion Funnel"**
- Booking Funnel (Funnel)
- Funnel by Traffic Source (Funnel with breakdown)

**Dashboard 3: "SEO Performance"**
- Google Traffic (Trends)
- SEO Landing Pages (Trends)
- Conversion: Google → Booking (Formula)

**Dashboard 4: "User Behavior"**
- User Paths (Paths)
- Session Duration (Histogram)
- Bounce Rate (Number)

---

## 🔔 ALERTS EINRICHTEN

### Empfohlene Alerts:

**1. Conversion Drop Alert**
```
Alert: "Booking Conversion < 2%"
Condition: booking_completed / $pageview < 0.02
Timeframe: Last 7 days
Action: E-Mail an dich
```

**2. Traffic Drop Alert**
```
Alert: "Traffic Drop > 20%"
Condition: $pageview decreased by 20%
Comparison: Last week vs. This week
Action: E-Mail an dich
```

**3. High-Value Page Alert**
```
Alert: "Arthrose Page Views Spike"
Condition: $pageview (page = /behandlungen/arthrose) > 50/day
Action: Notification (means SEO is working!)
```

---

## 🎯 WÖCHENTLICHES MONITORING

### Checkliste (jeden Montag):

**PostHog Dashboard checken:**
- [ ] Pageviews: Trend steigend?
- [ ] Conversion Rate: >2%?
- [ ] Top Pages: Änderungen?
- [ ] CTA Performance: Floating Button dominant?

**SEO Impact prüfen:**
- [ ] Google Traffic steigend?
- [ ] Welche optimierten Seiten performen?
- [ ] Neue Keywords in Top 10?

**Session Recordings anschauen:**
- [ ] 3-5 Sessions pro Woche reviewen
- [ ] UX-Probleme identifizieren
- [ ] Quick Wins finden

---

## 💡 ADVANCED: A/B TESTING

**Nach 1 Monat Daten:**

### Test 1: CTA Button Text
```
Variant A: "Termin buchen"
Variant B: "Jetzt Termin sichern"

Metric: CTA Click Rate
Duration: 2 weeks
```

### Test 2: Hero Section CTA Position
```
Variant A: CTA oben rechts
Variant B: CTA zentriert

Metric: Hero CTA Click Rate
Duration: 2 weeks
```

**Setup:**
1. PostHog → Experiments → New Experiment
2. Feature Flag: test-hero-cta
3. Variants: A (50%), B (50%)
4. Goal Metric: cta_click (cta_type = "hero")

---

## 📱 MOBILE vs. DESKTOP

### Empfohlenes Dashboard:

**Setup:**
1. **Insights** → **New Insight** → **Trends**
2. Event: `$pageview`
3. Breakdown by: `$device_type`
4. Add: `booking_completed` (breakdown by device)

**Was du siehst:**
- Mobile vs. Desktop Traffic
- Mobile vs. Desktop Conversion Rate

**Insights:**
- Mobile Conversion < Desktop? → Mobile UX verbessern
- Mehr Mobile Traffic? → Mobile-First Design

---

## 🎓 POSTHOG LERNEN

**PostHog Academy:**
https://posthog.com/docs/getting-started

**Wichtigste Features:**
- Funnels: Conversion tracking
- Trends: Metriken über Zeit
- Paths: User Journey
- Recordings: Session replays
- Experiments: A/B Testing

---

## ✅ QUICK START (HEUTE)

**Direkt nach dem Setup (24h Daten warten):**

1. **Dashboard 1 erstellen: "Week 1 Overview"**
   - Add: Total Pageviews (Number)
   - Add: Top 5 Pages (Bar Chart)
   - Add: CTA Clicks (Trend Line)

2. **Funnel erstellen: "Basic Booking Funnel"**
   - Pageview → CTA Click → Booking Opened

3. **Alert erstellen: "Daily Summary"**
   - Daily Pageviews
   - Daily Bookings
   - E-Mail jeden Morgen

**Das gibt dir:**
- Täglichen Überblick
- Erste Insights
- Basis für weitere Optimierungen

---

**Erstellt:** 29.11.2025
**PostHog:** https://eu.posthog.com
**Status:** Warte 24h auf erste Daten
