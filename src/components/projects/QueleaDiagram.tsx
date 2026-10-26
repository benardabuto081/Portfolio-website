import { Figure } from "./Figure";

const layers = [
  { source: "GBIF", role: "Occurrence records" },
  { source: "CHIRPS", role: "Rainfall" },
  { source: "ERA5-Land", role: "Meteorology" },
  { source: "MODIS NDVI", role: "Vegetation" },
  { source: "SRTM", role: "Elevation" },
  { source: "HydroRIVERS", role: "Rivers & lake" },
];

// Schematic grid: square cells inside a circular analysis extent.
const CELL = 16;
const CX = 232;
const CY = 168;
const RADIUS = 140;

function gridCells() {
  const cells: { x: number; y: number }[] = [];
  for (let y = CY - RADIUS; y < CY + RADIUS; y += CELL) {
    for (let x = CX - RADIUS; x < CX + RADIUS; x += CELL) {
      const dx = x + CELL / 2 - CX;
      const dy = y + CELL / 2 - CY;
      if (dx * dx + dy * dy <= RADIUS * RADIUS) cells.push({ x, y });
    }
  }
  return cells;
}

export function QueleaDiagram({ compact = false }: { compact?: boolean }) {
  const cells = gridCells();
  // The scheme occupies a small block of cells near the centre.
  const scheme = { x: CX - 4, y: CY - 4, size: CELL * 2 };

  return (
    <Figure
      label="Fig. D — Study design"
      caption="Schematic, not to scale. The grid, lake, and river are drawn to explain the study design; no observations, predictions, or model outputs are shown."
    >
      <div className={compact ? "" : "grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-center"}>
        <svg
          viewBox="0 0 464 336"
          className="mx-auto h-auto w-full max-w-xl"
          role="img"
          aria-labelledby="quelea-diagram-title"
        >
          <title id="quelea-diagram-title">
            Schematic analysis grid of roughly 5.5 kilometre cells within a 50 kilometre extent around Ahero
            Rice Irrigation Scheme, with Lake Victoria to the west and a river crossing the grid.
          </title>
          <defs>
            <pattern id="lake-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line className="stroke-muted" x1="0" y1="0" x2="0" y2="6" strokeOpacity="0.28" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Lake Victoria (Winam Gulf), schematic */}
          <path className="stroke-muted"
            d="M0 128 C 40 120, 70 140, 104 150 C 126 156, 134 176, 118 192 C 98 210, 60 206, 30 226 C 18 234, 8 240, 0 244 Z"
            fill="url(#lake-hatch)"
           
            strokeOpacity="0.45"
            strokeWidth="0.75"
          />

          {/* Analysis grid */}
          <g className="fill-surface stroke-fg" fillOpacity="0.55" strokeOpacity="0.14" strokeWidth="0.75">
            {cells.map((cell) => (
              <rect key={`${cell.x}-${cell.y}`} x={cell.x} y={cell.y} width={CELL} height={CELL} />
            ))}
          </g>

          {/* Analysis extent */}
          <circle className="stroke-fg"
            cx={CX}
            cy={CY}
            r={RADIUS + 6}
            fill="none"
           
            strokeOpacity="0.5"
            strokeWidth="0.75"
            strokeDasharray="3 4"
          />

          {/* River, schematic */}
          <path className="stroke-muted"
            d="M392 108 C 350 124, 320 150, 290 160 C 262 170, 250 186, 228 184 C 196 182, 168 172, 122 176"
            fill="none"
           
            strokeWidth="1.25"
          />

          {/* Scheme */}
          <rect className="fill-accent stroke-accent"
            x={scheme.x}
            y={scheme.y}
            width={scheme.size}
            height={scheme.size}
           
            fillOpacity="0.28"
           
            strokeWidth="1.5"
          />

          {/* Labels */}
          <g className="fill-fg" fontFamily="var(--font-plex-mono), monospace" fontSize="11" letterSpacing="0.4">
            <line className="stroke-accent" x1={scheme.x + scheme.size} y1={scheme.y} x2="330" y2="58" strokeWidth="0.75" />
            <text className="fill-accent" x="334" y="54">AHERO SCHEME</text>
            <text className="fill-muted" x="8" y="98">LAKE VICTORIA</text>
            <text className="fill-muted" x="8" y="111">(WINAM GULF)</text>
            <text className="fill-muted" x="368" y="98">RIVER</text>
            <text className="fill-muted" x="456" y="318" textAnchor="end">≈ 50 KM EXTENT</text>
            <rect className="fill-surface stroke-fg" x="8" y="306" width={CELL} height={CELL} strokeOpacity="0.3" />
            <text className="fill-muted" x="30" y="318">1 CELL ≈ 5.5 KM</text>
            <text x="440" y="24" textAnchor="middle">N</text>
            <line className="stroke-fg" x1="440" y1="30" x2="440" y2="46" strokeWidth="0.75" />
          </g>
        </svg>

        {compact ? null : (
          <div>
            <p className="meta mb-3 text-muted">Joined to every grid record</p>
            <ul className="divide-y divide-line border-y border-line">
              {layers.map((layer) => (
                <li key={layer.source} className="flex items-baseline justify-between gap-4 py-2.5">
                  <span className="meta text-fg">{layer.source}</span>
                  <span className="text-[0.8125rem] text-muted">{layer.role}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Figure>
  );
}
