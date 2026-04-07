import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, Cell } from "recharts";
import type { Program } from "@/types/dashboard";

const quadrantColors: Record<string, string> = {
  "Tier 1": "#16a34a",
  "Tier 2": "#2563eb",
  "Tier 3": "#6b7280",
  Watch: "#dc2626",
};

interface DataPoint {
  x: number;
  y: number;
  name: string;
  priority: string;
  portfolio: string;
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: DataPoint }> }) {
  if (!active || !payload?.[0]) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-lg border bg-white px-3 py-2 text-xs shadow-md">
      <p className="font-semibold">{d.name}</p>
      <p className="text-muted-foreground">{d.portfolio}</p>
      <div className="mt-1 flex gap-3">
        <span>Benefit: ${d.x.toFixed(1)}M</span>
        <span>B/(W): {d.y >= 0 ? "+" : ""}{d.y.toFixed(1)}M</span>
      </div>
    </div>
  );
}

export function QuadrantChart({ programs }: { programs: Program[] }) {
  const data: DataPoint[] = programs.map((p) => ({
    x: p.benefit,
    y: p.bw,
    name: p.name,
    priority: p.priority,
    portfolio: p.portfolio,
  }));

  const midX = Math.max(...programs.map((p) => p.benefit)) / 2;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Program Prioritization Quadrant
        </CardTitle>
        <CardDescription>X = Benefit · Y = Variance vs Target</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 z-10 flex">
            <div className="flex flex-1 flex-col">
              <span className="p-2 text-[10px] font-semibold uppercase text-muted-foreground/50">Emerging Wins</span>
              <span className="mt-auto p-2 text-[10px] font-semibold uppercase text-muted-foreground/50">Monitor</span>
            </div>
            <div className="flex flex-1 flex-col items-end">
              <span className="p-2 text-[10px] font-semibold uppercase text-muted-foreground/50">Scale & Protect</span>
              <span className="mt-auto p-2 text-[10px] font-semibold uppercase text-red-400/60">Immediate Focus</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" dataKey="x" name="Benefit" tick={{ fontSize: 10 }} tickFormatter={(v: number) => `${v}`} />
              <YAxis type="number" dataKey="y" name="Variance" tick={{ fontSize: 10 }} tickFormatter={(v: number) => `${v > 0 ? "+" : ""}${v}`} />
              <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="4 4" />
              <ReferenceLine x={midX} stroke="#94a3b8" strokeDasharray="4 4" />
              <Tooltip content={<CustomTooltip />} />
              <Scatter data={data}>
                {data.map((entry, i) => (
                  <Cell key={i} fill={quadrantColors[entry.priority] ?? "#6b7280"} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
