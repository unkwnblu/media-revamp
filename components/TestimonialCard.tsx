"use client";

import { forwardRef } from "react";
import type { Testimonial } from "@/lib/data";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = forwardRef<HTMLDivElement, TestimonialCardProps>(
  function TestimonialCard({ testimonial }, ref) {
    return (
      <div
        ref={ref}
        className="border border-white-10 p-8 md:p-10 flex flex-col justify-between"
      >
        <div>
          <span className="text-4xl font-heading font-black opacity-20">
            &ldquo;
          </span>
          <p className="text-sm md:text-base leading-relaxed font-body font-medium normal-case mt-2">
            {testimonial.quote}
          </p>
        </div>
        <p className="mt-6 text-xs tracking-widest opacity-60">
          — {testimonial.author}
        </p>
      </div>
    );
  }
);

export default TestimonialCard;
