import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/lib/data";
import { createMetadata } from "@/lib/metadata";
import ProjectDetail from "./ProjectDetail";

export async function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return createMetadata({ title: "Project Not Found" });
  return createMetadata({
    title: project.title,
    description: project.description,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <Link
            href="/portfolio"
            className="text-[10px] tracking-widest opacity-50 hover:opacity-100 transition-opacity"
          >
            &larr; Back to Projects
          </Link>
          <h1 className="font-heading font-black text-4xl md:text-6xl lg:text-7xl mt-6">
            {project.title}
          </h1>
          <div className="flex gap-8 mt-6 text-xs tracking-widest opacity-50">
            <span>{project.category}</span>
            <span>{project.client}</span>
            <span>{project.year}</span>
          </div>
        </div>
      </section>

      <ProjectDetail project={project} />
    </>
  );
}
