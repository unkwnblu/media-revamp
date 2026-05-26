import type { Metadata } from "next";

export const siteConfig = {
  name: "A1 Media",
  description:
    "A1 Media is an entertainment company full of Art & Music Lovers — Dreamers of all kinds, passionate about creating the most Unique Experiences Ever.",
  url: "https://thea1media.com",
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
};

export function createMetadata(page: {
  title: string;
  description?: string;
  image?: string;
  path?: string;
}): Metadata {
  const description = page.description ?? siteConfig.description;
  const url = page.path ? `${siteConfig.url}${page.path}` : siteConfig.url;

  return {
    title: page.title,
    description,
    keywords: siteConfig.keywords,
    openGraph: {
      title: `${page.title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      ...(page.image
        ? { images: [{ url: page.image, width: 1200, height: 630, alt: `${page.title} — ${siteConfig.name}` }] }
        : {}),
      type: "website",
      locale: "en_NG",
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.title} | ${siteConfig.name}`,
      description,
      ...(page.image ? { images: [page.image] } : {}),
    },
  };
}
