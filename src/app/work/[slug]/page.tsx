import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProjectArticle } from "@/components/projects/ProjectArticle";
import { getProject, projects } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.title} — ${project.category}`,
    description: project.summary,
    path: `/work/${project.slug}`,
  });
}

// Params are read inside Suspense so the route's shared shell stays URL-independent
// (Partial Prefetching). Known slugs are still fully prerendered via generateStaticParams.
export default function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  return (
    <Suspense fallback={<div aria-busy="true" className="min-h-[70vh]" />}>
      <Project params={params} />
    </Suspense>
  );
}

async function Project({ params }: Pick<PageProps<"/work/[slug]">, "params">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <ProjectArticle project={project} />;
}
