"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  RiSearchLine,
  RiFolderVideoLine,
  RiUserStarLine,
  RiCalendarEventLine,
  RiChatQuoteLine,
  RiLoaderLine,
} from "react-icons/ri";

interface Result {
  id: string;
  label: string;
  sub: string;
  href: string;
  icon: React.ElementType;
  color: string;
}

export default function AdminSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const search = useCallback(async (q: string) => {
    if (!q.trim()) { setResults([]); setOpen(false); return; }
    setLoading(true);
    const supabase = createClient();
    const like = `%${q}%`;

    const [{ data: projects }, { data: artists }, { data: events }, { data: testimonials }] =
      await Promise.all([
        supabase.from("projects").select("id, title, category").ilike("title", like).limit(3),
        supabase.from("artists").select("id, name, genre").ilike("name", like).limit(3),
        supabase.from("events").select("id, title, tagline").ilike("title", like).limit(3),
        supabase.from("testimonials").select("id, author, quote").ilike("author", like).limit(3),
      ]);

    const mapped: Result[] = [
      ...(projects ?? []).map((p) => ({
        id: `project-${p.id}`,
        label: p.title,
        sub: p.category ?? "Project",
        href: `/admin/projects/${p.id}`,
        icon: RiFolderVideoLine,
        color: "text-purple-400",
      })),
      ...(artists ?? []).map((a) => ({
        id: `artist-${a.id}`,
        label: a.name,
        sub: a.genre ?? "Artist",
        href: `/admin/artists/${a.id}`,
        icon: RiUserStarLine,
        color: "text-pink-400",
      })),
      ...(events ?? []).map((e) => ({
        id: `event-${e.id}`,
        label: e.title,
        sub: e.tagline ?? "Event",
        href: `/admin/events/${e.id}`,
        icon: RiCalendarEventLine,
        color: "text-amber-400",
      })),
      ...(testimonials ?? []).map((t) => ({
        id: `testimonial-${t.id}`,
        label: t.author,
        sub: (t.quote as string).slice(0, 40) + "…",
        href: `/admin/testimonials/${t.id}`,
        icon: RiChatQuoteLine,
        color: "text-emerald-400",
      })),
    ];

    setResults(mapped);
    setOpen(true);
    setActiveIdx(-1);
    setLoading(false);
  }, []);

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => search(query), 250);
    return () => clearTimeout(timer);
  }, [query, search]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Keyboard shortcut: Cmd/Ctrl + K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(query.trim().length > 0);
      }
      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [query]);

  const navigate = (href: string) => {
    setOpen(false);
    setQuery("");
    router.push(href);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter" && activeIdx >= 0) {
      e.preventDefault();
      navigate(results[activeIdx].href);
    }
  };

  return (
    <div ref={containerRef} className="relative hidden md:block">
      <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-1.5 w-56 focus-within:border-purple-500/40 focus-within:bg-white/[0.06] transition-all">
        {loading
          ? <RiLoaderLine size={15} className="text-white/40 animate-spin shrink-0" />
          : <RiSearchLine size={15} className="text-white/40 shrink-0" />
        }
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search…"
          className="bg-transparent text-xs text-white/80 placeholder:text-white/30 outline-none w-full"
        />
        {!query && (
          <kbd className="hidden lg:inline-flex items-center text-[9px] text-white/20 border border-white/10 rounded px-1 py-0.5 font-mono shrink-0">
            ⌘K
          </kbd>
        )}
        {query && (
          <button
            onClick={() => { setQuery(""); setOpen(false); inputRef.current?.focus(); }}
            className="text-white/30 hover:text-white/60 transition-colors text-xs shrink-0"
          >
            ✕
          </button>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full mt-2 left-0 w-80 rounded-xl border border-white/[0.08] bg-[#0d0d1a] shadow-2xl shadow-black/60 z-50 overflow-hidden">
          {results.length === 0 ? (
            <p className="text-xs text-white/30 px-4 py-3">No results for &ldquo;{query}&rdquo;</p>
          ) : (
            <ul>
              {results.map((r, i) => {
                const Icon = r.icon;
                return (
                  <li key={r.id}>
                    <button
                      onClick={() => navigate(r.href)}
                      onMouseEnter={() => setActiveIdx(i)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                        i === activeIdx ? "bg-white/[0.06]" : "hover:bg-white/[0.04]"
                      }`}
                    >
                      <Icon size={15} className={`shrink-0 ${r.color}`} />
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-white truncate">{r.label}</p>
                        <p className="text-[10px] text-white/35 truncate">{r.sub}</p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
