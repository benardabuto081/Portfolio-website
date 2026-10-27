import { experience } from "@/content/experience";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="page-container py-16 lg:py-24">
      <SectionHeader meta="Experience" heading="Where the work happens." headingId="experience-heading" />

      <ol className="mt-14 lg:mt-20">
        {experience.map((item) => (
          <li key={item.organization} className="grid gap-4 border-t border-line py-10 lg:grid-cols-12 lg:gap-10">
            <p className="meta text-muted lg:col-span-3 lg:pt-2">{item.dates}</p>
            <div className="lg:col-span-4">
              <h3 className="font-serif text-[2rem] leading-tight">{item.organization}</h3>
              <p className="mt-2 text-[0.9375rem] font-medium">{item.role}</p>
              {item.link ? (
                <p className="mt-4 text-sm text-muted">
                  <TextLink href={item.link.href} className="hover:text-fg">
                    {item.link.label}
                  </TextLink>
                </p>
              ) : null}
            </div>
            <div className="max-w-[62ch] space-y-4 leading-relaxed text-muted lg:col-span-5">
              {item.description.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
