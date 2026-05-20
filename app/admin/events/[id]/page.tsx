import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import EventForm from "../components/EventForm";

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: event, error }, { data: sessions }] = await Promise.all([
    supabase.from("events").select("*").eq("id", id).single(),
    supabase
      .from("event_sessions")
      .select("name, date, venue, time, ticket_price, ticket_link, is_upcoming, sort_order, thumbnail, images")
      .eq("event_id", id)
      .order("sort_order", { ascending: true }),
  ]);

  if (error || !event) notFound();

  return <EventForm isEdit event={event} sessions={sessions ?? []} />;
}
