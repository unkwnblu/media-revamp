"use client";

import { useInView } from "@/lib/useInView";

const stats = [
  { number: "20+",  label: "Artists Managed" },
  { number: "100+", label: "Brand Campaigns" },
  { number: "100+", label: "Events Managed" },
  { number: "100M+", label: "People Reached" },
];

export default function StatsBar() {
  const { ref, inView } = useInView(0.3);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-950/40 via-black to-pink-950/40" />
      <div className="absolute inset-0 border-y border-white-10" />
      <div
        ref={ref}
        className="relative max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4"
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`py-12 md:py-16 px-6 md:px-10 text-center border-b md:border-b-0 border-white-10 ${
              i < 3 ? "md:border-r" : ""
            } ${i < 2 ? "border-r" : ""} ${i >= 2 ? "md:border-r" : ""} counter-reveal ${
              inView ? "in-view" : ""
            }`}
            style={{ transitionDelay: `${i * 150}ms` }}
          >
            <span className="block font-heading font-black text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-purple-300 via-pink-300 to-amber-200 bg-clip-text text-transparent">
              {stat.number}
            </span>
            <span className="block mt-2 text-[10px] tracking-widest opacity-50">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
