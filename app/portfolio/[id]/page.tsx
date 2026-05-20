import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { createMetadata } from "@/lib/metadata";
import ProjectDetail from "./ProjectDetail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data: project } = await supabase
    .from("projects")
    .select("title, description")
    .eq("id", id)
    .single();

  if (!project) return createMetadata({ title: "Project Not Found" });
  return createMetadata({ title: project.title, description: project.description });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !project) notFound();

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex flex-col justify-end overflow-hidden">

        {/* Background — thumbnail or gradient fallback */}
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-black to-pink-950" />
        )}

        {/* Layered overlays */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

        {/* Ambient orbs — subtle on top of image */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-pink-600/15 blur-[100px] pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-10 pb-16 pt-36">

          {/* Back link */}
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] text-white/50 hover:text-white transition-colors mb-10 group"
          >
            <span className="w-5 h-[1px] bg-white/40 group-hover:w-8 group-hover:bg-white transition-all duration-300" />
            Back to Projects
          </Link>

          {/* Category pill */}
          <div className="mb-5">
            <span className="inline-block px-3 py-1 rounded-full border border-purple-400/30 bg-purple-400/10 text-[10px] tracking-[0.3em] text-purple-300">
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight max-w-4xl">
            {project.title}
          </h1>

          {/* Meta bar */}
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-[1px] bg-gradient-to-r from-purple-400 to-pink-400" />
              <span className="text-xs tracking-widest text-white/50">{project.client}</span>
            </div>
            <div className="w-[1px] h-4 bg-white/10" />
            <span className="text-xs tracking-widest text-white/50">{project.year}</span>
          </div>
        </div>
      </section>

      <ProjectDetail project={project} />
    </>
  );
}
