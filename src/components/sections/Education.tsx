import { education } from "@/content/education";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Education() {
  return (
    <section id="education" aria-labelledby="education-heading" className="page-container py-16 lg:py-24">
      <SectionHeader meta="Education" heading="Education & training." headingId="education-heading" />
      <div className="mt-14 grid lg:mt-20 lg:grid-cols-12 lg:gap-10">
        <ol className="border-t border-line lg:col-span-9 lg:col-start-4">
          {education.map((entry) => (
            <li
              key={`${entry.institution}-${entry.programme}`}
              className="grid gap-1 border-b border-line py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-x-8"
            >
              <div>
                <p className="text-[1.0625rem] font-medium">{entry.programme}</p>
                <p className="mt-0.5 text-[0.9375rem] text-muted">
                  {entry.institution}
                  {entry.note ? (
                    <>
                      <span aria-hidden="true"> · </span>
                      <span className="text-accent">
                        <span className="sr-only">{entry.note.label}: </span>
                        {entry.note.value}
                      </span>
                    </>
                  ) : null}
                </p>
              </div>
              <p className="meta text-muted sm:pt-1.5 sm:text-right">{entry.dates}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
