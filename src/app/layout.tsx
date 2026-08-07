import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { withBase } from "@/lib/basePath";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const lato = Lato({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thediago.com"),
  title: "DIAGO | Fine Gold × Natural Diamonds",
  description:
    "Redefining gold jewellery for the modern era — fine gold artistry paired with certified natural diamonds. Real Diamond, Real You.",
  openGraph: {
    type: "website",
    siteName: "DIAGO",
    title: "DIAGO | Fine Gold × Natural Diamonds",
    description:
      "Redefining gold jewellery for the modern era — fine gold artistry paired with certified natural diamonds. Real Diamond, Real You.",
    url: "https://thediago.com",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "DIAGO — Real Diamond, Real You",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DIAGO | Fine Gold × Natural Diamonds",
    description:
      "Redefining gold jewellery for the modern era — fine gold artistry paired with certified natural diamonds.",
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: [
      { url: withBase("/favicon.ico"), sizes: "any" },
      { url: withBase("/images/icon-192.png"), type: "image/png", sizes: "192x192" },
      { url: withBase("/images/icon-512.png"), type: "image/png", sizes: "512x512" },
    ],
    apple: withBase("/apple-icon.png"),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${cormorant.variable} ${lato.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-sans), sans-serif" }}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
