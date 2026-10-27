import { pipelineStages, researchInterests } from "@/content/research";
import { ResearchPipeline } from "./ResearchPipeline";

const roman = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"];

/** Body of /research: the interactive pipeline and research interests. */
export function ResearchBody() {
  return (
    <section aria-label="Research and engineering" className="page-container pb-24 pt-4 lg:pb-32 lg:pt-8">

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
