"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  RiArrowLeftLine, RiSaveLine, RiLoader4Line, RiUploadCloud2Line,
  RiCloseLine, RiImageLine, RiAddLine, RiDeleteBinLine, RiCalendarLine,
  RiRepeatLine, RiGalleryLine, RiLinkM, RiInstagramLine, RiTwitterXLine,
  RiTiktokLine, RiFacebookBoxLine,
} from "react-icons/ri";
import { createEvent, updateEvent } from "../actions";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DBEvent {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  slug: string;
  is_recurring: boolean;
  date: string | null;
  venue: string | null;
  time: string | null;
  ticket_price: string | null;
  ticket_link: string | null;
  instagram: string | null;
  twitter: string | null;
  tiktok: string | null;
  facebook: string | null;
}

interface DBSession {
  name: string;
  date: string;
  venue: string;
  time: string;
  ticket_price: string;
  ticket_link: string;
  is_upcoming: boolean;
  sort_order: number;
  thumbnail: string;
  images: string[];
}

interface GalleryItem {
  url: string;       // existing URL (empty for new)
  file: File | null; // new file to upload
  preview: string;   // blob URL or existing URL for display
}

interface SessionLocal extends Omit<DBSession, "images"> {
  thumbnailPreview: string | null;
  thumbnailFile: File | null;
  gallery: GalleryItem[]; // all images: existing + new
}

interface EventFormProps {
  isEdit?: boolean;
  event?: DBEvent;
  sessions?: DBSession[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugify(val: string) {
  return val.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
}

function dbSessionToLocal(s: DBSession, i: number): SessionLocal {
  return {
    ...s,
    sort_order: i,
    thumbnailPreview: s.thumbnail || null,
    thumbnailFile: null,
    gallery: (s.images ?? []).map((url) => ({ url, file: null, preview: url })),
  };
}

function emptySession(i: number): SessionLocal {
  return {
    name: "", date: "", venue: "", time: "", ticket_price: "", ticket_link: "",
    is_upcoming: false, sort_order: i,
    thumbnail: "", thumbnailPreview: null, thumbnailFile: null,
    gallery: [],
  };
}

// ─── Session thumbnail picker ─────────────────────────────────────────────────

function ThumbnailPicker({
  preview, onFile, onRemove,
}: { preview: string | null; onFile: (f: File) => void; onRemove: () => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handle = (f: File) => { if (f.type.startsWith("image/")) onFile(f); };

  return (
    <div>
      <label className="block text-xs text-white/50 mb-1.5">Thumbnail</label>
      {preview ? (
        <div className="relative group w-32 aspect-square rounded-lg overflow-hidden border border-purple-400/20">
          <Image src={preview} alt="thumb" fill className="object-cover" unoptimized />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5">
            <button type="button" onClick={() => ref.current?.click()}
              className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-[11px] transition-colors">Change</button>
            <button type="button" onClick={onRemove}
              className="px-2 py-1 rounded bg-red-500/20 hover:bg-red-500/40 text-red-300 text-[11px] transition-colors">Remove</button>
          </div>
          <button type="button" onClick={onRemove}
            className="absolute top-1 right-1 p-0.5 rounded-full bg-black/70 hover:bg-red-500/80 text-white/70 hover:text-white transition-all">
            <RiCloseLine size={11} />
          </button>
        </div>
      ) : (
        <div
          onClick={() => ref.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handle(f); }}
          className={`w-32 aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all ${
            dragging ? "border-purple-400/70 bg-purple-400/10" : "border-white/10 hover:border-purple-400/30 hover:bg-white/[0.02]"
          }`}
        >
          {dragging
            ? <RiUploadCloud2Line size={18} className="text-purple-300" />
            : <RiImageLine size={18} className="text-white/30" />}
          <span className="text-[10px] text-white/30 text-center leading-tight">Click or<br />drag & drop</span>
        </div>
      )}
      <input ref={ref} type="file" accept="image/*" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handle(f); }} />
    </div>
  );
}

// ─── Session gallery editor ───────────────────────────────────────────────────

function GalleryEditor({
  items, onAdd, onRemove,
}: { items: GalleryItem[]; onAdd: (files: File[]) => void; onRemove: (i: number) => void }) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs text-white/50 flex items-center gap-1.5">
          <RiGalleryLine size={11} /> Gallery
          {items.length > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-medium">
              {items.length}
            </span>
          )}
        </label>
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/[0.04] hover:bg-white/[0.08] text-white/50 hover:text-white text-[11px] transition-colors"
        >
          <RiAddLine size={11} /> Add Photos
        </button>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-4 gap-1.5">
          {items.map((item, i) => (
            <div key={i} className="relative group aspect-square rounded-md overflow-hidden border border-white/[0.06]">
              <Image src={item.preview} alt={`img-${i}`} fill className="object-cover" unoptimized />
              <button
                type="button"
                onClick={() => onRemove(i)}
                className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <RiDeleteBinLine size={14} className="text-red-400" />
              </button>
            </div>
          ))}
          {/* Add more tile */}
          <div
            onClick={() => ref.current?.click()}
            className="aspect-square rounded-md border-2 border-dashed border-white/10 hover:border-purple-400/30 flex items-center justify-center cursor-pointer transition-colors group"
          >
            <RiAddLine size={16} className="text-white/20 group-hover:text-purple-400 transition-colors" />
          </div>
        </div>
      ) : (
        <div
          onClick={() => ref.current?.click()}
          className="flex items-center gap-3 h-14 rounded-lg border border-dashed border-white/10 hover:border-purple-400/30 px-4 cursor-pointer transition-colors group"
        >
          <RiGalleryLine size={15} className="text-white/20 group-hover:text-purple-400 transition-colors" />
          <span className="text-xs text-white/30 group-hover:text-white/50 transition-colors">
            No gallery photos yet — click to add
          </span>
        </div>
      )}

      <input
        ref={ref} type="file" accept="image/*" multiple className="hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          if (files.length) onAdd(files);
          e.target.value = "";
        }}
      />
    </div>
  );
}

// ─── Main form ────────────────────────────────────────────────────────────────

export default function EventForm({ isEdit = false, event, sessions: initialSessions = [] }: EventFormProps) {
  const coverInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(event?.image || null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isRecurring, setIsRecurring] = useState(event?.is_recurring ?? false);
  const [sessions, setSessions] = useState<SessionLocal[]>(
    initialSessions.map((s, i) => dbSessionToLocal(s, i))
  );
  const [expandedSession, setExpandedSession] = useState<number | null>(null);

  // ── Cover image ──
  const handleCoverFile = (f: File) => {
    if (!f.type.startsWith("image/")) return;
    setCoverFile(f);
    setPreview(URL.createObjectURL(f));
  };

  // ── Session helpers ──
  const addSession = () => {
    const next = [...sessions, emptySession(sessions.length)];
    setSessions(next);
    setExpandedSession(next.length - 1);
  };

  const removeSession = (i: number) => {
    setSessions(sessions.filter((_, idx) => idx !== i));
    setExpandedSession(null);
  };

  const updateSession = <K extends keyof SessionLocal>(i: number, field: K, value: SessionLocal[K]) => {
    setSessions(sessions.map((s, idx) => idx === i ? { ...s, [field]: value } : s));
  };

  const setSessionThumbnail = (i: number, f: File) => {
    setSessions(sessions.map((s, idx) =>
      idx === i ? { ...s, thumbnailFile: f, thumbnailPreview: URL.createObjectURL(f), thumbnail: "" } : s
    ));
  };

  const removeSessionThumbnail = (i: number) => {
    setSessions(sessions.map((s, idx) =>
      idx === i ? { ...s, thumbnailFile: null, thumbnailPreview: null, thumbnail: "" } : s
    ));
  };

  const addGalleryFiles = (i: number, files: File[]) => {
    const newItems: GalleryItem[] = files
      .filter((f) => f.type.startsWith("image/"))
      .map((f) => ({ url: "", file: f, preview: URL.createObjectURL(f) }));
    setSessions(sessions.map((s, idx) =>
      idx === i ? { ...s, gallery: [...s.gallery, ...newItems] } : s
    ));
  };

  const removeGalleryItem = (sessionIdx: number, itemIdx: number) => {
    setSessions(sessions.map((s, idx) =>
      idx === sessionIdx
        ? { ...s, gallery: s.gallery.filter((_, gi) => gi !== itemIdx) }
        : s
    ));
  };

  // ── Submit ──
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      if (coverFile) formData.set("imageFile", coverFile);
      formData.set("is_recurring", isRecurring ? "true" : "false");

      if (isRecurring) {
        sessions.forEach((s, i) => {
          // Thumbnail file
          if (s.thumbnailFile) formData.set(`session_thumbnail_${i}`, s.thumbnailFile);
          // New gallery files
          s.gallery.forEach((item) => {
            if (item.file) formData.append(`session_images_${i}`, item.file);
          });
        });

        // Serialize sessions (DB fields only, existing URLs only)
        const payload = sessions.map(({ thumbnailFile: _tf, thumbnailPreview: _tp, gallery, thumbnail, ...rest }) => ({
          ...rest,
          thumbnail,                                           // existing URL (empty if new file coming)
          images: gallery.filter((g) => !g.file).map((g) => g.url), // keep only existing (not new uploads)
        }));
        formData.set("sessions", JSON.stringify(payload));
      }

      if (isEdit && event) {
        formData.set("existingImage", event.image ?? "");
        await updateEvent(event.id, formData);
      } else {
        await createEvent(formData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link href="/admin/events"
        className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors">
        <RiArrowLeftLine size={15} /> Back to Events
      </Link>

      <form onSubmit={handleSubmit} className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/[0.06]">
          <h1 className="text-base font-semibold text-white mb-0.5">{isEdit ? "Edit Event" : "New Event"}</h1>
          <p className="text-sm text-white/50">
            {isEdit ? "Update the event details below." : "Fill in the details to create a new event."}
          </p>
        </div>

        <div className="px-6 py-6 space-y-5">

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-3">Cover Image</label>
            {preview ? (
              <div className="relative group w-full aspect-[16/7] rounded-xl overflow-hidden border border-purple-400/30">
                <Image src={preview} alt="Preview" fill className="object-cover" unoptimized={!!coverFile} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                  <button type="button" onClick={() => coverInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs transition-colors">Change</button>
                  <button type="button" onClick={() => { setPreview(null); setCoverFile(null); }}
                    className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-300 text-xs transition-colors">Remove</button>
                </div>
                <button type="button" onClick={() => { setPreview(null); setCoverFile(null); }}
                  className="absolute top-2 right-2 p-1 rounded-full bg-black/60 hover:bg-red-500/80 text-white/70 hover:text-white transition-all">
                  <RiCloseLine size={14} />
                </button>
              </div>
            ) : (
              <div
                onClick={() => coverInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f) handleCoverFile(f); }}
                className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-10 cursor-pointer transition-all duration-200 ${
                  isDragging ? "border-purple-400/80 bg-purple-400/10" : "border-white/10 hover:border-purple-400/40 hover:bg-white/[0.02]"
                }`}
              >
                <div className={`p-3 rounded-full ${isDragging ? "bg-purple-400/20" : "bg-white/[0.04]"}`}>
                  {isDragging ? <RiUploadCloud2Line size={22} className="text-purple-300" /> : <RiImageLine size={22} className="text-white/40" />}
                </div>
                <div className="text-center">
                  <p className="text-sm text-white/60"><span className="text-purple-400 font-medium">Click to browse</span> or drag & drop</p>
                  <p className="text-xs text-white/30 mt-1">PNG, JPG, WEBP up to 10MB</p>
                </div>
              </div>
            )}
            <input ref={coverInputRef} type="file" accept="image/*" className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleCoverFile(f); }} />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">Title <span className="text-pink-400">*</span></label>
            <input type="text" name="title" defaultValue={event?.title}
              placeholder="e.g. Amapiano Left and Right" required
              onChange={(e) => {
                if (!isEdit) {
                  const slugEl = document.querySelector<HTMLInputElement>('input[name="slug"]');
                  if (slugEl && !slugEl.dataset.touched) slugEl.value = slugify(e.target.value);
                }
              }}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-purple-400/50 focus:bg-white/[0.06] transition-all" />
          </div>

          {/* Tagline */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">Tagline <span className="text-pink-400">*</span></label>
            <input type="text" name="tagline" defaultValue={event?.tagline}
              placeholder="e.g. Back to the Groove" required
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-purple-400/50 focus:bg-white/[0.06] transition-all" />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">Slug <span className="text-pink-400">*</span></label>
            <input type="text" name="slug" defaultValue={event?.slug}
              placeholder="e.g. amapiano-left-and-right" required
              onInput={(e) => { (e.target as HTMLInputElement).dataset.touched = "1"; }}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-purple-400/50 focus:bg-white/[0.06] transition-all font-mono" />
            <p className="text-xs text-white/30 mt-1.5">URL-friendly identifier. Auto-filled from title.</p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">Description <span className="text-pink-400">*</span></label>
            <textarea name="description" defaultValue={event?.description}
              placeholder="Describe the event…" required rows={4}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-purple-400/50 focus:bg-white/[0.06] transition-all resize-none" />
          </div>

          {/* Recurring toggle */}
          <div className="border-t border-white/[0.06] pt-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/70">Recurring Event</p>
                <p className="text-xs text-white/30 mt-0.5">
                  {isRecurring ? "This event runs multiple sessions or seasons." : "This is a one-time event."}
                </p>
              </div>
              <button type="button" onClick={() => setIsRecurring(!isRecurring)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${isRecurring ? "bg-purple-500" : "bg-white/10"}`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${isRecurring ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>
            <div className="mt-3">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${isRecurring ? "bg-purple-500/15 text-purple-300" : "bg-pink-500/15 text-pink-300"}`}>
                {isRecurring ? <><RiRepeatLine size={11} /> Recurring</> : <><RiCalendarLine size={11} /> Single Event</>}
              </span>
            </div>
          </div>

          {/* ── Single event fields ── */}
          {!isRecurring && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">Date</label>
                <input type="text" name="date" defaultValue={event?.date ?? ""} placeholder="e.g. Saturday, May 31st"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-purple-400/50 focus:bg-white/[0.06] transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">Venue</label>
                <input type="text" name="venue" defaultValue={event?.venue ?? ""} placeholder="e.g. The Clubhouse, VI"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-purple-400/50 focus:bg-white/[0.06] transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">Time</label>
                <input type="text" name="time" defaultValue={event?.time ?? ""} placeholder="e.g. 10PM till late"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-purple-400/50 focus:bg-white/[0.06] transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">Ticket Price</label>
                <input type="text" name="ticket_price" defaultValue={event?.ticket_price ?? ""} placeholder="e.g. ₦10,000"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-purple-400/50 focus:bg-white/[0.06] transition-all" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-white/70 mb-1.5">
                  <span className="inline-flex items-center gap-1.5"><RiLinkM size={14} className="text-purple-400" /> Ticket Link</span>
                </label>
                <input type="url" name="ticket_link" defaultValue={event?.ticket_link ?? ""} placeholder="https://paystack.com/buy/..."
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-purple-400/50 focus:bg-white/[0.06] transition-all" />
                <p className="text-xs text-white/30 mt-1.5">Paystack, Eventbrite, or any external ticketing URL.</p>
              </div>
            </div>
          )}

          {/* ── Recurring sessions ── */}
          {isRecurring && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white/70">Sessions / Editions</p>
                <button type="button" onClick={addSession}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 text-xs font-medium transition-colors">
                  <RiAddLine size={13} /> Add Session
                </button>
              </div>

              {sessions.length === 0 && (
                <div className="rounded-lg border border-dashed border-white/10 px-4 py-6 text-center">
                  <p className="text-sm text-white/30">No sessions yet. Click &quot;Add Session&quot; to add the first one.</p>
                </div>
              )}

              <div className="space-y-2">
                {sessions.map((session, i) => (
                  <div key={i} className="rounded-lg border border-white/[0.06] bg-white/[0.02] overflow-hidden">

                    {/* Session header */}
                    <div
                      className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/[0.02] transition-colors"
                      onClick={() => setExpandedSession(expandedSession === i ? null : i)}
                    >
                      {session.thumbnailPreview ? (
                        <div className="w-8 h-8 rounded-md overflow-hidden shrink-0 relative border border-white/10">
                          <Image src={session.thumbnailPreview} alt={session.name} fill className="object-cover" unoptimized />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-md bg-purple-500/20 flex items-center justify-center shrink-0">
                          <span className="text-xs text-purple-300 font-bold">{i + 1}</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white/80 truncate">
                          {session.name || <span className="text-white/30 italic">Untitled session</span>}
                        </p>
                        {session.gallery.length > 0 && (
                          <p className="text-[10px] text-white/30 mt-0.5">{session.gallery.length} photo{session.gallery.length !== 1 ? "s" : ""}</p>
                        )}
                      </div>
                      {session.is_upcoming && (
                        <span className="px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 text-[10px] font-medium">Upcoming</span>
                      )}
                      <button type="button"
                        onClick={(e) => { e.stopPropagation(); removeSession(i); }}
                        className="p-1.5 rounded-lg hover:bg-red-500/20 text-white/30 hover:text-red-400 transition-colors">
                        <RiDeleteBinLine size={13} />
                      </button>
                    </div>

                    {/* Session expanded fields */}
                    {expandedSession === i && (
                      <div className="px-4 pb-4 space-y-4 border-t border-white/[0.06] pt-4">

                        {/* Images row: thumbnail + gallery */}
                        <div className="flex gap-4 items-start">
                          <ThumbnailPicker
                            preview={session.thumbnailPreview}
                            onFile={(f) => setSessionThumbnail(i, f)}
                            onRemove={() => removeSessionThumbnail(i)}
                          />
                          <div className="flex-1 min-w-0">
                            <GalleryEditor
                              items={session.gallery}
                              onAdd={(files) => addGalleryFiles(i, files)}
                              onRemove={(gi) => removeGalleryItem(i, gi)}
                            />
                          </div>
                        </div>

                        {/* Text fields grid */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="col-span-2">
                            <label className="block text-xs text-white/50 mb-1">Session Name <span className="text-pink-400">*</span></label>
                            <input type="text" value={session.name}
                              onChange={(e) => updateSession(i, "name", e.target.value)}
                              placeholder="e.g. Back to the Groove"
                              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 outline-none focus:border-purple-400/50 transition-all" />
                          </div>
                          <div>
                            <label className="block text-xs text-white/50 mb-1">Date</label>
                            <input type="text" value={session.date}
                              onChange={(e) => updateSession(i, "date", e.target.value)}
                              placeholder="e.g. Saturday, May 31st"
                              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 outline-none focus:border-purple-400/50 transition-all" />
                          </div>
                          <div>
                            <label className="block text-xs text-white/50 mb-1">Venue</label>
                            <input type="text" value={session.venue}
                              onChange={(e) => updateSession(i, "venue", e.target.value)}
                              placeholder="e.g. The Clubhouse, VI"
                              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 outline-none focus:border-purple-400/50 transition-all" />
                          </div>
                          <div>
                            <label className="block text-xs text-white/50 mb-1">Time</label>
                            <input type="text" value={session.time}
                              onChange={(e) => updateSession(i, "time", e.target.value)}
                              placeholder="e.g. 10PM till late"
                              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 outline-none focus:border-purple-400/50 transition-all" />
                          </div>
                          <div>
                            <label className="block text-xs text-white/50 mb-1">Ticket Price</label>
                            <input type="text" value={session.ticket_price}
                              onChange={(e) => updateSession(i, "ticket_price", e.target.value)}
                              placeholder="e.g. ₦10,000"
                              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 outline-none focus:border-purple-400/50 transition-all" />
                          </div>
                          <div className="col-span-2">
                            <label className="block text-xs text-white/50 mb-1 inline-flex items-center gap-1">
                              <RiLinkM size={11} className="text-purple-400" /> Ticket Link
                            </label>
                            <input type="url" value={session.ticket_link}
                              onChange={(e) => updateSession(i, "ticket_link", e.target.value)}
                              placeholder="https://paystack.com/buy/..."
                              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 outline-none focus:border-purple-400/50 transition-all" />
                          </div>
                          <div className="col-span-2 flex items-center justify-between pt-1 border-t border-white/[0.04]">
                            <label className="text-xs text-white/50">Mark as upcoming session</label>
                            <button type="button"
                              onClick={() => updateSession(i, "is_upcoming", !session.is_upcoming)}
                              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 ${session.is_upcoming ? "bg-green-500" : "bg-white/10"}`}>
                              <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform duration-200 ${session.is_upcoming ? "translate-x-4" : "translate-x-0.5"}`} />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Media Links */}
          <div className="border-t border-white/[0.06] pt-5 space-y-3">
            <div>
              <p className="text-sm font-medium text-white/70">Social Media Links</p>
              <p className="text-xs text-white/30 mt-0.5">Optional links shown on the event page.</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                { name: "instagram", icon: RiInstagramLine, placeholder: "https://instagram.com/...", label: "Instagram", color: "text-pink-400" },
                { name: "twitter",   icon: RiTwitterXLine,  placeholder: "https://x.com/...",         label: "X / Twitter", color: "text-white/60" },
                { name: "tiktok",    icon: RiTiktokLine,    placeholder: "https://tiktok.com/@...",   label: "TikTok",     color: "text-white/60" },
                { name: "facebook",  icon: RiFacebookBoxLine, placeholder: "https://facebook.com/...", label: "Facebook",  color: "text-blue-400" },
              ].map(({ name, icon: Icon, placeholder, label, color }) => (
                <div key={name} className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 focus-within:border-purple-400/50 transition-all">
                  <Icon size={16} className={`shrink-0 ${color}`} />
                  <input
                    type="url"
                    name={name}
                    defaultValue={(event as Record<string, string | null> | undefined)?.[name] ?? ""}
                    placeholder={placeholder}
                    aria-label={label}
                    className="flex-1 bg-transparent text-sm text-white placeholder-white/25 outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <span>⚠</span> {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/[0.06] flex items-center justify-end gap-3">
          <Link href="/admin/events" className="px-4 py-2 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/[0.04] transition-all">
            Cancel
          </Link>
          <button type="submit" disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed">
            {isSubmitting
              ? <><RiLoader4Line size={15} className="animate-spin" />{isEdit ? "Saving…" : "Creating…"}</>
              : <><RiSaveLine size={15} />{isEdit ? "Save Changes" : "Create Event"}</>}
          </button>
        </div>
      </form>
    </div>
  );
}
