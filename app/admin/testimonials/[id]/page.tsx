import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import TestimonialForm from "../components/TestimonialForm";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: testimonial, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !testimonial) notFound();

  return <TestimonialForm isEdit testimonial={testimonial} />;
}
