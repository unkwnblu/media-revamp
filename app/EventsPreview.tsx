"use client";

import Link from "next/link";
import Image from "next/image";
import { useInView } from "@/lib/useInView";

const eventGradients = [
  "from-violet-600 via-purple-600 to-blue-600",
  "from-rose-600 via-pink-600 to-orange-500",
];

interface Event {
  id: string;
  slug: string;
  title: string;
  tagline: string | null;
  description: string | null;
  image: string | null;
}

export default function EventsPreview({ events }: { events: Event[] }) {
  const { ref, inView } = useInView(0.15);

  if (events.length === 0) return null;

  return (
    <section className="pt-12 pb-20 md:pt-16 md:pb-28 px-6 md:px-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-purple-950/10 via-transparent to-transparent pointer-events-none" />

      <div ref={ref} className="max-w-[1400px] mx-auto relative">
        {/* Section label */}
        <div
          className={`flex items-center gap-4 mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
          }`}
        >
          <span className="text-[10px] tracking-[0.4em] text-purple-400/60">04</span>
          <div className="w-8 h-[1px] bg-gradient-to-r from-purple-400/40 to-pink-400/40" />
          <span className="text-[10px] tracking-[0.4em] opacity-40">
            Our Events
          </span>
        </div>

        {/* Two event cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((event, i) => (
            <Link
              key={event.id}
              href={`/events/${event.slug}`}
              className={`group relative aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-xl transition-all duration-700 ${
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${(i + 1) * 200}ms` }}
            >
              {/* Background — real image or gradient fallback */}
              {event.image ? (
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${eventGradients[i % eventGradients.length]} transition-transform duration-700 group-hover:scale-110`} />
              )}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-all duration-500 z-[1]" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/70 z-[2]" />

              {/* Top — tagline */}
              <div className="absolute top-0 left-0 right-0 p-8 z-10">
                <span className="text-[10px] tracking-[0.3em] opacity-70 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                  {event.tagline}
                </span>
              </div>

              {/* Bottom — title + description */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 z-10">
                <h3 className="font-heading font-black text-2xl md:text-3xl lg:text-4xl leading-tight group-hover:translate-x-2 transition-transform duration-500">
                  {event.title}
                </h3>
                <p className="mt-4 text-xs leading-relaxed opacity-70 font-body font-medium normal-case line-clamp-2 max-w-[90%]">
                  {event.description}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="text-[10px] tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">
                    Explore
                  </span>
                  <span className="w-6 h-[1px] bg-white/60 group-hover:w-12 transition-all duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View all events link */}
        <div
          className={`mt-12 flex justify-end transition-all duration-700 delay-500 ${
            inView ? "opacity-100" : "opacity-0"
          }`}
        >
          <Link
            href="/events"
            className="group inline-flex items-center gap-3 text-xs tracking-widest"
          >
            <span className="opacity-60 group-hover:opacity-100 transition-opacity">
              All Events
            </span>
            <span className="w-8 h-[1px] bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-14 transition-all duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
