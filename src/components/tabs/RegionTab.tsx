import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { RiskAccordionTable } from "@/components/shared/RiskAccordionTable";
import { AIInsights, regionInsights } from "@/components/shared/AIInsights";
import type { Program } from "@/types/dashboard";

interface Agg { name: string; benefit: number; bw: number; count: number }

function aggregate(programs: Program[]): Agg[] {
  const map = new Map<string, Agg>();
  for (const p of programs) {
    const r = map.get(p.region) ?? { name: p.region, benefit: 0, bw: 0, count: 0 };
    r.benefit += p.benefit;
    r.bw += p.bw;
    r.count += 1;
    map.set(p.region, r);
  }
  return [...map.values()].sort((a, b) => b.benefit - a.benefit);
}

export function RegionTab({ programs }: { programs: Program[] }) {
  const rows = aggregate(programs);
  const maxBenefit = rows[0]?.benefit ?? 1;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Region Performance</CardTitle>
            <CardDescription>Total benefit by region — ranked by contribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-2 flex items-center gap-3 border-b pb-2 text-xs font-medium text-muted-foreground">
              <span className="w-36 shrink-0">Region</span>
              <span className="flex-1" />
              <span className="w-16 shrink-0 text-right">Benefit</span>
              <span className="w-10 shrink-0 text-right">Programs</span>
            </div>
            <div className="space-y-2.5">
              {rows.map((r) => (
                <div key={r.name} className="flex items-center gap-3">
                  <span className="w-36 shrink-0 truncate text-sm font-medium">{r.name}</span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: `${(r.benefit / maxBenefit) * 100}%` }} />
                  </div>
                  <span className="w-16 shrink-0 text-right text-sm tabular-nums">${r.benefit.toFixed(1)}M</span>
                  <span className="w-10 shrink-0 text-right text-xs text-muted-foreground">{r.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Region Variance vs Target</CardTitle>
            <CardDescription>B/(W) by region ($MM)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={Math.max(rows.length * 44, 200)}>
              <BarChart data={rows} layout="vertical" margin={{ top: 0, right: 10, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={(v: number) => `${v > 0 ? "+" : ""}${v}`} />
                <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 11 }} />
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
      </div>

      <RiskAccordionTable
        programs={programs}
        groupBy="region"
        title="Region Risk Summary"
        description="Click a region to see program details"
      />
      <AIInsights insights={regionInsights} />
    </div>
  );
}
