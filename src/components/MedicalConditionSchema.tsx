interface MedicalConditionSchemaProps {
  name: string;
  description: string;
  symptoms?: string[];
  treatmentName?: string;
  url: string;
}

export default function MedicalConditionSchema({
  name,
  description,
  symptoms = [],
  treatmentName = "Osteopathische Behandlung",
  url,
}: MedicalConditionSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    name: name,
    description: description,
    ...(symptoms.length > 0 && {
      signOrSymptom: symptoms.map((symptom) => ({
        "@type": "MedicalSymptom",
        name: symptom,
      })),
    }),
    possibleTreatment: {
      "@type": "MedicalTherapy",
      name: treatmentName,
      description: `Osteopathische Behandlung bei ${name} in Hamburg durch VFO-zertifizierten Osteopathen Joshua Alsen.`,
      relevantSpecialty: {
        "@type": "MedicalSpecialty",
        name: "Osteopathie",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
