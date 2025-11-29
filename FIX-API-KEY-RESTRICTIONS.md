# 🔑 API Key Einschränkungen entfernen

## Problem
API Key funktioniert direkt, aber nicht über Vercel Server.

**Ursache:** API Key hat vermutlich Website-Einschränkungen, die Vercel Server blockieren.

---

## ✅ Schnelle Lösung: Einschränkungen temporär entfernen

### Schritt 1: API Credentials öffnen
https://console.cloud.google.com/apis/credentials?project=osteoalsen-seo-monitoring

### Schritt 2: API Key anklicken
Finde: `AIzaSyDad9H3FaKOkoqsQW6p4AE65vkWHkrc52Y`

### Schritt 3: Website-Einschränkungen prüfen

**Falls gesetzt:**
- **Website-Einschränkungen:** HTTP-Referrer
- **Eingetragene Referrer:** z.B. `*.osteoalsen.de/*`

**Problem:** Vercel Server haben andere IPs/Referrer → Requests werden blockiert

### Schritt 4: Einschränkungen TEMPORÄR entfernen

1. Unter **"Anwendungseinschränkungen"**:
   - Wähle: **"Keine"** (temporär für Testing)
2. Klicke **"SPEICHERN"**
3. Warte 1-2 Minuten

### Schritt 5: Test

```bash
# Nach 1-2 Minuten
curl https://www.osteoalsen.de/api/google-reviews
```

**Sollte jetzt funktionieren!**

---

## 🛡️ Sicherheit: Einschränkungen wieder aktivieren

**NACH dem Test - für Production:**

### Option A: IP-Einschränkungen (für Server-Side)
1. Gehe zu API Key Settings
2. Unter **"Anwendungseinschränkungen"**:
   - Wähle: **"IP-Adressen"**
   - Füge Vercel Server IPs hinzu (bekommst du von Vercel Support)
3. Klicke **"SPEICHERN"**

### Option B: Keine Einschränkungen + API-Beschränkungen
1. **Anwendungseinschränkungen:** "Keine"
2. **API-Einschränkungen:** Nur "Places API" aktivieren
3. Das ist sicher genug, weil:
   - API Key ist nur für Places API gültig
   - Du hast Budget-Alert (5 EUR/Monat)
   - Server-Side Request = API Key nicht im Client Code sichtbar

---

## Alternative: Separater Server-Side API Key

### Wenn du maximale Sicherheit willst:

1. **Erstelle 2 API Keys:**
   - **Key 1:** Für Client-Side (mit Domain-Einschränkung)
   - **Key 2:** Für Server-Side (ohne Domain-Einschränkung, nur API-Beschränkung)

2. **Setze in Vercel:**
   ```
   GOOGLE_PLACES_API_KEY = Key 2 (Server-Side Key)
   ```

3. **Wenn du später Client-Side Maps nutzt:**
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_KEY = Key 1 (Client-Side Key)
   ```

---

## 🧪 Erwartetes Ergebnis

Nach Entfernen der Einschränkungen:

```json
{
  "success": true,
  "averageRating": 5.0,
  "totalReviews": 43,
  "businessName": "Osteopathie Alsen - Heilpraxis für Osteopathie Hamburg",
  "reviews": [
    {
      "author": "...",
      "rating": 5,
      "text": "...",
      "date": "..."
    }
  ],
  "cachedAt": "2025-11-29T..."
}
```

Website Reviews Section:
- ✅ "🔄 Live von Google" Badge
- ✅ 43 Reviews, 5.0 Sterne
- ✅ Automatische Updates alle 1h

---

**Quick Fix:**
1. ⚠️ API Key Settings öffnen
2. ⚠️ "Anwendungseinschränkungen" → "Keine"
3. ⚠️ Speichern
4. ⏱️ 1-2 Minuten warten
5. ✅ Test: curl https://www.osteoalsen.de/api/google-reviews

---

**Erstellt:** 29.11.2025
**Problem:** API Key Einschränkungen blockieren Server-Side Requests
