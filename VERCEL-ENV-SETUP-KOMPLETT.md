# 🚀 VERCEL ENVIRONMENT VARIABLES - KOMPLETTES SETUP

## ❌ Problem
Du siehst in der Browser Console:
- `PostHog keys not configured` → PostHog läuft nicht
- `/api/google-reviews:1 Failed to load resource: 500` → Google Reviews laden nicht

**Ursache:** Environment Variables sind nur lokal (`.env`), aber **NICHT in Vercel gesetzt**.

---

## ✅ Lösung: Alle Environment Variables in Vercel setzen

### Schritt 1: Vercel Dashboard öffnen
1. Gehe zu: https://vercel.com/dashboard
2. Wähle dein Projekt: **osteoalsen-selfmade**
3. Klicke auf **Settings** (oben rechts)
4. Gehe zu **Environment Variables** (linke Sidebar)

### Schritt 2: Alle 4 Variables hinzufügen

---

#### 📊 PostHog Variables (Analytics)

**Variable 1:**
```
Name:  NEXT_PUBLIC_POSTHOG_KEY
Value: phc_f5bZrbN4BoQ6RPpxzO3m7IgITBvn34W8mKHjnhSoJo1

Environments:
✅ Production
✅ Preview
✅ Development
```

**Variable 2:**
```
Name:  NEXT_PUBLIC_POSTHOG_HOST
Value: https://eu.i.posthog.com

Environments:
✅ Production
✅ Preview
✅ Development
```

---

#### ⭐ Google Reviews Variables

**Variable 3:**
```
Name:  GOOGLE_PLACES_API_KEY
Value: AIzaSyDad9H3FaKOkoqsQW6p4AE65vkWHkrc52Y

Environments:
✅ Production
✅ Preview
✅ Development
```

**Variable 4:**
```
Name:  GOOGLE_PLACE_ID
Value: ChIJbYtH0dkpLiMR78360rWq-C4

Environments:
✅ Production
✅ Preview
✅ Development
```

---

### Schritt 3: Redeploy triggern

**Option A: Via Vercel Dashboard (EINFACHSTE)**
1. Gehe zu **Deployments** Tab
2. Klicke auf die **letzte Production Deployment** (ganz oben)
3. Klicke auf **... (3 Punkte)** rechts oben
4. Wähle **"Redeploy"**
5. Bestätige mit **"Redeploy"**
6. Warte ~2-3 Minuten

**Option B: Via Git Push**
```bash
cd /Users/LumosVitalis/osteoalsen-main/osteoalsen-selfmade

# Kleine Änderung für Redeploy
echo "# Environment Variables aktiviert $(date)" >> README.md

git add README.md
git commit -m "chore: trigger redeploy for env vars (PostHog + Google Reviews)"
git push origin main
```

---

## 🧪 Test nach Redeploy (2-3 Minuten warten)

### Test 1: Browser Console
1. Öffne: https://www.osteoalsen.de
2. Browser DevTools (F12) → **Console**
3. Statt "PostHog keys not configured" solltest du sehen:
   - ✅ `PostHog loaded` oder ähnlich
   - ✅ Keine 500 Errors mehr bei `/api/google-reviews`

### Test 2: PostHog verifizieren
```javascript
// In Browser Console eingeben:
posthog

// Sollte PostHog Object zeigen (nicht undefined)
```

### Test 3: Google Reviews verifizieren
1. Scrolle zu Reviews Section auf https://www.osteoalsen.de
2. Sollte zeigen: **"🔄 Live von Google"** (statt "Verifiziert")
3. Browser Console sollte zeigen: `✅ Live Google Reviews geladen: X`

### Test 4: Via Command Line
```bash
# Test PostHog
curl -s https://www.osteoalsen.de | grep -i "posthog-js"
# Sollte jetzt PostHog Script zeigen

# Test Google Reviews
curl -s https://www.osteoalsen.de/api/google-reviews | head -20
# Sollte JSON mit Reviews zeigen (nicht 500 Error)
```

---

## ✅ Was dann funktioniert

### PostHog (Analytics)
- ✅ Alle Pageviews werden getrackt
- ✅ CTA-Klicks (Termin buchen Buttons)
- ✅ Conversion Funnel (Buchungsprozess)
- ✅ Session Recordings (DSGVO-konform)
- ✅ User Paths & Behavior Flow

### Google Reviews
- ✅ Live Google Reviews von deinem Business Profil
- ✅ Automatisch aktualisiert (Revalidierung 1h)
- ✅ "Live von Google" Badge
- ✅ Durchschnittsbewertung & Anzahl der Reviews

---

## 📊 Nächste Schritte nach Aktivierung

### Sofort nach Aktivierung:
1. ✅ PostHog sammelt ab sofort alle Daten
2. ✅ Google Reviews werden live von Google geladen

### Nach 24 Stunden:
- PostHog Dashboard erstellen mit ersten Daten
- Conversion Funnel analysieren

### Nach 1 Woche:
- Vollständige User Journey Analyse
- Heatmaps & Session Recordings nutzen
- A/B Tests möglich

---

## 🐛 Troubleshooting

### "PostHog keys not configured" bleibt
→ Environment Variables noch nicht gesetzt oder Redeploy fehlt
→ Prüfe in Vercel Settings ob alle 4 Variables gesetzt sind

### Google Reviews zeigen immer noch 500 Error
→ Google Places API muss in Google Cloud aktiviert sein
→ Prüfe: https://console.cloud.google.com/apis/library/places-backend.googleapis.com

### Nach Redeploy noch immer nicht aktiv
→ Browser Cache leeren: Strg+Shift+R (Windows) oder Cmd+Shift+R (Mac)
→ Incognito-Fenster testen

---

## ⚡ Quick Setup via CLI (Alternative)

Falls du Vercel CLI nutzen willst:

```bash
# 1. Login (falls noch nicht eingeloggt)
npx vercel login

# 2. Environment Variables setzen
echo "phc_f5bZrbN4BoQ6RPpxzO3m7IgITBvn34W8mKHjnhSoJo1" | npx vercel env add NEXT_PUBLIC_POSTHOG_KEY production preview development

echo "https://eu.i.posthog.com" | npx vercel env add NEXT_PUBLIC_POSTHOG_HOST production preview development

echo "AIzaSyDad9H3FaKOkoqsQW6p4AE65vkWHkrc52Y" | npx vercel env add GOOGLE_PLACES_API_KEY production preview development

echo "ChIJbYtH0dkpLiMR78360rWq-C4" | npx vercel env add GOOGLE_PLACE_ID production preview development

# 3. Redeploy
npx vercel --prod
```

---

## 📝 Zusammenfassung

**JETZT:**
1. ⚠️ Gehe zu Vercel Dashboard
2. ⚠️ Setze alle 4 Environment Variables
3. ⚠️ Trigger Redeploy
4. ⚠️ Warte 2-3 Minuten

**DANN:**
1. ✅ Teste auf https://www.osteoalsen.de
2. ✅ Browser Console checken
3. ✅ Reviews Section checken

**RESULT:**
- ✅ PostHog läuft → Daten werden gesammelt
- ✅ Google Reviews laden → Live von Google
- ✅ Keine Errors mehr in Console

---

**Erstellt:** 27.11.2025
**Status:** ⚠️ AKTION ERFORDERLICH - Environment Variables in Vercel setzen
