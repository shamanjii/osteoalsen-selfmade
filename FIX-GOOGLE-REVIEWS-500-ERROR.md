# 🔧 Google Reviews 500 Error beheben

## Problem
```
GET https://www.osteoalsen.de/api/google-reviews 500 (Internal Server Error)
```

## Ursache
Die Google Places API ist noch nicht aktiviert in deinem Google Cloud Projekt.

---

## ✅ Lösung (5 Minuten)

### Schritt 1: Google Cloud Console öffnen
Gehe zu: https://console.cloud.google.com/apis/library/places-backend.googleapis.com?project=osteoalsen-seo-monitoring

### Schritt 2: Places API aktivieren
1. Klicke auf **"AKTIVIEREN"**
2. Warte 1-2 Minuten bis aktiviert
3. Bestätigung erscheint: "API Places API ist aktiviert"

### Schritt 3: API Key Einschränkungen prüfen (Sicherheit!)
1. Gehe zu: https://console.cloud.google.com/apis/credentials?project=osteoalsen-seo-monitoring
2. Finde deinen API Key: `AIzaSyDad9H3FaKOkoqsQW6p4AE65vkWHkrc52Y`
3. Klicke auf den Key
4. Unter **"API-Einschränkungen"**:
   - Prüfe ob **"Places API"** aktiviert ist
   - Falls nicht: Aktiviere **"Places API"** und **"Places API (New)"**
5. Klicke **"SPEICHERN"**

### Schritt 4: Test (nach API Aktivierung)
1. Öffne: https://www.osteoalsen.de/api/google-reviews
2. Sollte jetzt JSON mit Reviews zeigen:
   ```json
   {
     "success": true,
     "averageRating": 5.0,
     "totalReviews": X,
     "reviews": [...]
   }
   ```

3. Auf der Website (bei #bewertungen):
   - Sollte zeigen: **"🔄 Live von Google"**
   - Console zeigt: `✅ Live Google Reviews geladen: X`

---

## 🐛 Falls immer noch 500 Error

### Mögliche Ursache 1: API noch nicht propagiert
**Lösung:** Warte 2-3 Minuten, dann refresh

### Mögliche Ursache 2: API Key eingeschränkt
**Lösung:**
1. Google Cloud Console → API Credentials
2. Deinen API Key anklicken
3. Unter "Website-Einschränkungen":
   - Falls gesetzt: Füge hinzu `*.osteoalsen.de/*`
   - Oder: Wähle "Keine" (nur für Testing)

### Mögliche Ursache 3: Falscher Place ID
**Lösung:**
```bash
# Test ob Place ID korrekt ist
curl "https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJbYtH0dkpLiMR78360rWq-C4&fields=name,rating&key=AIzaSyDad9H3FaKOkoqsQW6p4AE65vkWHkrc52Y"

# Sollte zeigen:
# {
#   "result": {
#     "name": "Osteopathie Alsen",
#     "rating": 5.0
#   },
#   "status": "OK"
# }
```

---

## 💰 Kosten
- **Erste 1.000 Requests/Monat:** KOSTENLOS
- Mit 1h Cache → ~720 Requests/Monat = **KOSTENLOS**

---

**Erstellt:** 29.11.2025
