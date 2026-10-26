import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="page-container py-24 lg:py-36">
      <p className="meta text-muted">404 / Not found</p>
      <h1 className="mt-6 max-w-[18ch] font-serif text-5xl leading-[1.05] sm:text-6xl">
        This page isn&apos;t part of the notebook.
      </h1>
      <p className="mt-6 max-w-[52ch] text-[1.0625rem] leading-relaxed text-muted">
        The address may be mistyped, or the page may have moved. These are the places that do exist:
      </p>
      <ul className="mt-10 max-w-xl border-t border-line">
        <li className="border-b border-line py-4">
          <Link href="/" className="link-underline">
            Home
          </Link>
        </li>
        <li className="border-b border-line py-4">
          <Link href="/blog" className="link-underline">
            Blog
          </Link>
        </li>
        {projects.map((project) => (
          <li key={project.slug} className="flex justify-between gap-4 border-b border-line py-4">
            <Link href={`/work/${project.slug}`} className="link-underline">
              {project.title}
            </Link>
            <span className="meta text-muted">{project.status}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
