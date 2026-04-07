import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card";
import { ArrowUpDown, ArrowDownUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Portfolio } from "@/types/dashboard";

export function ContributionChart({
  portfolios,
}: {
  portfolios: Portfolio[];
}) {
  const [asc, setAsc] = useState(false);

  const sorted = [...portfolios].sort((a, b) =>
    asc ? a.ytd.actFcst - b.ytd.actFcst : b.ytd.actFcst - a.ytd.actFcst,
  );

  const max = Math.max(...portfolios.map((p) => p.ytd.actFcst));

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Portfolio Contribution
        </CardTitle>
        <CardDescription>
          Act + Fcst ($MM) — share of total benefit
        </CardDescription>
        <CardAction>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setAsc(!asc)}
            aria-label="Toggle sort"
          >
            {asc ? (
              <ArrowUpDown className="size-4" />
            ) : (
              <ArrowDownUp className="size-4" />
            )}
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="mb-2 flex items-center gap-3 border-b pb-2 text-xs font-medium text-muted-foreground">
          <span className="w-32 shrink-0">Portfolio</span>
          <span className="flex-1" />
          <span className="w-16 shrink-0 text-right">$MM</span>
        </div>
        <div className="space-y-3">
        {sorted.map((p) => {
          const pct = (p.ytd.actFcst / max) * 100;
          return (
            <div key={p.name} className="flex items-center gap-3">
              <span className="w-32 shrink-0 truncate text-sm">
                {p.name}
              </span>
              <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-blue-500 transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="w-16 shrink-0 text-right text-sm font-medium tabular-nums">
                ${p.ytd.actFcst.toFixed(1)}
              </span>
            </div>
          );
        })}
        </div>
      </CardContent>
    </Card>
  );
}
