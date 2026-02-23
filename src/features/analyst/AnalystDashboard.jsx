import DashboardLayout from "../../components/layout/DashboardLayout";

const stats = [
	{ title: "Default Probability", value: "1.9%",  meta: "Stable for 30 days",       icon: "◈", accent: "#34d399" },
	{ title: "Portfolio Exposure",  value: "$5.1M",  meta: "Across 6 segments",        icon: "◉", accent: "#2dd4bf" },
	{ title: "Active Alerts",       value: "12",     meta: "3 high-priority",          icon: "◐", accent: "#f87171" },
	{ title: "Avg Risk Score",      value: "68",     meta: "Moderate band",            icon: "◑", accent: "#fb923c" },
	{ title: "Cohorts Tracked",     value: "24",     meta: "Q1 2024 – Q4 2025",       icon: "◒", accent: "#818cf8" },
	{ title: "Reports Generated",   value: "156",    meta: "18 this month",            icon: "⬡", accent: "#38bdf8" },
];

const riskSegments = [
	{ label: "Low Risk",      pct: 42, count: 538, color: "#34d399" },
	{ label: "Moderate",      pct: 35, count: 449, color: "#fb923c" },
	{ label: "High Risk",     pct: 15, count: 192, color: "#f87171" },
	{ label: "Critical",      pct: 8,  count: 103, color: "#e11d48" },
];

const alerts = [
	{ id: "ALT-091", msg: "Credit utilization spike — Liu W.", severity: "high",   time: "5m ago"  },
	{ id: "ALT-090", msg: "Missed 3 consecutive EMIs — Raj P.", severity: "high",  time: "42m ago" },
	{ id: "ALT-089", msg: "Score drop >40pts — Fatima A.",     severity: "med",   time: "2h ago"  },
	{ id: "ALT-088", msg: "New high-value application $95K",   severity: "low",   time: "4h ago"  },
	{ id: "ALT-087", msg: "Cohort Q3-2024 maturity reached",   severity: "info",  time: "1d ago"  },
];

const sevMap = {
	high:  { color: "#f87171", bg: "rgba(248,113,113,0.1)", label: "HIGH" },
	med:   { color: "#fb923c", bg: "rgba(251,146,60,0.1)",  label: "MED"  },
	low:   { color: "#facc15", bg: "rgba(250,204,21,0.1)",  label: "LOW"  },
	info:  { color: "#38bdf8", bg: "rgba(56,189,248,0.1)",  label: "INFO" },
};

// Fake sparkline data (relative heights 0–100)
const sparklines = {
	"Default Probability": [55,52,60,58,48,44,42,45,40,38,35,36],
	"Portfolio Exposure":  [60,62,65,70,72,74,73,78,80,81,80,82],
};

export default function AnalystDashboard() {
	return (
		<DashboardLayout>
			<style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .an-root { display:flex; flex-direction:column; gap:32px; }
        .an-header { display:flex; flex-direction:column; gap:6px; }
        .an-eyebrow {
          font-size:10.5px; font-weight:600; letter-spacing:0.14em;
          text-transform:uppercase; color:#34d399;
          font-family:'DM Sans',sans-serif;
          display:flex; align-items:center; gap:8px;
        }
        .an-eyebrow::before { content:''; width:18px; height:1px; background:#34d399; opacity:0.6; }
        .an-title { font-family:'Syne',sans-serif; font-size:28px; font-weight:800; color:#f0f4f8; letter-spacing:-0.02em; }
        .an-sub { font-size:13.5px; font-weight:300; color:#64748b; font-family:'DM Sans',sans-serif; }

        /* Stats */
        .an-stats { display:grid; gap:12px; grid-template-columns:repeat(3,1fr); }
        @media(max-width:900px) { .an-stats { grid-template-columns:repeat(2,1fr); } }
        @media(max-width:560px) { .an-stats { grid-template-columns:1fr; } }

        .astat {
          background:rgba(13,20,32,0.85); border:1px solid rgba(255,255,255,0.06);
          border-radius:14px; padding:20px 20px 14px; position:relative; overflow:hidden;
          transition:border-color 0.2s, transform 0.2s, box-shadow 0.2s; cursor:default;
        }
        .astat:hover { border-color:var(--ac-b); transform:translateY(-2px); box-shadow:0 12px 36px rgba(0,0,0,0.4),0 0 18px var(--ac-g); }
        .astat::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,var(--ac),transparent); opacity:0.45; transition:opacity 0.2s; }
        .astat:hover::before { opacity:1; }
        .astat-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; }
        .astat-label { font-size:10.5px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:#475569; font-family:'DM Sans',sans-serif; }
        .astat-icon { font-size:15px; color:var(--ac); opacity:0.7; }
        .astat-value { font-family:'Syne',sans-serif; font-size:30px; font-weight:800; color:#f0f4f8; letter-spacing:-0.02em; margin-bottom:6px; }
        .astat-meta { font-size:12px; font-weight:300; color:#334155; font-family:'DM Sans',sans-serif; }

        /* Sparkline */
        .sparkline { display:flex; align-items:flex-end; gap:2px; height:28px; margin-top:10px; }
        .spark-bar { flex:1; border-radius:2px; transition:height 0.3s; min-height:3px; }

        /* Bottom row */
        .an-bottom { display:grid; grid-template-columns:1fr 300px; gap:16px; }
        @media(max-width:900px) { .an-bottom { grid-template-columns:1fr; } }

        .panel { background:rgba(13,20,32,0.85); border:1px solid rgba(255,255,255,0.06); border-radius:14px; overflow:hidden; }
        .panel-head { padding:16px 20px 12px; border-bottom:1px solid rgba(255,255,255,0.05); display:flex; align-items:center; justify-content:space-between; }
        .panel-title { font-family:'Syne',sans-serif; font-size:14px; font-weight:700; color:#f0f4f8; }
        .panel-sub { font-size:10.5px; color:#2e3f52; font-family:'DM Sans',sans-serif; text-transform:uppercase; letter-spacing:0.08em; }

        /* Alert rows */
        .alert-row { display:flex; align-items:flex-start; gap:12px; padding:12px 20px; border-bottom:1px solid rgba(255,255,255,0.03); transition:background 0.15s; }
        .alert-row:last-child { border-bottom:none; }
        .alert-row:hover { background:rgba(255,255,255,0.02); }
        .alert-sev { font-size:9px; font-weight:700; letter-spacing:0.1em; padding:3px 7px; border-radius:5px; flex-shrink:0; margin-top:1px; font-family:'DM Sans',sans-serif; }
        .alert-id { font-size:10.5px; color:#2e3f52; font-family:'Syne',sans-serif; margin-bottom:2px; }
        .alert-msg { font-size:12.5px; color:#94a3b8; font-weight:300; font-family:'DM Sans',sans-serif; }
        .alert-time { font-size:10.5px; color:#2e3f52; font-family:'DM Sans',sans-serif; flex-shrink:0; margin-top:2px; }

        /* Risk segment */
        .seg-row { padding:14px 20px; border-bottom:1px solid rgba(255,255,255,0.03); }
        .seg-row:last-child { border-bottom:none; }
        .seg-info { display:flex; justify-content:space-between; align-items:center; margin-bottom:7px; }
        .seg-label { font-size:12.5px; font-weight:400; color:#cbd5e1; font-family:'DM Sans',sans-serif; }
        .seg-count { font-size:12px; font-weight:700; font-family:'Syne',sans-serif; }
        .seg-pct { font-size:11px; color:#475569; font-family:'DM Sans',sans-serif; }
        .seg-bar-bg { height:5px; background:rgba(255,255,255,0.05); border-radius:5px; overflow:hidden; }
        .seg-bar { height:100%; border-radius:5px; }
      `}</style>

			<div className="an-root">
				<div className="an-header">
					<div className="an-eyebrow">Analyst Portal</div>
					<h1 className="an-title">Risk & Analytics</h1>
					<p className="an-sub">Portfolio risk metrics, cohort analysis, and report generation.</p>
				</div>

				{/* Stats */}
				<div className="an-stats">
					{stats.map((s) => {
						const spark = sparklines[s.title];
						const max = spark ? Math.max(...spark) : 1;
						return (
							<div
								key={s.title}
								className="astat"
								style={{ "--ac": s.accent, "--ac-b": s.accent + "44", "--ac-g": s.accent + "18" }}
							>
								<div className="astat-head">
									<span className="astat-label">{s.title}</span>
									<span className="astat-icon">{s.icon}</span>
								</div>
								<div className="astat-value">{s.value}</div>
								<div className="astat-meta">{s.meta}</div>
								{spark && (
									<div className="sparkline">
										{spark.map((v, i) => (
											<div
												key={i}
												className="spark-bar"
												style={{ height: `${(v / max) * 100}%`, background: s.accent + (i === spark.length - 1 ? "ff" : "44") }}
											/>
										))}
									</div>
								)}
							</div>
						);
					})}
				</div>

				{/* Bottom row */}
				<div className="an-bottom">
					{/* Alert feed */}
					<div className="panel">
						<div className="panel-head">
							<span className="panel-title">Active Alerts</span>
							<span className="panel-sub">3 critical</span>
						</div>
						{alerts.map((a) => {
							const sv = sevMap[a.severity];
							return (
								<div key={a.id} className="alert-row">
									<span className="alert-sev" style={{ color: sv.color, background: sv.bg }}>{sv.label}</span>
									<div style={{ flex: 1 }}>
										<div className="alert-id">{a.id}</div>
										<div className="alert-msg">{a.msg}</div>
									</div>
									<div className="alert-time">{a.time}</div>
								</div>
							);
						})}
					</div>

					{/* Risk segments */}
					<div className="panel">
						<div className="panel-head">
							<span className="panel-title">Portfolio Risk</span>
							<span className="panel-sub">1,282 loans</span>
						</div>
						{riskSegments.map((r) => (
							<div key={r.label} className="seg-row">
								<div className="seg-info">
									<span className="seg-label">{r.label}</span>
									<div style={{ textAlign: "right" }}>
										<div className="seg-count" style={{ color: r.color }}>{r.count}</div>
										<div className="seg-pct">{r.pct}%</div>
									</div>
								</div>
								<div className="seg-bar-bg">
									<div className="seg-bar" style={{ width: `${r.pct}%`, background: r.color }} />
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}