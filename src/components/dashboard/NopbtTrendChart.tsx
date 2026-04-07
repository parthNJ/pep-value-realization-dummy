import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
} from "recharts";
import { nopbtTrend } from "@/data/trends";
import type { Program } from "@/types/dashboard";

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string }>; label?: string }) {
  if (!active || !payload) return null;
  return (
    <div className="rounded-lg border bg-white px-3 py-2 text-xs shadow-md">
      <p className="font-medium">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-muted-foreground">
          {p.dataKey === "actual" ? "Act+Fcst" : "Target"}: ${p.value.toFixed(1)}M
        </p>
      ))}
    </div>
  );
}

interface NopbtTrendChartProps {
  programs: Program[];
  allPrograms: Program[];
}

export function NopbtTrendChart({ programs, allPrograms }: NopbtTrendChartProps) {
  const data = useMemo(() => {
    const allBenefit = allPrograms.reduce((s, p) => s + p.benefit, 0);
    const filteredBenefit = programs.reduce((s, p) => s + p.benefit, 0);
    const scale = allBenefit > 0 ? filteredBenefit / allBenefit : 1;

    const allTarget = allPrograms.reduce((s, p) => s + p.target, 0);
    const filteredTarget = programs.reduce((s, p) => s + p.target, 0);
    const tScale = allTarget > 0 ? filteredTarget / allTarget : 1;

    return nopbtTrend.map((pt) => ({
      month: pt.month,
      actual: +(pt.actual * scale).toFixed(1),
      target: +(pt.target * tScale).toFixed(1),
    }));
  }, [programs, allPrograms]);

  const latest = data[data.length - 1];
  const prev = data[data.length - 2];
  const momChange = latest.actual - prev.actual;
  const momPct = prev.actual > 0 ? ((momChange / prev.actual) * 100).toFixed(1) : "0";
  const fyTarget = latest.target;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          NOPBT Benefit Trajectory
        </CardTitle>
        <CardDescription>
          Monthly cumulative — Act+Fcst vs Target ($MM) · MoM: +${momChange.toFixed(1)}M ({momPct}%)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={data} margin={{ top: 5, right: 10, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16a34a" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} tickFormatter={(v: number) => `$${v}`} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={fyTarget} stroke="#94a3b8" strokeDasharray="4 4" label={{ value: "FY Target", position: "right", fontSize: 10, fill: "#94a3b8" }} />
            <Area type="monotone" dataKey="target" stroke="#64748b" strokeWidth={2} strokeDasharray="6 4" fill="none" name="Target" />
            <Area type="monotone" dataKey="actual" stroke="#16a34a" strokeWidth={2.5} fill="url(#actualGrad)" name="Act+Fcst" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
