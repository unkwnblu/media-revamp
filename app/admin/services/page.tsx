"use client";

import { services } from "@/lib/data";
import AdminTable from "../components/AdminTable";

export default function AdminServicesPage() {
  return (
    <AdminTable
      title="Services"
      addHref="/admin/services/new"
      addLabel="New Service"
      getKey={(s) => s.title}
      columns={[
        {
          label: "Service",
          render: (s) => <span className="font-medium text-white">{s.title}</span>,
        },
        {
          label: "Description",
          render: (s) => (
            <span className="text-white/50 text-xs line-clamp-2 normal-case" style={{ textTransform: "none" }}>
              {s.description}
            </span>
          ),
        },
      ]}
      rows={services}
    />
  );
}
