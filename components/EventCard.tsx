import Link from "next/link";
import type { EventData } from "@/lib/data";

const eventGradients: Record<string, string> = {
  amlr: "gradient-1",
  "about-the-hype": "gradient-9",
};

interface EventCardProps {
  event: EventData;
}

export default function EventCard({ event }: EventCardProps) {
  const gradient = eventGradients[event.id] || "gradient-2";

  return (
    <Link
      href={`/events/${event.slug}`}
      className="group block relative aspect-[4/3] md:aspect-[16/9] overflow-hidden"
    >
      {/* Vibrant gradient background */}
      <div
        className={`absolute inset-0 ${gradient} transition-transform duration-700 group-hover:scale-105`}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition-all duration-500" />

      {/* Shimmer */}
      <div className="absolute inset-0 card-shimmer overflow-hidden" />

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10 z-10">
        <span className="text-[10px] tracking-widest opacity-60 mb-2">
          {event.tagline}
        </span>
        <h3 className="font-heading font-black text-2xl md:text-3xl lg:text-4xl group-hover:translate-x-2 transition-transform duration-500">
          {event.title}
        </h3>
      </div>
    </Link>
  );
}
