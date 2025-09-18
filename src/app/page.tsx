import SiteHeader from "./(site)/components/SiteHeader";
import HeroSection from "./(site)/components/HeroSection";
import AboutOsteopathie from "./(site)/components/AboutOsteopathie";
import Treatments from "./(site)/components/Treatments";
import Applications from "./(site)/components/Applications";
import Reviews from "./(site)/components/Reviews";
import AboutMe from "./(site)/components/AboutMe";
import SiteFooter from "./(site)/components/SiteFooter";
import ContactSection from "./(site)/components/ContactSection";

export default function Home() {
  return (
    <div>
      <SiteHeader />
      <main>
        <HeroSection />
        <AboutOsteopathie />
        <Treatments />
        <Applications />
        <Reviews />
        <AboutMe />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
