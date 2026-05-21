"use client";

import Image from "next/image";
import { useInView } from "@/lib/useInView";

const pillars = [
  { label: "Diversity",  color: "from-purple-600/80 to-blue-600/80",   image: "/images/IMG_1129.jpg" },
  { label: "Inclusion",  color: "from-pink-600/80 to-rose-600/80",     image: "/images/IMG_1172.jpg" },
  { label: "Passion",    color: "from-amber-600/80 to-orange-600/80",  image: "/images/IMG_1077.jpg" },
  { label: "Discovery",  color: "from-emerald-600/80 to-teal-600/80",  image: "/images/IMG_1121.jpg" },
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
              {/* Photo */}
              <Image
                src={pillar.image}
                alt={pillar.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {/* Coloured gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} transition-opacity duration-500 group-hover:opacity-70`} />
              {/* Dark vignette so text stays readable */}
              <div className="absolute inset-0 bg-black/30" />
              {/* Label */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-heading font-black text-lg md:text-xl tracking-widest drop-shadow-lg">
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
