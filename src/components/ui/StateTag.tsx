import type { ImplementationState } from "@/content/projects";

const defaults: Record<ImplementationState, string> = {
  implemented: "Implemented",
  partial: "Partial",
  "in-progress": "In progress",
  planned: "Planned",
  "not-started": "Not yet started",
};

/**
 * Implementation status shown as text plus a marker whose *shape* also
 * encodes the state (filled, half, hollow), so colour is never the only cue.
 */
export function StateTag({ state, label }: { state: ImplementationState; label?: string }) {
  return (
    <span className="meta inline-flex items-center gap-2 whitespace-nowrap text-muted">
      <StateMarker state={state} />
      {label ?? defaults[state]}
    </span>
  );
}

export function StateMarker({ state }: { state: ImplementationState }) {
  const common = "inline-block size-2 shrink-0 rounded-full border";
  if (state === "implemented") {
    return <span aria-hidden="true" className={`${common} border-accent bg-accent`} />;
  }
  if (state === "partial" || state === "in-progress") {
    return (
      <span
        aria-hidden="true"
        className={`${common} border-accent`}
        style={{ background: "linear-gradient(90deg, var(--color-accent) 50%, transparent 50%)" }}
      />
    );
  }
  return <span aria-hidden="true" className={`${common} border-muted`} />;
}
