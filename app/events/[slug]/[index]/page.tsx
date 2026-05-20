import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { createMetadata } from "@/lib/metadata";
import { RiArrowLeftLine } from "react-icons/ri";
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

export default async function SessionPage({ params }: Props) {
  const { slug, index } = await params;
  const idx = Number(index);

  if (isNaN(idx)) notFound();

  const supabase = await createClient();

  const { data: event, error: eventError } = await supabase
    .from("events")
    .select("id, title, slug, is_recurring")
    .eq("slug", slug)
    .single();

  if (eventError || !event || !event.is_recurring) notFound();

  const { data: session, error: sessError } = await supabase
    .from("event_sessions")
    .select("name, date, venue, time, ticket_price, is_upcoming, thumbnail, images, sort_order")
    .eq("event_id", event.id)
    .order("sort_order", { ascending: true })
    .range(idx, idx)
    .single();

  if (sessError || !session) notFound();

  const allImages = [
    ...(session.thumbnail ? [session.thumbnail] : []),
    ...(session.images ?? []).filter((img: string) => img !== session.thumbnail),
  ];

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

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[10px] tracking-[0.4em] text-purple-400/60 mb-3">{event.title}</p>
              <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl">
                {session.name}
              </h1>
              {/* Meta */}
              <div className="flex flex-wrap gap-4 mt-4">
                {session.date && (
                  <span className="text-sm text-white/50">{session.date}</span>
                )}
                {session.venue && (
                  <span className="text-sm text-white/50">· {session.venue}</span>
                )}
                {session.time && (
                  <span className="text-sm text-white/50">· {session.time}</span>
                )}
              </div>
            </div>
            {session.is_upcoming && (
              <span className="px-3 py-1.5 rounded-full bg-green-500/15 border border-green-500/20 text-green-400 text-xs font-semibold tracking-wide">
                Upcoming
              </span>
            )}
          </div>

          {allImages.length > 0 && (
            <p className="text-xs text-white/30 mt-4">{allImages.length} photo{allImages.length !== 1 ? "s" : ""}</p>
          )}
        </div>

        {/* Bento gallery */}
        {allImages.length > 0 ? (
          <SessionGallery images={allImages} />
        ) : (
          <div className="flex items-center justify-center py-32 border border-dashed border-white/10 rounded-2xl">
            <p className="text-white/30 text-sm">No photos for this session yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
