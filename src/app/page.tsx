// Force dynamic rendering to avoid prerender errors
export const dynamic = 'force-dynamic';

import SiteHeader from "./(site)/components/SiteHeader";
import HeroSection from "./(site)/components/HeroSection";
import AboutOsteopathie from "./(site)/components/AboutOsteopathie";
import Treatments from "./(site)/components/Treatments";
import Applications from "./(site)/components/Applications";
import Reviews from "./(site)/components/Reviews";
import AboutMe from "./(site)/components/AboutMe";
import Qualifications from "./(site)/components/Qualifications";
import FAQ from "./(site)/components/FAQ";
import SiteFooter from "./(site)/components/SiteFooter";
import ContactSection from "./(site)/components/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="relative">
        <HeroSection />
        <AboutOsteopathie />
        <Treatments />
        <Applications />
        <Reviews />
        <AboutMe />
        <Qualifications />
        <FAQ />
        <ContactSection />

        {/* Blog Section */}
        <section className="bg-slate-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="bg-white p-12 rounded-xl border border-slate-200 shadow-sm text-center">
              <h3 className="text-slate-900 text-2xl font-medium mb-6 font-epilogue">
                Mehr über<br className="sm:hidden" /> Osteopathie erfahren
              </h3>
              <p className="text-lg leading-relaxed text-slate-700 mb-8 max-w-2xl mx-auto">
                Mehr über Osteopathie und ihre Anwendungsbereiche erfahren Sie in meinem Osteopathie Blog mit aktuellen Artikeln, Gesundheitstipps und Fachbeiträgen.
              </p>
              <a
                href="/blog"
                className="inline-flex items-center bg-slate-900 text-white px-6 py-4 rounded-lg font-epilogue font-medium hover:bg-slate-800 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <span className="mr-2">📖</span>
                Zum Osteopathie Blog
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
