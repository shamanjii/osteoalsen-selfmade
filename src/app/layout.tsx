import type { Metadata } from "next";
import { Epilogue, Instrument_Sans } from "next/font/google";
import "./globals.css";
import FloatingBookingButton from "@/components/FloatingBookingButton";
import ErrorBoundary from "@/components/ErrorBoundary";
import { LocalBusinessStructuredData, WebsiteStructuredData } from "@/components/StructuredData";
import GlobalErrorHandler from "@/components/GlobalErrorHandler";
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
    "Osteopathie Hamburg: Heilpraktiker Joshua Alsen behandelt in Rotherbaum & Eimsbüttel. Termine verfügbar. 45-60 Min., 150€. Kostenerstattung durch Krankenkassen möglich. VFO-zertifiziert.",
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
  openGraph: {
    type: "website",
    title: "Osteopath Hamburg Rotherbaum & Eimsbüttel | Joshua Alsen",
    description:
      "Osteopathie Hamburg: Heilpraktiker Joshua Alsen behandelt in Rotherbaum & Eimsbüttel. Termine verfügbar. 45-60 Min., 150€. Kostenerstattung durch Krankenkassen möglich.",
    url: "/",
    siteName: "Osteopathie Hamburg - Joshua Alsen",
    images: [
      {
        url: "/assets/joshua-alsen-osteopath-hamburg-og.webp",
        width: 1200,
        height: 630,
        alt: "Joshua Alsen - Osteopath und Heilpraktiker in Hamburg Rotherbaum & Eimsbüttel",
      }
    ],
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Osteopath Hamburg | Joshua Alsen | Rotherbaum & Eimsbüttel",
    description: "Osteopathie Hamburg: Heilpraktiker Joshua Alsen. Termine verfügbar. 150€, Kassenerstattung möglich.",
    images: ["/assets/joshua-alsen-osteopath-hamburg-twitter.webp"],
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
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    other: {
      bing: 'your-bing-verification-code',
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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#0f172a" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <WebsiteStructuredData />
        <LocalBusinessStructuredData
          name="Joshua Alsen - Osteopathie Hamburg"
          description="VFO-zertifizierter Osteopath und Heilpraktiker in Hamburg-Rotherbaum & Eimsbüttel. Ganzheitliche osteopathische Behandlung für Erwachsene und Kinder. Kassenerstattung möglich."
          url="https://www.osteoalsen.de"
          telephone="+49 40 12345678"
          email="info@osteoalsen.de"
          address={{
            streetAddress: "Eppendorfer Weg 123",
            addressLocality: "Hamburg",
            postalCode: "20259",
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
        <GlobalErrorHandler />
        <ErrorBoundary>
          {children}
          <FloatingBookingButton />
        </ErrorBoundary>
      </body>
    </html>
  );
}
