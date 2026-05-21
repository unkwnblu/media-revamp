"use client";

import Link from "next/link";
import { useInView } from "@/lib/useInView";

const cardGradients = [
  "from-purple-600 via-pink-600 to-rose-500",
  "from-blue-500 via-cyan-500 to-emerald-400",
  "from-amber-500 via-orange-500 to-red-500",
];

interface Project {
  id: string;
  title: string;
  category: string | null;
  year: string | null;
  image: string | null;
}

export default function FeaturedWork({ projects }: { projects: Project[] }) {
  const { ref, inView } = useInView(0.1);
  const featured = projects.slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <section id="work" className="py-32 md:py-40 px-6 md:px-10 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent pointer-events-none" />

      <div ref={ref} className="max-w-[1400px] mx-auto relative">
        {/* Section label */}
        <div className="flex items-center justify-between mb-16">
          <div
            className={`flex items-center gap-4 transition-all duration-700 ${
              inView
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-4"
            }`}
          >
            <span className="text-[10px] tracking-[0.4em] text-purple-400/60">
              02
            </span>
            <div className="w-8 h-[1px] bg-gradient-to-r from-purple-400/40 to-pink-400/40" />
            <span className="text-[10px] tracking-[0.4em] opacity-40">
              Selected Work
            </span>
          </div>
          <Link
            href="/portfolio"
            className={`group inline-flex items-center gap-3 text-xs tracking-widest transition-all duration-700 delay-200 ${
              inView ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="opacity-60 group-hover:opacity-100 transition-opacity">
              View All
            </span>
            <span className="w-8 h-[1px] bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-14 transition-all duration-300" />
          </Link>
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
          {/* Large featured project — full width on mobile, left half on desktop */}
          <Link
            href={`/portfolio/${featured[0].id}`}
            className={`col-span-2 lg:col-span-1 group relative aspect-[4/3] sm:aspect-[3/2] lg:aspect-auto overflow-hidden rounded-xl transition-all duration-700 delay-200 ${
              inView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${cardGradients[0]} transition-transform duration-700 group-hover:scale-105`} />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-500" />
            <div className="absolute inset-0 card-shimmer overflow-hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-10">
              <span className="text-[10px] tracking-widest opacity-60 block mb-2 text-purple-200">
                {featured[0].category}
              </span>
              <h3 className="font-heading font-black text-lg sm:text-2xl md:text-3xl lg:text-4xl group-hover:translate-x-2 transition-transform duration-500">
                {featured[0].title}
              </h3>
              <span className="block mt-2 text-[10px] tracking-widest opacity-40">
                {featured[0].year}
              </span>
            </div>
          </Link>

          {/* Two side-by-side on mobile, stacked on desktop */}
          <div className="col-span-2 lg:col-span-1 grid grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 gap-4">
            {featured.slice(1, 3).map((project, i) => (
              <Link
                key={project.id}
                href={`/portfolio/${project.id}`}
                className={`group relative aspect-square sm:aspect-[4/3] lg:aspect-[16/9] overflow-hidden rounded-xl transition-all duration-700 ${
                  inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${(i + 2) * 150}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cardGradients[i + 1]} transition-transform duration-700 group-hover:scale-105`} />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-500" />
                <div className="absolute inset-0 card-shimmer overflow-hidden" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
                  <span className="text-[10px] tracking-widest opacity-60 block mb-1 text-purple-200">
                    {project.category}
                  </span>
                  <h3 className="font-heading font-black text-sm sm:text-xl md:text-2xl group-hover:translate-x-2 transition-transform duration-500 leading-tight">
                    {project.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
