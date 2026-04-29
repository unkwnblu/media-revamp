import Link from "next/link";
import type { Project } from "@/lib/data";

const gradients = [
  "from-purple-600 via-pink-600 to-rose-500",
  "from-blue-500 via-cyan-500 to-teal-400",
  "from-amber-500 via-orange-500 to-red-500",
  "from-violet-600 via-purple-500 to-blue-500",
  "from-rose-500 via-pink-500 to-fuchsia-500",
  "from-emerald-500 via-green-400 to-cyan-400",
];

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const gradient = gradients[index % gradients.length];

  return (
    <Link
      href={`/portfolio/${project.id}`}
      className="group block relative aspect-[3/4] overflow-hidden rounded-xl"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} transition-transform duration-700 group-hover:scale-105`}
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-500" />
      <div className="absolute inset-0 card-shimmer overflow-hidden" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
        <span className="text-[10px] tracking-widest opacity-60 mb-1 text-purple-200">
          {project.category}
        </span>
        <h3 className="font-heading font-black text-lg group-hover:translate-x-1 transition-transform duration-500">
          {project.title}
        </h3>
        <span className="text-[10px] tracking-widest opacity-40 mt-1">
          {project.year}
        </span>
      </div>
    </Link>
  );
}
