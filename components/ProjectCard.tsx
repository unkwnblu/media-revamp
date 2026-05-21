import Link from "next/link";
import Image from "next/image";

const gradients = [
  "from-purple-600 via-pink-600 to-rose-500",
  "from-blue-500 via-cyan-500 to-teal-400",
  "from-amber-500 via-orange-500 to-red-500",
  "from-violet-600 via-purple-500 to-blue-500",
  "from-rose-500 via-pink-500 to-fuchsia-500",
  "from-emerald-500 via-green-400 to-cyan-400",
];

interface Project {
  id: string;
  title: string;
  category: string;
  year: number;
  thumbnail?: string;
}

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const gradient = gradients[index % gradients.length];
  const hasThumbnail = !!project.thumbnail;

  return (
    <Link
      href={`/portfolio/${project.id}`}
      className="group block relative aspect-[3/4] overflow-hidden rounded-xl"
    >
      {/* Background — real image or gradient fallback */}
      {hasThumbnail ? (
        <Image
          src={project.thumbnail!}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} transition-transform duration-700 group-hover:scale-105`}
        />
      )}

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-500" />
      {!hasThumbnail && <div className="absolute inset-0 card-shimmer overflow-hidden" />}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      {/* Text */}
      <div className="absolute inset-0 flex flex-col justify-end p-3 md:p-6 z-10">
        <span className="text-[9px] md:text-[10px] tracking-widest opacity-60 mb-1 text-purple-200">
          {project.category}
        </span>
        <h3 className="font-heading font-black text-xs sm:text-sm md:text-lg leading-tight group-hover:translate-x-1 transition-transform duration-500">
          {project.title}
        </h3>
        <span className="text-[9px] md:text-[10px] tracking-widest opacity-40 mt-1">
          {project.year}
        </span>
      </div>
    </Link>
  );
}
