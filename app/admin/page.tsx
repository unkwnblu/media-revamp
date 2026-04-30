"use client";

import Link from "next/link";
import { projects, artists, events, testimonials, services } from "@/lib/data";
import ToastTest from "./components/ToastTest";
import {
  RiFolderVideoLine,
  RiUserStarLine,
  RiCalendarEventLine,
  RiChatQuoteLine,
  RiServiceLine,
  RiArrowRightSLine,
  RiAddLine,
} from "react-icons/ri";

const stats = [
  {
    label: "Projects",
    value: projects.length,
    icon: RiFolderVideoLine,
    href: "/admin/projects",
    color: "from-purple-500 to-blue-500",
  },
  {
    label: "Artists",
    value: artists.length,
    icon: RiUserStarLine,
    href: "/admin/artists",
    color: "from-pink-500 to-rose-500",
  },
  {
    label: "Events",
    value: events.length,
    icon: RiCalendarEventLine,
    href: "/admin/events",
    color: "from-amber-500 to-orange-500",
  },
  {
    label: "Testimonials",
    value: testimonials.length,
    icon: RiChatQuoteLine,
    href: "/admin/testimonials",
    color: "from-emerald-500 to-teal-500",
  },
  {
    label: "Services",
    value: services.length,
    icon: RiServiceLine,
    href: "/admin/services",
    color: "from-violet-500 to-purple-500",
  },
];

const quickActions = [
  { label: "Add Project",     href: "/admin/projects/new",     color: "from-purple-500 to-blue-500" },
  { label: "Add Artist",      href: "/admin/artists/new",      color: "from-pink-500 to-rose-500" },
  { label: "Add Event",       href: "/admin/events/new",       color: "from-amber-500 to-orange-500" },
  { label: "Add Testimonial", href: "/admin/testimonials/new", color: "from-emerald-500 to-teal-500" },
];

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-bold">Welcome back 👋</h2>
          <p className="text-white/40 text-sm mt-1">Here's an overview of your content.</p>
        </div>
        <ToastTest />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map(({ label, value, icon: Icon, href, color }) => (
          <Link
            key={label}
            href={href}
            className="group relative p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-200 overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-300`} />
            <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
              <Icon size={18} className="text-white" />
            </div>
            <p className="text-2xl font-black">{value}</p>
            <p className="text-xs text-white/40 mt-1 tracking-wide">{label}</p>
            <RiArrowRightSLine size={16} className="absolute top-4 right-4 text-white/20 group-hover:text-white/50 transition-colors" />
          </Link>
        ))}
      </div>

      {/* Quick actions + Recent content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick actions */}
        <div className="lg:col-span-1">
          <h3 className="text-sm font-semibold text-white/60 tracking-widest uppercase mb-4">Quick Add</h3>
          <div className="space-y-2">
            {quickActions.map(({ label, href, color }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-200 group"
              >
                <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center shrink-0`}>
                  <RiAddLine size={14} />
                </div>
                <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">{label}</span>
                <RiArrowRightSLine size={15} className="ml-auto text-white/20 group-hover:text-white/50 transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        {/* Recent projects */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white/60 tracking-widest uppercase">Recent Projects</h3>
            <Link href="/admin/projects" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
              View all →
            </Link>
          </div>
          <div className="rounded-xl border border-white/[0.06] overflow-hidden">
            {projects.slice(0, 4).map((project, i) => (
              <div
                key={project.id}
                className={`flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.03] transition-colors ${
                  i < 3 ? "border-b border-white/[0.04]" : ""
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center shrink-0">
                  <RiFolderVideoLine size={15} className="text-purple-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{project.title}</p>
                  <p className="text-xs text-white/40">{project.category} · {project.year}</p>
                </div>
                <Link
                  href={`/admin/projects/${project.id}`}
                  className="text-xs text-white/30 hover:text-purple-400 transition-colors shrink-0"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent artists + events side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Artists */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white/60 tracking-widest uppercase">Artists</h3>
            <Link href="/admin/artists" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
              View all →
            </Link>
          </div>
          <div className="rounded-xl border border-white/[0.06] overflow-hidden">
            {artists.slice(0, 3).map((artist, i) => (
              <div
                key={artist.id}
                className={`flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.03] transition-colors ${
                  i < 2 ? "border-b border-white/[0.04]" : ""
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/30 to-rose-500/30 flex items-center justify-center shrink-0">
                  <RiUserStarLine size={15} className="text-pink-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{artist.name}</p>
                  <p className="text-xs text-white/40">{artist.genre}</p>
                </div>
                <Link href={`/admin/artists/${artist.id}`} className="text-xs text-white/30 hover:text-purple-400 transition-colors">Edit</Link>
              </div>
            ))}
          </div>
        </div>

        {/* Events */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white/60 tracking-widest uppercase">Events</h3>
            <Link href="/admin/events" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
              View all →
            </Link>
          </div>
          <div className="rounded-xl border border-white/[0.06] overflow-hidden">
            {events.map((event, i) => (
              <div
                key={event.id}
                className={`flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.03] transition-colors ${
                  i < events.length - 1 ? "border-b border-white/[0.04]" : ""
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/30 to-orange-500/30 flex items-center justify-center shrink-0">
                  <RiCalendarEventLine size={15} className="text-amber-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{event.title}</p>
                  <p className="text-xs text-white/40">{event.tagline}</p>
                </div>
                <Link href={`/admin/events/${event.id}`} className="text-xs text-white/30 hover:text-purple-400 transition-colors">Edit</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
