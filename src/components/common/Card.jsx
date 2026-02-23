export default function Card({ children, className = "", glow = false }) {
    return (
        <div
            className={`
        rounded-[14px]
        border border-[rgba(255,255,255,0.06)]
        bg-[rgba(13,20,32,0.85)]
        backdrop-blur-sm
        p-5
        shadow-[0_8px_32px_rgba(0,0,0,0.4)]
        transition-all duration-200
        hover:border-[rgba(45,212,191,0.15)]
        hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]
        ${glow ? "hover:shadow-[0_0_24px_rgba(45,212,191,0.08),0_12px_40px_rgba(0,0,0,0.5)]" : ""}
        ${className}
      `}
        >
            {children}
        </div>
    );
}