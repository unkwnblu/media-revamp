"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTestimonial(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.from("testimonials").insert({
    quote:  formData.get("quote") as string,
    author: formData.get("author") as string,
    role:   (formData.get("role") as string) || null,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(id: string, formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("testimonials")
    .update({
      quote:      formData.get("quote") as string,
      author:     formData.get("author") as string,
      role:       (formData.get("role") as string) || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}
