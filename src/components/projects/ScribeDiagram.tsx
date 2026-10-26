import { Figure } from "./Figure";

const steps: { label: string; note: string; human?: boolean }[] = [
  { label: "Audio input", note: "Microphone, five-second chunks" },
  { label: "Transcription", note: "Faster-Whisper, local CPU" },
  { label: "Scripture reference detection", note: "Pattern rules, validated against chapter counts" },
  { label: "Local Bible lookup", note: "SQLite, spoken formats normalised" },
  { label: "Human approval", note: "Operator approves, dismisses, or enters manually", human: true },
  { label: "Display", note: "Fullscreen, only after approval" },
];

export function ScribeDiagram({ compact = false }: { compact?: boolean }) {
  return (
    <Figure
      label="Fig. B — Scripture path"
      caption="The solid path is the scripture workflow connected in the live entry point. The dashed modules exist and are tested, but are not yet integrated into the live audio path."
    >
      <div className={compact ? "" : "grid gap-8 lg:grid-cols-2 lg:gap-12"}>
        <ol className="relative">
          {steps.map((step, index) => (
            <li key={step.label} className="relative flex gap-4 pb-4 last:pb-0">
              {index < steps.length - 1 ? (
                <span aria-hidden="true" className="absolute left-[0.6875rem] top-6 bottom-0 w-px bg-fg/40" />
              ) : null}
              <span
                aria-hidden="true"
                className={`relative z-10 mt-0.5 flex size-6 shrink-0 items-center justify-center border font-mono text-[0.625rem] ${
                  step.human ? "border-accent bg-accent text-canvas" : "border-fg/40 bg-surface text-muted"
                }`}
              >
                {index + 1}
              </span>
              <div className="min-w-0 pt-0.5">
                <span className={`meta block text-[0.75rem] ${step.human ? "text-accent" : "text-fg"}`}>
                  {step.label}
                </span>
                {compact ? null : (
                  <span className="mt-1 block text-[0.8125rem] leading-snug text-muted">{step.note}</span>
                )}
              </div>
            </li>
          ))}
        </ol>

        <div className={compact ? "" : "flex flex-col gap-5 lg:justify-between"}>
          <div className={`border border-dashed border-muted/60 bg-canvas/70 p-3 ${compact ? "mt-5 sm:ml-10" : ""}`}>
            <span className="meta block text-muted">Not in live path</span>
            <span className="mt-1 block text-[0.8125rem] leading-snug text-fg">
              Service-state machine · Lyric detection
            </span>
            {compact ? null : (
              <span className="mt-1 block text-[0.8125rem] leading-snug text-muted">
                Implemented as separate modules and exercised against simulated text, not live audio.
              </span>
            )}
          </div>
          {compact ? null : (
            <div className="border-l-2 border-accent bg-surface/70 px-4 py-3">
              <span className="meta block text-muted">Working principle</span>
              <span className="mt-1 block font-serif text-[1.375rem] leading-snug">
                If the internet disappears, the service continues.
              </span>
            </div>
          )}
        </div>
      </div>
    </Figure>
  );
}
