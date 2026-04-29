import type { Service } from "@/lib/data";

const accentGradients = [
  "from-purple-500 to-blue-500",
  "from-pink-500 to-rose-500",
  "from-amber-500 to-orange-500",
  "from-emerald-500 to-teal-500",
  "from-violet-500 to-purple-500",
  "from-blue-500 to-cyan-500",
];

interface ServiceCardProps {
  service: Service;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const accent = accentGradients[index % accentGradients.length];

  return (
    <div className="group relative p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 hover:-translate-y-1">
      {/* Top accent bar */}
      <div className={`w-10 h-1 rounded-full bg-gradient-to-r ${accent} mb-6`} />

      {/* Number */}
      <span className={`text-xs tracking-widest font-body bg-gradient-to-r ${accent} bg-clip-text text-transparent`}>
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Title */}
      <h3 className="font-heading font-black text-lg md:text-xl mt-3 mb-4">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-xs md:text-sm leading-relaxed font-body font-medium opacity-60 normal-case">
        {service.description}
      </p>

      {/* Hover glow */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${accent} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 pointer-events-none`} />
    </div>
  );
}
