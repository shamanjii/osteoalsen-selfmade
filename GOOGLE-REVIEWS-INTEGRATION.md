# 🌟 Google Reviews Live-Integration

## PROBLEM (Aktuell):
- Reviews sind statisch in `/data/fallbackReviews.ts`
- Neue Google-Reviews erscheinen NICHT automatisch auf der Website
- Manueller Aufwand, Reviews zu aktualisieren

## LÖSUNG: 3 Optionen

---

## OPTION 1: Google Reviews Badge Widget ⭐ (EMPFOHLEN - Einfachste)

**Vorteile:**
- ✅ Kostenlos
- ✅ Live von Google
- ✅ 5 Minuten Setup
- ✅ Automatische Updates
- ✅ Zeigt echte Google-Sterne

**Nachteile:**
- ❌ Weniger Kontrolle über Design
- ❌ Google-Branding

### Setup (Copy-Paste):

**Ersetze deine Reviews-Sektion mit:**

```tsx
{/* Google Reviews Badge */}
<div className="text-center mb-8 mt-10">
  <div className="inline-block">
    <script src="https://static.elfsight.com/platform/platform.js" data-use-service-core defer></script>
    <div className="elfsight-app-YOUR_APP_ID"></div>
  </div>
</div>
```

**Alternative - Custom Google Badge:**

```tsx
<div className="flex flex-col items-center gap-4">
  {/* Google Badge */}
  <div className="flex items-center gap-3 bg-white p-6 rounded-xl shadow-lg border border-slate-200">
    <img
      src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg"
      alt="Google"
      className="h-6"
    />
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-slate-900">5.0</span>
        <div className="text-amber-400 text-lg">★★★★★</div>
      </div>
      <span className="text-sm text-slate-600">42 Bewertungen</span>
    </div>
  </div>

  {/* CTA Button */}
  <a
    href="https://g.co/kgs/sHjcBZV"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
  >
    Alle Bewertungen auf Google ansehen
  </a>

  {/* Embed Google Reviews */}
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2369.123!2d9.9816237!3d53.5702491!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x232e29d9d1478b6d%3A0x2ef8aab5d2facdef!2sOsteopathie%20Alsen!5e0!3m2!1sde!2sde!4v1234567890!5m2!1sde!2sde"
    width="100%"
    height="400"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    className="rounded-lg shadow-md"
  ></iframe>
</div>
```

---

## OPTION 2: Google Places API Integration ⭐⭐ (Mittel - Am Besten)

**Vorteile:**
- ✅ Vollständige Kontrolle über Design
- ✅ Live von Google
- ✅ Automatische Updates
- ✅ Zeigt echte Review-Texte

**Nachteile:**
- ❌ Benötigt Google API Key
- ❌ 30 Min Setup
- ❌ Kostet ~5-10€/Monat (nach Freikontigent)

### Setup:

#### Schritt 1: Google API Key erstellen

1. Gehe zu: https://console.cloud.google.com/
2. Erstelle neues Projekt (oder nutze bestehendes "osteoalsen-seo-monitoring")
3. APIs aktivieren:
   - "Places API"
   - "Maps JavaScript API"
4. Credentials → "API Key" erstellen
5. API Key einschränken:
   - Nur "Places API" erlauben
   - Nur deine Domain: `osteoalsen.de`

#### Schritt 2: Place ID finden

Deine Place ID ist wahrscheinlich: `ChIJbYtH0dkp1kcRL93yvbWqrC4`

(Oder finde sie hier: https://developers.google.com/maps/documentation/places/web-service/place-id)

#### Schritt 3: API Route erstellen

**Erstelle:** `/src/app/api/google-reviews/route.ts`

```typescript
import { NextResponse } from 'next/server';

const PLACE_ID = 'ChIJbYtH0dkp1kcRL93yvbWqrC4'; // Deine Place ID
const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

export async function GET() {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,user_ratings_total,reviews&key=${API_KEY}&language=de`,
      { next: { revalidate: 3600 } } // Cache 1 Stunde
    );

    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error(`Google API Error: ${data.status}`);
    }

    const reviews = data.result.reviews.map((review: any) => ({
      author: review.author_name,
      rating: review.rating,
      text: review.text,
      date: new Date(review.time * 1000).toLocaleDateString('de-DE'),
      profilePhoto: review.profile_photo_url,
      authorUrl: review.author_url
    }));

    return NextResponse.json({
      averageRating: data.result.rating,
      totalReviews: data.result.user_ratings_total,
      reviews
    });
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}
```

#### Schritt 4: Reviews Component updaten

**Update:** `/src/app/(site)/components/Reviews.tsx`

```typescript
'use client';
import { useState, useEffect } from 'react';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({ averageRating: 5.0, totalReviews: 42 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch('/api/google-reviews');
        const data = await response.json();

        if (data.reviews) {
          setReviews(data.reviews);
          setStats({
            averageRating: data.averageRating,
            totalReviews: data.totalReviews
          });
        }
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
        // Fallback to static reviews
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, []);

  // Rest of your component...
}
```

#### Schritt 5: Env Variable setzen

In `.env`:
```
GOOGLE_PLACES_API_KEY=DEIN_API_KEY_HIER
```

---

## OPTION 3: Elfsight Widget ⭐⭐⭐ (Profi - Kostenpflichtig)

**Vorteile:**
- ✅ Perfektes Design
- ✅ Live Updates
- ✅ 5 Min Setup
- ✅ Responsive
- ✅ Viele Features (Filter, Carousel, etc.)

**Nachteile:**
- ❌ Kostet $5-10/Monat
- ❌ Externer Service

### Setup:

1. Gehe zu: https://elfsight.com/google-reviews-widget/
2. Erstelle Widget
3. Copy-Paste Code auf Website

---

## 🎯 MEINE EMPFEHLUNG:

### Für JETZT (nächste 10 Min):
**Option 1** - Google Maps Embed + Badge
- Zeigt Reviews live
- Kostenlos
- Einfachste Lösung

### Für SPÄTER (diese Woche):
**Option 2** - Google Places API
- Beste Lösung langfristig
- Vollständige Kontrolle
- Automatisch aktualisiert

---

## 💡 BONUS: Google Review Schema optimieren

Deine `ReviewsStructuredData` sollte auch die **echten Reviews** enthalten:

```typescript
const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Osteopathie Alsen",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "42",
    "bestRating": "5",
    "worstRating": "5"
  },
  "review": reviews.slice(0, 5).map(review => ({
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.author
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating
    },
    "reviewBody": review.text,
    "datePublished": review.date
  }))
};
```

---

## 🚀 NÄCHSTE SCHRITTE:

**Heute:**
1. Entscheide: Option 1 (schnell) oder Option 2 (beste Lösung)?

**Option 1 (10 Min):**
- Embed Google Maps iframe
- Füge "Alle Reviews auf Google ansehen" Button hinzu

**Option 2 (30 Min):**
- Google API Key erstellen
- API Route implementieren
- Reviews Component updaten

Welche Option bevorzugst du?
