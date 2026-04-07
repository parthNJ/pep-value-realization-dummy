import { LineChart, Line } from "recharts";
import type { SparklinePoint } from "@/types/dashboard";

export function SparklineChart({
  data,
  color,
}: {
  data: SparklinePoint[];
  color: string;
}) {
  return (
    <LineChart width={60} height={28} data={data}>
      <Line
        type="monotone"
        dataKey="value"
        stroke={color}
        strokeWidth={1.5}
        dot={false}
        isAnimationActive={false}
      />
    </LineChart>
  );
}
