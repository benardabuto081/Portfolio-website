import { site } from "@/content/site";

/** Resume downloads: the PDF is primary, the editable DOCX secondary. */
export function ResumeDownload() {
  return (
    <div className="border-y border-line py-5">
      <p className="meta text-muted">Resume · PDF · {site.resume.updated}</p>
      <p className="mt-2 font-serif text-2xl leading-tight">One page, for applications.</p>
      <div className="mt-5 flex flex-col items-start gap-3">
        <a
          href={site.resume.pdf}
          download
          className="inline-flex min-h-11 items-center gap-2 bg-fg px-5 text-sm font-medium text-canvas transition-colors duration-200 hover:bg-accent"
        >
          Download Resume (PDF) <span aria-hidden="true">↓</span>
        </a>
        <a href={site.resume.docx} download className="link-underline text-sm text-muted hover:text-fg">
          Editable version (DOCX)
        </a>
      </div>
    </div>
  );
}
