// Server Component - no 'use client' needed

interface LocalBusinessStructuredDataProps {
  name: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  openingHours: string[];
  priceRange: string;
}

interface BlogPostStructuredDataProps {
  headline: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  imageUrl?: string;
  keywords?: string[];
}

interface MedicalScholarlyArticleProps {
  headline: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  imageUrl?: string;
  keywords?: string[];
  citations?: {
    title: string;
    author?: string;
    url?: string;
    identifier?: string;
  }[];
  specialty: string;
  sourceCount: number;
}

export function LocalBusinessStructuredData({
  name,
  description,
  url,
  telephone,
  email,
  address,
  geo,
  openingHours,
  priceRange,
}: LocalBusinessStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': ['MedicalBusiness', 'HealthAndBeautyBusiness', 'LocalBusiness'],
    '@id': `${url}/#business`,
    name,
    description,
    url,
    telephone,
    email,
    image: [
      `${url}/assets/joshua-alsen-osteopath-hamburg.webp`,
      `${url}/assets/osteopathie-praxis-hamburg.webp`,
    ],
    logo: {
      '@type': 'ImageObject',
      url: `${url}/assets/osteopathie-alsen-logo.webp`,
      width: 600,
      height: 60,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      addressRegion: 'Hamburg',
      postalCode: address.postalCode,
      addressCountry: address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    // Area served - critical for local SEO
    areaServed: [
      {
        '@type': 'City',
        name: 'Hamburg',
        '@id': 'https://www.wikidata.org/wiki/Q1055',
      },
      {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: geo.latitude,
          longitude: geo.longitude,
        },
        geoRadius: '10000', // 10km radius
      },
    ],
    // Service areas (neighborhoods)
    serviceArea: [
      { '@type': 'Place', name: 'Rotherbaum' },
      { '@type': 'Place', name: 'Eimsbüttel' },
      { '@type': 'Place', name: 'Hamburg-Mitte' },
      { '@type': 'Place', name: 'Harvestehude' },
      { '@type': 'Place', name: 'Hoheluft' },
      { '@type': 'Place', name: 'Eppendorf' },
    ],
    openingHoursSpecification: openingHours.map(hours => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.split(' ')[0],
      opens: hours.split(' ')[1],
      closes: hours.split(' ')[2],
    })),
    priceRange,
    paymentAccepted: ['Cash', 'Invoice', 'Bank Transfer'],
    currenciesAccepted: 'EUR',
    // Aggregate rating
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '45',
      bestRating: '5',
      worstRating: '1',
    },
    // Medical services offered
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Osteopathische Behandlungen',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'MedicalProcedure',
            name: 'Osteopathische Behandlung',
            description: 'Ganzheitliche osteopathische Behandlung für Erwachsene',
            procedureType: 'Therapeutic',
          },
          price: '150',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          priceValidUntil: '2026-12-31',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'MedicalProcedure',
            name: 'Behandlung von Rückenschmerzen',
            description: 'Spezialisierte osteopathische Behandlung bei Rückenbeschwerden',
            procedureType: 'Therapeutic',
          },
          price: '150',
          priceCurrency: 'EUR',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'MedicalProcedure',
            name: 'Behandlung von Kopfschmerzen & Migräne',
            description: 'Osteopathische Behandlung bei Kopfschmerzen und Migräne',
            procedureType: 'Therapeutic',
          },
          price: '150',
          priceCurrency: 'EUR',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'MedicalProcedure',
            name: 'Sportosteopathie',
            description: 'Osteopathische Betreuung für Sportler',
            procedureType: 'Therapeutic',
          },
          price: '150',
          priceCurrency: 'EUR',
        },
      ],
    },
    // Medical specialties
    medicalSpecialty: [
      'Osteopathic Manipulative Medicine',
      'Physical Medicine',
      'Sports Medicine',
    ],
    // Practitioner information
    employee: {
      '@type': 'Person',
      name: 'Joshua Alsen',
      jobTitle: 'Osteopath und Heilpraktiker',
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Osteopath',
          recognizedBy: {
            '@type': 'Organization',
            name: 'VFO - Verband Freier Osteopathen e.V.',
          },
        },
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Heilpraktiker',
          recognizedBy: {
            '@type': 'Organization',
            name: 'Gesundheitsamt Hamburg',
          },
        },
      ],
      memberOf: {
        '@type': 'Organization',
        name: 'VFO - Verband Freier Osteopathen e.V.',
        url: 'https://www.vfo.de',
      },
    },
    // Same as - social profiles & directories
    sameAs: [
      'https://www.osteopathie.de/praktikersuche',
      'https://www.vfo.de',
      // Add social media profiles if available
      // 'https://www.facebook.com/osteoalsen',
      // 'https://www.instagram.com/osteoalsen',
    ],
    // Accessibility features
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Barrier-free access',
        value: true,
      },
    ],
    // Additional properties for local SEO
    knowsAbout: [
      'Osteopathy',
      'Manual Therapy',
      'Sports Medicine',
      'Pain Management',
      'Holistic Medicine',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function BlogPostStructuredData({
  headline,
  description,
  author,
  datePublished,
  dateModified,
  url,
  imageUrl,
  keywords,
}: BlogPostStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline,
    description,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Osteopathie Alsen',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.osteoalsen.de/assets/logo.png',
      },
    },
    datePublished,
    dateModified: dateModified || datePublished,
    url,
    ...(imageUrl && {
      image: {
        '@type': 'ImageObject',
        url: imageUrl,
      },
    }),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function MedicalScholarlyArticle({
  headline,
  description,
  author,
  datePublished,
  dateModified,
  url,
  imageUrl,
  keywords,
  citations = [],
  specialty,
  sourceCount,
}: MedicalScholarlyArticleProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': ['MedicalScholarlyArticle', 'Article'],
    headline,
    description,
    author: {
      '@type': 'Person',
      name: author,
      jobTitle: 'Osteopath und Heilpraktiker',
      affiliation: {
        '@type': 'Organization',
        name: 'VFO - Verband Freier Osteopathen e.V.',
      },
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Osteopath',
        recognizedBy: {
          '@type': 'Organization',
          name: 'VFO - Verband Freier Osteopathen e.V.',
        },
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Osteopathie Alsen',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.osteoalsen.de/assets/osteopathie-alsen-logo.webp',
      },
    },
    datePublished,
    dateModified: dateModified || datePublished,
    url,
    ...(imageUrl && {
      image: {
        '@type': 'ImageObject',
        url: imageUrl,
      },
    }),
    ...(keywords && {
      keywords: keywords.join(', '),
    }),
    specialty: {
      '@type': 'MedicalSpecialty',
      name: specialty,
    },
    about: {
      '@type': 'MedicalCondition',
      name: specialty,
      code: {
        '@type': 'MedicalCode',
        code: 'T-D4000',
        codingSystem: 'RadLex',
      },
    },
    ...(citations.length > 0 && {
      citation: citations.map(cite => ({
        '@type': 'ScholarlyArticle',
        name: cite.title,
        ...(cite.author && { author: cite.author }),
        ...(cite.url && { url: cite.url }),
        ...(cite.identifier && { identifier: cite.identifier }),
      })),
    }),
    // Add evidence level indicator
    evidenceLevel: {
      '@type': 'Text',
      value: `Based on ${sourceCount}+ peer-reviewed studies`,
    },
    isBasedOn: citations.slice(0, 10).map(cite => ({
      '@type': 'ScholarlyArticle',
      name: cite.title,
      ...(cite.url && { url: cite.url }),
    })),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    isAccessibleForFree: true,
    genre: ['Medical Research', 'Osteopathic Medicine', 'Evidence-Based Medicine'],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface FAQPageStructuredDataProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export function FAQPageStructuredData({ faqs }: FAQPageStructuredDataProps) {
  if (faqs.length === 0) return null;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface WebsiteStructuredDataProps {
  pathname?: string;
}

export function WebsiteStructuredData({ pathname }: WebsiteStructuredDataProps = {}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.osteoalsen.de/#website',
    url: 'https://www.osteoalsen.de',
    name: 'Osteopathie Alsen',
    description: 'Osteopathie in Hamburg-Rotherbaum & Eimsbüttel. Behandlung 45–60 Min., 150 €. Kostenerstattung möglich.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.osteoalsen.de/blog?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    ...(pathname === '/' && {
      mainEntity: {
        '@type': 'MedicalBusiness',
        '@id': 'https://www.osteoalsen.de/#business',
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}