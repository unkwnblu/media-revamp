import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import CTABanner from "@/components/CTABanner";
import ATHContent from "./ATHContent";

export const metadata: Metadata = createMetadata({
  title: "About The Hype",
  description:
    "About The Hype — where the energy is unmatched and the vibe is everything. Every Thursday at Chopilos.",
});

export default function AboutTheHypePage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white-10 to-transparent opacity-30" />
        <div className="relative z-10 text-center px-6 md:px-10 max-w-4xl mx-auto">
          <span className="text-[10px] tracking-[0.5em] opacity-50 block mb-6">
            A1 Media Presents
          </span>
          <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl lg:text-8xl tracking-tight">
            About The Hype
          </h1>
          <p className="mt-6 text-sm md:text-base opacity-60 tracking-widest">
            Gives Hype A Meaning
          </p>
        </div>
      </section>

      <ATHContent />

      <CTABanner
        heading="Book A Performance"
        buttonText="Call Us"
        buttonHref="tel:+2348168032026"
      />
    </>
  );
}
