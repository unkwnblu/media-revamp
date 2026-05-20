"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// ─── Upload a single file to Supabase Storage ─────────────────────────────────

async function uploadFile(
  supabase: Awaited<ReturnType<typeof createClient>>,
  file: File
): Promise<string> {
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { data, error } = await supabase.storage
    .from("projects")
    .upload(path, file, { cacheControl: "3600", upsert: false });

  if (error) throw new Error(`Image upload failed: ${error.message}`);

  const { data: { publicUrl } } = supabase.storage
    .from("projects")
    .getPublicUrl(data.path);

  return publicUrl;
}

// ─── Create ───────────────────────────────────────────────────────────────────

export async function createProject(formData: FormData) {
  const supabase = await createClient();

  // Upload every image file and collect public URLs
  const imageFiles = formData.getAll("imageFiles") as File[];
  const thumbnailIndex = parseInt((formData.get("thumbnailIndex") as string) ?? "0");

  const imageUrls: string[] = [];
  for (const file of imageFiles) {
    if (file.size > 0) {
      const url = await uploadFile(supabase, file);
      imageUrls.push(url);
    }
  }

  const thumbnail = imageUrls[thumbnailIndex] ?? imageUrls[0] ?? "";

  const { error } = await supabase.from("projects").insert({
    title:       formData.get("title") as string,
    category:    formData.get("category") as string,
    client:      formData.get("client") as string,
    year:        parseInt(formData.get("year") as string),
    description: (formData.get("description") as string) ?? "",
    thumbnail,
    images:      imageUrls,
    videos:      [],
  });

  if (error) throw new Error(error.message);

  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

// ─── Update ───────────────────────────────────────────────────────────────────

export async function updateProject(id: string, formData: FormData) {
  const supabase = await createClient();

  // Upload any NEW files; keep existing URLs as-is
  const imageFiles = formData.getAll("imageFiles") as File[];
  const existingUrls = formData.getAll("existingImages") as string[];
  const thumbnailIndex = parseInt((formData.get("thumbnailIndex") as string) ?? "0");

  const newUrls: string[] = [];
  for (const file of imageFiles) {
    if (file.size > 0) {
      const url = await uploadFile(supabase, file);
      newUrls.push(url);
    }
  }

  const allImages = [...existingUrls, ...newUrls];
  const thumbnail = allImages[thumbnailIndex] ?? allImages[0] ?? "";

  const { error } = await supabase
    .from("projects")
    .update({
      title:       formData.get("title") as string,
      category:    formData.get("category") as string,
      client:      formData.get("client") as string,
      year:        parseInt(formData.get("year") as string),
      description: (formData.get("description") as string) ?? "",
      thumbnail,
      images:      allImages,
      updated_at:  new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

// ─── Delete ───────────────────────────────────────────────────────────────────

/** Extract the storage object path from a Supabase public URL.
 *  e.g. "https://xxx.supabase.co/storage/v1/object/public/projects/my-file.jpg"
 *  → "my-file.jpg"
 */
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

export async function deleteProject(id: string) {
  const supabase = await createClient();

  // 1. Fetch the project's image URLs before deleting
  const { data: project, error: fetchError } = await supabase
    .from("projects")
    .select("images, thumbnail")
    .eq("id", id)
    .single();

  if (fetchError) throw new Error(fetchError.message);

  // 2. Collect every unique storage path (images array + thumbnail)
  const allUrls = Array.from(
    new Set([...(project.images ?? []), project.thumbnail].filter(Boolean))
  );

  const storagePaths = allUrls
    .map((url) => storagePathFromUrl(url, "projects"))
    .filter((p): p is string => p !== null);

  // 3. Delete files from Storage (best-effort — don't block on partial failure)
  if (storagePaths.length > 0) {
    await supabase.storage.from("projects").remove(storagePaths);
  }

  // 4. Delete the DB row
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/projects");
}
