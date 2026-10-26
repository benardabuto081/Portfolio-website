import { site } from "@/content/site";
import { ogSize, renderOgCard } from "@/lib/og";

export const alt = `${site.name} — ${site.role}`;
export const size = ogSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderOgCard({
    eyebrow: "INDEPENDENT ENGINEERING & RESEARCH",
    title: site.name,
    statement: "I build the systems that bring machine learning research into practice.",
    footer: site.role,
  });
}
