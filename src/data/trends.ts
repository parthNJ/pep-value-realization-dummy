export interface TrendPoint {
  month: string;
  actual: number;
  target: number;
}

// Monthly NOPBT benefit trajectory — FY2024
export const nopbtTrend: TrendPoint[] = [
  { month: "Jan", actual: 82.4, target: 78.6 },
  { month: "Feb", actual: 168.2, target: 162.4 },
  { month: "Mar", actual: 261.8, target: 248.2 },
  { month: "Apr", actual: 348.6, target: 336.8 },
  { month: "May", actual: 442.1, target: 428.4 },
  { month: "Jun", actual: 538.4, target: 524.6 },
  { month: "Jul", actual: 648.2, target: 618.2 },
  { month: "Aug", actual: 752.6, target: 714.8 },
  { month: "Sep", actual: 868.4, target: 812.4 },
  { month: "Oct", actual: 962.8, target: 876.2 },
  { month: "Nov", actual: 1034.2, target: 898.6 },
  { month: "Dec", actual: 1097.6, target: 913.7 },
];
