import { createClient } from "@/lib/supabase/server";
import TestimonialsTable from "./components/TestimonialsTable";

export default async function AdminTestimonialsPage() {
  const supabase = await createClient();

  const { data: testimonials, error } = await supabase
    .from("testimonials")
    .select("id, quote, author, role")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm max-w-xl">
        <span>⚠</span> Failed to load testimonials: {error.message}
      </div>
    );
  }

  return <TestimonialsTable testimonials={testimonials ?? []} />;
}
