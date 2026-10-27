import Link from "next/link";
import { site } from "@/content/site";
import { Portrait } from "@/components/ui/Portrait";
import { TextLink } from "@/components/ui/TextLink";

export function Hero() {
  return (
    <section aria-labelledby="hero-name" className="page-container pt-12 pb-20 sm:pt-16 lg:pt-24 lg:pb-28">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="animate-rise lg:col-span-7">
          <p className="meta text-accent">INDEPENDENT ENGINEERING &amp; RESEARCH</p>

          <h1
            id="hero-name"
            className="mt-6 font-serif text-[3.5rem] leading-[0.95] tracking-[-0.02em] sm:text-7xl lg:text-[6.25rem]"
          >
            Bernard Abuto
          </h1>
          <p className="mt-4 text-[0.9375rem] font-medium text-fg sm:text-base">{site.role}</p>

          <p className="mt-10 max-w-[24ch] border-t border-line pt-8 font-serif text-[1.875rem] leading-[1.12] sm:text-[2.375rem] lg:text-[2.625rem]">
            I build the systems that bring machine learning research <em>into practice.</em>
          </p>

          <p className="mt-6 max-w-[56ch] text-[1.0625rem] leading-relaxed text-muted">
            My work sits at the intersection of machine learning research, systems engineering, and African
            language technology. I&apos;m interested in what it takes to turn research ideas into reproducible
            experiments, reliable infrastructure, and useful AI systems.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <Link
              href="/work"
              className="inline-flex min-h-12 items-center gap-3 bg-fg px-6 text-sm font-medium text-canvas transition-colors duration-200 hover:bg-accent"
            >
              Explore my work
              <span aria-hidden="true">→</span>
            </Link>
            <div className="flex items-center gap-8">
              <TextLink href={site.links.github} className="text-sm">
                GitHub
              </TextLink>
              <TextLink href={site.links.linkedin} className="text-sm">
                LinkedIn
              </TextLink>
              <a href={site.resume.pdf} download className="link-underline text-sm">
                Resume <span aria-hidden="true">↓</span>
                <span className="sr-only"> (PDF download)</span>
              </a>
            </div>
          </div>

          <p className="meta mt-12 flex items-center gap-3 text-muted">
            <span aria-hidden="true" className="h-px w-8 bg-muted/50" />
            KENYA
          </p>
        </div>

        <div className="mx-auto w-full max-w-[18rem] sm:max-w-sm lg:col-span-4 lg:col-start-9 lg:max-w-none lg:pt-2">
          <Portrait />
        </div>
      </div>
    </section>
  );
}
