import { InsightsBar } from "@/components/portfolio/InsightsBar";
import { ContributionChart } from "@/components/portfolio/ContributionChart";
import { PerformanceChart } from "@/components/portfolio/PerformanceChart";
import { RiskAccordionTable } from "@/components/shared/RiskAccordionTable";
import { AIInsights, portfolioInsights } from "@/components/shared/AIInsights";
import type { Portfolio, Program } from "@/types/dashboard";

interface PortfolioTabProps {
  portfolios: Portfolio[];
  programs: Program[];
}

export function PortfolioTab({ portfolios, programs }: PortfolioTabProps) {
  return (
    <div className="space-y-6">
      <InsightsBar portfolios={portfolios} />
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <ContributionChart portfolios={portfolios} />
        </div>
        <div className="lg:col-span-7">
          <PerformanceChart portfolios={portfolios} />
        </div>
      </div>
      <RiskAccordionTable
        programs={programs}
        groupBy="portfolio"
        title="Portfolio Risk Summary"
        description="Click a portfolio to see program details"
      />
      <AIInsights insights={portfolioInsights} />
    </div>
  );
}
