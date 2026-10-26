import type { ProjectVisualKind } from "@/content/projects";
import { QueleaDiagram } from "./QueleaDiagram";
import { RentraDiagram } from "./RentraDiagram";
import { SautiDiagram } from "./SautiDiagram";
import { ScribeDiagram } from "./ScribeDiagram";

const visuals = {
  sauti: SautiDiagram,
  scribe: ScribeDiagram,
  rentra: RentraDiagram,
  quelea: QueleaDiagram,
} satisfies Record<ProjectVisualKind, (props: { compact?: boolean }) => React.ReactNode>;

export function ProjectVisual({ kind, compact = false }: { kind: ProjectVisualKind; compact?: boolean }) {
  const Visual = visuals[kind];
  return <Visual compact={compact} />;
}
