"use client";

import Link from "next/link";
import Image from "next/image";
import { useInView } from "@/lib/useInView";
import { RiCalendarEventLine } from "react-icons/ri";

interface UpcomingSession {
  name: string;
  date: string | null;
  thumbnail: string | null;
  event_slug: string;
  event_title: string;
}

interface Props {
  upcomingSessions: UpcomingSession[];
}

const otherItems = [
  { image: "/images/IMG_0963.jpg", span: "col-span-1 row-span-1", label: "Backstage",         href: "/gallery/backstage" },
  { image: "/images/IMG_1077.jpg", span: "col-span-1 row-span-1", label: "Studio",            href: "/gallery/studio" },
  { image: "/images/IMG_1172.jpg", span: "col-span-1 row-span-2", label: "Campaigns",         href: "/gallery/campaigns" },
  { image: "/images/IMG_1011.jpg", span: "col-span-1 row-span-1", label: "Music Videos",      href: "/gallery/music-videos" },
  { image: "/images/IMG_0970.jpg", span: "col-span-2 row-span-1", label: "Brand Activations", href: "/gallery/brand-activations" },
];

export default function ContentShowcase({ upcomingSessions }: Props) {
  const { ref, inView } = useInView(0.1);

  return (
    <section className="py-32 md:py-40 px-6 md:px-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent pointer-events-none" />

      <div ref={ref} className="max-w-[1400px] mx-auto relative">
        {/* Section label */}
        <div className="flex items-center justify-between mb-16">
          <div
            className={`flex items-center gap-4 transition-all duration-700 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
            }`}
          >
            <span className="text-[10px] tracking-[0.4em] text-purple-400/60">05</span>
            <div className="w-8 h-[1px] bg-gradient-to-r from-purple-400/40 to-pink-400/40" />
            <span className="text-[10px] tracking-[0.4em] opacity-40">Gallery</span>
          </div>
        </div>

        {/* Mosaic grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[200px] gap-3">

          {/* ── Live Events card (big, top-left) ── */}
          <Link
            href="/events"
            className={`col-span-2 row-span-2 group relative overflow-hidden rounded-xl transition-all duration-700 ${
              inView ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            {/* Background — first upcoming thumbnail or gradient */}
            {upcomingSessions[0]?.thumbnail ? (
              <Image
                src={upcomingSessions[0].thumbnail}
                alt={upcomingSessions[0].name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-rose-500 transition-transform duration-700 group-hover:scale-110" />
            )}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition-colors duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

            {/* Live Events label */}
            <div className="absolute top-4 left-5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-[10px] tracking-widest font-medium">
                <RiCalendarEventLine size={10} className="text-purple-300" /> LIVE EVENTS
              </span>
            </div>

            {/* Upcoming sessions list */}
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
              {upcomingSessions.length > 0 ? (
                <div className="space-y-3">
                  {upcomingSessions.slice(0, 3).map((s, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3"
                      style={{ opacity: 1 - i * 0.2 }}
                    >
                      {/* Tiny thumbnail */}
                      {s.thumbnail && (
                        <div className="w-8 h-8 rounded-md overflow-hidden relative shrink-0 border border-white/20">
                          <Image src={s.thumbnail} alt={s.name} fill className="object-cover" sizes="32px" />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-white truncate">{s.name}</p>
                        <p className="text-[10px] text-white/50 truncate">{s.event_title}{s.date ? ` · ${s.date}` : ""}</p>
                      </div>
                      <span className="shrink-0 px-2 py-0.5 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-[9px] font-semibold tracking-wide">
                        Upcoming
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-[10px] md:text-xs tracking-widest font-heading font-bold opacity-80">
                  LIVE EVENTS
                </span>
              )}
            </div>
          </Link>

          {/* ── Other items ── */}
          {otherItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className={`${item.span} group relative overflow-hidden rounded-xl transition-all duration-700 ${
                inView ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{ transitionDelay: `${300 + i * 100}ms` }}
            >
              {/* Background photo */}
              <Image
                src={item.image}
                alt={item.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              {/* Hover play icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <span className="text-[10px] md:text-xs tracking-widest font-heading font-bold opacity-90 group-hover:opacity-100 transition-opacity">
                  {item.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
