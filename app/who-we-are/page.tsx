import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import HeroSection from "@/components/HeroSection";
import CTABanner from "@/components/CTABanner";
import WhoWeAreContent from "./WhoWeAreContent";

export const metadata: Metadata = createMetadata({
  title: "Who We Are",
  description:
    "A1 Media is built on the premise of diversity and inclusion. Fueled by self-expression and the spirit of discovery, we create safe and magical spaces for brands and audiences to connect.",
});

export default function WhoWeArePage() {
  return (
    <>
      <HeroSection heading="Get To Know Us" fullHeight={false} />

      <WhoWeAreContent />


      {/* Vision & Values */}
      <section className="py-24 md:py-32 px-6 md:px-10 relative overflow-hidden border-t border-white/[0.06]">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-950/10 via-transparent to-pink-950/10 pointer-events-none" />
        <div className="max-w-[1400px] mx-auto relative space-y-16">

          {/* Vision card */}
          <div className="relative p-8 md:p-12 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            <div className="w-10 h-1 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 mb-6" />
            <h2 className="font-heading font-black text-2xl md:text-4xl mb-5 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              Our Vision
            </h2>
            <p className="text-sm md:text-base leading-relaxed font-body font-medium opacity-70 normal-case max-w-2xl">
              To create a world-class, reliable working platform between brands
              and the public — rooted in a rich history and future-focused,
              led by principles that define our decisions and inspire us day after day.
            </p>
          </div>

          {/* Core Values */}
          <div>
            <div className="w-10 h-1 rounded-full bg-gradient-to-r from-pink-400 to-amber-400 mb-6" />
            <h2 className="font-heading font-black text-2xl md:text-4xl mb-10 bg-gradient-to-r from-pink-300 to-amber-300 bg-clip-text text-transparent">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { label: "Diligence",  desc: "We give every project the focus and care it deserves.",          gradient: "from-purple-500 to-blue-500" },
                { label: "Integrity",  desc: "We do the right thing, every time — no exceptions.",             gradient: "from-pink-500 to-rose-500" },
                { label: "Innovation", desc: "We push creative boundaries to deliver standout work.",           gradient: "from-amber-500 to-orange-500" },
                { label: "Passion",    desc: "We pour genuine love into everything we create.",                 gradient: "from-emerald-500 to-teal-500" },
                { label: "Teamwork",   desc: "We win together — collaboration is at our core.",                 gradient: "from-violet-500 to-purple-500" },
              ].map((value) => (
                <div
                  key={value.label}
                  className="group relative p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-8 h-1 rounded-full bg-gradient-to-r ${value.gradient} mb-4`} />
                  <h3 className={`font-heading font-black text-base mb-2 bg-gradient-to-r ${value.gradient} bg-clip-text text-transparent`}>
                    {value.label}
                  </h3>
                  <p className="text-xs leading-relaxed opacity-50 font-body normal-case">
                    {value.desc}
                  </p>
                </div>
              ))}
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
