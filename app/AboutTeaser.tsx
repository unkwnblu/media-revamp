"use client";

import Link from "next/link";
import { useInView } from "@/lib/useInView";

export default function AboutTeaser() {
  const { ref, inView } = useInView(0.15);

  return (
    <section className="py-32 md:py-40 px-6 md:px-10 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent pointer-events-none" />

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
              <p className="text-sm leading-relaxed opacity-70 font-body font-medium normal-case mb-8">
                We respond to a calling to connect and form something bigger than
                ourselves — dreamers of all kinds, fueled by relentless positivity
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
            {[
              { gradient: "from-purple-600 to-blue-600", aspect: "aspect-[4/3]" },
              { gradient: "from-pink-500 to-rose-600", aspect: "aspect-[4/3]" },
              { gradient: "from-amber-500 to-orange-600", aspect: "aspect-[4/3]" },
              { gradient: "from-emerald-500 to-teal-500", aspect: "aspect-[4/3]" },
            ].map((item, i) => (
              <div
                key={i}
                className={`${item.aspect} rounded-xl overflow-hidden relative group`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />
                <div className="absolute inset-0 bg-black/10" />
              </div>
            ))}
          </div>

          {/* Desktop: 6-col asymmetric grid */}
          <div className="hidden md:grid grid-cols-6 gap-3">
            {[
              { gradient: "from-purple-600 to-blue-600", aspect: "aspect-[3/4]" },
              { gradient: "from-pink-500 to-rose-600", aspect: "aspect-square" },
              { gradient: "from-amber-500 to-orange-600", aspect: "aspect-[3/4]" },
              { gradient: "from-blue-500 to-cyan-500", aspect: "aspect-square" },
              { gradient: "from-emerald-500 to-teal-500", aspect: "aspect-[3/4]" },
              { gradient: "from-violet-500 to-purple-600", aspect: "aspect-square" },
            ].map((item, i) => (
              <div
                key={i}
                className={`${item.aspect} rounded-lg overflow-hidden relative group`}
                style={{ transitionDelay: `${600 + i * 100}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-transform duration-700 group-hover:scale-110`} />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
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
