import DashboardLayout from "../../components/layout/DashboardLayout";

const reports = [
  { name: "Risk Assessment — Q4 2025", type: "PDF", date: "Jan 15, 2026", size: "2.4 MB" },
  { name: "Portfolio Overview — 2025", type: "XLSX", date: "Jan 10, 2026", size: "1.8 MB" },
  { name: "Default Probability Report", type: "PDF", date: "Dec 28, 2025", size: "3.1 MB" },
  { name: "Borrower Cohort Analysis", type: "CSV", date: "Dec 20, 2025", size: "840 KB" },
  { name: "Monthly Trend Summary", type: "PDF", date: "Dec 01, 2025", size: "1.2 MB" },
];

const handleExport = (name) => {
  alert(`Export started: "${name}" (UI-only demo)`);
};

export default function Exports() {
  return (
    <DashboardLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .exp-root { display:flex; flex-direction:column; gap:32px; }
        .exp-header { display:flex; flex-direction:column; gap:6px; }
        .exp-eyebrow {
          font-size:10.5px; font-weight:600; letter-spacing:0.14em;
          text-transform:uppercase; color:#34d399;
          font-family:'DM Sans',sans-serif;
          display:flex; align-items:center; gap:8px;
        }
        .exp-eyebrow::before { content:''; width:18px; height:1px; background:#34d399; opacity:0.6; }
        .exp-title { font-family:'Syne',sans-serif; font-size:28px; font-weight:800; color:#f0f4f8; letter-spacing:-0.02em; }
        .exp-sub { font-size:13.5px; font-weight:300; color:#64748b; font-family:'DM Sans',sans-serif; }

        .exp-panel {
          background:rgba(13,20,32,0.85);
          border:1px solid rgba(255,255,255,0.06);
          border-radius:14px; overflow:hidden;
        }
        .exp-row {
          display:flex; align-items:center; gap:16px;
          padding:16px 20px;
          border-bottom:1px solid rgba(255,255,255,0.03);
          transition:background 0.12s;
        }
        .exp-row:last-child { border-bottom:none; }
        .exp-row:hover { background:rgba(255,255,255,0.02); }
        .exp-icon {
          width:38px; height:38px; border-radius:10px;
          display:flex; align-items:center; justify-content:center;
          font-size:11px; font-weight:700; font-family:'Syne',sans-serif;
          flex-shrink:0;
        }
        .exp-info { flex:1; }
        .exp-name { font-size:13.5px; font-weight:500; color:#e2e8f0; font-family:'DM Sans',sans-serif; margin-bottom:2px; }
        .exp-meta { font-size:11px; color:#475569; font-family:'DM Sans',sans-serif; }
        .exp-btn {
          font-family:'DM Sans',sans-serif; font-size:11.5px; font-weight:500;
          color:#34d399; background:rgba(52,211,153,0.08);
          border:1px solid rgba(52,211,153,0.2);
          border-radius:8px; padding:6px 14px;
          cursor:pointer; transition:all 0.15s;
        }
        .exp-btn:hover {
          background:rgba(52,211,153,0.14);
          border-color:rgba(52,211,153,0.35);
        }
      `}</style>

      <div className="exp-root">
        <div className="exp-header">
          <div className="exp-eyebrow">Analyst Portal</div>
          <h1 className="exp-title">Exports</h1>
          <p className="exp-sub">Download generated reports and data exports.</p>
        </div>

        <div className="exp-panel">
          {reports.map((r) => {
            const typeColor = r.type === "PDF" ? "#f87171" : r.type === "XLSX" ? "#34d399" : "#38bdf8";
            return (
              <div key={r.name} className="exp-row">
                <div
                  className="exp-icon"
                  style={{ color: typeColor, background: typeColor + "14", border: `1px solid ${typeColor}33` }}
                >
                  {r.type}
                </div>
                <div className="exp-info">
                  <div className="exp-name">{r.name}</div>
                  <div className="exp-meta">{r.date} · {r.size}</div>
                </div>
                <button type="button" className="exp-btn" onClick={() => handleExport(r.name)}>
                  Download
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
