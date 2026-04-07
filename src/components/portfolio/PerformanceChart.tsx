import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card";
import { ArrowUpDown, ArrowDownUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Portfolio, Status } from "@/types/dashboard";

const barColor: Record<Status, string> = {
  green: "bg-green-600",
  amber: "bg-amber-500",
  red: "bg-red-600",
};

const textColor: Record<Status, string> = {
  green: "text-green-700",
  amber: "text-amber-700",
  red: "text-red-700",
};

export function PerformanceChart({
  portfolios,
}: {
  portfolios: Portfolio[];
}) {
  const [asc, setAsc] = useState(false);

  const sorted = [...portfolios].sort((a, b) =>
    asc ? a.ytd.bw - b.ytd.bw : b.ytd.bw - a.ytd.bw,
  );

  const maxAbs = Math.max(...portfolios.map((p) => Math.abs(p.ytd.bw)));

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Portfolio Performance vs Target
        </CardTitle>
        <CardDescription>B/(W) vs Target ($MM)</CardDescription>
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
        {/* Column labels */}
        <div className="mb-3 flex items-center gap-3 border-b pb-2 text-xs font-medium text-muted-foreground">
          <span className="w-28 shrink-0">Portfolio</span>
          <span className="w-16 shrink-0 text-right">Act+Fcst</span>
          <span className="w-16 shrink-0 text-right">Target</span>
          <span className="flex-1" />
          <span className="w-16 shrink-0 text-right">B/(W)</span>
        </div>

        <div className="space-y-3">
          {sorted.map((p) => {
            const pct = maxAbs > 0 ? (Math.abs(p.ytd.bw) / maxAbs) * 100 : 0;
            const isPositive = p.ytd.bw >= 0;
            const formatted = isPositive
              ? `+${p.ytd.bw.toFixed(1)}`
              : `–${Math.abs(p.ytd.bw).toFixed(1)}`;

            return (
              <div key={p.name} className="flex items-center gap-3">
                <span className="w-28 shrink-0 truncate text-sm font-medium">
                  {p.name}
                </span>
                <span className="w-16 shrink-0 text-right text-sm tabular-nums">
                  {p.ytd.actFcst.toFixed(1)}
                </span>
                <span className="w-16 shrink-0 text-right text-sm tabular-nums text-muted-foreground">
                  {p.ytd.target.toFixed(1)}
                </span>

                {/* Bar — always grows left-to-right, color indicates status */}
                <div className="flex h-3 flex-1 items-center overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full transition-all ${barColor[p.ytd.status]}`}
                    style={{ width: `${Math.max(pct, 3)}%` }}
                  />
                </div>

                <span
                  className={`w-16 shrink-0 text-right text-sm font-semibold tabular-nums ${textColor[p.ytd.status]}`}
                >
                  {formatted}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
