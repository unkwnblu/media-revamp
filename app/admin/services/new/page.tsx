import AdminForm from "../../components/AdminForm";

export default function NewServicePage() {
  return (
    <AdminForm
      backHref="/admin/services"
      backLabel="Back to Services"
      fields={[
        { label: "Title",       name: "title",       placeholder: "e.g. Artist Bookings",       required: true },
        { label: "Description", name: "description", type: "textarea", rows: 5,
          placeholder: "Describe what this service offers…", required: true },
      ]}
    />
  );
}
