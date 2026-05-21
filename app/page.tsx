import { createClient } from "@/lib/supabase/server";
import HomeHero from "./HomeHero";
import MarqueeTicker from "./MarqueeTicker";
import AboutTeaser from "./AboutTeaser";
import FeaturedWork from "./FeaturedWork";
import ContentShowcase from "./ContentShowcase";
import StatsBar from "./StatsBar";
import TestimonialSpotlight from "./TestimonialSpotlight";
import EventsPreview from "./EventsPreview";
import HomeCTA from "./HomeCTA";

export default async function HomePage() {
  const supabase = await createClient();

  const [
    { data: testimonials },
    { data: events },
    { data: projects },
    { data: upcomingSessionsRaw },
  ] = await Promise.all([
    supabase
      .from("testimonials")
      .select("id, quote, author, role")
      .order("created_at", { ascending: false }),
    supabase
      .from("events")
      .select("id, slug, title, tagline, description, image")
      .order("created_at", { ascending: false })
      .limit(4),
    supabase
      .from("projects")
      .select("id, title, category, year, image")
      .order("created_at", { ascending: false })
      .limit(3),
    supabase
      .from("event_sessions")
      .select("name, date, thumbnail, events(title, slug)")
      .eq("is_upcoming", true)
      .limit(5),
  ]);

  type RawSession = {
    name: string;
    date: string | null;
    thumbnail: string | null;
    events: { title: string; slug: string } | null;
  };

  const upcomingSessions = (upcomingSessionsRaw ?? []).map((s: RawSession) => ({
    name: s.name,
    date: s.date,
    thumbnail: s.thumbnail,
    event_slug: s.events?.slug ?? "",
    event_title: s.events?.title ?? "",
  }));

  return (
    <>
      <HomeHero />
      <MarqueeTicker />
      <AboutTeaser />
      <FeaturedWork projects={projects ?? []} />
      <ContentShowcase upcomingSessions={upcomingSessions} />
      <StatsBar />
      <TestimonialSpotlight testimonials={testimonials ?? []} />
      <EventsPreview events={events ?? []} />
      <HomeCTA />
    </>
  );
}
