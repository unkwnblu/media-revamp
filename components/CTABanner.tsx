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
    <section
      ref={ref}
      className="py-24 md:py-32 px-6 md:px-10 border-t border-white-10"
    >
      <div
        className={`max-w-[1400px] mx-auto text-center fade-in-up ${
          inView ? "in-view" : ""
        }`}
      >
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
