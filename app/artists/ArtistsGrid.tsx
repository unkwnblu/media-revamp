"use client";

import { useRef, useEffect } from "react";
import { artists } from "@/lib/data";
import ArtistCard from "@/components/ArtistCard";
import { staggerFadeIn } from "@/lib/animations";

export default function ArtistsGrid() {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    const tween = staggerFadeIn(cards, 0.1);
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section className="py-24 md:py-32 px-6 md:px-10 border-t border-white-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artists.map((artist, i) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
