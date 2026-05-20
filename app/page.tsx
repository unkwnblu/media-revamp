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
  ]);

  return (
    <>
      <HomeHero />
      <MarqueeTicker />
      <AboutTeaser />
      <FeaturedWork projects={projects ?? []} />
      <ContentShowcase />
      <StatsBar />
      <TestimonialSpotlight testimonials={testimonials ?? []} />
      <EventsPreview events={events ?? []} />
      <HomeCTA />
    </>
  );
}
