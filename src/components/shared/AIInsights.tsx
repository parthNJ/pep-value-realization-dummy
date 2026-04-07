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
        <div className="grid border-t lg:grid-cols-3">
          {insights.map((insight, i) => (
            <div
              key={insight.label}
              className={`px-5 py-4 ${i > 0 ? "lg:border-l" : ""}`}
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
      "Supply Chain and Commercial account for $165.6M of favorable variance — both outperforming at scale.",
      "Forecast AI emerging as a Tier 1 program with strong digital-led value creation potential.",
    ],
  },
  {
    label: "Action Required",
    status: "red",
    bullets: [
      "Consumer portfolio is the single at-risk portfolio with –$10.6M variance.",
      "Program-level root cause review recommended within Consumer and Supply Chain's Route Optimization.",
    ],
  },
  {
    label: "Strategic Outlook",
    status: "green",
    bullets: [
      "5 of 6 portfolios above target with $1.1B in total benefit.",
      "Leadership should prioritize protecting Supply Chain funding and accelerating Forecast AI adoption.",
    ],
  },
];

export const regionInsights: Insight[] = [
  {
    label: "Regional Strength",
    status: "green",
    bullets: [
      "North America drives 51% of total benefit — anchored by Design To Value and Network Optimization.",
      "APAC showing consistent growth across Smart Warehouse and Predictive Maintenance programs.",
    ],
  },
  {
    label: "Risk Zones",
    status: "red",
    bullets: [
      "EMEA underperforming with –$17.8M YTD variance — Russia programs are the primary drag.",
      "International Beverages trending slightly negative — monitor South Africa and Saudi Arabia delivery.",
    ],
  },
  {
    label: "Rebalancing Opportunity",
    status: "amber",
    bullets: [
      "LAFN and APAC have capacity for incremental investment given favorable variance trends.",
      "Consider shifting EMEA resources from Russia-exposed programs to Central Europe and UKI.",
    ],
  },
];

export const marketInsights: Insight[] = [
  {
    label: "Market Leaders",
    status: "green",
    bullets: [
      "United States ($555.6M YTD) and PBUS ($312.8M) are the dominant value creators.",
      "Greater China and Brazil showing strong execution with positive variance across all programs.",
    ],
  },
  {
    label: "Markets Under Pressure",
    status: "red",
    bullets: [
      "Russia (–$4.5M) and France (–$2.6M) are the largest negative contributors in EMEA.",
      "Turkey and Egypt trending below target — structural challenges may require program restructuring.",
    ],
  },
  {
    label: "Growth Markets",
    status: "amber",
    bullets: [
      "India and Indonesia represent untapped scale — current programs are small but growing strongly.",
      "Mexico is steady but flat — consider expanding Inbound Automation and Transportation programs.",
    ],
  },
];
