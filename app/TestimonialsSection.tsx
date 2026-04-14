"use client";

import { useRef, useEffect } from "react";
import { testimonials } from "@/lib/data";
import TestimonialCard from "@/components/TestimonialCard";
import { staggerFadeIn } from "@/lib/animations";

export default function TestimonialsSection() {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    const tween = staggerFadeIn(cards, 0.15);
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section className="py-24 md:py-32 px-6 md:px-10 border-t border-white-10">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="font-heading font-black text-2xl md:text-4xl mb-12 md:mb-16">
          What Sets Us Apart
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={t.author}
              testimonial={t}
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
