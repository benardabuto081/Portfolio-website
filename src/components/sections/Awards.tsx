import Link from "next/link";
import { awards } from "@/content/awards";

export function Awards() {
  return (
    <div className="page-container py-16 lg:py-24">
      <ol className="space-y-12">
        {awards.map((award, index) => (
          <li key={award.slug} className="border-t border-fg pt-5">
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-3">
                <p className="meta text-muted">
                  <span className="text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {" / "}
                  {award.date}
                </p>
                <p className="meta mt-4 text-muted">{award.institution}</p>
              </div>

              <div className="lg:col-span-9">
                <p className="meta text-accent">{award.placement}</p>
                <h2 className="mt-3 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
                  <Link
                    href={`/awards/${award.slug}`}
                    className="transition-colors duration-200 hover:text-accent"
                  >
                    {award.title}
                  </Link>
                </h2>
                <p className="mt-2 text-lg text-muted">{award.subtitle}</p>
                <p className="meta mt-8 text-muted">{award.event}</p>
                <p className="mt-4 max-w-[68ch] text-lg leading-relaxed">
                  {award.recognition}
                </p>
                <p className="mt-4 max-w-[68ch] leading-relaxed text-muted">
                  {award.summary}
                </p>

                <Link
                  href={`/awards/${award.slug}`}
                  className="group mt-8 inline-flex min-h-11 items-center gap-3 border-b border-fg pb-1 text-[0.9375rem] font-medium"
                >
                  Read the project story
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
