"use client";

import ProjectCard from "@/components/ProjectCard";
import { useInView } from "@/lib/useInView";

interface Project {
  id: string;
  title: string;
  category: string;
  year: number;
  thumbnail: string;
}

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const { ref, inView } = useInView(0.1);

  return (
    <section className="py-24 md:py-32 px-6 md:px-10 relative overflow-hidden border-t border-white/[0.06]">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/10 via-transparent to-pink-950/5 pointer-events-none" />
      <div className="max-w-[1400px] mx-auto relative">

        {/* Section label */}
        <div
          className={`flex items-center gap-4 mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
          }`}
        >
          <span className="text-[10px] tracking-[0.4em] text-purple-400/60">01</span>
          <div className="w-8 h-[1px] bg-gradient-to-r from-purple-400/40 to-pink-400/40" />
          <span className="text-[10px] tracking-[0.4em] opacity-40">Selected Work</span>
        </div>

        {projects.length === 0 ? (
          <p className="text-white/30 text-sm text-center py-20">No projects yet.</p>
        ) : (
          <div
            ref={ref}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 stagger-children"
          >
            {projects.map((project, i) => (
              <div
                key={project.id}
                className={`fade-in-up ${inView ? "in-view" : ""}`}
              >
                <ProjectCard project={project} index={i} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
