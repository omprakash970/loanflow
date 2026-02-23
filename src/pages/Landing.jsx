import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const features = [
  {
    icon: "◈",
    label: "Role-Based Access",
    desc: "Admin, Lender, Borrower & Analyst portals",
  },
  {
    icon: "◉",
    label: "Smart Dashboards",
    desc: "Key metrics and insights per user role",
  },
  {
    icon: "◐",
    label: "Loan Workflows",
    desc: "End-to-end origination and tracking",
  },
  {
    icon: "◑",
    label: "EMI Management",
    desc: "Payment schedules and history",
  },
  {
    icon: "◒",
    label: "Risk Analytics",
    desc: "Reports, flags, and credit analysis",
  },
];

export default function Landing() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.3,
      dx: (Math.random() - 0.5) * 0.25,
      dy: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.5 + 0.1,
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
          --teal-dim: rgba(45,212,191,0.12);
          --teal-glow: rgba(45,212,191,0.35);
          --text: #f0f4f8;
          --muted: #64748b;
          --font-head: 'Syne', sans-serif;
          --font-body: 'DM Sans', sans-serif;
        }

        .lf-root {
          font-family: var(--font-body);
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow-x: hidden;
        }

        canvas.bg-canvas {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        /* Radial glow blobs */
        .blob {
          position: fixed;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          z-index: 0;
        }
        .blob-1 {
          width: 520px; height: 520px;
          background: radial-gradient(circle, rgba(45,212,191,0.08) 0%, transparent 70%);
          top: -120px; right: -80px;
        }
        .blob-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%);
          bottom: 40px; left: -60px;
        }

        /* ── NAV ── */
        nav.lf-nav {
          position: relative; z-index: 10;
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 40px;
          border-bottom: 1px solid var(--border);
          background: rgba(8,12,20,0.6);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }

        .lf-logo {
          font-family: var(--font-head);
          font-size: 17px;
          font-weight: 800;
          letter-spacing: 0.04em;
          color: var(--text);
        }
        .lf-logo span { color: var(--teal); }

        .lf-login-btn {
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 500;
          color: var(--teal);
          text-decoration: none;
          border: 1px solid rgba(45,212,191,0.4);
          padding: 8px 20px;
          border-radius: 8px;
          transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;
        }
        .lf-login-btn:hover {
          background: var(--teal-dim);
          border-color: var(--teal);
          box-shadow: 0 0 18px var(--teal-glow);
        }

        /* ── MAIN ── */
        main.lf-main {
          position: relative; z-index: 1;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 24px;
        }

        .lf-center {
          width: 100%;
          max-width: 760px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        /* Badge */
        .lf-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--teal);
          border: 1px solid rgba(45,212,191,0.25);
          background: rgba(45,212,191,0.06);
          padding: 6px 16px;
          border-radius: 100px;
          margin-bottom: 28px;
          animation: fadeUp 0.6s ease both;
        }
        .lf-badge::before {
          content: '';
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--teal);
          box-shadow: 0 0 8px var(--teal);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%,100% { opacity:1; } 50% { opacity:0.3; }
        }

        /* Hero */
        h1.lf-title {
          font-family: var(--font-head);
          font-size: clamp(36px, 6vw, 64px);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -0.02em;
          text-align: center;
          color: var(--text);
          margin-bottom: 20px;
          animation: fadeUp 0.6s 0.1s ease both;
        }
        h1.lf-title .teal { color: var(--teal); }

        p.lf-sub {
          font-size: 15px;
          font-weight: 300;
          line-height: 1.75;
          text-align: center;
          color: var(--muted);
          max-width: 540px;
          margin-bottom: 52px;
          animation: fadeUp 0.6s 0.2s ease both;
        }

        /* Feature grid */
        .lf-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          width: 100%;
          margin-bottom: 48px;
          animation: fadeUp 0.6s 0.3s ease both;
        }
        .lf-grid .feat:nth-child(4) { grid-column: 1 / 3; }
        .lf-grid .feat:nth-child(5) { grid-column: 3 / 4; }

        .feat {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 20px;
          display: flex;
          align-items: flex-start;
          gap: 14px;
          transition: border-color 0.2s, background 0.2s, transform 0.2s;
          cursor: default;
        }
        .feat:hover {
          border-color: rgba(45,212,191,0.3);
          background: rgba(13,20,32,0.9);
          transform: translateY(-2px);
        }
        .feat-icon {
          font-size: 18px;
          color: var(--teal);
          flex-shrink: 0;
          margin-top: 2px;
          opacity: 0.85;
        }
        .feat-label {
          font-family: var(--font-head);
          font-size: 13px;
          font-weight: 600;
          color: var(--text);
          margin-bottom: 4px;
          letter-spacing: 0.01em;
        }
        .feat-desc {
          font-size: 12px;
          color: var(--muted);
          line-height: 1.5;
          font-weight: 300;
        }

        /* CTA */
        .lf-cta-wrap {
          display: flex;
          gap: 14px;
          align-items: center;
          animation: fadeUp 0.6s 0.4s ease both;
        }

        .lf-cta {
          font-family: var(--font-head);
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.03em;
          text-decoration: none;
          color: #080c14;
          background: var(--teal);
          padding: 13px 32px;
          border-radius: 10px;
          transition: opacity 0.2s, box-shadow 0.2s, transform 0.15s;
          box-shadow: 0 0 28px rgba(45,212,191,0.3);
        }
        .lf-cta:hover {
          opacity: 0.88;
          box-shadow: 0 0 42px rgba(45,212,191,0.5);
          transform: translateY(-1px);
        }
        .lf-cta:active { transform: scale(0.97); }

        .lf-cta-ghost {
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 400;
          text-decoration: none;
          color: var(--muted);
          transition: color 0.2s;
        }
        .lf-cta-ghost:hover { color: var(--text); }

        /* Footer */
        footer.lf-footer {
          position: relative; z-index: 10;
          border-top: 1px solid var(--border);
          padding: 18px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .lf-footer span {
          font-size: 11px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #2a3545;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Responsive */
        @media (max-width: 600px) {
          nav.lf-nav { padding: 16px 20px; }
          .lf-grid { grid-template-columns: 1fr 1fr; }
          .lf-grid .feat:nth-child(4),
          .lf-grid .feat:nth-child(5) { grid-column: auto; }
          footer.lf-footer { flex-direction: column; gap: 6px; text-align: center; }
        }
      `}</style>

        <div className="lf-root">
          <canvas ref={canvasRef} className="bg-canvas" />
          <div className="blob blob-1" />
          <div className="blob blob-2" />

          {/* NAV */}
          <nav className="lf-nav">
            <span className="lf-logo">Loan<span>Flow</span></span>
            <Link to="/login" className="lf-login-btn">Login</Link>
          </nav>

          {/* MAIN */}
          <main className="lf-main">
            <div className="lf-center">
              <div className="lf-badge">Full Stack Application Development</div>

              <h1 className="lf-title">
                Loan Management<br />
                <span className="teal">Reimagined.</span>
              </h1>

              <p className="lf-sub">
                A full-stack platform managing loan operations across multiple user roles —
                built with React, Tailwind CSS, and React Router.
              </p>

              {/* Feature grid */}
              <div className="lf-grid">
                {features.map((f) => (
                    <div className="feat" key={f.label}>
                      <span className="feat-icon">{f.icon}</span>
                      <div>
                        <div className="feat-label">{f.label}</div>
                        <div className="feat-desc">{f.desc}</div>
                      </div>
                    </div>
                ))}
              </div>

              {/* CTA */}
              <div className="lf-cta-wrap">
                <Link to="/login" className="lf-cta">Get Started →</Link>
                <Link to="/login" className="lf-cta-ghost">Already have an account?</Link>
              </div>
            </div>
          </main>

          {/* FOOTER */}
          <footer className="lf-footer">
            <span>FSAD Project</span>
            <span>LoanFlow © 2026</span>
          </footer>
        </div>
      </>
  );
}