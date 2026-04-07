import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Program } from "@/types/dashboard";

export function AttentionChart({ programs }: { programs: Program[] }) {
  const atRisk = [...programs]
    .filter((p) => p.bw < 0)
    .sort((a, b) => a.bw - b.bw)
    .slice(0, 8);
  const maxAbs = Math.abs(atRisk[0]?.bw ?? 1);
  const navigate = useNavigate();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Programs Needing Attention
        </CardTitle>
        <CardDescription>B/(W) vs Target ($MM) — unfavorable variance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-2 flex items-center gap-3 border-b pb-2 text-xs font-medium text-muted-foreground">
          <span className="w-36 shrink-0">Program</span>
          <span className="flex-1" />
          <span className="w-12 shrink-0 text-right">B/(W)</span>
        </div>
        <div className="space-y-2.5">
          {atRisk.length === 0 && (
            <p className="py-4 text-center text-sm text-muted-foreground">All programs on track.</p>
          )}
          {atRisk.map((p) => (
            <div key={p.id} className="flex items-center gap-3">
              <span className="w-36 shrink-0 cursor-pointer truncate text-sm hover:text-blue-600 hover:underline" onClick={() => navigate(`/programs/${p.id}`)}>{p.name}</span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-red-500 transition-all"
                  style={{ width: `${(Math.abs(p.bw) / maxAbs) * 100}%` }}
                />
              </div>
              <span className="w-12 shrink-0 text-right text-sm font-medium tabular-nums text-red-600">
                {p.bw.toFixed(0)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
