import { FinancialPulse } from "@/components/dashboard/FinancialPulse";
import { KpiSummaryCards } from "@/components/dashboard/KpiSummaryCards";
import { PerformanceTable } from "@/components/dashboard/PerformanceTable";
import { PortfolioDonut } from "@/components/dashboard/PortfolioDonut";
import type { FinancialPanel, Portfolio, Program } from "@/types/dashboard";

interface OverviewTabProps {
  financialPanels: FinancialPanel[];
  portfolios: Portfolio[];
  regions: Portfolio[];
  markets: Portfolio[];
  programs: Program[];
  allPrograms: Program[];
  onRowClick?: (view: string, name: string) => void;
}

export function OverviewTab({ financialPanels, portfolios, regions, markets, programs, onRowClick }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      <FinancialPulse panels={financialPanels} />
      <KpiSummaryCards programs={programs} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", height: "480px" }}>
        <PerformanceTable portfolios={portfolios} regions={regions} markets={markets} onRowClick={onRowClick} />
        <PortfolioDonut programs={programs} onPortfolioClick={(name) => onRowClick?.("Portfolio", name)} />
      </div>
    </div>
  );
}
