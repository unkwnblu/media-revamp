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
    "A1 Media is an Entertainment company full of Art and Music Lovers.",
  keywords: ["Music Lovers", "A1 Media", "Top Entertainment", "Social Gathering"],
  openGraph: {
    title: "A1 Media | Lagos Entertainment Agency",
    description:
      "A1 Media is an Entertainment company full of Art and Music Lovers.",
    url: "https://thea1media.com",
    siteName: "A1 Media",
    images: [{ url: "/logo.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "A1 Media | Lagos Entertainment Agency",
    description:
      "A1 Media is an Entertainment company full of Art and Music Lovers.",
    images: ["/logo.png"],
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
      className={`${nunitoSans.variable} ${nunito.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground font-body flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
