import { createClient } from "@/lib/supabase/server";
import ArtistsTable from "./components/ArtistsTable";

export default async function AdminArtistsPage() {
  const supabase = await createClient();

  const { data: artists, error } = await supabase
    .from("artists")
    .select("id, name, genre, image")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm max-w-xl">
        <span>⚠</span> Failed to load artists: {error.message}
      </div>
    );
  }

  return <ArtistsTable artists={artists ?? []} />;
}
