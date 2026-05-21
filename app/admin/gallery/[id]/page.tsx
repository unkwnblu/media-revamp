import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import GalleryForm from "../components/GalleryForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditGalleryVideoPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: video, error } = await supabase
    .from("gallery_videos")
    .select("id, category, title, youtube_url, sort_order")
    .eq("id", id)
    .single();

  if (error || !video) notFound();

  return <GalleryForm isEdit video={video} />;
}
