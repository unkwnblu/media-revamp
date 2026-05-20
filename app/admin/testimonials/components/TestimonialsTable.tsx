"use client";

import { useState, useTransition } from "react";
import AdminTable from "../../components/AdminTable";
import ConfirmModal from "../../components/ConfirmModal";
import { deleteTestimonial } from "../actions";

interface DBTestimonial {
  id: string;
  quote: string;
  author: string;
  role: string | null;
}

export default function TestimonialsTable({ testimonials }: { testimonials: DBTestimonial[] }) {
  const [isPending, startTransition] = useTransition();
  const [targetId, setTargetId] = useState<string | null>(null);

  const target = testimonials.find((t) => t.id === targetId);

  const handleConfirm = () => {
    if (!targetId) return;
    startTransition(async () => {
      await deleteTestimonial(targetId);
      setTargetId(null);
    });
  };

  return (
    <>
      <AdminTable
        title="Testimonials"
        addHref="/admin/testimonials/new"
        addLabel="New Testimonial"
        getKey={(t) => t.id}
        getEditHref={(t) => `/admin/testimonials/${t.id}`}
        onDelete={(id) => setTargetId(id)}
        columns={[
          {
            label: "Author",
            render: (t) => (
              <div>
                <span className="font-medium text-white">{t.author}</span>
                {t.role && (
                  <p className="text-xs text-white/40 mt-0.5">{t.role}</p>
                )}
              </div>
            ),
          },
          {
            label: "Quote",
            render: (t) => (
              <span
                className="text-white/50 text-xs line-clamp-2"
                style={{ textTransform: "none" }}
              >
                &ldquo;{t.quote}&rdquo;
              </span>
            ),
          },
        ]}
        rows={testimonials}
        emptyMessage="No testimonials yet. Click 'New Testimonial' to add one."
      />

      <ConfirmModal
        open={!!targetId}
        title="Remove testimonial?"
        message={
          target
            ? `The testimonial from "${target.author}" will be permanently removed.`
            : "This testimonial will be permanently removed."
        }
        confirmLabel="Remove Testimonial"
        isLoading={isPending}
        onConfirm={handleConfirm}
        onCancel={() => setTargetId(null)}
      />
    </>
  );
}
