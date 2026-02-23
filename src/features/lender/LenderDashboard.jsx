import DashboardLayout from "../../components/layout/DashboardLayout";

const stats = [
  { title: "Total Disbursed",    value: "$3.2M",  meta: "+$240K this month",   icon: "◈", accent: "#2dd4bf" },
  { title: "Active Loans",       value: "142",    meta: "Across 38 borrowers", icon: "◉", accent: "#818cf8" },
  { title: "Avg Loan Size",      value: "$22.5K", meta: "Up from $19.8K",     icon: "◐", accent: "#fb923c" },
  { title: "Collections Due",    value: "$84K",   meta: "This month",          icon: "◑", accent: "#f59e0b" },
  { title: "Default Exposure",   value: "$11K",   meta: "2 at-risk loans",     icon: "◒", accent: "#f87171" },
  { title: "Repayment Rate",     value: "97.4%",  meta: "30-day rolling",      icon: "⬡", accent: "#34d399" },
];

const recentLoans = [
  { borrower: "Arjun Mehta",  amount: "$35,000", term: "36mo", rate: "11.5%", status: "active",  date: "Feb 18" },
  { borrower: "Keiko Tanaka", amount: "$18,000", term: "24mo", rate: "10.0%", status: "active",  date: "Feb 14" },
  { borrower: "Marcus Webb",  amount: "$52,000", term: "48mo", rate: "12.2%", status: "review",  date: "Feb 10" },
  { borrower: "Priya Nair",   amount: "$9,500",  term: "12mo", rate: "9.5%",  status: "active",  date: "Jan 28" },
  { borrower: "Omar Hassan",  amount: "$27,000", term: "36mo", rate: "11.0%", status: "overdue", date: "Jan 15" },
];

const collections = [
  { borrower: "Keiko Tanaka", due: "Feb 28", amount: "$812", status: "on-track" },
  { borrower: "Arjun Mehta",  due: "Mar 1",  amount: "$1,104", status: "on-track" },
  { borrower: "Omar Hassan",  due: "Feb 24", amount: "$872",  status: "overdue" },
  { borrower: "Priya Nair",   due: "Mar 5",  amount: "$864",  status: "on-track" },
];

const statusMap = {
  active:  { color: "#34d399", bg: "rgba(52,211,153,0.1)",  label: "Active"  },
  review:  { color: "#fb923c", bg: "rgba(251,146,60,0.1)",  label: "Review"  },
  overdue: { color: "#f87171", bg: "rgba(248,113,113,0.1)", label: "Overdue" },
};
const collMap = {
  "on-track": { color: "#34d399", label: "On Track" },
  overdue:    { color: "#f87171", label: "Overdue"  },
};

export default function LenderDashboard() {
  return (
      <DashboardLayout>
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .ln-root { display:flex; flex-direction:column; gap:32px; }
        .ln-header { display:flex; flex-direction:column; gap:6px; }
        .ln-eyebrow { font-size:10.5px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color:#2dd4bf; font-family:'DM Sans',sans-serif; display:flex; align-items:center; gap:8px; }
        .ln-eyebrow::before { content:''; width:18px; height:1px; background:#2dd4bf; opacity:0.6; }
        .ln-title { font-family:'Syne',sans-serif; font-size:28px; font-weight:800; color:#f0f4f8; letter-spacing:-0.02em; }
        .ln-sub { font-size:13.5px; font-weight:300; color:#64748b; font-family:'DM Sans',sans-serif; }

        /* KPI banner */
        .kpi-banner { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.06); border-radius:14px; overflow:hidden; }
        @media(max-width:600px) { .kpi-banner { grid-template-columns:1fr; } }
        .kpi-cell { background:rgba(13,20,32,0.9); padding:18px 24px; }
        .kpi-label { font-size:10.5px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:#475569; font-family:'DM Sans',sans-serif; margin-bottom:6px; }
        .kpi-val { font-family:'Syne',sans-serif; font-size:24px; font-weight:800; color:#f0f4f8; margin-bottom:4px; }
        .kpi-meta { font-size:11.5px; color:#334155; font-family:'DM Sans',sans-serif; }

        /* Stats */
        .ln-stats { display:grid; gap:12px; grid-template-columns:repeat(3,1fr); }
        @media(max-width:900px) { .ln-stats { grid-template-columns:repeat(2,1fr); } }
        @media(max-width:560px) { .ln-stats { grid-template-columns:1fr; } }

        .lstat { background:rgba(13,20,32,0.85); border:1px solid rgba(255,255,255,0.06); border-radius:14px; padding:18px 20px 14px; position:relative; overflow:hidden; transition:border-color 0.2s,transform 0.2s,box-shadow 0.2s; cursor:default; }
        .lstat:hover { border-color:var(--ac-b); transform:translateY(-2px); box-shadow:0 12px 36px rgba(0,0,0,0.4),0 0 18px var(--ac-g); }
        .lstat::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,var(--ac),transparent); opacity:0.4; transition:opacity 0.2s; }
        .lstat:hover::before { opacity:1; }
        .lstat-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; }
        .lstat-label { font-size:10.5px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:#475569; font-family:'DM Sans',sans-serif; }
        .lstat-icon { font-size:15px; color:var(--ac); opacity:0.7; }
        .lstat-value { font-family:'Syne',sans-serif; font-size:26px; font-weight:800; color:#f0f4f8; letter-spacing:-0.02em; margin-bottom:5px; }
        .lstat-meta { font-size:12px; font-weight:300; color:#334155; font-family:'DM Sans',sans-serif; }

        /* Bottom */
        .ln-bottom { display:grid; grid-template-columns:1fr 300px; gap:16px; }
        @media(max-width:900px) { .ln-bottom { grid-template-columns:1fr; } }

        .panel { background:rgba(13,20,32,0.85); border:1px solid rgba(255,255,255,0.06); border-radius:14px; overflow:hidden; }
        .panel-head { padding:16px 20px 12px; border-bottom:1px solid rgba(255,255,255,0.05); display:flex; justify-content:space-between; align-items:center; }
        .panel-title { font-family:'Syne',sans-serif; font-size:14px; font-weight:700; color:#f0f4f8; }
        .panel-sub { font-size:10.5px; color:#2e3f52; font-family:'DM Sans',sans-serif; text-transform:uppercase; letter-spacing:0.08em; }

        /* Loan table */
        .loan-row { display:flex; align-items:center; gap:10px; padding:10px 20px; border-bottom:1px solid rgba(255,255,255,0.03); transition:background 0.15s; }
        .loan-row:last-child { border-bottom:none; }
        .loan-row:hover { background:rgba(255,255,255,0.02); }
        .loan-avatar { width:30px; height:30px; border-radius:8px; background:rgba(45,212,191,0.08); border:1px solid rgba(45,212,191,0.15); display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; color:#2dd4bf; flex-shrink:0; font-family:'Syne',sans-serif; }
        .loan-name { font-size:13px; font-weight:500; color:#e2e8f0; font-family:'DM Sans',sans-serif; }
        .loan-meta { font-size:11px; color:#475569; font-family:'DM Sans',sans-serif; }
        .loan-details { display:flex; gap:12px; margin-left:auto; align-items:center; flex-shrink:0; }
        .loan-amount { font-family:'Syne',sans-serif; font-size:13px; font-weight:700; color:#f0f4f8; }
        .loan-rate { font-size:11px; color:#475569; font-family:'DM Sans',sans-serif; }
        .loan-status { font-size:9.5px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; padding:3px 8px; border-radius:6px; }

        /* Collections */
        .coll-row { display:flex; align-items:center; gap:10px; padding:11px 20px; border-bottom:1px solid rgba(255,255,255,0.03); }
        .coll-row:last-child { border-bottom:none; }
        .coll-name { font-size:12.5px; font-weight:400; color:#cbd5e1; font-family:'DM Sans',sans-serif; flex:1; }
        .coll-due { font-size:11px; color:#475569; font-family:'DM Sans',sans-serif; }
        .coll-amount { font-family:'Syne',sans-serif; font-size:13px; font-weight:700; color:#f0f4f8; }
        .coll-dot { width:7px; height:7px; border-radius:50%; flex-shrink:0; }
      `}</style>

        <div className="ln-root">
          <div className="ln-header">
            <div className="ln-eyebrow">Lender Portal</div>
            <h1 className="ln-title">Loan Portfolio</h1>
            <p className="ln-sub">Active loans, collections, repayment tracking, and risk overview.</p>
          </div>

          {/* KPI banner */}
          <div className="kpi-banner">
            <div className="kpi-cell">
              <div className="kpi-label">Portfolio Health</div>
              <div className="kpi-val" style={{ color: "#34d399" }}>Healthy</div>
              <div className="kpi-meta">97.4% repayment rate</div>
            </div>
            <div className="kpi-cell">
              <div className="kpi-label">New This Month</div>
              <div className="kpi-val">8 loans</div>
              <div className="kpi-meta">+$240K disbursed</div>
            </div>
            <div className="kpi-cell">
              <div className="kpi-label">Pending Review</div>
              <div className="kpi-val" style={{ color: "#fb923c" }}>3 apps</div>
              <div className="kpi-meta">1 high-value flagged</div>
            </div>
          </div>

          {/* Stats */}
          <div className="ln-stats">
            {stats.map((s) => (
                <div
                    key={s.title}
                    className="lstat"
                    style={{ "--ac": s.accent, "--ac-b": s.accent + "44", "--ac-g": s.accent + "18" }}
                >
                  <div className="lstat-head">
                    <span className="lstat-label">{s.title}</span>
                    <span className="lstat-icon">{s.icon}</span>
                  </div>
                  <div className="lstat-value">{s.value}</div>
                  <div className="lstat-meta">{s.meta}</div>
                </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="ln-bottom">
            {/* Recent loans */}
            <div className="panel">
              <div className="panel-head">
                <span className="panel-title">Recent Loans</span>
                <span className="panel-sub">142 active</span>
              </div>
              {recentLoans.map((l) => {
                const st = statusMap[l.status];
                return (
                    <div key={l.borrower} className="loan-row">
                      <div className="loan-avatar">{l.borrower.split(" ").map(n=>n[0]).join("")}</div>
                      <div>
                        <div className="loan-name">{l.borrower}</div>
                        <div className="loan-meta">{l.term} · {l.date}</div>
                      </div>
                      <div className="loan-details">
                        <div style={{ textAlign: "right" }}>
                          <div className="loan-amount">{l.amount}</div>
                          <div className="loan-rate">{l.rate} APR</div>
                        </div>
                        <span className="loan-status" style={{ color: st.color, background: st.bg }}>{st.label}</span>
                      </div>
                    </div>
                );
              })}
            </div>

            {/* Collections */}
            <div className="panel">
              <div className="panel-head">
                <span className="panel-title">Collections</span>
                <span className="panel-sub">This week</span>
              </div>
              {collections.map((c) => {
                const cm = collMap[c.status];
                return (
                    <div key={c.borrower} className="coll-row">
                      <div style={{ flex: 1 }}>
                        <div className="coll-name">{c.borrower}</div>
                        <div className="coll-due">Due {c.due}</div>
                      </div>
                      <div className="coll-amount">{c.amount}</div>
                      <div className="coll-dot" style={{ background: cm.color, boxShadow: `0 0 6px ${cm.color}` }} />
                    </div>
                );
              })}
            </div>
          </div>
        </div>
      </DashboardLayout>
  );
}