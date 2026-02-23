import DashboardLayout from "../../components/layout/DashboardLayout";

const stats = [
	{ title: "Total Loans Issued", value: "$8.4M",  meta: "+6.2% vs last month",  icon: "◈", accent: "#f59e0b", trend: "up" },
	{ title: "Active Borrowers",   value: "1,284",  meta: "+120 new this week",    icon: "◉", accent: "#2dd4bf", trend: "up" },
	{ title: "Delinquency Rate",   value: "2.1%",   meta: "Down 0.4%",            icon: "◐", accent: "#34d399", trend: "down-good" },
	{ title: "Platform Users",     value: "3,421",  meta: "Across 4 roles",       icon: "◑", accent: "#818cf8", trend: "neutral" },
	{ title: "Pending Approvals",  value: "47",     meta: "12 flagged",           icon: "◒", accent: "#f87171", trend: "warn" },
	{ title: "Monthly Revenue",    value: "$142K",  meta: "+18% from last month", icon: "⬡", accent: "#fb923c", trend: "up" },
];

const recentActivity = [
	{ user: "Sarah K.",   action: "Loan approved",          amount: "$24,000", time: "2m ago",  status: "success" },
	{ user: "Marc D.",    action: "Payment overdue",         amount: "$1,200",  time: "18m ago", status: "warn" },
	{ user: "Priya M.",   action: "New account created",     amount: "—",       time: "1h ago",  status: "info" },
	{ user: "James T.",   action: "Loan application flagged",amount: "$85,000", time: "2h ago",  status: "error" },
	{ user: "Liu W.",     action: "EMI paid",                amount: "$3,400",  time: "3h ago",  status: "success" },
];

const roleBreakdown = [
	{ role: "Borrower", count: 2104, pct: 61, color: "#818cf8" },
	{ role: "Lender",   count: 847,  pct: 25, color: "#2dd4bf" },
	{ role: "Analyst",  count: 312,  pct: 9,  color: "#34d399" },
	{ role: "Admin",    count: 158,  pct: 5,  color: "#f59e0b" },
];

const statusMap = {
	success: { dot: "#34d399", bg: "rgba(52,211,153,0.1)",  label: "Approved" },
	warn:    { dot: "#f59e0b", bg: "rgba(245,158,11,0.1)",  label: "Overdue"  },
	info:    { dot: "#818cf8", bg: "rgba(129,140,248,0.1)", label: "New"      },
	error:   { dot: "#f87171", bg: "rgba(248,113,113,0.1)", label: "Flagged"  },
};

export default function AdminDashboard() {
	return (
		<DashboardLayout>
			<style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .adm-root { display:flex; flex-direction:column; gap:32px; }
        .adm-header { display:flex; flex-direction:column; gap:6px; }
        .adm-eyebrow {
          font-size:10.5px; font-weight:600; letter-spacing:0.14em;
          text-transform:uppercase; color:#f59e0b;
          font-family:'DM Sans',sans-serif;
          display:flex; align-items:center; gap:8px;
        }
        .adm-eyebrow::before {
          content:''; width:18px; height:1px; background:#f59e0b; opacity:0.6;
        }
        .adm-title {
          font-family:'Syne',sans-serif; font-size:28px; font-weight:800;
          color:#f0f4f8; letter-spacing:-0.02em; line-height:1.1;
        }
        .adm-sub { font-size:13.5px; font-weight:300; color:#64748b; font-family:'DM Sans',sans-serif; }

        /* Stat grid */
        .adm-stats { display:grid; gap:12px; grid-template-columns:repeat(3,1fr); }
        @media(max-width:900px) { .adm-stats { grid-template-columns:repeat(2,1fr); } }
        @media(max-width:560px) { .adm-stats { grid-template-columns:1fr; } }

        .stat-card {
          background:rgba(13,20,32,0.85);
          border:1px solid rgba(255,255,255,0.06);
          border-radius:14px; padding:20px 20px 16px;
          position:relative; overflow:hidden;
          transition:border-color 0.2s, transform 0.2s, box-shadow 0.2s;
          cursor:default;
        }
        .stat-card:hover {
          border-color:var(--ac-border);
          transform:translateY(-2px);
          box-shadow:0 12px 40px rgba(0,0,0,0.4), 0 0 20px var(--ac-glow);
        }
        .stat-card::before {
          content:''; position:absolute; top:0; left:0; right:0; height:2px;
          background:linear-gradient(90deg,transparent,var(--ac),transparent);
          opacity:0.5; transition:opacity 0.2s;
        }
        .stat-card:hover::before { opacity:1; }
        .stat-top { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; }
        .stat-label {
          font-size:10.5px; font-weight:600; letter-spacing:0.1em;
          text-transform:uppercase; color:#475569;
          font-family:'DM Sans',sans-serif;
        }
        .stat-icon { font-size:16px; color:var(--ac); opacity:0.7; }
        .stat-value {
          font-family:'Syne',sans-serif; font-size:30px; font-weight:800;
          color:#f0f4f8; letter-spacing:-0.02em; margin-bottom:8px;
        }
        .stat-meta {
          font-size:12px; font-weight:300; color:#334155;
          font-family:'DM Sans',sans-serif;
        }
        .stat-trend { display:inline-flex; align-items:center; gap:4px; font-size:11px; font-weight:500; padding:2px 7px; border-radius:20px; margin-top:6px; }
        .trend-up    { color:#34d399; background:rgba(52,211,153,0.1); }
        .trend-down  { color:#f87171; background:rgba(248,113,113,0.1); }
        .trend-good  { color:#34d399; background:rgba(52,211,153,0.1); }
        .trend-warn  { color:#f59e0b; background:rgba(245,158,11,0.1); }

        /* Bottom row */
        .adm-bottom { display:grid; grid-template-columns:1fr 340px; gap:16px; }
        @media(max-width:900px) { .adm-bottom { grid-template-columns:1fr; } }

        .panel {
          background:rgba(13,20,32,0.85);
          border:1px solid rgba(255,255,255,0.06);
          border-radius:14px; overflow:hidden;
        }
        .panel-head {
          padding:16px 20px 12px;
          border-bottom:1px solid rgba(255,255,255,0.05);
          display:flex; align-items:center; justify-content:space-between;
        }
        .panel-title {
          font-family:'Syne',sans-serif; font-size:14px; font-weight:700; color:#f0f4f8;
        }
        .panel-badge {
          font-size:10px; font-weight:600; letter-spacing:0.08em;
          text-transform:uppercase; padding:3px 8px; border-radius:6px;
          color:#64748b; background:rgba(255,255,255,0.04); font-family:'DM Sans',sans-serif;
        }

        /* Activity list */
        .act-row {
          display:flex; align-items:center; gap:12px;
          padding:12px 20px;
          border-bottom:1px solid rgba(255,255,255,0.03);
          transition:background 0.15s;
        }
        .act-row:last-child { border-bottom:none; }
        .act-row:hover { background:rgba(255,255,255,0.02); }
        .act-avatar {
          width:32px; height:32px; border-radius:8px;
          display:flex; align-items:center; justify-content:center;
          font-size:11px; font-weight:700; flex-shrink:0;
          font-family:'Syne',sans-serif;
          background:rgba(255,255,255,0.05);
          color:#94a3b8;
        }
        .act-info { flex:1; }
        .act-user { font-size:13px; font-weight:500; color:#e2e8f0; font-family:'DM Sans',sans-serif; }
        .act-action { font-size:11.5px; color:#475569; font-weight:300; font-family:'DM Sans',sans-serif; }
        .act-right { text-align:right; flex-shrink:0; }
        .act-amount { font-size:12px; font-weight:600; color:#94a3b8; font-family:'Syne',sans-serif; }
        .act-time { font-size:10.5px; color:#2e3f52; font-family:'DM Sans',sans-serif; margin-top:2px; }
        .act-dot {
          width:7px; height:7px; border-radius:50%; flex-shrink:0;
        }

        /* Role breakdown */
        .role-row { padding:12px 20px; border-bottom:1px solid rgba(255,255,255,0.03); }
        .role-row:last-child { border-bottom:none; }
        .role-info { display:flex; justify-content:space-between; margin-bottom:7px; align-items:center; }
        .role-name { font-size:12.5px; font-weight:500; color:#cbd5e1; font-family:'DM Sans',sans-serif; }
        .role-count { font-size:12px; font-weight:600; color:#94a3b8; font-family:'Syne',sans-serif; }
        .role-bar-bg { height:4px; background:rgba(255,255,255,0.05); border-radius:4px; overflow:hidden; }
        .role-bar { height:100%; border-radius:4px; transition:width 0.6s ease; }
      `}</style>

			<div className="adm-root">
				{/* Header */}
				<div className="adm-header">
					<div className="adm-eyebrow">Admin Portal</div>
					<h1 className="adm-title">System Dashboard</h1>
					<p className="adm-sub">Platform-wide activity, compliance, and user management overview.</p>
				</div>

				{/* Stat cards */}
				<div className="adm-stats">
					{stats.map((s) => (
						<div
							key={s.title}
							className="stat-card"
							style={{ "--ac": s.accent, "--ac-border": s.accent + "44", "--ac-glow": s.accent + "18" }}
						>
							<div className="stat-top">
								<span className="stat-label">{s.title}</span>
								<span className="stat-icon">{s.icon}</span>
							</div>
							<div className="stat-value">{s.value}</div>
							<div className="stat-meta">{s.meta}</div>
							{s.trend === "up" && <div className="stat-trend trend-up">↑ Increasing</div>}
							{s.trend === "down-good" && <div className="stat-trend trend-good">↓ Improving</div>}
							{s.trend === "warn" && <div className="stat-trend trend-warn">⚠ Attention</div>}
						</div>
					))}
				</div>

				{/* Bottom row */}
				<div className="adm-bottom">
					{/* Activity feed */}
					<div className="panel">
						<div className="panel-head">
							<span className="panel-title">Recent Activity</span>
							<span className="panel-badge">Live</span>
						</div>
						{recentActivity.map((a) => {
							const s = statusMap[a.status];
							return (
								<div key={a.user + a.time} className="act-row">
									<div className="act-avatar">{a.user.slice(0,2)}</div>
									<div className="act-info">
										<div className="act-user">{a.user}</div>
										<div className="act-action">{a.action}</div>
									</div>
									<div className="act-right">
										<div className="act-amount">{a.amount}</div>
										<div className="act-time">{a.time}</div>
									</div>
									<div className="act-dot" style={{ background: s.dot, boxShadow: `0 0 6px ${s.dot}` }} />
								</div>
							);
						})}
					</div>

					{/* Role breakdown */}
					<div className="panel">
						<div className="panel-head">
							<span className="panel-title">User Roles</span>
							<span className="panel-badge">3,421 total</span>
						</div>
						{roleBreakdown.map((r) => (
							<div key={r.role} className="role-row">
								<div className="role-info">
									<span className="role-name">{r.role}</span>
									<span className="role-count" style={{ color: r.color }}>{r.count.toLocaleString()}</span>
								</div>
								<div className="role-bar-bg">
									<div className="role-bar" style={{ width: `${r.pct}%`, background: r.color }} />
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}