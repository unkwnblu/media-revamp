import { createClient } from "@/lib/supabase/server";
import EventsTable from "./components/EventsTable";

export default async function AdminEventsPage() {
  const supabase = await createClient();

  const { data: events, error } = await supabase
    .from("events")
    .select("id, title, tagline, slug, is_recurring")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm max-w-xl">
        <span>⚠</span> Failed to load events: {error.message}
      </div>
    );
  }

  return <EventsTable events={events ?? []} />;
}
