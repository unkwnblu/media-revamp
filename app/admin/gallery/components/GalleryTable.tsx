"use client";

import { useState, useTransition } from "react";
import AdminTable from "../../components/AdminTable";
import ConfirmModal from "../../components/ConfirmModal";
import { deleteGalleryVideo } from "../actions";

interface DBVideo {
  id: string;
  category: string;
  title: string;
  youtube_url: string;
  sort_order: number;
}

const CATEGORY_LABELS: Record<string, string> = {
  "backstage":         "Backstage",
  "studio":            "Studio",
  "campaigns":         "Campaigns",
  "music-videos":      "Music Videos",
  "brand-activations": "Brand Activations",
};

export default function GalleryTable({ videos }: { videos: DBVideo[] }) {
  const [isPending, startTransition] = useTransition();
  const [targetId, setTargetId] = useState<string | null>(null);

  const target = videos.find((v) => v.id === targetId);

  const handleConfirm = () => {
    if (!targetId) return;
    startTransition(async () => {
      await deleteGalleryVideo(targetId);
      setTargetId(null);
    });
  };

  return (
    <>
      <AdminTable
        title="Gallery Videos"
        addHref="/admin/gallery/new"
        addLabel="Add Video"
        getKey={(v) => v.id}
        getEditHref={(v) => `/admin/gallery/${v.id}`}
        onDelete={(id) => setTargetId(id)}
        columns={[
          {
            label: "Title",
            render: (v) => (
              <div>
                <span className="font-medium text-white">{v.title || <span className="text-white/30 italic">Untitled</span>}</span>
                <p className="text-xs text-white/40 mt-0.5 font-mono truncate max-w-xs">{v.youtube_url}</p>
              </div>
            ),
          },
          {
            label: "Section",
            render: (v) => (
              <span className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium">
                {CATEGORY_LABELS[v.category] ?? v.category}
              </span>
            ),
            mobileHide: true,
          },
          {
            label: "Order",
            render: (v) => <span className="text-white/40 text-sm">{v.sort_order}</span>,
            mobileHide: true,
          },
        ]}
        rows={videos}
        emptyMessage="No videos yet. Click 'Add Video' to add the first one."
      />

      <ConfirmModal
        open={!!targetId}
        title="Remove video?"
        message={
          target
            ? `"${target.title || "This video"}" will be permanently removed.`
            : "This video will be permanently removed."
        }
        confirmLabel="Remove Video"
        isLoading={isPending}
        onConfirm={handleConfirm}
        onCancel={() => setTargetId(null)}
      />
    </>
  );
}
