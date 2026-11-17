import Image from "next/image";
import Link from "next/link";
import { awards } from "@/content/awards";
import { getAwardImage } from "@/lib/assets";
import { TextLink } from "@/components/ui/TextLink";
import { FemScanDiagram } from "@/components/projects/FemScanDiagram";
import { Figure } from "@/components/projects/Figure";

const award = awards[0];


function Block({
  index,
  title,
  id,
  children,
}: {
  index: string;
  title: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      className="grid gap-5 border-t border-line py-12 lg:grid-cols-12 lg:gap-10 lg:py-16"
    >
      <div className="lg:col-span-3">
        <p className="meta text-muted">{index}</p>
        <h2 id={id} className="mt-2 font-serif text-[1.875rem] leading-tight sm:text-[2.25rem]">
          {title}
        </h2>
      </div>
      <div className="lg:col-span-8 lg:col-start-5">{children}</div>
    </section>
  );
}

function Prose({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <div className="max-w-[66ch] space-y-5 text-[1.0625rem] leading-relaxed text-fg/85">
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)}>{paragraph}</p>
      ))}
    </div>
  );
}

export function FemScanArticle() {
  const image = getAwardImage(award.image);

  return (
    <article>
      <div className="border-b border-line bg-panel">
        <header className="page-container pb-12 pt-10 sm:pt-14 lg:pb-16 lg:pt-20">
          <nav aria-label="Breadcrumb">
            <ol className="meta flex flex-wrap items-center gap-2 text-muted">
              <li>
                <Link href="/awards" className="link-underline hover:text-fg">
                  Awards
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-fg">{award.title}</li>
            </ol>
          </nav>

          <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <p className="meta text-accent">{award.placement}</p>
              <h1 className="animate-rise mt-5 font-serif text-[3.5rem] leading-[0.95] tracking-[-0.02em] sm:text-7xl lg:text-[6rem]">
                {award.title}
              </h1>
              <p className="mt-5 text-xl text-muted">{award.subtitle}</p>
              <div className="mt-8 max-w-[62ch] space-y-5 text-[1.0625rem] leading-relaxed text-muted">
                <p className="text-[1.1875rem] text-fg">
                  {award.summary}
                </p>
                <p>
                  A multidisciplinary project developed for the {award.event}.
                  The team received third place in February 2026.
                </p>
              </div>
            </div>

            <dl className="self-start border-t border-fg lg:col-span-4 lg:col-start-9">
              <div className="border-b border-line py-4">
                <dt className="meta text-muted">Competition</dt>
                <dd className="mt-1.5 text-[0.9375rem]">{award.event}</dd>
              </div>
              <div className="border-b border-line py-4">
                <dt className="meta text-muted">Institution</dt>
                <dd className="mt-1.5 text-[0.9375rem]">{award.institution}</dd>
              </div>
              <div className="border-b border-line py-4">
                <dt className="meta text-muted">Date</dt>
                <dd className="mt-1.5 text-[0.9375rem]">{award.date}</dd>
              </div>
              <div className="border-b border-line py-4">
                <dt className="meta text-muted">Technology</dt>
                <dd className="mt-1.5 text-[0.9375rem] leading-relaxed">
                  {award.stack.join(" · ")}
                </dd>
              </div>
              <div className="border-b border-line py-4">
                <dt className="meta text-muted">Repository</dt>
                <dd className="mt-1.5 text-[0.9375rem]">
                  <TextLink href={award.source.href}>{award.source.label}</TextLink>
                </dd>
                {award.links.map((link) => (
                  <dd key={link.href} className="mt-1.5 text-[0.9375rem]">
                    <TextLink href={link.href}>{link.label}</TextLink>
                  </dd>
                ))}
              </div>
            </dl>
          </div>
        </header>
      </div>

      <div className="page-container mt-14 lg:mt-20">
        <Block index="01" title="The problem" id="problem">
          <Prose paragraphs={award.question} />
        </Block>

        <Block index="02" title="Technical approach" id="technical-approach">
          <Prose paragraphs={award.approach} />
          <div className="mt-10">
            <FemScanDiagram />
          </div>
          <h3 className="meta mt-12 text-muted">TECHNICAL COMPONENTS</h3>
          <ul className="mt-4 border-t border-fg">
            {award.components.map((component) => (
              <li
                key={component.name}
                className="grid gap-2 border-b border-line py-4 sm:grid-cols-[minmax(0,1fr)_11rem] sm:gap-6"
              >
                <div>
                  <p className="font-medium">{component.name}</p>
                  <p className="mt-1 text-[0.9375rem] leading-snug text-muted">
                    {component.detail}
                  </p>
                </div>
                <div className="sm:pt-1">
                  <span className="meta text-accent">{component.stateLabel}</span>
                </div>
              </li>
            ))}
          </ul>
        </Block>

        <Block index="03" title="My contribution" id="contribution">
          <Prose paragraphs={award.contribution} />
        </Block>

        <Block index="04" title="Engineering considerations" id="decisions">
          <ol className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {award.decisions.map((decision, index) => (
              <li key={decision.title}>
                <p className="meta text-accent">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-serif text-[1.5rem] leading-snug">{decision.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{decision.body}</p>
              </li>
            ))}
          </ol>
        </Block>

        <Block index="05" title="Recognition" id="recognition">
          <div className="border border-line bg-panel">
            <p className="meta border-b border-line px-5 py-3 text-fg sm:px-6">
              {award.event} · {award.date}
            </p>
            <div className="px-5 py-6 sm:px-6 sm:py-8">
              <p className="font-serif text-3xl leading-tight sm:text-4xl">{award.placement}</p>
              <p className="mt-4 max-w-[62ch] text-[1.0625rem] leading-relaxed text-muted">
                {award.recognition} This was a team achievement by a multidisciplinary group.
              </p>
            </div>
          </div>

          {image ? (
            <figure className="mt-10">
              <div className="relative aspect-[4/3] overflow-hidden bg-panel">
                <Image
                  src={image}
                  alt={award.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 75vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="meta mt-3 text-muted">{award.imageCaption}</figcaption>
            </figure>
          ) : null}
        </Block>

        <Block index="06" title="What the repository demonstrates" id="current-state">
          <div className="border border-line bg-panel">
            <p className="meta border-b border-line px-5 py-3 text-fg sm:px-6">
              Prototype status · Research and development
            </p>
            <div className="px-5 py-6 sm:px-6 sm:py-8">
              <p className="max-w-[62ch] text-[1.0625rem] leading-relaxed">
                {award.currentState.summary}
              </p>
              <ul className="mt-6 space-y-3 border-t border-line pt-6">
                {award.currentState.notes.map((note) => (
                  <li key={note} className="flex gap-3 text-[0.9375rem] leading-relaxed text-muted">
                    <span aria-hidden="true" className="text-fg">—</span>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Block>

        <Block index="07" title="Questions beyond the prototype" id="next-questions">
          <ol className="space-y-5">
            {award.nextQuestions.map((question, index) => (
              <li key={question} className="flex max-w-[66ch] gap-4 text-[1.0625rem] leading-relaxed">
                <span className="meta w-6 shrink-0 pt-1.5 text-muted">
                  {String.fromCharCode(97 + index)}.
                </span>
                {question}
              </li>
            ))}
          </ol>
        </Block>

        <Figure
          label="Project repository"
          caption="The repository contains the application, model components, and training scripts discussed in this case study."
          className="mb-12"
        >
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="font-serif text-2xl">CerviScan</p>
              <p className="mt-1 text-sm text-muted">FemScan project implementation</p>
            </div>
            <TextLink href={award.source.href}>Explore the repository</TextLink>
          </div>
        </Figure>
      </div>

      <nav aria-label="More awards" className="page-container mb-16 mt-8 lg:mb-24">
        <div className="border-y border-fg py-8">
          <Link href="/awards" className="link-underline">
            <span aria-hidden="true">← </span>Back to all awards
          </Link>
        </div>
      </nav>
    </article>
  );
}
