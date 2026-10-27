import Link from "next/link";

/** Closing call to action on the homepage; the form lives at /contact. */
export function ContactBand() {
  return (
    <section aria-labelledby="home-contact-heading" className="border-t border-line bg-panel">
      <div className="page-container flex flex-col gap-8 py-16 lg:flex-row lg:items-end lg:justify-between lg:py-24">
        <div>
          <p className="meta text-muted">Contact</p>
          <h2 id="home-contact-heading" className="mt-5 max-w-[18ch] font-serif text-[2.5rem] leading-[1.05] sm:text-5xl lg:text-[3.5rem]">
            Have a problem worth investigating?
          </h2>
        </div>
        <Link
          href="/contact"
          className="inline-flex min-h-12 shrink-0 items-center gap-3 self-start bg-fg px-7 text-sm font-medium text-canvas transition-colors duration-200 hover:bg-accent lg:self-auto"
        >
          Get in touch <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
