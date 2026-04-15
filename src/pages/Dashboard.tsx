import { useState, useMemo, useCallback } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ContentTabs } from "@/components/dashboard/ContentTabs";
import type { ContentTab } from "@/components/dashboard/ContentTabs";
import { PageTitle } from "@/components/dashboard/PageTitle";
import { GlobalFilters, defaultGlobalFilters } from "@/components/dashboard/GlobalFilters";
import type { GlobalFilterState } from "@/components/dashboard/GlobalFilters";
import { ProgramSummaryCards } from "@/components/programs/ProgramSummaryCards";
import { Footer } from "@/components/dashboard/Footer";
import { OverviewTab } from "@/components/tabs/OverviewTab";
import { PortfolioTab } from "@/components/tabs/PortfolioTab";
import { RegionTab } from "@/components/tabs/RegionTab";
import { MarketsTab } from "@/components/tabs/MarketsTab";
import { ProgramsTab } from "@/components/tabs/ProgramsTab";
import { programs } from "@/data/programs";
import { Button } from "@pepsico-ds/ui";


export function Dashboard() {
  const [tab, setTab] = useState<ContentTab>("Overview");
  const [filters, setFilters] = useState<GlobalFilterState>(defaultGlobalFilters);
  const [cardsOpen, setCardsOpen] = useState(true);

  const filteredPrograms = useMemo(() => {
    const { regions: fr, markets: fm, portfolios: fp } = filters;
    const hasRg = fr.length > 0;
    const hasMk = fm.length > 0;
    const hasPf = fp.length > 0;
    if (!hasRg && !hasMk && !hasPf) return programs;
    const ids = new Set<string>();
    for (const p of programs) {
      if (hasRg && fr.includes(p.region)) ids.add(p.id);
      if (hasMk && fm.includes(p.market)) ids.add(p.id);
      if (hasPf && fp.includes(p.portfolio)) ids.add(p.id);
    }
    return programs.filter((p) => ids.has(p.id));
  }, [filters]);

  const financialData = useMemo(() => {
    const totalBenefit = filteredPrograms.reduce((s, p) => s + p.benefit, 0);
    const totalTarget = filteredPrograms.reduce((s, p) => s + p.target, 0);
    const allBenefit = programs.reduce((s, p) => s + p.benefit, 0);
    const allTarget = programs.reduce((s, p) => s + p.target, 0);
    const scale = allBenefit > 0 ? totalBenefit / allBenefit : 1;
    const tScale = allTarget > 0 ? totalTarget / allTarget : 1;

    const statusFor = (actual: number, target: number) => {
      if (target === 0) return "green" as const;
      const pct = (actual / target) * 100;
      if (pct >= 100) return "green" as const;
      if (pct >= 80) return "amber" as const;
      return "red" as const;
    };

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
      { label: "YTD", metrics: makeMetrics(0.45) },
      { label: "FY FCST", metrics: makeMetrics(1.0) },
    ];
  }, [filteredPrograms]);

  const regionOptions = [...new Set(programs.map((p) => p.region))].sort();
  const marketOptions = [...new Set(programs.map((p) => p.market))].sort();
  const portfolioOptions = [...new Set(programs.map((p) => p.portfolio))].sort();

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

  const handleRowClick = useCallback((view: string, name: string) => {
    if (view === "Portfolio") {
      setFilters((f) => ({ ...f, portfolios: [name] }));
      setTab("Portfolio");
    } else if (view === "Region") {
      setFilters((f) => ({ ...f, regions: [name] }));
      setTab("Regions");
    } else if (view === "Market") {
      setFilters((f) => ({ ...f, markets: [name] }));
      setTab("Markets");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <ContentTabs active={tab} onChange={setTab} />

      {/* Page title + filters */}
      <div style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        borderBottom: "1px solid #e0e0e0",
        background: "#fff",
        overflow: "visible",
      }}>
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <PageTitle title="S&T Enabled Financial Overview" lastUpdated="12:05am 11/10/25" />
          <GlobalFilters
            filters={filters}
            onChange={setFilters}
            regionOptions={regionOptions}
            marketOptions={marketOptions}
            portfolioOptions={portfolioOptions}
          />
        </div>
      </div>

      <main className="mx-auto max-w-7xl space-y-5 px-4 py-4 sm:px-6 sm:py-6">
        {/* Collapsible summary cards — hidden on Overview */}
        {tab !== "Overview" && (
          <div>
            <Button
              text={`${cardsOpen ? "Hide summary" : "Show summary"} · ${filteredPrograms.length} programs`}
              variant="tertiary"
              size="small"
              iconLeading={cardsOpen ? "expand_less" : "expand_more"}
              onClick={() => setCardsOpen(!cardsOpen)}
            />
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
        {tab === "Portfolio" && <PortfolioTab portfolios={filteredPortfolios} programs={filteredPrograms} allPrograms={programs} />}
        {tab === "Regions" && <RegionTab programs={filteredPrograms} />}
        {tab === "Markets" && <MarketsTab programs={filteredPrograms} />}
        {tab === "Programs" && <ProgramsTab programs={filteredPrograms} />}
      </main>

      <Footer />
    </div>
  );
}
