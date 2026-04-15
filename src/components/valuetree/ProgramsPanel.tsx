import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Tag } from "@pepsico-ds/ui";
import type { Program } from "@/types/dashboard";

interface ProgramsPanelProps {
  programs: Program[];
}

export function ProgramsPanel({ programs }: ProgramsPanelProps) {
  const navigate = useNavigate();

  const topPrograms = useMemo(
    () => [...programs].sort((a, b) => b.benefit - a.benefit).slice(0, 8),
    [programs],
  );

  return (
    <div style={{ border: "1px solid #e0e0e0", borderRadius: "8px", background: "#fff", padding: "16px", display: "flex", flexDirection: "column", height: "100%" }}>
      <h3 style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "#6b7280", margin: "0 0 12px" }}>
        Top Programs
      </h3>

      <div style={{ flex: 1, overflowY: "auto", minHeight: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
        {topPrograms.map((p) => {
          const isPositive = p.bw >= 0;
          return (
            <div
              key={p.id}
              onClick={() => navigate(`/programs/${p.id}`)}
              style={{
                padding: "10px 12px",
                borderRadius: "6px",
                border: "1px solid #f3f4f6",
                cursor: "pointer",
                transition: "border-color 0.15s, box-shadow 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#3855B3"; e.currentTarget.style.boxShadow = "0 1px 4px rgba(56,85,179,0.12)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#f3f4f6"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "#111827" }}>{p.name}</span>
                <Tag
                  text={isPositive ? "On track" : "Watch"}
                  color={isPositive ? "green" : "red"}
                  size="small"
                  isCopyable={false}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "11px", color: "#6b7280" }}>{p.portfolio}</span>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#111827" }}>${p.benefit.toFixed(1)}M</span>
                  <span style={{ fontSize: "11px", fontWeight: 600, color: isPositive ? "#16a34a" : "#dc2626" }}>
                    {isPositive ? "+" : ""}${p.bw.toFixed(1)}M
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
