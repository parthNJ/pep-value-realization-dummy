import { cn } from "@/lib/utils";

const tabs = ["Portfolio", "Programs", "Region", "Markets"] as const;

export function TabNav({
  active,
  onChange,
}: {
  active: string;
  onChange: (tab: string) => void;
}) {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl gap-6 px-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={cn(
              "relative pb-2.5 pt-3 text-sm font-medium transition-colors",
              active === tab
                ? "text-primary after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab}
          </button>
        ))}
      </div>
    </nav>
  );
}
