import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { Program } from "@/types/dashboard";

interface Agg { name: string; benefit: number; bw: number; count: number }

interface RiskAccordionTableProps {
  programs: Program[];
  groupBy: "region" | "portfolio" | "market";
  title: string;
  description: string;
}

function aggregate(programs: Program[], key: "region" | "portfolio" | "market"): Agg[] {
  const map = new Map<string, Agg>();
  for (const p of programs) {
    const r = map.get(p[key]) ?? { name: p[key], benefit: 0, bw: 0, count: 0 };
    r.benefit += p.benefit;
    r.bw += p.bw;
    r.count += 1;
    map.set(p[key], r);
  }
  return [...map.values()].sort((a, b) => b.benefit - a.benefit);
}

export function RiskAccordionTable({ programs, groupBy, title, description }: RiskAccordionTableProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const rows = aggregate(programs, groupBy);
  const navigate = useNavigate();

  const toggle = (name: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name); else next.add(name);
      return next;
    });
  };

  const groupLabel = groupBy.charAt(0).toUpperCase() + groupBy.slice(1);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-xs font-medium text-muted-foreground">
              <th className="pb-2 pr-2 text-left w-8" />
              <th className="pb-2 pr-4 text-left">{groupLabel}</th>
              <th className="pb-2 px-2 text-right">Programs</th>
              <th className="pb-2 px-2 text-right">On Track</th>
              <th className="pb-2 px-2 text-right">At Risk</th>
              <th className="pb-2 px-2 text-right">Risk %</th>
              <th className="pb-2 px-2 text-right">Benefit ($M)</th>
              <th className="pb-2 pl-2 text-right">B/(W)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const groupPrograms = programs.filter((p) => p[groupBy] === r.name);
              const good = groupPrograms.filter((p) => p.bw >= 0).sort((a, b) => b.benefit - a.benefit);
              const bad = groupPrograms.filter((p) => p.bw < 0).sort((a, b) => a.bw - b.bw);
              const riskPct = groupPrograms.length > 0 ? ((bad.length / groupPrograms.length) * 100).toFixed(0) : "0";
              const isOpen = expanded.has(r.name);

              return (
                <Fragment key={r.name}>
                  <tr
                    className="border-b cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => toggle(r.name)}
                  >
                    <td className="py-2.5 pr-2">
                      {isOpen
                        ? <ChevronDown className="size-4 text-muted-foreground" />
                        : <ChevronRight className="size-4 text-muted-foreground" />}
                    </td>
                    <td className="py-2.5 pr-4 font-medium">{r.name}</td>
                    <td className="py-2.5 px-2 text-right tabular-nums">{r.count}</td>
                    <td className="py-2.5 px-2 text-right tabular-nums text-green-700">{good.length}</td>
                    <td className="py-2.5 px-2 text-right tabular-nums text-red-600">{bad.length}</td>
                    <td className="py-2.5 px-2 text-right tabular-nums text-muted-foreground">{riskPct}%</td>
                    <td className="py-2.5 px-2 text-right tabular-nums">${r.benefit.toFixed(1)}</td>
                    <td className={`py-2.5 pl-2 text-right tabular-nums font-medium ${r.bw >= 0 ? "text-green-700" : "text-red-600"}`}>
                      {r.bw >= 0 ? "+" : ""}{r.bw.toFixed(1)}
                    </td>
                  </tr>
                  {isOpen && (
                    <tr>
                      <td colSpan={8} className="bg-muted/30 px-4 py-4">
                        <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr]">
                          <div>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-green-700">On Track ({good.length})</p>
                            {good.length === 0 ? (
                              <p className="text-xs text-muted-foreground">No programs on track</p>
                            ) : (
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="text-xs text-muted-foreground">
                                    <th className="pb-1.5 text-left font-medium">Program</th>
                                    <th className="pb-1.5 text-left font-medium">{groupBy === "portfolio" ? "Region" : "Portfolio"}</th>
                                    <th className="pb-1.5 text-right font-medium">Benefit</th>
                                    <th className="pb-1.5 text-right font-medium">B/(W)</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {good.map((p) => (
                                    <tr key={p.id} className="border-t border-border/50">
                                      <td className="py-1.5 pr-2 font-medium">
                                        <span className="cursor-pointer hover:text-blue-600 hover:underline" onClick={() => navigate(`/programs/${p.id}`)}>{p.name}</span>
                                      </td>
                                      <td className="py-1.5 pr-2 text-muted-foreground">{groupBy === "portfolio" ? p.region : p.portfolio}</td>
                                      <td className="py-1.5 text-right tabular-nums">${p.benefit.toFixed(1)}M</td>
                                      <td className="py-1.5 text-right tabular-nums font-medium text-green-700">+{p.bw.toFixed(1)}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            )}
                          </div>
                          <div className="hidden lg:block w-px bg-border" />
                          <div>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-600">At Risk ({bad.length})</p>
                            {bad.length === 0 ? (
                              <p className="text-xs text-muted-foreground">All programs on track</p>
                            ) : (
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="text-xs text-muted-foreground">
                                    <th className="pb-1.5 text-left font-medium">Program</th>
                                    <th className="pb-1.5 text-left font-medium">{groupBy === "portfolio" ? "Region" : "Portfolio"}</th>
                                    <th className="pb-1.5 text-right font-medium">Benefit</th>
                                    <th className="pb-1.5 text-right font-medium">B/(W)</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {bad.map((p) => (
                                    <tr key={p.id} className="border-t border-border/50">
                                      <td className="py-1.5 pr-2 font-medium">
                                        <span className="cursor-pointer hover:text-blue-600 hover:underline" onClick={() => navigate(`/programs/${p.id}`)}>{p.name}</span>
                                      </td>
                                      <td className="py-1.5 pr-2 text-muted-foreground">{groupBy === "portfolio" ? p.region : p.portfolio}</td>
                                      <td className="py-1.5 text-right tabular-nums">${p.benefit.toFixed(1)}M</td>
                                      <td className="py-1.5 text-right tabular-nums font-medium text-red-600">{p.bw.toFixed(1)}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
