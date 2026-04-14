import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import HeroSection from "@/components/HeroSection";
import CTABanner from "@/components/CTABanner";
import ServicesGrid from "./ServicesGrid";

export const metadata: Metadata = createMetadata({
  title: "What We Do",
  description:
    "From artist bookings to content creation — discover what A1 Media is good at.",
});

export default function WhatWeDoPage() {
  return (
    <>
      <HeroSection heading="What We Are Good At" fullHeight={false} />
      <ServicesGrid />
      <CTABanner
        heading="Let's Handle Your Next Project"
        buttonText="Get In Touch"
        buttonHref="/socials"
      />
    </>
  );
}
