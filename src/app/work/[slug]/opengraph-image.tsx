import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";
import { ogSize, renderOgCard } from "@/lib/og";

export const alt = `Project by ${site.name}`;
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug) ?? projects[0];
  return renderOgCard({
    eyebrow: project.category.toUpperCase(),
    title: project.title,
    statement: project.summary,
    footer: `${site.name} · ${project.status}`,
  });
}
