import Link from "next/link";
import { Navigation } from "./Navigation";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/95 backdrop-blur-[2px] supports-[backdrop-filter]:bg-canvas/90">
      <a
        href="#main"
        className="meta sr-only z-50 bg-fg px-3 py-2 text-canvas focus:not-sr-only focus:absolute focus:left-4 focus:top-3"
      >
        Skip to content
      </a>
      <div className="page-container relative flex h-16 items-center justify-between">
        <Link href="/" className="text-[0.8125rem] font-medium tracking-[0.14em] text-fg">
          BERNARD ABUTO
        </Link>
        <Navigation />
      </div>
    </header>
  );
}
