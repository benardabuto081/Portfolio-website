import type { Metadata } from "next";
import { site } from "@/content/site";

export function absoluteUrl(path = "/"): string {
  return new URL(path, site.url).toString();
}

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_KE",
      title,
      description,
      url: path,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/** Person structured data — only verifiable facts and real profile URLs. */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    jobTitle: "Machine Learning Research Engineer",
    address: {
      "@type": "PostalAddress",
      addressCountry: "KE",
    },
    worksFor: { "@type": "Organization", name: "Sauti Labs", url: "https://sautilabs.co.ke" },
    sameAs: [site.links.github, site.links.linkedin],
  };
}
