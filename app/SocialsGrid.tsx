"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { instagramPosts } from "@/lib/data";
import { staggerFadeIn } from "@/lib/animations";

export default function SocialsGrid() {
  const itemsRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    const items = itemsRef.current.filter(Boolean);
    if (items.length === 0) return;

    const tween = staggerFadeIn(items, 0.1);
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section className="py-24 md:py-32 px-6 md:px-10 border-t border-white-10">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="font-heading font-black text-2xl md:text-4xl mb-12 md:mb-16">
          Spot Us On Socials
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {instagramPosts.map((url, i) => (
            <Link
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => {
                if (el) itemsRef.current[i] = el;
              }}
              className="group aspect-square bg-white-10 relative overflow-hidden"
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
