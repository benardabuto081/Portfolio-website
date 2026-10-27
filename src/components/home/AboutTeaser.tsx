import Link from "next/link";
import { site } from "@/content/site";
import { SectionHeader } from "@/components/ui/SectionHeader";

/** Short introduction on the homepage, pointing to /about for the full picture. */
export function AboutTeaser() {
  return (
    <section aria-labelledby="home-about-heading" className="page-container py-16 lg:py-24">
      <SectionHeader meta="About" heading="A little about how I work." headingId="home-about-heading" />
      <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12">
        <p className="font-serif text-[1.625rem] leading-[1.3] sm:text-[1.875rem] lg:col-span-6 lg:col-start-4">
          I&apos;m interested in the space between an idea in a research paper and a system that works in practice —
          and in being honest about what the results show.
        </p>
        <div className="flex flex-col items-start gap-3 lg:col-span-3 lg:col-start-10 lg:pt-2">
          <Link href="/about" className="link-underline text-sm font-medium">
            Experience &amp; education <span aria-hidden="true">→</span>
          </Link>
          <a href={site.resume.pdf} download className="link-underline text-sm text-muted hover:text-fg">
            Resume (PDF) <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
