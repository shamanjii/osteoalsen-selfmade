'use client';

import { useState, memo } from 'react';
import SafeHtml from '@/components/SafeHtml';

const faqs = [
    {
        id: 1,
        question: "Wird die Osteopathie-Behandlung bei Ihnen von der Krankenkasse bezahlt?",
        answer: `<p>Ich bin Mitglied in einem Osteopathieverband und erfülle alle Anforderungen der Krankenkassen für eine Kostenerstattung.</p>

        <p>Private Krankenversicherungen übernehmen in der Regel die gesamten Kosten für osteopathische Behandlungen. Die genauen Bedingungen variieren je nach Tarif und Versicherungsunternehmen.</p>`
    },
    {
        id: 2,
        question: "Wie viel kostet die osteopathische Behandlung?",
        answer: `<p>Ich berechne nach der Gebührenverordnung für Heilpraktiker. Eine reguläre osteopathische Behandlung dauert bei mir zwischen 45 und 60 Minuten und kostet 150 Euro.</p>`
    },
    {
        id: 3,
        question: "Wieviele Sitzungen benötige ich?",
        answer: `<p>Die Wirkung und Anzahl der benötigten Sitzungen variieren je nach individuellem Fall:</p>
        <p>Wenn Sie sich wegen akuter Schmerzen behandeln lassen, spüren Sie häufig bereits nach einer Sitzung eine merkliche Besserung. Meistens sind 1-3 Sitzungen im Abstand von 1-2 Wochen ausreichend.</p>
        <p>Bei chronischen Schmerzen sind meist mehrere Termine notwendig, bevor erste Erfolge sichtbar werden. Die Abstände zwischen den Sitzungen können länger sein.</p>`
    },
    {
        id: 4,
        question: "Kann ich auch ohne Rezept zum Osteopathen?",
        answer: `<p>Ja, Osteopathie ist eine Heilpraktikerleistung und kann ohne ärztliches Rezept in Anspruch genommen werden. Dies gilt sowohl für Privat- und Beihilfepatienten als auch für gesetzlich Versicherte.</p>`
    },
    {
        id: 5,
        question: "Wann sollte man nicht zur Osteopathie gehen?",
        answer: `<p>Die Osteopathie ist dank ihres ganzheitlichen Behandlungskonzepts ein wunderbar vielseitiges Instrument, das bei einer Vielzahl an Beschwerden zum Einsatz kommen kann.</p>
        <p>Schwere Verletzungen wie offene Wunden, Knochenbrüche oder Bänderrisse sollten Sie aber zuerst schulmedizinisch behandeln lassen.</p>
        <p>Auch schwere psychische Leiden wie starke Depressionen, Psychosen oder Persönlichkeitsstörungen lassen sich in der Regel nicht mit einer osteopathischen Behandlung alleine auflösen. Jedoch kann die osteopathische Arbeit über die Regulation des Nervensystems hier begleitend förderlich sein.</p>`
    },
    {
        id: 6,
        question: "Soll ich etwas zur Behandlung mitbringen?",
        answer: `<p>Falls Sie Arztbriefe sowie Röntgen- oder MRT-Bilder zu Ihren aktuellen Beschwerden haben, bringen Sie diese bitte zum ersten Termin mit.</p>
        <p>Eventuell möchten Sie sich bequeme Kleidung für die Behandlung mitbringen. Die körperliche Untersuchung findet zu Teilen in Unterwäsche oder in Sportkleidung statt.</p>`
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

    return (
        <section id="faq" className="py-16 sm:py-24 bg-slate-50">
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
            </div>
        </section>
    );
});

export default FAQ;