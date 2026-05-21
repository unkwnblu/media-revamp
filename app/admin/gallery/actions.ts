"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createGalleryVideo(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.from("gallery_videos").insert({
    category:    formData.get("category") as string,
    title:       formData.get("title") as string,
    youtube_url: formData.get("youtube_url") as string,
    sort_order:  Number(formData.get("sort_order") ?? 0),
  });

  if (error) throw new Error(error.message);

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  redirect("/admin/gallery");
}

export async function updateGalleryVideo(id: string, formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("gallery_videos")
    .update({
      category:    formData.get("category") as string,
      title:       formData.get("title") as string,
      youtube_url: formData.get("youtube_url") as string,
      sort_order:  Number(formData.get("sort_order") ?? 0),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  redirect("/admin/gallery");
}

export async function deleteGalleryVideo(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("gallery_videos").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}
