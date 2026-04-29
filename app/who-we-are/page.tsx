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
      <section className="py-24 md:py-32 px-6 md:px-10 relative overflow-hidden border-t border-white/[0.06]">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-950/10 via-transparent to-pink-950/10 pointer-events-none" />
        <div className="max-w-[1400px] mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <div className="relative p-8 md:p-10 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              <div className="w-10 h-1 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 mb-6" />
              <h2 className="font-heading font-black text-2xl md:text-4xl mb-6 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                Our Vision
              </h2>
              <p className="text-sm md:text-base leading-relaxed font-body font-medium opacity-70 normal-case">
                Our vision is to create a world-class, reliable working platform
                between brands and the public.
              </p>
            </div>
            <div className="relative p-8 md:p-10 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              <div className="w-10 h-1 rounded-full bg-gradient-to-r from-pink-400 to-amber-400 mb-6" />
              <h2 className="font-heading font-black text-2xl md:text-4xl mb-6 bg-gradient-to-r from-pink-300 to-amber-300 bg-clip-text text-transparent">
                Our Values
              </h2>
              <p className="text-sm md:text-base leading-relaxed font-body font-medium opacity-70 normal-case">
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
