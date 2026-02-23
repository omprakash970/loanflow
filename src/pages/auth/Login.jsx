import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const roles = [
  {
    key: "ADMIN",
    label: "Admin",
    desc: "System administration & user control",
    icon: "⬡",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.2)",
  },
  {
    key: "LENDER",
    label: "Lender",
    desc: "Loan origination & management",
    icon: "⬢",
    color: "#2dd4bf",
    glow: "rgba(45,212,191,0.2)",
  },
  {
    key: "BORROWER",
    label: "Borrower",
    desc: "Loan applications & payment tracking",
    icon: "⬟",
    color: "#818cf8",
    glow: "rgba(129,140,248,0.2)",
  },
  {
    key: "ANALYST",
    label: "Analyst",
    desc: "Analytics, risk reports & insights",
    icon: "◈",
    color: "#34d399",
    glow: "rgba(52,211,153,0.2)",
  },
];

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  const handleLogin = (role) => {
    setSelected(role);
    setTimeout(() => {
      login(role);
      navigate("/app");
    }, 320);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.1 + 0.3,
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.4 + 0.08,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(45,212,191,${p.opacity})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > W) p.dx *= -1;
        if (p.y < 0 || p.y > H) p.dy *= -1;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
      <>
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #080c14;
          --surface: #0d1420;
          --border: rgba(255,255,255,0.07);
          --teal: #2dd4bf;
          --teal-dim: rgba(45,212,191,0.1);
          --teal-glow: rgba(45,212,191,0.35);
          --text: #f0f4f8;
          --muted: #64748b;
          --font-head: 'Syne', sans-serif;
          --font-body: 'DM Sans', sans-serif;
        }

        .lg-root {
          font-family: var(--font-body);
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        canvas.bg-canvas {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .blob {
          position: fixed;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          z-index: 0;
        }
        .blob-1 {
          width: 480px; height: 480px;
          background: radial-gradient(circle, rgba(45,212,191,0.07) 0%, transparent 70%);
          top: -100px; right: -60px;
        }
        .blob-2 {
          width: 360px; height: 360px;
          background: radial-gradient(circle, rgba(129,140,248,0.06) 0%, transparent 70%);
          bottom: 60px; left: -60px;
        }

        /* NAV */
        nav.lg-nav {
          position: relative; z-index: 10;
          display: flex; align-items: center;
          padding: 20px 40px;
          border-bottom: 1px solid var(--border);
          background: rgba(8,12,20,0.6);
          backdrop-filter: blur(16px);
        }
        .lg-logo {
          font-family: var(--font-head);
          font-size: 17px;
          font-weight: 800;
          letter-spacing: 0.04em;
          color: var(--text);
          text-decoration: none;
        }
        .lg-logo span { color: var(--teal); }

        /* MAIN */
        main.lg-main {
          position: relative; z-index: 1;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 20px;
        }

        .lg-card {
          width: 100%;
          max-width: 440px;
          background: rgba(13,20,32,0.85);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 36px 32px 28px;
          backdrop-filter: blur(20px);
          box-shadow: 0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04);
          animation: fadeUp 0.5s ease both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Header */
        .lg-head {
          text-align: center;
          margin-bottom: 32px;
        }
        .lg-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 14px;
        }
        .lg-eyebrow::before {
          content: '';
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--teal);
          box-shadow: 0 0 7px var(--teal);
          animation: blink 2s infinite;
        }
        @keyframes blink {
          0%,100% { opacity:1; } 50% { opacity:0.25; }
        }
        h1.lg-title {
          font-family: var(--font-head);
          font-size: 26px;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text);
          margin-bottom: 8px;
        }
        p.lg-sub {
          font-size: 13.5px;
          font-weight: 300;
          color: var(--muted);
          line-height: 1.5;
        }

        /* Divider */
        .lg-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
        }
        .lg-divider::before, .lg-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border);
        }
        .lg-divider span {
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #2a3545;
        }

        /* Role list */
        .lg-roles {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 24px;
        }

        .role-btn {
          position: relative;
          width: 100%;
          background: rgba(255,255,255,0.025);
          border: 1px solid var(--border);
          border-radius: 13px;
          padding: 16px 18px;
          display: flex;
          align-items: center;
          gap: 15px;
          cursor: pointer;
          text-align: left;
          transition: border-color 0.2s, background 0.2s, transform 0.15s, box-shadow 0.2s;
          overflow: hidden;
        }
        .role-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.2s;
          background: var(--role-glow, transparent);
          border-radius: inherit;
        }
        .role-btn:hover::before,
        .role-btn.is-hovered::before { opacity: 1; }

        .role-btn:hover,
        .role-btn.is-hovered {
          border-color: var(--role-color, var(--teal));
          transform: translateX(3px);
          box-shadow: -3px 0 0 0 var(--role-color, var(--teal));
        }
        .role-btn.is-selected {
          opacity: 0.55;
          transform: scale(0.98);
        }

        .role-icon {
          font-size: 22px;
          flex-shrink: 0;
          line-height: 1;
          color: var(--role-color, var(--teal));
          position: relative;
          z-index: 1;
        }
        .role-text { flex: 1; position: relative; z-index: 1; }
        .role-label {
          font-family: var(--font-head);
          font-size: 14px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 3px;
          letter-spacing: 0.01em;
        }
        .role-desc {
          font-size: 12px;
          font-weight: 300;
          color: var(--muted);
          line-height: 1.4;
        }
        .role-arrow {
          font-size: 14px;
          color: var(--muted);
          transition: transform 0.2s, color 0.2s;
          position: relative; z-index: 1;
        }
        .role-btn:hover .role-arrow,
        .role-btn.is-hovered .role-arrow {
          transform: translateX(4px);
          color: var(--role-color, var(--teal));
        }

        /* Footer note */
        .lg-note {
          text-align: center;
          font-size: 11.5px;
          font-weight: 300;
          color: #2e3f52;
          letter-spacing: 0.03em;
        }
        .lg-note span { color: #3d5068; }
      `}</style>

        <div className="lg-root">
          <canvas ref={canvasRef} className="bg-canvas" />
          <div className="blob blob-1" />
          <div className="blob blob-2" />

          {/* NAV */}
          <nav className="lg-nav">
            <Link to="/" className="lg-logo">Loan<span>Flow</span></Link>
          </nav>

          {/* MAIN */}
          <main className="lg-main">
            <div className="lg-card">
              {/* Header */}
              <div className="lg-head">
                <div className="lg-eyebrow">Demo Access</div>
                <h1 className="lg-title">Select your role</h1>
                <p className="lg-sub">No credentials required — choose a portal to enter</p>
              </div>

              {/* Divider */}
              <div className="lg-divider"><span>Continue as</span></div>

              {/* Roles */}
              <div className="lg-roles">
                {roles.map((r) => (
                    <button
                        key={r.key}
                        type="button"
                        onClick={() => handleLogin(r.key)}
                        onMouseEnter={() => setHovered(r.key)}
                        onMouseLeave={() => setHovered(null)}
                        className={`role-btn${hovered === r.key ? " is-hovered" : ""}${selected === r.key ? " is-selected" : ""}`}
                        style={{ "--role-color": r.color, "--role-glow": r.glow }}
                    >
                      <span className="role-icon">{r.icon}</span>
                      <div className="role-text">
                        <div className="role-label">{r.label}</div>
                        <div className="role-desc">{r.desc}</div>
                      </div>
                      <span className="role-arrow">→</span>
                    </button>
                ))}
              </div>

              {/* Footer */}
              <p className="lg-note">
                FSAD Project &nbsp;·&nbsp; <span>LoanFlow © 2026</span>
              </p>
            </div>
          </main>
        </div>
      </>
  );
}