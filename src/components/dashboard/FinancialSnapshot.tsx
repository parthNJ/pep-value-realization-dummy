import type { FinancialPanel } from "@/types/dashboard";
import { MetricCard } from "./MetricCard";

const legend = [
  { color: "#16a34a", label: "≥100%" },
  { color: "#d97706", label: "80–99%" },
  { color: "#dc2626", label: "<80%" },
];

export function FinancialSnapshot({ panels }: { panels: FinancialPanel[] }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Financials
        </h2>
        <div className="flex items-center gap-3">
          {legend.map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <span
                className="inline-block size-2.5 rounded-full"
                style={{ backgroundColor: l.color }}
              />
              <span className="text-xs text-muted-foreground">{l.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {panels.map((panel) => (
          <div key={panel.label} className="space-y-3">
            <h3 className="text-sm font-medium">{panel.label}</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {panel.metrics.map((m) => (
                <MetricCard key={m.label} metric={m} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
