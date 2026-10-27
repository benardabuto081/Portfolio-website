import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { PageHeader } from "@/components/ui/PageHeader";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Work",
  description:
    "Sauti Labs, Scribe AI, Rentra, and QueleaGuard: African speech and language AI, offline speech systems, product engineering, and applied machine learning research.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHeader index="02" label="Work" title="Work at the intersection of research and systems.">
        <p>
          These projects explore different parts of the same problem: how to turn technical ideas into systems that
          can be understood, evaluated, and used. Some are active engineering efforts; others are ongoing research.
          Each reflects a different part of how I approach building.
        </p>
      </PageHeader>
      <ProjectShowcase />
    </>
  );
}
