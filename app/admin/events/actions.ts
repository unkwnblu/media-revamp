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
    .from("events")
    .upload(path, file, { cacheControl: "3600", upsert: false });
  if (error) throw new Error(`Image upload failed: ${error.message}`);
  const { data: { publicUrl } } = supabase.storage.from("events").getPublicUrl(data.path);
  return publicUrl;
}

function storagePathFromUrl(url: string, bucket: string): string | null {
  try {
    const marker = `/storage/v1/object/public/${bucket}/`;
    const idx = url.indexOf(marker);
    if (idx === -1) return null;
    return decodeURIComponent(url.slice(idx + marker.length));
  } catch { return null; }
}

interface SessionPayload {
  name: string;
  date?: string;
  venue?: string;
  time?: string;
  ticket_price?: string;
  ticket_link?: string;
  is_upcoming: boolean;
  sort_order: number;
  thumbnail: string;   // existing URL or empty (new file coming via session_thumbnail_N)
  images: string[];    // kept existing URLs (new files coming via session_images_N)
}

// Upload thumbnail + gallery images for each session from FormData.
// Mutates the sessions array in place.
async function resolveSessionImages(
  supabase: Awaited<ReturnType<typeof createClient>>,
  formData: FormData,
  sessions: SessionPayload[]
): Promise<void> {
  await Promise.all(
    sessions.map(async (session, i) => {
      // Thumbnail
      const thumbFile = formData.get(`session_thumbnail_${i}`) as File | null;
      if (thumbFile && thumbFile.size > 0) {
        session.thumbnail = await uploadFile(supabase, thumbFile);
      }
      // Gallery — multiple files with the same key
      const galleryFiles = formData.getAll(`session_images_${i}`) as File[];
      const newUrls = await Promise.all(
        galleryFiles.filter((f) => f.size > 0).map((f) => uploadFile(supabase, f))
      );
      // Merge: kept existing + newly uploaded
      session.images = [...(session.images ?? []), ...newUrls];
    })
  );
}

// ─── Create ───────────────────────────────────────────────────────────────────

export async function createEvent(formData: FormData) {
  const supabase = await createClient();

  const imageFile = formData.get("imageFile") as File | null;
  let imageUrl = "";
  if (imageFile && imageFile.size > 0) imageUrl = await uploadFile(supabase, imageFile);

  const isRecurring = formData.get("is_recurring") === "true";
  const sessionsRaw = formData.get("sessions") as string | null;
  const sessions: SessionPayload[] = sessionsRaw ? JSON.parse(sessionsRaw) : [];

  if (isRecurring && sessions.length > 0) {
    await resolveSessionImages(supabase, formData, sessions);
  }

  const { data: event, error } = await supabase
    .from("events")
    .insert({
      title:        formData.get("title") as string,
      tagline:      formData.get("tagline") as string,
      description:  formData.get("description") as string,
      slug:         formData.get("slug") as string,
      image:        imageUrl,
      is_recurring: isRecurring,
      date:         isRecurring ? null : (formData.get("date") as string) || null,
      venue:        isRecurring ? null : (formData.get("venue") as string) || null,
      time:         isRecurring ? null : (formData.get("time") as string) || null,
      ticket_price: isRecurring ? null : (formData.get("ticket_price") as string) || null,
      ticket_link:  (formData.get("ticket_link") as string) || null,
      instagram:    (formData.get("instagram") as string) || null,
      twitter:      (formData.get("twitter") as string) || null,
      tiktok:       (formData.get("tiktok") as string) || null,
      facebook:     (formData.get("facebook") as string) || null,
      website:      (formData.get("website") as string) || null,
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);

  if (isRecurring && sessions.length > 0) {
    const { error: sessErr } = await supabase.from("event_sessions").insert(
      sessions.map((s, i) => ({ ...s, event_id: event.id, sort_order: i }))
    );
    if (sessErr) throw new Error(sessErr.message);
  }

  revalidatePath("/admin/events");
  revalidatePath("/events");
  redirect("/admin/events");
}

// ─── Update ───────────────────────────────────────────────────────────────────

export async function updateEvent(id: string, formData: FormData) {
  const supabase = await createClient();

  // Event cover image
  const imageFile = formData.get("imageFile") as File | null;
  const existingImage = formData.get("existingImage") as string;
  let imageUrl = existingImage;
  if (imageFile && imageFile.size > 0) {
    imageUrl = await uploadFile(supabase, imageFile);
    if (existingImage) {
      const oldPath = storagePathFromUrl(existingImage, "events");
      if (oldPath) await supabase.storage.from("events").remove([oldPath]);
    }
  }

  const isRecurring = formData.get("is_recurring") === "true";
  const sessionsRaw = formData.get("sessions") as string | null;
  const sessions: SessionPayload[] = sessionsRaw ? JSON.parse(sessionsRaw) : [];

  if (isRecurring && sessions.length > 0) {
    await resolveSessionImages(supabase, formData, sessions);
  }

  const { error } = await supabase
    .from("events")
    .update({
      title:        formData.get("title") as string,
      tagline:      formData.get("tagline") as string,
      description:  formData.get("description") as string,
      slug:         formData.get("slug") as string,
      image:        imageUrl,
      is_recurring: isRecurring,
      date:         isRecurring ? null : (formData.get("date") as string) || null,
      venue:        isRecurring ? null : (formData.get("venue") as string) || null,
      time:         isRecurring ? null : (formData.get("time") as string) || null,
      ticket_price: isRecurring ? null : (formData.get("ticket_price") as string) || null,
      ticket_link:  (formData.get("ticket_link") as string) || null,
      instagram:    (formData.get("instagram") as string) || null,
      twitter:      (formData.get("twitter") as string) || null,
      tiktok:       (formData.get("tiktok") as string) || null,
      facebook:     (formData.get("facebook") as string) || null,
      website:      (formData.get("website") as string) || null,
      updated_at:   new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  if (isRecurring) {
    // Fetch old sessions to clean up orphaned images from storage
    const { data: oldSessions } = await supabase
      .from("event_sessions")
      .select("thumbnail, images")
      .eq("event_id", id);

    if (oldSessions) {
      // Collect all old storage paths
      const oldPaths: string[] = [];
      for (const s of oldSessions as { thumbnail: string; images: string[] }[]) {
        if (s.thumbnail) { const p = storagePathFromUrl(s.thumbnail, "events"); if (p) oldPaths.push(p); }
        for (const img of s.images ?? []) { const p = storagePathFromUrl(img, "events"); if (p) oldPaths.push(p); }
      }

      // Keep paths that still appear in the new sessions
      const keptUrls = new Set<string>();
      for (const s of sessions) {
        if (s.thumbnail) keptUrls.add(s.thumbnail);
        for (const img of s.images ?? []) keptUrls.add(img);
      }

      const toRemove = oldPaths.filter((p) => {
        // Reconstruct URL from path to check against keptUrls — easier to just check path presence
        return ![...keptUrls].some((url) => url.includes(p));
      });

      if (toRemove.length > 0) {
        await supabase.storage.from("events").remove(toRemove);
      }
    }

    // Replace sessions
    await supabase.from("event_sessions").delete().eq("event_id", id);
    if (sessions.length > 0) {
      const { error: sessErr } = await supabase.from("event_sessions").insert(
        sessions.map((s, i) => ({ ...s, event_id: id, sort_order: i }))
      );
      if (sessErr) throw new Error(sessErr.message);
    }
  }

  revalidatePath("/admin/events");
  revalidatePath("/events");
  redirect("/admin/events");
}

// ─── Delete ───────────────────────────────────────────────────────────────────

export async function deleteEvent(id: string) {
  const supabase = await createClient();

  const { data: event, error: fetchError } = await supabase
    .from("events").select("image").eq("id", id).single();
  if (fetchError) throw new Error(fetchError.message);

  // Delete event cover
  if (event?.image) {
    const p = storagePathFromUrl(event.image, "events");
    if (p) await supabase.storage.from("events").remove([p]);
  }

  // Delete all session images
  const { data: sessions } = await supabase
    .from("event_sessions")
    .select("thumbnail, images")
    .eq("event_id", id);

  if (sessions) {
    const paths: string[] = [];
    for (const s of sessions as { thumbnail: string; images: string[] }[]) {
      if (s.thumbnail) { const p = storagePathFromUrl(s.thumbnail, "events"); if (p) paths.push(p); }
      for (const img of s.images ?? []) { const p = storagePathFromUrl(img, "events"); if (p) paths.push(p); }
    }
    if (paths.length > 0) await supabase.storage.from("events").remove(paths);
  }

  // ON DELETE CASCADE removes event_sessions rows automatically
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/events");
  revalidatePath("/events");
}
