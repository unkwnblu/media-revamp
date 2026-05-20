"use client";

import { usePathname, useRouter } from "next/navigation";
import { RiMenuLine, RiLogoutBoxLine } from "react-icons/ri";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "./components/Toast";
import AdminSearch from "./components/AdminSearch";

const pageTitles: Record<string, string> = {
  "/admin":                  "Dashboard",
  "/admin/projects":         "Projects",
  "/admin/projects/new":     "New Project",
  "/admin/artists":          "Artists",
  "/admin/artists/new":      "New Artist",
  "/admin/events":           "Events",
  "/admin/events/new":       "New Event",
  "/admin/testimonials":     "Testimonials",
  "/admin/testimonials/new": "New Testimonial",
};

interface Props {
  onMenuClick: () => void;
}

export default function AdminHeader({ onMenuClick }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { showToast } = useToast();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    showToast("You've been signed out successfully.", "info");
    setTimeout(() => router.push("/admin/login"), 800);
  };

  const title =
    pageTitles[pathname] ??
    (pathname.includes("/edit") ? "Edit" : "Admin");

  return (
    <header className="h-16 shrink-0 flex items-center justify-between gap-4 px-6 border-b border-white/[0.06] bg-[#08080f]">
      {/* Left */}
      <div className="flex items-center gap-4">
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
        <AdminSearch />

        <button
          onClick={handleSignOut}
          title="Sign out"
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/40 hover:text-red-400 hover:bg-red-400/10 hover:border-red-400/20 transition-all"
        >
          <RiLogoutBoxLine size={17} />
        </button>
      </div>
    </header>
  );
}
