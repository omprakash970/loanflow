export default function LoadingSkeleton({ rows = 5, cols = 4 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {Array.from({ length: rows }).map((_, r) => (
        <div
          key={r}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: 12,
            padding: "14px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.03)",
          }}
        >
          {Array.from({ length: cols }).map((_, c) => (
            <div
              key={c}
              style={{
                height: 14,
                borderRadius: 6,
                background: "rgba(255,255,255,0.04)",
                animation: "skeletonPulse 1.5s ease-in-out infinite",
                animationDelay: `${(r * cols + c) * 0.05}s`,
              }}
            />
          ))}
        </div>
      ))}
      <style>{`
        @keyframes skeletonPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
