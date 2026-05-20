"use client";

import Image from "next/image";
import Link from "next/link";
import { useInView } from "@/lib/useInView";
import {
  RiMapPinLine, RiTimeLine, RiCalendarLine, RiTicketLine,
  RiArrowRightLine, RiImageLine,
} from "react-icons/ri";

interface Session {
  name: string;
  date: string | null;
  venue: string | null;
  time: string | null;
  ticket_price: string | null;
  is_upcoming: boolean;
  thumbnail: string;
  images: string[];
}

interface Event {
  title: string;
  tagline: string;
  description: string;
  is_recurring: boolean;
  date: string | null;
  venue: string | null;
  time: string | null;
  ticket_price: string | null;
}

function InfoPill({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-white/70">
      <Icon size={14} className="text-purple-400 shrink-0" />
      <span>{label}</span>
    </div>
  );
}

// ── Session thumbnail card ────────────────────────────────────────────────────
function SessionCard({
  session, index, eventSlug,
}: { session: Session; index: number; eventSlug: string }) {
  const photoCount = [
    session.thumbnail,
    ...(session.images ?? []),
  ].filter(Boolean).length;

  return (
    <Link
      href={`/events/${eventSlug}/${index}`}
      className="group relative aspect-[4/3] overflow-hidden rounded-xl block"
    >
      {/* Thumbnail or gradient fallback */}
      {session.thumbnail ? (
        <Image
          src={session.thumbnail}
          alt={session.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 to-pink-600/40 transition-transform duration-700 group-hover:scale-105" />
      )}

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

      {/* Upcoming badge */}
      {session.is_upcoming && (
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-1 rounded-full bg-green-500/20 backdrop-blur-sm border border-green-500/30 text-green-400 text-[10px] font-semibold tracking-wide">
            Upcoming
          </span>
        </div>
      )}

      {/* Photo count badge */}
      {photoCount > 0 && (
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-white/60 text-[10px]">
            <RiImageLine size={10} /> {photoCount}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 z-10">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h3 className="font-heading font-black text-lg md:text-xl group-hover:translate-x-1 transition-transform duration-300">
              {session.name}
            </h3>
            {session.date && (
              <p className="text-xs text-white/50 mt-1">{session.date}</p>
            )}
          </div>
          <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors shrink-0">
            <RiArrowRightLine size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function EventDetail({
  event, sessions, slug,
}: { event: Event; sessions: Session[]; slug: string }) {
  const { ref, inView } = useInView(0.1);
  const { ref: sessRef, inView: sessInView } = useInView(0.1);

  return (
    <>
      {/* Description + single-event info */}
      <section className="py-24 md:py-32 px-6 md:px-10 border-t border-white/[0.06]">
        <div
          ref={ref}
          className={`max-w-4xl mx-auto transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {event.is_recurring ? (
            <p className="text-base md:text-lg leading-relaxed text-white/70 max-w-2xl">
              {event.description}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="font-heading font-black text-2xl md:text-3xl mb-6">
                  Event Details
                </h2>
                <div className="space-y-3.5">
                  {event.date && <InfoPill icon={RiCalendarLine} label={event.date} />}
                  {event.venue && <InfoPill icon={RiMapPinLine} label={event.venue} />}
                  {event.time && <InfoPill icon={RiTimeLine} label={event.time} />}
                  {event.ticket_price && <InfoPill icon={RiTicketLine} label={event.ticket_price} />}
                </div>
              </div>
              <div>
                <h2 className="font-heading font-black text-2xl md:text-3xl mb-6">About</h2>
                <p className="text-sm leading-relaxed text-white/70">{event.description}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Sessions grid (recurring only) */}
      {event.is_recurring && sessions.length > 0 && (
        <section className="pb-24 md:pb-32 px-6 md:px-10 border-t border-white/[0.06] pt-0">
          <div className="max-w-[1200px] mx-auto">
            {/* Section label */}
            <div className="flex items-center gap-4 py-12">
              <span className="text-[10px] tracking-[0.4em] text-purple-400/60">Editions</span>
              <div className="flex-1 h-px bg-gradient-to-r from-purple-400/20 to-transparent" />
              <span className="text-[10px] tracking-[0.4em] opacity-30">
                {sessions.length} session{sessions.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div
              ref={sessRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children"
            >
              {sessions.map((session, i) => (
                <div
                  key={i}
                  className={`fade-in-up ${sessInView ? "in-view" : ""}`}
                >
                  <SessionCard session={session} index={i} eventSlug={slug} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
