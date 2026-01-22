import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSchema from "@/components/FAQSchema";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import SiteHeader from "@/app/(site)/components/SiteHeader";
import SiteFooter from "@/app/(site)/components/SiteFooter";

export const metadata: Metadata = {
  title: "Osteopath Hamburg | Joshua Alsen – VFO-zertifiziert, Termine in 24-48h",
  description:
    "Osteopath in Hamburg-Rotherbaum ✓ VFO-zertifiziert ✓ B.Sc. Osteopathie ✓ Termine kurzfristig verfügbar ✓ Krankenkassen-Erstattung möglich. Jetzt online buchen!",
  keywords: [
    "Osteopath Hamburg",
    "Osteopathie Hamburg",
    "Osteopath in Hamburg",
    "Osteopathen Hamburg",
    "Osteopath Hamburg Rotherbaum",
    "Osteopathie Praxis Hamburg",
    "Heilpraktiker Osteopathie Hamburg",
    "VFO Osteopath Hamburg",
    "Osteopath in der Nähe",
    "bester Osteopath Hamburg",
  ],
  alternates: { canonical: "/osteopath-hamburg/" },
  openGraph: {
    title: "Osteopath Hamburg | Joshua Alsen – Termine in 24-48h",
    description:
      "Osteopath in Hamburg-Rotherbaum ✓ VFO-zertifiziert ✓ B.Sc. Osteopathie ✓ Krankenkassen-Erstattung möglich. Jetzt Termin buchen!",
    url: "/osteopath-hamburg/",
    siteName: "Osteopathie Hamburg - Joshua Alsen",
    images: [
      {
        url: "/assets/joshua-alsen-profil.jpg",
        width: 1200,
        height: 630,
        alt: "Joshua Alsen - Osteopath in Hamburg",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Osteopath Hamburg | Joshua Alsen – VFO-zertifiziert",
    description:
      "Osteopath in Hamburg ✓ VFO-zertifiziert ✓ Termine in 24-48h ✓ Krankenkassen-Erstattung möglich",
    images: ["/assets/joshua-alsen-profil.jpg"],
  },
};

export default function OsteopathHamburgPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <LocalBusinessSchema />
        <FAQSchema
          faqs={[
            {
              question: "Was kostet eine Behandlung beim Osteopathen in Hamburg?",
              answer:
                "Eine osteopathische Behandlung (45-60 Minuten) kostet 150€. Viele gesetzliche und private Krankenkassen erstatten einen Teil der Kosten – oft 3-6 Sitzungen pro Jahr.",
            },
            {
              question: "Brauche ich eine Überweisung zum Osteopathen?",
              answer:
                "Nein, Sie können direkt einen Termin buchen. Für eine Kostenerstattung durch die Krankenkasse benötigen Sie jedoch oft ein Privatrezept vom Arzt.",
            },
            {
              question: "Wie schnell bekomme ich einen Termin?",
              answer:
                "In der Regel sind Termine innerhalb von 24-48 Stunden verfügbar. Bei akuten Beschwerden versuche ich, kurzfristig einen Termin zu ermöglichen.",
            },
            {
              question: "Was ist der Unterschied zwischen Osteopathie und Physiotherapie?",
              answer:
                "Osteopathie betrachtet den Körper ganzheitlich und sucht nach der Ursache von Beschwerden – auch in entfernten Körperregionen. Physiotherapie fokussiert sich meist auf die betroffene Region mit gezielten Übungen.",
            },
            {
              question: "Welche Beschwerden behandelt ein Osteopath?",
              answer:
                "Häufige Behandlungsgründe sind Rückenschmerzen, Nackenschmerzen, Kopfschmerzen, Gelenkbeschwerden, Verdauungsprobleme und Beschwerden nach Unfällen oder Operationen.",
            },
          ]}
        />
        <Breadcrumbs items={[{ label: "Osteopath Hamburg" }]} />

        {/* Hero Section - Trust + CTA above the fold */}
        <section className="bg-gradient-to-b from-slate-50 to-white py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Content */}
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 font-epilogue leading-tight">
                  Osteopath in Hamburg
                </h1>

                {/* Trust Badges - Above the fold */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium border border-emerald-200">
                    ✓ VFO-zertifiziert
                  </span>
                  <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 px-4 py-2 rounded-full text-sm font-medium border border-blue-200">
                    ✓ B.Sc. Osteopathie
                  </span>
                  <span className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 px-4 py-2 rounded-full text-sm font-medium border border-amber-200">
                    ✓ Kassenzuschuss möglich
                  </span>
                </div>

                <p className="text-xl text-slate-600 leading-relaxed mb-8">
                  Joshua Alsen – Ihr Osteopath in Hamburg-Rotherbaum.
                  Ganzheitliche Behandlung bei Rücken-, Nacken- und Kopfschmerzen,
                  Gelenkbeschwerden und mehr. Termine kurzfristig verfügbar.
                </p>

                {/* Primary CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link
                    href="/terminbuchung/"
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 hover:transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                  >
                    Jetzt Termin buchen
                  </Link>
                  <a
                    href="tel:+4917643990001"
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold border-2 border-slate-900 text-slate-900 rounded-lg hover:bg-slate-900 hover:text-white transition-all duration-300"
                  >
                    📞 0176 4399 0001
                  </a>
                </div>

                {/* Quick Facts */}
                <div className="flex flex-wrap gap-6 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600">●</span>
                    <span>Termine in 24-48h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600">●</span>
                    <span>Online-Buchung</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600">●</span>
                    <span>Hamburg-Rotherbaum</span>
                  </div>
                </div>
              </div>

              {/* Right: Image + Location */}
              <div className="relative">
                <div className="bg-slate-100 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/assets/joshua-alsen-profil.jpg"
                    alt="Joshua Alsen - Osteopath in Hamburg"
                    width={600}
                    height={600}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
                {/* Location Badge */}
                <div className="absolute -bottom-4 left-4 right-4 bg-white rounded-xl shadow-lg p-4 border border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">📍</div>
                    <div>
                      <p className="font-semibold text-slate-900">Praxis Hamburg-Rotherbaum</p>
                      <p className="text-slate-600 text-sm">Rappstraße 7, 20146 Hamburg</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="bg-slate-900 py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="text-white">
                <div className="text-2xl font-bold font-epilogue">VFO</div>
                <div className="text-slate-400 text-sm">Zertifiziert</div>
              </div>
              <div className="text-white">
                <div className="text-2xl font-bold font-epilogue">5.000+</div>
                <div className="text-slate-400 text-sm">Ausbildungsstunden</div>
              </div>
              <div className="text-white">
                <div className="text-2xl font-bold font-epilogue">B.Sc.</div>
                <div className="text-slate-400 text-sm">Osteopathie</div>
              </div>
              <div className="text-white">
                <div className="text-2xl font-bold font-epilogue">24-48h</div>
                <div className="text-slate-400 text-sm">Terminverfügbarkeit</div>
              </div>
            </div>
          </div>
        </section>

        {/* Behandlungsschwerpunkte - mit direkten Links */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-epilogue mb-4">
                Wobei kann ich Ihnen helfen?
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Klicken Sie auf Ihre Beschwerden für mehr Informationen – oder buchen Sie direkt einen Termin.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link
                href="/behandlungen/rueckenschmerzen/"
                className="group bg-white border-2 border-slate-200 rounded-xl p-6 hover:border-slate-900 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl mb-4">🦴</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue group-hover:text-slate-700">
                  Rückenschmerzen
                </h3>
                <p className="text-slate-600 mb-4">
                  Hexenschuss, Bandscheiben, ISG-Blockaden, chronische Schmerzen
                </p>
                <span className="text-slate-900 font-medium group-hover:underline">
                  Mehr erfahren →
                </span>
              </Link>

              <Link
                href="/behandlungen/nackenschmerzen/"
                className="group bg-white border-2 border-slate-200 rounded-xl p-6 hover:border-slate-900 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl mb-4">🔄</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue group-hover:text-slate-700">
                  Nackenschmerzen
                </h3>
                <p className="text-slate-600 mb-4">
                  HWS-Syndrom, Verspannungen, Schwindel, steifer Nacken
                </p>
                <span className="text-slate-900 font-medium group-hover:underline">
                  Mehr erfahren →
                </span>
              </Link>

              <Link
                href="/behandlungen/kopfschmerzen-migraene/"
                className="group bg-white border-2 border-slate-200 rounded-xl p-6 hover:border-slate-900 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue group-hover:text-slate-700">
                  Kopfschmerzen & Migräne
                </h3>
                <p className="text-slate-600 mb-4">
                  Spannungskopfschmerz, Migräne, Trigeminus-Reizung
                </p>
                <span className="text-slate-900 font-medium group-hover:underline">
                  Mehr erfahren →
                </span>
              </Link>

              <Link
                href="/behandlungen/arthrose-gelenkbeschwerden/"
                className="group bg-white border-2 border-slate-200 rounded-xl p-6 hover:border-slate-900 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl mb-4">🦵</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue group-hover:text-slate-700">
                  Gelenkbeschwerden
                </h3>
                <p className="text-slate-600 mb-4">
                  Knie, Hüfte, Schulter, Arthrose, Bewegungseinschränkung
                </p>
                <span className="text-slate-900 font-medium group-hover:underline">
                  Mehr erfahren →
                </span>
              </Link>

              <Link
                href="/behandlungen/verdauungsbeschwerden/"
                className="group bg-white border-2 border-slate-200 rounded-xl p-6 hover:border-slate-900 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl mb-4">🫁</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue group-hover:text-slate-700">
                  Verdauungsbeschwerden
                </h3>
                <p className="text-slate-600 mb-4">
                  Reizdarm, Blähungen, Sodbrennen, Darm-Rücken-Zusammenhang
                </p>
                <span className="text-slate-900 font-medium group-hover:underline">
                  Mehr erfahren →
                </span>
              </Link>

              <Link
                href="/behandlungen/sportosteopathie/"
                className="group bg-white border-2 border-slate-200 rounded-xl p-6 hover:border-slate-900 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl mb-4">⚽</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue group-hover:text-slate-700">
                  Sportosteopathie
                </h3>
                <p className="text-slate-600 mb-4">
                  Sportverletzungen, Leistungsoptimierung, Regeneration
                </p>
                <span className="text-slate-900 font-medium group-hover:underline">
                  Mehr erfahren →
                </span>
              </Link>
            </div>

            {/* CTA nach Behandlungen */}
            <div className="text-center mt-12">
              <p className="text-lg text-slate-600 mb-4">
                Nicht sicher, ob Osteopathie bei Ihren Beschwerden helfen kann?
              </p>
              <Link
                href="/terminbuchung/"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-all duration-300"
              >
                Termin vereinbaren & besprechen
              </Link>
            </div>
          </div>
        </section>

        {/* Über mich - Kurz */}
        <section className="py-16 sm:py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-epilogue mb-6">
                  Ihr Osteopath in Hamburg: Joshua Alsen
                </h2>
                <div className="space-y-4 text-lg text-slate-700">
                  <p>
                    Als VFO-zertifizierter Osteopath mit über 5.000 Ausbildungsstunden
                    und B.Sc. in Osteopathie behandle ich Sie ganzheitlich –
                    ich suche nach der Ursache Ihrer Beschwerden, nicht nur nach Symptomen.
                  </p>
                  <p>
                    Meine Praxis befindet sich zentral in Hamburg-Rotherbaum,
                    gut erreichbar mit öffentlichen Verkehrsmitteln und mit
                    Parkmöglichkeiten in der Nähe.
                  </p>
                </div>

                {/* Qualifikationen */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-slate-200">
                    <Image
                      src="/assets/vfo-logo.jpeg"
                      alt="VFO Logo"
                      width={60}
                      height={60}
                      className="mb-2"
                    />
                    <p className="text-sm text-slate-600">Verband Freier Osteopathen</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-slate-200">
                    <Image
                      src="/assets/osd-logo.webp"
                      alt="OSD Logo"
                      width={60}
                      height={60}
                      className="mb-2"
                    />
                    <p className="text-sm text-slate-600">Osteopathie Schule Deutschland</p>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    href="/ueber-mich/"
                    className="text-slate-900 font-medium hover:underline"
                  >
                    Mehr über mich erfahren →
                  </Link>
                </div>
              </div>

              {/* Standort + Karte */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4 font-epilogue">
                    Praxis in Hamburg-Rotherbaum
                  </h3>
                  <div className="space-y-4 text-slate-700">
                    <div>
                      <strong className="text-slate-900">Adresse:</strong><br />
                      Rappstraße 7<br />
                      20146 Hamburg-Rotherbaum
                    </div>
                    <div>
                      <strong className="text-slate-900">Öffnungszeiten:</strong><br />
                      Mo-Fr nach Vereinbarung<br />
                      Termine in 24-48h verfügbar
                    </div>
                    <div>
                      <strong className="text-slate-900">Anfahrt:</strong><br />
                      U-Bahn Hallerstraße (5 Min. Fußweg)<br />
                      Parkmöglichkeiten vorhanden
                    </div>
                  </div>
                </div>

                {/* Google Maps */}
                <div className="bg-slate-100 rounded-xl overflow-hidden h-64">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2369.8!2d9.9837!3d53.5714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b18f5a8a8a8a8a%3A0x8a8a8a8a8a8a8a8a!2sRappstra%C3%9Fe%207%2C%2020146%20Hamburg!5e0!3m2!1sde!2sde!4v1234567890"
                    className="w-full h-full"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Osteopath Hamburg - Standort Rotherbaum"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ablauf einer Behandlung */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center font-epilogue mb-12">
              So läuft Ihre Behandlung ab
            </h2>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                    Anamnese (15 Min)
                  </h3>
                  <p className="text-slate-600">
                    Wir besprechen Ihre Beschwerden, Vorgeschichte und Ziele.
                    Je mehr ich verstehe, desto gezielter kann ich behandeln.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                    Untersuchung (15 Min)
                  </h3>
                  <p className="text-slate-600">
                    Mit den Händen untersuche ich Beweglichkeit, Spannung und
                    Gewebeveränderungen – oft an Stellen, die Sie selbst
                    nicht mit Ihren Beschwerden verbinden würden.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                    Behandlung (25-30 Min)
                  </h3>
                  <p className="text-slate-600">
                    Sanfte manuelle Techniken lösen Blockaden und Verspannungen.
                    Die Behandlung ist in der Regel schmerzfrei.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 font-epilogue">
                    Empfehlungen
                  </h3>
                  <p className="text-slate-600">
                    Sie erhalten individuelle Tipps für den Alltag und
                    bei Bedarf Übungen für zu Hause.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link
                href="/kosten-ablauf/"
                className="text-slate-900 font-medium hover:underline"
              >
                Mehr zu Kosten & Ablauf →
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 sm:py-20 bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center font-epilogue mb-12">
              Häufige Fragen
            </h2>

            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                  Was kostet eine Behandlung beim Osteopathen in Hamburg?
                </h3>
                <p className="text-slate-600">
                  Eine osteopathische Behandlung (45-60 Minuten) kostet 150€.
                  Viele gesetzliche und private Krankenkassen erstatten einen Teil
                  der Kosten – oft 3-6 Sitzungen pro Jahr.{" "}
                  <Link href="/kosten-ablauf/" className="text-blue-600 hover:underline">
                    Mehr zu Kosten & Erstattung
                  </Link>
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                  Brauche ich eine Überweisung zum Osteopathen?
                </h3>
                <p className="text-slate-600">
                  Nein, Sie können direkt einen Termin buchen. Für eine
                  Kostenerstattung durch die Krankenkasse benötigen Sie jedoch
                  oft ein Privatrezept vom Arzt.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                  Wie schnell bekomme ich einen Termin?
                </h3>
                <p className="text-slate-600">
                  In der Regel sind Termine innerhalb von 24-48 Stunden verfügbar.
                  Bei akuten Beschwerden versuche ich, kurzfristig einen Termin zu ermöglichen.{" "}
                  <Link href="/terminbuchung/" className="text-blue-600 hover:underline">
                    Jetzt Termin buchen
                  </Link>
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                  Was ist der Unterschied zwischen Osteopathie und Physiotherapie?
                </h3>
                <p className="text-slate-600">
                  Osteopathie betrachtet den Körper ganzheitlich und sucht nach
                  der Ursache von Beschwerden – auch in entfernten Körperregionen.
                  Physiotherapie fokussiert sich meist auf die betroffene Region
                  mit gezielten Übungen.{" "}
                  <Link href="/was-ist-osteopathie/" className="text-blue-600 hover:underline">
                    Was ist Osteopathie?
                  </Link>
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-2 font-epilogue">
                  Welche Beschwerden behandelt ein Osteopath?
                </h3>
                <p className="text-slate-600">
                  Häufige Behandlungsgründe sind{" "}
                  <Link href="/behandlungen/rueckenschmerzen/" className="text-blue-600 hover:underline">
                    Rückenschmerzen
                  </Link>,{" "}
                  <Link href="/behandlungen/nackenschmerzen/" className="text-blue-600 hover:underline">
                    Nackenschmerzen
                  </Link>,{" "}
                  <Link href="/behandlungen/kopfschmerzen-migraene/" className="text-blue-600 hover:underline">
                    Kopfschmerzen
                  </Link>,{" "}
                  <Link href="/behandlungen/arthrose-gelenkbeschwerden/" className="text-blue-600 hover:underline">
                    Gelenkbeschwerden
                  </Link> und{" "}
                  <Link href="/behandlungen/verdauungsbeschwerden/" className="text-blue-600 hover:underline">
                    Verdauungsprobleme
                  </Link>.
                </p>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link
                href="/faq/"
                className="text-slate-900 font-medium hover:underline"
              >
                Alle häufigen Fragen →
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 sm:py-20 bg-white px-4 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 sm:p-12 text-center text-white shadow-xl">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-epilogue">
                Bereit für Ihre Behandlung?
              </h2>
              <p className="text-xl mb-8 text-slate-200">
                Termine in Hamburg-Rotherbaum kurzfristig verfügbar.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/terminbuchung/"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-slate-900 bg-white rounded-lg hover:shadow-lg hover:transform hover:-translate-y-1 transition-all duration-300"
                >
                  Jetzt Termin buchen
                </Link>
                <a
                  href="tel:+4917643990001"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold border-2 border-white text-white rounded-lg hover:bg-white hover:text-slate-900 transition-all duration-300"
                >
                  📞 0176 4399 0001
                </a>
              </div>
              <p className="text-sm text-slate-400 mt-6">
                Rappstraße 7, 20146 Hamburg-Rotherbaum
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
