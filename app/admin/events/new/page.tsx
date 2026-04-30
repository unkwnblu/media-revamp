import AdminForm from "../../components/AdminForm";

export default function NewEventPage() {
  return (
    <AdminForm
      backHref="/admin/events"
      backLabel="Back to Events"
      fields={[
        { label: "Title",       name: "title",       placeholder: "e.g. Amapiano Left and Right", required: true },
        { label: "Tagline",     name: "tagline",     placeholder: "e.g. Back to the Groove",     required: true },
        { label: "Slug",        name: "slug",        placeholder: "e.g. amapiano-left-and-right",
          hint: "URL-friendly version of the title. No spaces, lowercase.", required: true },
        { label: "Description", name: "description", type: "textarea", rows: 4,
          placeholder: "Describe the event…", required: true },
        { label: "Image URL",   name: "image",       type: "url",
          placeholder: "/images/events/my-event.jpg",
          hint: "Path to the event cover image." },
      ]}
    />
  );
}
