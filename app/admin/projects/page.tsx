"use client";

import { projects } from "@/lib/data";
import AdminTable from "../components/AdminTable";

export default function AdminProjectsPage() {
  return (
    <AdminTable
      title="Projects"
      addHref="/admin/projects/new"
      addLabel="New Project"
      getKey={(p) => p.id}
      getEditHref={(p) => `/admin/projects/${p.id}`}
      columns={[
        {
          label: "Title",
          render: (p) => <span className="font-medium text-white">{p.title}</span>,
        },
        {
          label: "Category",
          render: (p) => (
            <span className="inline-block px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 text-xs">
              {p.category}
            </span>
          ),
        },
        {
          label: "Client",
          render: (p) => <span className="text-white/50">{p.client}</span>,
        },
        {
          label: "Year",
          render: (p) => <span className="text-white/50">{p.year}</span>,
          className: "text-right",
        },
      ]}
      rows={projects}
    />
  );
}
