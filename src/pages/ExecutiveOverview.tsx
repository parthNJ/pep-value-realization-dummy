import { useState, useMemo } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { FilterSheet } from "@/components/dashboard/FilterSheet";
import { FinancialSnapshot } from "@/components/dashboard/FinancialSnapshot";
import { PerformanceTable } from "@/components/dashboard/PerformanceTable";
import { Footer } from "@/components/dashboard/Footer";
import type { FilterState } from "@/types/dashboard";
import {
  defaultFilters,
  getFinancialSnapshot,
  portfolios,
  regions,
  markets,
} from "@/data/mockData";

export function ExecutiveOverview() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const financialData = useMemo(
    () => getFinancialSnapshot(filters),
    [filters],
  );

  const filterSummary = [
    filters.region !== "All" ? filters.region : "All Regions",
    filters.market !== "All" ? filters.market : "All Markets",
    `FY ${filters.year}`,
    filters.month,
  ].join(" · ");

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        title="Welcome, Parth 👋"
        subtitle="Here's your S&T financial overview for today"
      />

      <main className="mx-auto max-w-7xl space-y-8 px-6 py-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              S&T Enabled Financial Overview
            </h2>
            <p className="text-xs text-muted-foreground">
              Showing: {filterSummary}
            </p>
          </div>
          <FilterSheet filters={filters} onChange={setFilters} />
        </div>

        <FinancialSnapshot panels={financialData} />
        <PerformanceTable
          portfolios={portfolios}
          regions={regions}
          markets={markets}
        />
      </main>

      <Footer />
    </div>
  );
}
