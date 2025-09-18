import type { Metadata } from "next";
import { Epilogue, Instrument_Sans } from "next/font/google";
import "./globals.css";

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
  title: "Osteopathie Hamburg – Joshua Alsen",
  description:
    "Osteopathie in Hamburg-Rotherbaum & Eimsbüttel. Behandlung 45–60 Min., 150 €. Kostenerstattung möglich.",
  metadataBase: new URL("https://www.osteoalsen.de"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Osteopathie Hamburg – Joshua Alsen",
    description:
      "Osteopathie in Hamburg-Rotherbaum & Eimsbüttel. Behandlung 45–60 Min., 150 €. Kostenerstattung möglich.",
    url: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${epilogue.variable} ${instrumentSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
