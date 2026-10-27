import { ResearchBody } from "@/components/sections/Research";
import { PageHeader } from "@/components/ui/PageHeader";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Research",
  description:
    "How Bernard Abuto thinks about machine learning as a system — data, experiments, models, evaluation, systems, and applications — and the research questions he keeps returning to.",
  path: "/research",
});

export default function ResearchPage() {
  return (
    <>
      <PageHeader index="03" label="Research" title="Between the model and the system.">
        <p>
          Machine learning is more than the model itself. It is also the data, the experiments, the evaluation, the
          infrastructure, and the decisions that determine whether a method works outside a notebook. I&apos;m
          interested in the engineering that connects these pieces.
        </p>
      </PageHeader>
      <ResearchBody />
    </>
  );
}
