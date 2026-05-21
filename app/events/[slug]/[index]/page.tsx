import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { createMetadata } from "@/lib/metadata";
import {
  RiArrowLeftLine, RiCalendarLine, RiMapPinLine, RiTimeLine,
  RiTicketLine, RiInstagramLine, RiTwitterXLine,
  RiTiktokLine, RiFacebookBoxLine, RiGlobalLine,
} from "react-icons/ri";
import SessionGallery from "./SessionGallery";

interface Props {
  params: Promise<{ slug: string; index: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, index } = await params;
  const supabase = await createClient();

  const { data: event } = await supabase
    .from("events")
    .select("id, title")
    .eq("slug", slug)
    .single();

  if (!event) return {};

  const { data: session } = await supabase
    .from("event_sessions")
    .select("name")
    .eq("event_id", event.id)
    .order("sort_order", { ascending: true })
    .range(Number(index), Number(index))
    .single();

  if (!session) return {};
  return createMetadata({ title: `${session.name} — ${event.title}` });
}

const socialConfig = [
  { key: "instagram", icon: RiInstagramLine,   label: "Instagram", color: "hover:text-pink-400 hover:border-pink-400/40" },
  { key: "twitter",   icon: RiTwitterXLine,    label: "X",         color: "hover:text-white hover:border-white/40" },
  { key: "tiktok",    icon: RiTiktokLine,      label: "TikTok",    color: "hover:text-white hover:border-white/40" },
  { key: "facebook",  icon: RiFacebookBoxLine, label: "Facebook",  color: "hover:text-blue-400 hover:border-blue-400/40" },
];

export default async function SessionPage({ params }: Props) {
  const { slug, index } = await params;
  const idx = Number(index);

  if (isNaN(idx)) notFound();

  const supabase = await createClient();

  const { data: event, error: eventError } = await supabase
    .from("events")
    .select("id, title, slug, is_recurring, instagram, twitter, tiktok, facebook, website")
    .eq("slug", slug)
    .single();

  if (eventError || !event || !event.is_recurring) notFound();

  const { data: session, error: sessError } = await supabase
    .from("event_sessions")
    .select("name, date, venue, time, ticket_price, ticket_link, is_upcoming, thumbnail, images, sort_order")
    .eq("event_id", event.id)
    .order("sort_order", { ascending: true })
    .range(idx, idx)
    .single();

  if (sessError || !session) notFound();

  // Gallery = only the extra images (thumbnail shown in header, not the grid)
  const galleryImages = (session.images ?? []).filter(
    (img: string) => img !== session.thumbnail
  );

  const eventSocials = socialConfig.filter(({ key }) => !!(event as Record<string, unknown>)[key]);
  const hasLinks = !!event.website || !!session.ticket_link || eventSocials.length > 0;
  const photoCount = galleryImages.length;

  return (
    <div className="min-h-screen pt-24 pb-24 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">

        {/* Back link */}
        <Link
          href={`/events/${slug}`}
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-10"
        >
          <RiArrowLeftLine size={15} />
          Back to {event.title}
        </Link>

        {/* Header — thumbnail beside title */}
        <div className="mb-12 border-b border-white/[0.06] pb-10">
          <div className="flex items-start gap-5 sm:gap-8">

            {/* Thumbnail */}
            {session.thumbnail && (
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden border border-white/[0.08] shrink-0">
                <Image
                  src={session.thumbnail}
                  alt={session.name}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              </div>
            )}

            {/* Title + meta */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <p className="text-[10px] tracking-[0.4em] text-purple-400/60 mb-2">{event.title}</p>
                  <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl leading-tight">
                    {session.name}
                  </h1>
                </div>
                {session.is_upcoming && (
                  <span className="px-3 py-1.5 rounded-full bg-green-500/15 border border-green-500/20 text-green-400 text-xs font-semibold tracking-wide shrink-0">
                    Upcoming
                  </span>
                )}
              </div>

              {/* Meta pills */}
              <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3">
                {session.date && (
                  <span className="inline-flex items-center gap-1.5 text-sm text-white/50">
                    <RiCalendarLine size={13} className="text-purple-400" /> {session.date}
                  </span>
                )}
                {session.venue && (
                  <span className="inline-flex items-center gap-1.5 text-sm text-white/50">
                    <RiMapPinLine size={13} className="text-purple-400" /> {session.venue}
                  </span>
                )}
                {session.time && (
                  <span className="inline-flex items-center gap-1.5 text-sm text-white/50">
                    <RiTimeLine size={13} className="text-purple-400" /> {session.time}
                  </span>
                )}
                {session.ticket_price && (
                  <span className="inline-flex items-center gap-1.5 text-sm text-white/50">
                    <RiTicketLine size={13} className="text-purple-400" /> {session.ticket_price}
                  </span>
                )}
              </div>

              {photoCount > 0 && (
                <p className="text-xs text-white/30 mt-2">{photoCount} photo{photoCount !== 1 ? "s" : ""}</p>
              )}
            </div>
          </div>

          {/* Links row */}
          {hasLinks && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {session.ticket_link && (
                <a
                  href={session.ticket_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  <RiTicketLine size={15} /> Get Tickets
                </a>
              )}
              {event.website && (
                <a
                  href={event.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.10] text-sm text-white/70 hover:text-white hover:bg-white/[0.10] transition-all"
                >
                  <RiGlobalLine size={14} className="text-purple-400" /> Event Page
                </a>
              )}
              {eventSocials.map(({ key, icon: Icon, label, color }) => (
                <a
                  key={key}
                  href={(event as Record<string, string>)[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.12] text-white/50 text-xs tracking-wide transition-all duration-200 ${color}`}
                >
                  <Icon size={14} /> {label}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Bento gallery */}
        {galleryImages.length > 0 ? (
          <SessionGallery images={galleryImages} />
        ) : (
          <div className="flex items-center justify-center py-32 border border-dashed border-white/10 rounded-2xl">
            <p className="text-white/30 text-sm">No gallery photos for this session yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
