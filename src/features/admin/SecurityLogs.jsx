import DashboardLayout from "../../components/layout/DashboardLayout";
import { securityLogs } from "../../data/securityLogs.mock";
import DataTable from "../../components/common/Table";

const severityColors = {
  Low:    { color: "#34d399", bg: "rgba(52,211,153,0.1)"  },
  Medium: { color: "#fb923c", bg: "rgba(251,146,60,0.1)"  },
  High:   { color: "#f87171", bg: "rgba(248,113,113,0.1)" },
};

const columns = [
  { key: "timestamp", label: "Timestamp" },
  { key: "action", label: "Action" },
  { key: "performedBy", label: "Performed By" },
  {
    key: "severity",
    label: "Severity",
    render: (val) => {
      const s = severityColors[val] || { color: "#94a3b8", bg: "rgba(148,163,184,0.1)" };
      return (
        <span
          style={{
            fontSize: "10.5px",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            padding: "3px 9px",
            borderRadius: 6,
            color: s.color,
            background: s.bg,
            border: `1px solid ${s.color}33`,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {val}
        </span>
      );
    },
  },
];

const highCount = securityLogs.filter((l) => l.severity === "High").length;
const medCount = securityLogs.filter((l) => l.severity === "Medium").length;
const lowCount = securityLogs.filter((l) => l.severity === "Low").length;

const summaryStats = [
  { title: "Total Events",   value: securityLogs.length, accent: "#f59e0b", icon: "◑" },
  { title: "High Severity",  value: highCount,           accent: "#f87171", icon: "◐" },
  { title: "Medium",         value: medCount,             accent: "#fb923c", icon: "◒" },
  { title: "Low",            value: lowCount,             accent: "#34d399", icon: "◈" },
];

export default function SecurityLogs() {
  return (
    <DashboardLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .sec-root { display:flex; flex-direction:column; gap:32px; }
        .sec-header { display:flex; flex-direction:column; gap:6px; }
        .sec-eyebrow {
          font-size:10.5px; font-weight:600; letter-spacing:0.14em;
          text-transform:uppercase; color:#f59e0b;
          font-family:'DM Sans',sans-serif;
          display:flex; align-items:center; gap:8px;
        }
        .sec-eyebrow::before { content:''; width:18px; height:1px; background:#f59e0b; opacity:0.6; }
        .sec-title { font-family:'Syne',sans-serif; font-size:28px; font-weight:800; color:#f0f4f8; letter-spacing:-0.02em; }
        .sec-sub { font-size:13.5px; font-weight:300; color:#64748b; font-family:'DM Sans',sans-serif; }

        .sec-stats { display:grid; gap:12px; grid-template-columns:repeat(4,1fr); }
        @media(max-width:800px) { .sec-stats { grid-template-columns:repeat(2,1fr); } }
        @media(max-width:480px) { .sec-stats { grid-template-columns:1fr; } }

        .sec-stat {
          background:rgba(13,20,32,0.85);
          border:1px solid rgba(255,255,255,0.06);
          border-radius:14px; padding:18px 20px 14px;
          position:relative; overflow:hidden;
          transition:border-color 0.2s, transform 0.2s, box-shadow 0.2s;
          cursor:default;
        }
        .sec-stat:hover {
          border-color:var(--ac-border);
          transform:translateY(-2px);
          box-shadow:0 12px 40px rgba(0,0,0,0.4), 0 0 20px var(--ac-glow);
        }
        .sec-stat::before {
          content:''; position:absolute; top:0; left:0; right:0; height:2px;
          background:linear-gradient(90deg,transparent,var(--ac),transparent);
          opacity:0.5; transition:opacity 0.2s;
        }
        .sec-stat:hover::before { opacity:1; }
        .sec-stat-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; }
        .sec-stat-label {
          font-size:10.5px; font-weight:600; letter-spacing:0.1em;
          text-transform:uppercase; color:#475569; font-family:'DM Sans',sans-serif;
        }
        .sec-stat-icon { font-size:15px; color:var(--ac); opacity:0.7; }
        .sec-stat-value {
          font-family:'Syne',sans-serif; font-size:28px; font-weight:800;
          color:#f0f4f8; letter-spacing:-0.02em;
        }
      `}</style>

      <div className="sec-root">
        <div className="sec-header">
          <div className="sec-eyebrow">Admin Portal</div>
          <h1 className="sec-title">Security Logs</h1>
          <p className="sec-sub">System activity events, login attempts, and administrative actions.</p>
        </div>

        {/* Summary stats */}
        <div className="sec-stats">
          {summaryStats.map((s) => (
            <div
              key={s.title}
              className="sec-stat"
              style={{ "--ac": s.accent, "--ac-border": s.accent + "44", "--ac-glow": s.accent + "18" }}
            >
              <div className="sec-stat-top">
                <span className="sec-stat-label">{s.title}</span>
                <span className="sec-stat-icon">{s.icon}</span>
              </div>
              <div className="sec-stat-value">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Logs table */}
        <DataTable
          columns={columns}
          data={securityLogs}
          filterKey="severity"
          filterOptions={["Low", "Medium", "High"]}
          pageSize={8}
        />
      </div>
    </DashboardLayout>
  );
}
