"use client";

import ArtistCard from "@/components/ArtistCard";
import { useInView } from "@/lib/useInView";

interface Artist {
  id: string;
  name: string;
  genre: string;
  image: string;
}

export default function ArtistsGrid({ artists }: { artists: Artist[] }) {
  const { ref, inView } = useInView(0.1);

  return (
    <section className="py-24 md:py-32 px-6 md:px-10 relative overflow-hidden border-t border-white/[0.06]">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/10 via-transparent to-pink-950/5 pointer-events-none" />
      <div className="max-w-[1400px] mx-auto relative">
        {/* Section label */}
        <div
          className={`flex items-center gap-4 mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
          }`}
        >
          <span className="text-[10px] tracking-[0.4em] text-purple-400/60">01</span>
          <div className="w-8 h-[1px] bg-gradient-to-r from-purple-400/40 to-pink-400/40" />
          <span className="text-[10px] tracking-[0.4em] opacity-40">The Artists</span>
        </div>

        {artists.length === 0 ? (
          <p className="text-white/30 text-sm">No artists yet. Check back soon.</p>
        ) : (
          <div
            ref={ref}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 stagger-children"
          >
            {artists.map((artist, i) => (
              <div
                key={artist.id}
                className={`fade-in-up ${inView ? "in-view" : ""}`}
              >
                <ArtistCard artist={artist} index={i} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
