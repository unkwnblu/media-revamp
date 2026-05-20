"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RiArrowLeftLine, RiSaveLine, RiLoader4Line, RiUploadCloud2Line, RiCloseLine, RiUserLine } from "react-icons/ri";
import { createArtist, updateArtist } from "../actions";

interface DBArtist {
  id: string;
  name: string;
  genre: string;
  image: string;
}

interface ArtistFormProps {
  isEdit?: boolean;
  artist?: DBArtist;
}

const GENRES = [
  "Afrobeats",
  "Afropop",
  "Afrorave",
  "Afrofusion",
  "Amapiano",
  "Hip Hop",
  "R&B",
  "Highlife",
  "Dancehall",
  "Gospel",
  "Other",
];

export default function ArtistForm({ isEdit = false, artist }: ArtistFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(artist?.image || null);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (f: File) => {
    if (!f.type.startsWith("image/")) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      if (file) {
        formData.set("imageFile", file);
      }
      if (isEdit && artist) {
        formData.set("existingImage", artist.image ?? "");
        await updateArtist(artist.id, formData);
      } else {
        await createArtist(formData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        href="/admin/artists"
        className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
      >
        <RiArrowLeftLine size={15} />
        Back to Artists
      </Link>

      <form onSubmit={handleSubmit} className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
        <div className="px-6 py-5 border-b border-white/[0.06]">
          <h1 className="text-base font-semibold text-white mb-0.5">
            {isEdit ? "Edit Artist" : "New Artist"}
          </h1>
          <p className="text-sm text-white/50">
            {isEdit ? "Update the artist details below." : "Fill in the details to add a new artist."}
          </p>
        </div>

        <div className="px-6 py-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">
              Name <span className="text-pink-400">*</span>
            </label>
            <input
              type="text"
              name="name"
              defaultValue={artist?.name}
              placeholder="e.g. Rema"
              required
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-purple-400/50 focus:bg-white/[0.06] transition-all"
            />
          </div>

          {/* Genre */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">
              Genre <span className="text-pink-400">*</span>
            </label>
            <div className="flex gap-3">
              <select
                name="genre"
                defaultValue={artist?.genre ?? ""}
                required
                className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-purple-400/50 focus:bg-white/[0.06] transition-all"
              >
                <option value="" className="bg-[#0d0d1a]">Select a genre…</option>
                {GENRES.map((g) => (
                  <option key={g} value={g} className="bg-[#0d0d1a]">{g}</option>
                ))}
              </select>
              {/* Free-text override */}
              <input
                type="text"
                name="genreCustom"
                placeholder="or type custom…"
                className="w-40 bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-purple-400/50 focus:bg-white/[0.06] transition-all"
              />
            </div>
            <p className="text-xs text-white/30 mt-1.5">Select from the list or type a custom genre on the right.</p>
          </div>

          {/* Profile Image */}
          <div className="border-t border-white/[0.06] pt-5">
            <label className="block text-sm font-medium text-white/70 mb-3">
              Profile Photo
            </label>

            {preview ? (
              /* Image preview */
              <div className="relative group w-48 aspect-[3/4] rounded-xl overflow-hidden border border-purple-400/30">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-cover"
                  unoptimized={!!file}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {/* Change / Remove */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs transition-colors"
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={() => { setPreview(null); setFile(null); }}
                    className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-300 text-xs transition-colors"
                  >
                    Remove
                  </button>
                </div>
                {/* Remove X */}
                <button
                  type="button"
                  onClick={() => { setPreview(null); setFile(null); }}
                  className="absolute top-2 right-2 p-1 rounded-full bg-black/60 hover:bg-red-500/80 text-white/70 hover:text-white transition-all"
                >
                  <RiCloseLine size={14} />
                </button>
              </div>
            ) : (
              /* Drop zone */
              <div
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  const f = e.dataTransfer.files[0];
                  if (f) handleFile(f);
                }}
                className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-12 cursor-pointer transition-all duration-200 ${
                  isDragging
                    ? "border-purple-400/80 bg-purple-400/10"
                    : "border-white/10 hover:border-purple-400/40 hover:bg-white/[0.02]"
                }`}
              >
                <div className={`p-3 rounded-full ${isDragging ? "bg-purple-400/20" : "bg-white/[0.04]"}`}>
                  {isDragging ? (
                    <RiUploadCloud2Line size={24} className="text-purple-300" />
                  ) : (
                    <RiUserLine size={24} className="text-white/40" />
                  )}
                </div>
                <div className="text-center">
                  <p className="text-sm text-white/60">
                    <span className="text-purple-400 font-medium">Click to browse</span>
                    {" "}or drag & drop
                  </p>
                  <p className="text-xs text-white/30 mt-1">PNG, JPG, WEBP up to 10MB</p>
                </div>
              </div>
            )}

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <span>⚠</span> {error}
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-white/[0.06] flex items-center justify-end gap-3">
          <Link
            href="/admin/artists"
            className="px-4 py-2 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/[0.04] transition-all"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <><RiLoader4Line size={15} className="animate-spin" />{isEdit ? "Saving…" : "Adding…"}</>
            ) : (
              <><RiSaveLine size={15} />{isEdit ? "Save Changes" : "Add Artist"}</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
