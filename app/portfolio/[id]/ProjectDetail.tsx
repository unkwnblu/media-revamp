"use client";

import type { Project } from "@/lib/data";
import CTABanner from "@/components/CTABanner";
import { useInView } from "@/lib/useInView";

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const { ref: descRef, inView: descInView } = useInView(0.2);
  const { ref: galleryRef, inView: galleryInView } = useInView(0.1);

  return (
    <>
      {/* Description */}
      <section className="pb-16 px-6 md:px-10 border-t border-white-10 pt-16">
        <div
          ref={descRef}
          className={`max-w-4xl mx-auto fade-in-up ${
            descInView ? "in-view" : ""
          }`}
        >
          <p className="text-base md:text-lg leading-relaxed font-body font-medium opacity-90 normal-case">
            {project.description}
          </p>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="pb-24 px-6 md:px-10">
        <div
          ref={galleryRef}
          className={`max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 fade-in-up ${
            galleryInView ? "in-view" : ""
          }`}
        >
          {project.images.map((img, i) => {
            const gradients = ["gradient-1", "gradient-2", "gradient-3", "gradient-5", "gradient-7", "gradient-9"];
            return (
              <div
                key={i}
                className="aspect-video relative overflow-hidden"
              >
                <div className={`absolute inset-0 ${gradients[i % gradients.length]}`} />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 card-shimmer overflow-hidden" />
              </div>
            );
          })}
        </div>
      </section>

      {/* Videos */}
      {project.videos.length > 0 && (
        <section className="pb-24 px-6 md:px-10">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.videos.map((video, i) => (
              <div key={i} className="aspect-video bg-white-10">
                <video
                  src={video}
                  controls
                  className="w-full h-full object-cover"
                />
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
