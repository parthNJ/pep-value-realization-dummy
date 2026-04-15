import { useParams, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Footer } from "@/components/dashboard/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { ArrowLeft } from "lucide-react";
import { programs } from "@/data/programs";
import { generateDetail } from "@/data/programDetails";

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string }>; label?: string }) {
  if (!active || !payload) return null;
  return (
    <div className="rounded-lg border bg-white px-3 py-2 text-xs shadow-md">
      <p className="font-medium">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-muted-foreground">
          {p.dataKey === "actual" ? "Actual" : "Target"}: ${p.value.toFixed(1)}M
        </p>
      ))}
    </div>
  );
}

export function ProgramDetailPage() {
  const { programId } = useParams<{ programId: string }>();
  const navigate = useNavigate();

  const program = programs.find((p) => p.id === programId);

  const detail = useMemo(() => {
    if (!program) return null;
    return generateDetail(program.id, program.benefit, program.target, program.bw);
  }, [program]);

  const relatedPrograms = programs.filter(
    (p) => p.portfolio === program?.portfolio && p.id !== program?.id,
  );

  if (!program || !detail) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium">Program not found</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate("/")}>
            Back to dashboard
          </Button>
        </div>
      </div>
    );
  }

  const isAtRisk = program.bw < 0;

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-4 sm:px-6 sm:py-6">
        <div>
          <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-1.5 -ml-2 mb-2">
            <ArrowLeft className="size-4" />
            Back to dashboard
          </Button>
          <h1 className="text-lg font-semibold">Program — {program.name}</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">{program.portfolio} · {program.region} · {program.market}</p>
        </div>

        {/* Key metrics */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {[
            { label: "Benefit", value: `$${program.benefit.toFixed(1)}M`, sub: "Act + Fcst" },
            { label: "Target", value: `$${program.target.toFixed(1)}M`, sub: "Plan", color: "text-muted-foreground" },
            { label: "B/(W) vs Target", value: `${program.bw >= 0 ? "+" : ""}$${program.bw.toFixed(1)}M`, sub: isAtRisk ? "Below plan" : "Above plan", color: isAtRisk ? "text-red-600" : "text-green-700" },
            { label: "Priority", value: program.priority, sub: `${program.benefitTier} benefit` },
            { label: "Growth", value: program.growth, sub: "Trajectory" },
            { label: "Completion", value: `${detail.completionPct}%`, sub: detail.currentPhase },
          ].map((c) => (
            <div key={c.label} className="rounded-lg border bg-white px-4 py-3">
              <p className="text-xs font-medium text-muted-foreground">{c.label}</p>
              <p className={`mt-0.5 text-lg font-semibold leading-tight ${c.color ?? ""}`}>{c.value}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{c.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Program Info */}
          <div className="lg:col-span-4">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Program Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed text-foreground/80">{detail.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Owner</span>
                    <span className="font-medium">{detail.owner}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sponsor</span>
                    <span className="font-medium">{detail.sponsor}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Timeline</span>
                    <span className="font-medium">{detail.startDate} → {detail.expectedEnd}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Phase</span>
                    <span className="font-medium">{detail.currentPhase}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <Badge variant="secondary">{program.portfolio}</Badge>
                  <Badge variant="secondary">{program.region}</Badge>
                  <Badge variant="secondary">{program.market}</Badge>
                </div>
                {detail.risks.length > 0 && (
                  <div className="border-t pt-3">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-600">Risk Flags</p>
                    <ul className="space-y-1.5">
                      {detail.risks.map((r, i) => (
                        <li key={i} className="flex gap-2 text-sm text-foreground/80">
                          <span className="mt-1.5 inline-block size-1 shrink-0 rounded-full bg-red-500" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Benefit Trend */}
          <div className="lg:col-span-8">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Monthly Benefit Trajectory
                </CardTitle>
                <CardDescription>Actual vs Target ($MM) — cumulative</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={detail.monthlyTrend} margin={{ top: 5, right: 10, bottom: 0, left: 0 }}>
                    <defs>
                      <linearGradient id="pgmGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={isAtRisk ? "#dc2626" : "#16a34a"} stopOpacity={0.15} />
                        <stop offset="95%" stopColor={isAtRisk ? "#dc2626" : "#16a34a"} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} tickFormatter={(v: number) => `$${v}`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="target" stroke="#64748b" strokeWidth={2} strokeDasharray="6 4" fill="none" />
                    <Area type="monotone" dataKey="actual" stroke={isAtRisk ? "#dc2626" : "#16a34a"} strokeWidth={2.5} fill="url(#pgmGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Programs — full width */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Related Programs in {program.portfolio}
            </CardTitle>
            <CardDescription>{relatedPrograms.length} other programs in this portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            {relatedPrograms.length === 0 ? (
              <p className="text-sm text-muted-foreground">No other programs in this portfolio.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-xs font-medium text-muted-foreground">
                    <th className="pb-2 text-left">Program</th>
                    <th className="pb-2 text-left">Region</th>
                    <th className="pb-2 text-left">Market</th>
                    <th className="pb-2 text-right">Benefit</th>
                    <th className="pb-2 text-right">Target</th>
                    <th className="pb-2 text-right">B/(W)</th>
                    <th className="pb-2 text-left">Priority</th>
                    <th className="pb-2 text-left">Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {relatedPrograms.map((p) => (
                    <tr
                      key={p.id}
                      className="border-b last:border-0 cursor-pointer hover:bg-muted/50"
                      onClick={() => navigate(`/programs/${p.id}`)}
                    >
                      <td className="py-2 font-medium">{p.name}</td>
                      <td className="py-2 text-muted-foreground">{p.region}</td>
                      <td className="py-2 text-muted-foreground">{p.market}</td>
                      <td className="py-2 text-right tabular-nums">${p.benefit.toFixed(1)}M</td>
                      <td className="py-2 text-right tabular-nums text-muted-foreground">${p.target.toFixed(1)}M</td>
                      <td className={`py-2 text-right tabular-nums font-medium ${p.bw >= 0 ? "text-green-700" : "text-red-600"}`}>
                        {p.bw >= 0 ? "+" : ""}{p.bw.toFixed(1)}
                      </td>
                      <td className="py-2 text-muted-foreground">{p.priority}</td>
                      <td className="py-2">
                        <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-medium ${
                          p.growth === "Strong" ? "bg-green-100 text-green-800" :
                          p.growth === "Moderate" ? "bg-amber-100 text-amber-800" :
                          "bg-red-100 text-red-800"
                        }`}>{p.growth}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
