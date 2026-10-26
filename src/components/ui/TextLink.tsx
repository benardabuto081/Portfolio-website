import Link from "next/link";
import type { ReactNode } from "react";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  /** Accessible name when the visible text needs more context. */
  label?: string;
};

const isExternal = (href: string) => /^(https?:|mailto:)/.test(href);

/**
 * Inline text link with the drawn-underline hover. External http(s) links open
 * in a new tab, show ↗, and announce that to screen readers.
 */
export function TextLink({ href, children, className = "", label }: TextLinkProps) {
  const classes = `link-underline ${className}`;

  if (!isExternal(href)) {
    return (
      <Link href={href} className={classes} aria-label={label}>
        {children}
      </Link>
    );
  }

  const newTab = href.startsWith("http");
  return (
    <a
      href={href}
      className={classes}
      aria-label={label}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      {newTab ? (
        <>
          <span aria-hidden="true"> ↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </>
      ) : null}
    </a>
  );
}
