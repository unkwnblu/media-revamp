"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  RiDashboardLine,
  RiFolderVideoLine,
  RiUserStarLine,
  RiCalendarEventLine,
  RiChatQuoteLine,
  RiServiceLine,
  RiArrowLeftSLine,
  RiExternalLinkLine,
} from "react-icons/ri";

const navItems = [
  { label: "Dashboard",    href: "/admin",              icon: RiDashboardLine },
  { label: "Projects",     href: "/admin/projects",     icon: RiFolderVideoLine },
  { label: "Artists",      href: "/admin/artists",      icon: RiUserStarLine },
  { label: "Events",       href: "/admin/events",       icon: RiCalendarEventLine },
  { label: "Testimonials", href: "/admin/testimonials", icon: RiChatQuoteLine },
  { label: "Services",     href: "/admin/services",     icon: RiServiceLine },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: Props) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <aside
      className={`
        fixed top-0 left-0 h-full z-30 w-64 flex flex-col bg-[#0d0d1a] border-r border-white/[0.06]
        transition-transform duration-300 ease-in-out
        lg:static lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-5 border-b border-white/[0.06] shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-[10px] font-black tracking-tight">A1</span>
          </div>
          <div>
            <p className="text-sm font-bold leading-none tracking-wide">A1 Media</p>
            <p className="text-[10px] text-white/40 mt-0.5 tracking-wider">Admin Portal</p>
          </div>
        </div>
        {/* Close on mobile */}
        <button onClick={onClose} className="lg:hidden text-white/40 hover:text-white transition-colors">
          <RiArrowLeftSLine size={20} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <p className="text-[10px] tracking-[0.2em] text-white/25 px-3 mb-3">NAVIGATION</p>
        <ul className="space-y-0.5">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = isActive(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group ${
                    active
                      ? "bg-gradient-to-r from-purple-500/20 to-pink-500/10 text-white border border-purple-500/20"
                      : "text-white/50 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <Icon
                    size={18}
                    className={active ? "text-purple-400" : "text-white/40 group-hover:text-white/70"}
                  />
                  <span className="font-medium">{label}</span>
                  {active && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-3 pb-4 pt-2 border-t border-white/[0.06] shrink-0">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:text-white hover:bg-white/[0.04] transition-all duration-200 group"
        >
          <RiExternalLinkLine size={18} className="group-hover:text-purple-400 transition-colors" />
          <span>View Live Site</span>
        </Link>
      </div>
    </aside>
  );
}
