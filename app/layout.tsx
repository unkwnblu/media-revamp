import type { Metadata } from "next";
import { Nunito_Sans, Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["900"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thea1media.com"),
  title: {
    template: "%s | A1 Media",
    default: "A1 Media | Lagos Entertainment Agency",
  },
  description:
    "A1 Media is an entertainment company full of Art & Music Lovers — creating the most unique experiences ever. Artist bookings, content creation, live events & media relations in Lagos, Nigeria.",
  keywords: [
    "A1 Media",
    "Lagos Entertainment Agency",
    "Entertainment Company Nigeria",
    "Artist Bookings Lagos",
    "Content Creation",
    "Media Relations",
    "Social Media Campaigns",
    "Live Events Lagos",
    "Amapiano Left and Right",
    "About The Hype",
    "Music Events Nigeria",
    "Brand Activations Lagos",
  ],
  authors: [{ name: "A1 Media", url: "https://thea1media.com" }],
  creator: "A1 Media",
  publisher: "A1 Media",
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    title: "A1 Media | Lagos Entertainment Agency",
    description:
      "A1 Media is an entertainment company full of Art & Music Lovers — creating the most unique experiences ever. Artist bookings, content creation, live events & media relations.",
    url: "https://thea1media.com",
    siteName: "A1 Media",
    type: "website",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "A1 Media | Lagos Entertainment Agency",
    description:
      "A1 Media is an entertainment company full of Art & Music Lovers — creating the most unique experiences ever.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${nunitoSans.variable} ${nunito.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground font-body flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EntertainmentBusiness",
              name: "A1 Media",
              url: "https://thea1media.com",
              logo: "https://thea1media.com/logo.png",
              description:
                "A1 Media is an entertainment company full of Art & Music Lovers — creating the most unique experiences ever.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Lagos",
                addressCountry: "NG",
              },
              sameAs: [
                "https://www.instagram.com/thea1media",
                "https://www.instagram.com/amapianoleftandright",
              ],
              knowsAbout: [
                "Artist Bookings",
                "Content Creation",
                "Media Relations",
                "Social Media Campaigns",
                "Live Events",
                "Brand Activations",
              ],
            }),
          }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
