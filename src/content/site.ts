/**
 * Site-wide identity, links, and asset locations.
 *
 * The production domain is read from NEXT_PUBLIC_SITE_URL so it can be changed
 * in Vercel without editing code. The fallback is the current known address.
 */
const DEFAULT_SITE_URL = "https://bernard-portfolio-vert.vercel.app";

export const site = {
  name: "Bernard Abuto",
  role: "Machine Learning Research Engineer · AI Systems Engineer",
  location: "Kenya",
  url: (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, ""),
  title: "Bernard Abuto — Machine Learning Research Engineer",
  description:
    "Bernard Abuto is a machine learning research engineer and AI systems engineer in Kenya, working across machine learning, African language technology, and research-oriented software systems.",
  email: "benardabuto081@gmail.com",
  links: {
    github: "https://github.com/benardabuto081",
    linkedin: "https://www.linkedin.com/in/bernard-abuto-888207343/",
  },
  /** Shown automatically when the file exists in /public — see src/lib/assets.ts. */
  assets: {
    portrait: "/images/bernard-portrait.jpg",
  },
} as const;

export const navigation = [
  { key: "work", label: "Work", href: "/#work" },
  { key: "research", label: "Research", href: "/#research" },
  { key: "experience", label: "Experience", href: "/#experience" },
  { key: "blog", label: "Blog", href: "/blog" },
  { key: "about", label: "About", href: "/#about" },
  { key: "contact", label: "Contact", href: "/#contact" },
] as const;

export type NavKey = (typeof navigation)[number]["key"];
