import type { Program } from "@/types/dashboard";

export function ProgramSummaryCards({ programs }: { programs: Program[] }) {
  const totalBenefit = programs.reduce((s, p) => s + p.benefit, 0);
  const totalBw = programs.reduce((s, p) => s + p.bw, 0);
  const belowTarget = programs.filter((p) => p.bw < 0);
  const top = [...programs].sort((a, b) => b.benefit - a.benefit)[0];
  const risk = [...programs].filter((p) => p.bw < 0).sort((a, b) => a.bw - b.bw)[0];

  const cards = [
    { label: "Total Program Benefit", value: `$${totalBenefit.toFixed(1)}M`, sub: "Act + Fcst across all programs" },
    { label: "B/(W) vs Target", value: `${totalBw >= 0 ? "+" : "–"}$${Math.abs(totalBw).toFixed(1)}M`, sub: totalBw >= 0 ? "Above plan · favorable" : "Below plan", color: totalBw >= 0 ? "text-green-700" : "text-red-600" },
    { label: "# Programs in Scope", value: `${programs.length}`, sub: "Active program universe" },
    { label: "# Below Target", value: `${belowTarget.length}`, sub: "Needs leadership action", color: belowTarget.length > 0 ? "text-red-600" : undefined },
    { label: "Top Program", value: top?.name ?? "—", sub: top ? `$${top.benefit.toFixed(1)}M benefit · #1 rank` : "" },
    { label: "Risk Program", value: risk?.name ?? "None", sub: risk ? "Review now" : "All on track", color: risk ? "text-red-600" : undefined },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
      {cards.map((c) => (
        <div key={c.label} className="rounded-lg border bg-white px-4 py-3">
          <p className="text-xs font-medium text-muted-foreground">{c.label}</p>
          <p className={`mt-0.5 text-lg font-semibold leading-tight ${c.color ?? ""}`}>{c.value}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{c.sub}</p>
        </div>
      ))}
    </div>
  );
}
