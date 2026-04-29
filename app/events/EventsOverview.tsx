"use client";

import { events } from "@/lib/data";
import EventCard from "@/components/EventCard";
import { useInView } from "@/lib/useInView";

export default function EventsOverview() {
  const { ref, inView } = useInView(0.1);

  return (
    <section className="py-24 md:py-32 px-6 md:px-10 border-t border-white-10">
      <div className="max-w-[1400px] mx-auto">
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children"
        >
          {events.map((event) => (
            <div
              key={event.id}
              className={`fade-in-up ${inView ? "in-view" : ""}`}
            >
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
