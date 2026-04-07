export type Status = "green" | "amber" | "red";

export interface MetricData {
  label: string;
  actFcst: number;
  target: number;
  bw: number;
  status: Status;
}

export interface FinancialPanel {
  label: string;
  metrics: MetricData[];
}

export interface PortfolioPeriod {
  actFcst: number;
  target: number;
  bw: number;
  status: Status;
}

export interface Portfolio {
  name: string;
  ytd: PortfolioPeriod;
  fy: PortfolioPeriod;
}

export type AlertSeverity = "critical" | "warning";

export interface Alert {
  id: string;
  severity: AlertSeverity;
  text: string;
  context: string;
  portfolio: string;
}

export interface SparklinePoint {
  week: string;
  value: number;
}

export interface Mover {
  name: string;
  change: number;
  sparkline: SparklinePoint[];
}

export interface TopMoversData {
  gainers: Mover[];
  decliners: Mover[];
}

export interface ActionChip {
  label: string;
  action: string;
}

export interface AISummaryData {
  narrative: string;
  actions: ActionChip[];
}

export type BenefitTier = "High" | "Mid" | "Low";
export type GrowthRating = "Strong" | "Moderate" | "Slowing";
export type PriorityTier = "Tier 1" | "Tier 2" | "Tier 3" | "Watch";

export interface ProgramDetail {
  owner: string;
  sponsor: string;
  startDate: string;
  expectedEnd: string;
  currentPhase: string;
  completionPct: number;
  description: string;
  milestones: { label: string; date: string; done: boolean }[];
  risks: string[];
  monthlyTrend: { month: string; actual: number; target: number }[];
}

export interface Program {
  id: string;
  name: string;
  portfolio: string;
  region: string;
  market: string;
  benefit: number;
  target: number;
  bw: number;
  benefitTier: BenefitTier;
  growth: GrowthRating;
  priority: PriorityTier;
  detail?: ProgramDetail;
}

export interface FilterState {
  region: string;
  market: string;
  portfolio: string;
  program: string;
  year: string;
  month: string;
  timeframe: string;
  ownership: string;
}
