import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Insight {
  label: string;
  status: "green" | "red" | "amber";
  bullets: string[];
}

interface AIInsightsProps {
  insights: Insight[];
}

export function AIInsights({ insights }: AIInsightsProps) {
  const [open, setOpen] = useState(true);

  return (
    <div className="rounded-lg border">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2 px-4 py-3 text-left transition-colors hover:bg-muted/50"
      >
        <span className="text-sm font-semibold">AI Insights</span>
        <span className="ml-auto">
          {open ? (
            <ChevronUp className="size-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="size-4 text-muted-foreground" />
          )}
        </span>
      </button>
      {open && (
        <div className="grid border-t grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {insights.map((insight, i) => (
            <div
              key={insight.label}
              className={`px-5 py-4 ${i > 0 ? "border-t sm:border-t-0 sm:border-l" : ""}`}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {insight.label}
              </p>
              <ul className="mt-2 space-y-1.5">
                {insight.bullets.map((b, j) => (
                  <li key={j} className="flex gap-2 text-sm leading-relaxed text-foreground/80">
                    <span className="mt-1.5 inline-block size-1 shrink-0 rounded-full bg-foreground/30" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Static insights per section
export const portfolioInsights: Insight[] = [
  {
    label: "Momentum Signals",
    status: "green",
    bullets: [
      "Supply Chain and Commercial together drive the majority of favorable variance — both outperforming at scale.",
      "Agri Intelligence emerging as a Tier 1 capability with strong digital-led value creation potential.",
    ],
  },
  {
    label: "Action Required",
    status: "red",
    bullets: [
      "Consumer portfolio is the primary at-risk portfolio with negative variance.",
      "Program-level root cause review recommended within Consumer and Supply Chain's Route Planning.",
    ],
  },
  {
    label: "Strategic Outlook",
    status: "green",
    bullets: [
      "Majority of portfolios above target with strong total benefit.",
      "Leadership should prioritize protecting Supply Chain funding and accelerating digital capabilities.",
    ],
  },
];

export const regionInsights: Insight[] = [
  {
    label: "Regional Strength",
    status: "green",
    bullets: [
      "North America drives over half of total benefit — anchored by Value Engineering and Network Redesign.",
      "APAC showing consistent growth across Intelligent Warehouse and Predictive Equipment Care.",
    ],
  },
  {
    label: "Risk Zones",
    status: "red",
    bullets: [
      "EMEA underperforming with significant negative YTD variance — Eastern Europe programs are the primary drag.",
      "International Beverages trending slightly negative — monitor delivery in key markets.",
    ],
  },
  {
    label: "Rebalancing Opportunity",
    status: "amber",
    bullets: [
      "LAFN and APAC have capacity for incremental investment given favorable variance trends.",
      "Consider shifting EMEA resources from underperforming programs to Central Europe and UKI.",
    ],
  },
];

export const marketInsights: Insight[] = [
  {
    label: "Market Leaders",
    status: "green",
    bullets: [
      "United States and PBUS are the dominant value creators by a wide margin.",
      "Greater China and Brazil showing strong execution with positive variance across programs.",
    ],
  },
  {
    label: "Markets Under Pressure",
    status: "red",
    bullets: [
      "Russia and France are the largest negative contributors in EMEA.",
      "Turkey and Egypt trending below target — structural challenges may require program restructuring.",
    ],
  },
  {
    label: "Growth Markets",
    status: "amber",
    bullets: [
      "India and Indonesia represent untapped scale — current programs are small but growing strongly.",
      "Mexico is steady but flat — consider expanding logistics and freight programs.",
    ],
  },
];
