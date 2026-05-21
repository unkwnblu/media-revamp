import { createClient } from "@/lib/supabase/server";
import GalleryTable from "./components/GalleryTable";

export default async function AdminGalleryPage() {
  const supabase = await createClient();

  const { data: videos, error } = await supabase
    .from("gallery_videos")
    .select("id, category, title, youtube_url, sort_order")
    .order("category", { ascending: true })
    .order("sort_order", { ascending: true });

  if (error) {
    return (
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm max-w-xl">
        <span>⚠</span> Failed to load gallery videos: {error.message}
      </div>
    );
  }

  return <GalleryTable videos={videos ?? []} />;
}
