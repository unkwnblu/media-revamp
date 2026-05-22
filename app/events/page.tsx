import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { createClient } from "@/lib/supabase/server";
import HeroSection from "@/components/HeroSection";
import CTABanner from "@/components/CTABanner";
import EventsOverview from "./EventsOverview";

export const metadata: Metadata = createMetadata({
  title: "Our Events",
  description:
    "Discover A1 Media's signature events — Amapiano Left and Right and About The Hype.",
});

export default async function EventsPage() {
  const supabase = await createClient();

  const { data: events } = await supabase
    .from("events")
    .select("id, title, tagline, slug, image, is_recurring, sort_order")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  return (
    <>
      <HeroSection heading="Our Events" subheading="Events we currently curate and manage" fullHeight={false} />
      <EventsOverview events={events ?? []} />
      <CTABanner
        heading="Let's Handle Your Next Project"
        buttonText="Get In Touch"
        buttonHref="/socials"
      />
    </>
  );
}
