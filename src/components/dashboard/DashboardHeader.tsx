import { useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/pepsico-resized.svg";

const topTabs = [
  { label: "Overview", path: "/" },
  { label: "S&T Enabled Benefits", path: "/benefits" },
  { label: "GCC Business Case", path: "/gcc" },
  { label: "S&T Base Productivity", path: "/productivity" },
] as const;

export function DashboardHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;
  const isActive = (path: string) =>
    path === "/" ? currentPath === "/" || currentPath === "" : currentPath.startsWith(path);

  return (
    <header
      style={{
        background: "#3855B3",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        height: "48px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <img
          src={logo}
          alt="PepsiCo"
          style={{ height: "28px", width: "auto", filter: "brightness(0) invert(1)" }}
        />
        <nav style={{ display: "flex", gap: "4px" }}>
          {topTabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => navigate(tab.path)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "6px 12px",
                fontSize: "14px",
                fontWeight: isActive(tab.path) ? 700 : 400,
                color: isActive(tab.path) ? "#FFFFFF" : "rgba(255,255,255,0.7)",
                whiteSpace: "nowrap",
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
