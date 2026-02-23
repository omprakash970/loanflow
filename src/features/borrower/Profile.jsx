import DashboardLayout from "../../components/layout/DashboardLayout";

/* Static borrower profile data */
const profile = {
  name: "Arjun Mehta",
  email: "arjun.mehta@loanflow.com",
  phone: "+91 98765 43210",
  address: "42 Marina Heights, Sector 18, Mumbai 400071",
  accountStatus: "Active",
  memberId: "BRW-201",
  memberSince: "March 2025",
};

const documents = [
  { name: "Aadhaar Card",       status: "Verified",  uploadDate: "Mar 12, 2025" },
  { name: "PAN Card",           status: "Verified",  uploadDate: "Mar 12, 2025" },
  { name: "Income Certificate", status: "Verified",  uploadDate: "Mar 15, 2025" },
  { name: "Bank Statement",     status: "Verified",  uploadDate: "Mar 18, 2025" },
  { name: "Address Proof",      status: "Pending",   uploadDate: "Feb 10, 2026" },
  { name: "Employment Letter",  status: "Not Uploaded", uploadDate: "—" },
];

const docStatusStyle = {
  Verified:     { color: "#34d399", bg: "rgba(52,211,153,0.1)" },
  Pending:      { color: "#fb923c", bg: "rgba(251,146,60,0.1)" },
  "Not Uploaded": { color: "#475569", bg: "rgba(255,255,255,0.04)" },
};

export default function Profile() {
  return (
    <DashboardLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .prf-root { display:flex; flex-direction:column; gap:32px; }
        .prf-header { display:flex; flex-direction:column; gap:6px; }
        .prf-eyebrow {
          font-size:10.5px; font-weight:600; letter-spacing:0.14em;
          text-transform:uppercase; color:#818cf8;
          font-family:'DM Sans',sans-serif;
          display:flex; align-items:center; gap:8px;
        }
        .prf-eyebrow::before { content:''; width:18px; height:1px; background:#818cf8; opacity:0.6; }
        .prf-title { font-family:'Syne',sans-serif; font-size:28px; font-weight:800; color:#f0f4f8; letter-spacing:-0.02em; }
        .prf-sub { font-size:13.5px; font-weight:300; color:#64748b; font-family:'DM Sans',sans-serif; }

        .prf-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        @media(max-width:760px) { .prf-grid { grid-template-columns:1fr; } }

        .prf-panel {
          background:rgba(13,20,32,0.85);
          border:1px solid rgba(255,255,255,0.06);
          border-radius:14px; overflow:hidden;
        }
        .prf-panel-head {
          padding:16px 20px 12px;
          border-bottom:1px solid rgba(255,255,255,0.05);
          display:flex; align-items:center; justify-content:space-between;
        }
        .prf-panel-title { font-family:'Syne',sans-serif; font-size:14px; font-weight:700; color:#f0f4f8; }
        .prf-panel-sub {
          font-size:10.5px; color:#2e3f52; font-family:'DM Sans',sans-serif;
          text-transform:uppercase; letter-spacing:0.08em;
        }

        /* Profile card */
        .prf-card-top {
          display:flex; align-items:center; gap:18px;
          padding:24px 20px 20px;
          border-bottom:1px solid rgba(255,255,255,0.04);
        }
        .prf-avatar {
          width:56px; height:56px; border-radius:14px;
          background:rgba(129,140,248,0.1);
          border:1px solid rgba(129,140,248,0.25);
          display:flex; align-items:center; justify-content:center;
          font-family:'Syne',sans-serif; font-size:20px; font-weight:800;
          color:#818cf8; flex-shrink:0;
        }
        .prf-avatar-info {}
        .prf-avatar-name {
          font-family:'Syne',sans-serif; font-size:20px; font-weight:800;
          color:#f0f4f8; letter-spacing:-0.01em; margin-bottom:4px;
        }
        .prf-avatar-id {
          font-size:11px; color:#475569; font-family:'DM Sans',sans-serif;
          display:flex; align-items:center; gap:8px;
        }
        .prf-status-dot {
          width:6px; height:6px; border-radius:50%;
          background:#34d399; box-shadow:0 0 6px #34d399;
          display:inline-block;
        }

        /* Info rows */
        .prf-info-row {
          display:flex; align-items:center; justify-content:space-between;
          padding:14px 20px; gap:12px;
          border-bottom:1px solid rgba(255,255,255,0.03);
          transition:background 0.12s;
        }
        .prf-info-row:last-child { border-bottom:none; }
        .prf-info-row:hover { background:rgba(255,255,255,0.015); }
        .prf-info-label {
          font-size:11px; font-weight:600; letter-spacing:0.08em;
          text-transform:uppercase; color:#475569;
          font-family:'DM Sans',sans-serif; flex-shrink:0;
        }
        .prf-info-value {
          font-size:13.5px; font-weight:400; color:#e2e8f0;
          font-family:'DM Sans',sans-serif; text-align:right;
        }

        /* Document rows */
        .prf-doc-row {
          display:flex; align-items:center; gap:14px;
          padding:13px 20px;
          border-bottom:1px solid rgba(255,255,255,0.03);
          transition:background 0.12s;
        }
        .prf-doc-row:last-child { border-bottom:none; }
        .prf-doc-row:hover { background:rgba(255,255,255,0.015); }
        .prf-doc-icon {
          width:34px; height:34px; border-radius:9px;
          background:rgba(129,140,248,0.06);
          border:1px solid rgba(129,140,248,0.12);
          display:flex; align-items:center; justify-content:center;
          font-size:14px; color:#818cf8; flex-shrink:0;
        }
        .prf-doc-info { flex:1; }
        .prf-doc-name {
          font-size:13px; font-weight:500; color:#e2e8f0;
          font-family:'DM Sans',sans-serif; margin-bottom:2px;
        }
        .prf-doc-date {
          font-size:11px; color:#475569; font-family:'DM Sans',sans-serif;
        }
        .prf-doc-badge {
          font-size:10px; font-weight:600; letter-spacing:0.06em;
          text-transform:uppercase; padding:3px 9px; border-radius:6px;
          font-family:'DM Sans',sans-serif; flex-shrink:0;
        }

        /* Edit button */
        .prf-edit-btn {
          display:inline-flex; align-items:center; gap:7px;
          padding:10px 22px; border-radius:10px;
          font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500;
          color:#818cf8; background:rgba(129,140,248,0.08);
          border:1px solid rgba(129,140,248,0.2);
          cursor:pointer; transition:all 0.15s;
        }
        .prf-edit-btn:hover {
          background:rgba(129,140,248,0.14);
          border-color:rgba(129,140,248,0.35);
        }
      `}</style>

      <div className="prf-root">
        <div className="prf-header">
          <div className="prf-eyebrow">Borrower Portal</div>
          <h1 className="prf-title">Profile</h1>
          <p className="prf-sub">Your personal information and uploaded documents.</p>
        </div>

        <div className="prf-grid">
          {/* Personal Information */}
          <div className="prf-panel">
            <div className="prf-panel-head">
              <span className="prf-panel-title">Personal Information</span>
              <span className="prf-panel-sub">{profile.memberId}</span>
            </div>

            {/* Avatar + name */}
            <div className="prf-card-top">
              <div className="prf-avatar">
                {profile.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="prf-avatar-info">
                <div className="prf-avatar-name">{profile.name}</div>
                <div className="prf-avatar-id">
                  <span className="prf-status-dot" />
                  {profile.accountStatus} · Member since {profile.memberSince}
                </div>
              </div>
            </div>

            {/* Info fields */}
            <div className="prf-info-row">
              <span className="prf-info-label">Email</span>
              <span className="prf-info-value">{profile.email}</span>
            </div>
            <div className="prf-info-row">
              <span className="prf-info-label">Phone</span>
              <span className="prf-info-value">{profile.phone}</span>
            </div>
            <div className="prf-info-row">
              <span className="prf-info-label">Address</span>
              <span className="prf-info-value">{profile.address}</span>
            </div>
            <div className="prf-info-row">
              <span className="prf-info-label">Status</span>
              <span className="prf-info-value">
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#34d399",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#34d399",
                      boxShadow: "0 0 6px #34d399",
                    }}
                  />
                  {profile.accountStatus}
                </span>
              </span>
            </div>
          </div>

          {/* Documents */}
          <div className="prf-panel">
            <div className="prf-panel-head">
              <span className="prf-panel-title">Documents</span>
              <span className="prf-panel-sub">{documents.filter((d) => d.status === "Verified").length} verified</span>
            </div>

            {documents.map((doc) => {
              const ds = docStatusStyle[doc.status] || docStatusStyle["Not Uploaded"];
              return (
                <div key={doc.name} className="prf-doc-row">
                  <div className="prf-doc-icon">◫</div>
                  <div className="prf-doc-info">
                    <div className="prf-doc-name">{doc.name}</div>
                    <div className="prf-doc-date">{doc.uploadDate !== "—" ? `Uploaded ${doc.uploadDate}` : "Not uploaded yet"}</div>
                  </div>
                  <span
                    className="prf-doc-badge"
                    style={{ color: ds.color, background: ds.bg, border: `1px solid ${ds.color}33` }}
                  >
                    {doc.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Edit Profile button */}
        <div>
          <button
            type="button"
            className="prf-edit-btn"
            onClick={() => alert("Edit Profile (UI-only demo)")}
          >
            ◈ Edit Profile
          </button>
          <span
            style={{
              marginLeft: 14,
              fontSize: "11.5px",
              color: "#334155",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
            }}
          >
            Profile editing is not available in this demo
          </span>
        </div>
      </div>
    </DashboardLayout>
  );
}
