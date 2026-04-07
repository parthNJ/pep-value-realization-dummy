import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Program } from "@/types/dashboard";

interface PortfolioRow { name: string; benefit: number; bw: number; count: number }

export function PortfolioBreakdown({ programs }: { programs: Program[] }) {
  const map = new Map<string, PortfolioRow>();
  for (const p of programs) {
    const r = map.get(p.portfolio) ?? { name: p.portfolio, benefit: 0, bw: 0, count: 0 };
    r.benefit += p.benefit;
    r.bw += p.bw;
    r.count += 1;
    map.set(p.portfolio, r);
  }
  const rows = [...map.values()].sort((a, b) => b.benefit - a.benefit);
  const maxBenefit = rows[0]?.benefit ?? 1;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Portfolio Breakdown
        </CardTitle>
        <CardDescription>Benefit by portfolio — programs in current view</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-2 flex items-center gap-3 border-b pb-2 text-xs font-medium text-muted-foreground">
          <span className="w-36 shrink-0">Portfolio</span>
          <span className="flex-1" />
          <span className="w-16 shrink-0 text-right">Benefit</span>
          <span className="w-14 shrink-0 text-right">B/(W)</span>
        </div>
        <div className="space-y-2.5">
          {rows.map((r) => (
            <div key={r.name} className="flex items-center gap-3">
              <span className="w-36 shrink-0 truncate text-sm font-medium">{r.name}</span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-indigo-500 transition-all"
                  style={{ width: `${(r.benefit / maxBenefit) * 100}%` }}
                />
              </div>
              <span className="w-16 shrink-0 text-right text-sm tabular-nums">${r.benefit.toFixed(1)}M</span>
              <span className={`w-14 shrink-0 text-right text-xs font-medium tabular-nums ${r.bw >= 0 ? "text-green-700" : "text-red-600"}`}>
                {r.bw >= 0 ? "+" : ""}{r.bw.toFixed(1)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
