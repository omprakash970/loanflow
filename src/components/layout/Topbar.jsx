import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const roleColors = {
    ADMIN:    { color: "#f59e0b", bg: "rgba(245,158,11,0.1)",  border: "rgba(245,158,11,0.3)"  },
    LENDER:   { color: "#2dd4bf", bg: "rgba(45,212,191,0.1)", border: "rgba(45,212,191,0.3)"  },
    BORROWER: { color: "#818cf8", bg: "rgba(129,140,248,0.1)", border: "rgba(129,140,248,0.3)" },
    ANALYST:  { color: "#34d399", bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.3)"  },
};

export default function Topbar({ onToggleSidebar }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const role = user?.role ?? "GUEST";
    const roleStyle = roleColors[role] ?? roleColors.LENDER;

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>

            <header
                className="sticky top-0 z-40 flex w-full items-center justify-between px-4 py-5 md:px-6"
                style={{
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    background: "rgba(8,12,20,0.85)",
                    backdropFilter: "blur(18px)",
                    WebkitBackdropFilter: "blur(18px)",
                }}
            >
                {/* Left */}
                <div className="flex items-center gap-3">
                    {/* Hamburger (mobile) */}
                    <button
                        type="button"
                        onClick={onToggleSidebar}
                        className="md:hidden rounded-[8px] p-2 transition-all duration-150"
                        style={{ color: "rgba(100,116,139,1)" }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                            e.currentTarget.style.color = "#f0f4f8";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "rgba(100,116,139,1)";
                        }}
                        aria-label="Toggle sidebar"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.8}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* Logo → Landing */}
                    <span
                        onClick={() => navigate("/")}
                        className="cursor-pointer select-none text-[16px] font-extrabold tracking-tight"
                        style={{ fontFamily: "'Syne', sans-serif", color: "#f0f4f8" }}
                    >
            Loan<span style={{ color: "#2dd4bf" }}>Flow</span>
          </span>
                </div>

                {/* Right */}
                <div className="flex items-center gap-3">
                    {/* Role pill */}
                    <span
                        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10.5px] font-semibold tracking-[0.1em] uppercase"
                        style={{
                            color: roleStyle.color,
                            background: roleStyle.bg,
                            border: `1px solid ${roleStyle.border}`,
                            fontFamily: "'DM Sans', sans-serif",
                        }}
                    >
            <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                    background: roleStyle.color,
                    boxShadow: `0 0 6px ${roleStyle.color}`,
                }}
            />
                        {role}
          </span>

                    {/* Logout */}
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="rounded-[8px] px-3 py-1.5 text-[12.5px] font-medium transition-all duration-150"
                        style={{
                            border: "1px solid rgba(255,255,255,0.08)",
                            color: "rgba(148,163,184,1)",
                            background: "transparent",
                            fontFamily: "'DM Sans', sans-serif",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.border = "1px solid rgba(248,113,113,0.3)";
                            e.currentTarget.style.color = "#f87171";
                            e.currentTarget.style.background = "rgba(248,113,113,0.06)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
                            e.currentTarget.style.color = "rgba(148,163,184,1)";
                            e.currentTarget.style.background = "transparent";
                        }}
                    >
                        Logout
                    </button>
                </div>
            </header>
        </>
    );
}