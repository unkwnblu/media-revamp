"use client";

import Link from "next/link";
import Image from "next/image";
import { useInView } from "@/lib/useInView";

const mosaicImages = [
  "/images/about-1.jpeg",
  "/images/about-2.jpeg",
  "/images/about-3.jpeg",
  "/images/about-4.jpeg",
];

export default function AboutTeaser() {
  const { ref, inView } = useInView(0.15);

  return (
    <section className="py-32 md:py-40 px-6 md:px-10 relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-violet-950/50 to-pink-900/60 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />

      {/* Ambient orbs — much more vivid */}
      <div className="ambient-orb w-[800px] h-[800px] bg-purple-500 top-[-30%] left-[-20%] !opacity-25" style={{ animationDelay: "1s" }} />
      <div className="ambient-orb w-[600px] h-[600px] bg-pink-500 bottom-[-20%] right-[-15%] !opacity-20" style={{ animationDelay: "4s" }} />
      <div className="ambient-orb w-[450px] h-[450px] bg-violet-400 top-[20%] right-[15%] !opacity-15" style={{ animationDelay: "7s" }} />
      <div className="ambient-orb w-[300px] h-[300px] bg-rose-500 bottom-[10%] left-[20%] !opacity-12" style={{ animationDelay: "2s" }} />

      <div ref={ref} className="max-w-[1400px] mx-auto relative">
        {/* Section label */}
        <div
          className={`flex items-center gap-4 mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
          }`}
        >
          <span className="text-[10px] tracking-[0.4em] text-purple-400/60">01</span>
          <div className="w-8 h-[1px] bg-gradient-to-r from-purple-400/40 to-pink-400/40" />
          <span className="text-[10px] tracking-[0.4em] opacity-40">
            About Us
          </span>
        </div>

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">
          {/* Left — large statement */}
          <div className="lg:col-span-7">
            <h2
              className={`font-heading font-black text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] transition-all duration-700 delay-200 ${
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              Built on diversity.{" "}
              <span className="italic font-body font-medium bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Fueled by self-expression.
              </span>{" "}
              Creating safe and magical spaces.
            </h2>
          </div>

          {/* Right — body text */}
          <div className="lg:col-span-4 lg:col-start-9 flex flex-col justify-end">
            <div
              className={`transition-all duration-700 delay-400 ${
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <p className="text-lg leading-relaxed opacity-70 font-body font-medium normal-case mb-8">
                We respond to a calling to connect and form something bigger than
                ourselves. We are dreamers of all kinds, fueled by relentless positivity
                and the spirit of discovery.
              </p>
              <Link
                href="/who-we-are"
                className="group inline-flex items-center gap-3 text-xs tracking-widest"
              >
                <span className="opacity-60 group-hover:opacity-100 transition-opacity">
                  Learn More
                </span>
                <span className="w-8 h-[1px] bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-14 transition-all duration-300" />
              </Link>
            </div>
          </div>
        </div>

        {/* Visual photo mosaic */}
        <div
          className={`mt-16 md:mt-20 transition-all duration-1000 delay-500 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Mobile: 2-col simple grid */}
          <div className="grid grid-cols-2 gap-3 md:hidden">
            {mosaicImages.slice(0, 4).map((src, i) => (
              <div
                key={i}
                className="aspect-[4/3] rounded-xl overflow-hidden relative group"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
              </div>
            ))}
          </div>

          {/* Desktop: 4-col even grid */}
          <div className="hidden md:grid grid-cols-4 gap-3">
            {mosaicImages.map((src, i) => (
              <div
                key={i}
                className="aspect-[3/4] rounded-lg overflow-hidden relative group"
                style={{ transitionDelay: `${600 + i * 100}ms` }}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="25vw"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Decorative line */}
        <div className="mt-20">
          <div
            className={`h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent line-draw ${
              inView ? "in-view" : ""
            }`}
          />
        </div>
      </div>
    </section>
  );
}
