"use client";

import { projects } from "@/lib/data";
import ProjectCard from "@/components/ProjectCard";
import { useInView } from "@/lib/useInView";

export default function ProjectsGrid() {
  const { ref, inView } = useInView(0.1);

  return (
    <section className="py-24 md:py-32 px-6 md:px-10 border-t border-white-10">
      <div className="max-w-[1400px] mx-auto">
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className={`fade-in-up ${inView ? "in-view" : ""}`}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
