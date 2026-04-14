"use client";

import { services } from "@/lib/data";
import ServiceCard from "@/components/ServiceCard";
import { useInView } from "@/lib/useInView";

export default function ServicesGrid() {
  const { ref, inView } = useInView(0.1);

  return (
    <section className="py-24 md:py-32 px-6 md:px-10 border-t border-white-10">
      <div className="max-w-[1400px] mx-auto">
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 stagger-children"
        >
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`fade-in-up ${inView ? "in-view" : ""}`}
            >
              <ServiceCard service={service} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
