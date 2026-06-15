import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});
const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mansaconquest.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mansa Conquest — Building Legacies Through Strategic Investments",
    template: "%s · Mansa Conquest",
  },
  description:
    "Mansa Conquest is a diversified venture capital and private investment fund inspired by Mansa Musa. We build enduring legacies through strategic investments across eight sectors, operating in Kenya and Australia.",
  keywords: [
    "Mansa Conquest", "venture capital", "private investment fund", "Kenya", "Australia",
    "real estate", "tech startups", "mining and exploration", "crypto", "manufacturing",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Mansa Conquest — Building Legacies Through Strategic Investments",
    description: "A diversified venture capital and private investment fund building enduring legacies across eight sectors.",
    siteName: "Mansa Conquest",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mansa Conquest — Building Legacies Through Strategic Investments",
    description: "A diversified venture capital and private investment fund building enduring legacies across eight sectors.",
  },
  robots: { index: true, follow: true },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "Mansa Conquest",
  description: "Diversified venture capital and private investment fund operating in Kenya and Australia.",
  url: siteUrl,
  email: "mansaconquest@gmail.com",
  areaServed: ["Kenya", "Australia"],
  slogan: "Building Legacies Through Strategic Investments",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
