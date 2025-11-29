# 🔧 Google Reviews API Troubleshooting

## Status
- ✅ Google Places API aktiviert
- ✅ Google Cloud Billing aktiviert
- ✅ API Key funktioniert direkt (außerhalb Vercel)
- ❌ Vercel API Route zeigt noch Billing Error

## Problem
Der API Key könnte zu einem ANDEREN Google Cloud Projekt gehören.

---

## ✅ Lösung: API Key zum richtigen Projekt zuordnen

### Schritt 1: Prüfe welches Projekt der API Key verwendet

1. Gehe zu: https://console.cloud.google.com/apis/credentials?project=osteoalsen-seo-monitoring
2. Findest du den API Key: `AIzaSyDad9H3FaKOkoqsQW6p4AE65vkWHkrc52Y`?

**FALLS JA:** ✅ API Key gehört zum richtigen Projekt
**FALLS NEIN:** ❌ API Key gehört zu anderem Projekt → Siehe Schritt 2

### Schritt 2: Neuen API Key im richtigen Projekt erstellen

1. Gehe zu: https://console.cloud.google.com/apis/credentials?project=osteoalsen-seo-monitoring
2. Klicke **"+ ANMELDEDATEN ERSTELLEN"** → **"API-Schlüssel"**
3. Kopiere den neuen API Key (z.B. `AIzaSyC...`)

**WICHTIG - API Key einschränken:**
4. Klicke auf den neu erstellten Key
5. Name: "Places API - osteoalsen.de"
6. Unter **"API-Einschränkungen"**:
   - Wähle: **"Schlüssel einschränken"**
   - Aktiviere nur: **"Places API"**
7. Unter **"Website-Einschränkungen"** (optional):
   - Wähle: **"HTTP-Referrer"**
   - Füge hinzu:
     - `*.osteoalsen.de/*`
     - `osteoalsen.de/*`
8. Klicke **"SPEICHERN"**

### Schritt 3: Neuen API Key in Vercel setzen

1. Gehe zu: https://vercel.com/dashboard
2. Wähle Projekt: **osteoalsen-selfmade**
3. Settings → Environment Variables
4. Finde: `GOOGLE_PLACES_API_KEY`
5. Klicke **"Edit"**
6. Setze den **neuen API Key**
7. Environments: ✅ Production ✅ Preview ✅ Development
8. Klicke **"Save"**

### Schritt 4: Redeploy triggern

**Option A: Vercel Dashboard**
- Deployments → Letzte Deployment → **Redeploy**

**Option B: Git Push** (kann ich für dich machen)

### Schritt 5: Test (nach 2 Min)

```bash
curl https://www.osteoalsen.de/api/google-reviews
```

Sollte zeigen:
```json
{
  "success": true,
  "averageRating": 5.0,
  "totalReviews": 43,
  "reviews": [...]
}
```

---

## Alternative Diagnose

### Check 1: Welches Projekt nutzt der aktuelle API Key?

```bash
# Test API direkt
curl "https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJbYtH0dkpLiMR78360rWq-C4&fields=name&key=AIzaSyDad9H3FaKOkoqsQW6p4AE65vkWHkrc52Y"
```

- **Status OK:** API Key funktioniert, Billing ist aktiv
- **REQUEST_DENIED:** API Key gehört zu Projekt ohne Billing

### Check 2: Environment Variable in Vercel

Gehe zu Vercel → Settings → Environment Variables

Prüfe ob `GOOGLE_PLACES_API_KEY` wirklich den Key enthält:
`AIzaSyDad9H3FaKOkoqsQW6p4AE65vkWHkrc52Y`

Falls anders → Update auf richtigen Key

---

## Warum passiert das?

**Szenario 1: API Key in falschem Projekt erstellt**
- Du hast mehrere Google Cloud Projekte
- API Key wurde in Projekt A erstellt (ohne Billing)
- Billing wurde in Projekt B aktiviert (osteoalsen-seo-monitoring)
- **Lösung:** Neuen Key in Projekt B erstellen

**Szenario 2: Vercel Cache**
- Billing wurde aktiviert, aber Vercel cached noch alte Responses
- **Lösung:** Warte auf neues Deployment (läuft bereits)

**Szenario 3: Billing Propagation**
- Google braucht 5-10 Minuten um Billing zu propagieren
- **Lösung:** Warte noch 5 Minuten, dann retry

---

## Next Steps

1. ⏱️ Warte 2 Minuten bis aktuelles Deployment fertig
2. ✅ Test ob Google Reviews funktioniert
3. ❌ Falls immer noch Fehler → Prüfe ob API Key zum richtigen Projekt gehört
4. 🔧 Falls nein → Erstelle neuen Key im richtigen Projekt

---

**Erstellt:** 29.11.2025
**Status:** Deployment läuft, Diagnose im Gange
