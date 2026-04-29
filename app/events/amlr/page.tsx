import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import CTABanner from "@/components/CTABanner";
import AMLRContent from "./AMLRContent";

export const metadata: Metadata = createMetadata({
  title: "Amapiano Left and Right",
  description:
    "Amapiano Left and Right is back with Back to the Groove — reconnect with the rhythm, the basslines, and the unmatched vibe.",
});

export default function AMLRPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 gradient-1 opacity-20" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="ambient-orb w-[500px] h-[500px] bg-purple-600 top-[-10%] right-[-10%]" style={{ animationDelay: "0s" }} />
        <div className="ambient-orb w-[400px] h-[400px] bg-blue-500 bottom-[-5%] left-[10%]" style={{ animationDelay: "3s" }} />
        <div className="relative z-10 text-center px-6 md:px-10 max-w-4xl mx-auto">
          <span className="text-[10px] tracking-[0.5em] opacity-50 block mb-6">
            A1 Media Presents
          </span>
          <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl lg:text-8xl tracking-tight">
            Amapiano Left and Right
          </h1>
          <p className="mt-6 text-sm md:text-base opacity-60 tracking-widest">
            Back to the Groove
          </p>
        </div>
      </section>

      <AMLRContent />

      <CTABanner
        heading="Join The Groove"
        buttonText="Follow on Instagram"
        buttonHref="https://www.instagram.com/amapianoleftandright"
      />
    </>
  );
}
