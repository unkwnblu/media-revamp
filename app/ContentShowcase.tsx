"use client";

import { useInView } from "@/lib/useInView";

const showcaseItems = [
  { gradient: "from-purple-600 via-pink-500 to-rose-500", span: "col-span-2 row-span-2", label: "Live Events" },
  { gradient: "from-blue-500 via-cyan-400 to-teal-400", span: "col-span-1 row-span-1", label: "Backstage" },
  { gradient: "from-amber-500 via-orange-500 to-red-500", span: "col-span-1 row-span-1", label: "Studio" },
  { gradient: "from-emerald-500 via-green-400 to-cyan-400", span: "col-span-1 row-span-2", label: "Campaigns" },
  { gradient: "from-violet-600 via-purple-500 to-blue-500", span: "col-span-1 row-span-1", label: "Music Videos" },
  { gradient: "from-rose-500 via-pink-500 to-fuchsia-500", span: "col-span-2 row-span-1", label: "Brand Activations" },
];

export default function ContentShowcase() {
  const { ref, inView } = useInView(0.1);

  return (
    <section className="py-32 md:py-40 px-6 md:px-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent pointer-events-none" />

      <div ref={ref} className="max-w-[1400px] mx-auto relative">
        {/* Section label */}
        <div className="flex items-center justify-between mb-16">
          <div
            className={`flex items-center gap-4 transition-all duration-700 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
            }`}
          >
            <span className="text-[10px] tracking-[0.4em] text-purple-400/60">05</span>
            <div className="w-8 h-[1px] bg-gradient-to-r from-purple-400/40 to-pink-400/40" />
            <span className="text-[10px] tracking-[0.4em] opacity-40">
              Gallery
            </span>
          </div>
        </div>

        {/* Mosaic grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[200px] gap-3">
          {showcaseItems.map((item, i) => (
            <div
              key={i}
              className={`${item.span} group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-700 ${
                inView ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-transform duration-700 group-hover:scale-110`} />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />

              {/* Play button for video feel */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/50 to-transparent">
                <span className="text-[10px] md:text-xs tracking-widest font-heading font-bold opacity-80 group-hover:opacity-100 transition-opacity">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
