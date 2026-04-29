"use client";

import { useInView } from "@/lib/useInView";

interface HeroSectionProps {
  heading: string;
  subheading?: string;
  videoSrc?: string;
  fullHeight?: boolean;
  showScrollIndicator?: boolean;
}

export default function HeroSection({
  heading,
  subheading,
  videoSrc,
  fullHeight = true,
  showScrollIndicator = false,
}: HeroSectionProps) {
  const { ref, inView } = useInView<HTMLElement>(0.1);

  const words = heading.split(" ");

  return (
    <section
      ref={ref}
      className={`relative flex items-end overflow-hidden ${
        fullHeight ? "min-h-screen" : "min-h-[70vh]"
      }`}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/60 via-black to-pink-950/40" />

      {/* Video Background */}
      {videoSrc && (
        <>
          <video
            autoPlay
            muted
            loop
            playsInline
            src={videoSrc}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </>
      )}

      {/* Ambient gradient orbs */}
      <div className="ambient-orb w-[500px] h-[500px] bg-purple-500 top-[-15%] right-[-10%] !opacity-15" style={{ animationDelay: "0s" }} />
      <div className="ambient-orb w-[350px] h-[350px] bg-pink-500 bottom-[5%] left-[-5%] !opacity-10" style={{ animationDelay: "2s" }} />
      <div className="ambient-orb w-[250px] h-[250px] bg-blue-400 top-[40%] right-[30%] !opacity-[0.07]" style={{ animationDelay: "4s" }} />

      {/* Decorative corner elements */}
      <div className="absolute top-8 left-6 md:left-10 z-10">
        <div
          className={`transition-all duration-700 delay-500 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <div className="w-12 h-[1px] bg-gradient-to-r from-purple-400/50 to-transparent" />
          <div className="w-[1px] h-12 bg-gradient-to-b from-purple-400/50 to-transparent" />
        </div>
      </div>
      <div className="absolute top-8 right-6 md:right-10 z-10">
        <div
          className={`flex flex-col items-end transition-all duration-700 delay-500 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <div className="w-12 h-[1px] bg-gradient-to-l from-pink-400/50 to-transparent" />
          <div className="w-[1px] h-12 bg-gradient-to-b from-pink-400/50 to-transparent self-end" />
        </div>
      </div>

      {/* Large watermark letter */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none transition-all duration-[1.2s] ${
          inView ? "opacity-[0.04] scale-100" : "opacity-0 scale-90"
        }`}
      >
        <span className="font-heading font-black text-[30vw] leading-none">
          {words[0]?.[0] || "A"}
        </span>
      </div>

      {/* Content — bottom-aligned */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 pb-16 md:pb-24 pt-40">
        {/* Eyebrow label */}
        <div
          className={`flex items-center gap-4 mb-8 transition-all duration-700 ${
            inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
          }`}
        >
          <div className="w-8 h-[1px] bg-gradient-to-r from-purple-400/50 to-pink-400/50" />
          <span className="text-[10px] tracking-[0.4em] text-purple-300/60">
            A1 Media
          </span>
        </div>

        {/* Heading */}
        <h1
          className={`font-heading font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.95] tracking-tight max-w-4xl transition-all duration-700 delay-200 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {words.map((word, i) => (
            <span key={i} className="inline-block mr-[0.3em]">
              {i === 1 ? (
                <span className="italic font-body font-medium bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
                  {word}
                </span>
              ) : (
                word
              )}
            </span>
          ))}
        </h1>

        {/* Subheading */}
        {subheading && (
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <p
              className={`lg:col-span-5 lg:col-start-8 text-sm leading-relaxed opacity-60 font-body font-medium normal-case transition-all duration-700 delay-400 ${
                inView ? "opacity-60 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {subheading}
            </p>
          </div>
        )}

        {/* Bottom decorative line */}
        <div className="mt-12">
          <div
            className={`h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent line-draw ${
              inView ? "in-view" : ""
            }`}
          />
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-10">
          <span className="text-[10px] tracking-[0.3em] opacity-50">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-purple-400/60 to-transparent" />
        </div>
      )}
    </section>
  );
}
