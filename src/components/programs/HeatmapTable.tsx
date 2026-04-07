import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Program, GrowthRating } from "@/types/dashboard";

const growthColor: Record<GrowthRating, string> = {
  Strong: "bg-green-100 text-green-800",
  Moderate: "bg-amber-100 text-amber-800",
  Slowing: "bg-red-100 text-red-800",
};

export function HeatmapTable({ programs }: { programs: Program[] }) {
  const sorted = [...programs].sort((a, b) => b.benefit - a.benefit).slice(0, 12);
  const navigate = useNavigate();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Program Performance Heatmap
        </CardTitle>
        <CardDescription>Compact matrix — benefit, variance, growth, priority, portfolio</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-xs font-medium text-muted-foreground">
                <th className="pb-2 pr-4 text-left">Program</th>
                <th className="pb-2 px-2 text-right">Benefit</th>
                <th className="pb-2 px-2 text-right">Variance</th>
                <th className="pb-2 px-2 text-left">Priority</th>
                <th className="pb-2 px-2 text-left">Portfolio</th>
                <th className="pb-2 pl-2 text-center">Growth</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((p) => (
                <tr key={p.id} className="border-b last:border-0">
                  <td className="py-2 pr-4 font-medium">
                    <span className="cursor-pointer hover:text-blue-600 hover:underline" onClick={() => navigate(`/programs/${p.id}`)}>
                      {p.name}
                    </span>
                  </td>
                  <td className="py-2 px-2 text-right tabular-nums">
                    ${p.benefit.toFixed(1)}M
                  </td>
                  <td className={`py-2 px-2 text-right tabular-nums font-medium ${p.bw >= 0 ? "text-green-700" : "text-red-600"}`}>
                    {p.bw >= 0 ? "+" : ""}${p.bw.toFixed(0)}M
                  </td>
                  <td className="py-2 px-2 text-muted-foreground">{p.priority}</td>
                  <td className="py-2 pl-2 text-muted-foreground">{p.portfolio}</td>
                  <td className="py-2 px-2 text-center">
                    <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-medium ${growthColor[p.growth]}`}>
                      {p.growth}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
