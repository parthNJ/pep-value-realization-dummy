import { useMemo } from "react";
import type { Program } from "@/types/dashboard";

interface KpiCardProps {
  title: string;
  value: string;
  highlight: string;
  subText: string;
}

function KpiCard({ title, value, highlight, subText }: KpiCardProps) {
  return (
    <div style={{ border: "1px solid #e0e0e0", borderRadius: "8px", padding: "14px 16px", background: "#fff" }}>
      <span style={{ fontSize: "12px", color: "#6b7280" }}>{title}</span>
      <div style={{ fontSize: "22px", fontWeight: 700, color: "#111827", margin: "4px 0 6px" }}>{value}</div>
      <div style={{ fontSize: "11px", color: "#374151" }}>
        <span style={{ fontWeight: 600 }}>{highlight}</span>
        <span style={{ color: "#6b7280", marginLeft: "4px" }}>{subText}</span>
      </div>
    </div>
  );
}

interface KpiSummaryCardsProps {
  programs: Program[];
}

export function KpiSummaryCards({ programs }: KpiSummaryCardsProps) {
  const kpis = useMemo(() => {
    const gross = programs.reduce((s, p) => s + p.benefit, 0);
    const target = programs.reduce((s, p) => s + p.target, 0);
    const bw = +(gross - target).toFixed(1);
    const infraCost = +(gross * 0.183).toFixed(1);
    const net = +(gross - infraCost).toFixed(1);
    const roi = target > 0 ? +((gross / (gross * 0.77)) * 100).toFixed(0) : 0;

    const portfolioMap = new Map<string, number>();
    for (const p of programs) portfolioMap.set(p.portfolio, (portfolioMap.get(p.portfolio) ?? 0) + p.benefit);
    const topPortfolio = [...portfolioMap.entries()].sort((a, b) => b[1] - a[1])[0];
    const topName = topPortfolio?.[0] ?? "—";
    const topVal = topPortfolio ? +topPortfolio[1].toFixed(1) : 0;
    const topPct = gross > 0 ? +((topVal / gross) * 100).toFixed(0) : 0;

    return { gross: +gross.toFixed(1), bw, net, roi, infraCost, topName, topVal, topPct };
  }, [programs]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "12px" }}>
      <KpiCard title="Gross Savings 2025" value={`$${kpis.gross} MM`} highlight={`${kpis.bw >= 0 ? "+" : ""}$${kpis.bw}MM`} subText="vs Target" />
      <KpiCard title="ROI" value={`${kpis.roi}%`} highlight="28 months" subText="Pay back period" />
      <KpiCard title="Net Savings" value={`$${kpis.net} MM`} highlight={`$${kpis.bw}MM`} subText="B/W" />
      <KpiCard title="Top Portfolio" value={kpis.topName} highlight={`$${kpis.topVal}MM | ${kpis.topPct}% share`} subText="" />
      <KpiCard title="Infrastructure Cost" value={`$(${kpis.infraCost}) MM`} highlight="Offset to gross savings" subText="" />
      <KpiCard title="7 Year Growth" value="600x" highlight="$0.8M → $471.6M" subText="" />
    </div>
  );
}
