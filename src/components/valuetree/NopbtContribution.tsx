import { useState, useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { qualitative } from "@pepsico-ds/ui";
import type { Program } from "@/types/dashboard";

const groupViews = ["Portfolio", "Region", "Market"] as const;
const periods = ["YTD", "FY FCST"] as const;
const dataViews = ["Benefits", "Investment"] as const;
type Period = (typeof periods)[number];
type DataView = (typeof dataViews)[number];
type DisplayMode = "bars" | "table" | "donut";

const DONUT_COLORS = (qualitative as string[])?.length ? qualitative as string[] : ["#3855B3", "#059669", "#d97706", "#dc2626", "#7c3aed", "#0891b2", "#475569", "#be185d"];

// Investment is roughly 77% of benefit (ROI ~130%)
const INVEST_RATIO = 0.77;

interface GroupedRow {
  name: string;
  value: number;
  target: number;
  bw: number;
  pctChange: number;
  programs: Program[];
}

function useGroupedData(programs: Program[], view: string, period: Period, dataView: DataView): GroupedRow[] {
  return useMemo(() => {
    const key = view === "Portfolio" ? "portfolio" : view === "Region" ? "region" : "market";
    const map = new Map<string, { benefit: number; target: number; programs: Program[] }>();
    for (const p of programs) {
      const k = p[key as keyof Program] as string;
      const r = map.get(k) ?? { benefit: 0, target: 0, programs: [] };
      r.benefit += p.benefit;
      r.target += p.target;
      r.programs.push(p);
      map.set(k, r);
    }
    const scale = period === "YTD" ? 0.45 : 1;
    const isInvest = dataView === "Investment";
    return [...map.entries()]
      .map(([name, d]) => {
        const raw = isInvest ? d.benefit * INVEST_RATIO : d.benefit;
        const rawT = isInvest ? d.target * INVEST_RATIO : d.target;
        return {
          name,
          value: +(raw * scale).toFixed(1),
          target: +(rawT * scale).toFixed(1),
          bw: +((raw - rawT) * scale).toFixed(1),
          pctChange: rawT > 0 ? +(((raw - rawT) / rawT) * 100).toFixed(1) : 0,
          programs: d.programs,
        };
      })
      .sort((a, b) => b.value - a.value);
  }, [programs, view, period, dataView]);
}

/* ── Icon buttons ── */
function ModeIcon({ mode, active, onClick }: { mode: DisplayMode; active: boolean; onClick: () => void }) {
  const color = active ? "#0f172a" : "#94a3b8";
  const bg = active ? "#f1f5f9" : "transparent";
  const icons: Record<DisplayMode, React.ReactNode> = {
    bars: <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="1" y="10" width="4" height="5" rx="1" fill={color}/><rect x="6" y="6" width="4" height="9" rx="1" fill={color}/><rect x="11" y="2" width="4" height="13" rx="1" fill={color}/></svg>,
    table: <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="14" height="3" rx="1" fill={color}/><rect x="1" y="6" width="14" height="2" rx=".5" fill={color} opacity=".5"/><rect x="1" y="10" width="14" height="2" rx=".5" fill={color} opacity=".5"/><rect x="1" y="14" width="14" height="1.5" rx=".5" fill={color} opacity=".3"/></svg>,
    donut: <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke={color} strokeWidth="3" fill="none"/><circle cx="8" cy="8" r="3" fill={bg === "transparent" ? "#fff" : bg}/></svg>,
  };
  return (
    <button onClick={onClick} title={mode} style={{ background: bg, border: "none", cursor: "pointer", borderRadius: 5, width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", transition: "background .15s" }}>
      {icons[mode]}
    </button>
  );
}

/* ── Drill-down: programs within a group ── */
function DrillDownList({ programs, onBack, dataView, period }: { programs: Program[]; onBack: () => void; dataView: DataView; period: Period }) {
  const scale = period === "YTD" ? 0.45 : 1;
  const isInvest = dataView === "Investment";
  const rows = useMemo(() =>
    [...programs]
      .map(p => {
        const raw = isInvest ? p.benefit * INVEST_RATIO : p.benefit;
        const rawT = isInvest ? p.target * INVEST_RATIO : p.target;
        return { name: p.name, value: +(raw * scale).toFixed(1), target: +(rawT * scale).toFixed(1), bw: +((raw - rawT) * scale).toFixed(1) };
      })
      .sort((a, b) => b.value - a.value),
    [programs, scale, isInvest]
  );
  const maxVal = Math.max(...rows.map(r => r.value), 1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: "#3855B3", fontWeight: 600, padding: "2px 0", textAlign: "left", display: "flex", alignItems: "center", gap: 4 }}>
        ← Back
      </button>
      {rows.map((r) => {
        const pos = r.bw >= 0;
        return (
          <div key={r.name} style={{ padding: "5px 6px", borderRadius: 4 }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 3 }}>
              <span style={{ color: "#374151", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.name}</span>
              <span style={{ fontWeight: 600, color: "#1e293b", flexShrink: 0, marginLeft: 8 }}>${r.value}M</span>
            </div>
            <div style={{ position: "relative", height: 3, background: "#f1f5f9", borderRadius: 2 }}>
              <div style={{ height: "100%", borderRadius: 2, width: `${(r.value / maxVal) * 100}%`, background: pos ? "#94a3b8" : "#e2a0a0", transition: "width .3s" }} />
              <div style={{ position: "absolute", top: -1, left: `${(r.target / (maxVal * 1.1)) * 100}%`, width: 1.5, height: 5, background: "#1e293b", borderRadius: 1 }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Bar view ── */
function BarsView({ data, onRowClick }: { data: GroupedRow[]; onRowClick: (row: GroupedRow) => void }) {
  const maxVal = Math.max(...data.map((d) => d.value), 1);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {data.map((row) => {
        const pos = row.bw >= 0;
        return (
          <div key={row.name} onClick={() => onRowClick(row)}
            style={{ padding: "7px 8px", borderRadius: 6, transition: "background .1s", cursor: "pointer" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "#1e293b" }}>{row.name}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#1e293b" }}>${row.value}M</span>
                <span style={{ fontSize: 10, color: pos ? "#059669" : "#dc2626" }}>{pos ? "+" : ""}{row.pctChange}%</span>
              </div>
            </div>
            <div style={{ height: 3, background: "#f1f5f9", borderRadius: 2 }}>
              <div style={{ height: "100%", borderRadius: 2, width: `${(row.value / maxVal) * 100}%`, background: pos ? "#94a3b8" : "#e2a0a0", transition: "width .3s" }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Table view ── */
function TableView({ data, onRowClick }: { data: GroupedRow[]; onRowClick: (row: GroupedRow) => void }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
      <thead>
        <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
          <th style={{ textAlign: "left", padding: "6px 8px", fontWeight: 600, color: "#64748b", fontSize: 10, textTransform: "uppercase" }}>Name</th>
          <th style={{ textAlign: "right", padding: "6px 8px", fontWeight: 600, color: "#64748b", fontSize: 10, textTransform: "uppercase" }}>Actual</th>
          <th style={{ textAlign: "right", padding: "6px 8px", fontWeight: 600, color: "#64748b", fontSize: 10, textTransform: "uppercase" }}>Target</th>
          <th style={{ textAlign: "right", padding: "6px 8px", fontWeight: 600, color: "#64748b", fontSize: 10, textTransform: "uppercase" }}>B/W</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => {
          const pos = row.bw >= 0;
          return (
            <tr key={row.name} onClick={() => onRowClick(row)} style={{ borderBottom: "1px solid #f8fafc", cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
              <td style={{ padding: "7px 8px", fontWeight: 500, color: "#1e293b" }}>{row.name}</td>
              <td style={{ padding: "7px 8px", textAlign: "right", color: "#1e293b" }}>${row.value}M</td>
              <td style={{ padding: "7px 8px", textAlign: "right", color: "#64748b" }}>${row.target}M</td>
              <td style={{ padding: "7px 8px", textAlign: "right", fontWeight: 600, color: pos ? "#1e293b" : "#dc2626" }}>{pos ? "+" : ""}{row.bw}M</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

/* ── Donut view ── */
function DonutView({ data }: { data: GroupedRow[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <div style={{ width: "100%", maxWidth: 200, aspectRatio: "1", margin: "0 auto" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius="36%" outerRadius="82%" paddingAngle={2} stroke="none">
              {data.map((_, i) => <Cell key={i} fill={DONUT_COLORS[i % DONUT_COLORS.length]} />)}
            </Pie>
            <Tooltip formatter={(v) => `$${v}M`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 3, fontSize: 11 }}>
        {data.map((row, i) => (
          <div key={row.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "3px 4px", borderRadius: 4 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: DONUT_COLORS[i % DONUT_COLORS.length], flexShrink: 0 }} />
              <span style={{ color: "#1e293b", fontWeight: 500 }}>{row.name}</span>
            </span>
            <span style={{ display: "flex", gap: 8 }}>
              <span style={{ color: "#1e293b", fontWeight: 600 }}>${row.value}M</span>
              <span style={{ color: "#64748b", width: 32, textAlign: "right" }}>{total > 0 ? ((row.value / total) * 100).toFixed(0) : 0}%</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main component ── */
interface NopbtContributionProps {
  programs: Program[];
  onSelectGroup?: (groupName: string, groupView: string) => void;
}

export function NopbtContribution({ programs, onSelectGroup }: NopbtContributionProps) {
  const [viewIdx, setViewIdx] = useState(0);
  const [period, setPeriod] = useState<Period>("FY FCST");
  const [dataView, setDataView] = useState<DataView>("Benefits");
  const [displayMode, setDisplayMode] = useState<DisplayMode>("bars");
  const [drillDown, setDrillDown] = useState<GroupedRow | null>(null);
  const view = groupViews[viewIdx];
  const data = useGroupedData(programs, view, period, dataView);

  const handleRowClick = (row: GroupedRow) => {
    setDrillDown(row);
    onSelectGroup?.(row.name, view);
  };

  return (
    <div style={{
      border: "1px solid #e2e8f0", borderRadius: 10, background: "#fff",
      padding: 14, display: "flex", flexDirection: "column", height: "100%",
      overflow: "hidden", boxSizing: "border-box",
    }}>
      {/* Top toggle: Benefits vs Investment */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
        <div style={{ display: "flex", border: "1px solid #e2e8f0", borderRadius: 6, overflow: "hidden" }}>
          {dataViews.map((dv) => (
            <button key={dv} onClick={() => { setDataView(dv); setDrillDown(null); }}
              style={{ border: "none", cursor: "pointer", padding: "5px 16px", fontSize: 11, fontWeight: 600, background: dataView === dv ? "#e2e8f0" : "#fff", color: dataView === dv ? "#374151" : "#475569", transition: "all .15s" }}>
              {dv}
            </button>
          ))}
        </div>
      </div>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <h3 style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "#64748b", margin: 0 }}>
          {dataView === "Benefits" ? "NOPBT Contribution" : "Investment Spend"}
          {drillDown && <span style={{ fontWeight: 400 }}> › {drillDown.name}</span>}
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
          <ModeIcon mode="bars" active={displayMode === "bars"} onClick={() => setDisplayMode("bars")} />
          <ModeIcon mode="table" active={displayMode === "table"} onClick={() => setDisplayMode("table")} />
          <ModeIcon mode="donut" active={displayMode === "donut"} onClick={() => setDisplayMode("donut")} />
        </div>
      </div>

      {/* Controls row — hidden during drill-down */}
      {!drillDown && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <div style={{ display: "flex", gap: 2 }}>
            {groupViews.map((v, i) => (
              <button key={v} onClick={() => setViewIdx(i)}
                style={{ border: "none", cursor: "pointer", padding: "3px 8px", fontSize: 10, fontWeight: 500, borderRadius: 4, background: viewIdx === i ? "#e2e8f0" : "#f1f5f9", color: viewIdx === i ? "#374151" : "#475569", transition: "all .15s" }}>
                {v}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", border: "1px solid #e2e8f0", borderRadius: 5, overflow: "hidden" }}>
            {periods.map((p) => (
              <button key={p} onClick={() => setPeriod(p)}
                style={{ border: "none", cursor: "pointer", padding: "3px 8px", fontSize: 10, fontWeight: 500, background: period === p ? "#e2e8f0" : "#fff", color: period === p ? "#374151" : "#475569", transition: "all .15s" }}>
                {p}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content — scrollable */}
      <div className="thin-scrollbar" style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
        {drillDown ? (
          <DrillDownList programs={drillDown.programs} onBack={() => { setDrillDown(null); onSelectGroup?.("", ""); }} dataView={dataView} period={period} />
        ) : (
          <>
            {displayMode === "bars" && <BarsView data={data} onRowClick={handleRowClick} />}
            {displayMode === "table" && <TableView data={data} onRowClick={handleRowClick} />}
            {displayMode === "donut" && <DonutView data={data} />}
          </>
        )}
      </div>
    </div>
  );
}
