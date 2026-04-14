"use client";

import { useRef, useEffect } from "react";
import type { Project } from "@/lib/data";
import { fadeInUp } from "@/lib/animations";
import CTABanner from "@/components/CTABanner";

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const descRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tweens: gsap.core.Tween[] = [];

    if (descRef.current) {
      tweens.push(fadeInUp(descRef.current));
    }
    if (galleryRef.current) {
      tweens.push(fadeInUp(galleryRef.current, 0.2));
    }

    return () => {
      tweens.forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      {/* Description */}
      <section className="pb-16 px-6 md:px-10 border-t border-white-10 pt-16">
        <div ref={descRef} className="max-w-4xl mx-auto">
          <p className="text-base md:text-lg leading-relaxed font-body font-medium opacity-90 normal-case">
            {project.description}
          </p>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="pb-24 px-6 md:px-10">
        <div
          ref={galleryRef}
          className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {project.images.map((img, i) => (
            <div
              key={i}
              className="aspect-video bg-white-10 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white-20 to-transparent" />
            </div>
          ))}
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
