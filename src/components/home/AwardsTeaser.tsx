import Link from "next/link";
import { awards } from "@/content/awards";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function AwardsTeaser() {
  const featured = awards[0];

  return (
    <section aria-labelledby="home-awards-heading" className="page-container py-16 lg:py-24">
      <SectionHeader
        meta="Recognition"
        heading="Work recognised beyond the build."
        headingId="home-awards-heading"
      >
        <p>
          Selected recognition for collaborative work in applied machine learning and AI.
        </p>
      </SectionHeader>

      <div className="mt-10 grid gap-6 border-t border-line pt-6 sm:grid-cols-12 lg:mt-14">
        <p className="meta text-muted sm:col-span-3">{featured.date}</p>
        <div className="sm:col-span-6">
          <h3 className="font-serif text-3xl">{featured.title}</h3>
          <p className="mt-2 text-muted">{featured.event}</p>
          <p className="meta mt-4 text-accent">{featured.placement}</p>
        </div>
        <div className="sm:col-span-3 sm:text-right">
          <Link href="/awards" className="link-underline text-sm">
            View award details <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
