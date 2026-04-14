"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split heading into words for stagger animation
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll(".word");
        if (words.length > 0) {
          gsap.fromTo(
            words,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.04,
              ease: "power3.out",
              delay: 0.3,
            }
          );
        } else {
          gsap.fromTo(
            headingRef.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.3 }
          );
        }
      }

      if (subRef.current) {
        gsap.fromTo(
          subRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.8 }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Split heading text into words wrapped in spans
  const renderHeading = (text: string) => {
    return text.split(" ").map((word, i) => (
      <span key={i} className="word inline-block opacity-0 mr-[0.3em]">
        {word}
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
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
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60" />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 text-center py-32">
        <h1
          ref={headingRef}
          className="font-heading font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] tracking-tight"
        >
          {renderHeading(heading)}
        </h1>

        {subheading && (
          <p
            ref={subRef}
            className="mt-8 text-sm md:text-base lg:text-lg text-white-80 max-w-3xl mx-auto leading-relaxed font-body font-medium opacity-0"
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
