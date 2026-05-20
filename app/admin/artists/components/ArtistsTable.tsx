"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import AdminTable from "../../components/AdminTable";
import ConfirmModal from "../../components/ConfirmModal";
import { deleteArtist } from "../actions";

interface Artist {
  id: string;
  name: string;
  genre: string;
  image: string;
}

export default function ArtistsTable({ artists }: { artists: Artist[] }) {
  const [isPending, startTransition] = useTransition();
  const [targetId, setTargetId] = useState<string | null>(null);

  const target = artists.find((a) => a.id === targetId);

  const handleConfirm = () => {
    if (!targetId) return;
    startTransition(async () => {
      await deleteArtist(targetId);
      setTargetId(null);
    });
  };

  return (
    <>
      <AdminTable
        title="Artists"
        addHref="/admin/artists/new"
        addLabel="New Artist"
        getKey={(a) => a.id}
        getEditHref={(a) => `/admin/artists/${a.id}`}
        onDelete={(id) => setTargetId(id)}
        columns={[
          {
            label: "Artist",
            render: (a) => (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg overflow-hidden bg-white/[0.06] shrink-0 relative">
                  {a.image ? (
                    <Image src={a.image} alt={a.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-pink-500 to-purple-600" />
                  )}
                </div>
                <span className="font-medium text-white">{a.name}</span>
              </div>
            ),
          },
          {
            label: "Genre",
            render: (a) => (
              <span className="inline-block px-2 py-0.5 rounded-full bg-pink-500/15 text-pink-300 text-xs">
                {a.genre}
              </span>
            ),
          },
        ]}
        rows={artists}
        emptyMessage="No artists yet. Click 'New Artist' to add one."
      />

      <ConfirmModal
        open={!!targetId}
        title="Remove artist?"
        message={
          target
            ? `"${target.name}" will be permanently removed along with their profile photo.`
            : "This artist will be permanently removed."
        }
        confirmLabel="Remove Artist"
        isLoading={isPending}
        onConfirm={handleConfirm}
        onCancel={() => setTargetId(null)}
      />
    </>
  );
}
