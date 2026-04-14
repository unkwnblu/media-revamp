"use client";

import { forwardRef } from "react";
import type { Service } from "@/lib/data";

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard = forwardRef<HTMLDivElement, ServiceCardProps>(
  function ServiceCard({ service, index }, ref) {
    return (
      <div ref={ref} className="border-t border-white-10 pt-6 pb-8">
        <span className="text-xs tracking-widest opacity-40 font-body">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="font-heading font-black text-lg md:text-xl mt-3 mb-4">
          {service.title}
        </h3>
        <p className="text-xs md:text-sm leading-relaxed font-body font-medium opacity-70 normal-case">
          {service.description}
        </p>
      </div>
    );
  }
);

export default ServiceCard;
