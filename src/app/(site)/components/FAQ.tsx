'use client';

import { useState, memo } from 'react';
import Link from 'next/link';
import SafeHtml from '@/components/SafeHtml';
import FAQStructuredData from '@/components/FAQStructuredData';
import { linkPath } from "@/lib/basePath";

const faqs = [
    {
        id: 1,
        question: "Welche Qualifikationen sollte ein Osteopath in Hamburg haben?",
        answer: `<p>Achten Sie auf Verbandsmitgliedschaft (VFO, VOD, BAO oder BVO) und eine BAO-zertifizierte Ausbildung mit mindestens 1.350 Stunden (besser: 5.000+ Stunden).</p>
        <p>Joshua Alsen ist VFO-zertifiziert mit B.Sc. Osteopathie und hat die Vollzeitausbildung mit über 5.000 Stunden absolviert.</p>`
    },
    {
        id: 2,
        question: "Was kostet eine osteopathische Behandlung in Hamburg?",
        answer: `<p>Eine osteopathische Behandlung kostet in Hamburg durchschnittlich 100-180€. Die Behandlung dauert 45-60 Minuten und beinhaltet Anamnese, Untersuchung, osteopathische Behandlung und Nachbesprechung.</p>
        <p>In meiner Praxis zahlen Sie 150€ für 60 Minuten intensive Behandlung nach Gebührenverordnung für Heilpraktiker.</p>`
    },
    {
        id: 3,
        question: "Übernehmen Krankenkassen Osteopathie-Kosten in Hamburg?",
        answer: `<p>Ja, viele private Krankenkassen übernehmen die vollen Kosten. Gesetzliche Krankenkassen (TK, DAK, Barmer, AOK) bezuschussen oft 40-60€ pro Sitzung (meist 3-6 Sitzungen pro Jahr).</p>
        <p>Eine ärztliche Verordnung ist bei gesetzlichen Kassen häufig erforderlich. Als VFO-zertifizierter Osteopath erfülle ich alle Anforderungen der Krankenkassen für eine Kostenerstattung.</p>`
    },
    {
        id: 4,
        question: "Wie schnell bekomme ich einen Termin beim Osteopathen in Hamburg?",
        answer: `<p>Die Wartezeit variiert stark zwischen Praxen in Hamburg. In meiner Praxis biete ich:</p>
        <ul>
            <li>Termine binnen 48 Stunden (Montag-Freitag)</li>
            <li>Auch kurzfristig bei akuten Beschwerden</li>
            <li>Online-Buchung oder telefonisch: 0176 4399 0001</li>
        </ul>
        <p>Bei chronischen Beschwerden ohne zeitlichen Druck können Sie flexibler planen.</p>`
    },
    {
        id: 5,
        question: "Wieviele Sitzungen benötige ich?",
        answer: `<p>Die Wirkung und Anzahl der benötigten Sitzungen variieren je nach individuellem Fall:</p>
        <p>Wenn Sie sich wegen akuter Schmerzen behandeln lassen, spüren Sie häufig bereits nach einer Sitzung eine merkliche Besserung. Meistens sind 1-3 Sitzungen im Abstand von 1-2 Wochen ausreichend.</p>
        <p>Bei chronischen Schmerzen sind meist mehrere Termine notwendig, bevor erste Erfolge sichtbar werden. Die Abstände zwischen den Sitzungen können länger sein.</p>`
    },
    {
        id: 6,
        question: "Kann ich auch ohne Rezept zum Osteopathen?",
        answer: `<p>Ja, Osteopathie ist eine Heilpraktikerleistung und kann ohne ärztliches Rezept in Anspruch genommen werden. Dies gilt sowohl für Privat- und Beihilfepatienten als auch für gesetzlich Versicherte.</p>
        <p>Für die Kostenerstattung bei gesetzlichen Krankenkassen ist jedoch oft eine ärztliche Empfehlung erforderlich.</p>`
    },
    {
        id: 7,
        question: "Wann sollte man nicht zur Osteopathie gehen?",
        answer: `<p>Osteopathie kann bei vielen Beschwerden helfen. Bei folgenden Fällen sollten Sie jedoch zuerst schulmedizinisch behandelt werden:</p>
        <ul>
            <li>Schwere Verletzungen: Offene Wunden, Knochenbrüche, Bänderrisse</li>
            <li>Akute Notfälle: Herzinfarkt, Schlaganfall, schwere Infektionen</li>
            <li>Schwere psychische Erkrankungen: Psychosen, akute Depressionen</li>
        </ul>
        <p>In meiner Praxis in Hamburg arbeite ich bei Bedarf mit Fachärzten (Orthopäden, Chirurgen, Internisten) zusammen, um die bestmögliche Behandlung zu gewährleisten. Bei psychischen Beschwerden kann Osteopathie begleitend durch Regulation des Nervensystems unterstützen.</p>`
    },
    {
        id: 8,
        question: "Soll ich etwas zur Behandlung mitbringen?",
        answer: `<p>Zur ersten Behandlung in meiner Hamburger Praxis empfehle ich folgendes mitzubringen:</p>
        <ul>
            <li><strong>Ärztliche Verordnung/Überweisung</strong> (falls vorhanden – wichtig für die Weitergabe an Ihre Krankenkasse nach der Behandlung)</li>
            <li><strong>Arztberichte, Röntgen- oder MRT-Bilder</strong> (falls vorhanden – helfen bei der Diagnose)</li>
            <li><strong>Bequeme Kleidung oder Sportkleidung</strong></li>
        </ul>
        <p>Die körperliche Untersuchung findet in Unterwäsche oder Sportkleidung statt. Sie können sich in der Praxis umziehen. Ihre Versichertenkarte benötigen Sie nicht zwingend.</p>`
    }
];

const FAQ = memo(function FAQ() {
    const [openItems, setOpenItems] = useState<number[]>([]);

    const toggleFAQ = (id: number) => {
        setOpenItems(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    // Prepare FAQ data for structured data
    const faqData = faqs.map(faq => ({
        question: faq.question,
        answer: faq.answer.replace(/<[^>]*>/g, ''), // Strip HTML tags for schema
    }));

    return (
        <section id="faq" className="py-16 sm:py-24 bg-slate-50">
            <FAQStructuredData faqs={faqData} />
            <div className="mx-auto max-w-4xl px-4 sm:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight font-epilogue">
                        Häufig gestellte Fragen
                    </h2>
                    <p className="mt-4 text-slate-700 text-lg">
                        Antworten auf die wichtigsten Fragen zur Osteopathie-Behandlung
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq) => (
                        <div key={faq.id} className="faq-item bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                            <button
                                className="faq-question w-full px-6 py-5 text-left flex items-center justify-between hover:bg-slate-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-inset"
                                onClick={() => toggleFAQ(faq.id)}
                                aria-expanded={openItems.includes(faq.id)}
                            >
                                <span className="text-lg font-medium text-slate-900 pr-4">
                                    {faq.question}
                                </span>
                                <span className={`faq-icon flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-semibold text-xl transition-all duration-300 ${
                                    openItems.includes(faq.id) ? 'rotate-45 bg-slate-900 text-white' : ''
                                }`}>
                                    +
                                </span>
                            </button>

                            <div className={`faq-answer overflow-hidden transition-all duration-300 ease-in-out ${
                                openItems.includes(faq.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}>
                                <div className="faq-content px-6 pb-6">
                                    <SafeHtml
                                        html={faq.answer}
                                        className="text-slate-700 leading-relaxed space-y-4"
                                        type="faq"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Link to full FAQ page */}
                <div className="text-center mt-12">
                    <Link
                        href={linkPath("/faq/")}
                        className="inline-flex items-center text-slate-900 font-medium hover:text-slate-700 transition-colors group"
                    >
                        Alle Fragen & Antworten ansehen
                        <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
});

export default FAQ;