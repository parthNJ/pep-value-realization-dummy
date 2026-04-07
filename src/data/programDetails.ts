import type { ProgramDetail } from "@/types/dashboard";

const owners = [
  "Sarah Chen", "Michael Torres", "Priya Sharma", "James Wilson",
  "Ana Rodriguez", "David Kim", "Lisa Patel", "Robert Zhang",
  "Maria Santos", "Thomas Mueller", "Yuki Tanaka", "Ahmed Hassan",
];

const sponsors = [
  "VP Supply Chain", "SVP Commercial", "VP Finance", "SVP Operations",
  "VP Technology", "SVP Strategy", "VP Procurement", "SVP Digital",
];

const phases = ["Planning", "Pilot", "Scaling", "Optimization", "Steady State"];

function makeTrend(finalActual: number, finalTarget: number): { month: string; actual: number; target: number }[] {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months.map((m, i) => {
    const pct = (i + 1) / 12;
    const jitter = 0.95 + Math.sin(i * 1.3) * 0.08;
    return {
      month: m,
      actual: +(finalActual * pct * jitter).toFixed(1),
      target: +(finalTarget * pct).toFixed(1),
    };
  });
}

export function generateDetail(programId: string, benefit: number, target: number, bw: number): ProgramDetail {
  const hash = programId.charCodeAt(1) + programId.charCodeAt(2);
  const ownerIdx = hash % owners.length;
  const sponsorIdx = (hash + 3) % sponsors.length;
  const phaseIdx = Math.min(Math.floor((benefit / 400) * 5), 4);
  const completionPct = Math.min(Math.round(20 + (benefit / 400) * 80), 95);

  const isAtRisk = bw < 0;

  const risks: string[] = [];
  if (isAtRisk) {
    risks.push(`Program is $${Math.abs(bw).toFixed(1)}M below target — root cause analysis needed`);
    if (bw < -10) risks.push("Significant variance may require executive escalation");
    risks.push("Resource allocation review recommended for next quarter");
  }

  return {
    owner: owners[ownerIdx],
    sponsor: sponsors[sponsorIdx],
    startDate: "Jan 2024",
    expectedEnd: "Dec 2025",
    currentPhase: phases[phaseIdx],
    completionPct,
    description: `This program targets operational improvements and cost optimization through technology-enabled transformation. Current focus is on ${phases[phaseIdx].toLowerCase()} phase activities with cross-functional team alignment.`,
    milestones: [
      { label: "Business case approved", date: "Jan 2024", done: true },
      { label: "Pilot launch", date: "Apr 2024", done: true },
      { label: "Phase 1 rollout", date: "Aug 2024", done: completionPct > 50 },
      { label: "Full scale deployment", date: "Mar 2025", done: false },
      { label: "Steady state", date: "Dec 2025", done: false },
    ],
    risks,
    monthlyTrend: makeTrend(benefit, target),
  };
}
