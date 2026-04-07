import { ProgramInsights } from "@/components/programs/ProgramInsights";
import { TopProgramsChart } from "@/components/programs/TopProgramsChart";
import { AttentionChart } from "@/components/programs/AttentionChart";
import { QuadrantChart } from "@/components/programs/QuadrantChart";
import { HeatmapTable } from "@/components/programs/HeatmapTable";
import { ProgramTable } from "@/components/programs/ProgramTable";
import type { Program } from "@/types/dashboard";

export function ProgramsTab({ programs }: { programs: Program[] }) {
  return (
    <div className="space-y-6">
      <ProgramInsights programs={programs} />
      <div className="grid gap-6 lg:grid-cols-2">
        <TopProgramsChart programs={programs} />
        <AttentionChart programs={programs} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <QuadrantChart programs={programs} />
        <HeatmapTable programs={programs} />
      </div>
      <ProgramTable programs={programs} />
    </div>
  );
}
