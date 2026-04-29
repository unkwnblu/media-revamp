"use client";

import { useInView } from "@/lib/useInView";

const pillars = [
  { label: "Diversity", color: "from-purple-500 to-blue-500" },
  { label: "Inclusion", color: "from-pink-500 to-rose-500" },
  { label: "Passion", color: "from-amber-500 to-orange-500" },
  { label: "Discovery", color: "from-emerald-500 to-teal-500" },
];

export default function WhoWeAreContent() {
  const { ref, inView } = useInView(0.2);

  return (
    <section className="py-24 md:py-32 px-6 md:px-10 relative overflow-hidden border-t border-white/[0.06]">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/10 via-transparent to-transparent pointer-events-none" />

      <div ref={ref} className="max-w-[1400px] mx-auto relative">
        {/* Main statement */}
        <p
          className={`text-base md:text-lg lg:text-xl leading-relaxed font-body font-medium opacity-80 normal-case max-w-4xl mx-auto text-center transition-all duration-700 ${
            inView ? "opacity-80 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          We are specifically built on the premise of{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
            diversity and inclusion.
          </span>{" "}
          We&apos;re still building on that legacy and are always looking for new
          ways to do so. Fueled by self-expression and the spirit of discovery,
          we respond to a calling to connect and form something bigger than
          ourselves. We strive to create safe and magical spaces fueled by
          relentless positivity.
        </p>

        {/* Pillars */}
        <div
          className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 transition-all duration-700 delay-300 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {pillars.map((pillar, i) => (
            <div
              key={pillar.label}
              className="relative aspect-[3/2] rounded-xl overflow-hidden group"
              style={{ transitionDelay: `${400 + i * 80}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-80 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-heading font-black text-lg md:text-xl tracking-widest">
                  {pillar.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
