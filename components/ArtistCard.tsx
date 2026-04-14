"use client";

import { forwardRef } from "react";
import type { Artist } from "@/lib/data";

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard = forwardRef<HTMLDivElement, ArtistCardProps>(
  function ArtistCard({ artist }, ref) {
    return (
      <div
        ref={ref}
        className="group relative aspect-[3/4] overflow-hidden bg-white-10 cursor-pointer"
      >
        {/* Placeholder gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white-20 to-transparent transition-transform duration-500 group-hover:scale-110" />

        {/* Name overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500 flex flex-col justify-end p-6">
          <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            <h3 className="font-heading font-black text-xl md:text-2xl">
              {artist.name}
            </h3>
            <span className="text-[10px] tracking-widest opacity-0 group-hover:opacity-60 transition-opacity duration-500 mt-1 block">
              {artist.genre}
            </span>
          </div>
        </div>
      </div>
    );
  }
);

export default ArtistCard;
