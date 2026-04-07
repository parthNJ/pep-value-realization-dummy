import type { TopMoversData } from "@/types/dashboard";
import { ArrowUp, ArrowDown } from "lucide-react";
import { SparklineChart } from "./SparklineChart";

export function TopMovers({ data }: { data: TopMoversData }) {
  return (
    <section className="space-y-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Top Movers — Week over Week
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-green-700">Biggest Gains</h3>
          <div className="divide-y rounded-lg border">
            {data.gainers.map((m) => (
              <div key={m.name} className="flex items-center gap-3 px-4 py-2.5">
                <ArrowUp className="size-4 text-green-600" />
                <span className="flex-1 text-sm font-medium">{m.name}</span>
                <SparklineChart data={m.sparkline} color="#16a34a" />
                <span className="text-sm font-medium text-green-600">
                  +${m.change.toFixed(1)}M
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-red-700">Biggest Declines</h3>
          <div className="divide-y rounded-lg border">
            {data.decliners.map((m) => (
              <div key={m.name} className="flex items-center gap-3 px-4 py-2.5">
                <ArrowDown className="size-4 text-red-600" />
                <span className="flex-1 text-sm font-medium">{m.name}</span>
                <SparklineChart data={m.sparkline} color="#dc2626" />
                <span className="text-sm font-medium text-red-600">
                  –${Math.abs(m.change).toFixed(1)}M
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
