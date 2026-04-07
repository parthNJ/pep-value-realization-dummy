import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { X, ChevronDown, Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProgramFilterState {
  portfolios: string[];
  regions: string[];
  markets: string[];
}

export const defaultProgramFilters: ProgramFilterState = {
  portfolios: [],
  regions: [],
  markets: [],
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
    onChange(
      selected.includes(val)
        ? selected.filter((s) => s !== val)
        : [...selected, val],
    );
  };

  return (
    <Popover
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setSearch("");
      }}
    >
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
                <span
                  className={cn(
                    "flex size-4 shrink-0 items-center justify-center rounded border",
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input",
                  )}
                >
                  {isSelected && <Check className="size-3" />}
                </span>
                <span className="truncate">{opt}</span>
              </button>
            );
          })}
        </div>
        {selected.length > 0 && (
          <div className="border-t p-1">
            <button
              onClick={() => onChange([])}
              className="w-full rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-accent"
            >
              Clear {label.toLowerCase()}
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

interface ProgramFiltersProps {
  filters: ProgramFilterState;
  onChange: (f: ProgramFilterState) => void;
  portfolioOptions: string[];
  regionOptions: string[];
  marketOptions: string[];
}

export function ProgramFilters({
  filters,
  onChange,
  portfolioOptions,
  regionOptions,
  marketOptions,
}: ProgramFiltersProps) {
  const allPills = [
    ...filters.portfolios.map((v) => ({ key: "portfolios" as const, val: v })),
    ...filters.regions.map((v) => ({ key: "regions" as const, val: v })),
    ...filters.markets.map((v) => ({ key: "markets" as const, val: v })),
  ];

  const hasFilters = allPills.length > 0;

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <MultiSelect
          label="Portfolio"
          options={portfolioOptions}
          selected={filters.portfolios}
          onChange={(v) => onChange({ ...filters, portfolios: v })}
        />
        <MultiSelect
          label="Region"
          options={regionOptions}
          selected={filters.regions}
          onChange={(v) => onChange({ ...filters, regions: v })}
        />
        <MultiSelect
          label="Market"
          options={marketOptions}
          selected={filters.markets}
          onChange={(v) => onChange({ ...filters, markets: v })}
        />
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onChange(defaultProgramFilters)}
            className="text-xs text-muted-foreground"
          >
            Clear all
          </Button>
        )}
      </div>

      {hasFilters && (
        <div className="flex flex-wrap gap-1.5">
          {allPills.map(({ key, val }) => (
            <Badge key={`${key}-${val}`} variant="secondary" className="gap-1 pl-2 pr-1">
              <span className="text-xs">{val}</span>
              <button
                onClick={() =>
                  onChange({
                    ...filters,
                    [key]: filters[key].filter((s) => s !== val),
                  })
                }
                className="ml-0.5 rounded-full p-0.5 hover:bg-muted"
                aria-label={`Remove ${val}`}
              >
                <X className="size-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
