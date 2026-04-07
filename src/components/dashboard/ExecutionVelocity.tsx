import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { Program } from "@/types/dashboard";

export function ExecutionVelocity({ programs }: { programs: Program[] }) {
  const total = programs.length;
  const improving = programs.filter((p) => p.growth === "Strong").length;
  const declining = programs.filter((p) => p.growth === "Slowing").length;
  const flat = total - improving - declining;

  const improvingPct = total > 0 ? ((improving / total) * 100).toFixed(0) : "0";
  const decliningPct = total > 0 ? ((declining / total) * 100).toFixed(0) : "0";
  const flatPct = total > 0 ? ((flat / total) * 100).toFixed(0) : "0";

  return (
    <Card>
      <CardContent className="pt-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Execution Velocity
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Program momentum this period — {total} programs
        </p>
        <div className="mt-3 flex gap-6">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-green-50">
              <TrendingUp className="size-4 text-green-600" />
            </div>
            <div>
              <p className="text-lg font-semibold text-green-700">{improvingPct}%</p>
              <p className="text-xs text-muted-foreground">Improving ({improving})</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-slate-100">
              <Minus className="size-4 text-slate-500" />
            </div>
            <div>
              <p className="text-lg font-semibold">{flatPct}%</p>
              <p className="text-xs text-muted-foreground">Steady ({flat})</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-red-50">
              <TrendingDown className="size-4 text-red-600" />
            </div>
            <div>
              <p className="text-lg font-semibold text-red-600">{decliningPct}%</p>
              <p className="text-xs text-muted-foreground">Declining ({declining})</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
