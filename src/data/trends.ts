export interface TrendPoint {
  month: string;
  actual: number;
  target: number;
}

// Monthly NOPBT benefit trajectory — FY2024 (dummy)
export const nopbtTrend: TrendPoint[] = [
  { month: "Jan", actual: 76.2, target: 72.8 },
  { month: "Feb", actual: 155.4, target: 150.2 },
  { month: "Mar", actual: 242.0, target: 229.6 },
  { month: "Apr", actual: 322.4, target: 311.4 },
  { month: "May", actual: 408.6, target: 396.2 },
  { month: "Jun", actual: 497.8, target: 485.0 },
  { month: "Jul", actual: 599.4, target: 571.8 },
  { month: "Aug", actual: 695.8, target: 661.2 },
  { month: "Sep", actual: 803.2, target: 751.4 },
  { month: "Oct", actual: 890.6, target: 810.4 },
  { month: "Nov", actual: 956.8, target: 831.2 },
  { month: "Dec", actual: 1015.4, target: 845.8 },
];
