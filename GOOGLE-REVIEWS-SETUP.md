# 🚀 Google Reviews API - Setup Guide

## ✅ Was ist fertig:

1. ✅ API Route erstellt: `/src/app/api/google-reviews/route.ts`
2. ✅ Reviews Component updated: Lädt jetzt live Google Reviews
3. ✅ Fallback zu statischen Reviews bei Fehler
4. ✅ "Live von Google" Indicator

---

## 📋 Was du jetzt machen musst (15 Min):

### Schritt 1: Google Places API aktivieren (5 Min)

1. Gehe zu: https://console.cloud.google.com/apis/library/places-backend.googleapis.com?project=osteoalsen-seo-monitoring
2. Klicke auf **"AKTIVIEREN"**
3. Warte 1-2 Minuten bis aktiviert

### Schritt 2: API Key erstellen (5 Min)

1. Gehe zu: https://console.cloud.google.com/apis/credentials?project=osteoalsen-seo-monitoring
2. Klicke auf **"+ ANMELDEDATEN ERSTELLEN"** → **"API-Schlüssel"**
3. Kopiere den API Key (z.B. `AIzaSyC...`)

**WICHTIG - API Key einschränken (Sicherheit!):**

4. Klicke auf den neu erstellten API Key
5. Unter **"API-Einschränkungen"**:
   - Wähle: **"Schlüssel einschränken"**
   - Aktiviere nur: **"Places API"** und **"Places API (New)"**
6. Unter **"Website-Einschränkungen"** (optional):
   - Wähle: **"HTTP-Referrer"**
   - Füge hinzu:
     - `osteoalsen.de/*`
     - `*.osteoalsen.de/*`
     - `localhost:3000/*` (für Development)
7. Klicke **"SPEICHERN"**

### Schritt 3: Place ID finden (5 Min)

**Option 1 - Via Google Maps URL (EINFACHSTE):**

1. Gehe zu: https://www.google.com/maps
2. Suche nach: **"Osteopathie Alsen Hamburg"**
3. Klicke auf dein Profil (Rotherbaum)
4. Kopiere die URL aus der Adresszeile
5. Die Place ID steht nach `!1s` oder `data=`

**Beispiel:**
```
https://www.google.com/maps/place/...!1s0x47b161a6d...!...
                                      ^^^^^^^^^^^^^^^^^ Place ID
```

**Option 2 - Via Place ID Finder Tool:**

1. Gehe zu: https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
2. Suche nach: **"Rappstraße 7, 20146 Hamburg"**
3. Kopiere die Place ID aus dem Ergebnis

### Schritt 4: Env Variables setzen (1 Min)

Öffne `.env` und füge hinzu:

```bash
# Google Places API (für Live Reviews)
GOOGLE_PLACES_API_KEY=AIzaSy... # Dein API Key aus Schritt 2
GOOGLE_PLACE_ID=ChIJ... # Deine Place ID aus Schritt 3
```

---

## 🧪 Test

**Nach dem Setup:**

1. Server neu starten:
   ```bash
   npm run dev
   ```

2. Öffne: http://localhost:3000/#bewertungen

3. Schaue in die Browser Console (F12):
   - ✅ Sollte zeigen: `✅ Live Google Reviews geladen: X`
   - ❌ Bei Fehler: `⚠️ Fallback zu statischen Reviews`

4. Auf der Website sollte stehen:
   - ✅ **"🔄 Live von Google"** (wenn API funktioniert)
   - ℹ️ **"Verifiziert"** (wenn Fallback zu statischen Reviews)

---

## 📊 Wie es funktioniert

```
┌─────────────────┐
│ User besucht    │
│ Website         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Reviews.tsx     │
│ (Client)        │
└────────┬────────┘
         │
         │ fetch('/api/google-reviews')
         ▼
┌─────────────────┐
│ API Route       │
│ (Server)        │
└────────┬────────┘
         │
         │ fetch Google Places API
         ▼
┌─────────────────┐
│ Google Places   │
│ API             │
└────────┬────────┘
         │
         │ Returns reviews
         ▼
┌─────────────────┐
│ Cached 1h       │
│ (ISR)           │
└─────────────────┘
```

**Features:**
- ✅ Live Google Reviews (automatisch aktualisiert)
- ✅ Cached 1 Stunde (schneller + günstiger)
- ✅ Fallback zu statischen Reviews bei Fehler
- ✅ Zeigt "Live von Google" Badge
- ✅ Server-side fetch (API Key bleibt geheim)

---

## 💰 Kosten

**Google Places API Pricing:**

- **Erste 1.000 Requests/Monat:** KOSTENLOS
- **Danach:** ~$0.017 pro Request

**Deine erwartete Nutzung:**

- 1 Request pro Stunde (ISR Cache)
- = 24 Requests/Tag
- = 720 Requests/Monat
- **= KOSTENLOS** (unter 1.000 Requests)

**Selbst mit 10.000 Besuchern/Monat:**

- Cached 1h = ~30 Requests/Tag = 900/Monat
- **= KOSTENLOS**

---

## 🐛 Troubleshooting

### Fehler: "API configuration missing"

**Ursache:** `GOOGLE_PLACES_API_KEY` oder `GOOGLE_PLACE_ID` nicht in `.env`

**Lösung:** Siehe Schritt 4 oben

### Fehler: "Google API Error: REQUEST_DENIED"

**Ursache:** Places API nicht aktiviert

**Lösung:** Siehe Schritt 1 oben

### Fehler: "Google API Error: INVALID_REQUEST"

**Ursache:** Place ID falsch

**Lösung:**
1. Prüfe Place ID in `.env`
2. Sollte Format haben: `ChIJ...`
3. Neu suchen via Schritt 3

### Reviews werden nicht geladen (zeigt "Verifiziert")

**Ursache:** API Request failed

**Lösung:**
1. Öffne Browser Console (F12)
2. Schaue nach Fehler bei `/api/google-reviews`
3. Gehe zu: http://localhost:3000/api/google-reviews
4. Schaue dir die Fehlermeldung an

---

## 🎯 Nach dem Setup

**Wenn alles funktioniert:**

1. ✅ Deploy zu Vercel (automatisch wenn du pushst)
2. ✅ Füge Env Variables auch in Vercel hinzu:
   - Gehe zu: https://vercel.com/dein-projekt/settings/environment-variables
   - Füge hinzu:
     - `GOOGLE_PLACES_API_KEY`
     - `GOOGLE_PLACE_ID`
3. ✅ Redeploy triggern

**Vercel Env Variables:**

```
GOOGLE_PLACES_API_KEY=AIzaSy... (aus Google Cloud Console)
GOOGLE_PLACE_ID=ChIJ... (aus Google Maps)
```

---

## ✨ Bonus: Zweites Profil (Eimsbüttel)

Wenn du später auch Eimsbüttel-Reviews zeigen willst:

1. Finde die Place ID für Eimsbüttel (wie oben)
2. Erstelle zweite API Route: `/api/google-reviews/eimsbuettel/route.ts`
3. Nutze `GOOGLE_PLACE_ID_EIMSBUETTEL` in `.env`

---

## 📞 Nächste Schritte

**JETZT (15 Min):**
- [ ] Schritt 1: Places API aktivieren
- [ ] Schritt 2: API Key erstellen
- [ ] Schritt 3: Place ID finden
- [ ] Schritt 4: Env Variables setzen
- [ ] Test lokal

**DANN:**
- [ ] Deploy zu Vercel
- [ ] Env Variables in Vercel setzen

**FERTIG! 🎉**

Deine Website zeigt jetzt automatisch neue Google Reviews!
