"use client";

import Link from "next/link";
import { useInView } from "@/lib/useInView";

interface CTABannerProps {
  heading: string;
  buttonText: string;
  buttonHref: string;
}

export default function CTABanner({
  heading,
  buttonText,
  buttonHref,
}: CTABannerProps) {
  const { ref, inView } = useInView(0.2);

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-10 overflow-hidden border-t border-white/[0.06]">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/30 via-black to-pink-950/20 pointer-events-none" />
      <div className="ambient-orb w-[400px] h-[400px] bg-purple-500 top-[-20%] right-[10%] !opacity-[0.08]" style={{ animationDelay: "1s" }} />
      <div className="ambient-orb w-[300px] h-[300px] bg-pink-500 bottom-[-10%] left-[5%] !opacity-[0.06]" style={{ animationDelay: "3s" }} />

      <div
        ref={ref}
        className={`max-w-[1400px] mx-auto text-center relative z-10 fade-in-up ${
          inView ? "in-view" : ""
        }`}
      >
        <h2 className="font-heading font-black text-3xl md:text-5xl lg:text-6xl tracking-tight">
          {heading.split(" ").map((word, i, arr) =>
            i === Math.floor(arr.length / 2) ? (
              <span key={i} className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
                {word}{" "}
              </span>
            ) : (
              <span key={i}>{word} </span>
            )
          )}
        </h2>
        <Link
          href={buttonHref}
          className="inline-flex items-center gap-4 mt-10 px-10 py-4 border border-purple-400/30 text-sm tracking-widest rounded-full hover:border-purple-400/60 hover:bg-white/5 transition-all duration-300"
        >
          {buttonText}
          <span className="w-6 h-[1px] bg-gradient-to-r from-purple-400 to-pink-400" />
        </Link>
      </div>
    </section>
  );
}
