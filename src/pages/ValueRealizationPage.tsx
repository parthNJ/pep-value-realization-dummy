import { useState, useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ValueTreeChart } from "@/components/valuetree/ValueTreeChart";
import { NopbtContribution } from "@/components/valuetree/NopbtContribution";
import { ProgramsPanel } from "@/components/valuetree/ProgramsPanel";
import { StickyBottomBar } from "@/components/valuetree/StickyBottomBar";
import { Footer } from "@/components/dashboard/Footer";
import { valueTree, sntByL1, sntByRegion, sntByExpenseType, sntByTactic } from "@/data/valueTree";
import { qualitative } from "@pepsico-ds/ui";
import type { ValueNode } from "@/data/valueTree";
import { programs } from "@/data/programs";

const CHART_COLORS = (qualitative as string[])?.length ? qualitative as string[] : ["#3855B3", "#059669", "#d97706", "#dc2626", "#7c3aed", "#0891b2", "#475569", "#be185d"];

type DrawerView = "bars" | "table" | "donut";

/* ── Scale bar: actual fill + target marker ── */
function ScaleBar({ actual, target }: { actual: number; target: number }) {
  const max = Math.max(actual, target) * 1.12;
  const actPct = max > 0 ? (actual / max) * 100 : 0;
  const tgtPct = max > 0 ? (target / max) * 100 : 0;
  const pos = actual >= target;
  return (
    <div style={{ position: "relative", height: 5, background: "#f1f5f9", borderRadius: 3 }}>
      <div style={{ position: "absolute", left: 0, top: 0, height: "100%", borderRadius: 3, width: `${actPct}%`, background: pos ? "#94a3b8" : "#e2a0a0", transition: "width .3s" }} />
      <div style={{ position: "absolute", top: -2, left: `${tgtPct}%`, width: 2, height: 9, background: "#1e293b", borderRadius: 1 }} />
    </div>
  );
}

/* ── Accordion team section ── */
function TeamAccordion({ team, rows, mode }: {
  team: string; rows: typeof sntByL1; mode: "bars" | "table";
}) {
  const [open, setOpen] = useState(false);
  const teamProd = rows.reduce((s, r) => s + r.productivity, 0);
  const teamTarget = rows.reduce((s, r) => s + r.target, 0);
  const teamBw = +(teamProd - teamTarget).toFixed(1);
  const teamPos = teamBw >= 0;

  return (
    <div style={{ border: "1px solid #f1f5f9", borderRadius: 6, overflow: "hidden" }}>
      {/* Team header — always visible */}
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", background: open ? "#f8fafc" : "#fff", border: "none", cursor: "pointer",
        padding: "8px 10px", display: "flex", alignItems: "center", gap: 8, transition: "background .15s",
      }}>
        <span style={{ fontSize: 10, color: "#64748b", transition: "transform .2s", transform: open ? "rotate(90deg)" : "rotate(0)", display: "inline-block" }}>▸</span>
        <span style={{ flex: 1, textAlign: "left" }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#1e293b" }}>{team}</span>
        </span>
        <span style={{ fontSize: 11, fontWeight: 600, color: "#1e293b" }}>${teamProd.toFixed(1)}M</span>
        <span style={{ fontSize: 10, fontWeight: 600, color: teamPos ? "#059669" : "#dc2626", width: 52, textAlign: "right" }}>
          {teamPos ? "+" : ""}{teamBw.toFixed(1)}M
        </span>
      </button>

      {/* Children — collapsible */}
      {open && (
        <div style={{ borderTop: "1px solid #f1f5f9" }}>
          {mode === "bars" ? (
            <div style={{ padding: "4px 10px 8px" }}>
              {rows.map((r) => {
                const rPos = r.bw >= 0;
                return (
                  <div key={r.name} style={{ padding: "6px 0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
                      <span style={{ color: "#374151" }}>{r.name}</span>
                      <div style={{ display: "flex", gap: 8 }}>
                        <span style={{ fontWeight: 600, color: "#1e293b" }}>${r.productivity.toFixed(1)}M</span>
                        <span style={{ fontWeight: 600, color: rPos ? "#059669" : "#dc2626", width: 44, textAlign: "right" }}>
                          {rPos ? "+" : ""}{r.bw.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <ScaleBar actual={r.productivity} target={r.target} />
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "#94a3b8", marginTop: 2 }}>
                      <span>Actual: ${r.productivity.toFixed(1)}M</span>
                      <span>Target: ${r.target.toFixed(1)}M</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.name} style={{ borderBottom: "1px solid #f8fafc" }}>
                    <td style={{ padding: "5px 10px", color: "#374151" }}>{r.name}</td>
                    <td style={{ padding: "5px 6px", textAlign: "right", color: "#1e293b" }}>${r.productivity.toFixed(1)}M</td>
                    <td style={{ padding: "5px 6px", textAlign: "right", color: "#64748b" }}>${r.target.toFixed(1)}M</td>
                    <td style={{ padding: "5px 6px", textAlign: "right", fontWeight: 600, color: r.bw >= 0 ? "#059669" : "#dc2626" }}>
                      {r.bw >= 0 ? "+" : ""}{r.bw.toFixed(1)}M
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

/* ── L1 Breakdown Section (content only, no header) ── */
function GroupedAccordionContent({ l1, view }: {
  l1: { teams: string[]; rows: typeof sntByL1; total: number }; view: DrawerView;
}) {
  return (
    <>
      {(view === "bars" || view === "table") && (
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {view === "table" && (
            <div style={{ display: "flex", padding: "0 10px", fontSize: 10, fontWeight: 600, color: "#94a3b8" }}>
              <span style={{ flex: 1 }}>Team / L1</span>
              <span style={{ width: 60, textAlign: "right" }}>Prod</span>
              <span style={{ width: 60, textAlign: "right" }}>Target</span>
              <span style={{ width: 52, textAlign: "right" }}>B/W</span>
            </div>
          )}
          {l1.teams.map((team) => (
            <TeamAccordion key={team} team={team} rows={l1.rows.filter(r => r.team === team)} mode={view} />
          ))}
        </div>
      )}

      {view === "donut" && (() => {
        const teamData = l1.teams.map((team) => ({
          name: team,
          value: +l1.rows.filter(r => r.team === team).reduce((s, r) => s + r.productivity, 0).toFixed(1),
        }));
        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ width: 200, height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={teamData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius="36%" outerRadius="82%" paddingAngle={2} stroke="none">
                    {teamData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v) => `$${v}M`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ width: "100%", fontSize: 11 }}>
              {teamData.map((t, i) => (
                <div key={t.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 0" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: CHART_COLORS[i % CHART_COLORS.length] }} />
                    <span style={{ color: "#1e293b", fontWeight: 500 }}>{t.name}</span>
                  </span>
                  <span style={{ display: "flex", gap: 8 }}>
                    <span style={{ fontWeight: 600, color: "#1e293b" }}>${t.value}M</span>
                    <span style={{ color: "#64748b" }}>{l1.total > 0 ? ((t.value / l1.total) * 100).toFixed(0) : 0}%</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })()}
    </>
  );
}

/* ── Flat list with 3 views (progress / table / donut) ── */
function FlatListViews({ rows, view }: { rows: { name: string; productivity: number; target: number; bw: number }[]; view: DrawerView }) {
  const total = rows.reduce((s, r) => s + r.productivity, 0);

  if (view === "bars") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {rows.map((r) => (
          <div key={r.name} style={{ padding: "6px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
              <span style={{ color: "#374151", flex: 1, minWidth: 0 }}>{r.name}</span>
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                <span style={{ fontWeight: 600, color: "#1e293b" }}>${r.productivity.toFixed(1)}M</span>
                <span style={{ fontWeight: 600, color: r.bw >= 0 ? "#059669" : "#dc2626", width: 44, textAlign: "right" }}>
                  {r.bw >= 0 ? "+" : ""}{r.bw.toFixed(1)}
                </span>
              </div>
            </div>
            <ScaleBar actual={r.productivity} target={r.target} />
          </div>
        ))}
      </div>
    );
  }

  if (view === "table") {
    return (
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
            <th style={{ textAlign: "left", padding: "5px 6px", fontWeight: 600, color: "#94a3b8", fontSize: 10 }}>Name</th>
            <th style={{ textAlign: "right", padding: "5px 6px", fontWeight: 600, color: "#94a3b8", fontSize: 10 }}>Prod</th>
            <th style={{ textAlign: "right", padding: "5px 6px", fontWeight: 600, color: "#94a3b8", fontSize: 10 }}>Target</th>
            <th style={{ textAlign: "right", padding: "5px 6px", fontWeight: 600, color: "#94a3b8", fontSize: 10 }}>B/W</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} style={{ borderBottom: "1px solid #f8fafc" }}>
              <td style={{ padding: "5px 6px", color: "#1e293b" }}>{r.name}</td>
              <td style={{ padding: "5px 6px", textAlign: "right" }}>${r.productivity.toFixed(1)}M</td>
              <td style={{ padding: "5px 6px", textAlign: "right", color: "#64748b" }}>${r.target.toFixed(1)}M</td>
              <td style={{ padding: "5px 6px", textAlign: "right", fontWeight: 600, color: r.bw >= 0 ? "#059669" : "#dc2626" }}>
                {r.bw >= 0 ? "+" : ""}{r.bw.toFixed(1)}M
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  // donut
  const chartData = rows.filter(r => r.productivity > 0).map(r => ({ name: r.name, value: r.productivity }));
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <div style={{ width: 180, height: 180 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius="36%" outerRadius="82%" paddingAngle={2} stroke="none">
              {chartData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
            </Pie>
            <Tooltip formatter={(v) => `$${v}M`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div style={{ width: "100%", fontSize: 11 }}>
        {chartData.map((t, i) => (
          <div key={t.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "3px 0" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: CHART_COLORS[i % CHART_COLORS.length] }} />
              <span style={{ color: "#1e293b", fontWeight: 500 }}>{t.name}</span>
            </span>
            <span style={{ display: "flex", gap: 8 }}>
              <span style={{ fontWeight: 600, color: "#1e293b" }}>${t.value}M</span>
              <span style={{ color: "#64748b" }}>{total > 0 ? ((t.value / total) * 100).toFixed(0) : 0}%</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── View mode icon toggle ── */
function ViewModeIcons({ view, setView }: { view: DrawerView; setView: (v: DrawerView) => void }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {([
        { key: "bars" as DrawerView, icon: "≡", title: "Progress" },
        { key: "table" as DrawerView, icon: "⊞", title: "Table" },
        { key: "donut" as DrawerView, icon: "◔", title: "Donut" },
      ]).map(({ key, icon, title }) => (
        <button key={key} onClick={() => setView(key)} title={title}
          style={{ background: view === key ? "#f1f5f9" : "transparent", border: "none", cursor: "pointer", borderRadius: 5, width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: view === key ? "#0f172a" : "#94a3b8", transition: "all .15s" }}>
          {icon}
        </button>
      ))}
    </div>
  );
}

/* ── L1 grouped data ── */
function useL1Data() {
  const teams = [...new Set(sntByL1.map(r => r.team))];
  const rows = sntByL1;
  const total = rows.reduce((s, r) => s + r.productivity, 0);
  return { teams, rows, total };
}

/* ── Drawer ── */
function DetailDrawer({ node, onClose, leftView, leftSelection }: {
  node: ValueNode; onClose: () => void;
  leftView: string; // "Portfolio" | "Region" | "Market" | ""
  leftSelection: string; // the selected group name, or ""
}) {
  const pos = node.bw >= 0;
  const pct = node.target > 0 ? ((node.nopbt / node.target) * 100).toFixed(0) : "—";
  const isL1 = node.id === "snt-by-l1";
  const isRegion = node.id === "snt-by-region";
  const isExpense = node.id === "snt-by-expense";
  const isTactic = node.id === "snt-by-tactic";
  const hasSntView = isL1 || isRegion || isExpense || isTactic;
  const isGrowthLeaf = node.id === "revenue" || node.id === "cm" || node.id === "nopbt-benefit";
  const [view, setView] = useState<DrawerView>("bars");
  const [expenseTab, setExpenseTab] = useState<"Labor" | "Non-Labor">("Labor");
  const l1 = useL1Data();

  // Determine what to group Growth leaf data by based on left-panel selection
  const growthGroupBy = leftView === "Region" ? "market" : leftView === "Market" ? "market" : "program";

  // Growth leaf breakdown — adapts based on left-panel view
  const growthRows = useMemo(() => {
    if (!isGrowthLeaf) return [];
    const revenueRatio = 347.2 / 1015.4;
    const cmRatio = 170.8 / 1015.4;
    const nopbtRatio = 497.4 / 1015.4;
    const ratio = node.id === "revenue" ? revenueRatio : node.id === "cm" ? cmRatio : nopbtRatio;
    const targetRatio = node.id === "revenue" ? 294.6 / 845.8 : node.id === "cm" ? 139.0 / 845.8 : 412.2 / 845.8;

    // Filter programs if a left-side selection is active
    const filtered = leftSelection
      ? programs.filter(p => {
          if (leftView === "Portfolio") return p.portfolio === leftSelection;
          if (leftView === "Region") return p.region === leftSelection;
          if (leftView === "Market") return p.market === leftSelection;
          return true;
        })
      : programs;

    if (growthGroupBy === "program") {
      // Show individual programs
      return filtered
        .map(p => ({
          name: p.name,
          productivity: +(p.benefit * ratio).toFixed(1),
          target: +(p.target * targetRatio).toFixed(1),
          bw: +((p.benefit * ratio) - (p.target * targetRatio)).toFixed(1),
        }))
        .sort((a, b) => b.productivity - a.productivity);
    }

    // Group by market
    const map = new Map<string, { benefit: number; target: number }>();
    for (const p of filtered) {
      const key = p.market;
      const r = map.get(key) ?? { benefit: 0, target: 0 };
      r.benefit += p.benefit;
      r.target += p.target;
      map.set(key, r);
    }
    return [...map.entries()]
      .map(([name, d]) => ({
        name,
        productivity: +(d.benefit * ratio).toFixed(1),
        target: +(d.target * targetRatio).toFixed(1),
        bw: +((d.benefit * ratio) - (d.target * targetRatio)).toFixed(1),
      }))
      .sort((a, b) => b.productivity - a.productivity);
  }, [isGrowthLeaf, node.id, leftView, leftSelection, growthGroupBy]);

  const growthLabel = growthGroupBy === "market" ? "Market Breakdown" : "Program Contributions";

  // Region data grouped like L1
  const regionData = {
    teams: [...new Set(sntByRegion.map(r => r.team))],
    rows: sntByRegion,
    total: sntByRegion.reduce((s, r) => s + r.productivity, 0),
  };

  // Expense type data filtered by tab
  const expenseRows = sntByExpenseType.filter(r => r.category === expenseTab);

  // Pick the right grouped data for accordion views
  const activeGrouped = isL1 ? l1 : isRegion ? regionData : null;
  const sectionLabel = isL1 ? "L1 Breakdown" : isRegion ? "Region Breakdown" : isExpense ? "Expense Type" : "By Tactic";

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.25)", zIndex: 40 }} />
      <div className="thin-scrollbar" style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width: 380, zIndex: 50,
        background: "#fff", boxShadow: "-4px 0 24px rgba(0,0,0,.1)",
        display: "flex", flexDirection: "column", animation: "slideIn .25s ease",
      }}>
        {/* Header */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 700, margin: 0, color: "#0f172a" }}>{node.label}</h2>
            <p style={{ fontSize: 11, color: "#64748b", margin: "2px 0 0" }}>
              {isL1 ? "S&T Productivity by Leadership Team" : "Detailed breakdown"}
            </p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#64748b", padding: 4 }}>✕</button>
        </div>

        <div className="thin-scrollbar" style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
          {/* KPI tiles */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {[
              { label: "Actual", value: `$${node.nopbt.toFixed(1)}M` },
              { label: "Target", value: `$${node.target.toFixed(1)}M` },
              { label: "B/(W)", value: `${pos ? "+" : ""}$${node.bw.toFixed(1)}M`, color: pos ? "#059669" : "#dc2626" },
            ].map((k) => (
              <div key={k.label} style={{ background: "#f8fafc", borderRadius: 8, padding: "10px 12px" }}>
                <span style={{ fontSize: 10, color: "#64748b" }}>{k.label}</span>
                <div style={{ fontSize: 16, fontWeight: 700, color: k.color ?? "#0f172a", marginTop: 1 }}>{k.value}</div>
              </div>
            ))}
          </div>

          {/* Achievement bar */}
          <div style={{ background: "#f8fafc", borderRadius: 8, padding: "10px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#0f172a" }}>Progress</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: pos ? "#059669" : "#dc2626" }}>{pct}%</span>
            </div>
            <div style={{ height: 6, background: "#e2e8f0", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 3, width: `${Math.min(Number(pct) || 0, 100)}%`, background: pos ? "#94a3b8" : "#e2a0a0", transition: "width .4s" }} />
            </div>
          </div>

          {/* Growth leaf nodes — program-level breakdown */}
          {isGrowthLeaf && (
            <>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {growthLabel} ({growthRows.length})
                </span>
                <ViewModeIcons view={view} setView={setView} />
              </div>
              <div className="thin-scrollbar" style={{ maxHeight: 360, overflowY: "auto" }}>
                <FlatListViews rows={growthRows} view={view} />
              </div>
            </>
          )}

          {/* S&T Productivity breakdown views */}
          {hasSntView && (
            <>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>{sectionLabel}</span>
                {!isTactic && !isExpense && (
                  <ViewModeIcons view={view} setView={setView} />
                )}
              </div>

              {/* L1 or Region — accordion views */}
              {activeGrouped && (
                <GroupedAccordionContent l1={activeGrouped} view={view} />
              )}

              {/* Expense Type — tabbed Labor / Non-Labor with 3 views */}
              {isExpense && (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", border: "1px solid #e2e8f0", borderRadius: 5, overflow: "hidden" }}>
                      {(["Labor", "Non-Labor"] as const).map((tab) => (
                        <button key={tab} onClick={() => setExpenseTab(tab)}
                          style={{ border: "none", cursor: "pointer", padding: "4px 14px", fontSize: 11, fontWeight: 500, background: expenseTab === tab ? "#e2e8f0" : "#fff", color: expenseTab === tab ? "#374151" : "#475569", transition: "all .15s" }}>
                          {tab}
                        </button>
                      ))}
                    </div>
                    <ViewModeIcons view={view} setView={setView} />
                  </div>
                  <FlatListViews rows={expenseRows} view={view} />
                </div>
              )}

              {/* Tactic — flat list with 3 views */}
              {isTactic && (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <ViewModeIcons view={view} setView={setView} />
                  </div>
                  <FlatListViews rows={sntByTactic} view={view} />
                </div>
              )}
            </>
          )}

          {/* Generic children breakdown for other nodes */}
          {!hasSntView && !isGrowthLeaf && node.children && node.children.length > 0 && (
            <div>
              <h4 style={{ fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 8px" }}>Breakdown</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {node.children.map((child) => {
                  const cPos = child.bw >= 0;
                  const cPct = node.nopbt > 0 ? ((child.nopbt / node.nopbt) * 100).toFixed(0) : "0";
                  return (
                    <div key={child.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 6, border: "1px solid #f1f5f9" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: "#0f172a" }}>{child.label}</div>
                        <div style={{ height: 3, background: "#f1f5f9", borderRadius: 2, marginTop: 5 }}>
                          <div style={{ height: "100%", borderRadius: 2, width: `${cPct}%`, background: "#3855B3", transition: "width .3s" }} />
                        </div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>${child.nopbt.toFixed(1)}M</div>
                        <div style={{ fontSize: 10, fontWeight: 600, color: cPos ? "#059669" : "#dc2626" }}>{cPos ? "+" : ""}{child.bw.toFixed(1)}M</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export function ValueRealizationPage() {
  const [drawerNode, setDrawerNode] = useState<ValueNode | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<{ name: string; view: string }>({ name: "", view: "" });

  const handleSelectGroup = (name: string, view: string) => {
    setSelectedGroup({ name, view });
  };

  // Filter programs based on left-panel selection for the tree context
  const contextPrograms = useMemo(() => {
    if (!selectedGroup.name) return programs;
    const key = selectedGroup.view === "Portfolio" ? "portfolio" : selectedGroup.view === "Region" ? "region" : "market";
    return programs.filter(p => (p[key as keyof typeof p] as string) === selectedGroup.name);
  }, [selectedGroup]);

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fb" }}>
      <DashboardHeader />

      <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "16px 24px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h1 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: "#0f172a" }}>Value Realization</h1>
          <p style={{ fontSize: 13, color: "#64748b", margin: "4px 0 0" }}>
            NOPBT contribution breakdown across S&T Enabled Benefits and Productivity
            {selectedGroup.name && (
              <span style={{ color: "#3855B3", fontWeight: 600 }}> · Filtered: {selectedGroup.name}</span>
            )}
          </p>
        </div>
      </div>

      <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "4fr 8fr", gap: 16, height: 560 }}>
          <NopbtContribution programs={programs} onSelectGroup={handleSelectGroup} />
          <div style={{ display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0, height: "100%" }}>
            <ValueTreeChart tree={valueTree} onOpenDrawer={setDrawerNode} />
            <StickyBottomBar programs={contextPrograms} year="2025" />
          </div>
        </div>

        <ProgramsPanel programs={contextPrograms} />
      </main>

      <Footer />
      {drawerNode && <DetailDrawer node={drawerNode} onClose={() => setDrawerNode(null)} leftView={selectedGroup.view} leftSelection={selectedGroup.name} />}
    </div>
  );
}
