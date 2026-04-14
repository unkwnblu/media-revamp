import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import HeroSection from "@/components/HeroSection";
import CTABanner from "@/components/CTABanner";
import EventsOverview from "./EventsOverview";

export const metadata: Metadata = createMetadata({
  title: "Our Events",
  description:
    "Discover A1 Media's signature events — Amapiano Left and Right and About The Hype.",
});

export default function EventsPage() {
  return (
    <>
      <HeroSection heading="Our Events" fullHeight={false} />
      <EventsOverview />
      <CTABanner
        heading="Let's Handle Your Next Project"
        buttonText="Get In Touch"
        buttonHref="/socials"
      />
    </>
  );
}
