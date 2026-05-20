"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { RiErrorWarningLine, RiCloseLine } from "react-icons/ri";

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  open,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onCancel]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative w-full max-w-sm rounded-2xl border border-white/[0.08] bg-[#13131f] shadow-2xl shadow-black/60 overflow-hidden animate-in">

        {/* Top accent bar */}
        <div className="h-[3px] w-full bg-gradient-to-r from-red-500 to-rose-500" />

        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-5 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-red-500/15 flex items-center justify-center shrink-0">
              <RiErrorWarningLine size={18} className="text-red-400" />
            </div>
            <h2
              className="text-base font-bold text-white"
              style={{ textTransform: "none" }}
            >
              {title}
            </h2>
          </div>
          <button
            onClick={onCancel}
            className="text-white/30 hover:text-white/70 transition-colors -mt-0.5 -mr-1"
          >
            <RiCloseLine size={20} />
          </button>
        </div>

        {/* Body */}
        <p
          className="px-6 pb-6 text-sm text-white/50 leading-relaxed"
          style={{ textTransform: "none" }}
        >
          {message}
        </p>

        {/* Divider */}
        <div className="h-[1px] bg-white/[0.06] mx-6" />

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/[0.04] transition-all disabled:opacity-40"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-red-500 to-rose-500 text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Deleting…
              </>
            ) : (
              confirmLabel
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
