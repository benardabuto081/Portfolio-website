import { cacheLife } from "next/cache";
import Link from "next/link";
import { navigation, site } from "@/content/site";
import { TextLink } from "@/components/ui/TextLink";

/** Cached so the footer stays static; refreshed daily on revalidation. */
async function getCurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function SiteFooter() {
  const year = await getCurrentYear();

  return (
    <footer className="border-t border-line">
      <nav aria-label="Site" className="page-container">
        <ul className="flex flex-wrap gap-x-8 gap-y-3 border-b border-line py-8 text-sm">
          {navigation.map((item) => (
            <li key={item.key}>
              <Link href={item.href} className="link-underline text-muted hover:text-fg">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="page-container grid gap-8 py-10 text-muted sm:grid-cols-2 sm:items-end">
        <div className="space-y-2">
          <p className="meta text-fg">BERNARD ABUTO · KENYA</p>
          <p className="meta">ENGINEERING · RESEARCH · SYSTEMS</p>
        </div>
        <div className="flex flex-col gap-4 sm:items-end">
          <ul className="flex gap-6 text-sm" aria-label="Elsewhere">
            <li>
              <TextLink href={site.links.github} className="hover:text-fg">
                GitHub
              </TextLink>
            </li>
            <li>
              <TextLink href={site.links.linkedin} className="hover:text-fg">
                LinkedIn
              </TextLink>
            </li>
          </ul>
          <p className="meta">© {year} Bernard Abuto</p>
        </div>
      </div>
    </footer>
  );
}
