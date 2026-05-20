"use client";

import { useState, useTransition } from "react";
import AdminTable from "../../components/AdminTable";
import ConfirmModal from "../../components/ConfirmModal";
import { deleteEvent } from "../actions";
import { RiRepeatLine, RiCalendarLine } from "react-icons/ri";

interface DBEvent {
  id: string;
  title: string;
  tagline: string;
  slug: string;
  is_recurring: boolean;
}

export default function EventsTable({ events }: { events: DBEvent[] }) {
  const [isPending, startTransition] = useTransition();
  const [targetId, setTargetId] = useState<string | null>(null);

  const target = events.find((e) => e.id === targetId);

  const handleConfirm = () => {
    if (!targetId) return;
    startTransition(async () => {
      await deleteEvent(targetId);
      setTargetId(null);
    });
  };

  return (
    <>
      <AdminTable
        title="Events"
        addHref="/admin/events/new"
        addLabel="New Event"
        getKey={(e) => e.id}
        getEditHref={(e) => `/admin/events/${e.id}`}
        onDelete={(id) => setTargetId(id)}
        columns={[
          {
            label: "Title",
            render: (e) => (
              <div>
                <span className="font-medium text-white">{e.title}</span>
                <p className="text-xs text-white/40 mt-0.5">{e.tagline}</p>
              </div>
            ),
          },
          {
            label: "Type",
            render: (e) => (
              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
                e.is_recurring
                  ? "bg-purple-500/15 text-purple-300"
                  : "bg-pink-500/15 text-pink-300"
              }`}>
                {e.is_recurring
                  ? <><RiRepeatLine size={10} /> Recurring</>
                  : <><RiCalendarLine size={10} /> Single</>
                }
              </span>
            ),
          },
          {
            label: "Slug",
            render: (e) => (
              <span className="text-white/30 text-xs font-mono">{e.slug}</span>
            ),
            mobileHide: true,
          },
        ]}
        rows={events}
        emptyMessage="No events yet. Click 'New Event' to add one."
      />

      <ConfirmModal
        open={!!targetId}
        title="Remove event?"
        message={
          target
            ? `"${target.title}" will be permanently removed along with its cover image.`
            : "This event will be permanently removed."
        }
        confirmLabel="Remove Event"
        isLoading={isPending}
        onConfirm={handleConfirm}
        onCancel={() => setTargetId(null)}
      />
    </>
  );
}
