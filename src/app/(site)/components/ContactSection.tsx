export default function ContactSection() {
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
                                <a href="tel:+4917643990001" className="text-slate-900 text-lg font-medium hover:text-slate-600 transition-colors">
                                    0176 4399 0001
                                </a>
                            </div>
                        </div>

                        {/* Online Terminbuchung */}
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0 hover:bg-slate-800 hover:scale-105 transition-all duration-300">
                                <span className="text-white text-xl">📅</span>
                            </div>
                            <div className="text-left">
                                <h4 className="text-slate-900 text-lg font-medium mb-1 font-epilogue">Online Buchung</h4>
                                <a href="/terminbuchung" className="text-slate-900 text-lg font-medium hover:text-slate-600 transition-colors">
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
                                <a href="mailto:joshua@alsen.info" className="text-slate-900 text-lg font-medium hover:text-slate-600 transition-colors">
                                    joshua@alsen.info
                                </a>
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
                        Praxisstandorte
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

                {/* Kontaktformular & Service-Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Kontaktformular */}
                    <div className="contact-form">
                        <h3 className="text-slate-900 text-2xl font-medium mb-8 text-center font-epilogue">Nachricht senden</h3>

                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Name <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">E-Mail <span className="text-red-500">*</span></label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">Telefon</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Nachricht <span className="text-red-500">*</span></label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    placeholder="Beschreiben Sie bitte Ihre Beschwerden oder Ihr Anliegen..."
                                    required
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-slate-900 text-white py-3 px-6 rounded-lg font-epilogue font-medium hover:bg-slate-800 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                            >
                                Nachricht senden
                            </button>
                        </form>
                    </div>

                    {/* Service-Übersicht & Anfahrt */}
                    <div className="space-y-8">
                        {/* Service-Übersicht */}
                        <div className="bg-slate-50 p-10 rounded-lg border border-slate-200">
                            <h4 className="text-slate-900 text-xl font-medium mb-6 font-epilogue">Leistungen im Überblick</h4>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0 hover:bg-slate-800 hover:scale-105 transition-all duration-300">
                                        <span className="text-white text-base">📞</span>
                                    </div>
                                    <div>
                                        <p className="text-slate-900 font-medium text-sm font-epilogue">Kostenlose Erstberatung</p>
                                        <p className="text-slate-600 text-xs">15 Minuten telefonisch</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0 hover:bg-slate-800 hover:scale-105 transition-all duration-300">
                                        <span className="text-white text-base">🩺</span>
                                    </div>
                                    <div>
                                        <p className="text-slate-900 font-medium text-sm font-epilogue">Osteopathische Behandlung</p>
                                        <p className="text-slate-600 text-xs">45-60 Minuten, 150€</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0 hover:bg-slate-800 hover:scale-105 transition-all duration-300">
                                        <span className="text-white text-base">💰</span>
                                    </div>
                                    <div>
                                        <p className="text-slate-900 font-medium text-sm font-epilogue">Krankenkassen-Erstattung</p>
                                        <p className="text-slate-600 text-xs">Bei den meisten Kassen möglich</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Barrierefreiheit */}
                        <div className="bg-white p-8 rounded-lg border border-slate-200">
                            <h5 className="text-slate-900 text-base font-medium mb-3 flex items-center font-epilogue">
                                <span className="mr-2">♿</span>
                                Barrierefreiheit
                            </h5>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                Bei Fragen zur Barrierefreiheit kontaktieren Sie mich gerne vorab.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Google Maps Placeholder */}
                <div className="mb-16">
                    <h3 className="text-slate-900 text-2xl font-light mb-8 text-center font-epilogue">Lage & Anfahrt</h3>

                    <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg h-96 flex items-center justify-center">
                        <div className="text-center text-slate-600">
                            <div className="text-5xl mb-4">🗺️</div>
                            <h4 className="text-slate-900 text-xl font-medium mb-2 font-epilogue">Google Maps Integration</h4>
                            <p className="text-base">
                                Hier wird die interaktive Karte eingebunden<br />
                                <strong>Rappstraße 7, 20146 Hamburg</strong>
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
                        <a
                            href="tel:+4917643990001"
                            className="inline-flex items-center bg-slate-900 text-white px-6 py-4 rounded-lg font-medium font-epilogue hover:bg-slate-800 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                        >
                            <span className="mr-2">📞</span>
                            Jetzt anrufen
                        </a>
                        <a
                            href="mailto:joshua@alsen.info"
                            className="inline-flex items-center bg-transparent text-slate-900 px-6 py-4 border border-slate-900 rounded-lg font-medium font-epilogue hover:bg-slate-900 hover:text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                        >
                            <span className="mr-2">✉️</span>
                            E-Mail schreiben
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
