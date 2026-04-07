import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { RiskAccordionTable } from "@/components/shared/RiskAccordionTable";
import { AIInsights, marketInsights } from "@/components/shared/AIInsights";
import type { Program } from "@/types/dashboard";

interface Agg { name: string; benefit: number; bw: number; count: number }

function aggregate(programs: Program[]): Agg[] {
  const map = new Map<string, Agg>();
  for (const p of programs) {
    const r = map.get(p.market) ?? { name: p.market, benefit: 0, bw: 0, count: 0 };
    r.benefit += p.benefit;
    r.bw += p.bw;
    r.count += 1;
    map.set(p.market, r);
  }
  return [...map.values()].sort((a, b) => b.benefit - a.benefit);
}

export function MarketsTab({ programs }: { programs: Program[] }) {
  const rows = aggregate(programs);
  const top10 = rows.slice(0, 10);
  const maxBenefit = top10[0]?.benefit ?? 1;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Market Concentration</CardTitle>
          <CardDescription>Top 10 markets by benefit — programs in current view</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-2 flex items-center gap-3 border-b pb-2 text-xs font-medium text-muted-foreground">
            <span className="w-44 shrink-0">Market</span>
            <span className="flex-1" />
            <span className="w-16 shrink-0 text-right">Benefit</span>
            <span className="w-14 shrink-0 text-right">B/(W)</span>
            <span className="w-10 shrink-0 text-right">Programs</span>
          </div>
          <div className="space-y-2.5">
            {top10.map((r) => (
              <div key={r.name} className="flex items-center gap-3">
                <span className="w-44 shrink-0 truncate text-sm font-medium">{r.name}</span>
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-teal-500 transition-all" style={{ width: `${(r.benefit / maxBenefit) * 100}%` }} />
                </div>
                <span className="w-16 shrink-0 text-right text-sm tabular-nums">${r.benefit.toFixed(1)}M</span>
                <span className={`w-14 shrink-0 text-right text-xs font-medium tabular-nums ${r.bw >= 0 ? "text-green-700" : "text-red-600"}`}>
                  {r.bw >= 0 ? "+" : ""}{r.bw.toFixed(1)}
                </span>
                <span className="w-10 shrink-0 text-right text-xs text-muted-foreground">{r.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Market Variance vs Target</CardTitle>
            <CardDescription>B/(W) by market ($MM)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={Math.max(rows.length * 28, 200)}>
              <BarChart data={rows} layout="vertical" margin={{ top: 0, right: 10, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                <XAxis type="number" tick={{ fontSize: 10 }} tickFormatter={(v: number) => `${v > 0 ? "+" : ""}${v}`} />
                <YAxis type="category" dataKey="name" width={130} tick={{ fontSize: 10 }} />
                <Tooltip formatter={(v) => [`${Number(v) > 0 ? "+" : ""}${Number(v).toFixed(1)}M`, "B/(W)"]} />
                <Bar dataKey="bw" radius={[0, 4, 4, 0]}>
                  {rows.map((r, i) => (
                    <Cell key={i} fill={r.bw >= 0 ? "#16a34a" : "#dc2626"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Markets at Risk</CardTitle>
            <CardDescription>Markets with negative variance — sorted by severity</CardDescription>
          </CardHeader>
          <CardContent>
            {rows.filter((r) => r.bw < 0).length === 0 ? (
              <p className="py-4 text-center text-sm text-muted-foreground">All markets on track.</p>
            ) : (
              <>
                <div className="mb-2 flex items-center gap-3 border-b pb-2 text-xs font-medium text-muted-foreground">
                  <span className="w-40 shrink-0">Market</span>
                  <span className="w-16 shrink-0 text-right">Benefit</span>
                  <span className="flex-1 text-right">B/(W)</span>
                </div>
                <div className="space-y-2">
                  {rows.filter((r) => r.bw < 0).sort((a, b) => a.bw - b.bw).map((r) => (
                    <div key={r.name} className="flex items-center gap-3">
                      <span className="w-40 shrink-0 truncate text-sm font-medium">{r.name}</span>
                      <span className="w-16 shrink-0 text-right text-sm tabular-nums">${r.benefit.toFixed(1)}M</span>
                      <span className="flex-1 text-right text-sm font-medium tabular-nums text-red-600">{r.bw.toFixed(1)}M</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <RiskAccordionTable
        programs={programs}
        groupBy="market"
        title="Market Risk Summary"
        description="Click a market to see program details"
      />
      <AIInsights insights={marketInsights} />
    </div>
  );
}
