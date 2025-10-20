import type { Metadata } from "next";
import { Epilogue, Instrument_Sans } from "next/font/google";
import "./globals.css";
import FloatingBookingButton from "@/components/FloatingBookingButton";
import ErrorBoundary from "@/components/ErrorBoundary";
import { LocalBusinessStructuredData, WebsiteStructuredData } from "@/components/StructuredData";
import Analytics from "@/components/Analytics";

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Osteopath Hamburg Rotherbaum & Eimsbüttel | Joshua Alsen | Heilpraktiker",
  description:
    "Osteopath Hamburg ✓ Joshua Alsen ✓ VFO-zertifiziert ✓ 2 Standorte: Rotherbaum & Eimsbüttel ✓ Termine oft binnen 48h ✓ Kassenzuschuss möglich ⭐ Jetzt Termin buchen!",
  keywords: [
    "Osteopath Hamburg",
    "Osteopathie Rotherbaum",
    "Osteopathie Eimsbüttel",
    "Heilpraktiker Hamburg",
    "Osteopath Hamburg Mitte",
    "VFO Osteopath",
    "Krankengymnastik Hamburg",
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
    title: "Osteopath Hamburg Rotherbaum & Eimsbüttel | Joshua Alsen",
    description:
      "Osteopath Hamburg ✓ Joshua Alsen ✓ VFO-zertifiziert ✓ 2 Standorte: Rotherbaum & Eimsbüttel ✓ Termine oft binnen 48h ✓ Kassenzuschuss möglich ⭐ Jetzt Termin buchen!",
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
    title: "Osteopath Hamburg | Joshua Alsen | Rotherbaum & Eimsbüttel",
    description: "Osteopath Hamburg ✓ VFO-zertifiziert ✓ 2 Standorte ✓ Termine binnen 48h ✓ Kassenzuschuss möglich ⭐ Jetzt buchen!",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#0f172a" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
      </head>
      <body className={`${epilogue.variable} ${instrumentSans.variable} antialiased`}>
        <Analytics />
        <ErrorBoundary>
          {children}
          <FloatingBookingButton />
        </ErrorBoundary>
      </body>
    </html>
  );
}
