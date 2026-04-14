import HeroSection from "@/components/HeroSection";
import CTABanner from "@/components/CTABanner";
import TestimonialsSection from "./TestimonialsSection";
import SocialsGrid from "./SocialsGrid";

export default function HomePage() {
  return (
    <>
      <HeroSection
        heading="We are an Entertainment company full of Art and Music Lovers. We are Dreamers of all kinds and Passionate about Creating the most Unique Experiences Ever."
        videoSrc="/intro.mp4"
        fullHeight
        showScrollIndicator
      />

      {/* What Sets Us Apart */}
      <TestimonialsSection />

      {/* Spot Us On Socials */}
      <SocialsGrid />

      {/* CTA */}
      <CTABanner
        heading="Hit Us Up"
        buttonText="DM A1"
        buttonHref="https://www.instagram.com/thea1media"
      />
    </>
  );
}
