import { useMemo } from "react";
import type { Program } from "@/types/dashboard";

interface StickyBottomBarProps {
  programs: Program[];
  year: string;
}

export function StickyBottomBar({ programs, year }: StickyBottomBarProps) {
  const totals = useMemo(() => {
    const nopbt = programs.reduce((s, p) => s + p.benefit, 0);
    const target = programs.reduce((s, p) => s + p.target, 0);
    const investment = nopbt * 0.77; // ROI ~130%
    return { nopbt: +nopbt.toFixed(1), target: +target.toFixed(1), investment: +investment.toFixed(1), count: programs.length };
  }, [programs]);

  return (
    <div style={{
      background: "#1e293b", color: "#fff", padding: "10px 20px",
      borderRadius: "0 0 10px 10px", display: "flex", alignItems: "center",
      justifyContent: "space-between", fontSize: 13,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <span style={{ color: "rgba(255,255,255,0.5)" }}>FY {year}</span>
        <span>{totals.count} Programs</span>
        <span style={{ color: "rgba(255,255,255,0.5)" }}>Target: <span style={{ color: "#fff", fontWeight: 600 }}>${totals.target}M</span></span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>Investment</span>
          <span style={{ fontSize: 15, fontWeight: 700 }}>${(totals.investment / 1000).toFixed(2)}BN</span>
        </div>
        <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.2)" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>NOPBT</span>
          <span style={{ fontSize: 18, fontWeight: 700 }}>${(totals.nopbt / 1000).toFixed(2)}BN</span>
        </div>
      </div>
    </div>
  );
}
