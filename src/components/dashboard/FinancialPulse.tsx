import { useState } from "react";
import { Tag } from "@pepsico-ds/ui";
import type { FinancialPanel, MetricData } from "@/types/dashboard";

const periods = ["YTD", "FY FCST"] as const;
type Period = (typeof periods)[number];

function sentiment(bw: number, actFcst: number, target: number) {
  if (bw > 0) {
    const pct = target > 0 ? ((actFcst / target) * 100).toFixed(0) : "—";
    return { label: "On track", tagColor: "green" as const, pct };
  }
  if (bw === 0) return { label: "On target", tagColor: "gray" as const, pct: "100" };
  const pct = target > 0 ? ((actFcst / target) * 100).toFixed(0) : "—";
  return { label: "Needs attention", tagColor: "red" as const, pct };
}

function ScaleBar({ actual, target }: { actual: number; target: number }) {
  const max = Math.max(actual, target) * 1.15;
  const actualPct = max > 0 ? (actual / max) * 100 : 0;
  const targetPct = max > 0 ? (target / max) * 100 : 0;
  const isAbove = actual >= target;

  return (
    <div style={{ position: "relative", height: "6px", background: "#f3f4f6", borderRadius: "3px", margin: "8px 0" }}>
      <div style={{
        position: "absolute", left: 0, top: 0, height: "100%", borderRadius: "3px",
        width: `${actualPct}%`,
        background: isAbove ? "#16a34a" : "#dc2626",
        transition: "width 0.3s",
      }} />
      <div style={{
        position: "absolute", top: "-3px",
        left: `${targetPct}%`,
        width: "2px", height: "12px",
        background: "#374151",
        borderRadius: "1px",
      }} />
      <div style={{
        position: "absolute", top: "-16px",
        left: `${targetPct}%`,
        transform: "translateX(-50%)",
        fontSize: "9px", color: "#6b7280", whiteSpace: "nowrap",
      }}>
        Target
      </div>
    </div>
  );
}

function MetricCard({ label, metric }: { label: string; metric: MetricData }) {
  const s = sentiment(metric.bw, metric.actFcst, metric.target);
  return (
    <div style={{ border: "1px solid #e0e0e0", borderRadius: "8px", padding: "12px 14px", background: "#fff" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2px" }}>
        <span style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>{label}</span>
        <Tag text={s.label} color={s.tagColor} size="small" isCopyable={false} />
      </div>
      <div style={{ marginTop: "14px" }}>
        <ScaleBar actual={metric.actFcst} target={metric.target} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: "6px" }}>
        <span style={{ fontSize: "18px", fontWeight: 700 }}>${metric.actFcst.toFixed(1)}M</span>
        <span style={{ fontSize: "11px", color: "#6b7280" }}>Target: ${metric.target.toFixed(1)}M</span>
      </div>
    </div>
  );
}

const aiInsights = [
  {
    good: true,
    title: "Revenue & productivity both ahead of plan",
    body: "Net revenue is $23.6M above target YTD and productivity is tracking 20% above plan. If momentum holds, FY could exceed NOPBT target by ~$52M.",
  },
  {
    good: false,
    title: "EMEA margin pressure on 3 programs",
    body: "Contribution margin in EMEA is 6% below plan. 'OpEx Transformation' and 'Procurement Synergies' are most exposed — ~$8.2M in benefits at risk.",
  },
];

interface FinancialPulseProps {
  panels: FinancialPanel[];
}

export function FinancialPulse({ panels }: FinancialPulseProps) {
  const [period, setPeriod] = useState<Period>("YTD");

  const panel = panels.find((p) => p.label === period);
  if (!panel) return null;

  const revenue = panel.metrics.find((m) => m.label.includes("Revenue"));
  const contribution = panel.metrics.find((m) => m.label.includes("Contribution"));
  const productivity = panel.metrics.find((m) => m.label.includes("Productivity"));
  const nopbt = panel.metrics.find((m) => m.label.includes("NOPBT"));

  return (
    <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2 style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "#6b7280" }}>
          Financial Snapshot
        </h2>
        <div style={{ display: "flex", border: "1px solid #e0e0e0", borderRadius: "6px", overflow: "hidden" }}>
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              style={{
                border: "none",
                cursor: "pointer",
                padding: "6px 14px",
                fontSize: "13px",
                fontWeight: 500,
                background: period === p ? "#3855B3" : "#fff",
                color: period === p ? "#fff" : "#374151",
                transition: "background 0.15s, color 0.15s",
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "14px", alignItems: "start" }}>
        {/* Left: 4 metric cards in 2x2 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          {revenue && <MetricCard label="Net Revenue" metric={revenue} />}
          {nopbt && <MetricCard label="NOPBT Benefit" metric={nopbt} />}
          {productivity && <MetricCard label="Productivity" metric={productivity} />}
          {contribution && <MetricCard label="Contribution Margin" metric={contribution} />}
        </div>

        {/* Right: AI Insights */}
        <div style={{
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          background: "#fff",
          padding: "14px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "14px" }}>✦</span>
            <h3 style={{ fontSize: "12px", fontWeight: 600, margin: 0, color: "#111827", textTransform: "uppercase", letterSpacing: "0.05em" }}>AI Insights</h3>
          </div>

          {aiInsights.map((insight, i) => (
            <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
              <span style={{ fontSize: "13px", marginTop: "1px", flexShrink: 0, color: insight.good ? "#16a34a" : "#dc2626", fontWeight: 700 }}>
                {insight.good ? "↑" : "↓"}
              </span>
              <div>
                <p style={{ fontSize: "12px", fontWeight: 600, color: "#111827", margin: "0 0 2px 0" }}>
                  {insight.title}
                </p>
                <p style={{ fontSize: "11px", color: "#6b7280", margin: 0, lineHeight: "1.5" }}>
                  {insight.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
