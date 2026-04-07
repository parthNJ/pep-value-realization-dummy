import type { Portfolio } from "@/types/dashboard";

interface SummaryCardsProps {
  portfolios: Portfolio[];
}

export function SummaryCards({ portfolios }: SummaryCardsProps) {
  const totalBenefit = portfolios.reduce((s, p) => s + p.ytd.actFcst, 0);
  const totalBw = portfolios.reduce((s, p) => s + p.ytd.bw, 0);
  const positiveCount = portfolios.filter((p) => p.ytd.bw >= 0).length;

  const top = [...portfolios].sort((a, b) => b.ytd.actFcst - a.ytd.actFcst)[0];
  const topShare = ((top.ytd.actFcst / totalBenefit) * 100).toFixed(1);

  const atRisk = [...portfolios]
    .filter((p) => p.ytd.bw < 0)
    .sort((a, b) => a.ytd.bw - b.ytd.bw)[0];

  const cards = [
    {
      label: "Total Portfolio Benefit",
      value: `$${totalBenefit.toFixed(1)}M`,
      sub: "Act + Fcst all portfolios",
    },
    {
      label: "B/(W) vs Target",
      value: `${totalBw >= 0 ? "+" : "–"}$${Math.abs(totalBw).toFixed(1)}M`,
      sub: totalBw >= 0 ? "Above plan · favorable" : "Below plan",
      color: totalBw >= 0 ? "text-green-700" : "text-red-600",
    },
    {
      label: "Positive Portfolios",
      value: `${positiveCount} of ${portfolios.length}`,
      sub: "Above target this period",
    },
    {
      label: "Top Portfolio",
      value: top.name,
      sub: `$${top.ytd.actFcst.toFixed(1)}M · ${topShare}% share`,
    },
    {
      label: "At Risk",
      value: atRisk ? atRisk.name : "None",
      sub: atRisk ? "Below target" : "All on track",
      color: atRisk ? "text-red-600" : undefined,
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {cards.map((c) => (
        <div
          key={c.label}
          className="rounded-lg border bg-white px-4 py-3"
        >
          <p className="text-xs font-medium text-muted-foreground">
            {c.label}
          </p>
          <p className={`mt-0.5 text-lg font-semibold leading-tight ${c.color ?? ""}`}>
            {c.value}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">{c.sub}</p>
        </div>
      ))}
    </div>
  );
}
