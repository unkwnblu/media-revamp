"use client";

import { artists } from "@/lib/data";
import ArtistCard from "@/components/ArtistCard";
import { useInView } from "@/lib/useInView";

export default function ArtistsGrid() {
  const { ref, inView } = useInView(0.1);

  return (
    <section className="py-24 md:py-32 px-6 md:px-10 border-t border-white-10">
      <div className="max-w-[1400px] mx-auto">
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children"
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
      </div>
    </section>
  );
}
