import { useState, useMemo } from "react";
import type { Portfolio } from "@/types/dashboard";
import { Tag, TextInput } from "@pepsico-ds/ui";
import { ArrowRight } from "lucide-react";

const views = ["Portfolio", "Region", "Market"] as const;
const periods = ["YTD", "FY FCST"] as const;
type Period = (typeof periods)[number];

function statusInfo(bw: number) {
  if (bw > 5) return { tagColor: "green" as const, label: "On track" };
  if (bw >= 0) return { tagColor: "green" as const, label: "On target" };
  if (bw >= -5) return { tagColor: "orange" as const, label: "Watch" };
  return { tagColor: "red" as const, label: "Below target" };
}

function ScaleBar({ actual, target }: { actual: number; target: number }) {
  const max = Math.max(actual, target) * 1.15;
  const actualPct = max > 0 ? (actual / max) * 100 : 0;
  const targetPct = max > 0 ? (target / max) * 100 : 0;
  const isAbove = actual >= target;
  return (
    <div style={{ position: "relative", height: "5px", background: "#f3f4f6", borderRadius: "3px" }}>
      <div style={{ position: "absolute", left: 0, top: 0, height: "100%", borderRadius: "3px", width: `${actualPct}%`, background: isAbove ? "#16a34a" : "#dc2626", transition: "width 0.3s" }} />
      <div style={{ position: "absolute", top: "-2px", left: `${targetPct}%`, width: "2px", height: "9px", background: "#374151", borderRadius: "1px" }} />
    </div>
  );
}

interface PerformanceTableProps {
  portfolios: Portfolio[];
  regions: Portfolio[];
  markets: Portfolio[];
  onRowClick?: (view: string, name: string) => void;
}

export function PerformanceTable({ portfolios, regions, markets, onRowClick }: PerformanceTableProps) {
  const [viewIdx, setViewIdx] = useState(0);
  const view = views[viewIdx];
  const [period, setPeriod] = useState<Period>("FY FCST");
  const [search, setSearch] = useState("");

  const raw = view === "Portfolio" ? portfolios : view === "Region" ? regions : markets;

  const data = useMemo(() => {
    let copy = [...raw].sort((a, b) => (period === "YTD" ? b.ytd.bw - a.ytd.bw : b.fy.bw - a.fy.bw));
    if (search) {
      const q = search.toLowerCase();
      copy = copy.filter((p) => p.name.toLowerCase().includes(q));
    }
    return copy;
  }, [raw, search, period]);

  const getPeriodData = (p: Portfolio) => period === "YTD" ? p.ytd : p.fy;

  return (
    <div style={{ border: "1px solid #e0e0e0", borderRadius: "8px", background: "#fff", padding: "16px", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
        <div style={{ display: "flex", border: "1px solid #e0e0e0", borderRadius: "6px", overflow: "hidden" }}>
          {views.map((v, i) => (
            <button key={v} onClick={() => { setViewIdx(i); setSearch(""); }}
              style={{ border: "none", cursor: "pointer", padding: "6px 14px", fontSize: "13px", fontWeight: 500, background: viewIdx === i ? "#3855B3" : "#fff", color: viewIdx === i ? "#fff" : "#374151", transition: "background 0.15s, color 0.15s", whiteSpace: "nowrap" }}>
              {v}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "160px" }}>
            <TextInput placeholderText={`Search...`} value={search} onUpdate={(val) => setSearch(val)} inputSize="small" />
          </div>
          <div style={{ display: "flex", border: "1px solid #e0e0e0", borderRadius: "6px", overflow: "hidden" }}>
            {periods.map((p) => (
              <button key={p} onClick={() => setPeriod(p)}
                style={{ border: "none", cursor: "pointer", padding: "6px 12px", fontSize: "12px", fontWeight: 500, background: period === p ? "#3855B3" : "#fff", color: period === p ? "#fff" : "#374151", transition: "background 0.15s, color 0.15s", whiteSpace: "nowrap" }}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1, overflowY: "auto", minHeight: 0 }}>
        {data.map((p) => {
          const d = getPeriodData(p);
          const s = statusInfo(d.bw);
          const bwFormatted = d.bw >= 0 ? `+$${d.bw.toFixed(1)}M` : `–$${Math.abs(d.bw).toFixed(1)}M`;

          return (
            <div key={p.name} onClick={() => onRowClick?.(view, p.name)}
              style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", borderRadius: "6px", cursor: "pointer", transition: "background 0.1s" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 600 }}>{p.name}</span>
                  <Tag text={s.label} color={s.tagColor} size="small" isCopyable={false} />
                </div>
                <ScaleBar actual={d.actFcst} target={d.actFcst - d.bw} />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                  <span style={{ fontSize: "11px", color: "#374151", fontWeight: 600 }}>${d.actFcst.toFixed(1)}M</span>
                  <span style={{ fontSize: "11px", color: "#6b7280" }}>Target: ${(d.actFcst - d.bw).toFixed(1)}M</span>
                </div>
              </div>
              <div style={{ flexShrink: 0, textAlign: "right", minWidth: "70px" }}>
                <p style={{ fontSize: "13px", fontWeight: 600, margin: 0, color: d.bw >= 0 ? "#16a34a" : d.bw >= -5 ? "#d97706" : "#dc2626" }}>{bwFormatted}</p>
                <p style={{ fontSize: "11px", color: "#6b7280", margin: 0 }}>vs target</p>
              </div>
              <ArrowRight size={14} style={{ flexShrink: 0, color: "#9ca3af" }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
