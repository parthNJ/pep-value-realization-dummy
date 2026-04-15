import { Dropdown, Tag } from "@pepsico-ds/ui";
import type { DropdownItem } from "@pepsico-ds/ui";

export interface GlobalFilterState {
  regions: string[];
  markets: string[];
  portfolios: string[];
  timeframe: string;
  year: string;
}

export const defaultGlobalFilters: GlobalFilterState = {
  regions: [],
  markets: [],
  portfolios: [],
  timeframe: "P9 YTD",
  year: "2025",
};

function toDropdownItems(options: string[]): DropdownItem[] {
  return options.map((o) => ({ id: o, displayText: o }));
}
function fromDropdownItems(items: DropdownItem[] | undefined): string[] {
  return items?.map((i) => i.displayText) ?? [];
}
function selectedItems(options: string[], selected: string[]): DropdownItem[] {
  return options.filter((o) => selected.includes(o)).map((o) => ({ id: o, displayText: o }));
}

const timeframeOptions = ["P1 YTD","P2 YTD","P3 YTD","P4 YTD","P5 YTD","P6 YTD","P7 YTD","P8 YTD","P9 YTD","P10 YTD","P11 YTD","P12 YTD"];
const yearOptions = ["2023", "2024", "2025", "2026"];

const COL_W = "140px";
const INPUT_H = "36px";

const selectStyle: React.CSSProperties = {
  height: INPUT_H,
  padding: "0 10px",
  fontSize: "13px",
  border: "1px solid #d1d5db",
  borderRadius: "4px",
  background: "#fff",
  color: "#111827",
  cursor: "pointer",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
};
const labelStyle: React.CSSProperties = {
  fontSize: "12px", fontWeight: 500, color: "#374151", marginBottom: "4px", display: "block",
};
const MAX_CHIPS = 7;

interface GlobalFiltersProps {
  filters: GlobalFilterState;
  onChange: (f: GlobalFilterState) => void;
  regionOptions: string[];
  marketOptions: string[];
  portfolioOptions: string[];
}

export function GlobalFilters({ filters, onChange, regionOptions, marketOptions, portfolioOptions }: GlobalFiltersProps) {
  const allChips: { key: "regions" | "markets" | "portfolios"; label: string; val: string }[] = [
    ...filters.regions.map((v) => ({ key: "regions" as const, label: "Region", val: v })),
    ...filters.markets.map((v) => ({ key: "markets" as const, label: "Market", val: v })),
    ...filters.portfolios.map((v) => ({ key: "portfolios" as const, label: "Portfolio", val: v })),
  ];

  const visibleChips = allChips.slice(0, MAX_CHIPS);
  const overflowCount = allChips.length - MAX_CHIPS;

  const removeChip = (key: "regions" | "markets" | "portfolios", val: string) => {
    onChange({ ...filters, [key]: filters[key].filter((s) => s !== val) });
  };

  const clearAll = () => onChange({ ...filters, regions: [], markets: [], portfolios: [] });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <div style={{ display: "flex", gap: "12px", alignItems: "flex-end" }}>
        <div className="filter-dropdown-sm" style={{ width: COL_W, minWidth: 0 }}>
          <Dropdown label="Region" placeholder="All Regions"
            childList={toDropdownItems(regionOptions)}
            selectedValue={selectedItems(regionOptions, filters.regions)}
            setSelectedValue={(val) => onChange({ ...filters, regions: fromDropdownItems(val) })}
            selection="multiple" size="small" showFooter isClearable showLabelIcon={false} usePortal />
        </div>
        <div className="filter-dropdown-sm" style={{ width: COL_W, minWidth: 0 }}>
          <Dropdown label="Market" placeholder="All Markets"
            childList={toDropdownItems(marketOptions)}
            selectedValue={selectedItems(marketOptions, filters.markets)}
            setSelectedValue={(val) => onChange({ ...filters, markets: fromDropdownItems(val) })}
            selection="multiple" size="small" showFooter isClearable showLabelIcon={false} usePortal />
        </div>
        <div className="filter-dropdown-sm" style={{ width: COL_W, minWidth: 0 }}>
          <Dropdown label="Portfolio" placeholder="All Portfolios"
            childList={toDropdownItems(portfolioOptions)}
            selectedValue={selectedItems(portfolioOptions, filters.portfolios)}
            setSelectedValue={(val) => onChange({ ...filters, portfolios: fromDropdownItems(val) })}
            selection="multiple" size="small" showFooter isClearable showLabelIcon={false} usePortal />
        </div>
        <div style={{ width: COL_W, minWidth: 0 }}>
          <label style={labelStyle}>Timeframe</label>
          <select value={filters.timeframe} onChange={(e) => onChange({ ...filters, timeframe: e.target.value })} style={selectStyle}>
            {timeframeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div style={{ width: COL_W, minWidth: 0 }}>
          <label style={labelStyle}>Year</label>
          <select value={filters.year} onChange={(e) => onChange({ ...filters, year: e.target.value })} style={selectStyle}>
            {yearOptions.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      </div>

      {allChips.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center" }}>
          {visibleChips.map(({ key, label, val }) => (
            <Tag key={`${key}-${val}`} text={`${label}: ${val}`} size="small" isRemovable isCopyable={false} onRemove={() => removeChip(key, val)} />
          ))}
          {overflowCount > 0 && (
            <span style={{ fontSize: "12px", fontWeight: 500, color: "#3855B3", cursor: "default" }}>
              +{overflowCount} more
            </span>
          )}
          <button onClick={clearAll} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "11px", color: "#6b7280", padding: "2px 6px", marginLeft: "4px" }}>
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
