import Link from "next/link";
import { projects } from "@/content/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";

/** Homepage overview of projects; the full showcase lives at /work. */
export function WorkList() {
  return (
    <section aria-labelledby="home-work-heading" className="page-container py-16 lg:py-24">
      <SectionHeader meta="Selected work" heading="Work at the intersection of research and systems." headingId="home-work-heading">
        <p>
          A company I lead, two applied AI systems, and an ongoing research project — each a different part of the
          same question: how technical ideas become systems that can be understood, evaluated, and used.
        </p>
      </SectionHeader>

      <ol className="mt-10 lg:mt-14">
        {projects.map((project, index) => (
          <li key={project.slug} className="border-b border-line">
            <Link
              href={`/work/${project.slug}`}
              className="group grid gap-3 py-8 transition-colors duration-200 hover:bg-panel sm:px-4 lg:grid-cols-12 lg:items-baseline lg:gap-10"
            >
              <span className="meta text-muted lg:col-span-1">P.{String(index + 1).padStart(2, "0")}</span>
              <span className="lg:col-span-4">
                <span className="block font-serif text-[2.25rem] leading-none transition-colors duration-200 group-hover:text-accent sm:text-[2.75rem]">
                  {project.title}
                </span>
                <span className="meta mt-3 block text-accent">{project.status}</span>
              </span>
              <span className="max-w-[58ch] leading-relaxed text-muted lg:col-span-6">{project.summary}</span>
              <span
                aria-hidden="true"
                className="hidden text-right text-lg transition-transform duration-200 group-hover:translate-x-1 lg:col-span-1 lg:block"
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ol>
      <p className="mt-8 text-sm">
        <Link href="/work" className="link-underline">
          See the work in detail, with architecture diagrams <span aria-hidden="true">→</span>
        </Link>
      </p>
    </section>
  );
}
