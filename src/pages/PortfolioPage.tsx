import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Footer } from "@/components/dashboard/Footer";
import { SummaryCards } from "@/components/portfolio/SummaryCards";
import { InsightsBar } from "@/components/portfolio/InsightsBar";
import { ContributionChart } from "@/components/portfolio/ContributionChart";
import { PerformanceChart } from "@/components/portfolio/PerformanceChart";
import { portfolios } from "@/data/mockData";

export function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        title="Portfolio Performance Dashboard"
        subtitle="Executive Review · FY2024 · Total NOPBT Benefit KPI"
        activeTab="Portfolio"
      />

      <main className="mx-auto max-w-7xl space-y-6 px-6 py-6">
        <SummaryCards portfolios={portfolios} />
        <InsightsBar portfolios={portfolios} />

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ContributionChart portfolios={portfolios} />
          </div>
          <div className="lg:col-span-7">
            <PerformanceChart portfolios={portfolios} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
