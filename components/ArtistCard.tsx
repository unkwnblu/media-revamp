import type { Artist } from "@/lib/data";

const gradients = [
  "from-pink-500 via-rose-500 to-orange-400",
  "from-violet-600 via-purple-500 to-blue-500",
  "from-purple-600 via-pink-600 to-rose-500",
  "from-amber-500 via-orange-500 to-red-500",
  "from-blue-500 via-cyan-500 to-teal-400",
  "from-emerald-500 via-green-400 to-cyan-400",
];

interface ArtistCardProps {
  artist: Artist;
  index?: number;
}

export default function ArtistCard({ artist, index = 0 }: ArtistCardProps) {
  const gradient = gradients[index % gradients.length];

  return (
    <div className="group relative aspect-[3/4] overflow-hidden rounded-xl cursor-pointer">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} transition-transform duration-700 group-hover:scale-105`}
      />
      <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-all duration-500" />
      <div className="absolute inset-0 card-shimmer overflow-hidden" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      {/* Always-visible name + genre */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
        <h3 className="font-heading font-black text-xl md:text-2xl group-hover:translate-x-1 transition-transform duration-500">
          {artist.name}
        </h3>
        <span className="text-[10px] tracking-widest opacity-50 mt-1 group-hover:opacity-80 transition-opacity duration-500">
          {artist.genre}
        </span>
      </div>
    </div>
  );
}
