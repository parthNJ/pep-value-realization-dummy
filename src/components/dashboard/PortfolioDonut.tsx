import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { Program } from "@/types/dashboard";

const COLORS = ["#3855B3", "#1e3a5f", "#e91e8c", "#9333ea", "#16a34a", "#065f46", "#f59e0b", "#6b7280"];

interface PortfolioDonutProps {
  programs: Program[];
  onPortfolioClick?: (name: string) => void;
}

const RADIAN = Math.PI / 180;
function renderLabel(props: any) {
  const cx = props.cx as number;
  const cy = props.cy as number;
  const midAngle = (props.midAngle as number) ?? 0;
  const innerRadius = props.innerRadius as number;
  const outerRadius = props.outerRadius as number;
  const percent = (props.percent as number) ?? 0;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  if (percent < 0.07) return null;
  return (
    <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

export function PortfolioDonut({ programs, onPortfolioClick }: PortfolioDonutProps) {
  const { chartData, total } = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of programs) map.set(p.portfolio, (map.get(p.portfolio) ?? 0) + p.benefit);
    const sorted = [...map.entries()].sort((a, b) => b[1] - a[1]);
    const total = sorted.reduce((s, [, v]) => s + v, 0);
    const chartData = sorted.map(([name, value]) => ({
      name,
      value: +value.toFixed(1),
      pct: total > 0 ? +((value / total) * 100).toFixed(0) : 0,
    }));
    return { chartData, total: +total.toFixed(1) };
  }, [programs]);

  return (
    <div style={{ border: "1px solid #e0e0e0", borderRadius: "8px", background: "#fff", padding: "16px", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
      <h3 style={{ fontSize: "14px", fontWeight: 600, margin: 0, color: "#111827" }}>Portfolio Mix</h3>
      <p style={{ fontSize: "12px", color: "#6b7280", margin: "2px 0 0" }}>
        Gross savings share | ${total}M total
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1, marginTop: "8px" }}>
        {/* Chart — takes most of the space */}
        <div style={{ flex: "1 1 60%", minWidth: 0, height: "280px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="40%"
                outerRadius="85%"
                paddingAngle={2}
                stroke="none"
                label={renderLabel}
                labelLine={false}
              >
                {chartData.map((entry, i) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[i % COLORS.length]}
                    cursor={onPortfolioClick ? "pointer" : "default"}
                    onClick={() => onPortfolioClick?.(entry.name)}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value}M`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend — compact on the right */}
        <div style={{ flex: "0 0 auto", minWidth: 0 }}>
          <table style={{ borderCollapse: "collapse", fontSize: "12px" }}>
            <tbody>
              {chartData.map((row, i) => (
                <tr
                  key={row.name}
                  onClick={() => onPortfolioClick?.(row.name)}
                  style={{ cursor: onPortfolioClick ? "pointer" : "default" }}
                  onMouseEnter={(e) => { if (onPortfolioClick) e.currentTarget.style.background = "#f9fafb"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  <td style={{ padding: "5px 6px 5px 0", whiteSpace: "nowrap" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                      <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: COLORS[i % COLORS.length], flexShrink: 0, display: "inline-block" }} />
                      <span style={{ color: "#111827", fontWeight: 500, fontSize: "12px" }}>{row.name}</span>
                    </span>
                  </td>
                  <td style={{ padding: "5px 0", textAlign: "right", fontWeight: 600, color: "#111827", fontSize: "12px" }}>${row.value}M</td>
                  <td style={{ padding: "5px 0 5px 6px", textAlign: "right", color: "#6b7280", fontSize: "12px" }}>{row.pct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
