"use client";

import { useInView } from "@/lib/useInView";

export default function HomeHero() {
  const { ref, inView } = useInView<HTMLElement>(0.1);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-pink-900" />
      <div className="absolute inset-0 hero-gradient-shift" />

      {/* Video bg */}
      <video
        autoPlay
        muted
        loop
        playsInline
        src="/intro.mp4"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Ambient gradient orbs — more vivid */}
      <div className="ambient-orb w-[600px] h-[600px] bg-purple-500 top-[-15%] right-[-10%] !opacity-15" style={{ animationDelay: "0s" }} />
      <div className="ambient-orb w-[500px] h-[500px] bg-blue-400 bottom-[-10%] left-[-10%] !opacity-12" style={{ animationDelay: "3s" }} />
      <div className="ambient-orb w-[400px] h-[400px] bg-pink-500 top-[20%] left-[50%] !opacity-15" style={{ animationDelay: "5s" }} />
      <div className="ambient-orb w-[300px] h-[300px] bg-amber-400 bottom-[20%] right-[20%] !opacity-10" style={{ animationDelay: "7s" }} />

      {/* Giant A1 watermark */}
      <div
        className={`absolute inset-0 flex items-center justify-center pointer-events-none select-none transition-all duration-[2s] ease-out ${
          inView ? "opacity-[0.04]" : "opacity-0"
        }`}
      >
        <span className="font-heading font-black text-[40vw] leading-none tracking-tighter">
          A1
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        {/* Eyebrow */}
        <div
          className={`flex items-center gap-4 mb-8 transition-all duration-700 delay-200 ${
            inView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <div className="w-12 h-[1px] bg-gradient-to-r from-purple-400 to-pink-400" />
          <span className="text-[10px] tracking-[0.4em] text-purple-300/70">
            Lagos, Nigeria
          </span>
        </div>

        {/* Main heading */}
        <h1 className="font-heading font-black leading-[0.95] tracking-tight">
          <span
            className={`block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl transition-all duration-700 delay-300 ${
              inView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            We Create
          </span>
          <span
            className={`block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl transition-all duration-700 delay-500 ${
              inView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <span className="italic font-body font-medium bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
              Unique
            </span>{" "}
            Experiences
          </span>
        </h1>

        {/* Subtext + CTA row */}
        <div
          className={`mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8 transition-all duration-700 delay-700 ${
            inView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <p className="max-w-md text-sm leading-relaxed opacity-70 font-body font-bold normal-case">
            We are an Entertainment company full of Art & Music Lovers. We are Dreamers of all kinds and Passionate about Creating the most Unique Experiences Ever. 
          </p>
          <a
            href="/portfolio"
            className="shrink-0 group flex items-center gap-3 text-xs tracking-widest"
          >
            <span className="opacity-70 group-hover:opacity-100 transition-opacity">
              View Our Work
            </span>
            <span className="w-8 h-[1px] bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-12 transition-all duration-300" />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-purple-400 to-pink-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
