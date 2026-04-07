import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { X, ChevronDown, Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GlobalFilterState {
  portfolios: string[];
  regions: string[];
  markets: string[];
  year: string;
}

export const defaultGlobalFilters: GlobalFilterState = {
  portfolios: [],
  regions: [],
  markets: [],
  year: "2024",
};

interface MultiSelectProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

function MultiSelect({ label, options, selected, onChange }: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const filtered = search
    ? options.filter((o) => o.toLowerCase().includes(search.toLowerCase()))
    : options;

  const toggle = (val: string) => {
    onChange(selected.includes(val) ? selected.filter((s) => s !== val) : [...selected, val]);
  };

  return (
    <Popover open={open} onOpenChange={(v) => { setOpen(v); if (!v) setSearch(""); }}>
      <PopoverTrigger
        render={
          <Button variant="outline" size="sm" className="gap-1.5">
            {label}
            {selected.length > 0 && (
              <Badge variant="default" className="ml-1 size-5 justify-center rounded-full px-0 text-[10px]">
                {selected.length}
              </Badge>
            )}
            <ChevronDown className="size-3.5 text-muted-foreground" />
          </Button>
        }
      />
      <PopoverContent align="start" className="w-56 p-0">
        <div className="flex items-center gap-2 border-b px-2 py-1.5">
          <Search className="size-3.5 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${label.toLowerCase()}...`}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="max-h-52 overflow-y-auto p-1">
          {filtered.length === 0 && (
            <p className="px-2 py-3 text-center text-xs text-muted-foreground">No results</p>
          )}
          {filtered.map((opt) => {
            const isSelected = selected.includes(opt);
            return (
              <button
                key={opt}
                onClick={() => toggle(opt)}
                className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent"
              >
                <span className={cn(
                  "flex size-4 shrink-0 items-center justify-center rounded border",
                  isSelected ? "border-primary bg-primary text-primary-foreground" : "border-input",
                )}>
                  {isSelected && <Check className="size-3" />}
                </span>
                <span className="truncate">{opt}</span>
              </button>
            );
          })}
        </div>
        {selected.length > 0 && (
          <div className="border-t p-1">
            <button onClick={() => onChange([])} className="w-full rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-accent">
              Clear {label.toLowerCase()}
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

const keyLabel: Record<string, string> = {
  portfolios: "Portfolio",
  regions: "Region",
  markets: "Market",
};

interface GlobalFiltersProps {
  filters: GlobalFilterState;
  onChange: (f: GlobalFilterState) => void;
  portfolioOptions: string[];
  regionOptions: string[];
  marketOptions: string[];
}

export function GlobalFilters({
  filters, onChange, portfolioOptions, regionOptions, marketOptions,
}: GlobalFiltersProps) {
  const pills = [
    ...filters.portfolios.map((v) => ({ key: "portfolios" as const, val: v })),
    ...filters.regions.map((v) => ({ key: "regions" as const, val: v })),
    ...filters.markets.map((v) => ({ key: "markets" as const, val: v })),
  ];
  const hasFilters = pills.length > 0;
  const MAX_PILLS = 2;
  const visiblePills = pills.slice(0, MAX_PILLS);
  const hiddenCount = pills.length - MAX_PILLS;

  const removePill = (key: "portfolios" | "regions" | "markets", val: string) => {
    onChange({ ...filters, [key]: filters[key].filter((s) => s !== val) });
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <MultiSelect label="Portfolio" options={portfolioOptions} selected={filters.portfolios}
          onChange={(v) => onChange({ ...filters, portfolios: v })} />
        <MultiSelect label="Region" options={regionOptions} selected={filters.regions}
          onChange={(v) => onChange({ ...filters, regions: v })} />
        <MultiSelect label="Market" options={marketOptions} selected={filters.markets}
          onChange={(v) => onChange({ ...filters, markets: v })} />
        <Select value={filters.year} onValueChange={(v: string) => onChange({ ...filters, year: v })}>
          <SelectTrigger size="sm" className="w-[90px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {["2023", "2024", "2025", "2026"].map((y) => (
              <SelectItem key={y} value={y}>FY{y}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {hasFilters && (
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="xs"
            onClick={() => onChange(defaultGlobalFilters)}
            className="shrink-0 text-xs text-muted-foreground"
          >
            Clear all
          </Button>
          {visiblePills.map(({ key, val }) => (
            <Badge key={`${key}-${val}`} variant="secondary" className="shrink-0 gap-1 pl-2 pr-1">
              <span className="text-xs text-muted-foreground">{keyLabel[key]}:</span>
              <span className="text-xs">{val}</span>
              <button
                onClick={() => removePill(key, val)}
                className="ml-0.5 rounded-full p-0.5 hover:bg-muted" aria-label={`Remove ${val}`}
              >
                <X className="size-3" />
              </button>
            </Badge>
          ))}
          {hiddenCount > 0 && (
            <Dialog>
              <DialogTrigger
                render={
                  <button className="shrink-0 text-xs font-medium text-muted-foreground hover:text-foreground">
                    +{hiddenCount} more
                  </button>
                }
              />
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Active Filters ({pills.length})</DialogTitle>
                  <DialogDescription>All currently applied filters</DialogDescription>
                </DialogHeader>
                <div className="space-y-3 py-2">
                  {(["portfolios", "regions", "markets"] as const).map((key) => {
                    const items = filters[key];
                    if (items.length === 0) return null;
                    return (
                      <div key={key}>
                        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          {keyLabel[key]} ({items.length})
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {items.map((val) => (
                            <Badge key={val} variant="secondary" className="gap-1 pl-2 pr-1">
                              <span className="text-xs">{val}</span>
                              <button
                                onClick={() => removePill(key, val)}
                                className="ml-0.5 rounded-full p-0.5 hover:bg-muted"
                                aria-label={`Remove ${val}`}
                              >
                                <X className="size-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      )}
    </div>
  );
}
