import { Figure } from "./Figure";

const teams = [
  { name: "Speech Intelligence", focus: "Recognition, synthesis, voice" },
  { name: "Language Intelligence", focus: "Understanding, generation, evaluation" },
  { name: "Language Resources", focus: "Datasets, corpora, provenance" },
  { name: "Model Intelligence", focus: "Training, adaptation, efficiency" },
  { name: "Responsible AI", focus: "Safety, privacy, misuse prevention" },
];

const capabilities = ["Speech recognition", "Speech generation", "Voice AI"];

export function SautiDiagram({ compact = false }: { compact?: boolean }) {
  return (
    <Figure
      label="Fig. A — Research to product"
      caption="How Sauti Labs’ research teams feed its product. Sauti Cloud is in development with early access; it is not yet generally available."
    >
      <p className="meta mb-3 text-muted">Research teams</p>
      <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {teams.map((team, index) => (
          <li key={team.name} className="flex flex-col gap-1.5 border border-fg/30 bg-surface p-3 lg:min-h-28">
            <span className="meta text-muted">{String(index + 1).padStart(2, "0")}</span>
            <span className="text-[0.875rem] font-medium leading-snug">{team.name}</span>
            {compact ? null : <span className="text-[0.75rem] leading-snug text-muted">{team.focus}</span>}
          </li>
        ))}
      </ol>

      <div aria-hidden="true" className="flex flex-col items-center py-2">
        <span className="h-5 w-px bg-fg/40" />
        <span className="font-mono text-sm leading-none text-muted">↓</span>
      </div>

      <div className="border border-accent/60 bg-surface p-4 sm:p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <span className="font-serif text-[1.75rem] leading-none">Sauti Cloud</span>
          <span className="meta text-accent">Product · Early access</span>
        </div>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2" aria-label="Capabilities">
          {capabilities.map((capability) => (
            <li key={capability} className="meta flex items-center gap-2 text-fg">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
              {capability}
            </li>
          ))}
        </ul>
      </div>
    </Figure>
  );
}
