import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { createMetadata } from "@/lib/metadata";
import CTABanner from "@/components/CTABanner";
import EventDetail from "./EventDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("events")
    .select("title, description, image")
    .eq("slug", slug)
    .single();

  if (!data) return {};
  return createMetadata({
    title: data.title,
    description: data.description,
    image: data.image ?? undefined,
  });
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: event, error } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !event) notFound();

  // Fetch sessions if recurring
  let sessions: {
    name: string;
    date: string | null;
    venue: string | null;
    time: string | null;
    ticket_price: string | null;
    is_upcoming: boolean;
    thumbnail: string;
    images: string[];
  }[] = [];

  if (event.is_recurring) {
    const { data } = await supabase
      .from("event_sessions")
      .select("name, date, venue, time, ticket_price, is_upcoming, thumbnail, images, sort_order")
      .eq("event_id", event.id)
      .order("sort_order", { ascending: true });
    sessions = data ?? [];
  }

  const gradients = ["gradient-1", "gradient-9", "gradient-3", "gradient-5"];
  const gradient = gradients[Math.abs(slug.charCodeAt(0)) % gradients.length];

  return (
    <>
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {event.image ? (
          <>
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/65" />
          </>
        ) : (
          <>
            <div className={`absolute inset-0 ${gradient} opacity-20`} />
            <div className="absolute inset-0 bg-black/60" />
            <div className="ambient-orb w-[500px] h-[500px] bg-purple-600 top-[-10%] right-[-10%]" style={{ animationDelay: "0s" }} />
            <div className="ambient-orb w-[400px] h-[400px] bg-pink-500 bottom-[-5%] left-[10%]" style={{ animationDelay: "3s" }} />
          </>
        )}

        {/* A1 watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-heading font-black leading-none tracking-tighter opacity-[0.04]" style={{ fontSize: "40vw" }}>A1</span>
        </div>

        <div className="relative z-10 text-center px-6 md:px-10 max-w-4xl mx-auto">
          <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl lg:text-8xl tracking-tight">
            {event.title}
          </h1>
          <p className="mt-6 text-sm md:text-base opacity-60 tracking-widest">
            {event.tagline}
          </p>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 animate-bounce">
          <div className="w-px h-8 bg-white" />
        </div>
      </section>

      {/* Event content */}
      <EventDetail event={event} sessions={sessions} slug={slug} />

      <CTABanner
        heading="Let's Handle Your Next Project"
        buttonText="Get In Touch"
        buttonHref="/socials"
      />
    </>
  );
}
