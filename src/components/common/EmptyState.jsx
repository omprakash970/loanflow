export default function EmptyState({ title = "No data found", message = "There are no records to display.", icon = "◇" }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 20px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 14,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          color: "#334155",
          marginBottom: 16,
        }}
      >
        {icon}
      </div>
      <p
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 16,
          fontWeight: 700,
          color: "#475569",
          marginBottom: 6,
        }}
      >
        {title}
      </p>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          fontWeight: 300,
          color: "#334155",
        }}
      >
        {message}
      </p>
    </div>
  );
}
