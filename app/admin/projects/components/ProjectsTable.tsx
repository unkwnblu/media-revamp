"use client";

import { useState, useTransition } from "react";
import AdminTable from "../../components/AdminTable";
import ConfirmModal from "../../components/ConfirmModal";
import { deleteProject } from "../actions";

interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  year: number;
  thumbnail: string;
}

export default function ProjectsTable({ projects }: { projects: Project[] }) {
  const [isPending, startTransition] = useTransition();
  const [targetId, setTargetId] = useState<string | null>(null);

  const targetProject = projects.find((p) => p.id === targetId);

  const handleDelete = (id: string) => setTargetId(id);

  const handleConfirm = () => {
    if (!targetId) return;
    startTransition(async () => {
      await deleteProject(targetId);
      setTargetId(null);
    });
  };

  return (
    <>
      <AdminTable
        title="Projects"
        addHref="/admin/projects/new"
        addLabel="New Project"
        getKey={(p) => p.id}
        getEditHref={(p) => `/admin/projects/${p.id}`}
        onDelete={handleDelete}
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
            render: (p) => (
              <span className="text-white/50">
                {p.client}{p.year ? <span className="text-white/30"> · {p.year}</span> : null}
              </span>
            ),
          },
          {
            label: "Year",
            render: (p) => <span className="text-white/50">{p.year}</span>,
            className: "text-right",
            mobileHide: true,
          },
        ]}
        rows={projects}
        emptyMessage="No projects yet. Click 'New Project' to add one."
      />

      <ConfirmModal
        open={!!targetId}
        title="Delete project?"
        message={
          targetProject
            ? `"${targetProject.title}" will be permanently deleted. This cannot be undone.`
            : "This project will be permanently deleted. This cannot be undone."
        }
        confirmLabel="Delete Project"
        isLoading={isPending}
        onConfirm={handleConfirm}
        onCancel={() => setTargetId(null)}
      />
    </>
  );
}
