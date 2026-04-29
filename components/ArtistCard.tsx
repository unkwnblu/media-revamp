import type { Artist } from "@/lib/data";

const gradients = [
  "gradient-5",
  "gradient-7",
  "gradient-1",
  "gradient-9",
  "gradient-6",
  "gradient-3",
];

interface ArtistCardProps {
  artist: Artist;
  index?: number;
}

export default function ArtistCard({ artist, index = 0 }: ArtistCardProps) {
  const gradient = gradients[index % gradients.length];

  return (
    <div className="group relative aspect-[3/4] overflow-hidden cursor-pointer">
      {/* Vibrant gradient background */}
      <div
        className={`absolute inset-0 ${gradient} transition-transform duration-700 group-hover:scale-110`}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-500" />

      {/* Shimmer */}
      <div className="absolute inset-0 card-shimmer overflow-hidden" />

      {/* Name overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
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
