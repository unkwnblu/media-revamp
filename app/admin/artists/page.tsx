"use client";

import { artists } from "@/lib/data";
import AdminTable from "../components/AdminTable";

export default function AdminArtistsPage() {
  return (
    <AdminTable
      title="Artists"
      addHref="/admin/artists/new"
      addLabel="New Artist"
      getKey={(a) => a.id}
      getEditHref={(a) => `/admin/artists/${a.id}`}
      columns={[
        {
          label: "Name",
          render: (a) => <span className="font-medium text-white">{a.name}</span>,
        },
        {
          label: "Genre",
          render: (a) => (
            <span className="inline-block px-2 py-0.5 rounded-full bg-pink-500/15 text-pink-300 text-xs">
              {a.genre}
            </span>
          ),
        },
        {
          label: "Image",
          render: (a) => <span className="text-white/40 text-xs truncate">{a.image}</span>,
        },
      ]}
      rows={artists}
    />
  );
}
