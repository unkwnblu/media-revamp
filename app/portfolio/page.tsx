import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { createClient } from "@/lib/supabase/server";
import HeroSection from "@/components/HeroSection";
import CTABanner from "@/components/CTABanner";
import ProjectsGrid from "./ProjectsGrid";

export const metadata: Metadata = createMetadata({
  title: "Our Portfolio",
  description:
    "We are proud to have supported some of the world's most renowned artists with a growing number of successful projects.",
});

export default async function PortfolioPage() {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from("projects")
    .select("id, title, category, year, thumbnail")
    .order("created_at", { ascending: false });

  return (
    <>
      <HeroSection
        heading="Projects"
        subheading="We are proud to have supported some of the world's most renowned artists with a growing number of successful projects."
        fullHeight={false}
      />
      <ProjectsGrid projects={projects ?? []} />
      <CTABanner
        heading="Let's Handle Your Next Project"
        buttonText="Get In Touch"
        buttonHref="/socials"
      />
    </>
  );
}
