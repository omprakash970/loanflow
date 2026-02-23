import DashboardLayout from "../../components/layout/DashboardLayout";
import { emiSchedule } from "../../data/emi.mock";

const statusCfg = {
  Paid:     { color:"#34d399", bg:"rgba(52,211,153,0.1)",  border:"rgba(52,211,153,0.25)"  },
  Upcoming: { color:"#f59e0b", bg:"rgba(245,158,11,0.1)",  border:"rgba(245,158,11,0.25)"  },
  Pending:  { color:"#475569", bg:"rgba(71,85,105,0.08)",  border:"rgba(71,85,105,0.15)"   },
};

export default function EmiSchedule() {
  const paid    = emiSchedule.filter(e => e.status === "Paid").length;
  const total   = emiSchedule.length;
  const paidPct = Math.round((paid / total) * 100);
  const upcoming = emiSchedule.find(e => e.status === "Upcoming");

  return (
      <DashboardLayout>
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .emi-root { display:flex; flex-direction:column; gap:28px; }
        .emi-eyebrow { font-size:10.5px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color:#818cf8; font-family:'DM Sans',sans-serif; display:flex; align-items:center; gap:8px; }
        .emi-eyebrow::before { content:''; width:18px; height:1px; background:#818cf8; opacity:0.6; }
        .emi-title { font-family:'Syne',sans-serif; font-size:28px; font-weight:800; color:#f0f4f8; letter-spacing:-0.02em; }
        .emi-sub { font-size:13.5px; font-weight:300; color:#64748b; font-family:'DM Sans',sans-serif; }

        /* Progress banner */
        .emi-progress-banner {
          background:rgba(129,140,248,0.06); border:1px solid rgba(129,140,248,0.18);
          border-radius:14px; padding:20px 24px; display:flex; align-items:center; gap:32px; flex-wrap:wrap;
        }
        .prog-left { flex:1; min-width:200px; }
        .prog-label { font-size:10.5px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:#818cf8; font-family:'DM Sans',sans-serif; margin-bottom:10px; }
        .prog-track { height:6px; background:rgba(255,255,255,0.06); border-radius:6px; overflow:hidden; width:100%; }
        .prog-fill { height:100%; border-radius:6px; background:linear-gradient(90deg,#818cf8,#6366f1); box-shadow:0 0 12px rgba(129,140,248,0.35); transition:width 0.6s ease; }
        .prog-info { font-size:12px; color:#475569; font-family:'DM Sans',sans-serif; margin-top:7px; }
        .prog-stats { display:flex; gap:24px; flex-shrink:0; }
        .prog-stat { text-align:center; }
        .prog-stat-val { font-family:'Syne',sans-serif; font-size:22px; font-weight:800; }
        .prog-stat-label { font-size:11px; color:#475569; font-family:'DM Sans',sans-serif; margin-top:3px; }

        /* Table */
        .emi-table-wrap { border:1px solid rgba(255,255,255,0.06); border-radius:14px; overflow:hidden; }
        table.emi-table { width:100%; border-collapse:collapse; }
        .emi-table thead tr { background:rgba(13,20,32,0.95); border-bottom:1px solid rgba(255,255,255,0.06); }
        .emi-table th { padding:13px 18px; font-size:10px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:#334155; font-family:'DM Sans',sans-serif; text-align:left; }
        .emi-table tbody tr { border-bottom:1px solid rgba(255,255,255,0.03); background:rgba(13,20,32,0.6); transition:background 0.15s; }
        .emi-table tbody tr.is-paid { opacity:0.55; }
        .emi-table tbody tr.is-upcoming { background:rgba(129,140,248,0.04); }
        .emi-table tbody tr:last-child { border-bottom:none; }
        .emi-table tbody tr:hover { background:rgba(129,140,248,0.05); }
        .emi-table td { padding:12px 18px; font-size:13px; font-family:'DM Sans',sans-serif; }
        .td-month { font-family:'Syne',sans-serif; font-weight:700; color:#94a3b8; font-size:12px; }
        .td-amt { font-family:'Syne',sans-serif; font-weight:700; color:#f0f4f8; }
        .td-num { color:#64748b; font-weight:300; font-size:12.5px; }
        .td-bal { color:#475569; font-weight:300; font-size:12px; }
        .s-pill { display:inline-flex; align-items:center; gap:5px; font-size:10px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; padding:4px 9px; border-radius:20px; font-family:'DM Sans',sans-serif; }
        .s-dot { width:5px; height:5px; border-radius:50%; }
      `}</style>

        <div className="emi-root">
          <div>
            <div className="emi-eyebrow">Borrower Portal</div>
            <h1 className="emi-title">EMI Schedule</h1>
            <p className="emi-sub">Loan LN-1001 · Repayment timeline and installment breakdown.</p>
          </div>

          {/* Progress banner */}
          <div className="emi-progress-banner">
            <div className="prog-left">
              <div className="prog-label">Repayment Progress</div>
              <div className="prog-track">
                <div className="prog-fill" style={{ width:`${paidPct}%` }} />
              </div>
              <div className="prog-info">{paid} of {total} EMIs paid · {paidPct}% complete</div>
            </div>
            <div className="prog-stats">
              <div className="prog-stat">
                <div className="prog-stat-val" style={{ color:"#34d399" }}>{paid}</div>
                <div className="prog-stat-label">Paid</div>
              </div>
              <div className="prog-stat">
                <div className="prog-stat-val" style={{ color:"#475569" }}>{total - paid}</div>
                <div className="prog-stat-label">Remaining</div>
              </div>
              {upcoming && (
                  <div className="prog-stat">
                    <div className="prog-stat-val" style={{ color:"#f59e0b" }}>${upcoming.emiAmount.toLocaleString()}</div>
                    <div className="prog-stat-label">Next EMI</div>
                  </div>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="emi-table-wrap">
            <table className="emi-table">
              <thead>
              <tr>
                <th>Month</th>
                <th>EMI</th>
                <th>Principal</th>
                <th>Interest</th>
                <th>Balance</th>
                <th>Status</th>
              </tr>
              </thead>
              <tbody>
              {emiSchedule.map(emi => {
                const s = statusCfg[emi.status] ?? statusCfg.Pending;
                return (
                    <tr key={emi.month} className={emi.status === "Paid" ? "is-paid" : emi.status === "Upcoming" ? "is-upcoming" : ""}>
                      <td><span className="td-month">{emi.month}</span></td>
                      <td><span className="td-amt">${emi.emiAmount.toLocaleString()}</span></td>
                      <td><span className="td-num">${emi.principal.toLocaleString()}</span></td>
                      <td><span className="td-num">${emi.interest.toLocaleString()}</span></td>
                      <td><span className="td-bal">${emi.balance.toLocaleString()}</span></td>
                      <td>
                      <span className="s-pill" style={{ color:s.color, background:s.bg, border:`1px solid ${s.border}` }}>
                        <span className="s-dot" style={{ background:s.color, boxShadow:`0 0 5px ${s.color}` }} />
                        {emi.status}
                      </span>
                      </td>
                    </tr>
                );
              })}
              </tbody>
            </table>
          </div>
        </div>
      </DashboardLayout>
  );
}