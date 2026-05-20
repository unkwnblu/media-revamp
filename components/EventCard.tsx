import Link from "next/link";
import Image from "next/image";
import { RiRepeatLine } from "react-icons/ri";

const gradients = [
  "gradient-1",
  "gradient-9",
  "gradient-3",
  "gradient-5",
  "gradient-7",
  "gradient-2",
];

interface DBEvent {
  id: string;
  title: string;
  tagline: string;
  slug: string;
  image: string;
  is_recurring: boolean;
}

export default function EventCard({ event, index = 0 }: { event: DBEvent; index?: number }) {
  const gradient = gradients[index % gradients.length];

  return (
    <Link
      href={`/events/${event.slug}`}
      className="group block relative aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-xl"
    >
      {/* Background: real image or gradient */}
      {event.image ? (
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        <div className={`absolute inset-0 ${gradient} transition-transform duration-700 group-hover:scale-105`} />
      )}

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition-all duration-500" />
      <div className="absolute inset-0 card-shimmer overflow-hidden" />

      {/* Recurring badge */}
      {event.is_recurring && (
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-[10px] tracking-widest text-white/60">
            <RiRepeatLine size={10} /> Recurring
          </span>
        </div>
      )}

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10 z-10">
        <span className="text-[10px] tracking-widest opacity-60 mb-2">{event.tagline}</span>
        <h3 className="font-heading font-black text-2xl md:text-3xl lg:text-4xl group-hover:translate-x-2 transition-transform duration-500">
          {event.title}
        </h3>
      </div>
    </Link>
  );
}
