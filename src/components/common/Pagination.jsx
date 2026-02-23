export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", paddingTop: "16px" }}>
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          padding: "6px 12px",
          fontSize: "12px",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
          color: currentPage === 1 ? "rgba(45,62,84,1)" : "#94a3b8",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "8px",
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
          transition: "all 0.15s",
        }}
      >
        ← Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onPageChange(p)}
          style={{
            width: "32px",
            height: "32px",
            fontSize: "12px",
            fontFamily: "'Syne', sans-serif",
            fontWeight: p === currentPage ? 700 : 500,
            color: p === currentPage ? "#f0f4f8" : "#475569",
            background: p === currentPage ? "rgba(45,212,191,0.12)" : "transparent",
            border: p === currentPage ? "1px solid rgba(45,212,191,0.25)" : "1px solid transparent",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.15s",
          }}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          padding: "6px 12px",
          fontSize: "12px",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
          color: currentPage === totalPages ? "rgba(45,62,84,1)" : "#94a3b8",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "8px",
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          transition: "all 0.15s",
        }}
      >
        Next →
      </button>
    </div>
  );
}
