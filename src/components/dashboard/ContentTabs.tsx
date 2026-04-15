const tabs = ["Overview", "Regions", "Markets", "Portfolio", "Programs"] as const;
export type ContentTab = (typeof tabs)[number];

interface ContentTabsProps {
  active: ContentTab;
  onChange: (tab: ContentTab) => void;
}

export function ContentTabs({ active, onChange }: ContentTabsProps) {
  return (
    <div style={{ background: "#fff", borderBottom: "1px solid #e0e0e0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "8px 24px 0" }}>
        <nav style={{ display: "flex", gap: "4px" }}>
          {tabs.map((t) => {
            const isActive = active === t;
            return (
              <button
                key={t}
                onClick={() => onChange(t)}
                style={{
                  background: isActive ? "rgba(56, 85, 179, 0.08)" : "none",
                  border: "none",
                  borderBottom: isActive ? "3px solid #3855B3" : "3px solid transparent",
                  borderRadius: isActive ? "6px 6px 0 0" : "0",
                  cursor: "pointer",
                  padding: "10px 16px",
                  fontSize: "14px",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#3855B3" : "#6b7280",
                  whiteSpace: "nowrap",
                  transition: "color 0.15s, border-color 0.15s, background 0.15s",
                }}
              >
                {t}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export { tabs as contentTabsList };
