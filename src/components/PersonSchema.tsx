interface PersonSchemaProps {
  name: string;
  jobTitle: string;
  url: string;
  imageUrl?: string;
  email?: string;
  telephone?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
  };
  sameAs?: string[];
}

export default function PersonSchema({
  name,
  jobTitle,
  url,
  imageUrl,
  email,
  telephone,
  address,
  sameAs = [],
}: PersonSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${url}#person`,
    name,
    jobTitle,
    url,
    ...(imageUrl && {
      image: {
        "@type": "ImageObject",
        url: imageUrl,
      },
    }),
    ...(email && { email }),
    ...(telephone && { telephone }),
    ...(address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: address.streetAddress,
        addressLocality: address.addressLocality,
        addressRegion: "Hamburg",
        postalCode: address.postalCode,
        addressCountry: address.addressCountry,
      },
    }),
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Osteopath",
        name: "VFO-zertifizierter Osteopath",
        recognizedBy: {
          "@type": "Organization",
          name: "VFO - Verband Freier Osteopathen e.V.",
          url: "https://www.vfo.de",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Heilpraktiker",
        name: "Heilpraktiker",
        recognizedBy: {
          "@type": "Organization",
          name: "Gesundheitsamt Hamburg",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Bachelor",
        name: "B.Sc. Osteopathie",
        educationalLevel: "Bachelor's Degree",
      },
    ],
    memberOf: {
      "@type": "Organization",
      name: "VFO - Verband Freier Osteopathen e.V.",
      url: "https://www.vfo.de",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Berufsakademie für Osteopathie (BAO)",
    },
    knowsAbout: [
      "Osteopathy",
      "Visceral Osteopathy",
      "Craniosacral Therapy",
    ],
    ...(sameAs.length > 0 && { sameAs }),
    worksFor: {
      "@type": "MedicalBusiness",
      "@id": `https://www.osteoalsen.de/#business`,
      name: "Osteopathie Hamburg - Joshua Alsen",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
