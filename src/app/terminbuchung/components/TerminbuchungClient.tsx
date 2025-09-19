"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const locations = [
  {
    id: 'rotherbaum',
    name: 'Standort Rotherbaum',
    address: 'Rappstraße 7, 20146 Hamburg',
    hours: [
      { day: 'Montag', time: '09:00 - 14:00 Uhr' },
      { day: 'Mittwoch', time: '09:00 - 18:00 Uhr' }
    ],
    transport: {
      ubahn: 'U1 bis Hallerstraße (5 Min. Fußweg)',
      bus: 'Linien 4, 5, 15 bis Grindelhof (5 Min. Fußweg)',
      parking: 'Begrenzte Straßenparkplätze'
    }
  },
  {
    id: 'eimsbuettel',
    name: 'Standort Eimsbüttel',
    address: 'Stresemannallee 118, 22529 Hamburg',
    hours: [
      { day: 'Dienstag', time: '09:00 - 14:00 Uhr' },
      { day: 'Donnerstag', time: '08:00 - 18:00 Uhr' },
      { day: 'Freitag', time: '09:00 - 14:00 Uhr' }
    ],
    transport: {
      ubahn: 'U2 bis Lutterothstraße (10 Min. Fußweg)',
      bus: 'Linie 181 bis Sorthmannweg oder Eidelstedter Weg',
      parking: 'Begrenzte Straßenparkplätze verfügbar, oder auf dem angrenzenden Aldi-Parkplatz mit Parkuhr 1,5 Stunden kostenfrei'
    }
  }
];

const faqs = [
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

export default function TerminbuchungClient() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    // Load etermin resize script
    const script = document.createElement('script');
    script.src = 'https://www.eTermin.net/js/resizecustomersitescroll.min.js';
    script.type = 'text/javascript';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src="https://www.eTermin.net/js/resizecustomersitescroll.min.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Breadcrumb */}
      <nav className="bg-white border-b border-slate-200 py-3">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <span>→</span>
            <span className="text-slate-900 font-medium">Terminbuchung</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-900/50"></div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <h1 className="font-epilogue text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
            Kurzfristige Terminvergabe
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed mb-8">
            Buchen Sie Ihren Osteopathie-Termin online in Hamburg-Rotherbaum oder Hamburg-Eimsbüttel
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <div className="flex items-center gap-2 text-slate-200">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-slate-900 text-sm font-bold">✓</div>
              <span className="text-sm md:text-base font-medium">Sofortige Bestätigung</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-slate-900 text-sm font-bold">⚡</div>
              <span className="text-sm md:text-base font-medium">Kurzfristige Termine</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-slate-900 text-sm font-bold">€</div>
              <span className="text-sm md:text-base font-medium">Kassenerstattung</span>
            </div>
          </div>
        </div>
      </section>

      {/* Standorte & Öffnungszeiten */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-epilogue text-3xl md:text-4xl font-semibold text-center text-slate-900 mb-12">
            Standorte & Öffnungszeiten
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {locations.map((location) => (
              <div key={location.id} className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
                <div className="text-center mb-6">
                  <h3 className="font-epilogue text-xl font-semibold text-slate-900 mb-2">
                    📍 {location.name}
                  </h3>
                  <p className="text-slate-600 font-medium">{location.address}</p>
                </div>

                <div className="space-y-3">
                  {location.hours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-slate-100 last:border-b-0">
                      <span className="font-epilogue font-medium text-slate-900">{schedule.day}:</span>
                      <span className="text-slate-600">{schedule.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Online Terminbuchung */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 mb-12">
            <h2 className="font-epilogue text-3xl font-semibold text-center text-slate-900 mb-4">
              Online Terminbuchung Osteopathie Hamburg
            </h2>
            <p className="text-center text-slate-600 mb-8 text-lg max-w-3xl mx-auto">
              Wählen Sie einen freien Termin in einer meiner Praxen in Hamburg aus. Sie erhalten eine sofortige Bestätigung per E-Mail.
            </p>

            {/* etermin iframe */}
            <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200 relative">
              {!iframeLoaded && (
                <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-slate-300 border-t-slate-900 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600">Terminkalender wird geladen...</p>
                  </div>
                </div>
              )}
              <iframe
                id="etifr"
                src="https://www.eTermin.net/osteoalsen"
                width="100%"
                height="800"
                style={{ minHeight: '600px', border: 'none' }}
                scrolling="no"
                onLoad={() => setIframeLoaded(true)}
                className="w-full"
              />
            </div>
          </div>

          {/* Wichtige Informationen */}
          <div className="bg-slate-50 rounded-2xl p-8 md:p-12">
            <h3 className="font-epilogue text-2xl font-semibold text-center text-slate-900 mb-8">
              Wichtige Informationen zu Ihrem Termin
            </h3>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">⏱️</span>
                </div>
                <h4 className="font-epilogue text-lg font-semibold text-slate-900 mb-3">Behandlungsdauer</h4>
                <p className="text-slate-600 leading-relaxed">
                  Eine osteopathische Behandlung dauert zwischen 45-60 Minuten und kostet 150 Euro.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">💰</span>
                </div>
                <h4 className="font-epilogue text-lg font-semibold text-slate-900 mb-3">Krankenkasse</h4>
                <p className="text-slate-600 leading-relaxed">
                  Die meisten Krankenkassen erstatten einen Teil der Kosten. Ein formloses Rezept ist ausreichend.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📋</span>
                </div>
                <h4 className="font-epilogue text-lg font-semibold text-slate-900 mb-3">Mitbringen</h4>
                <p className="text-slate-600 leading-relaxed">
                  Bringen Sie bitte Arztbriefe, Röntgen- oder MRT-Bilder zu Ihren Beschwerden mit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Praxen & Anfahrt */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-epilogue text-3xl md:text-4xl font-semibold text-center text-slate-900 mb-12">
            Praxen & Anfahrt
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {locations.map((location) => (
              <div key={location.id} className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                <h3 className="font-epilogue text-xl font-semibold text-center text-slate-900 mb-6">
                  📍 {location.name.replace('Standort ', 'Praxis ')}
                </h3>

                {/* Adresse */}
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-white text-lg">📍</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Praxisadresse</h4>
                    <p className="text-slate-600 leading-relaxed">{location.address}</p>
                  </div>
                </div>

                {/* Öffnungszeiten */}
                <div className="mb-6">
                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    🕐 Sprechzeiten
                  </h4>
                  <div className="bg-white p-4 rounded-lg border border-slate-200">
                    {location.hours.map((schedule, index) => (
                      <p key={index} className="text-slate-700 mb-2 last:mb-0">
                        <strong>{schedule.day}:</strong> {schedule.time}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Anfahrt */}
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    🚇 Anfahrt
                  </h4>
                  <div className="text-slate-600 text-sm space-y-2">
                    <p><strong>U-Bahn:</strong> {location.transport.ubahn}</p>
                    <p><strong>Bus:</strong> {location.transport.bus}</p>
                    <p><strong>Parken:</strong> {location.transport.parking}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Kontakt */}
          <div className="text-center">
            <div className="bg-slate-50 rounded-2xl p-8 max-w-2xl mx-auto border border-slate-200">
              <h3 className="font-epilogue text-xl font-semibold text-slate-900 mb-6">📞 Kontakt</h3>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <a
                  href="tel:+4917643990001"
                  className="flex items-center justify-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
                >
                  <span className="text-lg">📞</span>
                  0176 4399 0001
                </a>
                <a
                  href="mailto:joshua@alsen.info"
                  className="flex items-center justify-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  <span className="text-lg">✉️</span>
                  joshua@alsen.info
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <h2 className="font-epilogue text-3xl md:text-4xl font-bold mb-6">
            Bereit für Ihren Termin?
          </h2>
          <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
            Buchen Sie jetzt Ihren Osteopathie-Termin online und profitieren Sie von unserer schnellen und professionellen Behandlung.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#etifr"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('etifr')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
            >
              📅 Jetzt Termin buchen
            </a>
            <Link
              href="/#kontakt"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-slate-900 transition-colors"
            >
              📞 Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}