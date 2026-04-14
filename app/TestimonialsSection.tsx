"use client";

import { testimonials } from "@/lib/data";
import TestimonialCard from "@/components/TestimonialCard";
import { useInView } from "@/lib/useInView";

export default function TestimonialsSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section className="py-24 md:py-32 px-6 md:px-10 border-t border-white-10">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="font-heading font-black text-2xl md:text-4xl mb-12 md:mb-16">
          What Sets Us Apart
        </h2>
        <div
          ref={ref}
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children`}
        >
          {testimonials.map((t) => (
            <div
              key={t.author}
              className={`fade-in-up ${inView ? "in-view" : ""}`}
            >
              <TestimonialCard testimonial={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
