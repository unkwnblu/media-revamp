import type { Metadata } from "next";

const siteConfig = {
  name: "A1 Media",
  description:
    "A1 Media is an entertainment company full of Art & Music Lovers — Dreamers of all kinds, passionate about creating the most Unique Experiences Ever.",
  url: "https://thea1media.com",
  ogImage: "/logo.png",
  keywords: [
    "A1 Media",
    "Entertainment Company",
    "Artist Bookings",
    "Content Creation",
    "Media Relations",
    "Social Media Campaigns",
    "Live Events",
    "Nigeria",
  ],
};

export function createMetadata(page: {
  title: string;
  description?: string;
  image?: string;
}): Metadata {
  const description = page.description ?? siteConfig.description;
  const image = page.image ?? siteConfig.ogImage;

  return {
    title: page.title,
    description,
    keywords: siteConfig.keywords,
    openGraph: {
      title: `${page.title} | ${siteConfig.name}`,
      description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [{ url: image }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.title} | ${siteConfig.name}`,
      description,
      images: [image],
    },
  };
}
