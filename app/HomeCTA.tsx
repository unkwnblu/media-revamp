"use client";

import Link from "next/link";
import { useInView } from "@/lib/useInView";

export default function HomeCTA() {
  const { ref, inView } = useInView(0.2);

  return (
    <section className="relative py-40 md:py-56 px-6 md:px-10 overflow-hidden">
      {/* Colorful background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 via-black to-pink-950/40" />

      {/* Ambient gradient orbs — more vivid */}
      <div className="ambient-orb w-[500px] h-[500px] bg-purple-500 top-[5%] right-[-5%] !opacity-15" style={{ animationDelay: "1s" }} />
      <div className="ambient-orb w-[400px] h-[400px] bg-pink-500 bottom-[5%] left-[-5%] !opacity-12" style={{ animationDelay: "4s" }} />
      <div className="ambient-orb w-[300px] h-[300px] bg-blue-400 top-[40%] left-[30%] !opacity-[0.08]" style={{ animationDelay: "6s" }} />

      {/* Background decorative circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-purple-400/[0.06] transition-all duration-[1.5s] ${
            inView ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
        />
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-pink-400/[0.08] transition-all duration-[1.5s] delay-200 ${
            inView ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
        />
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-purple-300/[0.1] transition-all duration-[1.5s] delay-400 ${
            inView ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
        />
      </div>

      <div ref={ref} className="max-w-[1400px] mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Eyebrow */}
          <span
            className={`inline-block text-[10px] tracking-[0.5em] text-purple-300/60 mb-8 transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Let&apos;s Work Together
          </span>

          {/* Main heading */}
          <h2
            className={`font-heading font-black text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Ready to create{" "}
            <span className="italic font-body font-medium bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
              something
            </span>{" "}
            extraordinary?
          </h2>

          {/* Subtitle */}
          <p
            className={`mt-8 text-sm md:text-base leading-relaxed opacity-60 font-body font-medium normal-case max-w-xl mx-auto transition-all duration-700 delay-400 ${
              inView ? "opacity-60 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Whether it&apos;s an event, a campaign, or a bold new idea — we
            bring the vision, the team, and the energy to make it happen.
          </p>

          {/* CTA button */}
          <div
            className={`mt-12 transition-all duration-700 delay-500 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Link
              href="/socials"
              className="group relative inline-flex items-center gap-4 border border-purple-400/30 px-10 py-5 text-xs tracking-[0.3em] hover:border-purple-400/60 transition-all duration-500 rounded-full"
            >
              <span className="relative z-10">Get In Touch</span>
              <span className="relative z-10 w-6 h-[1px] bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-10 transition-all duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 rounded-full" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
