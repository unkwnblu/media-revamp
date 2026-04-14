"use client";

import { forwardRef } from "react";
import Link from "next/link";
import type { Project } from "@/lib/data";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = forwardRef<HTMLAnchorElement, ProjectCardProps>(
  function ProjectCard({ project }, ref) {
    return (
      <Link
        ref={ref}
        href={`/portfolio/${project.id}`}
        className="group block relative aspect-[3/4] overflow-hidden bg-white-10"
      >
        {/* Placeholder gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white-20 to-transparent transition-transform duration-500 group-hover:scale-105" />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-500 flex flex-col justify-end p-6">
          <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <span className="text-[10px] tracking-widest opacity-60">
              {project.category}
            </span>
            <h3 className="font-heading font-black text-lg mt-1">
              {project.title}
            </h3>
            <span className="text-[10px] tracking-widest opacity-40 mt-2 block">
              {project.year}
            </span>
          </div>
        </div>

        {/* Always visible title at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent group-hover:opacity-0 transition-opacity duration-500">
          <h3 className="font-heading font-black text-sm">
            {project.title}
          </h3>
        </div>
      </Link>
    );
  }
);

export default ProjectCard;
