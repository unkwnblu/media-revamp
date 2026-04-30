import { projects } from "@/lib/data";
import { notFound } from "next/navigation";
import ProjectForm from "../components/ProjectForm";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  return <ProjectForm isEdit project={project} />;
}
