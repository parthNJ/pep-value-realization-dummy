import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Program } from "@/types/dashboard";

export function TopProgramsChart({ programs }: { programs: Program[] }) {
  const top10 = [...programs].sort((a, b) => b.benefit - a.benefit).slice(0, 10);
  const max = top10[0]?.benefit ?? 1;
  const navigate = useNavigate();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Top 10 Programs by Benefit
        </CardTitle>
        <CardDescription>Act + Fcst ($MM) — ranked by total benefit</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-2 flex items-center gap-3 border-b pb-2 text-xs font-medium text-muted-foreground">
          <span className="w-36 shrink-0">Program</span>
          <span className="flex-1" />
          <span className="w-12 shrink-0 text-right">$MM</span>
        </div>
        <div className="space-y-2.5">
          {top10.map((p) => (
            <div key={p.id} className="flex items-center gap-3">
              <span className="w-36 shrink-0 cursor-pointer truncate text-sm hover:text-blue-600 hover:underline" onClick={() => navigate(`/programs/${p.id}`)}>{p.name}</span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-blue-500 transition-all"
                  style={{ width: `${(p.benefit / max) * 100}%` }}
                />
              </div>
              <span className="w-12 shrink-0 text-right text-sm font-medium tabular-nums">
                {p.benefit.toFixed(0)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
