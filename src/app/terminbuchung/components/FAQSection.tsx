"use client";
import { useState } from "react";

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: 'Wie schnell bekomme ich einen Termin?',
    answer: 'In der Regel kann ich Ihnen innerhalb von 1-2 Wochen einen Termin anbieten. Bei akuten Beschwerden versuche ich, kurzfristige Termine zu ermöglichen.'
  },
  {
    id: 2,
    question: 'Kann ich meinen Termin verschieben oder absagen?',
    answer: 'Termine können bis 24 Stunden vorher kostenfrei storniert oder verschoben werden. Bei kurzfristigeren Absagen behalte ich mir vor, die Behandlungskosten in Rechnung zu stellen.'
  },
  {
    id: 3,
    question: 'Brauche ich ein Rezept für die Behandlung?',
    answer: 'Nein, ein Rezept ist nicht erforderlich. Für die Kostenerstattung durch die Krankenkasse ist jedoch eine formlose ärztliche Empfehlung hilfreich.'
  },
  {
    id: 4,
    question: 'Was kostet die Behandlung?',
    answer: 'Eine osteopathische Behandlung (45-60 Minuten) kostet 150 Euro. Ich erfülle alle Anforderungen für die Übernahme durch die Krankenkasse. Die Kassenleistungen variieren je nach Krankenkasse und sind bei Ihrer Versicherung zu erfragen.'
  },
  {
    id: 5,
    question: 'In welcher Praxis findet mein Termin statt?',
    answer: 'Sie erhalten die genaue Praxisadresse bei der Terminbestätigung. Je nach verfügbaren Zeiten finden Termine in Hamburg-Rotherbaum (Rappstraße 7) oder Hamburg-Eimsbüttel (Stresemannallee 118) statt.'
  }
];

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="py-16 bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="font-epilogue text-3xl md:text-4xl font-semibold text-center text-slate-900 mb-12">
          Häufige Fragen zur Terminbuchung
        </h2>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-slate-50 transition-colors"
              >
                <span className="font-epilogue text-lg font-medium text-slate-900 pr-4">
                  {faq.question}
                </span>
                <span className={`text-xl font-bold text-slate-600 transition-transform duration-300 ${
                  openFAQ === faq.id ? 'rotate-45' : ''
                }`}>
                  +
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openFAQ === faq.id ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="p-6 pt-0 text-slate-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
