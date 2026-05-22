"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ConfirmModal from "../../components/ConfirmModal";
import { deleteEvent, reorderEvents } from "../actions";
import { RiRepeatLine, RiCalendarLine, RiDraggable, RiPencilLine, RiDeleteBinLine } from "react-icons/ri";

interface DBEvent {
  id: string;
  title: string;
  tagline: string;
  slug: string;
  is_recurring: boolean;
  sort_order: number;
}

function SortableRow({
  event,
  onDelete,
}: {
  event: DBEvent;
  onDelete: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: event.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
    >
      {/* Drag handle */}
      <td className="py-4 pl-4 pr-2 w-8">
        <button
          {...attributes}
          {...listeners}
          className="text-white/20 hover:text-white/60 transition-colors cursor-grab active:cursor-grabbing touch-none"
          title="Drag to reorder"
        >
          <RiDraggable size={18} />
        </button>
      </td>

      {/* Title */}
      <td className="py-4 px-4">
        <span className="font-medium text-white text-sm">{event.title}</span>
        {event.tagline && (
          <p className="text-xs text-white/40 mt-0.5">{event.tagline}</p>
        )}
      </td>

      {/* Type */}
      <td className="py-4 px-4">
        <span
          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
            event.is_recurring
              ? "bg-purple-500/15 text-purple-300"
              : "bg-pink-500/15 text-pink-300"
          }`}
        >
          {event.is_recurring ? (
            <><RiRepeatLine size={10} /> Recurring</>
          ) : (
            <><RiCalendarLine size={10} /> Single</>
          )}
        </span>
      </td>

      {/* Slug */}
      <td className="py-4 px-4 hidden md:table-cell">
        <span className="text-white/30 text-xs font-mono">{event.slug}</span>
      </td>

      {/* Actions */}
      <td className="py-4 px-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <Link
            href={`/admin/events/${event.id}`}
            className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-colors"
          >
            <RiPencilLine size={15} />
          </Link>
          <button
            onClick={() => onDelete(event.id)}
            className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <RiDeleteBinLine size={15} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function EventsTable({ events: initialEvents }: { events: DBEvent[] }) {
  const [events, setEvents] = useState(initialEvents);
  const [targetId, setTargetId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const sensors = useSensors(useSensor(PointerSensor));
  const target = events.find((e) => e.id === targetId);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = events.findIndex((e) => e.id === active.id);
    const newIndex = events.findIndex((e) => e.id === over.id);
    const reordered = arrayMove(events, oldIndex, newIndex);
    setEvents(reordered);

    setIsSaving(true);
    reorderEvents(reordered.map((e) => e.id)).finally(() => {
      setIsSaving(false);
      router.refresh();
    });
  }

  const handleConfirm = () => {
    if (!targetId) return;
    startTransition(async () => {
      await deleteEvent(targetId);
      setTargetId(null);
      router.refresh();
    });
  };

  return (
    <>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-semibold text-white">Events</h1>
              <span className="text-xs text-white/30 bg-white/5 px-2 py-0.5 rounded-full">
                {events.length} items
              </span>
              {isSaving && (
                <span className="text-xs text-purple-400 animate-pulse">Saving order…</span>
              )}
            </div>
            <Link
              href="/admin/events/new"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              + New Event
            </Link>
          </div>

          {/* Table */}
          <div className="rounded-2xl border border-white/[0.06] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                  <th className="py-3 pl-4 pr-2 w-8" />
                  <th className="py-3 px-4 text-left text-[10px] tracking-widest text-white/30 font-medium">TITLE</th>
                  <th className="py-3 px-4 text-left text-[10px] tracking-widest text-white/30 font-medium">TYPE</th>
                  <th className="py-3 px-4 text-left text-[10px] tracking-widest text-white/30 font-medium hidden md:table-cell">SLUG</th>
                  <th className="py-3 px-4 text-right text-[10px] tracking-widest text-white/30 font-medium">ACTIONS</th>
                </tr>
              </thead>
              <SortableContext items={events.map((e) => e.id)} strategy={verticalListSortingStrategy}>
                <tbody>
                  {events.map((event) => (
                    <SortableRow key={event.id} event={event} onDelete={setTargetId} />
                  ))}
                  {events.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-16 text-center text-white/20 text-sm">
                        No events yet. Click &apos;New Event&apos; to add one.
                      </td>
                    </tr>
                  )}
                </tbody>
              </SortableContext>
            </table>
          </div>
        </div>
      </DndContext>

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
