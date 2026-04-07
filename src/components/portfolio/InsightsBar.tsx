import type { Portfolio } from "@/types/dashboard";

interface InsightsBarProps {
  portfolios: Portfolio[];
}

export function InsightsBar({ portfolios }: InsightsBarProps) {
  const totalBenefit = portfolios.reduce((s, p) => s + p.ytd.actFcst, 0);
  const positiveCount = portfolios.filter((p) => p.ytd.bw >= 0).length;
  const top = [...portfolios].sort((a, b) => b.ytd.actFcst - a.ytd.actFcst)[0];
  const topShare = ((top.ytd.actFcst / totalBenefit) * 100).toFixed(1);
  const atRisk = portfolios.filter((p) => p.ytd.bw < 0);

  const insights = [
    {
      title: "Portfolio Coverage",
      text: `${positiveCount} of ${portfolios.length} portfolios above target. ${atRisk.length > 0 ? `${atRisk.map((p) => p.name).join(", ")} require${atRisk.length === 1 ? "s" : ""} attention.` : "All on track."}`,
    },
    {
      title: "Value Creation",
      text: `${top.name} leads at $${top.ytd.actFcst.toFixed(1)}M (${topShare}% of total). +$${top.ytd.bw.toFixed(1)}M favorable variance YTD.`,
    },
    {
      title: "Risk Watch",
      text: atRisk.length > 0
        ? `${atRisk.map((p) => `${p.name} (${p.ytd.bw.toFixed(1)}M)`).join(", ")} below target. Program-level review recommended.`
        : "No portfolios currently at risk.",
    },
    {
      title: "Program Composition",
      text: `118 programs across ${portfolios.length} portfolios. ${top.name} has the largest slate with 42 active programs.`,
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
