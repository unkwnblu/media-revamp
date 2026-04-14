"use client";

import { forwardRef } from "react";
import Link from "next/link";
import type { EventData } from "@/lib/data";

interface EventCardProps {
  event: EventData;
}

const EventCard = forwardRef<HTMLAnchorElement, EventCardProps>(
  function EventCard({ event }, ref) {
    return (
      <Link
        ref={ref}
        href={`/events/${event.slug}`}
        className="group block relative aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-white-10"
      >
        {/* Placeholder gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white-20 to-transparent transition-transform duration-700 group-hover:scale-105" />

        {/* Content overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-500 flex flex-col justify-end p-8 md:p-10">
          <span className="text-[10px] tracking-widest opacity-60 mb-2">
            {event.tagline}
          </span>
          <h3 className="font-heading font-black text-2xl md:text-3xl lg:text-4xl">
            {event.title}
          </h3>
        </div>
      </Link>
    );
  }
);

export default EventCard;
