import { pipelineStages, researchInterests } from "@/content/research";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ResearchPipeline } from "./ResearchPipeline";

const roman = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"];

export function Research() {
  return (
    <section id="research" aria-labelledby="research-heading" className="page-container py-16 lg:py-24">
      <SectionHeader meta="02 / Research & engineering" heading="Between the model and the system." headingId="research-heading">
        <p>
          Machine learning is more than the model itself. It is also the data, the experiments, the evaluation, the
          infrastructure, and the decisions that determine whether a method works outside a notebook. I&apos;m
          interested in the engineering that connects these pieces.
        </p>
      </SectionHeader>

      <ResearchPipeline stages={pipelineStages} />

      <div className="mt-24 grid gap-10 lg:mt-32 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h3 className="max-w-[14ch] font-serif text-[2.25rem] leading-[1.05] sm:text-[2.75rem]">
            Questions I keep coming back to.
          </h3>
          <p className="mt-5 max-w-[36ch] leading-relaxed text-muted">
            These are the areas I want to investigate more deeply through implementation, experimentation, and
            research.
          </p>
        </div>
        <ol className="grid border-t border-line sm:grid-cols-2 sm:gap-x-10 lg:col-span-8">
          {researchInterests.map((interest, index) => (
            <li key={interest} className="flex items-baseline gap-5 border-b border-line py-5">
              <span className="meta w-8 shrink-0 text-accent">{roman[index]}.</span>
              <span className="font-serif text-[1.375rem] leading-snug sm:text-2xl">{interest}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
