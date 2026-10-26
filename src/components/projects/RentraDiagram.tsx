import { Figure } from "./Figure";

const roles = ["Tenant", "Landlord", "Caretaker"];

const tiers = [
  { label: "Client", name: "Flutter mobile app", note: "Screens, local session, calls the API" },
  { label: "Backend", name: "NestJS service", note: "Auth, role guards, business rules, validation" },
  { label: "Data", name: "PostgreSQL · Supabase", note: "System of record, accessed via TypeORM" },
];

const chain = ["Portfolio", "Building", "Unit", "Tenancy"];

function Arrow() {
  return (
    <span aria-hidden="true" className="block py-1 text-center font-mono text-sm text-muted">
      ↓
    </span>
  );
}

export function RentraDiagram({ compact = false }: { compact?: boolean }) {
  return (
    <Figure
      label="Fig. C — System & domain structure"
      caption="Drawn from the repository’s architecture documentation. This is a structural diagram, not a screenshot of the application."
    >
      <div className={compact ? "" : "grid gap-8 lg:grid-cols-2"}>
        <div>
          <ul className="grid grid-cols-3 gap-2" aria-label="Roles">
            {roles.map((role) => (
              <li key={role} className="meta border border-line bg-canvas px-2 py-2 text-center text-fg">
                {role}
              </li>
            ))}
          </ul>
          <Arrow />
          <ol>
            {tiers.map((tier, index) => (
              <li key={tier.label}>
                <div className="border border-fg/40 bg-surface px-4 py-3">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[0.9375rem] font-medium text-fg">{tier.name}</span>
                    <span className="meta text-muted">{tier.label}</span>
                  </div>
                  {compact ? null : <p className="mt-1 text-[0.8125rem] text-muted">{tier.note}</p>}
                </div>
                {index < tiers.length - 1 ? <Arrow /> : null}
              </li>
            ))}
          </ol>
        </div>

        {compact ? null : (
          <div>
            <p className="meta mb-3 text-muted">Domain model</p>
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-2">
              {chain.map((entity, index) => (
                <li key={entity} className="flex items-center gap-2">
                  <span className="border border-fg/40 bg-surface px-3 py-2 text-[0.875rem]">{entity}</span>
                  {index < chain.length - 1 ? (
                    <span aria-hidden="true" className="font-mono text-sm text-muted">
                      →
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
            <div className="mt-4 grid grid-cols-2 gap-2 border-l border-fg/40 pl-4">
              <span className="border border-line bg-surface px-3 py-2 text-[0.8125rem]">Payments</span>
              <span className="border border-line bg-surface px-3 py-2 text-[0.8125rem]">Maintenance</span>
            </div>
            <div className="mt-6 border border-dashed border-muted/60 bg-canvas/70 p-3">
              <span className="meta block text-muted">Separate record</span>
              <span className="mt-1 block text-[0.875rem]">Self-declared rental</span>
              <span className="mt-1 block text-[0.8125rem] leading-snug text-muted">
                For tenants whose landlord is not on Rentra. Conversion to a managed tenancy is planned, not built.
              </span>
            </div>
          </div>
        )}
      </div>
    </Figure>
  );
}
