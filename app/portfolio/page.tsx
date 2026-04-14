import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import HeroSection from "@/components/HeroSection";
import CTABanner from "@/components/CTABanner";
import ProjectsGrid from "./ProjectsGrid";

export const metadata: Metadata = createMetadata({
  title: "Our Portfolio",
  description:
    "We are proud to have supported some of the world's most renowned artists with a growing number of successful projects.",
});

export default function PortfolioPage() {
  return (
    <>
      <HeroSection
        heading="Projects"
        subheading="We are proud to have supported some of the world's most renowned artists with a growing number of successful projects."
        fullHeight={false}
      />
      <ProjectsGrid />
      <CTABanner
        heading="Let's Handle Your Next Project"
        buttonText="Get In Touch"
        buttonHref="/socials"
      />
    </>
  );
}
