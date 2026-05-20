import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { createClient } from "@/lib/supabase/server";
import HeroSection from "@/components/HeroSection";
import CTABanner from "@/components/CTABanner";
import ArtistsGrid from "./ArtistsGrid";

export const metadata: Metadata = createMetadata({
  title: "Our Artists",
  description:
    "These are some Amazing Acts we work with currently. Discover the talent behind A1 Media.",
});

export default async function ArtistsPage() {
  const supabase = await createClient();

  const { data: artists } = await supabase
    .from("artists")
    .select("id, name, genre, image")
    .order("created_at", { ascending: false });

  return (
    <>
      <HeroSection
        heading="Music Collabs"
        subheading="These are some Amazing Acts we work with currently."
        fullHeight={false}
      />
      <ArtistsGrid artists={artists ?? []} />
      <CTABanner
        heading="Let's Handle Your Next Project"
        buttonText="Get In Touch"
        buttonHref="/socials"
      />
    </>
  );
}
