import Link from "next/link";
import { getProject, type Project } from "@/content/projects";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { TextLink } from "@/components/ui/TextLink";

function ProjectMeta({ project, index }: { project: Project; index: number }) {
  return (
    <div className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-y-1.5">
      <span className="meta text-muted">P.{String(index).padStart(2, "0")}</span>
      <span className="meta text-fg">{project.category}</span>
      <span className="meta col-start-2 flex items-center gap-2 text-accent">
        <span aria-hidden="true" className="h-px w-3 bg-accent" />
        {project.status}
      </span>
    </div>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
      <Link
        href={`/work/${project.slug}`}
        className="group inline-flex min-h-11 items-center gap-3 border-b border-fg pb-1 text-[0.9375rem] font-medium"
      >
        {project.cta}
        <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </Link>
      <TextLink href={project.source.href} className="text-sm text-muted hover:text-fg" label={`${project.source.label} (opens in a new tab)`}>
        {project.source.short ?? "Source"}
      </TextLink>
    </div>
  );
}

function ProjectText({
  project,
  index,
  titleClass,
}: {
  project: Project;
  index: number;
  titleClass: string;
}) {
  return (
    <div>
      <ProjectMeta project={project} index={index} />
      <h3 className={`mt-5 font-serif leading-[1.02] tracking-[-0.01em] ${titleClass}`}>
        <Link href={`/work/${project.slug}`} className="hover:text-accent transition-colors duration-200">
          {project.title}
        </Link>
      </h3>
      <p className="mt-5 max-w-[48ch] text-[1.0625rem] leading-relaxed text-muted">{project.summary}</p>
      <ProjectLinks project={project} />
    </div>
  );
}

/** Full project showcase for /work: editorial layout with each project's diagram. */
export function ProjectShowcase() {
  const sauti = getProject("sauti-labs")!;
  const scribe = getProject("scribe-ai")!;
  const rentra = getProject("rentra")!;
  const quelea = getProject("queleaguard")!;

  return (
    <section aria-label="Projects" className="page-container pb-24 pt-12 lg:pb-32 lg:pt-20">
      {/* Feature: Sauti Labs */}
      <article className="grid gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <ProjectText project={sauti} index={1} titleClass="text-5xl sm:text-6xl lg:text-[4.25rem]" />
        </div>
        <div className="lg:col-span-8">
          <ProjectVisual kind={sauti.visual} />
        </div>
      </article>

      {/* Pair: Scribe AI and Rentra */}
      <div className="mt-16 grid border-t border-line lg:mt-24 lg:grid-cols-2">
        <article className="flex flex-col gap-10 pt-10 lg:border-r lg:border-line lg:pr-10 lg:pt-14">
          <ProjectText project={scribe} index={2} titleClass="text-[2.75rem] sm:text-5xl" />
          <ProjectVisual kind={scribe.visual} compact />
        </article>
        <article className="mt-16 flex flex-col gap-10 border-t border-line pt-10 lg:mt-0 lg:border-t-0 lg:pl-10 lg:pt-14">
          <ProjectText project={rentra} index={3} titleClass="text-[2.75rem] sm:text-5xl" />
          <ProjectVisual kind={rentra.visual} compact />
        </article>
      </div>

      {/* Wide, reversed: QueleaGuard */}
      <article className="mt-16 grid gap-10 border-t border-line pt-10 lg:mt-24 lg:grid-cols-12 lg:gap-10 lg:pt-14">
        <div className="lg:order-2 lg:col-span-5 lg:col-start-8">
          <ProjectText project={quelea} index={4} titleClass="text-5xl sm:text-6xl" />
        </div>
        <div className="lg:order-1 lg:col-span-6">
          <ProjectVisual kind={quelea.visual} compact />
        </div>
      </article>
    </section>
  );
}
