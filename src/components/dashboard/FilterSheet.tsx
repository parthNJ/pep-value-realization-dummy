import { useState } from "react";
import { SlidersHorizontal, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import type { FilterState } from "@/types/dashboard";
import { filterConfigs, defaultFilters } from "@/data/mockData";

export function FilterSheet({
  filters,
  onChange,
}: {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}) {
  const [draft, setDraft] = useState<FilterState>(filters);
  const [open, setOpen] = useState(false);

  const activeCount = Object.entries(filters).filter(
    ([key, val]) => val !== defaultFilters[key as keyof FilterState],
  ).length;

  const handleOpen = (isOpen: boolean) => {
    if (isOpen) setDraft(filters);
    setOpen(isOpen);
  };

  const apply = () => {
    onChange(draft);
    setOpen(false);
  };

  const reset = () => {
    setDraft(defaultFilters);
  };

  // Active filter pills for inline display
  const activePills = Object.entries(filters)
    .filter(([key, val]) => val !== defaultFilters[key as keyof FilterState])
    .map(([key, val]) => ({ key, val }));

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Sheet open={open} onOpenChange={handleOpen}>
        <SheetTrigger
          render={
            <Button variant="outline" size="sm">
              <SlidersHorizontal className="mr-1.5 size-3.5" />
              Filters
              {activeCount > 0 && (
                <Badge variant="default" className="ml-1.5 size-5 justify-center rounded-full px-0">
                  {activeCount}
                </Badge>
              )}
            </Button>
          }
        />
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>
              Narrow down the dashboard view
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1 space-y-4 overflow-y-auto px-4">
            {filterConfigs.map(({ key, label, options }) => (
              <div key={key} className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  {label}
                </label>
                <Select
                  value={draft[key]}
                  onValueChange={(val) => {
                    if (val) setDraft((prev) => ({ ...prev, [key]: val }));
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
          <SheetFooter>
            <Button variant="outline" size="sm" onClick={reset}>
              <RotateCcw className="mr-1.5 size-3.5" />
              Reset
            </Button>
            <Button size="sm" onClick={apply}>
              Apply Filters
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {activePills.map(({ key, val }) => (
        <Badge
          key={key}
          variant="secondary"
          className="gap-1 pl-2 pr-1"
        >
          <span className="text-xs">
            {filterConfigs.find((f) => f.key === key)?.label}: {val}
          </span>
          <button
            onClick={() =>
              onChange({
                ...filters,
                [key]: defaultFilters[key as keyof FilterState],
              })
            }
            className="ml-0.5 rounded-full p-0.5 hover:bg-muted"
            aria-label={`Remove ${key} filter`}
          >
            <X className="size-3" />
          </button>
        </Badge>
      ))}
    </div>
  );
}
