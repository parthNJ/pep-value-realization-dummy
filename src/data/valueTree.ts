export interface ValueNode {
  id: string;
  label: string;
  nopbt: number;
  target: number;
  bw: number;
  children?: ValueNode[];
}

export interface ProductivityRow {
  category: string;
  subCategory: string;
  productivity: number;
  target: number;
  bw: number;
}

// S&T Productivity L1 breakdown data
export interface L1Row {
  team: string;
  name: string;
  productivity: number;
  target: number;
  bw: number;
}

export const sntByL1: L1Row[] = [
  // Capability Leads — sub-total: 186.4M
  { team: "Capability Leads", name: "Infrastructure, Cloud & IT Ops", productivity: 52.8, target: 48.2, bw: 4.6 },
  { team: "Capability Leads", name: "Data, Analytics & AI", productivity: 38.6, target: 35.4, bw: 3.2 },
  { team: "Capability Leads", name: "Tech Strategy & Enterprise Solutions", productivity: 28.4, target: 26.8, bw: 1.6 },
  { team: "Capability Leads", name: "Digital Products & Applications", productivity: 24.2, target: 26.6, bw: -2.4 },
  { team: "Capability Leads", name: "Cybersecurity", productivity: 18.6, target: 17.2, bw: 1.4 },
  { team: "Capability Leads", name: "Strategy", productivity: 12.8, target: 11.6, bw: 1.2 },
  { team: "Capability Leads", name: "Transformation & Process Excellence", productivity: 11.0, target: 10.4, bw: 0.6 },
  // Sector Deployment Leads — sub-total: 78.6M
  { team: "Sector Deployment Leads", name: "North America - Deployment", productivity: 28.4, target: 26.2, bw: 2.2 },
  { team: "Sector Deployment Leads", name: "LATAM - Deployment", productivity: 16.8, target: 15.4, bw: 1.4 },
  { team: "Sector Deployment Leads", name: "Europe - Deployment", productivity: 14.2, target: 13.6, bw: 0.6 },
  { team: "Sector Deployment Leads", name: "AMESA - Deployment", productivity: 10.8, target: 11.4, bw: -0.6 },
  { team: "Sector Deployment Leads", name: "APAC - Deployment", productivity: 8.4, target: 7.8, bw: 0.6 },
  // Transformation Leads — sub-total: 42.4M
  { team: "Transformation Leads", name: "Commercial & Consumer", productivity: 12.6, target: 11.8, bw: 0.8 },
  { team: "Transformation Leads", name: "Supply Chain & Operations", productivity: 10.4, target: 9.6, bw: 0.8 },
  { team: "Transformation Leads", name: "Employee Experience", productivity: 6.8, target: 6.2, bw: 0.6 },
  { team: "Transformation Leads", name: "Integrated Business Planning", productivity: 5.2, target: 4.8, bw: 0.4 },
  { team: "Transformation Leads", name: "Global Functions", productivity: 4.2, target: 4.0, bw: 0.2 },
  { team: "Transformation Leads", name: "Finance - FP&A", productivity: 3.2, target: 3.0, bw: 0.2 },
  // Leadership & Support — sub-total: 12.8M
  { team: "Leadership & Support", name: "Leadership & Support Functions", productivity: 12.8, target: 12.0, bw: 0.8 },
];

// S&T Productivity by Region
export const sntByRegion: L1Row[] = [
  // Regions
  { team: "Regions", name: "APAC", productivity: 32.4, target: 29.8, bw: 2.6 },
  { team: "Regions", name: "EMEA", productivity: 48.6, target: 45.2, bw: 3.4 },
  { team: "Regions", name: "International Beverages", productivity: 22.8, target: 21.4, bw: 1.4 },
  { team: "Regions", name: "LAF", productivity: 38.2, target: 35.6, bw: 2.6 },
  { team: "Regions", name: "North America", productivity: 86.4, target: 78.2, bw: 8.2 },
  { team: "Regions", name: "Other Intl Foods", productivity: 14.6, target: 13.8, bw: 0.8 },
  // Corp & Global Functions
  { team: "Corp & Global Functions", name: "Corporate", productivity: 42.8, target: 39.6, bw: 3.2 },
  { team: "Corp & Global Functions", name: "Global Functions", productivity: 22.4, target: 20.8, bw: 1.6 },
  { team: "Corp & Global Functions", name: "PGCS", productivity: 12.0, target: 10.8, bw: 1.2 },
];

// S&T Productivity by Expense Type
export interface ExpenseRow {
  category: "Labor" | "Non-Labor";
  name: string;
  productivity: number;
  target: number;
  bw: number;
}

export const sntByExpenseType: ExpenseRow[] = [
  // Labor — sub-total: 202.2M (matches snt-labor from old tree)
  { category: "Labor", name: "Internal Labor", productivity: 100.2, target: 92.4, bw: 7.8 },
  { category: "Labor", name: "External Labor", productivity: 36.4, target: 33.8, bw: 2.6 },
  { category: "Labor", name: "Managed Services", productivity: 65.6, target: 60.0, bw: 5.6 },
  // Non-Labor — sub-total: 118.0M (matches snt-nonlabor from old tree)
  { category: "Non-Labor", name: "Hardware", productivity: 24.2, target: 22.4, bw: 1.8 },
  { category: "Non-Labor", name: "Software", productivity: 51.2, target: 47.6, bw: 3.6 },
  { category: "Non-Labor", name: "Voice & Data", productivity: 17.6, target: 16.2, bw: 1.4 },
  { category: "Non-Labor", name: "Facilities", productivity: 6.0, target: 5.8, bw: 0.2 },
  { category: "Non-Labor", name: "T&E", productivity: 0.0, target: 0.0, bw: 0.0 },
  { category: "Non-Labor", name: "Other", productivity: 19.0, target: 26.0, bw: -7.0 },
];

// S&T Productivity by Tactic (program-level)
export interface TacticRow {
  name: string;
  productivity: number;
  target: number;
  bw: number;
}

export const sntByTactic: TacticRow[] = [
  { name: "Internal Labor Restructuring", productivity: 68.4, target: 62.8, bw: 5.6 },
  { name: "External Labor Restructuring", productivity: 42.6, target: 39.4, bw: 3.2 },
  { name: "Application Rationalization", productivity: 38.2, target: 35.6, bw: 2.6 },
  { name: "Accelerate S&T (HCL Contract)", productivity: 34.8, target: 32.0, bw: 2.8 },
  { name: "Telecom Cost Optimization", productivity: 28.4, target: 26.2, bw: 2.2 },
  { name: "Cloud Cost Optimization", productivity: 24.6, target: 22.8, bw: 1.8 },
  { name: "TCS Application Maintenance Contract", productivity: 22.2, target: 20.4, bw: 1.8 },
  { name: "Cognizant Database Contract", productivity: 18.8, target: 17.2, bw: 1.6 },
  { name: "Cognizant Data Platforms", productivity: 16.4, target: 15.0, bw: 1.4 },
  { name: "Lenovo PC Savings", productivity: 12.2, target: 11.4, bw: 0.8 },
  { name: "Mainframe Decommission", productivity: 8.4, target: 7.8, bw: 0.6 },
  { name: "Digitization of GP; Process Simplification", productivity: 5.2, target: 4.6, bw: 0.6 },
];

// S&T Productivity breakdown
export const sntProductivity: ProductivityRow[] = [
  // Labor
  { category: "Labor", subCategory: "Internal Labor", productivity: 89.2, target: 82.4, bw: 6.8 },
  { category: "Labor", subCategory: "External Labor", productivity: 67.4, target: 61.8, bw: 5.6 },
  { category: "Labor", subCategory: "Managed Services", productivity: 45.6, target: 42.0, bw: 3.6 },
  // Non-Labor
  { category: "Non-Labor", subCategory: "Hardware", productivity: 34.2, target: 31.6, bw: 2.6 },
  { category: "Non-Labor", subCategory: "Software", productivity: 52.8, target: 48.4, bw: 4.4 },
  { category: "Non-Labor", subCategory: "Voice & Data", productivity: 18.6, target: 17.2, bw: 1.4 },
  { category: "Non-Labor", subCategory: "Facilities", productivity: 12.4, target: 11.8, bw: 0.6 },
];

// GCC Productivity breakdown
export const gccProductivity: ProductivityRow[] = [
  { category: "Transitions", subCategory: "Application Migration", productivity: 42.8, target: 38.6, bw: 4.2 },
  { category: "Transitions", subCategory: "Infrastructure Consolidation", productivity: 31.4, target: 28.8, bw: 2.6 },
  { category: "Transitions", subCategory: "Service Desk Optimization", productivity: 22.6, target: 20.4, bw: 2.2 },
  { category: "Compression", subCategory: "Rate Card Optimization", productivity: 56.2, target: 52.0, bw: 4.2 },
  { category: "Compression", subCategory: "Volume Efficiency", productivity: 38.4, target: 35.6, bw: 2.8 },
  { category: "Compression", subCategory: "Automation Savings", productivity: 28.8, target: 26.2, bw: 2.6 },
];

// The main value tree
export const valueTree: ValueNode = {
  id: "total-nopbt",
  label: "Total NOPBT",
  nopbt: 1420.6,
  target: 1280.4,
  bw: 140.2,
  children: [
    {
      id: "growth",
      label: "Growth",
      nopbt: 1015.4,
      target: 845.8,
      bw: 169.6,
      children: [
        { id: "revenue", label: "Net Revenue", nopbt: 347.2, target: 294.6, bw: 52.6 },
        { id: "cm", label: "Contribution Margin", nopbt: 170.8, target: 139.0, bw: 31.8 },
        { id: "nopbt-benefit", label: "NOPBT Benefit", nopbt: 497.4, target: 412.2, bw: 85.2 },
      ],
    },
    {
      id: "productivity",
      label: "Productivity",
      nopbt: 405.2,
      target: 434.6,
      bw: -29.4,
      children: [
        {
          id: "snt-prod",
          label: "S&T Productivity",
          nopbt: 320.2,
          target: 295.2,
          bw: 25.0,
          children: [
            { id: "snt-by-l1", label: "By L1", nopbt: 320.2, target: 295.2, bw: 25.0 },
            { id: "snt-by-region", label: "By Region", nopbt: 320.2, target: 295.2, bw: 25.0 },
            { id: "snt-by-expense", label: "By Expense Type", nopbt: 320.2, target: 295.2, bw: 25.0 },
            { id: "snt-by-tactic", label: "By Tactic", nopbt: 320.2, target: 295.2, bw: 25.0 },
          ],
        },
        {
          id: "gcc-prod",
          label: "GCC Productivity",
          nopbt: 85.0,
          target: 139.4,
          bw: -54.4,
          children: [
            { id: "gcc-transitions", label: "Transitions", nopbt: 38.2, target: 62.6, bw: -24.4 },
            { id: "gcc-compression", label: "Compression", nopbt: 46.8, target: 76.8, bw: -30.0 },
          ],
        },
      ],
    },
  ],
};

// Multi-year GCC data for the GCC page
export const gccYearlyData = [
  { year: "2018", regions: { Total: 12.4, APAC: 1.2, Corporate: 2.8, EMEA: 2.4, "Global Functions": 1.6, LAF: 1.8, "North America": 2.6 } },
  { year: "2019", regions: { Total: 28.6, APAC: 3.2, Corporate: 5.4, EMEA: 5.8, "Global Functions": 3.2, LAF: 4.2, "North America": 6.8 } },
  { year: "2020", regions: { Total: 68.4, APAC: 8.4, Corporate: 12.6, EMEA: 14.2, "Global Functions": 7.8, LAF: 9.6, "North America": 15.8 } },
  { year: "2021", regions: { Total: 142.8, APAC: 18.2, Corporate: 26.4, EMEA: 28.6, "Global Functions": 16.4, LAF: 20.8, "North America": 32.4 } },
  { year: "2022", regions: { Total: 248.6, APAC: 32.4, Corporate: 44.8, EMEA: 50.2, "Global Functions": 28.6, LAF: 36.2, "North America": 56.4 } },
  { year: "2023", regions: { Total: 368.2, APAC: 48.6, Corporate: 66.4, EMEA: 74.8, "Global Functions": 42.2, LAF: 52.8, "North America": 83.4 } },
  { year: "2024", regions: { Total: 456.8, APAC: 58.4, Corporate: 82.6, EMEA: 92.4, "Global Functions": 52.8, LAF: 66.2, "North America": 104.4 } },
  { year: "2025", regions: { Total: 576.8, APAC: 72.4, Corporate: 104.2, EMEA: 116.8, "Global Functions": 66.4, LAF: 82.6, "North America": 134.4 } },
];
