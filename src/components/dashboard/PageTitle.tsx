interface PageTitleProps {
  title: string;
  lastUpdated?: string;
}

export function PageTitle({ title, lastUpdated }: PageTitleProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <h1 style={{ fontSize: "18px", fontWeight: 700, margin: 0 }}>{title}</h1>
      {lastUpdated && (
        <span style={{ fontSize: "13px", color: "#6b7280", whiteSpace: "nowrap" }}>
          Last Updated: {lastUpdated}
        </span>
      )}
    </div>
  );
}
