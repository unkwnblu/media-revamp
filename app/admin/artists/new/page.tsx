import AdminForm from "../../components/AdminForm";

export default function NewArtistPage() {
  return (
    <AdminForm
      backHref="/admin/artists"
      backLabel="Back to Artists"
      fields={[
        { label: "Name",      name: "name",  placeholder: "e.g. Rema", required: true },
        { label: "Genre",     name: "genre", placeholder: "e.g. Afrorave", required: true },
        { label: "Image URL", name: "image", type: "url",
          placeholder: "/images/artists/artist-name.jpg",
          hint: "Path to the artist's profile image." },
      ]}
    />
  );
}
