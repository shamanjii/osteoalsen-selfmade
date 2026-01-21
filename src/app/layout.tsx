import type { Metadata } from "next";
import { Epilogue, Instrument_Sans } from "next/font/google";
import "./globals.css";
import VoiceflowChat from "@/components/VoiceflowChat";
import { LocalBusinessStructuredData, WebsiteStructuredData } from "@/components/StructuredData";

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Reduced from 6 to 3 weights (performance)
  display: "swap",
  preload: true, // Preload critical font
  fallback: ['system-ui', 'arial'], // Better fallback
  adjustFontFallback: true, // Reduce CLS
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"], // Reduced from 4 to 3 weights
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0f172a',
};

export const metadata: Metadata = {
  title: "Osteopathie Hamburg - Joshua Alsen | VFO-zertifiziert, B.Sc. ✓ Ganzheitliche Behandlung",
  description:
    "Osteopath Hamburg ⭐ Joshua Alsen, VFO-zertifiziert & B.Sc. Osteopathie ✓ Rückenschmerzen, Kopfschmerzen, Verdauung ganzheitlich behandeln ✓ Termine binnen 48h ✓ 2 Standorte: Rotherbaum & Eimsbüttel ✓ Kassenzuschuss möglich | Jetzt Termin buchen!",
  keywords: [
    "Osteopathie Hamburg",
    "Osteopath Hamburg",
    "hamburg osteopathie",
    "hamburg osteopath",
    "Osteopath Hamburg Mitte",
    "Osteopathie Rotherbaum",
    "Osteopathie Eimsbüttel",
    "Heilpraktiker Hamburg",
    "VFO Osteopath",
    "Rückenschmerzen Hamburg",
    "Kopfschmerzen Behandlung Hamburg"
  ],
  metadataBase: new URL("https://www.osteoalsen.de"),
  alternates: { canonical: "/" },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    type: "website",
    title: "Osteopathie Hamburg - Joshua Alsen | VFO-zertifiziert, B.Sc. ✓ Ganzheitliche Behandlung",
    description:
      "Osteopath Hamburg ⭐ Joshua Alsen, VFO-zertifiziert & B.Sc. Osteopathie ✓ Rückenschmerzen, Kopfschmerzen, Verdauung ganzheitlich behandeln ✓ Termine binnen 48h ✓ Kassenzuschuss möglich | Jetzt buchen!",
    url: "/",
    siteName: "Osteopathie Hamburg - Joshua Alsen",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Osteopathie Alsen - Heilpraxis Hamburg",
      }
    ],
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Osteopathie Hamburg - Joshua Alsen | VFO-zertifiziert, B.Sc.",
    description: "Osteopath Hamburg ⭐ Joshua Alsen, VFO-zertifiziert & B.Sc. Osteopathie ✓ Rückenschmerzen, Kopfschmerzen, Verdauung ganzheitlich behandeln ✓ Jetzt buchen!",
    images: ["/og-image.webp"],
    creator: "@osteoalsen",
    site: "@osteoalsen",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'nnIEz1Mhrb_3VZVExNAuTPU70zcLawqsWqvUyhjK3MM',
    other: {
      'msvalidate.01': 'B3E2129EE88056382284A0C41510D535',
    },
  },
};

// Never add head section here, to prevent hydration errors
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${epilogue.variable} ${instrumentSans.variable} antialiased`}>
        <WebsiteStructuredData />
        <LocalBusinessStructuredData
          name="Joshua Alsen - Osteopathie Hamburg"
          description="VFO-zertifizierter Osteopath und Heilpraktiker in Hamburg-Rotherbaum & Eimsbüttel. Ganzheitliche osteopathische Behandlung für Erwachsene und Kinder. Kassenerstattung möglich."
          url="https://www.osteoalsen.de"
          telephone="+4917643990001"
          email="joshua@alsen.info"
          address={{
            streetAddress: "Rappstraße 7",
            addressLocality: "Hamburg",
            postalCode: "20146",
            addressCountry: "DE"
          }}
          geo={{
            latitude: 53.5684,
            longitude: 9.9737
          }}
          openingHours={[
            "Monday 08:00 18:00",
            "Tuesday 08:00 18:00",
            "Wednesday 08:00 18:00",
            "Thursday 08:00 18:00",
            "Friday 08:00 16:00"
          ]}
          priceRange="€€"
        />
        {children}
        <VoiceflowChat />
      </body>
    </html>
  );
}
