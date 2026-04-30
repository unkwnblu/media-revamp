import AdminForm from "../../components/AdminForm";

export default function NewTestimonialPage() {
  return (
    <AdminForm
      backHref="/admin/testimonials"
      backLabel="Back to Testimonials"
      fields={[
        { label: "Author", name: "author", placeholder: "e.g. Adetolu Tayo", required: true },
        { label: "Quote",  name: "quote",  type: "textarea", rows: 4,
          placeholder: "What they said about A1 Media…", required: true },
      ]}
    />
  );
}
