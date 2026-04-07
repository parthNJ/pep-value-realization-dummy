import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Footer } from "@/components/dashboard/Footer";
import { ProgramSummaryCards } from "@/components/programs/ProgramSummaryCards";
import { ProgramFilters, defaultProgramFilters } from "@/components/programs/ProgramFilters";
import type { ProgramFilterState } from "@/components/programs/ProgramFilters";
import { ProgramInsights } from "@/components/programs/ProgramInsights";
import { TopProgramsChart } from "@/components/programs/TopProgramsChart";
import { AttentionChart } from "@/components/programs/AttentionChart";
import { QuadrantChart } from "@/components/programs/QuadrantChart";
import { HeatmapTable } from "@/components/programs/HeatmapTable";
import { ProgramTable } from "@/components/programs/ProgramTable";
import { RegionBreakdown } from "@/components/programs/RegionBreakdown";
import { PortfolioBreakdown } from "@/components/programs/PortfolioBreakdown";
import { MarketBreakdown } from "@/components/programs/MarketBreakdown";
import { cn } from "@/lib/utils";
import { programs } from "@/data/programs";

const contentTabs = ["Overview", "Breakdown", "All Programs"] as const;
type ContentTab = (typeof contentTabs)[number];

function buildHeaderTitle(filters: ProgramFilterState): string {
  const parts = [
    ...filters.portfolios,
    ...filters.regions,
    ...filters.markets,
  ];
  if (parts.length === 0) return "Programs Overview";
  if (parts.length <= 2) return `${parts.join(" · ")} — Programs`;
  return `${parts.length} Filters Active — Programs`;
}

function initFiltersFromParams(params: URLSearchParams): ProgramFilterState {
  const portfolio = params.get("portfolio");
  const region = params.get("region");
  const market = params.get("market");
  return {
    portfolios: portfolio ? [portfolio] : [],
    regions: region ? [region] : [],
    markets: market ? [market] : [],
  };
}

export function ProgramsPage() {
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState<ContentTab>("Overview");

  const [filters, setFilters] = useState<ProgramFilterState>(() => {
    const fromParams = initFiltersFromParams(searchParams);
    const hasParams =
      fromParams.portfolios.length > 0 ||
      fromParams.regions.length > 0 ||
      fromParams.markets.length > 0;
    return hasParams ? fromParams : defaultProgramFilters;
  });

  const filtered = useMemo(() => {
    const { portfolios, regions, markets } = filters;
    const hasPortfolio = portfolios.length > 0;
    const hasRegion = regions.length > 0;
    const hasMarket = markets.length > 0;

    if (!hasPortfolio && !hasRegion && !hasMarket) return programs;

    const matchIds = new Set<string>();
    for (const p of programs) {
      if (hasPortfolio && portfolios.includes(p.portfolio)) matchIds.add(p.id);
      if (hasRegion && regions.includes(p.region)) matchIds.add(p.id);
      if (hasMarket && markets.includes(p.market)) matchIds.add(p.id);
    }
    return programs.filter((p) => matchIds.has(p.id));
  }, [filters]);

  const portfolioOptions = [...new Set(programs.map((p) => p.portfolio))].sort();
  const regionOptions = [...new Set(programs.map((p) => p.region))].sort();
  const marketOptions = [...new Set(programs.map((p) => p.market))].sort();

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        title={buildHeaderTitle(filters)}
        subtitle={`${filtered.length} programs · FY2024 · Total NOPBT Benefit KPI`}
      />

      <main className="mx-auto max-w-7xl space-y-6 px-6 py-6">
        <ProgramFilters
          filters={filters}
          onChange={setFilters}
          portfolioOptions={portfolioOptions}
          regionOptions={regionOptions}
          marketOptions={marketOptions}
        />

        <ProgramSummaryCards programs={filtered} />

        {/* Content tabs — underline style, visually distinct from header nav */}
        <div className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {contentTabs.map((t) => (
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
            <span className="pb-2 text-xs text-muted-foreground">
              {filtered.length} program{filtered.length !== 1 ? "s" : ""} in view
            </span>
          </div>
        </div>

        {/* Tab content */}
        {tab === "Overview" && (
          <div className="space-y-6">
            <ProgramInsights programs={filtered} />
            <div className="grid gap-6 lg:grid-cols-2">
              <TopProgramsChart programs={filtered} />
              <AttentionChart programs={filtered} />
            </div>
          </div>
        )}

        {tab === "Breakdown" && (
          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <RegionBreakdown programs={filtered} />
              <PortfolioBreakdown programs={filtered} />
            </div>
            <MarketBreakdown programs={filtered} />
            <div className="grid gap-6 lg:grid-cols-2">
              <QuadrantChart programs={filtered} />
              <HeatmapTable programs={filtered} />
            </div>
          </div>
        )}

        {tab === "All Programs" && (
          <ProgramTable programs={filtered} />
        )}
      </main>

      <Footer />
    </div>
  );
}
