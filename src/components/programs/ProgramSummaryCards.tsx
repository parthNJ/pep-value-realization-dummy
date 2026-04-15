import type { Program } from "@/types/dashboard";

export function ProgramSummaryCards({ programs }: { programs: Program[] }) {
  const total = programs.length;
  const totalBenefit = programs.reduce((s, p) => s + p.benefit, 0);
  const totalBw = programs.reduce((s, p) => s + p.bw, 0);
  const onTrack = programs.filter((p) => p.bw >= 0).length;
  const top = [...programs].sort((a, b) => b.bw - a.bw)[0];
  const risk = [...programs].filter((p) => p.bw < 0).sort((a, b) => a.bw - b.bw)[0];

  const healthPct = total > 0 ? Math.round((onTrack / total) * 100) : 0;

  const cards = [
    {
      status: healthPct >= 70 ? "Healthy" : healthPct >= 50 ? "Mixed" : "At risk",
      statusColor: healthPct >= 70 ? "text-green-700 border-green-300" : healthPct >= 50 ? "text-amber-600 border-amber-300" : "text-red-600 border-red-300",
      label: "Overall Health",
      headline: `${onTrack} of ${total} programs on track`,
      detail: `$${totalBenefit.toFixed(0)}M total benefit · ${totalBw >= 0 ? "+" : ""}$${totalBw.toFixed(0)}M vs target`,
    },
    {
      status: "Top performer",
      statusColor: "text-green-700 border-green-300",
      label: "Biggest Win",
      headline: top?.name ?? "—",
      detail: top ? `+$${top.bw.toFixed(1)}M above target · $${top.benefit.toFixed(0)}M benefit` : "",
    },
    {
      status: risk ? "Needs attention" : "All clear",
      statusColor: risk ? "text-red-600 border-red-300" : "text-green-700 border-green-300",
      label: "Watch List",
      headline: risk?.name ?? "None",
      detail: risk ? `$${Math.abs(risk.bw).toFixed(1)}M below target · review recommended` : "All programs meeting or exceeding targets",
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {cards.map((c) => (
        <div key={c.label} className="rounded-xl border bg-white px-5 py-4">
          <div className="flex items-center gap-2">
            <span className={`rounded-md border px-1.5 py-0.5 text-[11px] font-medium ${c.statusColor}`}>
              {c.status}
            </span>
            <span className="text-xs text-muted-foreground">{c.label}</span>
          </div>
          <p className="mt-2 text-base font-semibold">{c.headline}</p>
          <p className="mt-1 text-xs text-muted-foreground">{c.detail}</p>
        </div>
      ))}
    </div>
  );
}
