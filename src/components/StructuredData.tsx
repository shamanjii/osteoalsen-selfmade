'use client';

import { usePathname } from 'next/navigation';

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
    '@type': 'MedicalBusiness',
    '@id': url,
    name,
    description,
    url,
    telephone,
    email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      postalCode: address.postalCode,
      addressCountry: address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    openingHoursSpecification: openingHours.map(hours => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.split(' ')[0],
      opens: hours.split(' ')[1],
      closes: hours.split(' ')[2],
    })),
    priceRange,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '45',
      bestRating: '5',
      worstRating: '1',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Osteopathische Behandlungen',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Osteopathische Behandlung',
            description: 'Ganzheitliche osteopathische Behandlung 45-60 Minuten',
          },
          price: '150',
          priceCurrency: 'EUR',
        },
      ],
    },
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
      name: 'Osteopathie Hamburg – Joshua Alsen',
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
      name: 'Osteopathie Hamburg – Joshua Alsen',
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

export function WebsiteStructuredData() {
  const pathname = usePathname();

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.osteoalsen.de/#website',
    url: 'https://www.osteoalsen.de',
    name: 'Osteopathie Hamburg – Joshua Alsen',
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