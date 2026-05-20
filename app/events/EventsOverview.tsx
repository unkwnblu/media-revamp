"use client";

import EventCard from "@/components/EventCard";
import { useInView } from "@/lib/useInView";

interface DBEvent {
  id: string;
  title: string;
  tagline: string;
  slug: string;
  image: string;
  is_recurring: boolean;
}

export default function EventsOverview({ events }: { events: DBEvent[] }) {
  const { ref, inView } = useInView(0.1);

  if (events.length === 0) {
    return (
      <section className="py-24 px-6 md:px-10 border-t border-white/[0.06]">
        <p className="text-white/30 text-sm text-center">No events yet. Check back soon.</p>
      </section>
    );
  }

  return (
    <section className="py-24 md:py-32 px-6 md:px-10 border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto">
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children"
        >
          {events.map((event, i) => (
            <div
              key={event.id}
              className={`fade-in-up ${inView ? "in-view" : ""}`}
            >
              <EventCard event={event} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
