"use client";

import { testimonials } from "@/lib/data";
import AdminTable from "../components/AdminTable";

export default function AdminTestimonialsPage() {
  return (
    <AdminTable
      title="Testimonials"
      addHref="/admin/testimonials/new"
      addLabel="New Testimonial"
      getKey={(t) => t.author}
      columns={[
        {
          label: "Author",
          render: (t) => <span className="font-medium text-white">{t.author}</span>,
        },
        {
          label: "Quote",
          render: (t) => (
            <span className="text-white/50 text-xs line-clamp-2 normal-case" style={{ textTransform: "none" }}>
              &ldquo;{t.quote}&rdquo;
            </span>
          ),
        },
      ]}
      rows={testimonials}
    />
  );
}
