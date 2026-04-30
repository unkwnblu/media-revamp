"use client";

import Link from "next/link";
import { RiArrowLeftLine, RiSaveLine } from "react-icons/ri";
import ImageUploader from "../../components/ImageUploader";
import type { Project } from "@/lib/data";

interface ProjectFormProps {
  backHref?: string;
  backLabel?: string;
  isEdit?: boolean;
  project?: Project;
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

      <form className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
        <div className="px-6 py-5 border-b border-white/[0.06]">
          <p className="text-sm text-white/50">
            {isEdit
              ? "Update the fields below and save."
              : "Fill in the details below to create a new project."}
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

          {/* Category + Year row */}
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

          {/* Divider */}
          <div className="border-t border-white/[0.06] pt-5">
            {/* Image uploader — supports thumbnail + gallery */}
            <ImageUploader
              label="Project Images"
              hint="The first image (or the one marked with ★) will be used as the thumbnail."
              multiple
              existingImages={project ? [...(project.thumbnail ? [project.thumbnail] : []), ...project.images.filter((img) => img !== project.thumbnail)] : []}
              primaryImage={project?.thumbnail}
              name="images"
            />
          </div>
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
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <RiSaveLine size={15} />
            {isEdit ? "Save Changes" : "Create Project"}
          </button>
        </div>
      </form>
    </div>
  );
}
