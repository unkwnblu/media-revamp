"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { fadeInUp } from "@/lib/animations";

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
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tween = fadeInUp(sectionRef.current);
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-10 border-t border-white-10"
    >
      <div className="max-w-[1400px] mx-auto text-center">
        <h2 className="font-heading font-black text-3xl md:text-5xl lg:text-6xl tracking-tight">
          {heading}
        </h2>
        <Link
          href={buttonHref}
          className="inline-block mt-8 px-10 py-4 border border-white text-sm tracking-widest hover:bg-white hover:text-black transition-all duration-300"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
