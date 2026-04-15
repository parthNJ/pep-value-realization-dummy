import { useState, useMemo } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
} from "recharts";
import { trendData } from "@/data/trends";
import type { TrendMetric } from "@/data/trends";
import type { Program } from "@/types/dashboard";

const metrics: TrendMetric[] = ["NOPBT Benefit", "Revenue", "Productivity"];
const FONT = "'Inter Variable', Inter, sans-serif";

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string }>; label?: string }) {
  if (!active || !payload) return null;
  return (
    <div style={{ fontFamily: FONT, borderRadius: "8px", border: "1px solid #e5e7eb", background: "#fff", padding: "6px 12px", fontSize: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
      <p style={{ fontWeight: 500 }}>{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: "#6b7280" }}>
          {p.dataKey === "actual" ? "Actual" : "Target"}: ${p.value.toFixed(1)}M
        </p>
      ))}
    </div>
  );
}

interface Props {
  programs: Program[];
  allPrograms: Program[];
}

export function NopbtTrendChart({ programs, allPrograms }: Props) {
  const [metricIdx, setMetricIdx] = useState(0);
  const metric = metrics[metricIdx];
  const baseTrend = trendData[metric];

  const data = useMemo(() => {
    const allBenefit = allPrograms.reduce((s, p) => s + p.benefit, 0);
    const filteredBenefit = programs.reduce((s, p) => s + p.benefit, 0);
    const scale = allBenefit > 0 ? filteredBenefit / allBenefit : 1;

    const allTarget = allPrograms.reduce((s, p) => s + p.target, 0);
    const filteredTarget = programs.reduce((s, p) => s + p.target, 0);
    const tScale = allTarget > 0 ? filteredTarget / allTarget : 1;

    return baseTrend.map((pt) => ({
      month: pt.month,
      actual: +(pt.actual * scale).toFixed(1),
      target: +(pt.target * tScale).toFixed(1),
    }));
  }, [programs, allPrograms, baseTrend]);

  const latest = data[data.length - 1];
  const prev = data[data.length - 2];
  const momChange = latest.actual - prev.actual;
  const momPct = prev.actual > 0 ? ((momChange / prev.actual) * 100).toFixed(1) : "0";
  const fyTarget = latest.target;

  const isBelow = latest.actual < latest.target;
  const lineColor = isBelow ? "#dc2626" : "#16a34a";
  const gradId = `trendGrad-${metric.replace(/\s/g, "")}`;

  return (
    <div style={{ border: "1px solid #e0e0e0", borderRadius: "8px", padding: "20px", background: "#fff", fontFamily: FONT }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", marginBottom: "12px" }}>
        <div>
          <h3 style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "#6b7280", margin: 0 }}>
            {metric} Trajectory
          </h3>
          <p style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>
            Monthly cumulative — Act vs Target ($MM) · MoM: {momChange >= 0 ? "+" : ""}${momChange.toFixed(1)}M ({momPct}%)
          </p>
        </div>
        <div style={{ display: "flex", border: "1px solid #e0e0e0", borderRadius: "6px", overflow: "hidden", flexShrink: 0 }}>
          {metrics.map((m, i) => (
            <button
              key={m}
              onClick={() => setMetricIdx(i)}
              style={{
                border: "none",
                cursor: "pointer",
                padding: "6px 14px",
                fontSize: "13px",
                fontWeight: 500,
                fontFamily: FONT,
                background: metricIdx === i ? "#3855B3" : "#fff",
                color: metricIdx === i ? "#fff" : "#374151",
                transition: "background 0.15s, color 0.15s",
                whiteSpace: "nowrap",
              }}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data} margin={{ top: 5, right: 10, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={lineColor} stopOpacity={0.15} />
              <stop offset="95%" stopColor={lineColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: FONT }} />
          <YAxis tick={{ fontSize: 11, fontFamily: FONT }} tickFormatter={(v: number) => `$${v}`} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={fyTarget} stroke="#94a3b8" strokeDasharray="4 4" label={{ value: "FY Target", position: "right", fontSize: 10, fill: "#94a3b8" }} />
          <Area type="monotone" dataKey="target" stroke="#64748b" strokeWidth={2} strokeDasharray="6 4" fill="none" />
          <Area type="monotone" dataKey="actual" stroke={lineColor} strokeWidth={2.5} fill={`url(#${gradId})`} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
