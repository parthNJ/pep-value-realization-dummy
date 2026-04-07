import type { Program } from "@/types/dashboard";

export function ProgramInsights({ programs }: { programs: Program[] }) {
  const total = programs.length;
  const totalBenefit = programs.reduce((s, p) => s + p.benefit, 0);
  const onTrack = programs.filter((p) => p.bw >= 0).length;
  const atRisk = programs.filter((p) => p.bw < 0);
  const top = [...programs].sort((a, b) => b.benefit - a.benefit)[0];
  const tier1 = programs.filter((p) => p.priority === "Tier 1").length;
  const watchCount = programs.filter((p) => p.priority === "Watch").length;

  const insights = [
    {
      title: "Execution Health",
      text: `${onTrack} of ${total} programs on track (${((onTrack / total) * 100).toFixed(0)}%). ${atRisk.length} program${atRisk.length !== 1 ? "s" : ""} below target requiring action.`,
    },
    {
      title: "Value Concentration",
      text: `Top program (${top?.name}) delivers $${top?.benefit.toFixed(1)}M — ${((top?.benefit / totalBenefit) * 100).toFixed(0)}% of total benefit. ${tier1} Tier 1 programs drive the majority of value.`,
    },
    {
      title: "Risk Exposure",
      text: atRisk.length > 0
        ? `${atRisk.length} programs with negative variance totaling –$${Math.abs(atRisk.reduce((s, p) => s + p.bw, 0)).toFixed(1)}M. ${watchCount} on Watch priority.`
        : "No programs currently at risk.",
    },
    {
      title: "Portfolio Mix",
      text: `Programs span ${new Set(programs.map((p) => p.portfolio)).size} portfolios across ${new Set(programs.map((p) => p.region)).size} regions. Diversified execution base.`,
    },
  ];

  return (
    <div className="flex overflow-hidden rounded-lg bg-[#1e293b]">
      {insights.map((item, i) => (
        <div
          key={item.title}
          className={`flex-1 px-5 py-4 ${i > 0 ? "border-l border-white/10" : ""}`}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            {item.title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-200">
            {item.text}
          </p>
        </div>
      ))}
    </div>
  );
}
