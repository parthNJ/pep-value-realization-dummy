import { useState, useMemo, useCallback } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { GlobalFilters, defaultGlobalFilters } from "@/components/dashboard/GlobalFilters";
import type { GlobalFilterState } from "@/components/dashboard/GlobalFilters";
import { ProgramSummaryCards } from "@/components/programs/ProgramSummaryCards";
import { Footer } from "@/components/dashboard/Footer";
import { OverviewTab } from "@/components/tabs/OverviewTab";
import { PortfolioTab } from "@/components/tabs/PortfolioTab";
import { RegionTab } from "@/components/tabs/RegionTab";
import { MarketsTab } from "@/components/tabs/MarketsTab";
import { ProgramsTab } from "@/components/tabs/ProgramsTab";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { programs } from "@/data/programs";

const tabs = ["Overview", "Portfolio", "Region", "Markets", "Programs"] as const;
type Tab = (typeof tabs)[number];

export function Dashboard() {
  const [tab, setTab] = useState<Tab>("Overview");
  const [filters, setFilters] = useState<GlobalFilterState>(defaultGlobalFilters);
  const [cardsOpen, setCardsOpen] = useState(true);

  // Filter programs by union logic
  const filteredPrograms = useMemo(() => {
    const { portfolios: fp, regions: fr, markets: fm } = filters;
    const hasPf = fp.length > 0;
    const hasRg = fr.length > 0;
    const hasMk = fm.length > 0;
    if (!hasPf && !hasRg && !hasMk) return programs;
    const ids = new Set<string>();
    for (const p of programs) {
      if (hasPf && fp.includes(p.portfolio)) ids.add(p.id);
      if (hasRg && fr.includes(p.region)) ids.add(p.id);
      if (hasMk && fm.includes(p.market)) ids.add(p.id);
    }
    return programs.filter((p) => ids.has(p.id));
  }, [filters]);

  // Derive financial snapshot from filtered programs
  const financialData = useMemo(() => {
    const progs = filteredPrograms;
    const totalBenefit = progs.reduce((s, p) => s + p.benefit, 0);
    const totalTarget = progs.reduce((s, p) => s + p.target, 0);
    const allBenefit = programs.reduce((s, p) => s + p.benefit, 0);
    const allTarget = programs.reduce((s, p) => s + p.target, 0);

    // Scale factor: how much of the total universe is selected
    const scale = allBenefit > 0 ? totalBenefit / allBenefit : 1;
    const tScale = allTarget > 0 ? totalTarget / allTarget : 1;

    const statusFor = (actual: number, target: number) => {
      if (target === 0) return "green" as const;
      const pct = (actual / target) * 100;
      if (pct >= 100) return "green" as const;
      if (pct >= 80) return "amber" as const;
      return "red" as const;
    };

    // Base values from screenshot (all programs, both YTD and FY are same)
    const base = [
      { label: "Net Revenue ($MM)", actFcst: 347.2, target: 294.6 },
      { label: "Contribution Margin ($MM)", actFcst: 170.8, target: 139.0 },
      { label: "Productivity ($MM)", actFcst: 844.6, target: 706.2 },
      { label: "Total NOPBT Benefit ($MM)", actFcst: 1015.4, target: 845.8 },
    ];

    const makeMetrics = (periodScale: number) =>
      base.map(({ label, actFcst, target }) => {
        const a = +(actFcst * scale * periodScale).toFixed(1);
        const t = +(target * tScale * periodScale).toFixed(1);
        const bw = +(a - t).toFixed(1);
        return { label, actFcst: a, target: t, bw, status: statusFor(a, t) };
      });

    return [
      { label: "YTD", metrics: makeMetrics(1) },
      { label: "FY FCST", metrics: makeMetrics(1) },
    ];
  }, [filteredPrograms]);

  const portfolioOptions = [...new Set(programs.map((p) => p.portfolio))].sort();
  const regionOptions = [...new Set(programs.map((p) => p.region))].sort();
  const marketOptions = [...new Set(programs.map((p) => p.market))].sort();

  const filterSummary = [
    filters.portfolios.length > 0 ? `${filters.portfolios.length} portfolio${filters.portfolios.length > 1 ? "s" : ""}` : null,
    filters.regions.length > 0 ? `${filters.regions.length} region${filters.regions.length > 1 ? "s" : ""}` : null,
    filters.markets.length > 0 ? `${filters.markets.length} market${filters.markets.length > 1 ? "s" : ""}` : null,
  ].filter(Boolean);

  const subtitle = filterSummary.length > 0
    ? `${filterSummary.join(" · ")} · FY${filters.year}`
    : `All data · FY${filters.year}`;

  // Derive portfolio-level data from filtered programs
  const deriveAgg = (key: "portfolio" | "region" | "market") => {
    const map = new Map<string, { benefit: number; target: number; bw: number }>();
    for (const p of filteredPrograms) {
      const r = map.get(p[key]) ?? { benefit: 0, target: 0, bw: 0 };
      r.benefit += p.benefit;
      r.target += p.target;
      r.bw += p.bw;
      map.set(p[key], r);
    }
    const statusFor = (bw: number) => (bw >= 0 ? "green" : bw >= -5 ? "amber" : "red") as import("@/types/dashboard").Status;
    return [...map.entries()]
      .map(([name, d]) => ({
        name,
        ytd: { actFcst: +(d.benefit * 0.4).toFixed(1), target: +(d.target * 0.4).toFixed(1), bw: +(d.bw * 0.4).toFixed(1), status: statusFor(d.bw * 0.4) },
        fy: { actFcst: +d.benefit.toFixed(1), target: +d.target.toFixed(1), bw: +d.bw.toFixed(1), status: statusFor(d.bw) },
      }))
      .sort((a, b) => b.fy.actFcst - a.fy.actFcst);
  };

  const filteredPortfolios = useMemo(() => deriveAgg("portfolio"), [filteredPrograms]);
  const filteredRegions = useMemo(() => deriveAgg("region"), [filteredPrograms]);
  const filteredMarkets = useMemo(() => deriveAgg("market"), [filteredPrograms]);

  // When a row is clicked in the Performance Overview table, switch to the appropriate tab and set the filter
  const handleRowClick = useCallback((view: string, name: string) => {
    if (view === "Portfolio") {
      setFilters((f) => ({ ...f, portfolios: [name] }));
      setTab("Portfolio");
    } else if (view === "Region") {
      setFilters((f) => ({ ...f, regions: [name] }));
      setTab("Region");
    } else if (view === "Market") {
      setFilters((f) => ({ ...f, markets: [name] }));
      setTab("Markets");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const hasActiveFilters = filters.portfolios.length > 0 || filters.regions.length > 0 || filters.markets.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader title="S&T Enabled Financial Overview" subtitle={subtitle} />

      {/* Sticky filter sub-navbar */}
      <div className={cn(
        "sticky top-0 z-20 border-b transition-colors",
        hasActiveFilters ? "bg-blue-50/80 backdrop-blur-sm" : "bg-white/80 backdrop-blur-sm",
      )}>
        <div className="mx-auto max-w-7xl px-6 py-2">
          <GlobalFilters
            filters={filters}
            onChange={setFilters}
            portfolioOptions={portfolioOptions}
            regionOptions={regionOptions}
            marketOptions={marketOptions}
          />
        </div>
      </div>

      <main className="mx-auto max-w-7xl space-y-5 px-6 py-6">
        {/* Tabs */}
        <div className="border-b">
          <div className="flex gap-1">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "relative px-4 pb-2.5 pt-1 text-sm font-medium transition-colors",
                  tab === t
                    ? "text-foreground after:absolute after:inset-x-4 after:bottom-0 after:h-0.5 after:rounded-full after:bg-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Collapsible summary cards — hidden on Overview */}
        {tab !== "Overview" && (
          <div>
            <button
              onClick={() => setCardsOpen(!cardsOpen)}
              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {cardsOpen ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
              {cardsOpen ? "Hide summary" : "Show summary"}
              <span className="text-muted-foreground">· {filteredPrograms.length} programs</span>
            </button>
            {cardsOpen && (
              <div className="mt-3">
                <ProgramSummaryCards programs={filteredPrograms} />
              </div>
            )}
          </div>
        )}

        {tab === "Overview" && (
          <OverviewTab
            financialPanels={financialData}
            portfolios={filteredPortfolios}
            regions={filteredRegions}
            markets={filteredMarkets}
            programs={filteredPrograms}
            allPrograms={programs}
            onRowClick={handleRowClick}
          />
        )}
        {tab === "Portfolio" && <PortfolioTab portfolios={filteredPortfolios} programs={filteredPrograms} />}
        {tab === "Region" && <RegionTab programs={filteredPrograms} />}
        {tab === "Markets" && <MarketsTab programs={filteredPrograms} />}
        {tab === "Programs" && <ProgramsTab programs={filteredPrograms} />}
      </main>

      <Footer />
    </div>
  );
}
