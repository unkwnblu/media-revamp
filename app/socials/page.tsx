import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import HeroSection from "@/components/HeroSection";
import SocialsContent from "./SocialsContent";

export const metadata: Metadata = createMetadata({
  title: "Socials",
  description:
    "Connect with A1 Media on Instagram, X, and Facebook. Email: A1@TheA1media.com",
});

export default function SocialsPage() {
  return (
    <>
      <HeroSection heading="Our Socials" fullHeight={false} />
      <SocialsContent />
    </>
  );
}
