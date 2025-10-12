'use client';

import { PhoneLink, EmailLink } from '@/components/TrackableLink';
import { trackAppointmentClick } from '@/components/Analytics';

export default function ContactSection() {
    const handleAppointmentClick = () => {
        trackAppointmentClick('contact_section');
    };

    return (
        <section id="kontakt" className="bg-slate-50 py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight font-epilogue">
                        Kontakt & Terminvereinbarung
                    </h2>
                    <p className="mt-6 max-w-3xl mx-auto text-xl leading-relaxed text-slate-700">
                        Haben Sie Fragen oder möchten Sie einen Termin vereinbaren? Ich freue mich auf Ihren Kontakt und berate Sie gerne zu Ihren individuellen Beschwerden.
                    </p>
                </div>

                {/* Hauptkontakt Block */}
                <div className="bg-white p-12 rounded-xl border border-slate-200 shadow-sm mb-16 text-center">
                    <h3 className="text-slate-900 text-2xl font-medium mb-8 font-epilogue">Terminvereinbarung</h3>

                    <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-12 mb-8">
                        {/* Telefon */}
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0 hover:bg-slate-800 hover:scale-105 transition-all duration-300">
                                <span className="text-white text-xl">📞</span>
                            </div>
                            <div className="text-left">
                                <h4 className="text-slate-900 text-lg font-medium mb-1 font-epilogue">Telefon</h4>
                                <PhoneLink
                                    source="contact_section_main"
                                    className="text-slate-900 text-lg font-medium hover:text-slate-600 transition-colors"
                                >
                                    0176 4399 0001
                                </PhoneLink>
                            </div>
                        </div>

                        {/* Online Terminbuchung */}
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0 hover:bg-slate-800 hover:scale-105 transition-all duration-300">
                                <span className="text-white text-xl">📅</span>
                            </div>
                            <div className="text-left">
                                <h4 className="text-slate-900 text-lg font-medium mb-1 font-epilogue">Online Buchung</h4>
                                <a
                                    href="/terminbuchung"
                                    onClick={handleAppointmentClick}
                                    className="text-slate-900 text-lg font-medium hover:text-slate-600 transition-colors"
                                >
                                    Termin buchen
                                </a>
                            </div>
                        </div>

                        {/* E-Mail */}
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0 hover:bg-slate-800 hover:scale-105 transition-all duration-300">
                                <span className="text-white text-xl">✉️</span>
                            </div>
                            <div className="text-left">
                                <h4 className="text-slate-900 text-lg font-medium mb-1 font-epilogue">E-Mail</h4>
                                <EmailLink
                                    source="contact_section_main"
                                    className="text-slate-900 text-lg font-medium hover:text-slate-600 transition-colors"
                                >
                                    joshua@alsen.info
                                </EmailLink>
                            </div>
                        </div>
                    </div>

                    {/* Beratungshinweis */}
                    <div className="bg-slate-50 p-6 rounded-lg mt-8">
                        <p className="text-slate-700 m-0 text-base">
                            <strong>Kostenlose telefonische Erstberatung (15 Min.)</strong> • Behandlung: 45-60 Min., 150€ • Krankenkassen-Erstattung möglich
                        </p>
                    </div>
                </div>

                {/* Praxisstandorte */}
                <div className="mb-16">
                    <h3 className="text-slate-900 text-3xl font-light text-center mb-12 font-epilogue tracking-tight">
                        Praxisstandorte & Anfahrt
                    </h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Praxis Rotherbaum */}
                        <div className="bg-white p-12 rounded-xl border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                            <div className="text-center mb-8">
                                <div className="w-20 h-20 bg-gradient-to-br from-slate-900 to-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl">
                                    📍
                                </div>
                                <h4 className="text-slate-900 text-xl font-medium font-epilogue">Praxis Rotherbaum</h4>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h5 className="text-slate-900 text-base font-medium mb-2 font-epilogue">Adresse</h5>
                                    <p className="text-slate-600 leading-relaxed">
                                        Rappstraße 7<br />
                                        20146 Hamburg
                                    </p>
                                </div>

                                <div>
                                    <h5 className="text-slate-900 text-base font-medium mb-2 font-epilogue">Sprechzeiten</h5>
                                    <div className="bg-slate-50 p-4 rounded-lg">
                                        <p className="text-slate-600 leading-relaxed text-sm">
                                            <strong>Montag:</strong> 09:00 - 14:00 Uhr<br />
                                            <strong>Mittwoch:</strong> 08:00 - 18:00 Uhr
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h5 className="text-slate-900 text-base font-medium mb-2 font-epilogue">Anfahrt</h5>
                                    <p className="text-slate-600 leading-relaxed text-sm">
                                        <strong>U-Bahn:</strong> U1 bis Hallerstraße (5 Min.)<br />
                                        <strong>Bus:</strong> Linien 4, 5, 15 bis Grindelhof<br />
                                        <strong>Parken:</strong> Begrenzte Straßenparkplätze
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Praxis Eimsbüttel */}
                        <div className="bg-white p-12 rounded-xl border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                            <div className="text-center mb-8">
                                <div className="w-20 h-20 bg-gradient-to-br from-slate-900 to-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl">
                                    📍
                                </div>
                                <h4 className="text-slate-900 text-xl font-medium font-epilogue">Praxis Eimsbüttel</h4>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h5 className="text-slate-900 text-base font-medium mb-2 font-epilogue">Adresse</h5>
                                    <p className="text-slate-600 leading-relaxed">
                                        Stresemannallee 118<br />
                                        22529 Hamburg
                                    </p>
                                </div>

                                <div>
                                    <h5 className="text-slate-900 text-base font-medium mb-2 font-epilogue">Sprechzeiten</h5>
                                    <div className="bg-slate-50 p-4 rounded-lg">
                                        <p className="text-slate-600 leading-relaxed text-sm">
                                            <strong>Dienstag:</strong> 09:00 - 14:00 Uhr<br />
                                            <strong>Donnerstag:</strong> 08:00 - 18:00 Uhr<br />
                                            <strong>Freitag:</strong> 09:00 - 14:00 Uhr
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h5 className="text-slate-900 text-base font-medium mb-2 font-epilogue">Anfahrt</h5>
                                    <p className="text-slate-600 leading-relaxed text-sm">
                                        <strong>U-Bahn:</strong> U2 bis Lutterothstraße (10 Min.)<br />
                                        <strong>Bus:</strong> Linie 181 bis Sorthmannweg<br />
                                        <strong>Parken:</strong> Begrenzte Straßenparkplätze, oder auf dem angrenzenden Aldi-Parkplatz mit Parkuhr 1,5 Stunden kostenfrei
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Google Maps */}
                <div className="mb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Praxis Rotherbaum Map */}
                        <div>
                            <h4 className="text-slate-900 text-lg font-medium mb-4 font-epilogue text-center">Praxis Rotherbaum</h4>
                            <div className="rounded-lg overflow-hidden shadow-md border border-slate-200">
                                <iframe
                                    src="https://www.google.com/maps?q=Rappstraße+7,+20146+Hamburg&output=embed"
                                    width="100%"
                                    height="300"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Praxis Rotherbaum - Rappstraße 7, 20146 Hamburg"
                                ></iframe>
                            </div>
                            <p className="text-slate-600 text-sm mt-3 text-center">
                                Rappstraße 7, 20146 Hamburg
                            </p>
                        </div>

                        {/* Praxis Eimsbüttel Map */}
                        <div>
                            <h4 className="text-slate-900 text-lg font-medium mb-4 font-epilogue text-center">Praxis Eimsbüttel</h4>
                            <div className="rounded-lg overflow-hidden shadow-md border border-slate-200">
                                <iframe
                                    src="https://www.google.com/maps?q=Stresemannallee+118,+22529+Hamburg&output=embed"
                                    width="100%"
                                    height="300"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Praxis Eimsbüttel - Stresemannallee 118, 22529 Hamburg"
                                ></iframe>
                            </div>
                            <p className="text-slate-600 text-sm mt-3 text-center">
                                Stresemannallee 118, 22529 Hamburg
                            </p>
                        </div>
                    </div>
                </div>

                {/* Persönliche Beratung CTA */}
                <div className="bg-gradient-to-br from-slate-50 to-white p-12 rounded-xl border border-slate-200 text-center">
                    <h3 className="text-slate-900 text-2xl font-medium mb-6 font-epilogue">Persönliche Beratung vereinbaren</h3>
                    <p className="text-lg leading-relaxed text-slate-700 mb-8 max-w-2xl mx-auto">
                        Jeder Patient ist einzigartig. Gerne nehme ich mir Zeit für ein ausführliches Erstgespräch, um Ihre individuellen Beschwerden zu verstehen und einen passenden Behandlungsplan zu entwickeln.
                    </p>

                    <div className="flex flex-wrap justify-center gap-6">
                        <PhoneLink
                            source="contact_section_cta"
                            className="inline-flex items-center bg-slate-900 text-white px-6 py-4 rounded-lg font-medium font-epilogue hover:bg-slate-800 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                        >
                            <span className="mr-2">📞</span>
                            Jetzt anrufen
                        </PhoneLink>
                        <EmailLink
                            source="contact_section_cta"
                            className="inline-flex items-center bg-transparent text-slate-900 px-6 py-4 border border-slate-900 rounded-lg font-medium font-epilogue hover:bg-slate-900 hover:text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                        >
                            <span className="mr-2">✉️</span>
                            E-Mail schreiben
                        </EmailLink>
                    </div>
                </div>
            </div>
        </section>
    );
}
