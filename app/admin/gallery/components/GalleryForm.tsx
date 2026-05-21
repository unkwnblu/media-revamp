"use client";

import { useState } from "react";
import Link from "next/link";
import { RiArrowLeftLine, RiSaveLine, RiLoader4Line, RiYoutubeLine } from "react-icons/ri";
import { createGalleryVideo, updateGalleryVideo } from "../actions";

interface DBVideo {
  id: string;
  category: string;
  title: string;
  youtube_url: string;
  sort_order: number;
}

interface Props {
  isEdit?: boolean;
  video?: DBVideo;
}

const CATEGORIES = [
  { value: "backstage",          label: "Backstage" },
  { value: "studio",             label: "Studio" },
  { value: "campaigns",          label: "Campaigns" },
  { value: "music-videos",       label: "Music Videos" },
  { value: "brand-activations",  label: "Brand Activations" },
];

function extractEmbedUrl(input: string): string {
  const raw = input.trim();

  // 1. Full <iframe> snippet — pull the src attribute
  const srcMatch = raw.match(/src="([^"]+)"/);
  if (srcMatch) return srcMatch[1];

  // 2. Already an embed URL
  if (raw.includes("youtube.com/embed/")) return raw;

  // 3. youtu.be/VIDEO_ID shortlink
  const shortMatch = raw.match(/youtu\.be\/([A-Za-z0-9_-]{11})/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;

  // 4. youtube.com/watch?v=VIDEO_ID (with optional &si= or other params)
  const watchMatch = raw.match(/[?&]v=([A-Za-z0-9_-]{11})/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;

  // 5. youtube.com/shorts/VIDEO_ID
  const shortsMatch = raw.match(/youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/);
  if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}`;

  // Fallback — return as-is
  return raw;
}

export default function GalleryForm({ isEdit = false, video }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rawInput, setRawInput] = useState(video?.youtube_url ?? "");
  const [preview, setPreview] = useState(video?.youtube_url ?? "");

  const handleInput = (val: string) => {
    setRawInput(val);
    setPreview(extractEmbedUrl(val));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      // Override youtube_url with the cleaned embed URL
      formData.set("youtube_url", extractEmbedUrl(rawInput));

      if (isEdit && video) {
        await updateGalleryVideo(video.id, formData);
      } else {
        await createGalleryVideo(formData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        href="/admin/gallery"
        className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
      >
        <RiArrowLeftLine size={15} /> Back to Gallery
      </Link>

      <form onSubmit={handleSubmit} className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/[0.06]">
          <h1 className="text-base font-semibold text-white mb-0.5">
            {isEdit ? "Edit Video" : "Add Video"}
          </h1>
          <p className="text-sm text-white/50">
            {isEdit ? "Update the video details." : "Add a YouTube video to a gallery section."}
          </p>
        </div>

        <div className="px-6 py-6 space-y-5">

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">
              Section <span className="text-pink-400">*</span>
            </label>
            <select
              name="category"
              defaultValue={video?.category ?? ""}
              required
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-purple-400/50 focus:bg-white/[0.06] transition-all"
            >
              <option value="" disabled className="bg-[#0d0d1a]">Choose a section…</option>
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value} className="bg-[#0d0d1a]">{c.label}</option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">Title</label>
            <input
              type="text"
              name="title"
              defaultValue={video?.title}
              placeholder="e.g. V5 After Party"
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-purple-400/50 focus:bg-white/[0.06] transition-all"
            />
          </div>

          {/* YouTube URL / iframe */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">
              <span className="inline-flex items-center gap-1.5">
                <RiYoutubeLine size={15} className="text-red-400" /> YouTube Embed
              </span>
              <span className="text-pink-400"> *</span>
            </label>
            <textarea
              rows={3}
              value={rawInput}
              onChange={(e) => handleInput(e.target.value)}
              placeholder='e.g. https://youtu.be/abc123 or https://www.youtube.com/watch?v=abc123'
              required
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-purple-400/50 focus:bg-white/[0.06] transition-all resize-none font-mono"
            />
            <p className="text-xs text-white/30 mt-1.5">
              Accepts any YouTube format — share link, <code className="text-purple-400">youtu.be/…</code>, <code className="text-purple-400">watch?v=…</code>, embed URL, or the full <code className="text-purple-400">&lt;iframe&gt;</code> snippet.
            </p>
          </div>

          {/* Preview */}
          {preview && (
            <div>
              <p className="text-xs text-white/40 mb-2">Preview</p>
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/[0.08]">
                <iframe
                  src={preview}
                  title="preview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>
            </div>
          )}

          {/* Sort order */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">Sort Order</label>
            <input
              type="number"
              name="sort_order"
              defaultValue={video?.sort_order ?? 0}
              min={0}
              className="w-32 bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-purple-400/50 focus:bg-white/[0.06] transition-all"
            />
            <p className="text-xs text-white/30 mt-1.5">Lower numbers appear first.</p>
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
          <Link
            href="/admin/gallery"
            className="px-4 py-2 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/[0.04] transition-all"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? <><RiLoader4Line size={15} className="animate-spin" />{isEdit ? "Saving…" : "Adding…"}</>
              : <><RiSaveLine size={15} />{isEdit ? "Save Changes" : "Add Video"}</>}
          </button>
        </div>
      </form>
    </div>
  );
}
