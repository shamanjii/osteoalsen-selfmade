// Force dynamic rendering to avoid prerender errors
export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import TerminbuchungClient from './components/TerminbuchungClient';

export const metadata: Metadata = {
  title: 'Termin buchen - Osteopathie Hamburg | Joshua Alsen',
  description: 'Terminbuchung Osteopathie Hamburg - Joshua Alsen. ✓ Online buchen ✓ Kurzfristige Termine ✓ Rotherbaum & Eimsbüttel ✓ Krankenkassen-Erstattung. Jetzt Termin vereinbaren!',
  keywords: 'Osteopathie Termin Hamburg, Osteopath Terminbuchung, Joshua Alsen Termin, Osteopathie Hamburg buchen, Heilpraktiker Termin, Rotherbaum, Eimsbüttel',
  authors: [{ name: 'Joshua Alsen' }],
  openGraph: {
    title: 'Termin buchen - Osteopathie Hamburg | Joshua Alsen',
    description: 'Terminbuchung Osteopathie Hamburg - Joshua Alsen. ✓ Online buchen ✓ Kurzfristige Termine ✓ Rotherbaum & Eimsbüttel ✓ Krankenkassen-Erstattung.',
    type: 'website',
    locale: 'de_DE',
  },
};

// Strukturierte Daten für lokales SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Osteopathie Alsen - Joshua Alsen",
  "description": "Heilpraxis für Osteopathie in Hamburg mit zwei Standorten in Rotherbaum und Eimsbüttel",
  "url": "https://www.osteoalsen.de",
  "telephone": "+49176-4399-0001",
  "email": "joshua@alsen.info",
  "founder": {
    "@type": "Person",
    "name": "Joshua Alsen",
    "jobTitle": "Heilpraktiker und Osteopath"
  },
  "address": [
    {
      "@type": "PostalAddress",
      "streetAddress": "Rappstraße 7",
      "addressLocality": "Hamburg",
      "addressRegion": "Hamburg",
      "postalCode": "20146",
      "addressCountry": "DE"
    },
    {
      "@type": "PostalAddress",
      "streetAddress": "Stresemannallee 118",
      "addressLocality": "Hamburg",
      "addressRegion": "Hamburg",
      "postalCode": "22529",
      "addressCountry": "DE"
    }
  ],
  "openingHours": [
    "Mo 09:00-14:00",
    "Tu 09:00-14:00",
    "We 09:00-18:00",
    "Th 08:00-18:00",
    "Fr 08:00-14:00"
  ],
  "serviceType": "Osteopathie",
  "areaServed": {
    "@type": "City",
    "name": "Hamburg"
  }
};

export default function TerminbuchungPage() {
  return (
    <>
      {/* Strukturierte Daten */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <TerminbuchungClient />
    </>
  );
}