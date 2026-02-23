import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";

export default function Settings() {
  const [settings, setSettings] = useState({
    enableNewLoans: true,
    defaultInterestRate: "10.5",
    maintenanceMode: false,
    autoApproveLoansUnder: "5000",
    maxLoanTenure: "48",
    emailNotifications: true,
  });

  const [saved, setSaved] = useState(false);

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    setSaved(false);
  };

  const handleChange = (key, val) => {
    setSettings((prev) => ({ ...prev, [key]: val }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <DashboardLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .stg-root { display:flex; flex-direction:column; gap:32px; }
        .stg-header { display:flex; flex-direction:column; gap:6px; }
        .stg-eyebrow {
          font-size:10.5px; font-weight:600; letter-spacing:0.14em;
          text-transform:uppercase; color:#f59e0b;
          font-family:'DM Sans',sans-serif;
          display:flex; align-items:center; gap:8px;
        }
        .stg-eyebrow::before { content:''; width:18px; height:1px; background:#f59e0b; opacity:0.6; }
        .stg-title { font-family:'Syne',sans-serif; font-size:28px; font-weight:800; color:#f0f4f8; letter-spacing:-0.02em; }
        .stg-sub { font-size:13.5px; font-weight:300; color:#64748b; font-family:'DM Sans',sans-serif; }

        .stg-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        @media(max-width:760px) { .stg-grid { grid-template-columns:1fr; } }

        .stg-panel {
          background:rgba(13,20,32,0.85);
          border:1px solid rgba(255,255,255,0.06);
          border-radius:14px; overflow:hidden;
        }
        .stg-panel-head {
          padding:16px 20px 12px;
          border-bottom:1px solid rgba(255,255,255,0.05);
          display:flex; align-items:center; justify-content:space-between;
        }
        .stg-panel-title { font-family:'Syne',sans-serif; font-size:14px; font-weight:700; color:#f0f4f8; }
        .stg-panel-sub {
          font-size:10.5px; color:#2e3f52; font-family:'DM Sans',sans-serif;
          text-transform:uppercase; letter-spacing:0.08em;
        }
        .stg-panel-body { padding:0; }

        .stg-row {
          display:flex; align-items:center; justify-content:space-between;
          padding:16px 20px; gap:16px;
          border-bottom:1px solid rgba(255,255,255,0.03);
          transition:background 0.12s;
        }
        .stg-row:last-child { border-bottom:none; }
        .stg-row:hover { background:rgba(255,255,255,0.015); }

        .stg-row-info { flex:1; }
        .stg-row-label {
          font-size:13.5px; font-weight:500; color:#e2e8f0;
          font-family:'DM Sans',sans-serif; margin-bottom:3px;
        }
        .stg-row-desc {
          font-size:11.5px; font-weight:300; color:#475569;
          font-family:'DM Sans',sans-serif;
        }

        /* Toggle switch */
        .stg-toggle {
          position:relative; width:44px; height:24px;
          border-radius:12px; cursor:pointer;
          transition:all 0.2s; flex-shrink:0;
          border:none; outline:none;
        }
        .stg-toggle-off {
          background:rgba(255,255,255,0.08);
        }
        .stg-toggle-on {
          background:rgba(52,211,153,0.5);
          box-shadow:0 0 10px rgba(52,211,153,0.2);
        }
        .stg-toggle-knob {
          position:absolute; top:3px; width:18px; height:18px;
          border-radius:50%; background:#f0f4f8;
          transition:left 0.2s;
          box-shadow:0 1px 4px rgba(0,0,0,0.3);
        }

        /* Toggle — warn */
        .stg-toggle-warn {
          background:rgba(248,113,113,0.5);
          box-shadow:0 0 10px rgba(248,113,113,0.2);
        }

        /* Input field */
        .stg-input {
          width:100px; padding:6px 10px; border-radius:8px;
          font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500;
          color:#f0f4f8; text-align:right;
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.08);
          outline:none; transition:border-color 0.15s;
          flex-shrink:0;
        }
        .stg-input:focus { border-color:rgba(245,158,11,0.4); }

        .stg-input-suffix {
          font-size:12px; font-weight:400; color:#475569;
          font-family:'DM Sans',sans-serif; margin-left:6px; flex-shrink:0;
        }

        /* Save button */
        .stg-save {
          display:inline-flex; align-items:center; gap:7px;
          padding:10px 22px; border-radius:10px;
          font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500;
          cursor:pointer; transition:all 0.15s; border:none;
        }
        .stg-save-default {
          color:#f59e0b; background:rgba(245,158,11,0.08);
          border:1px solid rgba(245,158,11,0.2);
        }
        .stg-save-default:hover {
          background:rgba(245,158,11,0.14);
          border-color:rgba(245,158,11,0.35);
        }
        .stg-save-done {
          color:#34d399; background:rgba(52,211,153,0.08);
          border:1px solid rgba(52,211,153,0.2);
        }
      `}</style>

      <div className="stg-root">
        <div className="stg-header">
          <div className="stg-eyebrow">Admin Portal</div>
          <h1 className="stg-title">Settings</h1>
          <p className="stg-sub">System configuration and feature flags — changes are UI-only.</p>
        </div>

        <div className="stg-grid">
          {/* Feature Toggles */}
          <div className="stg-panel">
            <div className="stg-panel-head">
              <span className="stg-panel-title">Feature Toggles</span>
              <span className="stg-panel-sub">System</span>
            </div>
            <div className="stg-panel-body">
              {/* Enable new loan applications */}
              <div className="stg-row">
                <div className="stg-row-info">
                  <div className="stg-row-label">Enable New Loan Applications</div>
                  <div className="stg-row-desc">Allow borrowers to submit new loan applications.</div>
                </div>
                <button
                  type="button"
                  className={`stg-toggle ${settings.enableNewLoans ? "stg-toggle-on" : "stg-toggle-off"}`}
                  onClick={() => handleToggle("enableNewLoans")}
                >
                  <div
                    className="stg-toggle-knob"
                    style={{ left: settings.enableNewLoans ? "23px" : "3px" }}
                  />
                </button>
              </div>

              {/* Maintenance mode */}
              <div className="stg-row">
                <div className="stg-row-info">
                  <div className="stg-row-label">Maintenance Mode</div>
                  <div className="stg-row-desc">Temporarily disable platform access for non-admins.</div>
                </div>
                <button
                  type="button"
                  className={`stg-toggle ${settings.maintenanceMode ? "stg-toggle-warn" : "stg-toggle-off"}`}
                  onClick={() => handleToggle("maintenanceMode")}
                >
                  <div
                    className="stg-toggle-knob"
                    style={{ left: settings.maintenanceMode ? "23px" : "3px" }}
                  />
                </button>
              </div>

              {/* Email notifications */}
              <div className="stg-row">
                <div className="stg-row-info">
                  <div className="stg-row-label">Email Notifications</div>
                  <div className="stg-row-desc">Send system alerts and reports via email.</div>
                </div>
                <button
                  type="button"
                  className={`stg-toggle ${settings.emailNotifications ? "stg-toggle-on" : "stg-toggle-off"}`}
                  onClick={() => handleToggle("emailNotifications")}
                >
                  <div
                    className="stg-toggle-knob"
                    style={{ left: settings.emailNotifications ? "23px" : "3px" }}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Loan Configuration */}
          <div className="stg-panel">
            <div className="stg-panel-head">
              <span className="stg-panel-title">Loan Configuration</span>
              <span className="stg-panel-sub">Defaults</span>
            </div>
            <div className="stg-panel-body">
              {/* Default interest rate */}
              <div className="stg-row">
                <div className="stg-row-info">
                  <div className="stg-row-label">Default Interest Rate</div>
                  <div className="stg-row-desc">Applied to new loan offers if not overridden.</div>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="number"
                    className="stg-input"
                    value={settings.defaultInterestRate}
                    onChange={(e) => handleChange("defaultInterestRate", e.target.value)}
                    min="0"
                    max="30"
                    step="0.1"
                  />
                  <span className="stg-input-suffix">% p.a.</span>
                </div>
              </div>

              {/* Auto-approve threshold */}
              <div className="stg-row">
                <div className="stg-row-info">
                  <div className="stg-row-label">Auto-Approve Under</div>
                  <div className="stg-row-desc">Loans below this amount are auto-approved.</div>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span className="stg-input-suffix" style={{ marginLeft: 0, marginRight: 6 }}>$</span>
                  <input
                    type="number"
                    className="stg-input"
                    value={settings.autoApproveLoansUnder}
                    onChange={(e) => handleChange("autoApproveLoansUnder", e.target.value)}
                    min="0"
                    step="500"
                  />
                </div>
              </div>

              {/* Max tenure */}
              <div className="stg-row">
                <div className="stg-row-info">
                  <div className="stg-row-label">Max Loan Tenure</div>
                  <div className="stg-row-desc">Maximum allowed repayment period.</div>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="number"
                    className="stg-input"
                    value={settings.maxLoanTenure}
                    onChange={(e) => handleChange("maxLoanTenure", e.target.value)}
                    min="6"
                    max="120"
                    step="6"
                  />
                  <span className="stg-input-suffix">months</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save button */}
        <div>
          <button
            type="button"
            className={`stg-save ${saved ? "stg-save-done" : "stg-save-default"}`}
            onClick={handleSave}
          >
            {saved ? "✓ Settings saved" : "◈ Save Changes"}
          </button>
          {!saved && (
            <span
              style={{
                marginLeft: 14,
                fontSize: "11.5px",
                color: "#334155",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
              }}
            >
              Changes are UI-only (no persistence)
            </span>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
