import type { Alert } from "@/types/dashboard";
import { AlertCircle, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function AlertsWatchlist({ alerts }: { alerts: Alert[] }) {
  return (
    <section className="space-y-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Requires Attention
      </h2>
      <div className="divide-y rounded-lg border">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-start gap-3 px-4 py-3"
          >
            {alert.severity === "critical" ? (
              <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-600" />
            ) : (
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-600" />
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{alert.text}</p>
              <p className="text-xs text-muted-foreground">{alert.context}</p>
            </div>
            <Badge variant="secondary" className="shrink-0">
              {alert.portfolio}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className="shrink-0"
              onClick={() => console.log(`View alert: ${alert.id}`)}
            >
              View
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
