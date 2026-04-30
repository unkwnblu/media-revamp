import { events } from "@/lib/data";
import { notFound } from "next/navigation";
import AdminForm from "../../components/AdminForm";

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = events.find((e) => e.id === id);
  if (!event) notFound();

  return (
    <AdminForm
      backHref="/admin/events"
      backLabel="Back to Events"
      isEdit
      fields={[
        { label: "Title",       name: "title",       defaultValue: event.title,       required: true },
        { label: "Tagline",     name: "tagline",     defaultValue: event.tagline,     required: true },
        { label: "Slug",        name: "slug",        defaultValue: event.slug,
          hint: "URL-friendly version of the title. No spaces, lowercase.", required: true },
        { label: "Description", name: "description", type: "textarea", rows: 4, defaultValue: event.description },
        { label: "Image URL",   name: "image",       type: "url",    defaultValue: event.image,
          hint: "Path to the event cover image." },
      ]}
    />
  );
}
