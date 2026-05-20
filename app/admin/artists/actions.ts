"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function uploadFile(
  supabase: Awaited<ReturnType<typeof createClient>>,
  file: File
): Promise<string> {
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { data, error } = await supabase.storage
    .from("artists")
    .upload(path, file, { cacheControl: "3600", upsert: false });

  if (error) throw new Error(`Image upload failed: ${error.message}`);

  const { data: { publicUrl } } = supabase.storage
    .from("artists")
    .getPublicUrl(data.path);

  return publicUrl;
}

function storagePathFromUrl(url: string, bucket: string): string | null {
  try {
    const marker = `/storage/v1/object/public/${bucket}/`;
    const idx = url.indexOf(marker);
    if (idx === -1) return null;
    return decodeURIComponent(url.slice(idx + marker.length));
  } catch {
    return null;
  }
}

// ─── Create ───────────────────────────────────────────────────────────────────

export async function createArtist(formData: FormData) {
  const supabase = await createClient();

  const imageFile = formData.get("imageFile") as File | null;
  let imageUrl = "";

  if (imageFile && imageFile.size > 0) {
    imageUrl = await uploadFile(supabase, imageFile);
  }

  const genreCustom = (formData.get("genreCustom") as string)?.trim();
  const genre = genreCustom || (formData.get("genre") as string);

  const { error } = await supabase.from("artists").insert({
    name:  formData.get("name") as string,
    genre,
    image: imageUrl,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/admin/artists");
  revalidatePath("/artists");
  redirect("/admin/artists");
}

// ─── Update ───────────────────────────────────────────────────────────────────

export async function updateArtist(id: string, formData: FormData) {
  const supabase = await createClient();

  const imageFile = formData.get("imageFile") as File | null;
  const existingImage = formData.get("existingImage") as string;
  let imageUrl = existingImage;

  if (imageFile && imageFile.size > 0) {
    // Upload new image
    imageUrl = await uploadFile(supabase, imageFile);

    // Delete old image from storage if it was in our bucket
    if (existingImage) {
      const oldPath = storagePathFromUrl(existingImage, "artists");
      if (oldPath) await supabase.storage.from("artists").remove([oldPath]);
    }
  }

  const genreCustom = (formData.get("genreCustom") as string)?.trim();
  const genre = genreCustom || (formData.get("genre") as string);

  const { error } = await supabase
    .from("artists")
    .update({
      name:       formData.get("name") as string,
      genre,
      image:      imageUrl,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/artists");
  revalidatePath("/artists");
  redirect("/admin/artists");
}

// ─── Delete ───────────────────────────────────────────────────────────────────

export async function deleteArtist(id: string) {
  const supabase = await createClient();

  const { data: artist, error: fetchError } = await supabase
    .from("artists")
    .select("image")
    .eq("id", id)
    .single();

  if (fetchError) throw new Error(fetchError.message);

  // Delete profile image from storage
  if (artist?.image) {
    const path = storagePathFromUrl(artist.image, "artists");
    if (path) await supabase.storage.from("artists").remove([path]);
  }

  const { error } = await supabase.from("artists").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/artists");
  revalidatePath("/artists");
}
