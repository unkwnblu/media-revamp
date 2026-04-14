import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import HeroSection from "@/components/HeroSection";
import CTABanner from "@/components/CTABanner";
import ImageGallery from "@/components/ImageGallery";
import WhoWeAreContent from "./WhoWeAreContent";

export const metadata: Metadata = createMetadata({
  title: "Who We Are",
  description:
    "Get to know A1 Media — built on the premise of diversity and inclusion, fueled by self-expression and the spirit of discovery.",
});

const galleryImages = Array.from({ length: 8 }, (_, i) => ({
  src: `/images/gallery/gallery-${i + 1}.jpg`,
  alt: `A1 Media Team ${i + 1}`,
}));

export default function WhoWeArePage() {
  return (
    <>
      <HeroSection heading="Get To Know Us" fullHeight={false} />

      <WhoWeAreContent />

      <ImageGallery images={galleryImages} />

      {/* Vision & Values */}
      <section className="py-24 md:py-32 px-6 md:px-10 border-t border-white-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <div>
              <h2 className="font-heading font-black text-2xl md:text-4xl mb-6">
                Our Vision
              </h2>
              <p className="text-sm md:text-base leading-relaxed font-body font-medium opacity-80 normal-case">
                Our vision is to create a world-class, reliable working platform
                between brands and the public.
              </p>
            </div>
            <div>
              <h2 className="font-heading font-black text-2xl md:text-4xl mb-6">
                Our Values
              </h2>
              <p className="text-sm md:text-base leading-relaxed font-body font-medium opacity-80 normal-case">
                Our core values are diligence, integrity, innovation, passion,
                and teamwork.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        heading="Let's Handle Your Next Project"
        buttonText="Get In Touch"
        buttonHref="/socials"
      />
    </>
  );
}
