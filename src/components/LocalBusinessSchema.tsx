interface LocalBusinessSchemaProps {
  location?: 'rotherbaum' | 'eimsbuettel';
}

export default function LocalBusinessSchema({ location = 'rotherbaum' }: LocalBusinessSchemaProps) {
  const rotherbaumData = {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "HealthAndBeautyBusiness"],
    "@id": "https://www.osteoalsen.de/#organization",
    "name": "Osteopathie Hamburg - Joshua Alsen",
    "alternateName": "Joshua Alsen - Osteopath Hamburg",
    "description": "VFO-zertifizierte Osteopathie-Praxis in Hamburg-Rotherbaum. Ganzheitliche osteopathische Behandlungen bei Rückenschmerzen, Kopfschmerzen, Verdauungsbeschwerden und mehr.",
    "url": "https://www.osteoalsen.de",
    "logo": "https://www.osteoalsen.de/assets/osteopathie-alsen-logo.webp",
    "image": "https://www.osteoalsen.de/assets/joshua-alsen-profil.webp",
    "telephone": "+49-176-43990001",
    "email": "joshua@alsen.info",
    "founder": {
      "@type": "Person",
      "name": "Joshua Alsen",
      "jobTitle": "Osteopath & Heilpraktiker",
      "description": "VFO-zertifizierter Osteopath mit BAO-Ausbildung (5000+ Stunden)",
      "url": "https://www.osteoalsen.de/ueber-mich",
      "sameAs": [
        "https://www.osteopathie.de/therapeutenliste",
        "https://www.linkedin.com/in/joshuaalsen"
      ]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rappstraße 7",
      "addressLocality": "Hamburg",
      "addressRegion": "Hamburg",
      "postalCode": "20146",
      "addressCountry": "DE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 53.568370,
      "longitude": 9.987242
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "priceRange": "€€",
    "currenciesAccepted": "EUR",
    "paymentAccepted": "Cash, EC-Card",
    "areaServed": {
      "@type": "City",
      "name": "Hamburg",
      "containedInPlace": {
        "@type": "State",
        "name": "Hamburg"
      }
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 53.568370,
        "longitude": 9.987242
      },
      "geoRadius": "15000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Osteopathische Behandlungen",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalProcedure",
            "name": "Osteopathische Behandlung bei Rückenschmerzen",
            "description": "Ganzheitliche Behandlung von Rückenschmerzen, Bandscheibenproblemen und ISG-Blockaden"
          },
          "price": "150",
          "priceCurrency": "EUR"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalProcedure",
            "name": "Osteopathie bei Kopfschmerzen und Migräne",
            "description": "Sanfte Behandlung von Spannungskopfschmerzen, Migräne und CMD"
          },
          "price": "150",
          "priceCurrency": "EUR"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalProcedure",
            "name": "Viszerale Osteopathie bei Verdauungsbeschwerden",
            "description": "Osteopathische Behandlung von Reizdarm, Blähungen und Verdauungsproblemen"
          },
          "price": "150",
          "priceCurrency": "EUR"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalProcedure",
            "name": "Sportosteopathie",
            "description": "Behandlung von Sportverletzungen und Prävention"
          },
          "price": "150",
          "priceCurrency": "EUR"
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "47",
      "bestRating": "5",
      "worstRating": "1"
    },
    "sameAs": [
      "https://www.facebook.com/osteoalsen",
      "https://www.instagram.com/osteoalsen",
      "https://www.google.com/maps/place/Rappstraße+7,+20146+Hamburg"
    ],
    "slogan": "Ganzheitliche Osteopathie in Hamburg - Für Ihre Gesundheit",
    "knowsAbout": [
      "Osteopathie",
      "Manuelle Medizin",
      "Viszerale Osteopathie",
      "Kraniosakrale Osteopathie",
      "Parietale Osteopathie",
      "Sportosteopathie",
      "Rückenschmerzen",
      "Kopfschmerzen",
      "Migräne",
      "Verdauungsbeschwerden"
    ],
    "medicalSpecialty": [
      "Osteopathie",
      "Manuelle Therapie",
      "Ganzheitliche Medizin"
    ]
  };

  const eimsbuettelData = {
    ...rotherbaumData,
    "@id": "https://www.osteoalsen.de/osteopathie-eimsbuettel#organization",
    "name": "Osteopathie Hamburg Eimsbüttel - Joshua Alsen",
    "url": "https://www.osteoalsen.de/osteopathie-eimsbuettel",
    "description": "VFO-zertifizierte Osteopathie-Praxis in Hamburg-Eimsbüttel. Ganzheitliche osteopathische Behandlungen."
  };

  const schemaData = location === 'eimsbuettel' ? eimsbuettelData : rotherbaumData;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData),
      }}
    />
  );
}
