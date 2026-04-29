"use client";

import { useInView } from "@/lib/useInView";

const gradients = [
  "from-purple-600 via-pink-600 to-rose-500",
  "from-amber-500 via-orange-500 to-red-500",
  "from-blue-500 via-cyan-500 to-teal-400",
  "from-violet-600 via-purple-500 to-blue-500",
  "from-rose-500 via-pink-500 to-fuchsia-500",
  "from-emerald-500 via-green-400 to-cyan-400",
  "from-amber-400 via-yellow-400 to-orange-400",
  "from-indigo-500 via-blue-500 to-cyan-500",
];

interface ImageGalleryProps {
  images: { src: string; alt: string }[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const { ref, inView } = useInView(0.1);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="flex gap-4 md:gap-5 px-6 md:px-10 py-16 md:py-20 overflow-x-auto scrollbar-hide">
        {images.map((image, i) => (
          <div
            key={i}
            className={`flex-shrink-0 w-[260px] md:w-[380px] lg:w-[460px] aspect-[4/3] relative overflow-hidden rounded-xl group fade-in-up ${
              inView ? "in-view" : ""
            }`}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${gradients[i % gradients.length]} transition-transform duration-700 group-hover:scale-105`}
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-500" />
            <div className="absolute inset-0 card-shimmer overflow-hidden" />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/40 to-transparent">
              <span className="text-[10px] tracking-widest opacity-70">
                {image.alt}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
