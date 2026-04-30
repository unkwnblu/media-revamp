"use client";

import { useState } from "react";
import Link from "next/link";
import { RiArrowLeftLine, RiSaveLine, RiLoader4Line } from "react-icons/ri";
import ImageUploader, { type UploadedImage } from "../../components/ImageUploader";
import { createProject, updateProject } from "../actions";

interface DBProject {
  id: string;
  title: string;
  category: string;
  client: string;
  year: number;
  description: string;
  thumbnail: string;
  images: string[];
}

interface ProjectFormProps {
  backHref?: string;
  backLabel?: string;
  isEdit?: boolean;
  project?: DBProject;
}

const CATEGORIES = [
  "Live Event",
  "Brand Campaign",
  "Music Video",
  "Content Creation",
  "Brand Activation",
];

export default function ProjectForm({
  backHref = "/admin/projects",
  backLabel = "Back to Projects",
  isEdit = false,
  project,
}: ProjectFormProps) {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      // Append actual File objects for upload
      const newFiles = images.filter((img) => img.file);
      newFiles.forEach((img) => formData.append("imageFiles", img.file!));

      // Tell the server which index is the thumbnail
      const primaryIndex = images.findIndex((img) => img.isPrimary);
      formData.set("thumbnailIndex", String(Math.max(0, primaryIndex)));

      // For edit: pass existing (already-uploaded) URLs separately
      if (isEdit && project) {
        const existingUrls = images.filter((img) => !img.file).map((img) => img.url);
        existingUrls.forEach((url) => formData.append("existingImages", url));
      }

      if (isEdit && project) {
        await updateProject(project.id, formData);
      } else {
        await createProject(formData);
      }
      // redirect happens inside the server action
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Seed ImageUploader with existing images when editing
  const existingImages = project
    ? [project.thumbnail, ...project.images.filter((img) => img !== project.thumbnail)].filter(Boolean)
    : [];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Back link */}
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
      >
        <RiArrowLeftLine size={15} />
        {backLabel}
      </Link>

      <form onSubmit={handleSubmit} className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
        <div className="px-6 py-5 border-b border-white/[0.06]">
          <p className="text-sm text-white/50">
            {isEdit ? "Update the fields below and save." : "Fill in the details below to create a new project."}
          </p>
        </div>

        <div className="px-6 py-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">
              Title <span className="text-pink-400">*</span>
            </label>
            <input
              type="text"
              name="title"
              defaultValue={project?.title}
              placeholder="e.g. Burna Boy Live in Concert"
              required
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-purple-400/50 focus:bg-white/[0.06] transition-all"
            />
          </div>

          {/* Category + Year */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">
                Category <span className="text-pink-400">*</span>
              </label>
              <select
                name="category"
                defaultValue={project?.category ?? ""}
                required
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-purple-400/50 focus:bg-white/[0.06] transition-all"
              >
                <option value="" className="bg-[#0d0d1a]">Select…</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} className="bg-[#0d0d1a]">{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">
                Year <span className="text-pink-400">*</span>
              </label>
              <input
                type="number"
                name="year"
                defaultValue={project?.year}
                placeholder="2025"
                required
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-purple-400/50 focus:bg-white/[0.06] transition-all"
              />
            </div>
          </div>

          {/* Client */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">
              Client <span className="text-pink-400">*</span>
            </label>
            <input
              type="text"
              name="client"
              defaultValue={project?.client}
              placeholder="e.g. Starboy Entertainment"
              required
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-purple-400/50 focus:bg-white/[0.06] transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={project?.description}
              placeholder="Describe the project…"
              rows={4}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-purple-400/50 focus:bg-white/[0.06] transition-all resize-none"
            />
          </div>

          {/* Images */}
          <div className="border-t border-white/[0.06] pt-5">
            <ImageUploader
              label="Project Images"
              hint="The starred image becomes the thumbnail. Drag & drop or click to browse."
              multiple
              existingImages={existingImages}
              primaryImage={project?.thumbnail}
              onImagesChange={setImages}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <span className="shrink-0">⚠</span>
              {error}
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-white/[0.06] flex items-center justify-end gap-3">
          <Link
            href={backHref}
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
              <>
                <RiLoader4Line size={15} className="animate-spin" />
                {isEdit ? "Saving…" : "Creating…"}
              </>
            ) : (
              <>
                <RiSaveLine size={15} />
                {isEdit ? "Save Changes" : "Create Project"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
