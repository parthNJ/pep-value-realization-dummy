import { useState, useMemo } from "react";
import type { Portfolio, PortfolioPeriod } from "@/types/dashboard";
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, ArrowDownWideNarrow, ArrowUpNarrowWide, ArrowDownAZ, SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

function dotColor(bw: number): string {
  if (bw > 0) return "bg-green-600";
  if (bw === 0) return "bg-slate-400";
  return "bg-amber-500";
}

function PeriodCells({ period, borderRight }: { period: PortfolioPeriod; borderRight?: boolean }) {
  const bwFormatted = period.bw > 0 ? `${period.bw.toFixed(1)}` : period.bw < 0 ? `(${Math.abs(period.bw).toFixed(1)})` : "0.0";
  return (
    <>
      <TableCell className="text-right tabular-nums">${period.actFcst.toFixed(1)}M</TableCell>
      <TableCell className="text-right tabular-nums">{bwFormatted}</TableCell>
      <TableCell className={`w-8 text-center ${borderRight ? "border-r" : ""}`}>
        <span className={`inline-block size-2.5 rounded-full ${dotColor(period.bw)}`} />
      </TableCell>
    </>
  );
}

const views = ["Portfolio", "Region", "Market"] as const;
type View = (typeof views)[number];
type SortMode = "best" | "worst" | "alpha";

const metrics = [
  "Total NOPBT Benefit ($MM)", "Net Revenue ($MM)", "Contribution Margin ($MM)", "Productivity ($MM)",
] as const;

const sortIcons: Record<SortMode, typeof ArrowDownWideNarrow> = {
  best: ArrowDownWideNarrow, worst: ArrowUpNarrowWide, alpha: ArrowDownAZ,
};
const sortLabels: Record<SortMode, string> = {
  best: "Best to worst", worst: "Worst to best", alpha: "A → Z",
};

interface PerformanceTableProps {
  portfolios: Portfolio[];
  regions: Portfolio[];
  markets: Portfolio[];
  onRowClick?: (view: string, name: string) => void;
}

export function PerformanceTable({ portfolios, regions, markets, onRowClick }: PerformanceTableProps) {
  const [view, setView] = useState<View>("Portfolio");
  const [sort, setSort] = useState<SortMode>("alpha");
  const [metric, setMetric] = useState<string>(metrics[0]);

  const raw = view === "Portfolio" ? portfolios : view === "Region" ? regions : markets;

  const data = useMemo(() => {
    const copy = [...raw];
    if (sort === "best") return copy.sort((a, b) => b.ytd.bw - a.ytd.bw);
    if (sort === "worst") return copy.sort((a, b) => a.ytd.bw - b.ytd.bw);
    return copy.sort((a, b) => a.name.localeCompare(b.name));
  }, [raw, sort]);

  const nextSort = (): void => {
    const order: SortMode[] = ["best", "worst", "alpha"];
    setSort(order[(order.indexOf(sort) + 1) % order.length]);
  };

  const SortIcon = sortIcons[sort];

  return (
    <section className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Performance Overview</h2>
          <div className="flex rounded-lg border bg-muted p-0.5">
            {views.map((v) => (
              <button key={v} onClick={() => setView(v)}
                className={cn("rounded-md px-3 py-1 text-xs font-medium transition-colors",
                  view === v ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>
                {v}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={nextSort} className="gap-1.5">
              <SortIcon className="size-3.5" /><span className="text-xs">{sortLabels[sort]}</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger render={
                <Button variant="outline" size="sm" className="gap-1.5">
                  <SlidersHorizontal className="size-3.5" /><span className="text-xs">Metric</span>
                </Button>
              } />
              <DropdownMenuContent align="end">
                {metrics.map((m) => (
                  <DropdownMenuItem key={m} onClick={() => setMetric(m)} className={cn(metric === m && "font-medium")}>
                    {metric === m && <span className="mr-1.5 inline-block size-1.5 rounded-full bg-primary" />}{m}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <span className="text-xs text-muted-foreground">Showing: {metric}</span>
        </div>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead rowSpan={2} className="w-52 border-r align-bottom">{view}</TableHead>
              <TableHead colSpan={3} className="border-b border-r text-center">YTD</TableHead>
              <TableHead colSpan={3} className="border-b text-center">FY</TableHead>
              <TableHead rowSpan={2} className="w-8 align-bottom" />
            </TableRow>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-xs text-right">Act + Fcst</TableHead>
              <TableHead className="text-xs text-right">B/(W) vs Target</TableHead>
              <TableHead className="w-8 border-r" />
              <TableHead className="text-xs text-right">Act + Fcst</TableHead>
              <TableHead className="text-xs text-right">B/(W) vs Target</TableHead>
              <TableHead className="w-8" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((p) => (
              <TableRow key={p.name} className="cursor-pointer"
                onClick={() => onRowClick?.(view, p.name)}>
                <TableCell className="w-52 border-r font-medium">{p.name}</TableCell>
                <PeriodCells period={p.ytd} borderRight />
                <PeriodCells period={p.fy} />
                <TableCell><ArrowRight className="size-4 text-muted-foreground" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
