import { useState } from "react";
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowDownWideNarrow, ArrowUpNarrowWide, ArrowDownAZ, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Program } from "@/types/dashboard";

type Sort = "benefit" | "bw" | "alpha";

const PAGE_SIZE = 10;

const sortConfig: Record<Sort, { icon: typeof ArrowDownAZ; label: string }> = {
  benefit: { icon: ArrowDownWideNarrow, label: "By benefit" },
  bw: { icon: ArrowUpNarrowWide, label: "By variance" },
  alpha: { icon: ArrowDownAZ, label: "A → Z" },
};

function dotColor(bw: number): string {
  if (bw > 0) return "bg-green-600";
  if (bw === 0) return "bg-slate-400";
  return "bg-red-500";
}

export function ProgramTable({ programs }: { programs: Program[] }) {
  const [sort, setSort] = useState<Sort>("benefit");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const filtered = search
    ? programs.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.portfolio.toLowerCase().includes(search.toLowerCase()) ||
          p.region.toLowerCase().includes(search.toLowerCase()),
      )
    : programs;

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "benefit") return b.benefit - a.benefit;
    if (sort === "bw") return a.bw - b.bw;
    return a.name.localeCompare(b.name);
  });

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const safePage = Math.min(page, Math.max(totalPages - 1, 0));
  const paged = sorted.slice(safePage * PAGE_SIZE, (safePage + 1) * PAGE_SIZE);

  const nextSort = () => {
    const order: Sort[] = ["benefit", "bw", "alpha"];
    setSort(order[(order.indexOf(sort) + 1) % order.length]);
    setPage(0);
  };

  const handleSearch = (val: string) => {
    setSearch(val);
    setPage(0);
  };

  const Icon = sortConfig[sort].icon;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          All Programs ({filtered.length})
        </h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg border px-2.5 py-1.5">
            <Search className="size-3.5 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search programs..."
              className="w-40 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <Button variant="outline" size="sm" onClick={nextSort} className="gap-1.5">
            <Icon className="size-3.5" />
            <span className="text-xs">{sortConfig[sort].label}</span>
          </Button>
        </div>
      </div>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Program</TableHead>
              <TableHead>Portfolio</TableHead>
              <TableHead>Region</TableHead>
              <TableHead className="text-right">Benefit ($M)</TableHead>
              <TableHead className="text-right">Target ($M)</TableHead>
              <TableHead className="text-right">B/(W)</TableHead>
              <TableHead className="w-8" />
              <TableHead>Priority</TableHead>
              <TableHead>Growth</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">
                  <span className="cursor-pointer hover:text-blue-600 hover:underline" onClick={() => navigate(`/programs/${p.id}`)}>
                    {p.name}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">{p.portfolio}</TableCell>
                <TableCell className="text-muted-foreground">{p.region}</TableCell>
                <TableCell className="text-right tabular-nums">${p.benefit.toFixed(1)}</TableCell>
                <TableCell className="text-right tabular-nums text-muted-foreground">${p.target.toFixed(1)}</TableCell>
                <TableCell className={`text-right tabular-nums font-medium ${p.bw >= 0 ? "text-green-700" : "text-red-600"}`}>
                  {p.bw >= 0 ? `+${p.bw.toFixed(1)}` : `(${Math.abs(p.bw).toFixed(1)})`}
                </TableCell>
                <TableCell>
                  <span className={`inline-block size-2 rounded-full ${dotColor(p.bw)}`} />
                </TableCell>
                <TableCell className="text-muted-foreground">{p.priority}</TableCell>
                <TableCell>
                  <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-medium ${
                    p.growth === "Strong" ? "bg-green-100 text-green-800" :
                    p.growth === "Moderate" ? "bg-amber-100 text-amber-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {p.growth}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-muted-foreground">
            {safePage * PAGE_SIZE + 1}–{Math.min((safePage + 1) * PAGE_SIZE, sorted.length)} of {sorted.length}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon-sm"
              disabled={safePage === 0}
              onClick={() => setPage(safePage - 1)}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <span className="px-2 text-xs tabular-nums text-muted-foreground">
              {safePage + 1} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon-sm"
              disabled={safePage >= totalPages - 1}
              onClick={() => setPage(safePage + 1)}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
