import type { ReactNode } from "react";

type PageHeaderProps = {
  /** Position in the site's navigation, e.g. "01". */
  index: string;
  /** Page name, shown in the mono label. */
  label: string;
  title: string;
  children?: ReactNode;
};

/**
 * Opening band for every top-level page. The full-width panel background and
 * rule mark the start of a new page, distinct from in-page section headers.
 */
export function PageHeader({ index, label, title, children }: PageHeaderProps) {
  return (
    <header className="border-b border-line bg-panel">
      <div className="page-container pb-12 pt-14 sm:pt-20 lg:pb-16 lg:pt-24">
        <p className="meta flex items-center gap-3 text-muted">
          <span className="text-accent">{index}</span>
          <span aria-hidden="true" className="h-px w-8 bg-muted/50" />
          {label}
        </p>
        <h1 className="animate-rise mt-6 max-w-[20ch] font-serif text-[2.875rem] leading-[1] tracking-[-0.02em] sm:text-6xl lg:text-[5rem]">
          {title}
        </h1>
        {children ? (
          <div className="mt-8 max-w-[62ch] space-y-4 text-[1.0625rem] leading-relaxed text-muted lg:text-lg">
            {children}
          </div>
        ) : null}
      </div>
    </header>
  );
}
