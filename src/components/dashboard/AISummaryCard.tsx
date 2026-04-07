import type { AISummaryData } from "@/types/dashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function AISummaryCard({ data }: { data: AISummaryData }) {
  return (
    <section className="space-y-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        AI Summary
      </h2>
      <div className="rounded-lg border border-l-4 border-l-teal-500 p-5">
        <div className="space-y-3">
          <Badge className="bg-teal-600 text-white hover:bg-teal-600">AI</Badge>
          <p className="text-sm leading-relaxed">{data.narrative}</p>
          <div className="flex flex-wrap gap-2 pt-1">
            {data.actions.map((a) => (
              <Button
                key={a.action}
                variant="outline"
                size="sm"
                onClick={() => console.log(`Action: ${a.action}`)}
              >
                {a.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
