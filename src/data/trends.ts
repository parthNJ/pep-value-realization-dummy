export interface TrendPoint {
  month: string;
  actual: number;
  target: number;
}

export type TrendMetric = "NOPBT Benefit" | "Revenue" | "Productivity";

// Monthly cumulative trajectories — FY2024 (dummy)
export const trendData: Record<TrendMetric, TrendPoint[]> = {
  "NOPBT Benefit": [
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
  ],
  Revenue: [
    { month: "Jan", actual: 26.4, target: 25.2 },
    { month: "Feb", actual: 54.2, target: 52.0 },
    { month: "Mar", actual: 84.6, target: 79.4 },
    { month: "Apr", actual: 112.8, target: 108.2 },
    { month: "May", actual: 138.4, target: 136.8 },
    { month: "Jun", actual: 168.2, target: 168.0 },
    { month: "Jul", actual: 202.6, target: 198.4 },
    { month: "Aug", actual: 234.8, target: 232.6 },
    { month: "Sep", actual: 268.4, target: 262.0 },
    { month: "Oct", actual: 298.2, target: 278.4 },
    { month: "Nov", actual: 324.6, target: 286.8 },
    { month: "Dec", actual: 347.2, target: 294.6 },
  ],
  Productivity: [
    { month: "Jan", actual: 62.8, target: 60.4 },
    { month: "Feb", actual: 128.6, target: 124.2 },
    { month: "Mar", actual: 198.4, target: 190.8 },
    { month: "Apr", actual: 264.2, target: 258.6 },
    { month: "May", actual: 334.8, target: 328.4 },
    { month: "Jun", actual: 408.2, target: 402.0 },
    { month: "Jul", actual: 488.6, target: 474.2 },
    { month: "Aug", actual: 568.4, target: 548.6 },
    { month: "Sep", actual: 652.8, target: 622.4 },
    { month: "Oct", actual: 728.4, target: 672.8 },
    { month: "Nov", actual: 790.2, target: 690.4 },
    { month: "Dec", actual: 844.6, target: 706.2 },
  ],
};
