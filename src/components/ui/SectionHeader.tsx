import type { ReactNode } from "react";

type SectionHeaderProps = {
  /** e.g. "01 / Selected work" — rendered as mono metadata. */
  meta: string;
  heading: string;
  headingId: string;
  children?: ReactNode;
};

/**
 * The recurring section opener: a hairline rule, mono metadata in the left
 * column, and an editorial heading with an optional introduction on the right.
 */
export function SectionHeader({ meta, heading, headingId, children }: SectionHeaderProps) {
  return (
    <header className="grid gap-6 border-t border-fg pt-5 lg:grid-cols-12 lg:gap-10">
      <p className="meta text-muted lg:col-span-3">{meta}</p>
      <div className="lg:col-span-9">
        <h2
          id={headingId}
          className="max-w-[22ch] font-serif text-[2.5rem] leading-[1.05] tracking-[-0.01em] sm:text-5xl lg:text-[3.5rem]"
        >
          {heading}
        </h2>
        {children ? (
          <div className="mt-6 max-w-[62ch] text-[1.0625rem] leading-relaxed text-muted">{children}</div>
        ) : null}
      </div>
    </header>
  );
}
