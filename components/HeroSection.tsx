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

  const renderHeading = (text: string) => {
    return text.split(" ").map((word, i) => (
      <span key={i} className="word inline-block mr-[0.3em]">
        {word}
      </span>
    ));
  };

  return (
    <section
      ref={ref}
      className={`relative flex items-center justify-center overflow-hidden ${
        fullHeight ? "min-h-screen" : "min-h-[60vh]"
      }`}
    >
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
          <div className="absolute inset-0 bg-black/60" />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 text-center py-32">
        <h1
          className={`font-heading font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] tracking-tight word-reveal ${
            inView ? "in-view" : ""
          }`}
        >
          {renderHeading(heading)}
        </h1>

        {subheading && (
          <p
            className={`mt-8 text-sm md:text-base lg:text-lg text-white-80 max-w-3xl mx-auto leading-relaxed font-body font-medium fade-in-up ${
              inView ? "in-view" : ""
            }`}
            style={{ transitionDelay: "800ms" }}
          >
            {subheading}
          </p>
        )}
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[10px] tracking-[0.3em] opacity-50">
            Scroll
          </span>
          <div className="w-[1px] h-8 bg-white/30" />
        </div>
      )}
    </section>
  );
}
