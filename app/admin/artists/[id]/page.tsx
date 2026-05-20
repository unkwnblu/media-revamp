import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import ArtistForm from "../components/ArtistForm";

export default async function EditArtistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: artist, error } = await supabase
    .from("artists")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !artist) notFound();

  return <ArtistForm isEdit artist={artist} />;
}
