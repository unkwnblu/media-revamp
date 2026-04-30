"use client";

import { usePathname } from "next/navigation";
import { RiMenuLine, RiBellLine, RiSearchLine } from "react-icons/ri";

const pageTitles: Record<string, string> = {
  "/admin":              "Dashboard",
  "/admin/projects":     "Projects",
  "/admin/projects/new": "New Project",
  "/admin/artists":      "Artists",
  "/admin/artists/new":  "New Artist",
  "/admin/events":       "Events",
  "/admin/events/new":   "New Event",
  "/admin/testimonials": "Testimonials",
  "/admin/testimonials/new": "New Testimonial",
  "/admin/services":     "Services",
};

interface Props {
  onMenuClick: () => void;
}

export default function AdminHeader({ onMenuClick }: Props) {
  const pathname = usePathname();

  const title =
    pageTitles[pathname] ??
    (pathname.includes("/edit") ? "Edit" : "Admin");

  return (
    <header className="h-16 shrink-0 flex items-center justify-between gap-4 px-6 border-b border-white/[0.06] bg-[#08080f]">
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuClick}
          className="lg:hidden text-white/50 hover:text-white transition-colors"
        >
          <RiMenuLine size={20} />
        </button>
        <h1 className="font-bold text-base md:text-lg tracking-wide">{title}</h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-1.5 text-sm text-white/40 w-48">
          <RiSearchLine size={15} />
          <span className="text-xs">Search…</span>
        </div>

        {/* Bell */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/50 hover:text-white transition-colors">
          <RiBellLine size={17} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-pink-500" />
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-black">
          A1
        </div>
      </div>
    </header>
  );
}
