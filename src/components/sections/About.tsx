import { ResumeDownload } from "@/components/ui/ResumeDownload";

/** Body of /about: how I work, with the resume download alongside. */
export function AboutBody() {
  return (
    <section aria-label="How I work" className="page-container py-14 lg:py-20">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="space-y-6 lg:col-span-6 lg:col-start-4">
          <p className="font-serif text-[1.625rem] leading-[1.3] sm:text-[1.875rem]">
            I&apos;m interested in the space between an idea in a research paper and a system that works in
            practice. That means understanding the problem, working through the technical details, building
            carefully, and being honest about what the results show.
          </p>
          <p className="max-w-[60ch] text-[1.0625rem] leading-relaxed text-muted">
            My work brings together software engineering, machine learning, and research-oriented problem solving. I
            am particularly interested in African language technology and the engineering foundations that can make
            research in this area more reproducible, extensible, and useful.
          </p>
          <p className="max-w-[60ch] text-[1.0625rem] leading-relaxed text-muted">
            I value clear technical reasoning, documented decisions, careful evaluation, and systems that can be
            understood and improved by the people who work on them.
          </p>
        </div>
        <div className="lg:col-span-3 lg:pt-2">
          <ResumeDownload />
        </div>
      </div>
    </section>
  );
}
