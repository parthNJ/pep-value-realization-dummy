import type {
  FinancialPanel,
  Portfolio,
  Alert,
  TopMoversData,
  AISummaryData,
  FilterState,
} from "@/types/dashboard";

export const defaultFilters: FilterState = {
  region: "All",
  market: "All",
  portfolio: "All",
  program: "All",
  year: "2025",
  month: "Jan",
  timeframe: "All",
  ownership: "All",
};

export const filterConfigs: {
  key: keyof FilterState;
  label: string;
  options: string[];
}[] = [
  { key: "region", label: "Regions", options: ["All", "NAM", "EMEA", "APAC", "LATAM"] },
  { key: "market", label: "Markets", options: ["All", "US", "UK", "Germany", "Japan", "Brazil"] },
  { key: "portfolio", label: "Portfolios", options: ["All", "Supply Chain", "Commercial", "Consumer", "Controls", "Finance", "IBP", "Global Functions", "Tech Foundations", "Digital & Data"] },
  { key: "program", label: "Programs", options: ["All"] },
  { key: "year", label: "Reporting Year", options: ["2024", "2025", "2026"] },
  { key: "month", label: "Reporting Month", options: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] },
  { key: "timeframe", label: "Timeframe", options: ["All", "Q1", "Q2", "Q3", "Q4"] },
  { key: "ownership", label: "Ownership", options: ["All", "Owned", "Shared"] },
];

// Base financial snapshot (All filters)
const baseSnapshot: FinancialPanel[] = [
  {
    label: "YTD",
    metrics: [
      { label: "Net Revenue ($MM)", actFcst: 142, target: 158, bw: -16, status: "red" },
      { label: "Contribution Margin ($MM)", actFcst: 87, target: 82, bw: 5, status: "green" },
      { label: "Productivity ($MM)", actFcst: 34, target: 36, bw: -2, status: "amber" },
      { label: "Total NOPBT Benefit ($MM)", actFcst: 263, target: 276, bw: -13, status: "red" },
    ],
  },
  {
    label: "FY FCST",
    metrics: [
      { label: "Net Revenue ($MM)", actFcst: 612, target: 640, bw: -28, status: "amber" },
      { label: "Contribution Margin ($MM)", actFcst: 358, target: 340, bw: 18, status: "green" },
      { label: "Productivity ($MM)", actFcst: 148, target: 145, bw: 3, status: "green" },
      { label: "Total NOPBT Benefit ($MM)", actFcst: 1118, target: 1125, bw: -7, status: "amber" },
    ],
  },
];

// Region-specific overrides
const regionSnapshots: Record<string, FinancialPanel[]> = {
  NAM: [
    {
      label: "YTD",
      metrics: [
        { label: "Net Revenue ($MM)", actFcst: 68, target: 62, bw: 6, status: "green" },
        { label: "Contribution Margin ($MM)", actFcst: 42, target: 40, bw: 2, status: "green" },
        { label: "Productivity ($MM)", actFcst: 16, target: 15, bw: 1, status: "green" },
        { label: "Total NOPBT Benefit ($MM)", actFcst: 126, target: 117, bw: 9, status: "green" },
      ],
    },
    {
      label: "FY FCST",
      metrics: [
        { label: "Net Revenue ($MM)", actFcst: 290, target: 275, bw: 15, status: "green" },
        { label: "Contribution Margin ($MM)", actFcst: 172, target: 165, bw: 7, status: "green" },
        { label: "Productivity ($MM)", actFcst: 70, target: 68, bw: 2, status: "green" },
        { label: "Total NOPBT Benefit ($MM)", actFcst: 532, target: 508, bw: 24, status: "green" },
      ],
    },
  ],
  EMEA: [
    {
      label: "YTD",
      metrics: [
        { label: "Net Revenue ($MM)", actFcst: 38, target: 52, bw: -14, status: "red" },
        { label: "Contribution Margin ($MM)", actFcst: 22, target: 24, bw: -2, status: "amber" },
        { label: "Productivity ($MM)", actFcst: 9, target: 12, bw: -3, status: "red" },
        { label: "Total NOPBT Benefit ($MM)", actFcst: 69, target: 88, bw: -19, status: "red" },
      ],
    },
    {
      label: "FY FCST",
      metrics: [
        { label: "Net Revenue ($MM)", actFcst: 162, target: 198, bw: -36, status: "red" },
        { label: "Contribution Margin ($MM)", actFcst: 94, target: 100, bw: -6, status: "amber" },
        { label: "Productivity ($MM)", actFcst: 38, target: 42, bw: -4, status: "amber" },
        { label: "Total NOPBT Benefit ($MM)", actFcst: 294, target: 340, bw: -46, status: "red" },
      ],
    },
  ],
  APAC: [
    {
      label: "YTD",
      metrics: [
        { label: "Net Revenue ($MM)", actFcst: 24, target: 28, bw: -4, status: "amber" },
        { label: "Contribution Margin ($MM)", actFcst: 15, target: 12, bw: 3, status: "green" },
        { label: "Productivity ($MM)", actFcst: 6, target: 6, bw: 0, status: "green" },
        { label: "Total NOPBT Benefit ($MM)", actFcst: 45, target: 46, bw: -1, status: "amber" },
      ],
    },
    {
      label: "FY FCST",
      metrics: [
        { label: "Net Revenue ($MM)", actFcst: 104, target: 112, bw: -8, status: "amber" },
        { label: "Contribution Margin ($MM)", actFcst: 60, target: 52, bw: 8, status: "green" },
        { label: "Productivity ($MM)", actFcst: 26, target: 24, bw: 2, status: "green" },
        { label: "Total NOPBT Benefit ($MM)", actFcst: 190, target: 188, bw: 2, status: "green" },
      ],
    },
  ],
  LATAM: [
    {
      label: "YTD",
      metrics: [
        { label: "Net Revenue ($MM)", actFcst: 12, target: 16, bw: -4, status: "red" },
        { label: "Contribution Margin ($MM)", actFcst: 8, target: 6, bw: 2, status: "green" },
        { label: "Productivity ($MM)", actFcst: 3, target: 3, bw: 0, status: "green" },
        { label: "Total NOPBT Benefit ($MM)", actFcst: 23, target: 25, bw: -2, status: "amber" },
      ],
    },
    {
      label: "FY FCST",
      metrics: [
        { label: "Net Revenue ($MM)", actFcst: 56, target: 55, bw: 1, status: "green" },
        { label: "Contribution Margin ($MM)", actFcst: 32, target: 23, bw: 9, status: "green" },
        { label: "Productivity ($MM)", actFcst: 14, target: 11, bw: 3, status: "green" },
        { label: "Total NOPBT Benefit ($MM)", actFcst: 102, target: 89, bw: 13, status: "green" },
      ],
    },
  ],
};

export function getFinancialSnapshot(filters: FilterState): FinancialPanel[] {
  if (filters.region !== "All" && regionSnapshots[filters.region]) {
    return regionSnapshots[filters.region];
  }
  return baseSnapshot;
}

export const portfolios: Portfolio[] = [
  { name: "Capabilities", ytd: { actFcst: 18.4, target: 12.2, bw: 6.2, status: "green" }, fy: { actFcst: 38.8, target: 31.2, bw: 7.6, status: "green" } },
  { name: "Commercial", ytd: { actFcst: 169.8, target: 103.0, bw: 66.8, status: "green" }, fy: { actFcst: 169.8, target: 103.0, bw: 66.8, status: "green" } },
  { name: "Consumer", ytd: { actFcst: 31.6, target: 33.8, bw: -2.2, status: "amber" }, fy: { actFcst: 31.6, target: 33.8, bw: -2.2, status: "amber" } },
  { name: "Control", ytd: { actFcst: 26.2, target: 23.4, bw: 2.8, status: "green" }, fy: { actFcst: 54.2, target: 49.4, bw: 4.8, status: "green" } },
  { name: "Finance", ytd: { actFcst: 47.4, target: 43.2, bw: 4.2, status: "green" }, fy: { actFcst: 100.6, target: 94.0, bw: 6.6, status: "green" } },
  { name: "Global Functions", ytd: { actFcst: 39.8, target: 38.8, bw: 1.0, status: "green" }, fy: { actFcst: 39.8, target: 38.8, bw: 1.0, status: "green" } },
  { name: "IBP", ytd: { actFcst: 64.0, target: 55.8, bw: 8.2, status: "green" }, fy: { actFcst: 64.0, target: 55.8, bw: 8.2, status: "green" } },
  { name: "Others", ytd: { actFcst: 13.6, target: 14.4, bw: -0.8, status: "amber" }, fy: { actFcst: 28.8, target: 30.2, bw: -1.4, status: "amber" } },
  { name: "People Experience & Ops", ytd: { actFcst: 21.0, target: 19.2, bw: 1.8, status: "green" }, fy: { actFcst: 44.0, target: 40.4, bw: 3.6, status: "green" } },
  { name: "Supply Chain", ytd: { actFcst: 679.4, target: 590.4, bw: 89.0, status: "green" }, fy: { actFcst: 679.4, target: 590.4, bw: 89.0, status: "green" } },
  { name: "Tech Foundation", ytd: { actFcst: 35.6, target: 32.4, bw: 3.2, status: "green" }, fy: { actFcst: 75.8, target: 70.2, bw: 5.6, status: "green" } },
  { name: "VR Whitespace", ytd: { actFcst: 11.6, target: 12.8, bw: -1.2, status: "amber" }, fy: { actFcst: 24.4, target: 27.0, bw: -2.6, status: "amber" } },
];

export const regions: Portfolio[] = [
  { name: "APAC", ytd: { actFcst: 175.0, target: 164.8, bw: 10.2, status: "green" }, fy: { actFcst: 372.4, target: 356.2, bw: 16.2, status: "green" } },
  { name: "Corporate", ytd: { actFcst: 63.2, target: 57.4, bw: 5.8, status: "green" }, fy: { actFcst: 134.6, target: 122.4, bw: 12.2, status: "green" } },
  { name: "EMEA", ytd: { actFcst: 198.4, target: 215.0, bw: -16.6, status: "red" }, fy: { actFcst: 422.6, target: 453.2, bw: -30.6, status: "red" } },
  { name: "International Beverages", ytd: { actFcst: 10.4, target: 11.6, bw: -1.2, status: "amber" }, fy: { actFcst: 22.2, target: 24.6, bw: -2.4, status: "amber" } },
  { name: "LAFN", ytd: { actFcst: 48.2, target: 46.0, bw: 2.2, status: "green" }, fy: { actFcst: 102.4, target: 98.0, bw: 4.4, status: "green" } },
  { name: "North America", ytd: { actFcst: 520.2, target: 479.6, bw: 40.6, status: "green" }, fy: { actFcst: 1107.2, target: 1020.8, bw: 86.4, status: "green" } },
];

export const markets: Portfolio[] = [
  { name: "Australia & New Zealand", ytd: { actFcst: 42.1, target: 39.8, bw: 2.3, status: "green" }, fy: { actFcst: 89.6, target: 84.2, bw: 5.4, status: "green" } },
  { name: "Australia & NZ FOBO", ytd: { actFcst: 18.3, target: 17.1, bw: 1.2, status: "green" }, fy: { actFcst: 38.9, target: 36.4, bw: 2.5, status: "green" } },
  { name: "Brazil", ytd: { actFcst: 78.4, target: 74.2, bw: 4.2, status: "green" }, fy: { actFcst: 166.8, target: 158.1, bw: 8.7, status: "green" } },
  { name: "Canada", ytd: { actFcst: 54.6, target: 52.1, bw: 2.5, status: "green" }, fy: { actFcst: 116.2, target: 110.8, bw: 5.4, status: "green" } },
  { name: "Egypt", ytd: { actFcst: 22.8, target: 25.4, bw: -2.6, status: "amber" }, fy: { actFcst: 48.5, target: 53.9, bw: -5.4, status: "red" } },
  { name: "France", ytd: { actFcst: 31.2, target: 33.8, bw: -2.6, status: "amber" }, fy: { actFcst: 66.4, target: 71.8, bw: -5.4, status: "red" } },
  { name: "Greater China", ytd: { actFcst: 68.9, target: 64.3, bw: 4.6, status: "green" }, fy: { actFcst: 146.7, target: 136.8, bw: 9.9, status: "green" } },
  { name: "India", ytd: { actFcst: 45.2, target: 42.8, bw: 2.4, status: "green" }, fy: { actFcst: 96.2, target: 90.9, bw: 5.3, status: "green" } },
  { name: "India FOBO", ytd: { actFcst: 12.4, target: 13.1, bw: -0.7, status: "amber" }, fy: { actFcst: 26.4, target: 27.8, bw: -1.4, status: "amber" } },
  { name: "Mexico", ytd: { actFcst: 63.7, target: 62.7, bw: 1.0, status: "green" }, fy: { actFcst: 135.6, target: 133.4, bw: 2.2, status: "green" } },
  { name: "Middle East", ytd: { actFcst: 28.6, target: 30.2, bw: -1.6, status: "amber" }, fy: { actFcst: 60.9, target: 64.2, bw: -3.3, status: "amber" } },
  { name: "PBUS", ytd: { actFcst: 312.8, target: 294.6, bw: 18.2, status: "green" }, fy: { actFcst: 665.9, target: 626.4, bw: 39.5, status: "green" } },
  { name: "PFUS", ytd: { actFcst: 242.8, target: 227.6, bw: 15.2, status: "green" }, fy: { actFcst: 516.8, target: 484.2, bw: 32.6, status: "green" } },
  { name: "Russia", ytd: { actFcst: 34.1, target: 38.6, bw: -4.5, status: "red" }, fy: { actFcst: 72.6, target: 82.0, bw: -9.4, status: "red" } },
  { name: "Saudi Arabia + GCC", ytd: { actFcst: 38.4, target: 36.2, bw: 2.2, status: "green" }, fy: { actFcst: 81.8, target: 77.0, bw: 4.8, status: "green" } },
  { name: "South Africa", ytd: { actFcst: 19.8, target: 21.4, bw: -1.6, status: "amber" }, fy: { actFcst: 42.1, target: 45.5, bw: -3.4, status: "amber" } },
  { name: "SWE", ytd: { actFcst: 26.3, target: 28.1, bw: -1.8, status: "amber" }, fy: { actFcst: 56.0, target: 59.7, bw: -3.7, status: "amber" } },
  { name: "Turkey", ytd: { actFcst: 24.6, target: 26.8, bw: -2.2, status: "amber" }, fy: { actFcst: 52.4, target: 57.0, bw: -4.6, status: "red" } },
  { name: "UKI", ytd: { actFcst: 36.8, target: 34.2, bw: 2.6, status: "green" }, fy: { actFcst: 78.3, target: 72.8, bw: 5.5, status: "green" } },
  { name: "United States", ytd: { actFcst: 555.6, target: 522.2, bw: 33.4, status: "green" }, fy: { actFcst: 1182.6, target: 1110.6, bw: 72.0, status: "green" } },
];

export const alerts: Alert[] = [
  { id: "1", severity: "critical", text: "Commercial is 18% below FY target — 3 programs flagged", context: "Driven by EMEA market underperformance since Q3", portfolio: "Commercial" },
  { id: "2", severity: "critical", text: "Digital & Data attainment at 75% — 4 programs below target", context: "Data platform migration delays impacting Q4 delivery", portfolio: "Digital & Data" },
  { id: "3", severity: "warning", text: "IBP forecast revised down $6M from prior month", context: "Demand planning module rollout pushed to Q2 2026", portfolio: "IBP" },
  { id: "4", severity: "warning", text: "Consumer APAC region tracking 11% below plan", context: "Regulatory changes in SEA markets slowing adoption", portfolio: "Consumer" },
  { id: "5", severity: "warning", text: "EMEA region aggregate benefit $14M below target", context: "Cross-portfolio impact across Commercial, Consumer, and IBP", portfolio: "EMEA Region" },
];

export const topMovers: TopMoversData = {
  gainers: [
    { name: "Supply Chain", change: 4.2, sparkline: [{ week: "W1", value: 76 }, { week: "W2", value: 78 }, { week: "W3", value: 80 }, { week: "W4", value: 84 }] },
    { name: "Tech Foundations", change: 2.8, sparkline: [{ week: "W1", value: 33 }, { week: "W2", value: 34 }, { week: "W3", value: 36 }, { week: "W4", value: 38 }] },
    { name: "Controls", change: 1.5, sparkline: [{ week: "W1", value: 29 }, { week: "W2", value: 29 }, { week: "W3", value: 31 }, { week: "W4", value: 32 }] },
  ],
  decliners: [
    { name: "Commercial", change: -3.1, sparkline: [{ week: "W1", value: 62 }, { week: "W2", value: 60 }, { week: "W3", value: 58 }, { week: "W4", value: 56 }] },
    { name: "Digital & Data", change: -2.4, sparkline: [{ week: "W1", value: 19 }, { week: "W2", value: 18 }, { week: "W3", value: 16 }, { week: "W4", value: 15 }] },
    { name: "IBP", change: -1.8, sparkline: [{ week: "W1", value: 23 }, { week: "W2", value: 22 }, { week: "W3", value: 20 }, { week: "W4", value: 19 }] },
  ],
};

export const aiSummary: AISummaryData = {
  narrative:
    "6 of 9 portfolios are currently on track for FY 2025. Commercial and Digital & Data are the primary areas of concern, tracking 18% and 25% below target respectively — largely driven by EMEA and APAC market gaps. Supply Chain continues to outperform, contributing $12M above target YTD.",
  actions: [
    { label: "Explore Commercial ↗", action: "navigate:commercial" },
    { label: "View EMEA breakdown ↗", action: "navigate:emea" },
    { label: "See all alerts ↗", action: "navigate:alerts" },
  ],
};
