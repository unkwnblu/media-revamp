import { artists } from "@/lib/data";
import { notFound } from "next/navigation";
import AdminForm from "../../components/AdminForm";

export default async function EditArtistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const artist = artists.find((a) => a.id === id);
  if (!artist) notFound();

  return (
    <AdminForm
      backHref="/admin/artists"
      backLabel="Back to Artists"
      isEdit
      fields={[
        { label: "Name",      name: "name",  defaultValue: artist.name,  required: true },
        { label: "Genre",     name: "genre", defaultValue: artist.genre, required: true },
        { label: "Image URL", name: "image", type: "url", defaultValue: artist.image,
          hint: "Path to the artist's profile image." },
      ]}
    />
  );
}
