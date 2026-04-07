import type { MetricData } from "@/types/dashboard";
import { Card, CardContent } from "@/components/ui/card";

const statusColors = {
  green: "#16a34a",
  amber: "#d97706",
  red: "#dc2626",
} as const;

export function MetricCard({ metric }: { metric: MetricData }) {
  const color = statusColors[metric.status];
  const sign = metric.bw >= 0 ? "+" : "–";
  const absVal = Math.abs(metric.bw);

  return (
    <Card size="sm">
      <CardContent className="space-y-2">
        <p className="text-xs text-muted-foreground">{metric.label}</p>
        <div className="flex items-baseline gap-4">
          <div>
            <span className="text-xs text-muted-foreground">Act+Fcst</span>
            <p className="text-lg font-medium">${metric.actFcst}M</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Target</span>
            <p className="text-lg font-medium text-muted-foreground">
              ${metric.target}M
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium text-white"
            style={{ backgroundColor: color }}
          >
            {sign} ${absVal}M
          </span>
          <span className="text-xs text-muted-foreground">B/(W) vs Target</span>
        </div>
      </CardContent>
    </Card>
  );
}
