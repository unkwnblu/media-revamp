"use client";

import { useRef, useEffect } from "react";
import { horizontalScroll, killScrollTriggers } from "@/lib/animations";

interface ImageGalleryProps {
  images: { src: string; alt: string }[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return;

    // Only enable horizontal scroll on desktop
    const mm = window.matchMedia("(min-width: 768px)");
    if (mm.matches) {
      horizontalScroll(containerRef.current, scrollRef.current);
    }

    return () => {
      killScrollTriggers();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden">
      <div
        ref={scrollRef}
        className="flex gap-4 md:gap-6 px-6 md:px-10 py-16 md:py-24"
      >
        {images.map((image, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[280px] md:w-[400px] lg:w-[500px] aspect-[4/3] bg-white-10 relative overflow-hidden"
          >
            {/* Placeholder gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white-20 to-transparent" />
            <div className="absolute bottom-4 left-4 text-[10px] tracking-widest opacity-40">
              {image.alt}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
