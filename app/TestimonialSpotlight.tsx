"use client";

import { useState } from "react";
import { useInView } from "@/lib/useInView";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string | null;
}

export default function TestimonialSpotlight({ testimonials }: { testimonials: Testimonial[] }) {
  const [active, setActive] = useState(0);
  const { ref, inView } = useInView(0.2);

  if (testimonials.length === 0) return null;

  const current = testimonials[Math.min(active, testimonials.length - 1)];

  return (
    <section className="pt-20 pb-12 md:pt-28 md:pb-16 px-6 md:px-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/20 via-transparent to-pink-950/20 pointer-events-none" />
      <div className="ambient-orb w-[400px] h-[400px] bg-purple-600 top-[10%] right-[10%] !opacity-[0.06]" style={{ animationDelay: "2s" }} />

      <div ref={ref} className="max-w-[1400px] mx-auto relative">
        {/* Section label */}
        <div className={`flex items-center gap-4 mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}>
          <span className="text-[10px] tracking-[0.4em] text-purple-400/60">03</span>
          <div className="w-8 h-[1px] bg-gradient-to-r from-purple-400/40 to-pink-400/40" />
          <span className="text-[10px] tracking-[0.4em] opacity-40">What They Say</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Large quote */}
          <div className={`lg:col-span-8 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="block font-heading font-black text-6xl md:text-8xl leading-none mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent opacity-30">
              &ldquo;
            </span>
            <p className="text-xl md:text-2xl lg:text-3xl font-body font-medium leading-relaxed normal-case -mt-8">
              {current.quote}
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-10 h-[1px] bg-gradient-to-r from-purple-400 to-pink-400" />
              <div>
                <span className="text-xs tracking-widest text-purple-300/80">{current.author}</span>
                {current.role && (
                  <span className="text-xs text-white/30 ml-2">· {current.role}</span>
                )}
              </div>
            </div>
          </div>

          {/* Navigation dots + names */}
          {testimonials.length > 1 && (
            <div className={`lg:col-span-3 lg:col-start-10 flex lg:flex-col justify-start gap-6 transition-all duration-700 delay-400 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setActive(i)}
                  className={`group flex items-center gap-3 text-left transition-all duration-300 ${i === active ? "opacity-100" : "opacity-30 hover:opacity-60"}`}
                >
                  <span className={`block w-2 h-2 rounded-full transition-all duration-300 ${i === active ? "bg-gradient-to-r from-purple-400 to-pink-400 scale-100" : "bg-white/40 scale-75"}`} />
                  <span className="text-[10px] tracking-widest hidden lg:block">{t.author}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
