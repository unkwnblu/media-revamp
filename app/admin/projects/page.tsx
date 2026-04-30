import { createClient } from "@/lib/supabase/server";
import ProjectsTable from "./components/ProjectsTable";

export default async function AdminProjectsPage() {
  const supabase = await createClient();

  const { data: projects, error } = await supabase
    .from("projects")
    .select("id, title, category, client, year, thumbnail")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm max-w-xl">
        <span>⚠</span> Failed to load projects: {error.message}
      </div>
    );
  }

  return <ProjectsTable projects={projects ?? []} />;
}
