import { Awards } from "@/components/sections/Awards";
import { PageHeader } from "@/components/ui/PageHeader";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Awards",
  description:
    "Awards and recognition for collaborative work in applied machine learning, healthcare technology, and AI.",
  path: "/awards",
});

export default function AwardsPage() {
  return (
    <>
      <PageHeader index="03" label="Awards" title="Recognition for work that matters.">
        <p>
          Recognition earned through collaborative problem-solving, applied research, and building
          technology around real-world challenges.
        </p>
      </PageHeader>
      <Awards />
    </>
  );
}
