"use client";

import { events } from "@/lib/data";
import AdminTable from "../components/AdminTable";

export default function AdminEventsPage() {
  return (
    <AdminTable
      title="Events"
      addHref="/admin/events/new"
      addLabel="New Event"
      getKey={(e) => e.id}
      getEditHref={(e) => `/admin/events/${e.id}`}
      columns={[
        {
          label: "Title",
          render: (e) => <span className="font-medium text-white">{e.title}</span>,
        },
        {
          label: "Tagline",
          render: (e) => <span className="text-white/50">{e.tagline}</span>,
        },
        {
          label: "Slug",
          render: (e) => <span className="text-white/30 text-xs font-mono">{e.slug}</span>,
        },
      ]}
      rows={events}
    />
  );
}
