import Link from "next/link";
import type { ReactNode } from "react";
import { getAdjacentProjects, type Project, type ProjectHeading } from "@/content/projects";
import { StateTag } from "@/components/ui/StateTag";
import { TextLink } from "@/components/ui/TextLink";
import { ProjectVisual } from "./ProjectVisual";

function Block({ index, title, id, children }: { index: string; title: string; id: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="grid gap-5 border-t border-line py-12 lg:grid-cols-12 lg:gap-10 lg:py-16">
      <div className="lg:col-span-3">
        <p className="meta text-muted">{index}</p>
        <h2 id={id} className="mt-2 font-serif text-[1.875rem] leading-tight sm:text-[2.25rem]">
          {title}
        </h2>
      </div>
      <div className="lg:col-span-8 lg:col-start-5">{children}</div>
    </section>
  );
}

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="max-w-[66ch] space-y-5 text-[1.0625rem] leading-relaxed text-fg/85">
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 40)}>{paragraph}</p>
      ))}
    </div>
  );
}

const defaultHeadings: Record<ProjectHeading, string> = {
  question: "The question",
  approach: "Technical approach",
  components: "Components and their status",
  contribution: "My contribution",
  decisions: "Engineering decisions",
  currentState: "Current state",
  nextQuestions: "Next questions",
};

export function ProjectArticle({ project }: { project: Project }) {
  const { previous, next } = getAdjacentProjects(project.slug);
  const heading = (key: ProjectHeading) => project.headings?.[key] ?? defaultHeadings[key];

  return (
    <article>
      <div className="border-b border-line bg-panel">
        <header className="page-container pb-12 pt-10 sm:pt-14 lg:pb-16 lg:pt-20">
          <nav aria-label="Breadcrumb">
            <ol className="meta flex flex-wrap items-center gap-2 text-muted">
              <li>
                <Link href="/work" className="link-underline hover:text-fg">
                  Work
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-fg">
                {project.title}
              </li>
            </ol>
          </nav>

          <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <h1 className="animate-rise font-serif text-[3.5rem] leading-[0.95] tracking-[-0.02em] sm:text-7xl lg:text-[6rem]">
                {project.title}
              </h1>
              <div className="mt-10 max-w-[62ch] space-y-5 text-[1.0625rem] leading-relaxed text-muted">
                {project.description.map((paragraph, index) => (
                  <p key={paragraph.slice(0, 40)} className={index === 0 ? "text-[1.1875rem] text-fg" : undefined}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <dl className="self-start border-t border-fg lg:col-span-4 lg:col-start-9">
              <div className="border-b border-line py-4">
                <dt className="meta text-muted">Category</dt>
                <dd className="mt-1.5 text-[0.9375rem]">{project.category}</dd>
              </div>
              <div className="border-b border-line py-4">
                <dt className="meta text-muted">Status</dt>
                <dd className="meta mt-1.5 text-[0.75rem] text-accent">{project.status}</dd>
              </div>
              <div className="border-b border-line py-4">
                <dt className="meta text-muted">{project.stackLabel ?? "Technology"}</dt>
                <dd className="mt-1.5 text-[0.9375rem] leading-relaxed">{project.stack.join(" · ")}</dd>
              </div>
              <div className="border-b border-line py-4">
                <dt className="meta text-muted">Links</dt>
                {[project.source, ...(project.links ?? [])].map((link) => (
                  <dd key={link.href} className="mt-1.5 text-[0.9375rem]">
                    <TextLink href={link.href}>{link.label}</TextLink>
                  </dd>
                ))}
              </div>
            </dl>
          </div>
        </header>
      </div>

      <div className="page-container mt-14 lg:mt-20">
        <ProjectVisual kind={project.visual} />
      </div>

      <div className="page-container mt-16 lg:mt-24">
        <Block index="01" title={heading("question")} id="question">
          <Prose paragraphs={project.question} />
        </Block>

        <Block index="02" title={heading("approach")} id="approach">
          <Prose paragraphs={project.approach} />
          <h3 className="meta mt-12 text-muted">{heading("components")}</h3>
          <ul className="mt-4 border-t border-fg">
            {project.components.map((component) => (
              <li
                key={component.name}
                className="grid gap-2 border-b border-line py-4 sm:grid-cols-[minmax(0,1fr)_11rem] sm:gap-6"
              >
                <div>
                  <p className="font-medium">{component.name}</p>
                  <p className="mt-1 text-[0.9375rem] leading-snug text-muted">{component.detail}</p>
                </div>
                {component.state ? (
                  <div className="sm:pt-1">
                    <StateTag state={component.state} label={component.stateLabel} />
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </Block>

        <Block index="03" title={heading("contribution")} id="contribution">
          <Prose paragraphs={project.contribution} />
        </Block>

        <Block index="04" title={heading("decisions")} id="decisions">
          <ol className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {project.decisions.map((decision, index) => (
              <li key={decision.title}>
                <p className="meta text-accent">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-serif text-[1.5rem] leading-snug">{decision.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{decision.body}</p>
              </li>
            ))}
          </ol>
        </Block>

        <Block index="05" title={heading("currentState")} id="current-state">
          <div className="border border-line bg-panel">
            <p className="meta border-b border-line px-5 py-3 text-fg sm:px-6">Status · {project.status}</p>
            <div className="px-5 py-6 sm:px-6 sm:py-8">
              <p className="max-w-[62ch] text-[1.0625rem] leading-relaxed">{project.currentState.summary}</p>
              <ul className="mt-6 space-y-3 border-t border-line pt-6">
                {project.currentState.notes.map((note) => (
                  <li key={note} className="flex gap-3 text-[0.9375rem] leading-relaxed text-muted">
                    <span aria-hidden="true" className="text-fg">
                      —
                    </span>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Block>

        <Block index="06" title={heading("nextQuestions")} id="next-questions">
          <ol className="space-y-5">
            {project.nextQuestions.map((question, index) => (
              <li key={question} className="flex max-w-[66ch] gap-4 text-[1.0625rem] leading-relaxed">
                <span className="meta w-6 shrink-0 pt-1.5 text-muted">{String.fromCharCode(97 + index)}.</span>
                {question}
              </li>
            ))}
          </ol>
        </Block>
      </div>

      <nav aria-label="More projects" className="page-container mt-8 mb-16 lg:mb-24">
        <div className="grid border-y border-fg sm:grid-cols-2">
          <Link
            href={`/work/${previous.slug}`}
            className="group border-b border-line py-8 transition-colors duration-200 hover:bg-panel sm:border-b-0 sm:border-r sm:pr-8"
          >
            <span className="meta text-muted">
              <span aria-hidden="true">← </span>Previous project
            </span>
            <span className="mt-2 block font-serif text-[2rem] leading-tight group-hover:text-accent">
              {previous.title}
            </span>
          </Link>
          <Link
            href={`/work/${next.slug}`}
            className="group py-8 text-left transition-colors duration-200 hover:bg-panel sm:pl-8 sm:text-right"
          >
            <span className="meta text-muted">
              Next project<span aria-hidden="true"> →</span>
            </span>
            <span className="mt-2 block font-serif text-[2rem] leading-tight group-hover:text-accent">
              {next.title}
            </span>
          </Link>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 py-6 text-sm">
          <Link href="/work" className="link-underline">
            <span aria-hidden="true">← </span>Back to all work
          </Link>
          <TextLink href={project.source.href} className="text-muted hover:text-fg">
            {project.source.label}
          </TextLink>
        </div>
      </nav>
    </article>
  );
}
