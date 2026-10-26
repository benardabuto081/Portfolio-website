import type { ReactNode } from "react";

type FigureProps = {
  /** Short mono label shown above the diagram, e.g. "Conceptual flow". */
  label: string;
  /** Honest description of what the figure is and is not. */
  caption: string;
  children: ReactNode;
  className?: string;
};

export function Figure({ label, caption, children, className = "" }: FigureProps) {
  return (
    <figure className={`notebook-grid border border-line ${className}`}>
      <div className="flex items-center justify-between gap-4 border-b border-line bg-panel/80 px-4 py-2.5">
        <span className="meta text-muted">{label}</span>
        <span className="meta text-muted">Illustrative</span>
      </div>
      <div className="p-4 sm:p-6">{children}</div>
      <figcaption className="border-t border-line bg-canvas px-4 py-3 text-[0.8125rem] leading-snug text-muted">
        {caption}
      </figcaption>
    </figure>
  );
}
