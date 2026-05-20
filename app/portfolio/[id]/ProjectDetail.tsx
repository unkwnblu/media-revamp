"use client";

import Image from "next/image";
import CTABanner from "@/components/CTABanner";
import { useInView } from "@/lib/useInView";

interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  year: number;
  description: string;
  thumbnail: string;
  images: string[];
  videos: string[];
}

const gradients = [
  "from-purple-600 via-pink-600 to-rose-500",
  "from-blue-500 via-cyan-500 to-teal-400",
  "from-amber-500 via-orange-500 to-red-500",
  "from-violet-600 via-purple-500 to-blue-500",
  "from-rose-500 via-pink-500 to-fuchsia-500",
  "from-emerald-500 via-green-400 to-cyan-400",
];

export default function ProjectDetail({ project }: { project: Project }) {
  const { ref: descRef, inView: descInView } = useInView(0.2);
  const { ref: galleryRef, inView: galleryInView } = useInView(0.1);

  // All images: thumbnail first (if not already in images array), then rest
  const allImages = project.images?.length
    ? project.images
    : project.thumbnail
    ? [project.thumbnail]
    : [];

  return (
    <>
      {/* Description */}
      {project.description && (
        <section className="pb-16 px-6 md:px-10 border-t border-white/10 pt-16">
          <div
            ref={descRef}
            className={`max-w-4xl mx-auto fade-in-up ${descInView ? "in-view" : ""}`}
          >
            <p className="text-base md:text-lg leading-relaxed font-body font-medium opacity-90 normal-case">
              {project.description}
            </p>
          </div>
        </section>
      )}

      {/* Image Gallery */}
      {allImages.length > 0 && (
        <section className="pb-24 px-6 md:px-10">
          <div
            ref={galleryRef}
            className={`max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 fade-in-up ${
              galleryInView ? "in-view" : ""
            }`}
          >
            {allImages.map((img, i) => (
              <div key={i} className="aspect-video relative overflow-hidden rounded-xl">
                <Image
                  src={img}
                  alt={`${project.title} — image ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* No images fallback */}
      {allImages.length === 0 && (
        <section className="pb-24 px-6 md:px-10">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`aspect-video relative overflow-hidden rounded-xl bg-gradient-to-br ${gradients[i % gradients.length]}`}>
                <div className="absolute inset-0 bg-black/20" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Videos */}
      {project.videos?.length > 0 && (
        <section className="pb-24 px-6 md:px-10">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.videos.map((video, i) => (
              <div key={i} className="aspect-video rounded-xl overflow-hidden bg-white/5">
                <video src={video} controls className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      <CTABanner
        heading="Let's Handle Your Next Project"
        buttonText="Get In Touch"
        buttonHref="/socials"
      />
    </>
  );
}
