import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import HeroSection from "@/components/HeroSection";
import CTABanner from "@/components/CTABanner";
import ArtistsGrid from "./ArtistsGrid";

export const metadata: Metadata = createMetadata({
  title: "Our Artists",
  description:
    "These are some Amazing Acts we work with currently. Discover the talent behind A1 Media.",
});

export default function ArtistsPage() {
  return (
    <>
      <HeroSection
        heading="Music Collabs"
        subheading="These are some Amazing Acts we work with currently."
        fullHeight={false}
      />
      <ArtistsGrid />
      <CTABanner
        heading="Let's Handle Your Next Project"
        buttonText="Get In Touch"
        buttonHref="/socials"
      />
    </>
  );
}
