"use client";

import { useState } from "react";
import Link from "next/link";
import { RiArrowLeftLine, RiSaveLine, RiLoader4Line, RiDoubleQuotesL } from "react-icons/ri";
import { createTestimonial, updateTestimonial } from "../actions";

interface DBTestimonial {
  id: string;
  quote: string;
  author: string;
  role: string | null;
}

interface TestimonialFormProps {
  isEdit?: boolean;
  testimonial?: DBTestimonial;
}

export default function TestimonialForm({ isEdit = false, testimonial }: TestimonialFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      if (isEdit && testimonial) {
        await updateTestimonial(testimonial.id, formData);
      } else {
        await createTestimonial(formData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        href="/admin/testimonials"
        className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
      >
        <RiArrowLeftLine size={15} />
        Back to Testimonials
      </Link>

      <form onSubmit={handleSubmit} className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
        <div className="px-6 py-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
              <RiDoubleQuotesL size={15} className="text-emerald-400" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-white">
                {isEdit ? "Edit Testimonial" : "New Testimonial"}
              </h1>
              <p className="text-xs text-white/40 mt-0.5">
                {isEdit ? "Update the testimonial details." : "Add a new client testimonial."}
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-5">
          {/* Quote */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">
              Quote <span className="text-pink-400">*</span>
            </label>
            <textarea
              name="quote"
              defaultValue={testimonial?.quote}
              placeholder="What they said about A1 Media…"
              required
              rows={5}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-purple-400/50 focus:bg-white/[0.06] transition-all resize-none normal-case"
              style={{ textTransform: "none" }}
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">
              Author <span className="text-pink-400">*</span>
            </label>
            <input
              type="text"
              name="author"
              defaultValue={testimonial?.author}
              placeholder="e.g. Adetolu Tayo"
              required
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-purple-400/50 focus:bg-white/[0.06] transition-all"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">
              Role / Title
              <span className="text-white/30 font-normal ml-2 text-xs">optional</span>
            </label>
            <input
              type="text"
              name="role"
              defaultValue={testimonial?.role ?? ""}
              placeholder="e.g. CEO, Rema Music Group"
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-purple-400/50 focus:bg-white/[0.06] transition-all"
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
            href="/admin/testimonials"
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
              <><RiSaveLine size={15} />{isEdit ? "Save Changes" : "Add Testimonial"}</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
