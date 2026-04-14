"use client";

import Link from "next/link";
import { instagramPosts } from "@/lib/data";
import { useInView } from "@/lib/useInView";

export default function SocialsGrid() {
  const { ref, inView } = useInView(0.1);

  return (
    <section className="py-24 md:py-32 px-6 md:px-10 border-t border-white-10">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="font-heading font-black text-2xl md:text-4xl mb-12 md:mb-16">
          Spot Us On Socials
        </h2>
        <div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger-children"
        >
          {instagramPosts.map((url) => (
            <Link
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group aspect-square bg-white-10 relative overflow-hidden fade-in-up ${
                inView ? "in-view" : ""
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white-20 to-transparent transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs tracking-widest">View Post</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
