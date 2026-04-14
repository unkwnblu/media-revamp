"use client";

import { useRef, useEffect } from "react";
import { projects } from "@/lib/data";
import ProjectCard from "@/components/ProjectCard";
import { staggerFadeIn } from "@/lib/animations";

export default function ProjectsGrid() {
  const cardsRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    const tween = staggerFadeIn(cards, 0.1);
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section className="py-24 md:py-32 px-6 md:px-10 border-t border-white-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
